import type { Metadata } from "next";
import { ManifestoLink, RoleDetail, SarasLink } from "@/components/careers/role-detail";

export const metadata: Metadata = { title: "Lead, Design and Branding · Sanganak" };

export default function DesignLeadPage() {
  return (
    <RoleDetail
      title="Lead, Design and Branding"
      product="Saras"
      metadata={["REMOTE", "LEAD", "AI-NATIVE DESIGN"]}
      intro={
        <p>
          With <SarasLink />, we&apos;re building the accountability systems of the future for busy
          professionals. Design is not decoration here; it&apos;s how a product like Saras earns trust.
          You&apos;d own that: the brand, its artifacts, and the way it shows up across media and
          product surfaces.
        </p>
      }
      about={[
        "Own the brand and produce brand artifacts for Sanganak and Saras",
        "Produce video artifacts for media and product demonstration purposes",
        "Work fluently with AI-native design tools like Midjourney, and expect to live in an AI-native environment generally",
        "Understand interaction patterns and user journeys well enough to make design decisions that hold up in product, though the core mandate is brand",
      ]}
      terms={[
        <><strong>Compensation:</strong> Open for discussion. The role comes with meaningful equity for sure; we&apos;ll shape the cash component together with the right person</>,
        <><strong>Work style:</strong> Remote-first, high-trust and outcome-driven</>,
      ]}
      criteria={[
        "A portfolio or demonstrated work that shows real AI-native capacity, not just tool familiarity",
        "Experience producing video or motion work for media and demonstration",
        "An understanding of interaction patterns and user journeys, so brand work and product work stay coherent",
        "Good to have: an ear for Indian indie music and a feel for the modern Indian aesthetic, plus eclectic taste in movies and books",
        <>Above all, apply only if this resonates with you strongly: <ManifestoLink /> — be prepared to ask and answer questions!</>,
      ]}
      resumeNote="Applicants with compelling portfolios will be preferred over swanky resumes; for this role the portfolio is the resume."
      tall
    />
  );
}
