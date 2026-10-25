import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CoachesPage from "./page";
import { BOOKING_URL, coachesContent } from "./content";

describe("Coaches route", () => {
  it("renders the hero, the illustrative demo, and booking links from one constant", () => {
    render(<CoachesPage />);

    const main = screen.getByRole("main");
    expect(within(main).getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      within(main).getByRole("heading", { level: 1, name: coachesContent.hero.headline }),
    ).toBeInTheDocument();
    expect(within(main).getByText(coachesContent.hero.subhead)).toBeInTheDocument();

    const bookingLinks = within(main).getAllByRole("link", {
      name: "Book a free 20-minute conversation →",
    });
    expect(bookingLinks).toHaveLength(2);
    bookingLinks.forEach((link) => expect(link).toHaveAttribute("href", BOOKING_URL));

    expect(within(main).getByText(coachesContent.demo.disclaimer)).toBeInTheDocument();
    expect(within(main).getByRole("link", { name: "See Saras →" })).toHaveAttribute(
      "href",
      "https://sarasgmat.com",
    );
    expect(within(main).getByRole("link", { name: "contact@sanganak.ai →" })).toHaveAttribute(
      "href",
      "mailto:contact@sanganak.ai",
    );
    expect(main).toHaveAttribute("id", "main-content");
  });

  it("keeps sibling brands, labels, prices and guarantees off the page", () => {
    const { container } = render(<CoachesPage />);
    const text = container.textContent ?? "";

    for (const banned of [
      /masala dew/i,
      /neza/i,
      /karwaan/i,
      /ai-native/i,
      /agency/i,
      /holding company/i,
      /guarantee/i,
      /or it's free/i,
      /[$₹€£]\s?\d/,
    ]) {
      expect(text).not.toMatch(banned);
    }
  });
});
