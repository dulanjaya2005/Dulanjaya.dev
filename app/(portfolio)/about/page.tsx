import type { Metadata } from "next";
import AboutContent from "@/components/sections/AboutContent";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Dulanjaya Thathsara – Software Engineer with experience in frontend, UI/UX and full-stack web development.",
};

export default function AboutPage() {
  return <AboutContent />;
}
