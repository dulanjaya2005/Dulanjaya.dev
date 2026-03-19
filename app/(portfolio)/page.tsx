import HeroSection from "@/components/sections/HeroSection";
import TechStackMarquee from "@/components/sections/TechStackMarquee";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import LatestBlogPosts from "@/components/sections/LatestBlogPosts";
import ContactCTA from "@/components/sections/ContactCTA";
import { prisma } from "@/lib/prisma";

interface Project {
  id: number;
  title: string;
  description: string;
  image?: string | null;
  githubLink?: string | null;
  liveLink?: string | null;
  techStack: string;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  coverImage?: string | null;
  category?: string | null;
  readingTime?: number | null;
  createdAt: Date;
}

export default async function HomePage() {
  let featuredProjects: Project[] = [];
  let recentPosts: BlogPost[] = [];

  try {
    featuredProjects = await prisma.project.findMany({
      where: { featured: true },
      orderBy: { order: "asc" },
      take: 3,
    });

    recentPosts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 3,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        category: true,
        readingTime: true,
        createdAt: true,
      },
    });
  } catch (e) {
    // DB not connected yet
  }

  return (
    <>
      <HeroSection />
      <TechStackMarquee />
      <FeaturedProjects projects={featuredProjects} />
      <LatestBlogPosts posts={recentPosts} />
      <ContactCTA />
    </>
  );
}