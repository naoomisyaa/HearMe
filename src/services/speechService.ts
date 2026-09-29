// Real Browser Web Speech API & Web Audio chime integration

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private audioCtx: AudioContext | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  // Get available system voices
  public getVoices(): Promise<SpeechSynthesisVoice[]> {
    return new Promise((resolve) => {
      if (!this.synth) {
        resolve([]);
        return;
      }

      let voices = this.synth.getVoices();
      if (voices.length > 0) {
        resolve(voices);
        return;
      }

      this.synth.onvoiceschanged = () => {
        voices = this.synth?.getVoices() || [];
        resolve(voices);
      };

      // Fallback timeout
      setTimeout(() => {
        resolve(this.synth?.getVoices() || []);
      }, 500);
    });
  }

  // Speak text using SpeechSynthesis
  public speak(
    text: string,
    options: {
      rate?: number;
      pitch?: number;
      volume?: number;
      voiceName?: string;
      onEnd?: () => void;
      onError?: () => void;
    } = {}
  ): boolean {
    if (!this.synth) {
      this.playChime(660);
      options.onEnd?.();
      return false;
    }

    // Cancel any ongoing speech
    this.synth.cancel();

    // Play subtle pre-speech counter activation chime
    this.playChime(580);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = options.rate ?? 1.0;
    utterance.pitch = options.pitch ?? 1.0;
    utterance.volume = options.volume ?? 1.0;

    // const voices = this.synth.getVoices();
    // if (options.voiceName) {
    //   const selected = voices.find((v) => v.name.includes(options.voiceName!) || v.lang.includes(options.voiceName!));
    //   if (selected) utterance.voice = selected;
    // } else {
    //   // Default to English or local
    //   // const naturalVoice = voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
    //   const indonesianVoice =
    //   voices.find(v =>
    //     v.lang.startsWith('id') &&
    //     v.name.includes('Google')
    //   ) ||
    //   voices.find(v =>
    //     v.lang.startsWith('id') &&
    //     v.name.includes('Microsoft')
    //   ) ||
    //   voices.find(v => v.lang.startsWith('id'));

    // if (indonesianVoice) {
    //   utterance.voice = indonesianVoice;
    // }
    //   // if (naturalVoice) utterance.voice = naturalVoice;
    // }

    const voices = this.synth.getVoices();

console.log(
  voices.filter(v => v.lang.startsWith('id'))
);

// if (options.voiceName) {
//   const selected = voices.find(
//     (v) =>
//       v.name.includes(options.voiceName!) ||
//       v.lang.includes(options.voiceName!)
//   );

//   if (selected) utterance.voice = selected;
// } else {
//   const indonesianVoice =
//     voices.find(v => v.name === 'Google Bahasa Indonesia') ||
//     voices.find(v => v.lang === 'id-ID');

//   if (indonesianVoice) {
//     utterance.voice = indonesianVoice;
//   } 
// }

const indonesianVoice =
  voices.find(v => v.name === 'Google Bahasa Indonesia') ||
  voices.find(v => v.lang === 'id-ID');

if (indonesianVoice) {
  utterance.voice = indonesianVoice;
}

utterance.lang = 'id-ID';

    utterance.onend = () => {
      options.onEnd?.();
    };

    utterance.onerror = () => {
      options.onError?.();
    };

    this.synth.speak(utterance);
    return true;
  }

  // Synthesize pleasant counter chime using Web Audio API
  public playChime(frequency: number = 520, durationMs: number = 180) {
    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) return;

      if (!this.audioCtx) {
        this.audioCtx = new AudioCtxClass();
      }

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);
      // Slight smooth drop for warm chime
      osc.frequency.exponentialRampToValueAtTime(frequency * 0.9, this.audioCtx.currentTime + durationMs / 1000);

      gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + durationMs / 1000);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + durationMs / 1000);
    } catch {
      // Audio context might be restricted before user gesture
    }
  }

  // Haptic feedback trigger
  public triggerHaptic(duration = 20) {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(duration);
      } catch {
        // Ignored
      }
    }
  }
}

export const speechService = new SpeechService();
