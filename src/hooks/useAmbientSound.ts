import { useCallback, useEffect, useRef, useState } from "react";

// Synthesized rain: no remote audio, autoplay, or media download needed.
export function useAmbientSound() {
  const [enabled, setEnabled] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const context = useRef<AudioContext | null>(null);
  const pending = useRef(false);

  const stop = useCallback(() => {
    const active = context.current;
    context.current = null;
    void active?.close().catch(() => {});
    setEnabled(false);
  }, []);

  const toggle = useCallback(async () => {
    if (pending.current) return;
    if (context.current) {
      stop();
      return;
    }
    pending.current = true;
    try {
      const audio = new AudioContext();
      context.current = audio;
      await audio.resume();
      if (context.current !== audio) return;
      const buffer = audio.createBuffer(1, audio.sampleRate * 6, audio.sampleRate);
      const samples = buffer.getChannelData(0);
      let previous = 0;
      for (let index = 0; index < samples.length; index++) {
        previous = (previous + (Math.random() * 2 - 1) * 0.025) / 1.025;
        samples[index] = previous * 3.5;
      }
      const source = audio.createBufferSource();
      source.buffer = buffer;
      source.loop = true;
      const filter = audio.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 1800;
      const gain = audio.createGain();
      gain.gain.setValueAtTime(0, audio.currentTime);
      gain.gain.linearRampToValueAtTime(0.19, audio.currentTime + 1);
      source.connect(filter).connect(gain).connect(audio.destination);
      source.start();
      setEnabled(true);
    } catch {
      void context.current?.close().catch(() => {});
      context.current = null;
      setUnavailable(true);
      setEnabled(false);
    } finally {
      pending.current = false;
    }
  }, [stop]);

  useEffect(() => () => { void context.current?.close().catch(() => {}); }, []);
  return { enabled, unavailable, toggle, stop };
}
