import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromCookies } from "@/lib/auth";
import { slugify, getReadingTime } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const auth = getAuthFromCookies();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true, title: true, slug: true, category: true,
      published: true, views: true, readingTime: true, createdAt: true,
    },
  });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const auth = getAuthFromCookies();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();
    const slug = data.slug || slugify(data.title);
    const readingTime = getReadingTime(data.content);

    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug,
        content: data.content,
        excerpt: data.excerpt || null,
        coverImage: data.coverImage || null,
        category: data.category || null,
        tags: data.tags || null,
        published: data.published || false,
        readingTime,
      },
    });
    return NextResponse.json(post);
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json({ error: "A post with this slug already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
