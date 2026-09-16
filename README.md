# K4INU_OS — kainu.codes

A framework-free GitHub Pages portfolio styled as a DFIR/security workstation, with community credentials, speaking history, and an in-browser synthwave player.

## Deploy

Copy these files into the repository that publishes `kainu.codes`, commit, and push to the branch GitHub Pages is configured to serve.

The included `CNAME` keeps the custom domain set to `kainu.codes`.

## Files

- `index.html` — desktop shell, badges, mini Signal FM player, and app/window templates
- `assets/style.css` — full UI, responsive behavior, taskbar, credential treatments, and radio visuals
- `assets/app.js` — draggable windows, terminal commands, Start menu, project data, credentials, and procedural Web Audio synth engine
- `assets/obsidian-mark.svg` — custom K4INU_OS Project Obsidian site treatment
- `assets/favicon.svg` — local favicon
- `404.html` — custom not-found page
- `.nojekyll` — serves the static site without Jekyll processing

## Community credentials in this build

- DEF CON SOC GOON
- Speaker at DEF CON 33 + DEF CON 34 — `Threat Hunting 101: Beyond the Alerts`
- Blue Team Village CTF — DEF CON 32, 33 + 34
- Project Obsidian visual credential / BTV CTF link
- Ham Radio Village — `Pinky + the Brain Fox`, DEF CON 34
- Ham Radio Village DC34 fox-hunt writeup link

The DEF CON, Blue Team Village, and Ham Radio Village marks are loaded from public external image URLs. The Project Obsidian emblem included in this package is a custom K4INU_OS site treatment rather than an official organization mark.

## Signal FM

`K4INU SIGNAL//FM` is original procedural audio generated locally with the browser Web Audio API. It does not embed, stream, or copy any soundtrack.

Tracks:

- Night Shift
- Trace Route
- Ghost Process

The player supports play/pause, previous/next track, direct track selection, and volume. Browsers require a user interaction before audio can start, so the site never autoplays sound.

## Terminal commands

`help`, `whoami`, `ls`, `projects`, `open <name>`, `cat about`, `neofetch`, `radio`, `play`, `pause`, `github`, `date`, `clear`

Try `open badges`, `open radio`, or `play`.


## Signal FM v8

Signal FM includes 30 original procedural cyber/synthwave tracks generated with the Web Audio API. Tracks 21–30 add a heavier glitch-electro bank with sub-bass, distorted mid-bass, halftime snares and stutter synthesis. The player UI uses a red/blue cyber palette and requires no external audio files or streaming service.
