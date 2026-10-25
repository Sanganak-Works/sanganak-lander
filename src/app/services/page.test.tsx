import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@calcom/embed-react", () => ({
  default: (props: { calLink: string }) => <div data-cal-link={props.calLink} />,
  getCalApi: async () => () => {},
}));
import ServicesPage from "./page";

describe("Services route", () => {
  it("preserves the approved offer copy, without a guarantee, and the contact destination", () => {
    render(<ServicesPage />);

    const main = screen.getByRole("main");
    expect(within(main).getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(within(main).getByRole("heading", { level: 1, name: "Reclaim your hours" })).toBeInTheDocument();
    expect(within(main).getByText("60 MINUTES · WHERE YOUR HOURS GO")).toBeInTheDocument();
    expect(within(main).getByText(/^A 60-minute structured walkthrough/)).toBeInTheDocument();
    expect(within(main).getByText("SCOPED PER PROJECT · MONTHLY RETAINERS")).toBeInTheDocument();
    expect(within(main).getByText(/Every engagement starts with a free 20-minute conversation\./)).toBeInTheDocument();
    expect(main).not.toHaveTextContent(/guarantee|5\+ HRS|it.s free/i);
    expect(within(main).getByRole("link", { name: "contact@sanganak.ai →" })).toHaveAttribute(
      "href",
      "mailto:contact@sanganak.ai",
    );
    expect(within(main).getByRole("heading", { level: 2, name: "Start with a free 20-minute intro" })).toBeInTheDocument();
    expect(within(main).getByTestId("booking-embed").querySelector("[data-cal-link]")).toHaveAttribute(
      "data-cal-link",
      "samyak-sahu/intro",
    );
    expect(within(main).queryByTitle("A 60-second intro from Sam")).not.toBeInTheDocument();
    expect(main).toHaveAttribute("id", "main-content");
  });
});