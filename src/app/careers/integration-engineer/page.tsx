import type { Metadata } from "next";
import { ManifestoLink, RoleDetail, SarasLink } from "@/components/careers/role-detail";

export const metadata: Metadata = { title: "Integration Engineer · Sanganak" };

export default function IntegrationEngineerPage() {
  return (
    <RoleDetail
      title="Integration Engineer"
      product="Saras"
      metadata={["REMOTE", "CONTRACT", "2-WEEK PROBATION"]}
      intro={
        <p>
          With <SarasLink />, we&apos;re building the accountability systems of the future for busy
          professionals, starting with standardized test prep. This role is about connecting Saras to
          the wider ecosystem of tools and services around it.
        </p>
      }
      about={[
        "Explore a wide range of third-party integrations: prototype quickly, discard what doesn't work, rebuild what does",
        "Design and build MCP servers",
        "Keep integrations reliable and observable, so nothing ever fails silently",
      ]}
      task="Ship v1 of a scoped integration, end to end."
      terms={[
        <><strong>Duration:</strong> 2-week probation, followed by 2 weeks</>,
        <><strong>Work style:</strong> Remote-first, high-trust and outcome-driven</>,
      ]}
      criteria={[
        "Experience building integrations against third-party APIs, SDKs or MCP",
        "Comfort with the failure modes of external systems, and with throwing work away when it doesn't pan out",
        <>Above all, apply only if this resonates with you strongly: <ManifestoLink /> — be prepared to ask and answer questions!</>,
      ]}
      resumeNote="Applicants with compelling GitHub profiles or portfolios will be preferred over swanky resumes."
    />
  );
}
