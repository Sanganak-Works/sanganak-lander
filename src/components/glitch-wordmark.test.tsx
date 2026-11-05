import Link from "next/link";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { GlitchWordmark } from "./glitch-wordmark";

beforeEach(() => {
  vi.useFakeTimers();
  vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
    matches: query === "(hover: hover)", media: query, onchange: null,
    addEventListener: vi.fn(), removeEventListener: vi.fn(), addListener: vi.fn(), removeListener: vi.fn(), dispatchEvent: () => false,
  }));
});
afterEach(() => { vi.useRealTimers(); vi.restoreAllMocks(); });
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
  const event = new Event("pointerenter", { bubbles: true, cancelable: true });
  Object.defineProperty(event, "pointerType", { value: "touch" });
  const pending = vi.getTimerCount();
  fireEvent(wordmark, event);
  expect(event.defaultPrevented).toBe(false);
  expect(vi.getTimerCount()).toBe(pending);
  expect(wordmark).toHaveAttribute("data-glitch", "false");
});
