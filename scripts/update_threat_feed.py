#!/usr/bin/env python3
"""Build assets/threat-feed.json for the static K4INU_OS site.

Uses only Python's standard library so it can run on GitHub-hosted runners
without installing packages. Feed failures are isolated so one source cannot
break the entire update.
"""
from __future__ import annotations

import html
import json
import re
import sys
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "threat-feed.json"
UA = "K4INU-ThreatFeed/1.0 (+https://kainu.codes/)"

PROMO_RE = re.compile(
    r"\b(sponsored|advertorial|webinar|white\s*paper|ebook|e-book|free\s+guide|"
    r"download\s+now|register\s+now|save\s+your\s+spot|resource\s+library|"
    r"buyer(?:'s)?\s+guide|free\s+report|special\s+offer|limited\s+offer)\b",
    re.I,
)

NEWS_SOURCES = [
    ("BleepingComputer", "https://www.bleepingcomputer.com/feed/", {"bleepingcomputer.com", "www.bleepingcomputer.com"}),
    ("Dark Reading", "https://www.darkreading.com/rss.xml", {"darkreading.com", "www.darkreading.com"}),
    ("The Hacker News", "https://feeds.feedburner.com/TheHackersNews", {"thehackernews.com", "www.thehackernews.com"}),
]


def request(url: str, *, timeout: int = 30) -> bytes:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": UA,
            "Accept": "application/json, application/rss+xml, application/atom+xml, text/xml, */*",
        },
    )
    with urllib.request.urlopen(req, timeout=timeout) as response:
        return response.read()


def clean_text(value: str | None, limit: int = 320) -> str:
    if not value:
        return ""
    value = re.sub(r"<script\b[^>]*>.*?</script>", " ", value, flags=re.I | re.S)
    value = re.sub(r"<style\b[^>]*>.*?</style>", " ", value, flags=re.I | re.S)
    value = re.sub(r"<[^>]+>", " ", value)
    value = html.unescape(value)
    value = re.sub(r"\s+", " ", value).strip()
    return value if len(value) <= limit else value[: limit - 1].rstrip() + "…"


def iso_date(value: str | None) -> str:
    if not value:
        return ""
    try:
        d = parsedate_to_datetime(value)
        if d.tzinfo is None:
            d = d.replace(tzinfo=timezone.utc)
        return d.astimezone(timezone.utc).isoformat().replace("+00:00", "Z")
    except Exception:
        pass
    try:
        d = datetime.fromisoformat(value.replace("Z", "+00:00"))
        if d.tzinfo is None:
            d = d.replace(tzinfo=timezone.utc)
        return d.astimezone(timezone.utc).isoformat().replace("+00:00", "Z")
    except Exception:
        return value


def child_text(node: ET.Element, names: tuple[str, ...]) -> str:
    for child in list(node):
        local = child.tag.rsplit("}", 1)[-1].lower()
        if local in names and child.text:
            return child.text.strip()
    return ""


def rss_items(source: str, url: str, allowed_hosts: set[str]) -> list[dict]:
    raw = request(url)
    root = ET.fromstring(raw)
    items = []
    candidates = [n for n in root.iter() if n.tag.rsplit("}", 1)[-1].lower() in {"item", "entry"}]
    for node in candidates:
        title = clean_text(child_text(node, ("title",)), 220)
        if not title or PROMO_RE.search(title):
            continue

        link = ""
        for child in list(node):
            local = child.tag.rsplit("}", 1)[-1].lower()
            if local == "link":
                link = (child.attrib.get("href") or (child.text or "")).strip()
                if link:
                    break
        host = urlparse(link).hostname or ""
        if allowed_hosts and host.lower() not in allowed_hosts:
            # Keeps external sponsored posts out of the feed.
            continue

        published = child_text(node, ("pubdate", "published", "updated", "date"))
        summary = child_text(node, ("description", "summary", "content", "encoded"))
        summary = clean_text(summary)
        if PROMO_RE.search(summary):
            continue
        items.append(
            {
                "source": source,
                "title": title,
                "url": link,
                "published": iso_date(published),
                "summary": summary,
            }
        )
    return items[:18]


