// Web Audio Procedural Jet/GSE Soundscape & Offline Japanese Speech Synthesis
export const a3dAudio = {
    ctx: null,
    jetGain: null,
    jetFilter: null,
    whineOsc: null,
    whineGain: null,
    enabled: false,
    init() {
      if (this.ctx) return;
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      const ctx = new AC();
      this.ctx = ctx;

      // Tạo nhiễu trắng lọc thông thấp làm tiếng gầm động cơ phản lực / động cơ GSE
      const bufSize = ctx.sampleRate * 2;
      const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 260;

      const gain = ctx.createGain();
      gain.gain.value = 0;

      src.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      src.start();

      // Tiếng rít nhẹ đặc trưng của cánh quạt turbine N1
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = 420;
      const wGain = ctx.createGain();
      wGain.gain.value = 0;
      osc.connect(wGain);
      wGain.connect(ctx.destination);
      osc.start();

      this.jetFilter = filter;
      this.jetGain = gain;
      this.whineOsc = osc;
      this.whineGain = wGain;
    },
    setEnabled(on) {
      this.enabled = on;
      if (on) {
        this.init();
        if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
        this.playChirp();
      } else if (this.jetGain && this.ctx) {
        this.jetGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.08);
        this.whineGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.08);
      }
    },
    updateEngine(level, freqHz, whineVol) {
      if (!this.enabled || !this.ctx || !this.jetGain) return;
      const tNow = this.ctx.currentTime;
      this.jetGain.gain.setTargetAtTime(Math.max(0, Math.min(0.14, level)), tNow, 0.12);
      this.jetFilter.frequency.setTargetAtTime(freqHz || 280, tNow, 0.12);
      this.whineGain.gain.setTargetAtTime(Math.max(0, Math.min(0.025, whineVol || 0)), tNow, 0.12);
      this.whineOsc.frequency.setTargetAtTime(340 + (level * 2600), tNow, 0.15);
    },
    playBeep(freq, dur) {
      if (!this.enabled || !this.ctx) return;
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = 'triangle';
      o.frequency.value = freq || 880;
      g.gain.setValueAtTime(0.09, this.ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + (dur || 0.18));
      o.connect(g); g.connect(this.ctx.destination);
      o.start(); o.stop(this.ctx.currentTime + (dur || 0.18));
    },
    playChirp() {
      this.playBeep(1180, 0.07);
    }
  };

export function speakJapaneseTerm(text) {
  try {
    if (typeof window !== undefined && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(text);
      utt.lang = ja-JP;
      utt.rate = 0.92;
      window.speechSynthesis.speak(utt);
    }
  } catch (e) {}
}
