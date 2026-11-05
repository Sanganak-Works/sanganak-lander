import type { Metadata } from "next";
import { CareersIndex } from "@/components/careers/careers-index";

export const metadata: Metadata = {
  title: "Careers · Sanganak",
  description: "Join Sanganak and build frontier technology for real people.",
};

export default function CareersPage() {
  return <CareersIndex />;
}
