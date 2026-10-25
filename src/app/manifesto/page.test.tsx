import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ManifestoPage from "./page";

const complaints = [
  "About the back-breaking, mind-numbing ordeals they have to do everyday just so they can move 1% forward, while their smaller competitors are making laps around them.",
  "About the very fact that they could've done from home (or their hometown) is the same thing they'll do after communting for an hour to the office, just with worse focus and temper.",
  "About how they're threatened about losing their jobs due to AI, while they still can't now imagine doing their job without it.",
] as const;

describe("Manifesto route", () => {
  it("preserves exact copy while exposing complaint-list semantics and contact link", () => {
    render(<ManifestoPage />);

    const main = screen.getByRole("main");
    expect(within(main).getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(within(main).getByRole("heading", { level: 1, name: "You can justdo things." })).toBeInTheDocument();

    const complaintList = within(main).getByRole("list", { name: "Complaints" });
    const items = within(complaintList).getAllByRole("listitem");
    expect(items).toHaveLength(complaints.length);
    complaints.forEach((complaint, index) => {
      expect(items[index]).toHaveTextContent(complaint);
    });

    expect(within(main).getByText("We believe that with the right intent, you can just do things.")).toBeInTheDocument();
    expect(within(main).getByRole("link", { name: "contact@sanganak.ai →" })).toHaveAttribute(
      "href",
      "mailto:contact@sanganak.ai",
    );
    expect(main).toHaveAttribute("id", "main-content");
  });
});