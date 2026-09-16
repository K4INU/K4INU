(() => {
  'use strict';

  const APPS = {
    terminal: { title: 'TERMINAL // kainu@k4inu', icon: '$_', status: 'bash-ish // local simulation', width: 760, height: 520, render: renderTerminal },
    projects: { title: 'PROJECT VAULT // tools', icon: '{}', status: '4 indexed repositories', width: 790, height: 575, render: renderProjects },
    credentials: { title: 'FIELD CREDENTIALS // community', icon: 'DC', status: 'DEF CON // Blue Team Village', width: 760, height: 570, render: renderCredentials },
    about: { title: 'OPERATOR PROFILE // about', icon: 'ID', status: 'profile // public', width: 720, height: 560, render: renderAbout },
    resources: { title: 'RESOURCE INDEX // links', icon: '//', status: 'reference shortcuts', width: 690, height: 500, render: renderResources },
    system: { title: 'SYSTEM MONITOR // settings', icon: '::', status: 'K4INU_OS v1.0', width: 620, height: 470, render: renderSystem },
    radio: { title: 'K4INU SIGNAL//FM // 30-track cyber radio', icon: '♪', status: '30 original procedural tracks // heavy bass + glitch // Web Audio', width: 790, height: 650, render: renderRadio },
    game: { title: 'TOOL TRAIL // operator game', icon: 'TT', status: '7-stage choose-the-right-tool run', width: 820, height: 620, render: renderToolTrail }
  };

  const PROJECTS = [
    {
      id: '4n6duck', name: '4n6Duck', code: '4N6', type: 'DIGITAL FORENSICS',
      desc: 'A Kainu DFIR utility. Open the repository for source, notes, usage, and current capabilities.',
      url: 'https://github.com/K4INU/4n6Duck'
    },
    {
      id: 'finders_keepers', name: 'Finders_Keepers', code: 'FK', type: 'IR / AUTOMATION',
      desc: 'A security automation project built to reduce repetitive analyst work.',
      url: 'https://github.com/K4INU/Finders_Keepers'
    },
    {
      id: 'ipgravedigger', name: 'IPGraveDigger', code: 'IP', type: 'THREAT RESEARCH',
      desc: 'A Kainu project centered on IP-oriented investigation and enrichment workflows.',
      url: 'https://github.com/K4INU/IPGraveDigger'
    },
    {
      id: 'midnightmass', name: 'VirusTotal_MidnightMass', code: 'VT', type: 'THREAT INTEL',
      desc: 'A VirusTotal-focused security workflow for making repetitive research less painful.',
      url: 'https://github.com/K4INU/VirusTotal_MidnightMass'
    }
  ];

  const RADIO_TRACKS = [
    { title:'NIGHT SHIFT', code:'01', bpm:92, root:55, blurb:'Slow neon pulse for late-night triage.', bass:[0,null,0,null,3,null,-2,null,0,null,7,null,3,null,-2,null], lead:[12,null,null,10,null,null,15,null,12,null,null,17,null,15,null,null], chord:[0,3,7], kicks:[0,4,8,12], hats:[1,3,5,7,9,11,13,15], bassWave:'sawtooth', leadWave:'square', bassCutoff:520, leadCutoff:1450 },
    { title:'TRACE ROUTE', code:'02', bpm:108, root:49, blurb:'Fast routing pulses and sharp arp telemetry.', bass:[0,null,7,null,5,null,3,null,0,null,-2,null,3,null,5,null], lead:[12,15,null,19,17,null,15,null,12,10,null,15,17,null,19,null], chord:[0,5,7], kicks:[0,4,8,11,12], hats:[1,3,5,7,9,11,13,15], bassWave:'square', leadWave:'triangle', bassCutoff:640, leadCutoff:1850 },
    { title:'GHOST PROCESS', code:'03', bpm:84, root:58.27, blurb:'Sparse low-frequency drift with glitch telemetry.', bass:[0,null,null,0,null,-5,null,3,0,null,null,7,null,3,null,-2], lead:[12,null,13,null,null,19,null,null,17,null,15,null,null,10,null,null], chord:[0,3,10], kicks:[0,6,8,14], hats:[3,7,11,15], bassWave:'sawtooth', leadWave:'square', bassCutoff:430, leadCutoff:2200, glitch:[5,13] },
    { title:'RED TEAM SUNSET', code:'04', bpm:118, root:46.25, blurb:'Aggressive dusk drive with attack-surface momentum.', bass:[0,0,null,3,5,null,7,null,0,0,null,-2,3,null,5,7], lead:[12,null,15,17,null,19,17,null,24,null,22,19,null,17,15,null], chord:[0,3,7], kicks:[0,3,4,8,10,12,15], hats:[1,2,5,6,9,11,13,14], bassWave:'square', leadWave:'sawtooth', bassCutoff:780, leadCutoff:2400, glitch:[7] },
    { title:'BLUE SCREEN MIDNIGHT', code:'05', bpm:96, root:65.41, blurb:'Cold blue chords and broken-screen melody fragments.', bass:[0,null,-5,null,3,null,0,null,5,null,3,null,-2,null,0,null], lead:[12,null,19,null,17,15,null,null,12,null,10,null,15,null,17,null], chord:[0,4,7], kicks:[0,4,8,12], hats:[1,3,7,9,11,15], bassWave:'triangle', leadWave:'square', bassCutoff:560, leadCutoff:1320 },
    { title:'DEAD DROP', code:'06', bpm:104, root:51.91, blurb:'Tense courier rhythm with clipped encrypted stabs.', bass:[0,null,0,7,null,5,null,3,0,null,-2,null,3,5,null,7], lead:[19,null,17,null,15,null,12,15,null,17,null,22,null,19,17,null], chord:[0,3,8], kicks:[0,4,7,8,12], hats:[1,3,5,9,11,13,15], bassWave:'sawtooth', leadWave:'square', bassCutoff:700, leadCutoff:2050, glitch:[6,14] },
    { title:'NULL ROUTE', code:'07', bpm:86, root:43.65, blurb:'Minimal route-to-nowhere ambience with deep sub motion.', bass:[0,null,null,-2,null,null,5,null,0,null,null,3,null,null,-5,null], lead:[12,null,null,null,15,null,null,10,null,null,17,null,null,null,15,null], chord:[0,5,10], kicks:[0,8,12], hats:[3,7,11,15], bassWave:'triangle', leadWave:'sine', bassCutoff:390, leadCutoff:980 },
    { title:'PACKET STORM', code:'08', bpm:126, root:55, blurb:'High-throughput percussion with jittering packet arps.', bass:[0,0,3,0,5,3,7,5,0,-2,0,3,5,7,3,-2], lead:[12,15,17,19,17,15,22,19,24,22,19,17,15,19,17,12], chord:[0,3,7], kicks:[0,2,4,6,8,10,12,14], hats:[1,3,5,7,9,11,13,15], bassWave:'square', leadWave:'square', bassCutoff:920, leadCutoff:3100, glitch:[3,7,11,15] },
    { title:'COLD BOOT', code:'09', bpm:78, root:49, blurb:'Slow startup sequence with icy pads and low-end bloom.', bass:[0,null,null,null,5,null,null,null,3,null,null,null,-2,null,null,null], lead:[12,null,null,19,null,null,17,null,null,15,null,null,10,null,null,null], chord:[0,4,9], kicks:[0,8], hats:[3,7,11,15], bassWave:'sine', leadWave:'triangle', bassCutoff:350, leadCutoff:1100 },
    { title:'ROOT SHELL', code:'10', bpm:112, root:61.74, blurb:'Privileged-access groove with hard square-wave hooks.', bass:[0,null,0,3,7,null,5,null,0,null,-2,3,5,null,7,null], lead:[12,12,null,15,19,null,17,15,12,null,22,null,19,17,15,null], chord:[0,3,7], kicks:[0,4,8,12,14], hats:[1,3,5,7,9,11,13,15], bassWave:'square', leadWave:'square', bassCutoff:760, leadCutoff:2600 },
    { title:'FALSE POSITIVE', code:'11', bpm:100, root:52, blurb:'Uneasy alert-loop pulse that keeps refusing to resolve.', bass:[0,null,3,null,0,5,null,-2,0,null,7,null,3,null,5,null], lead:[12,null,13,15,null,13,19,null,12,null,17,15,null,19,17,null], chord:[0,2,7], kicks:[0,5,8,12], hats:[1,3,6,7,9,11,14,15], bassWave:'sawtooth', leadWave:'triangle', bassCutoff:610, leadCutoff:1700, glitch:[4,12] },
    { title:'DARK FIBER', code:'12', bpm:90, root:41.2, blurb:'Long-haul backbone atmosphere with deep optical hum.', bass:[0,null,null,7,null,null,5,null,0,null,null,3,null,null,-2,null], lead:[12,null,19,null,null,17,null,null,15,null,22,null,null,19,null,null], chord:[0,5,7], kicks:[0,8], hats:[3,7,11,15], bassWave:'triangle', leadWave:'sawtooth', bassCutoff:440, leadCutoff:1500 },
    { title:'BEACON LOST', code:'13', bpm:120, root:58.27, blurb:'Urgent callback rhythm fading in and out of range.', bass:[0,null,0,5,3,null,7,null,0,-2,null,3,5,null,3,null], lead:[24,null,19,17,null,15,12,null,19,null,22,24,null,17,15,null], chord:[0,3,8], kicks:[0,4,6,8,12,14], hats:[1,3,5,7,9,11,13,15], bassWave:'square', leadWave:'sawtooth', bassCutoff:840, leadCutoff:2800, glitch:[6,10,14] },
    { title:'HONEY POT', code:'14', bpm:94, root:69.3, blurb:'Sweet lure on top, suspicious low-end underneath.', bass:[0,null,3,null,5,null,3,null,0,null,7,null,5,null,-2,null], lead:[12,15,null,17,null,19,22,null,19,17,null,15,null,12,10,null], chord:[0,4,7], kicks:[0,4,8,12], hats:[1,3,5,7,9,11,13,15], bassWave:'triangle', leadWave:'sine', bassCutoff:600, leadCutoff:1900 },
    { title:'ZERO DAY DRIVE', code:'15', bpm:128, root:46.25, blurb:'Fast redline chase built for unknown exploit territory.', bass:[0,0,7,5,3,5,7,3,0,-2,0,3,7,5,3,-2], lead:[12,19,17,15,24,22,19,17,12,15,17,19,22,24,19,17], chord:[0,3,7], kicks:[0,2,4,7,8,10,12,14], hats:[1,3,5,6,9,11,13,15], bassWave:'sawtooth', leadWave:'square', bassCutoff:980, leadCutoff:3400, glitch:[3,7,11,15] },
    { title:'MEMORY DUMP', code:'16', bpm:82, root:55, blurb:'Forensic slow-burn with fragments surfacing from RAM.', bass:[0,null,null,3,null,null,-2,null,0,null,7,null,null,5,null,null], lead:[12,null,null,15,null,10,null,null,17,null,null,19,null,15,null,null], chord:[0,3,10], kicks:[0,8,12], hats:[3,7,11,15], bassWave:'sine', leadWave:'triangle', bassCutoff:420, leadCutoff:1250 },
    { title:'PERSISTENCE', code:'17', bpm:106, root:49, blurb:'Repeating foothold motif that keeps returning after reboot.', bass:[0,null,0,null,5,null,0,null,3,null,0,null,-2,null,7,null], lead:[12,null,17,null,12,19,null,17,12,null,15,null,22,null,17,null], chord:[0,5,7], kicks:[0,4,8,12], hats:[1,3,5,7,9,11,13,15], bassWave:'square', leadWave:'triangle', bassCutoff:700, leadCutoff:2150 },
    { title:'NIGHT WATCH', code:'18', bpm:98, root:58.27, blurb:'Steady SOC-floor patrol with alternating red/blue tension.', bass:[0,null,3,null,7,null,5,null,0,null,-2,null,3,null,5,null], lead:[12,null,15,17,null,19,null,22,19,null,17,15,null,12,10,null], chord:[0,3,7], kicks:[0,4,8,12], hats:[1,3,5,7,9,11,13,15], bassWave:'sawtooth', leadWave:'sine', bassCutoff:620, leadCutoff:1750 },
    { title:'AIR GAP', code:'19', bpm:88, root:43.65, blurb:'Isolated machine-room pulse with wide empty space.', bass:[0,null,null,null,7,null,null,null,5,null,null,null,-2,null,null,null], lead:[12,null,null,10,null,null,17,null,null,null,15,null,null,19,null,null], chord:[0,5,10], kicks:[0,8], hats:[3,7,11,15], bassWave:'triangle', leadWave:'square', bassCutoff:360, leadCutoff:1400 },
    { title:'LAST PACKET', code:'20', bpm:114, root:52, blurb:'Final transmission: driving bass, bright lead, clean cutoff.', bass:[0,null,5,7,3,null,5,null,0,-2,null,3,7,null,5,null], lead:[12,15,null,19,17,null,22,null,24,null,19,17,null,15,12,null], chord:[0,4,7], kicks:[0,4,7,8,12,15], hats:[1,3,5,6,9,11,13,14], bassWave:'sawtooth', leadWave:'triangle', bassCutoff:820, leadCutoff:2500, glitch:[15] },
    { title:'HEAVY PAYLOAD', code:'21', bpm:96, root:46.25, blurb:'Halftime impact with sub pressure and chopped machine stabs.', heavy:true, bass:[0,0,null,-2,0,null,3,null,0,0,null,5,3,null,-2,null], lead:[12,null,12,15,null,19,null,15,12,null,24,null,19,17,null,15], chord:[0,3,7], kicks:[0,3,8,11,12], snares:[4,12], hats:[2,6,10,14,15], bassWave:'sawtooth', leadWave:'square', bassCutoff:690, leadCutoff:2900, glitch:[3,7,11,15], glitchRate:3, drive:72, subGain:.105, growlGain:.052 },
    { title:'REDLINE SUBSYSTEM', code:'22', bpm:104, root:43.65, blurb:'Low-slung distorted bass with redline snare cracks.', heavy:true, bass:[0,null,0,5,null,3,0,null,7,null,5,3,0,null,-2,null], lead:[12,null,17,null,15,19,null,12,24,null,19,null,17,15,null,12], chord:[0,5,7], kicks:[0,2,8,10,14], snares:[4,12], hats:[1,3,5,7,9,11,13,15], bassWave:'square', leadWave:'sawtooth', bassCutoff:740, leadCutoff:3200, glitch:[6,7,14,15], glitchRate:4, drive:88, subGain:.11, growlGain:.055 },
    { title:'BUFFER OVERRUN', code:'23', bpm:132, root:49, blurb:'Fast broken-beat assault with jittered bass fragments.', heavy:true, bass:[0,0,3,null,7,5,3,0,0,-2,3,5,7,null,3,-2], lead:[12,19,15,24,17,22,19,15,12,24,22,17,19,15,12,10], chord:[0,3,10], kicks:[0,2,5,8,10,13,15], snares:[4,12], hats:[1,3,6,7,9,11,14,15], bassWave:'sawtooth', leadWave:'square', bassCutoff:980, leadCutoff:3900, glitch:[2,3,6,7,10,11,14,15], glitchRate:5, drive:96, subGain:.092, growlGain:.062 },
    { title:'BLACK ICE', code:'24', bpm:88, root:41.2, blurb:'Glacial halftime drums over a huge dark sub floor.', heavy:true, bass:[0,null,null,0,null,-2,null,5,0,null,null,3,null,-5,null,-2], lead:[12,null,null,19,null,null,15,null,12,null,24,null,null,17,null,null], chord:[0,3,8], kicks:[0,7,8], snares:[4,12], hats:[2,6,10,14], bassWave:'triangle', leadWave:'sawtooth', bassCutoff:560, leadCutoff:2300, glitch:[7,15], glitchRate:2, drive:64, subGain:.125, growlGain:.045 },
    { title:'FAULT INJECTION', code:'25', bpm:118, root:51.91, blurb:'Syncopated drop rhythm with clipped glitch-bass injections.', heavy:true, bass:[0,0,null,7,5,null,3,0,0,-2,null,5,7,3,null,-2], lead:[12,null,24,19,null,17,15,null,12,22,null,19,17,null,15,24], chord:[0,2,7], kicks:[0,3,6,8,11,14], snares:[4,12], hats:[1,2,5,7,9,10,13,15], bassWave:'square', leadWave:'square', bassCutoff:850, leadCutoff:3600, glitch:[3,6,7,11,14,15], glitchRate:4, drive:102, subGain:.1, growlGain:.06 },
    { title:'DARKNET ENGINE', code:'26', bpm:100, root:46.25, blurb:'Mechanical low-end engine with wide cinematic breaks.', heavy:true, bass:[0,null,0,null,3,5,null,-2,0,null,7,null,5,3,null,-2], lead:[12,null,15,null,19,null,17,24,12,null,22,null,19,null,17,null], chord:[0,3,7], kicks:[0,2,8,10,15], snares:[4,12], hats:[1,3,5,7,9,11,13,15], bassWave:'sawtooth', leadWave:'triangle', bassCutoff:720, leadCutoff:2750, glitch:[5,13,15], glitchRate:3, drive:78, subGain:.118, growlGain:.048 },
    { title:'KERNEL PANIC', code:'27', bpm:140, root:55, blurb:'Frantic stutters, hard kicks and overloaded low-frequency motion.', heavy:true, bass:[0,3,0,7,5,3,-2,0,0,7,5,3,0,-2,3,5], lead:[24,19,17,15,22,19,24,17,12,15,19,22,24,17,15,12], chord:[0,3,7], kicks:[0,2,4,7,8,10,12,15], snares:[4,12], hats:[1,3,5,6,9,11,13,14], bassWave:'square', leadWave:'sawtooth', bassCutoff:1120, leadCutoff:4400, glitch:[1,3,5,7,9,11,13,15], glitchRate:6, drive:118, subGain:.09, growlGain:.067 },
    { title:'SIGNAL JAMMER', code:'28', bpm:110, root:43.65, blurb:'Radio-noise cuts and chest-heavy bass under a broken pulse.', heavy:true, bass:[0,null,0,3,null,7,5,null,0,-2,null,3,7,null,5,-2], lead:[12,15,null,24,null,19,17,null,12,null,22,19,null,17,null,24], chord:[0,5,10], kicks:[0,3,8,11,14], snares:[4,12], hats:[1,2,6,7,9,10,14,15], bassWave:'sawtooth', leadWave:'square', bassCutoff:800, leadCutoff:3500, glitch:[2,6,10,14,15], glitchRate:5, drive:92, subGain:.115, growlGain:.058 },
    { title:'DROP TABLE', code:'29', bpm:124, root:49, blurb:'Drop-focused electro with stop-start bass and sharp digital fills.', heavy:true, bass:[0,0,null,0,7,null,5,3,0,null,-2,0,5,7,null,3], lead:[12,null,19,24,null,22,17,null,12,15,null,24,19,null,17,15], chord:[0,3,8], kicks:[0,2,4,8,10,12,15], snares:[4,12], hats:[1,3,5,7,9,11,13,14], bassWave:'square', leadWave:'square', bassCutoff:940, leadCutoff:4100, glitch:[3,7,11,14,15], glitchRate:4, drive:108, subGain:.098, growlGain:.064 },
    { title:'SUBNET COLLAPSE', code:'30', bpm:90, root:38.89, blurb:'The deepest channel: massive sub drops, sparse hits and corrupted echoes.', heavy:true, bass:[0,null,null,0,null,7,null,null,0,null,-5,null,3,null,-2,null], lead:[12,null,null,24,null,null,19,null,12,null,null,17,null,22,null,null], chord:[0,3,10], kicks:[0,7,8,15], snares:[4,12], hats:[2,6,10,14], bassWave:'sawtooth', leadWave:'triangle', bassCutoff:520, leadCutoff:2600, glitch:[7,14,15], glitchRate:3, drive:84, subGain:.135, growlGain:.05 }
  ];

  const radioState = {
    ctx: null, master: null, noise: null, timer: null,
    playing: false, trackIndex: 0, step: 0, nextNoteTime: 0,
    volume: Number(localStorage.getItem('k4-radio-volume') || .22)
  };

  function noteHz(root, semitone) { return root * Math.pow(2, semitone / 12); }

  function initRadio() {
    if (radioState.ctx) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) { toast('Web Audio is not supported by this browser.'); return; }
    const ctx = new AudioCtx();
    const master = ctx.createGain();
    const compressor = ctx.createDynamicsCompressor();
    master.gain.value = radioState.volume;
    compressor.threshold.value = -20;
    compressor.knee.value = 10;
    compressor.ratio.value = 6;
    compressor.attack.value = .003;
    compressor.release.value = .22;
    master.connect(compressor).connect(ctx.destination);
    const noise = ctx.createBuffer(1, Math.max(1, Math.floor(ctx.sampleRate * .08)), ctx.sampleRate);
    const data = noise.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    radioState.ctx = ctx; radioState.master = master; radioState.noise = noise;
  }

  function synthVoice(time, duration, frequency, type, volume, cutoff = 900) {
    const { ctx, master } = radioState; if (!ctx || !master) return;
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    osc.type = type; osc.frequency.setValueAtTime(frequency, time);
    filter.type = 'lowpass'; filter.frequency.setValueAtTime(cutoff, time); filter.Q.value = 2.2;
    gain.gain.setValueAtTime(.0001, time);
    gain.gain.exponentialRampToValueAtTime(Math.max(.0002, volume), time + .012);
    gain.gain.exponentialRampToValueAtTime(.0001, time + duration);
    osc.connect(filter).connect(gain).connect(master);
    osc.start(time); osc.stop(time + duration + .03);
  }

  function distortionCurve(amount = 80) {
    const samples = 22050;
    const curve = new Float32Array(samples);
    const k = Math.max(1, amount);
    for (let i = 0; i < samples; i++) {
      const x = i * 2 / samples - 1;
      curve[i] = ((3 + k) * x * 20 * Math.PI / 180) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  function heavyBass(time, duration, frequency, track) {
    const { ctx, master } = radioState; if (!ctx || !master) return;
    const sub = ctx.createOscillator();
    const subGain = ctx.createGain();
    const growl = ctx.createOscillator();
    const shaper = ctx.createWaveShaper();
    const filter = ctx.createBiquadFilter();
    const growlGain = ctx.createGain();

    sub.type = 'sine'; sub.frequency.setValueAtTime(frequency, time);
    subGain.gain.setValueAtTime(.0001, time);
    subGain.gain.exponentialRampToValueAtTime(track.subGain || .105, time + .012);
    subGain.gain.exponentialRampToValueAtTime(.0001, time + duration);
    sub.connect(subGain).connect(master);

    growl.type = track.bassWave || 'sawtooth';
    growl.frequency.setValueAtTime(frequency * 2, time);
    growl.detune.setValueAtTime(-7, time);
    shaper.curve = distortionCurve(track.drive || 82); shaper.oversample = '2x';
    filter.type = 'lowpass'; filter.frequency.setValueAtTime(track.bassCutoff || 760, time); filter.Q.value = 4.2;
    filter.frequency.exponentialRampToValueAtTime(Math.max(150, (track.bassCutoff || 760) * .48), time + duration * .9);
    growlGain.gain.setValueAtTime(.0001, time);
    growlGain.gain.exponentialRampToValueAtTime(track.growlGain || .052, time + .008);
    growlGain.gain.exponentialRampToValueAtTime(.0001, time + duration);
    growl.connect(shaper).connect(filter).connect(growlGain).connect(master);

    sub.start(time); growl.start(time);
    sub.stop(time + duration + .03); growl.stop(time + duration + .03);
  }

  function snare(time, level = .09) {
    const { ctx, master, noise } = radioState; if (!ctx || !master || !noise) return;
    const src = ctx.createBufferSource(); const hp = ctx.createBiquadFilter(); const ng = ctx.createGain();
    src.buffer = noise; hp.type = 'highpass'; hp.frequency.value = 1100;
    ng.gain.setValueAtTime(level, time); ng.gain.exponentialRampToValueAtTime(.0001, time + .14);
    src.connect(hp).connect(ng).connect(master); src.start(time); src.stop(time + .15);
    const body = ctx.createOscillator(); const bg = ctx.createGain();
    body.type = 'triangle'; body.frequency.setValueAtTime(185, time); body.frequency.exponentialRampToValueAtTime(110, time + .08);
    bg.gain.setValueAtTime(level * .45, time); bg.gain.exponentialRampToValueAtTime(.0001, time + .1);
    body.connect(bg).connect(master); body.start(time); body.stop(time + .11);
  }

  function glitchBurst(time, stepDur, track, step) {
    const rate = Math.max(2, Math.min(7, track.glitchRate || 3));
    for (let i = 0; i < rate; i++) {
      const offset = i * stepDur / (rate + 1);
      const semi = 24 + ((step * 3 + i * 5) % 17);
      synthVoice(time + offset, Math.max(.025, stepDur / (rate + 2)), noteHz(track.root, semi), i % 2 ? 'square' : 'sawtooth', .0085, Math.max(2600, track.leadCutoff || 3200));
    }
  }

  function kick(time) {
    const { ctx, master } = radioState; if (!ctx || !master) return;
    const osc = ctx.createOscillator(); const gain = ctx.createGain();
    osc.type = 'sine'; osc.frequency.setValueAtTime(125, time); osc.frequency.exponentialRampToValueAtTime(42, time + .13);
    gain.gain.setValueAtTime(.28, time); gain.gain.exponentialRampToValueAtTime(.0001, time + .17);
    osc.connect(gain).connect(master); osc.start(time); osc.stop(time + .18);
  }

  function hat(time, level = .032) {
    const { ctx, master, noise } = radioState; if (!ctx || !master || !noise) return;
    const src = ctx.createBufferSource(); const filter = ctx.createBiquadFilter(); const gain = ctx.createGain();
    src.buffer = noise; filter.type = 'highpass'; filter.frequency.value = 5200;
    gain.gain.setValueAtTime(level, time); gain.gain.exponentialRampToValueAtTime(.0001, time + .045);
    src.connect(filter).connect(gain).connect(master); src.start(time); src.stop(time + .055);
  }

  function scheduleRadioStep(time) {
    const track = RADIO_TRACKS[radioState.trackIndex];
    const step = radioState.step % 16;
    const stepDur = 60 / track.bpm / 4;
    const kicks = track.kicks || [0,4,8,12];
    const hats = track.hats || [1,3,5,7,9,11,13,15];
    if (kicks.includes(step)) kick(time);
    if ((track.snares || []).includes(step)) snare(time, track.heavy ? .105 : .075);
    if (hats.includes(step)) hat(time, step % 4 === 3 ? (track.heavy ? .045 : .038) : (track.heavy ? .031 : .025));
    const bass = track.bass[step];
    if (bass !== null) {
      if (track.heavy) heavyBass(time, stepDur * 1.7, noteHz(track.root, bass), track);
      else synthVoice(time, stepDur * 1.65, noteHz(track.root, bass), track.bassWave || 'sawtooth', .055, track.bassCutoff || 520);
    }
    const lead = track.lead[step];
    if (lead !== null) synthVoice(time + .01, stepDur * .8, noteHz(track.root, lead), track.leadWave || 'square', .018, track.leadCutoff || 1450);
    const chordSteps = track.chordSteps || [0,8];
    if (chordSteps.includes(step)) {
      track.chord.forEach((n, i) => synthVoice(time, stepDur * 7.5, noteHz(track.root, n + 12), track.chordWave || 'triangle', .011 - i * .001, Math.max(620, (track.bassCutoff || 520) + 240)));
    }
    const glitchSteps = track.glitch || [6,14];
    if (glitchSteps.includes(step)) {
      if (track.heavy) glitchBurst(time, stepDur, track, step);
      else synthVoice(time, stepDur * .45, noteHz(track.root, 24 + (step % 8)), 'square', .01, Math.max(2200, track.leadCutoff || 2800));
    }
    radioState.step++;
    radioState.nextNoteTime += stepDur;
  }

  function radioScheduler() {
    const { ctx } = radioState; if (!ctx || !radioState.playing) return;
    while (radioState.nextNoteTime < ctx.currentTime + .13) scheduleRadioStep(radioState.nextNoteTime);
  }

  async function playRadio() {
    initRadio(); if (!radioState.ctx) return;
    await radioState.ctx.resume();
    if (radioState.playing) return;
    radioState.playing = true; radioState.step = 0; radioState.nextNoteTime = radioState.ctx.currentTime + .05;
    radioState.timer = setInterval(radioScheduler, 25); radioScheduler(); syncRadioUI();
  }

  function pauseRadio() {
    radioState.playing = false;
    if (radioState.timer) clearInterval(radioState.timer);
    radioState.timer = null; syncRadioUI();
  }

  function toggleRadio() { radioState.playing ? pauseRadio() : playRadio(); }

  function setRadioTrack(index) {
    radioState.trackIndex = (index + RADIO_TRACKS.length) % RADIO_TRACKS.length;
    radioState.step = 0;
    if (radioState.ctx) radioState.nextNoteTime = radioState.ctx.currentTime + .05;
    syncRadioUI();
  }

  function syncRadioUI() {
    const track = RADIO_TRACKS[radioState.trackIndex];
    document.querySelectorAll('[data-radio-track]').forEach(el => el.textContent = track.title);
    document.querySelectorAll('[data-radio-meta]').forEach(el => el.textContent = `${track.bpm} BPM // ${track.code}`);
    document.querySelectorAll('[data-radio-status]').forEach(el => el.textContent = radioState.playing ? 'TRANSMITTING' : 'STANDBY');
    document.querySelectorAll('[data-radio-play]').forEach(el => { el.textContent = radioState.playing ? 'Ⅱ' : '▶'; el.setAttribute('aria-label', radioState.playing ? 'Pause music' : 'Play music'); });
    document.querySelectorAll('[data-radio-track-index]').forEach(el => el.classList.toggle('active', Number(el.dataset.radioTrackIndex) === radioState.trackIndex));
    document.querySelectorAll('[data-radio-volume]').forEach(el => { if (document.activeElement !== el) el.value = String(radioState.volume); });
    document.querySelectorAll('.signal-dock, .radio-console').forEach(el => el.classList.toggle('playing', radioState.playing));
  }

  const desktop = document.getElementById('desktop');
  const layer = document.getElementById('windowLayer');

  const TOOL_TRAIL_LEVELS = [
    {
      title: 'LEVEL 1 // QUIET RECON',
      blurb: 'You land on a suspicious conference network. Stay quiet and collect clues before you get noticed.',
      choices: [
        { name:'Nmap', tag:'LOUD SWEEP', good:false, result:'The network lights up with alarms. Useful, but far too noisy for the first move.' },
        { name:'Wireshark', tag:'PASSIVE CAPTURE', good:true, result:'Good call. You stayed passive, captured the traffic, and spotted the beacon quietly.' },
        { name:'Hydra', tag:'CREDENTIAL SPRAY', good:false, result:'That escalated quickly. Spraying creds on step one is the opposite of stealth.' }
      ]
    },
    {
      title: 'LEVEL 2 // DECODE THE LURE',
      blurb: 'The phish payload is obfuscated and ugly. You need to peel it apart fast.',
      choices: [
        { name:'CyberChef', tag:'DECODE / TRANSFORM', good:true, result:'Exactly right. Recipes, transforms, and quick pivots reveal the hidden payload chain.' },
        { name:'John the Ripper', tag:'HASH CRACK', good:false, result:'Powerful tool, wrong problem. There is no hash to crack here.' },
        { name:'Gobuster', tag:'CONTENT ENUM', good:false, result:'Useful on web targets, but it does nothing for this encoded lure.' }
      ]
    },
    {
      title: 'LEVEL 3 // MEMORY GHOST',
      blurb: 'An endpoint is compromised and you have a volatile memory capture. The implant is hiding in RAM.',
      choices: [
        { name:'Volatility', tag:'MEMORY FORENSICS', good:true, result:'Nice. You carved out the process tree and found the injected beacon in memory.' },
        { name:'sqlmap', tag:'DB EXPLoIT', good:false, result:'Wrong battlefield. This host problem is not a web database injection problem.' },
        { name:'ExifTool', tag:'METADATA', good:false, result:'Not enough. Metadata will not surface a memory-resident implant.' }
      ]
    },
    {
      title: 'LEVEL 4 // PATH TO ADMIN',
      blurb: 'The domain is sprawling. You need to map privilege paths and find the shortest route to impact.',
      choices: [
        { name:'BloodHound', tag:'AD GRAPHING', good:true, result:'Perfect. The graph exposes misconfigurations and shows the cleanest route through AD.' },
        { name:'Metasploit', tag:'EXPLOIT FRAMEWORK', good:false, result:'Too heavy too soon. You still need to understand the environment before firing exploits.' },
        { name:'Hashcat', tag:'GPU CRACKING', good:false, result:'Cracking can help later, but it does not map identity relationships across the domain.' }
      ]
    },
    {
      title: 'LEVEL 5 // WEB APP EDGE',
      blurb: 'A portal is leaking weird responses. You need to intercept, replay, and mutate requests.',
      choices: [
        { name:'Burp Suite', tag:'INTERCEPT / REPLAY', good:true, result:'Correct. Interception and repeatable request mutation gets you the edge you need.' },
        { name:'Aircrack-ng', tag:'WIRELESS', good:false, result:'Not the right layer. This is a web application problem, not a wireless one.' },
        { name:'Responder', tag:'LLMNR/NBT-NS', good:false, result:'Handy internally, but it is not the right choice for dissecting portal requests.' }
      ]
    },
    {
      title: 'LEVEL 6 // ENDPOINT HUNT',
      blurb: 'The beacon jumped hosts. You need broad endpoint visibility fast without flying blind.',
      choices: [
        { name:'Velociraptor', tag:'FLEET HUNTING', good:true, result:'Strong pick. Rapid collection and hunt queries let you track the beacon across hosts.' },
        { name:'Nikto', tag:'WEB SCAN', good:false, result:'Wrong target set. Nikto is not going to help you hunt an endpoint beacon fleet-wide.' },
        { name:'Mimikatz', tag:'CRED EXTRACTION', good:false, result:'That is far too risky for broad triage and not the best path for visibility.' }
      ]
    },
    {
      title: 'LEVEL 7 // FINAL PACKAGE',
      blurb: 'The last artifact is buried in a suspicious firmware blob. One good tool choice finishes the run.',
      choices: [
        { name:'Binwalk', tag:'FIRMWARE EXTRACTION', good:true, result:'Mission complete. You unpacked the blob, extracted the hidden payload, and closed the case.' },
        { name:'Nuclei', tag:'TEMPLATE SCAN', good:false, result:'Great scanner, wrong finish. You needed to unpack the artifact, not scan a service.' },
        { name:'CrackMapExec', tag:'LATERAL OPS', good:false, result:'Useful elsewhere, but it does not carve hidden content from a firmware image.' }
      ]
    }
  ];

  const template = document.getElementById('windowTemplate');
  const taskButtons = document.getElementById('taskButtons');
  const startButton = document.getElementById('startButton');
  const startMenu = document.getElementById('startMenu');
  const scanlines = document.getElementById('scanlines');
  const openWindows = new Map();
  let zCounter = 50;
  let windowCount = 0;

  function esc(text) {
    const div = document.createElement('div');
    div.textContent = String(text);
    return div.innerHTML;
  }

  function openApp(id) {
    closeStart();
    if (!APPS[id]) return;
    if (openWindows.has(id)) {
      const existing = openWindows.get(id);
      existing.el.classList.remove('minimized');
      activateWindow(id);
      return;
    }

    const app = APPS[id];
    const el = template.content.firstElementChild.cloneNode(true);
    el.dataset.app = id;
    el.style.setProperty('--w', `min(${app.width}px, 82vw)`);
    el.style.setProperty('--h', `min(${app.height}px, 76vh)`);

    const offset = (windowCount++ % 7) * 24;
    el.style.setProperty('--x', `${Math.max(16, window.innerWidth * .09 + offset)}px`);
    el.style.setProperty('--y', `${Math.max(54, window.innerHeight * .07 + offset)}px`);
    el.querySelector('.window-name').textContent = app.title;
    el.querySelector('.window-status').textContent = app.status;
    el.querySelector('.window-body').appendChild(app.render(id));

    layer.appendChild(el);
    makeDraggable(el);
    bindWindowControls(el, id);

    const task = document.createElement('button');
    task.className = 'task-button';
    task.textContent = `${app.icon} ${app.title.split('//')[0].trim()}`;
    task.addEventListener('click', () => {
      if (el.classList.contains('minimized')) {
        el.classList.remove('minimized');
        activateWindow(id);
      } else if (el.classList.contains('active')) {
        el.classList.add('minimized');
        el.classList.remove('active');
        task.classList.remove('active');
      } else activateWindow(id);
    });
    taskButtons.appendChild(task);

    openWindows.set(id, { el, task });
    el.addEventListener('pointerdown', () => activateWindow(id));
    activateWindow(id);
  }

  function closeApp(id) {
    const item = openWindows.get(id);
    if (!item) return;
    item.el.remove();
    item.task.remove();
    openWindows.delete(id);
  }

  function activateWindow(id) {
    for (const [key, item] of openWindows) {
      const active = key === id;
      item.el.classList.toggle('active', active);
      item.task.classList.toggle('active', active && !item.el.classList.contains('minimized'));
    }
    const item = openWindows.get(id);
    if (item) item.el.style.zIndex = ++zCounter;
  }

  function bindWindowControls(el, id) {
    el.querySelector('[data-action="close"]').addEventListener('click', (e) => { e.stopPropagation(); closeApp(id); });
    el.querySelector('[data-action="minimize"]').addEventListener('click', (e) => {
      e.stopPropagation(); el.classList.add('minimized'); openWindows.get(id)?.task.classList.remove('active');
    });
    el.querySelector('[data-action="maximize"]').addEventListener('click', (e) => {
      e.stopPropagation(); el.classList.toggle('maximized'); activateWindow(id);
    });
    el.querySelector('.window-titlebar').addEventListener('dblclick', () => {
      if (window.matchMedia('(max-width: 850px)').matches) return;
      el.classList.toggle('maximized');
    });
  }

  function makeDraggable(el) {
    const bar = el.querySelector('.window-titlebar');
    let dragging = false, dx = 0, dy = 0;
    bar.addEventListener('pointerdown', (e) => {
      if (e.target.closest('button') || el.classList.contains('maximized') || window.matchMedia('(max-width: 850px)').matches) return;
      dragging = true;
      const rect = el.getBoundingClientRect();
      dx = e.clientX - rect.left; dy = e.clientY - rect.top;
      bar.setPointerCapture(e.pointerId);
    });
    bar.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const maxX = Math.max(0, window.innerWidth - el.offsetWidth);
      const maxY = Math.max(0, window.innerHeight - 48 - el.offsetHeight);
      const x = Math.min(maxX, Math.max(0, e.clientX - dx));
      const y = Math.min(maxY, Math.max(0, e.clientY - dy));
      el.style.left = `${x}px`; el.style.top = `${y}px`;
      el.style.setProperty('--x', `${x}px`); el.style.setProperty('--y', `${y}px`);
    });
    bar.addEventListener('pointerup', () => dragging = false);
    bar.addEventListener('pointercancel', () => dragging = false);
  }

  function renderTerminal() {
    const wrap = document.createElement('div');
    wrap.className = 'terminal';
    wrap.innerHTML = `
      <div class="terminal-output" aria-live="polite"></div>
      <form class="terminal-prompt-row">
        <span class="prompt">kainu@k4inu:~$</span>
        <input class="terminal-input" autocomplete="off" autocapitalize="none" spellcheck="false" aria-label="Terminal command" />
      </form>`;
    const out = wrap.querySelector('.terminal-output');
    const input = wrap.querySelector('.terminal-input');
    const form = wrap.querySelector('form');
    const history = [];
    let historyIndex = 0;

    const print = (text = '', cls = '') => {
      const line = document.createElement('div');
      line.className = `terminal-line ${cls}`;
      line.textContent = text;
      out.appendChild(line);
      out.scrollTop = out.scrollHeight;
    };
    const printHTML = (html, cls = '') => {
      const line = document.createElement('div');
      line.className = `terminal-line ${cls}`;
      line.innerHTML = html;
      out.appendChild(line);
      out.scrollTop = out.scrollHeight;
    };

    print('K4INU_OS terminal 1.0.0');
    print('DFIR workstation interface // static client-side simulation', 'dim');
    print('Type "help" to list available commands.', 'amber');
    print('');

    function run(raw) {
      const command = raw.trim();
      print(`kainu@k4inu:~$ ${command}`);
      if (!command) return;
      const [cmd, ...args] = command.split(/\s+/);
      const arg = args.join(' ').toLowerCase();
      switch (cmd.toLowerCase()) {
        case 'help':
          print('help                 show this command list');
          print('whoami               operator profile');
          print('ls                   list workspace items');
          print('projects             list project repositories');
          print('open <name>          open terminal/projects/badges/about/resources/system/radio/game');
          print('cat about            print profile summary');
          print('neofetch             system summary');
          print('radio                open synthwave player');
          print('game                 open tool-selection game');
          print('play / pause          control Signal FM');
          print('github               open github.com/K4INU');
          print('date                  local browser date/time');
          print('clear                 clear terminal');
          break;
        case 'whoami':
          print('Kainu // Security Professional');
          print('Incident Response · Digital Forensics · Threat Hunting · Automation', 'dim');
          print('DEF CON SOC GOON · DEF CON 33 + 34 Speaker · Blue Team Village CTF DC32–34', 'amber');
          print('Ham Radio Village · Pinky + the Brain Fox · DEF CON 34', 'amber');
          break;
        case 'ls':
          print('about.txt   projects/   credentials/   resources/   radio/   game/   system/');
          break;
        case 'projects':
          PROJECTS.forEach(p => print(`${p.name.padEnd(27)} ${p.type}`, 'dim'));
          print('Tip: open projects', 'amber');
          break;
        case 'open': {
          const aliases = { project:'projects', projects:'projects', badge:'credentials', badges:'credentials', credentials:'credentials', defcon:'credentials', hrv:'credentials', ham:'credentials', about:'about', resources:'resources', resource:'resources', system:'system', terminal:'terminal', radio:'radio', music:'radio', signal:'radio', game:'game', trail:'game', tooltrail:'game', tools:'game' };
          if (aliases[arg]) openApp(aliases[arg]);
          else {
            const project = PROJECTS.find(p => p.id === arg || p.name.toLowerCase() === arg);
            if (project) window.open(project.url, '_blank', 'noopener,noreferrer');
            else print(`open: unknown target: ${arg || '(missing)'}`, 'error');
          }
          break;
        }
        case 'cat':
          if (arg === 'about' || arg === 'about.txt') {
            print('I write scripts and small tools to augment and simplify time-consuming security tasks.');
            print('DEF CON SOC GOON // Speaker at DEF CON 33 and 34.', 'amber');
            print('Blue Team Village CTF // DEF CON 32, 33, and 34.', 'amber');
            print('DEF CON 33 + 34 talk: Threat Hunting 101: Beyond the Alerts.', 'amber');
            print('Ham Radio Village // Pinky + the Brain Fox at DEF CON 34.', 'amber');
            print('Nothing here needs to be groundbreaking to be useful.', 'dim');
          } else print(`cat: ${arg || '(missing)'}: no such file`, 'error');
          break;
        case 'neofetch':
          printHTML('<span style="color:#7dffb2">K4INU_OS</span>  v1.0');
          print('Host:        kainu.codes');
          print('Shell:       browser/js');
          print('Focus:       IR / DFIR / threat hunting');
          print('Community:   DEF CON SOC GOON / DC33 + DC34 speaker / BTV CTF DC32–34');
          print('Radio:       Ham Radio Village / Pinky + the Brain Fox / DC34');
          print('Mini-game:   Tool Trail // 7-stage run');
          print('Deployment:  GitHub Pages');
          print(`Viewport:    ${window.innerWidth}x${window.innerHeight}`);
          break;
        case 'radio': case 'music': openApp('radio'); break;
        case 'game': case 'trail': case 'tools': openApp('game'); break;
        case 'play': playRadio(); print('Signal FM: transmitting.', 'dim'); break;
        case 'pause': pauseRadio(); print('Signal FM: standby.', 'dim'); break;
        case 'github':
          window.open('https://github.com/K4INU', '_blank', 'noopener,noreferrer');
          print('Opening https://github.com/K4INU ...', 'dim');
          break;
        case 'date': print(new Date().toString()); break;
        case 'clear': out.textContent = ''; break;
        case 'sudo': print('Nice try. This is a static site.', 'amber'); break;
        case 'rm':
          if (args.includes('-rf') || args.includes('-fr')) print('Denied: portfolio persistence protection enabled.', 'error');
          else print(`rm: read-only filesystem`, 'error');
          break;
        default: print(`${cmd}: command not found. Try "help".`, 'error');
      }
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const value = input.value;
      if (value.trim()) { history.push(value); historyIndex = history.length; }
      input.value = '';
      run(value);
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') { e.preventDefault(); if (historyIndex > 0) input.value = history[--historyIndex]; }
      if (e.key === 'ArrowDown') { e.preventDefault(); if (historyIndex < history.length - 1) input.value = history[++historyIndex]; else { historyIndex = history.length; input.value = ''; } }
    });
    setTimeout(() => input.focus(), 60);
    return wrap;
  }

  function renderProjects() {
    const root = document.createElement('div');
    root.className = 'panel-content';
    root.innerHTML = `<div class="panel-eyebrow">/HOME/KAINU/PROJECTS</div><h2>Project Vault</h2><p>Small utilities, experiments, and security workflow helpers. Repository links open the source on GitHub.</p>`;
    const grid = document.createElement('div');
    grid.className = 'project-grid';
    PROJECTS.forEach(p => {
      const card = document.createElement('article');
      card.className = 'project-card'; card.dataset.code = p.code;
      card.innerHTML = `<div class="project-type">${esc(p.type)}</div><h3>${esc(p.name)}</h3><p>${esc(p.desc)}</p><div class="project-actions"><a class="text-link" href="${p.url}" target="_blank" rel="noreferrer">VIEW SOURCE ↗</a><button class="mini-btn" data-copy="${p.url}">COPY URL</button></div>`;
      grid.appendChild(card);
    });
    root.appendChild(grid);
    root.addEventListener('click', async (e) => {
      const btn = e.target.closest('[data-copy]'); if (!btn) return;
      try { await navigator.clipboard.writeText(btn.dataset.copy); toast('Repository URL copied.'); }
      catch { toast(btn.dataset.copy); }
    });
    return root;
  }

  function renderCredentials() {
    const root = document.createElement('div');
    root.className = 'panel-content credentials-panel';
    root.innerHTML = `
      <div class="panel-eyebrow">FIELD RECORD // COMMUNITY</div>
      <h2>DEF CON Credentials</h2>
      <p>DEF CON SOC, speaking, Blue Team Village CTF, and Ham Radio Village field work.</p>

      <div class="credential-grid">
        <article class="credential-card defcon-card">
          <div class="credential-logo large">
            <span class="logo-fallback">DEF CON<br>GOON</span>
            <img src="https://images.credly.com/images/9a698c36-3b13-48b4-a3bf-8a070d5000a6/twitter_thumb_201604_image.png" alt="DEF CON Goon emblem" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()" />
          </div>
          <div class="credential-copy-block">
            <div class="credential-label">DEF CON // SOC</div>
            <h3>DEF CON SOC GOON</h3>
            <p>DEF CON SOC GOON.</p>
            <div class="credential-tags"><span>DEF CON</span><span>GOON</span><span>SOC</span></div>
          </div>
        </article>

        <article class="credential-card btv-card">
          <div class="credential-logo large">
            <span class="logo-fallback">BLUE TEAM<br>VILLAGE</span>
            <img src="https://github.com/blueteamvillage.png?size=320" alt="Blue Team Village logo" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()" />
          </div>
          <div class="credential-copy-block">
            <div class="credential-label">DEF CON 33 + 34 // SPEAKER</div>
            <h3>Blue Team Village</h3>
            <p>Speaker at DEF CON 33 and DEF CON 34, presenting <strong>Threat Hunting 101: Beyond the Alerts</strong> at both.</p>
            <div class="credential-tags blue"><span>BLUE TEAM</span><span>DC33</span><span>DC34</span><span>SPEAKER</span></div>
          </div>
        </article>

        <article class="credential-card hrv-card">
          <div class="credential-logo large">
            <span class="logo-fallback">HAM RADIO<br>VILLAGE</span>
            <img src="assets/hrv-logo.png" alt="Ham Radio Village logo" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()" />
          </div>
          <div class="credential-copy-block">
            <div class="credential-label">DEF CON 34 // FOX HUNT</div>
            <h3>Ham Radio Village</h3>
            <p><strong>Pinky and the Brain Fox</strong> for the Ham Radio Village fox hunt at DEF CON 34.</p>
            <div class="credential-tags amber"><span>HAM RADIO VILLAGE</span><span>FOX HUNT</span><span>DC34</span><span>PINKY + THE BRAIN</span></div>
            <div class="credential-inline-link"><a class="text-link" href="https://github.com/HamRadioVillage/fox-hunt-writeups/tree/main/dc34" target="_blank" rel="noreferrer">DC34 FOX WRITEUPS ↗</a></div>
          </div>
        </article>
      </div>

      <section class="speaker-callout obsidian-callout">
        <div class="speaker-index">PROJECT OBSIDIAN // BLUE TEAM VILLAGE CTF // DEF CON 32 · 33 · 34</div>
        <div class="obsidian-layout">
          <img class="obsidian-mark" src="assets/project-obsidian-logo.png" alt="Project Obsidian" />
          <div>
            <div class="speaker-kicker">BLUE TEAM VILLAGE CTF</div>
            <h3>DEF CON 32 · 33 · 34</h3>
            <p>Blue Team Village CTF for DEF CON 32, DEF CON 33, and DEF CON 34.</p>
          </div>
          <div class="speaker-actions">
            <a class="text-link" href="https://www.blueteamvillage.org/programs/project-obsidian" target="_blank" rel="noreferrer">PROJECT OBSIDIAN ↗</a>
            <a class="text-link" href="https://ctf.blueteamvillage.org/" target="_blank" rel="noreferrer">BTV CTF ↗</a>
          </div>
        </div>
      </section>

      <section class="speaker-callout">
        <div class="speaker-index">DEF CON 33 + 34 // BTV // THREAT HUNTING</div>
        <div class="speaker-callout-grid">
          <div>
            <div class="speaker-kicker">FEATURED TALK</div>
            <h3>Threat Hunting 101: Beyond the Alerts</h3>
            <p>A practical introduction to moving beyond alert queues and into deliberate, analyst-driven threat hunting.</p>
          </div>
          <div class="speaker-actions">
            <a class="text-link" href="https://www.blueteamvillage.org/events/def-con-33" target="_blank" rel="noreferrer">BTV @ DEF CON 33 ↗</a>
            <a class="text-link" href="https://defcon.outel.org/defcon33/dc33_schedule.pdf" target="_blank" rel="noreferrer">DEF CON 33 SCHEDULE ↗</a>
          </div>
        </div>
      </section>
      <p class="mark-note">DEF CON, Blue Team Village, and Ham Radio Village marks are shown only to describe community participation and speaking history; they remain the property of their respective organizations. The Project Obsidian emblem is a K4INU_OS site treatment.</p>`;
    return root;
  }

  function renderAbout() {
    const root = document.createElement('div'); root.className = 'panel-content';
    root.innerHTML = `
      <div class="panel-eyebrow">OPERATOR RECORD // PUBLIC</div>
      <div class="about-grid">
        <aside class="id-card">
          <div class="id-avatar">K4</div>
          <dl><dt>HANDLE</dt><dd>Kainu</dd><dt>ROLE</dt><dd>Security Professional</dd><dt>FOCUS</dt><dd>DFIR / IR</dd><dt>STATUS</dt><dd>Building useful things</dd></dl>
        </aside>
        <div>
          <h2>Hi, I’m Kainu.</h2>
          <p>I work across <strong>Incident Response, Digital Forensics, Threat Management</strong>, and adjacent security work.</p>
          <p>I like writing scripts that augment and simplify time-consuming tasks. The point is practical utility: remove friction, automate the boring pieces, and leave more time for investigation.</p>
          <h3>AREAS OF INTEREST</h3>
          <div class="skill-list"><span>INCIDENT RESPONSE</span><span>DIGITAL FORENSICS</span><span>THREAT HUNTING</span><span>THREAT INTEL</span><span>PYTHON</span><span>AUTOMATION</span></div>
          <h3>COMMUNITY / DEF CON</h3>
          <button class="about-credential" data-open="credentials"><strong>DEF CON SOC GOON</strong><span>+</span><strong>DC33 + DC34 SPEAKER</strong><small>Blue Team Village CTF · DC32–34 · Threat Hunting 101 · Ham Radio Village Fox DC34 →</small></button>
          <h3>LINK</h3>
          <p><a class="text-link" href="https://github.com/K4INU" target="_blank" rel="noreferrer">GITHUB PROFILE ↗</a></p>
        </div>
      </div>`;
    return root;
  }

  function renderResources() {
    const root = document.createElement('div'); root.className = 'panel-content';
    root.innerHTML = `
      <div class="panel-eyebrow">REFERENCE // QUICK LINKS</div><h2>Resources</h2>
      <p>A compact launch point for tools and references I use or build around.</p>
      <div class="resource-list">
        <div class="resource-row"><span class="tag">SOURCE</span><span>All K4INU repositories</span><a href="https://github.com/K4INU?tab=repositories" target="_blank" rel="noreferrer">OPEN ↗</a></div>
        <div class="resource-row"><span class="tag">PROFILE</span><span>GitHub profile and activity</span><a href="https://github.com/K4INU" target="_blank" rel="noreferrer">OPEN ↗</a></div>
        <div class="resource-row"><span class="tag">PROJECT</span><span>4n6Duck</span><a href="https://github.com/K4INU/4n6Duck" target="_blank" rel="noreferrer">OPEN ↗</a></div>
        <div class="resource-row"><span class="tag">PROJECT</span><span>IPGraveDigger</span><a href="https://github.com/K4INU/IPGraveDigger" target="_blank" rel="noreferrer">OPEN ↗</a></div>
        <div class="resource-row"><span class="tag">COMMUNITY</span><span>Blue Team Village</span><a href="https://www.blueteamvillage.org/" target="_blank" rel="noreferrer">OPEN ↗</a></div>
        <div class="resource-row"><span class="tag">CTF</span><span>Blue Team Village CTF · DEF CON 32, 33 + 34</span><a href="https://ctf.blueteamvillage.org/" target="_blank" rel="noreferrer">OPEN ↗</a></div>
        <div class="resource-row"><span class="tag">OBSIDIAN</span><span>Project Obsidian</span><a href="https://www.blueteamvillage.org/programs/project-obsidian" target="_blank" rel="noreferrer">OPEN ↗</a></div>
        <div class="resource-row"><span class="tag">HRV</span><span>Pinky + the Brain Fox · DEF CON 34</span><a href="https://github.com/HamRadioVillage/fox-hunt-writeups/tree/main/dc34" target="_blank" rel="noreferrer">WRITEUPS ↗</a></div>
        <div class="resource-row"><span class="tag">TALK</span><span>Threat Hunting 101: Beyond the Alerts</span><a href="https://defcon.outel.org/defcon33/dc33_schedule.pdf" target="_blank" rel="noreferrer">SCHEDULE ↗</a></div>
      </div>`;
    return root;
  }

  function renderRadio() {
    const root = document.createElement('div');
    root.className = 'panel-content radio-console';
    root.innerHTML = `
      <div class="panel-eyebrow">AUDIO SERVICE // ORIGINAL PROCEDURAL SYNTHWAVE</div>
      <div class="radio-head">
        <div>
          <h2>K4INU SIGNAL//FM</h2>
          <p>30 original cyber tracks generated live in your browser, including a new heavy bass + glitch-electro bank. No borrowed soundtrack, streams, or audio files.</p>
        </div>
        <div class="radio-status"><span class="signal-led"></span><span data-radio-status>STANDBY</span></div>
      </div>

      <div class="radio-display">
        <div class="radio-frequency">88.4 <small>MHz</small></div>
        <div class="radio-now"><small>NOW TUNED</small><strong data-radio-track>NIGHT SHIFT</strong><span data-radio-meta>92 BPM // 01</span></div>
        <div class="radio-spectrum" aria-hidden="true">${'<i></i>'.repeat(24)}</div>
      </div>

      <div class="radio-controls">
        <button class="radio-skip" data-radio-prev aria-label="Previous track">◀◀</button>
        <button class="radio-play-big" data-radio-play aria-label="Play music">▶</button>
        <button class="radio-skip" data-radio-next aria-label="Next track">▶▶</button>
        <label class="radio-volume">VOL <input data-radio-volume type="range" min="0" max="0.5" step="0.01" value="${radioState.volume}" aria-label="Music volume" /></label>
      </div>

      <div class="radio-tracks">
        ${RADIO_TRACKS.map((t,i) => `<button data-radio-track-index="${i}"><span>${t.code}</span><strong>${t.title}</strong><small>${t.bpm} BPM // ${t.blurb}</small></button>`).join('')}
      </div>
      <p class="radio-note">30 tracks // 21–30 are the HEAVY//GLITCH bank. Audio starts only after you press play; every note is generated locally with Web Audio.</p>`;
    setTimeout(syncRadioUI, 0);
    return root;
  }


  function renderToolTrail() {
    const root = document.createElement('div');
    root.className = 'panel-content tooltrail-panel';
    const state = { level: 0, integrity: 4, score: 0, log: [] };

    function hearts() {
      let out = '';
      for (let i = 0; i < 4; i++) out += `<i class="${i < state.integrity ? 'on' : ''}"></i>`;
      return out;
    }

    function draw() {
      const current = TOOL_TRAIL_LEVELS[state.level];
      const done = state.level >= TOOL_TRAIL_LEVELS.length || state.integrity <= 0;
      const progress = Math.min(100, Math.round((state.level / TOOL_TRAIL_LEVELS.length) * 100));

      if (done) {
        const success = state.integrity > 0;
        root.innerHTML = `
          <div class="panel-eyebrow">MINI-GAME // ORGAN TRAIL-STYLE TOOL RUN</div>
          <div class="trail-shell done ${success ? 'success' : 'failure'}">
            <div class="trail-headline">
              <div>
                <h2>${success ? 'OPERATION COMPLETE' : 'OPERATION BURNED'}</h2>
                <p>${success ? 'You made it through the run and selected the right tools often enough to finish the engagement.' : 'The run collapsed under bad picks and noisy decisions. Rebuild your loadout and try again.'}</p>
              </div>
              <div class="trail-scorecard">
                <strong>${state.score}/${TOOL_TRAIL_LEVELS.length}</strong>
                <span>RIGHT PICKS</span>
              </div>
            </div>
            <div class="trail-meta-grid">
              <div><small>INTEGRITY LEFT</small><strong>${state.integrity}/4</strong></div>
              <div><small>LEVELS CLEARED</small><strong>${Math.min(state.level, TOOL_TRAIL_LEVELS.length)}/${TOOL_TRAIL_LEVELS.length}</strong></div>
              <div><small>STYLE</small><strong>HACKER TOOL TRAIL</strong></div>
            </div>
            <div class="trail-log-wrap">
              <h3>RUN LOG</h3>
              <div class="trail-log">${state.log.map(item => `<article class="trail-log-entry ${item.good ? 'good' : 'bad'}"><strong>${esc(item.title)} — ${esc(item.tool)}</strong><p>${esc(item.result)}</p></article>`).join('')}</div>
            </div>
            <div class="trail-actions">
              <button class="ui-button primary" data-trail-restart>RESTART RUN</button>
            </div>
          </div>`;
        return;
      }

      root.innerHTML = `
        <div class="panel-eyebrow">MINI-GAME // ORGAN TRAIL-STYLE TOOL RUN</div>
        <div class="trail-shell">
          <div class="trail-topbar">
            <div>
              <h2>Tool Trail</h2>
              <p>Choose the right tool for each situation and survive the full ${TOOL_TRAIL_LEVELS.length}-stage run.</p>
            </div>
            <div class="trail-integrity">
              <small>OPSEC / INTEGRITY</small>
              <div class="trail-hearts">${hearts()}</div>
            </div>
          </div>
          <div class="trail-progress"><i style="width:${progress}%"></i></div>
          <div class="trail-stage-card">
            <div class="trail-stage-meta">
              <span>${esc(current.title)}</span>
              <strong>STAGE ${state.level + 1} / ${TOOL_TRAIL_LEVELS.length}</strong>
            </div>
            <p class="trail-stage-blurb">${esc(current.blurb)}</p>
          </div>
          <div class="trail-options">
            ${current.choices.map((choice, idx) => `
              <button class="trail-option" data-trail-choice="${idx}">
                <small>${esc(choice.tag)}</small>
                <strong>${esc(choice.name)}</strong>
                <span>SELECT TOOL</span>
              </button>`).join('')}
          </div>
          <div class="trail-log-wrap compact">
            <h3>RUN LOG</h3>
            <div class="trail-log ${state.log.length ? '' : 'empty'}">${state.log.length ? state.log.map(item => `<article class="trail-log-entry ${item.good ? 'good' : 'bad'}"><strong>${esc(item.title)} — ${esc(item.tool)}</strong><p>${esc(item.result)}</p></article>`).join('') : '<p>No decisions yet. Pick a tool to start the run.</p>'}</div>
          </div>
        </div>`;
    }

    root.addEventListener('click', (e) => {
      const restart = e.target.closest('[data-trail-restart]');
      if (restart) {
        state.level = 0; state.integrity = 4; state.score = 0; state.log = []; draw(); return;
      }
      const choiceBtn = e.target.closest('[data-trail-choice]');
      if (!choiceBtn) return;
      const current = TOOL_TRAIL_LEVELS[state.level];
      if (!current) return;
      const picked = current.choices[Number(choiceBtn.dataset.trailChoice)];
      if (!picked) return;
      if (picked.good) state.score += 1; else state.integrity -= 1;
      state.log.unshift({ title: current.title, tool: picked.name, result: picked.result, good: picked.good });
      state.level += 1;
      draw();
    });

    draw();
    return root;
  }

  function renderSystem() {
    const root = document.createElement('div'); root.className = 'panel-content';
    const cores = Math.max(2, navigator.hardwareConcurrency || 4);
    const memory = navigator.deviceMemory ? `${navigator.deviceMemory} GB reported` : 'browser restricted';
    root.innerHTML = `
      <div class="panel-eyebrow">SYSTEM // CLIENT STATUS</div><h2>K4INU_OS</h2>
      <div class="sys-grid">
        <div class="stat"><div class="stat-head"><span>UI CORE</span><span>23%</span></div><div class="bar"><i style="width:23%"></i></div></div>
        <div class="stat"><div class="stat-head"><span>THREAT LEVEL</span><span>LOW</span></div><div class="bar"><i style="width:12%"></i></div></div>
        <div class="stat"><div class="stat-head"><span>LOGICAL CPU</span><span>${cores}</span></div><div class="bar"><i style="width:52%"></i></div></div>
        <div class="stat"><div class="stat-head"><span>MEMORY</span><span>${esc(memory)}</span></div><div class="bar"><i style="width:38%"></i></div></div>
      </div>
      <h3>DISPLAY SETTINGS</h3>
      <div class="setting-row"><span>CRT scanlines</span><button class="toggle on" data-setting="scanlines">ON</button></div>
      <div class="setting-row"><span>Boot sequence on next load</span><button class="toggle on" data-setting="boot">ON</button></div>`;
    root.addEventListener('click', e => {
      const btn = e.target.closest('[data-setting]'); if (!btn) return;
      if (btn.dataset.setting === 'scanlines') {
        scanlines.classList.toggle('off');
        const on = !scanlines.classList.contains('off'); btn.textContent = on ? 'ON' : 'OFF'; btn.classList.toggle('on', on); localStorage.setItem('k4-scanlines', on ? '1' : '0');
      }
      if (btn.dataset.setting === 'boot') {
        const currentlyOn = localStorage.getItem('k4-boot') !== '0';
        localStorage.setItem('k4-boot', currentlyOn ? '0' : '1');
        btn.textContent = currentlyOn ? 'OFF' : 'ON'; btn.classList.toggle('on', !currentlyOn);
      }
    });
    const bootBtn = root.querySelector('[data-setting="boot"]');
    const bootOn = localStorage.getItem('k4-boot') !== '0'; bootBtn.textContent = bootOn ? 'ON' : 'OFF'; bootBtn.classList.toggle('on', bootOn);
    return root;
  }

  function toast(message) {
    document.querySelector('.toast')?.remove();
    const el = document.createElement('div'); el.className = 'toast'; el.textContent = message; desktop.appendChild(el);
    setTimeout(() => el.remove(), 2600);
  }

  function toggleStart() {
    const open = startMenu.classList.toggle('open');
    startMenu.setAttribute('aria-hidden', String(!open));
    startButton.setAttribute('aria-expanded', String(open));
    startButton.classList.toggle('open', open);
  }
  function closeStart() { startMenu.classList.remove('open'); startMenu.setAttribute('aria-hidden','true'); startButton.setAttribute('aria-expanded','false'); startButton.classList.remove('open'); }

  document.addEventListener('click', e => {
    const play = e.target.closest('[data-radio-play]'); if (play) { e.preventDefault(); toggleRadio(); return; }
    const prev = e.target.closest('[data-radio-prev]'); if (prev) { e.preventDefault(); setRadioTrack(radioState.trackIndex - 1); return; }
    const next = e.target.closest('[data-radio-next]'); if (next) { e.preventDefault(); setRadioTrack(radioState.trackIndex + 1); return; }
    const track = e.target.closest('[data-radio-track-index]'); if (track) { e.preventDefault(); setRadioTrack(Number(track.dataset.radioTrackIndex)); return; }
    const opener = e.target.closest('[data-open]'); if (opener) { e.preventDefault(); openApp(opener.dataset.open); return; }
    if (!e.target.closest('#startMenu') && !e.target.closest('#startButton')) closeStart();
  });
  document.addEventListener('input', e => {
    if (!e.target.matches('[data-radio-volume]')) return;
    radioState.volume = Math.max(0, Math.min(.5, Number(e.target.value)));
    localStorage.setItem('k4-radio-volume', String(radioState.volume));
    if (radioState.master) radioState.master.gain.setTargetAtTime(radioState.volume, radioState.ctx.currentTime, .02);
  });
  startButton.addEventListener('click', (e) => { e.stopPropagation(); toggleStart(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeStart();
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openApp('terminal'); }
  });

  function updateClock() {
    const now = new Date();
    const value = now.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });
    document.getElementById('topClock').textContent = value;
    document.getElementById('taskClock').textContent = value;
  }
  updateClock(); setInterval(updateClock, 1000 * 15);

  function boot() {
    const screen = document.getElementById('bootScreen');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || localStorage.getItem('k4-boot') === '0') { screen.remove(); return; }
    const log = document.getElementById('bootLog');
    const lines = [
      '[  OK  ] Initializing K4INU_OS...',
      '[  OK  ] Mounting /portfolio read-only',
      '[  OK  ] Loading DFIR tool index',
      '[  OK  ] Starting terminal service',
      '[  OK  ] Network interface: github-pages',
      '[  OK  ] Operator profile: KAINU',
      '[  OK  ] Loading DEF CON SOC GOON credentials',
      '[  OK  ] Indexing DC33 + DC34 speaking record',
      '[  OK  ] Mounting Blue Team Village CTF // DC32 · DC33 · DC34',
      '[  OK  ] Linking Project Obsidian field record',
      '[  OK  ] Indexing Ham Radio Village // Pinky + the Brain Fox // DC34',
      '[  OK  ] Starting K4INU SIGNAL//FM audio service',
      '[  OK  ] Loading Tool Trail operator mini-game',
      '',
      'K4INU_OS ready.'
    ];
    let i = 0;
    const tick = () => {
      if (i < lines.length) { log.textContent += `${lines[i++]}\n`; setTimeout(tick, 82); }
      else setTimeout(() => { screen.classList.add('done'); setTimeout(() => screen.remove(), 380); }, 220);
    };
    tick();
  }

  if (localStorage.getItem('k4-scanlines') === '0') scanlines.classList.add('off');
  syncRadioUI();
  boot();
})();