def cisa_kev() -> list[dict]:
    url = "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json"
    data = json.loads(request(url))
    vulns = sorted(data.get("vulnerabilities", []), key=lambda x: x.get("dateAdded", ""), reverse=True)
    out = []
    for v in vulns[:20]:
        cve = v.get("cveID", "")
        vendor = v.get("vendorProject", "")
        product = v.get("product", "")
        name = v.get("vulnerabilityName", "")
        summary = clean_text(v.get("shortDescription") or v.get("requiredAction") or "", 360)
        out.append(
            {
                "source": "CISA KEV",
                "cve": cve,
                "title": name or f"{cve} — {vendor} {product}".strip(),
                "summary": summary,
                "date_added": v.get("dateAdded", ""),
                "url": f"https://www.cisa.gov/known-exploited-vulnerabilities-catalog?search_api_fulltext={urllib.parse.quote(cve)}" if cve else "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
            }
        )
    return out


def nvd_critical() -> list[dict]:
    now = datetime.now(timezone.utc)
    start = now - timedelta(days=14)
    fmt = lambda d: d.strftime("%Y-%m-%dT%H:%M:%S.000Z")
    params = urllib.parse.urlencode(
        {
            "cvssV3Severity": "CRITICAL",
            "pubStartDate": fmt(start),
            "pubEndDate": fmt(now),
            "resultsPerPage": 20,
        }
    )
    data = json.loads(request(f"https://services.nvd.nist.gov/rest/json/cves/2.0?{params}"))
    out = []
    for row in data.get("vulnerabilities", []):
        cve_obj = row.get("cve", {})
        cve = cve_obj.get("id", "")
        desc = next((d.get("value", "") for d in cve_obj.get("descriptions", []) if d.get("lang") == "en"), "")
        score = None
        severity = "CRITICAL"
        metrics = cve_obj.get("metrics", {})
        for key in ("cvssMetricV31", "cvssMetricV30"):
            if metrics.get(key):
                cvss = metrics[key][0].get("cvssData", {})
                score = cvss.get("baseScore")
                severity = cvss.get("baseSeverity", severity)
                break
        title = f"{cve} — {severity}"
        if score is not None:
            title += f" {score}"
        out.append(
            {
                "source": "NVD",
                "cve": cve,
                "title": title,
                "summary": clean_text(desc, 360),
                "published": iso_date(cve_obj.get("published", "")),
                "url": f"https://nvd.nist.gov/vuln/detail/{cve}" if cve else "https://nvd.nist.gov/",
            }
        )
    return out


def main() -> int:
    generated = datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")
    errors = []
    previous = {}
    if OUT.exists():
        try:
            previous = json.loads(OUT.read_text(encoding="utf-8"))
        except Exception:
            previous = {}

    try:
        known_exploited = cisa_kev()
    except Exception as exc:
        known_exploited = previous.get("known_exploited", [])
        errors.append(f"CISA KEV: {exc}")

    try:
        critical = nvd_critical()
    except Exception as exc:
        critical = previous.get("critical", [])
        errors.append(f"NVD: {exc}")

    news = []
    previous_news = previous.get("news", [])
    for source, url, hosts in NEWS_SOURCES:
        try:
            news.extend(rss_items(source, url, hosts))
        except Exception as exc:
            news.extend(item for item in previous_news if item.get("source") == source)
            errors.append(f"{source}: {exc}")

    # De-dupe news by canonical URL/title and newest first.
    seen = set()
    unique_news = []
    for item in sorted(news, key=lambda x: x.get("published", ""), reverse=True):
        key = (item.get("url") or item.get("title", "")).lower()
        if not key or key in seen:
            continue
        seen.add(key)
        unique_news.append(item)

    payload = {
        "generated_at": generated,
        "sources": ["CISA KEV", "NVD", "BleepingComputer", "Dark Reading", "The Hacker News"],
        "known_exploited": known_exploited,
        "critical": critical,
        "news": unique_news[:36],
        "errors": errors,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {OUT}: {len(known_exploited)} KEV, {len(critical)} critical, {len(unique_news[:36])} news")
    if errors:
        print("Partial feed errors:", *errors, sep="\n- ", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
