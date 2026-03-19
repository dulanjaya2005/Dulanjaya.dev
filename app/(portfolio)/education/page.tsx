import type { Metadata } from "next";
import EducationContent from "@/components/sections/EducationContent";

export const metadata: Metadata = {
  title: "Education",
  description: "Educational background of Dulanjaya Thathsara.",
};

export default function EducationPage() {
  return <EducationContent />;
}
