import { render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@calcom/embed-react", () => ({
  default: (props: { calLink: string }) => <div data-cal-link={props.calLink} />,
  getCalApi: async () => () => {},
}));

// LOOM_URL ships empty; tests flip it through this getter to cover both orders.
const loom = vi.hoisted(() => ({ url: "" }));
vi.mock("@/components/booking/loom-video", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/components/booking/loom-video")>();
  return {
    ...actual,
    get LOOM_URL() {
      return loom.url;
    },
  };
});
import ServicesPage from "./page";

function precedes(first: HTMLElement, second: HTMLElement) {
  return Boolean(first.compareDocumentPosition(second) & Node.DOCUMENT_POSITION_FOLLOWING);
}

describe("Services route", () => {
  afterEach(() => {
    loom.url = "";
  });

  it("preserves the approved offer copy, without a guarantee, and the contact destination", () => {
    render(<ServicesPage />);

    const main = screen.getByRole("main");
    expect(within(main).getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(within(main).getByRole("heading", { level: 1, name: "Reclaim your hours" })).toBeInTheDocument();
    expect(within(main).getByText("60-MINUTE CALL · PLAN IN 3 DAYS")).toBeInTheDocument();
    const auditCard = within(main).getByRole("heading", { level: 2, name: "AI Workflow Audit" }).closest("article")!;
    expect(auditCard).toHaveTextContent(/^AI Workflow AuditA 60-minute call on how your practice actually runs, from your calendar to your inbox to your students' week\. Within three days you get/);
    expect(auditCard).not.toHaveTextContent(/async/i);
    expect(within(main).getAllByText(/60[- ]minute/i).every((el) => auditCard.contains(el))).toBe(true);
    expect(within(main).getByText("SCOPED PER PROJECT · MONTHLY RETAINERS")).toBeInTheDocument();
    expect(within(main).getByText(/Every engagement starts with a free 20-minute conversation\./)).toBeInTheDocument();
    expect(main).not.toHaveTextContent(/guarantee|5\+ HRS|it.s free/i);
    expect(within(main).getByRole("link", { name: "contact@sanganak.ai →" })).toHaveAttribute(
      "href",
      "mailto:contact@sanganak.ai",
    );
    expect(within(main).getByRole("heading", { level: 2, name: "Start with a free 20-minute intro" })).toBeInTheDocument();
    expect(within(main).getByText("No pitch deck. Tell us where your week goes, and we'll tell you plainly whether there's a job worth taking off your plate with AI tools.")).toBeInTheDocument();
    expect(main).not.toHaveTextContent(/no charge/i);
    expect(within(main).getByTestId("booking-embed").querySelector("[data-cal-link]")).toHaveAttribute(
      "data-cal-link",
      "samyak-sahu/intro",
    );
    expect(within(main).queryByTitle("A 60-second intro from Sam")).not.toBeInTheDocument();
    expect(main).toHaveAttribute("id", "main-content");
  });

  it("puts the offer cards before the booking section while there is no intro video", () => {
    render(<ServicesPage />);

    const main = screen.getByRole("main");
    const audit = within(main).getByRole("heading", { level: 2, name: "AI Workflow Audit" });
    const booking = within(main).getByRole("heading", { level: 2, name: "Start with a free 20-minute intro" });
    expect(precedes(audit, booking)).toBe(true);
    expect(within(main).queryByTitle("A 60-second intro from Sam")).not.toBeInTheDocument();
  });

  it("leads with the booking section and video once a Loom URL is set", () => {
    loom.url = "https://www.loom.com/share/0123abcdef4567";
    render(<ServicesPage />);

    const main = screen.getByRole("main");
    const audit = within(main).getByRole("heading", { level: 2, name: "AI Workflow Audit" });
    const booking = within(main).getByRole("heading", { level: 2, name: "Start with a free 20-minute intro" });
    expect(precedes(booking, audit)).toBe(true);
    expect(within(main).getByTitle("A 60-second intro from Sam")).toHaveAttribute(
      "src",
      "https://www.loom.com/embed/0123abcdef4567",
    );
  });
});
