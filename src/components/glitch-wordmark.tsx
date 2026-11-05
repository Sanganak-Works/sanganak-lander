"use client";

import { useEffect, useRef, useState } from "react";
import { createWordmarkSequence, wordmarks, type WordmarkFrame } from "@/lib/wordmark-sequence";

/** Place inside a named link; all animated text is decorative. */
export function GlitchWordmark() {
  const root = useRef<HTMLSpanElement>(null);
  const sequence = useRef<ReturnType<typeof createWordmarkSequence> | null>(null);
  const [frame, setFrame] = useState<WordmarkFrame>({ script: "en", text: wordmarks.en, glitch: false });

  useEffect(() => {
    const controller = createWordmarkSequence(setFrame);
    sequence.current = controller;
    const link = root.current?.closest("a");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const focus = () => { if (link?.matches(":focus-visible")) controller.start(reduced.matches); };
    const blur = () => controller.leave(reduced.matches);
    const motionChange = () => { if (reduced.matches) controller.leave(true); };
    link?.addEventListener("focus", focus);
    link?.addEventListener("blur", blur);
    reduced.addEventListener("change", motionChange);
    return () => {
      controller.dispose();
      sequence.current = null;
      link?.removeEventListener("focus", focus);
      link?.removeEventListener("blur", blur);
      reduced.removeEventListener("change", motionChange);
    };
  }, []);

  return (
    <span
      ref={root}
      className="brand-wordmark glitch-wordmark"
      aria-hidden="true"
      data-glitch={frame.glitch}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse" && window.matchMedia("(hover: hover)").matches) {
          sequence.current?.start(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
        }
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") sequence.current?.leave(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
      }}
    >
      {["ink", "teal", "coral"].map((layer) => (
        <span key={layer} className={`wordmark-layer wordmark-${layer}`} lang={frame.script}
          dir={frame.script === "ur" ? "rtl" : "ltr"}>{frame.text}</span>
      ))}
    </span>
  );
}
