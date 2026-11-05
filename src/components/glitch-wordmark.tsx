"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createWordmarkSequence, wordmarks, type WordmarkFrame } from "@/lib/wordmark-sequence";

/** Place inside a named link; all animated text is decorative. */
export function GlitchWordmark() {
  const root = useRef<HTMLSpanElement>(null);
  const [frame, setFrame] = useState<WordmarkFrame>({ script: "en", text: wordmarks.en, glitch: false });

  useEffect(() => {
    const controller = createWordmarkSequence(setFrame);
    const link = root.current?.closest("a");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hover = window.matchMedia("(hover: hover) and (pointer: fine)");
    let hovering = false;
    const enter = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !hover.matches || hovering) return;
      hovering = true;
      controller.start(reduced.matches);
    };
    const leave = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !hovering) return;
      if (event.relatedTarget instanceof Node && link?.contains(event.relatedTarget)) return;
      hovering = false;
      controller.leave(reduced.matches);
    };
    const focus = () => { if (link?.matches(":focus-visible")) controller.start(reduced.matches); };
    const blur = () => controller.leave(reduced.matches);
    const motionChange = () => { if (reduced.matches) controller.leave(true); };
    link?.addEventListener("pointerenter", enter);
    link?.addEventListener("pointerleave", leave);
    // Bubbling counterparts also support delegated pointer events; hovering deduplicates entry.
    link?.addEventListener("pointerover", enter);
    link?.addEventListener("pointerout", leave);
    link?.addEventListener("focus", focus);
    link?.addEventListener("blur", blur);
    reduced.addEventListener("change", motionChange);

    // Warm scripts after paint on desktop only; initial rendering never waits for fonts.
    const warmFonts = () => {
      if (!hover.matches || !document.fonts) return;
      void document.fonts.load('700 22px "Noto Sans Devanagari"', wordmarks.hi).catch(() => {});
      void document.fonts.load('600 22px "Noto Sans Arabic"', wordmarks.ur).catch(() => {});
    };
    let idle: number | undefined;
    let fallback: ReturnType<typeof setTimeout> | undefined;
    if (hover.matches) {
      if (window.requestIdleCallback) idle = window.requestIdleCallback(warmFonts);
      else fallback = setTimeout(warmFonts, 200);
    }
    return () => {
      controller.dispose();
      if (idle !== undefined) window.cancelIdleCallback(idle);
      clearTimeout(fallback);
      link?.removeEventListener("pointerenter", enter);
      link?.removeEventListener("pointerleave", leave);
      link?.removeEventListener("pointerover", enter);
      link?.removeEventListener("pointerout", leave);
      link?.removeEventListener("focus", focus);
      link?.removeEventListener("blur", blur);
      reduced.removeEventListener("change", motionChange);
    };
  }, []);

  const scramble = frame.script === "en" && frame.text !== wordmarks.en;
  return (
    <span ref={root} className="brand-wordmark glitch-wordmark" aria-hidden="true"
      data-glitch={frame.glitch}
      style={{ "--band-teal": `${frame.bands?.[0] ?? 32}%`, "--band-coral": `${frame.bands?.[1] ?? 56}%` } as CSSProperties}>
      <span className="wordmark-sizer">Sanganak</span>
      {["ink", "teal", "coral"].map((layer) => (
        <span key={layer} className={`wordmark-layer wordmark-${layer}`} lang={frame.script}
          dir={frame.script === "ur" ? "rtl" : "ltr"}>
          {scramble ? (
            // Fit Latin noise to the original word's width, without changing its face or weight.
            <svg width="100%" height="100%" focusable="false">
              <text x="0" y="50%" dominantBaseline="central" textLength="98%" lengthAdjust="spacingAndGlyphs">{frame.text}</text>
            </svg>
          ) : frame.text}
        </span>
      ))}
    </span>
  );
}
