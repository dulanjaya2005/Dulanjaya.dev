import type { Metadata } from "next";
import ProjectsContent from "@/components/sections/ProjectsContent";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Projects",
  description: "Portfolio projects by Dulanjaya Thathsara.",
};

export default async function ProjectsPage() {
  let projects = [];
  try {
    projects = await prisma.project.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
  } catch {}

  return <ProjectsContent initialProjects={projects} />;
}
