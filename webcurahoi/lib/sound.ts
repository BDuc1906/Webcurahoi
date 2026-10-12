/**
 * Phát tiếng ting ting 2 nốt bằng Web Audio API — không cần file mp3.
 */
export function playDing(): void {
  if (typeof window === "undefined") return;
  try {
    const Ctx =
      (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!Ctx) return;

    const ctx = new Ctx();
    const now = ctx.currentTime;

    // Nốt 1: 880Hz
    const o1 = ctx.createOscillator();
    const g1 = ctx.createGain();
    o1.connect(g1);
    g1.connect(ctx.destination);
    o1.frequency.setValueAtTime(880, now);
    g1.gain.setValueAtTime(0.25, now);
    g1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    o1.start(now);
    o1.stop(now + 0.4);

    // Nốt 2: 1320Hz, trễ 120ms
    const o2 = ctx.createOscillator();
    const g2 = ctx.createGain();
    o2.connect(g2);
    g2.connect(ctx.destination);
    o2.frequency.setValueAtTime(1320, now + 0.12);
    g2.gain.setValueAtTime(0.25, now + 0.12);
    g2.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
    o2.start(now + 0.12);
    o2.stop(now + 0.6);
  } catch {
    /* noop */
  }
}