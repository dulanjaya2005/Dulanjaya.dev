import type { Metadata } from "next";
import BlogContent from "@/components/sections/BlogContent";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Blog",
  description: "Developer articles, tutorials and thoughts by Dulanjaya Thathsara.",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string; page?: string };
}) {
  let posts: any[] = [];
  let categories: string[] = [];

  try {
    const where: any = { published: true };
    if (searchParams.category) where.category = searchParams.category;
    if (searchParams.search) {
      where.OR = [
        { title: { contains: searchParams.search } },
        { excerpt: { contains: searchParams.search } },
      ];
    }

    posts = await prisma.blogPost.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        category: true,
        tags: true,
        readingTime: true,
        views: true,
        createdAt: true,
      },
    });

    const catResult = await prisma.blogPost.findMany({
      where: { published: true, category: { not: null } },
      select: { category: true },
      distinct: ["category"],
    });
    categories = catResult.map((c) => c.category!).filter(Boolean);
  } catch {}

  return (
    <BlogContent
      initialPosts={posts}
      categories={categories}
      searchParams={searchParams}
    />
  );
}
