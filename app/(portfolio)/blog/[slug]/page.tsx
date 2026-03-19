import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import BlogPostContent from "@/components/sections/BlogPostContent";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } });
    if (!post) return { title: "Post Not Found" };
    return {
      title: post.title,
      description: post.excerpt || undefined,
      openGraph: {
        title: post.title,
        description: post.excerpt || undefined,
        images: post.coverImage ? [post.coverImage] : [],
      },
    };
  } catch {
    return { title: "Blog Post" };
  }
}

// Demo post for when DB is unavailable
const demoPost = {
  id: 1,
  title: "Building Modern Web Apps with Next.js 14 App Router",
  slug: "building-modern-web-apps-nextjs-14",
  content: `
## Introduction

Next.js 14 introduces powerful new features that fundamentally change how we build web applications. The App Router, Server Components, and improved data fetching patterns make it easier than ever to build fast, scalable applications.

## Server Components

Server Components allow you to render components on the server, reducing the JavaScript sent to the client.

\`\`\`tsx
// This runs only on the server
async function DataComponent() {
  const data = await fetch('https://api.example.com/data');
  return <div>{/* render data */}</div>;
}
\`\`\`

## The App Router

The App Router uses file-system based routing with a new \`app\` directory:

- \`app/page.tsx\` → root route
- \`app/about/page.tsx\` → /about
- \`app/blog/[slug]/page.tsx\` → dynamic routes

## Data Fetching

Data fetching is now built directly into Server Components:

\`\`\`tsx
async function Page({ params }: { params: { id: string } }) {
  const data = await prisma.post.findUnique({
    where: { id: Number(params.id) }
  });
  return <div>{data?.title}</div>;
}
\`\`\`

## Conclusion

Next.js 14 is a game-changer for full-stack React development. The combination of Server Components, the App Router, and improved tooling makes it the best choice for modern web applications.
  `,
  excerpt: "Explore the latest features in Next.js 14, including Server Components, the App Router, and how they revolutionize full-stack development.",
  coverImage: null,
  category: "Next.js",
  tags: "nextjs,react,typescript,webdev",
  readingTime: 8,
  views: 1240,
  published: true,
  createdAt: new Date("2024-01-15"),
  updatedAt: new Date("2024-01-15"),
};

export default async function BlogPostPage({ params }: Props) {
  let post: any = null;

  try {
    post = await prisma.blogPost.findUnique({
      where: { slug: params.slug, published: true },
    });
    if (post) {
      await prisma.blogPost.update({
        where: { id: post.id },
        data: { views: { increment: 1 } },
      });
    }
  } catch {}

  if (!post) {
    // Use demo post for demo slug
    if (params.slug === demoPost.slug) {
      post = demoPost;
    } else {
      notFound();
    }
  }

  return <BlogPostContent post={post} />;
}
