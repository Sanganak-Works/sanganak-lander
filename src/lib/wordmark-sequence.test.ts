import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createWordmarkSequence, wordmarks, type WordmarkFrame } from "./wordmark-sequence";

describe("wordmark sequence", () => {
  let frames: WordmarkFrame[];
  let sequence: ReturnType<typeof createWordmarkSequence>;
  beforeEach(() => { vi.useFakeTimers(); frames = []; sequence = createWordmarkSequence((frame) => frames.push(frame)); });
  afterEach(() => { sequence.dispose(); vi.useRealTimers(); });
  it("holds Hindi then Urdu for 750ms each and finishes once in Latin at 2490ms", () => {
    sequence.start();
    vi.advanceTimersByTime(330);
    expect(frames.at(-1)).toEqual({ script: "hi", text: wordmarks.hi, glitch: false });
    vi.advanceTimersByTime(749);
    expect(frames.at(-1)?.script).toBe("hi");
    vi.advanceTimersByTime(331);
    expect(frames.at(-1)).toEqual({ script: "ur", text: wordmarks.ur, glitch: false });
    vi.advanceTimersByTime(749);
    expect(frames.at(-1)?.script).toBe("ur");
    vi.advanceTimersByTime(331);
    expect(frames.at(-1)).toEqual({ script: "en", text: wordmarks.en, glitch: false });
    expect(vi.getTimerCount()).toBe(0);
    expect(frames.filter((frame) => frame.script !== "en").every((frame) => frame.text === wordmarks[frame.script])).toBe(true);
  });
  it("cancels the old sequence on leave and returns in 150ms", () => {
    sequence.start(); vi.advanceTimersByTime(400); sequence.leave(); vi.advanceTimersByTime(150);
    expect(frames.at(-1)).toEqual({ script: "en", text: wordmarks.en, glitch: false });
    expect(vi.getTimerCount()).toBe(0);
  });
  it("restarts on re-entry even during the return glitch", () => {
    sequence.start(); vi.advanceTimersByTime(1300); sequence.leave(); vi.advanceTimersByTime(50);
    sequence.start(); vi.advanceTimersByTime(330);
    expect(frames.at(-1)?.script).toBe("hi");
    vi.runAllTimers(); expect(frames.at(-1)?.text).toBe(wordmarks.en);
  });
  it("short-circuits and cancels pending work for reduced motion", () => {
    sequence.start(); vi.advanceTimersByTime(400); sequence.start(true);
    expect(frames.at(-1)).toEqual({ script: "en", text: wordmarks.en, glitch: false });
    expect(vi.getTimerCount()).toBe(0);
  });

  it("injects a repeatable seed, varies later hovers, and resolves Latin left to right", () => {
    sequence.start(false, 42);
    vi.runAllTimers();
    const first = [...frames];
    expect(first).toHaveLength(21);
    expect(first.slice(0, 3).map((frame) => [...frame.text].filter((glyph, i) => glyph !== wordmarks.en[i]).length)).toEqual([3, 5, 8]);
    expect(first[14].text.startsWith("Sa")).toBe(true);
    expect(first[15].text.startsWith("Sanga")).toBe(true);
    expect(first[16].text).toBe("Sanganak");
    frames = []; sequence.start(false, 42); vi.runAllTimers();
    expect(frames).toEqual(first);
    frames = []; sequence.start(false, 43); vi.runAllTimers();
    expect(frames[0]).not.toEqual(first[0]);
    for (const frame of frames.filter((frame) => frame.glitch)) {
      expect(frame.bands?.[0]).toBeGreaterThanOrEqual(28);
      expect(frame.bands?.[0]).toBeLessThanOrEqual(36);
      expect(frame.bands?.[1]).toBeGreaterThanOrEqual(54);
      expect(frame.bands?.[1]).toBeLessThanOrEqual(62);
      if (frame.script === "en") expect(frame.text).toMatch(/^[Ssangak_\/=+<>]{8}$/);
    }
    frames = []; sequence.start(false, 42); vi.advanceTimersByTime(400); frames = [];
    sequence.leave(); vi.advanceTimersByTime(50);
    expect(frames.map((frame) => frame.text.slice(0, 2))).toEqual(["Sa", "Sa", "Sa"]);
    expect(frames[1].text.startsWith("Sanga")).toBe(true);
    expect(frames[2].text).toBe("Sanganak");
  });
  it("clears pending work on unmount", () => {
    sequence.start(); sequence.dispose(); expect(vi.getTimerCount()).toBe(0);
  });
});
