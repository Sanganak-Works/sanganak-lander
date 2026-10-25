import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LOOM_URL, LoomVideo, toLoomEmbedUrl } from "./loom-video";

const SHARE_URL = "https://www.loom.com/share/0123abcdef4567?sid=xyz";
const EMBED_URL = "https://www.loom.com/embed/0123abcdef4567";

describe("toLoomEmbedUrl", () => {
  it("converts share links and passes embed links through", () => {
    expect(toLoomEmbedUrl(SHARE_URL)).toBe(EMBED_URL);
    expect(toLoomEmbedUrl(" https://loom.com/share/0123abcdef4567 ")).toBe(EMBED_URL);
    expect(toLoomEmbedUrl(EMBED_URL)).toBe(EMBED_URL);
  });

  it("rejects empty and non-Loom URLs", () => {
    expect(toLoomEmbedUrl("")).toBeNull();
    expect(toLoomEmbedUrl("https://example.com/share/0123abcdef4567")).toBeNull();
  });
});

describe("LoomVideo", () => {
  it("ships with an empty URL", () => {
    expect(LOOM_URL).toBe("");
  });

  it("renders nothing when the URL is empty", () => {
    const { container } = render(<LoomVideo url="" />);

    expect(container).toBeEmptyDOMElement();
    expect(container.querySelector("iframe")).toBeNull();
  });

  it("renders a lazy, full-screen-capable embed for a share URL", () => {
    render(<LoomVideo url={SHARE_URL} />);

    const frame = screen.getByTitle("A 60-second intro from Sam");
    expect(frame.tagName).toBe("IFRAME");
    expect(frame).toHaveAttribute("src", EMBED_URL);
    expect(frame).toHaveAttribute("loading", "lazy");
    expect(frame).toHaveAttribute("allowfullscreen");
  });
});
