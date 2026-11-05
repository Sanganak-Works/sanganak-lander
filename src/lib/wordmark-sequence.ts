export type WordmarkScript = "en" | "hi" | "ur";
export type WordmarkFrame = { script: WordmarkScript; text: string; glitch: boolean };
export const wordmarks = { en: "Sanganak", hi: "संगणक", ur: "سنگنک" } as const;
const latinFrame: WordmarkFrame = { script: "en", text: wordmarks.en, glitch: false };

/** One pending timer, at most seven updates per transition; only Latin is scrambled. */
export function createWordmarkSequence(render: (frame: WordmarkFrame) => void) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let active = false;
  const cancel = () => { clearTimeout(timer); timer = undefined; };
  const later = (callback: () => void, delay: number) => { timer = setTimeout(callback, delay); };

  function transition(target: WordmarkScript, done: () => void, duration = 330) {
    let step = 0;
    const tick = () => {
      if (step < 3) {
        // No Indic/Arabic string is ever split, spaced, or scrambled.
        const glyphs = "SANGANAK_/=+";
        const text = Array.from({ length: 8 }, (_, i) => glyphs[(i * 3 + step * 5) % glyphs.length]).join("");
        render({ script: "en", text, glitch: true });
      } else {
        render({ script: target, text: wordmarks[target], glitch: step < 6 });
      }
      if (step++ < 6) later(tick, duration / 6);
      else done();
    };
    tick();
  }

  return {
    start(reducedMotion = false) {
      cancel();
      active = !reducedMotion;
      if (reducedMotion) { render(latinFrame); return; }
      transition("hi", () => later(() => transition("ur", () =>
        later(() => transition("en", () => { active = false; }), 750)), 750));
    },
    leave(reducedMotion = false) {
      cancel();
      if (active && !reducedMotion) transition("en", () => { active = false; }, 150);
      else { active = false; render(latinFrame); }
    },
    dispose() { cancel(); active = false; },
  };
}
