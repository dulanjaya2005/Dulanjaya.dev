import type { Metadata } from "next";
import SkillsContent from "@/components/sections/SkillsContent";

export const metadata: Metadata = {
  title: "Skills",
  description: "Technical skills and expertise of Dulanjaya Thathsara including frontend, backend, database, and tools.",
};

export default function SkillsPage() {
  return <SkillsContent />;
}
