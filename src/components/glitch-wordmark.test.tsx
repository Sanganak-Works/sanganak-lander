import Link from "next/link";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { GlitchWordmark } from "./glitch-wordmark";

beforeEach(() => {
  vi.useFakeTimers();
  vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
    matches: query === "(hover: hover) and (pointer: fine)", media: query, onchange: null,
    addEventListener: vi.fn(), removeEventListener: vi.fn(), addListener: vi.fn(), removeListener: vi.fn(), dispatchEvent: () => false,
  }));
});
afterEach(() => { vi.useRealTimers(); vi.restoreAllMocks(); vi.unstubAllGlobals(); Reflect.deleteProperty(document, "fonts"); });
const renderLink = () => render(<Link href="/" aria-label="Sanganak home"><GlitchWordmark /></Link>);
it("keeps the link name and correct language/direction throughout keyboard activation", () => {
  const { container, unmount } = renderLink();
  const link = screen.getByRole("link", { name: "Sanganak home" });
  vi.spyOn(link, "matches").mockReturnValue(true);
  fireEvent.focus(link);
  act(() => vi.advanceTimersByTime(330));
  expect(container.querySelector('[lang="hi"]')).toHaveTextContent("संगणक");
  act(() => vi.advanceTimersByTime(1080));
  expect(container.querySelector('[lang="ur"]')).toHaveAttribute("dir", "rtl");
  expect(link).toHaveAccessibleName("Sanganak home");
  expect(container.querySelector(".glitch-wordmark")).toHaveAttribute("aria-hidden", "true");
  fireEvent.blur(link);
  act(() => vi.advanceTimersByTime(150));
  expect(container.querySelector(".wordmark-ink")).toHaveTextContent("Sanganak");
  unmount(); expect(vi.getTimerCount()).toBe(0);
});
it("does not animate or prevent touch taps", () => {
  const { container } = renderLink();
  const wordmark = container.querySelector(".glitch-wordmark")!;
  const event = new Event("pointerover", { bubbles: true, cancelable: true });
  Object.defineProperty(event, "pointerType", { value: "touch" });
  const pending = vi.getTimerCount();
  fireEvent(wordmark, event);
  expect(event.defaultPrevented).toBe(false);
  expect(vi.getTimerCount()).toBe(pending);
  expect(wordmark).toHaveAttribute("data-glitch", "false");
});

it("starts from bubbling mouse pointerover on the link and ignores moves between its children", () => {
  const { container, unmount } = renderLink();
  const wordmark = container.querySelector(".glitch-wordmark")!;
  const link = screen.getByRole("link", { name: "Sanganak home" });
  const over = new Event("pointerover", { bubbles: true });
  Object.defineProperty(over, "pointerType", { value: "mouse" });
  fireEvent(wordmark, over);
  expect(wordmark).toHaveAttribute("data-glitch", "true");
  act(() => vi.advanceTimersByTime(400));
  const out = new Event("pointerout", { bubbles: true });
  Object.defineProperties(out, { pointerType: { value: "mouse" }, relatedTarget: { value: link } });
  fireEvent(wordmark, out);
  act(() => vi.advanceTimersByTime(200));
  expect(container.querySelector(".wordmark-ink")).toHaveTextContent("संगणक");
  const leave = new Event("pointerleave");
  Object.defineProperty(leave, "pointerType", { value: "mouse" });
  fireEvent(link, leave);
  act(() => vi.advanceTimersByTime(150));
  expect(container.querySelector(".wordmark-ink")).toHaveTextContent("Sanganak");
  unmount();
  expect(vi.getTimerCount()).toBe(0);
});

it("warms both script fonts only in desktop idle time and cancels scheduled work on unmount", () => {
  let idleCallback: IdleRequestCallback | undefined;
  const idle = vi.fn((callback: IdleRequestCallback) => { idleCallback = callback; return 7; });
  const cancel = vi.fn();
  vi.stubGlobal("requestIdleCallback", idle);
  vi.stubGlobal("cancelIdleCallback", cancel);
  const load = vi.fn().mockResolvedValue([]);
  Object.defineProperty(document, "fonts", { configurable: true, value: { load } });
  const { unmount } = renderLink();
  expect(idle).toHaveBeenCalledOnce();
  expect(load).not.toHaveBeenCalled();
  idleCallback?.({ didTimeout: false, timeRemaining: () => 50 });
  expect(load).toHaveBeenCalledWith('700 22px "Noto Sans Devanagari"', "संगणक");
  expect(load).toHaveBeenCalledWith('600 22px "Noto Sans Arabic"', "سنگنک");
  unmount(); expect(cancel).toHaveBeenCalledWith(7);
  vi.mocked(window.matchMedia).mockImplementation((query) => ({
    matches: false, media: query, onchange: null,
    addEventListener: vi.fn(), removeEventListener: vi.fn(), addListener: vi.fn(), removeListener: vi.fn(), dispatchEvent: () => false,
  }));
  idle.mockClear(); load.mockClear();
  renderLink();
  act(() => vi.advanceTimersByTime(1000));
  expect(idle).not.toHaveBeenCalled();
  expect(load).not.toHaveBeenCalled();
});
