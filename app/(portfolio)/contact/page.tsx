import type { Metadata } from "next";
import ContactContent from "@/components/sections/ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Dulanjaya Thathsara for project inquiries and collaborations.",
};

export default function ContactPage() {
  return <ContactContent />;
}
