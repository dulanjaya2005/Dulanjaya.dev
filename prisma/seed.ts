import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create default admin user
  const existing = await prisma.user.findUnique({ where: { email: "admin@portfolio.com" } });
  if (!existing) {
    const password = await bcrypt.hash("Admin@1234", 12);
    await prisma.user.create({
      data: {
        name: "Dulanjaya Thathsara",
        email: "admin@portfolio.com",
        password,
        role: "superadmin",
      },
    });
    console.log("✅ Created admin user: admin@portfolio.com / Admin@1234");
  }

  // Seed sample projects
  const projectCount = await prisma.project.count();
  if (projectCount === 0) {
    await prisma.project.createMany({
      data: [
        {
          title: "Personal Portfolio Website",
          description: "A modern, responsive portfolio website built with Next.js 14 and TypeScript, featuring smooth animations, dark/light mode, real-time admin dashboard, and full blog system.",
          githubLink: "https://github.com/dulanjaya2005",
          liveLink: "https://dulanjaya2005.github.io/DulanjayaThathsara/",
          techStack: "Next.js,TypeScript,Tailwind CSS,Framer Motion,Prisma,MySQL",
          featured: true,
          order: 1,
        },
        {
          title: "Responsive Web Application",
          description: "A full-stack web application with React frontend, Node.js backend and MySQL database. Features user authentication, real-time updates and comprehensive CRUD operations.",
          githubLink: "https://github.com/dulanjaya2005",
          liveLink: "#",
          techStack: "React,Node.js,Express,MySQL,Socket.io,JWT",
          featured: true,
          order: 2,
        },
        {
          title: "UI/UX Web Design Project",
          description: "Modern UI/UX design implementation featuring glassmorphism effects, micro-animations, and a comprehensive design system.",
          githubLink: "https://github.com/dulanjaya2005",
          liveLink: "#",
          techStack: "React,TypeScript,Tailwind CSS,Figma,Framer Motion",
          featured: true,
          order: 3,
        },
      ],
    });
    console.log("✅ Created sample projects");
  }

  // Seed sample blog posts
  const postCount = await prisma.blogPost.count();
  if (postCount === 0) {
    await prisma.blogPost.createMany({
      data: [
        {
          title: "Building Modern Web Apps with Next.js 14 App Router",
          slug: "building-modern-web-apps-nextjs-14",
          content: "## Introduction\n\nNext.js 14 is a powerful full-stack framework...\n\n## Server Components\n\nServer Components allow rendering on the server side...",
          excerpt: "Explore the latest features in Next.js 14, including Server Components and the App Router.",
          category: "Next.js",
          tags: "nextjs,react,typescript,webdev",
          published: true,
          readingTime: 8,
        },
        {
          title: "TypeScript Best Practices for Large-Scale Applications",
          slug: "typescript-best-practices",
          content: "## Why TypeScript?\n\nTypeScript provides static typing for JavaScript...\n\n## Key Patterns\n\nUse interfaces for object shapes...",
          excerpt: "A deep dive into TypeScript patterns that improve code maintainability in production apps.",
          category: "TypeScript",
          tags: "typescript,javascript,bestpractices",
          published: true,
          readingTime: 6,
        },
      ],
    });
    console.log("✅ Created sample blog posts");
  }

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
