import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromCookies } from "@/lib/auth";

function requireAuth(req: NextRequest) {
  const auth = getAuthFromCookies();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return null;
}

export async function GET(req: NextRequest) {
  const authErr = requireAuth(req);
  if (authErr) return authErr;

  const projects = await prisma.project.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const authErr = requireAuth(req);
  if (authErr) return authErr;

  try {
    const data = await req.json();
    const project = await prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        image: data.image || null,
        githubLink: data.githubLink || null,
        liveLink: data.liveLink || null,
        techStack: data.techStack,
        featured: data.featured || false,
        order: data.order || 0,
      },
    });
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
