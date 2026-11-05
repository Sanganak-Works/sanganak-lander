import type { Metadata } from "next";
import { ManifestoLink, RoleDetail, SarasLink } from "@/components/careers/role-detail";

export const metadata: Metadata = { title: "Platform Engineer · Sanganak" };

export default function PlatformEngineerPage() {
  return (
    <RoleDetail
      title="Platform Engineer"
      product="Saras"
      metadata={["REMOTE", "CONTRACT", "INFRASTRUCTURE"]}
      intro={
        <p>
          With <SarasLink />, we&apos;re building the accountability systems of the future for busy
          professionals, starting with standardized test prep. Behind it is a platform that has to stay
          up, stay secure and scale. You&apos;d own that layer.
        </p>
      }
      about={[
        "Own DevOps end to end: CI/CD, cloud hosting, deployments and environments",
        "Design networking, access and auth so the platform stays secure by default",
        "Keep infrastructure reliable, observable and ready to scale as usage grows",
      ]}
      task="Spec out and stand up a scoped piece of infrastructure, end to end."
      terms={[
        <><strong>Work style:</strong> Remote-first, high-trust and outcome-driven</>,
      ]}
      criteria={[
        "Experience with cloud hosting, DevOps, CI/CD pipelines, networking and Linux servers",
        "A security mindset, especially around auth, access control and multi-tenant systems",
        <>Above all, apply only if this resonates with you strongly: <ManifestoLink /> — be prepared to ask and answer questions!</>,
      ]}
      resumeNote="Applicants with compelling GitHub profiles or portfolios will be preferred over swanky resumes."
    />
  );
}
