import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Home", () => {
  it("renders the Paper homepage copy and replacement computer artwork", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Frontier technology, for those who deserve it.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "We build, write, and advise about tech and culture; from India for the world.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("01 / BUILD + WRITE + ADVISE")).toBeInTheDocument();
    expect(screen.getByText("COMPUTE / CULTURE")).toBeInTheDocument();
    expect(screen.getByText("sanganak.works")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Sanganak computer" })).toHaveAttribute(
      "src",
      expect.stringContaining("computer-logo-fmq-0.svg"),
    );
  });

  it("links the deserve headline word to the manifesto", () => {
    render(<Home />);

    expect(screen.queryByText(/enter the manifesto/i)).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "deserve" })).toHaveAttribute(
      "href",
      "/manifesto",
    );
  });

  it("provides a skip-link target", () => {
    render(<Home />);

    expect(screen.getByRole("link", { name: "Skip to content" })).toHaveAttribute(
      "href",
      "#main-content",
    );
    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
  });
});
