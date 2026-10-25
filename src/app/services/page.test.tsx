import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
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
    expect(within(main).getByText(/It shows where your team's hours go and which of them are worth handing to an agent\./)).toBeInTheDocument();
    expect(main).not.toHaveTextContent(/free|guarantee|5\+ HRS/i);
    expect(within(main).getByRole("link", { name: "contact@sanganak.ai →" })).toHaveAttribute(
      "href",
      "mailto:contact@sanganak.ai",
    );
    expect(main).toHaveAttribute("id", "main-content");
  });
});