export type WordmarkScript = "en" | "hi" | "ur";
export type WordmarkFrame = {
  script: WordmarkScript;
  text: string;
  glitch: boolean;
  bands?: [number, number];
};
export const wordmarks = { en: "Sanganak", hi: "संगणक", ur: "سنگنک" } as const;
const latinFrame: WordmarkFrame = { script: "en", text: wordmarks.en, glitch: false };

function seededRandom(seed: number) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let mixed = Math.imul(value ^ (value >>> 15), 1 | value);
    mixed ^= mixed + Math.imul(mixed ^ (mixed >>> 7), 61 | mixed);
    return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296;
  };
}

/** One pending timer, at most seven updates per transition; only Latin is scrambled. */
export function createWordmarkSequence(render: (frame: WordmarkFrame) => void) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let active = false;
  let random = seededRandom(0);
  const cancel = () => { clearTimeout(timer); timer = undefined; };
  const later = (callback: () => void, delay: number) => { timer = setTimeout(callback, delay); };
  const glyphs = `${wordmarks.en.toLowerCase()}_/=+<>`;
  const replacement = () => glyphs[Math.floor(random() * glyphs.length)];

  function scramble(step: number, returning: boolean, positions: number[]) {
    if (returning) {
      const resolved = [2, 5, 8][step];
      return wordmarks.en.slice(0, resolved) + Array.from({ length: 8 - resolved }, replacement).join("");
    }
    const letters = [...wordmarks.en];
    for (const index of positions.slice(0, [3, 5, 8][step])) {
      let glyph = replacement();
      if (glyph === letters[index]) glyph = "_";
      letters[index] = glyph;
    }
    return letters.join("");
  }

  function transition(target: WordmarkScript, done: () => void, duration = 220) {
    let step = 0;
    const started = performance.now();
    const positions = Array.from({ length: 8 }, (_, i) => i);
    for (let i = positions.length - 1; i > 0; i--) {
      const other = Math.floor(random() * (i + 1));
      [positions[i], positions[other]] = [positions[other], positions[i]];
    }
    const tick = () => {
      const glitch = step < 6;
      const frame: WordmarkFrame = step < 3
        ? { script: "en", text: scramble(step, target === "en", positions), glitch }
        : { script: target, text: wordmarks[target], glitch };
      // Ordered, non-overlapping 12%-high slices; CSS uses these same stops to cut out ink.
      if (glitch) frame.bands = [28 + Math.floor(random() * 9), 54 + Math.floor(random() * 9)];
      render(frame);
      if (step++ < 6) later(tick, Math.max(0, Math.ceil(started + step * duration / 6 - performance.now())));
      else done();
    };
    tick();
  }

  return {
    start(reducedMotion = false, seed = Math.floor(Math.random() * 4294967296)) {
      cancel();
      active = !reducedMotion;
      if (reducedMotion) { render(latinFrame); return; }
      random = seededRandom(seed);
      transition("hi", () => later(() => transition("ur", () =>
        later(() => transition("en", () => { active = false; }), 375)), 375));
    },
    leave(reducedMotion = false) {
      cancel();
      if (active && !reducedMotion) transition("en", () => { active = false; }, 100);
      else { active = false; render(latinFrame); }
    },
    dispose() { cancel(); active = false; },
  };
}
