import type { Metadata } from "next";
import { ManifestoLink, RoleDetail, SarasLink } from "@/components/careers/role-detail";

export const metadata: Metadata = { title: "Agent Engineer (Intern) · Sanganak" };

export default function AgentEngineerPage() {
  return (
    <RoleDetail
      title="Agent Engineer (Intern)"
      product="Saras"
      metadata={["REMOTE", "INTERNSHIP", "2-WEEK PROBATION"]}
      intro={
        <p>
          With <SarasLink />, we&apos;re building the accountability systems of the future for busy
          professionals, starting with standardized test prep. You&apos;d work on the operational core:
          setting up agent environments and structure so that spinning up a new agent is a
          repeatable process, not an artisanal one.
        </p>
      }
      about={[
        "Set up agent environments, configurations and structure for new Saras instances",
        "Turn one-off setup work into documented, repeatable pipelines",
        "Work closely with the founder on daily operations",
      ]}
      task="Set up the coaching bot."
      terms={[
        <><strong>Duration:</strong> 2-week probation, followed by 1 month</>,
        <><strong>Work style:</strong> Remote-first, high-trust and outcome-driven</>,
      ]}
      criteria={[
        "Comfort working with autonomous AI agents; exposure to Hermes/OpenClaw frameworks is a strong plus",
        "Systems thinking: you see repeatable patterns where others see manual tasks",
        <>Above all, apply only if this resonates with you strongly: <ManifestoLink /> — be prepared to ask and answer questions!</>,
      ]}
      resumeNote="Applicants with compelling GitHub profiles or portfolios will be preferred over swanky resumes."
    />
  );
}
