"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Github, ExternalLink, Star, GitFork, Search } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import GitHubProjects from "@/components/sections/GitHubProjects";

interface Project {
  id: number;
  title: string;
  description: string;
  image?: string | null;
  githubLink?: string | null;
  liveLink?: string | null;
  techStack: string;
  featured: boolean;
}

const demoProjects: Project[] = [
  {
    id: 1,
    title: "Personal Portfolio Website",
    description: "A modern, responsive portfolio website built with Next.js 14 and TypeScript, featuring smooth animations, dark/light mode, real-time admin dashboard, and blog system.",
    image: null,
    githubLink: "https://github.com/dulanjaya2005",
    liveLink: "https://dulanjaya2005.github.io/DulanjayaThathsara/",
    techStack: "Next.js,TypeScript,Tailwind CSS,Framer Motion,Prisma,MySQL",
    featured: true,
  },
  {
    id: 2,
    title: "Responsive Web Application",
    description: "A full-stack web application with React frontend, Node.js backend and MySQL database. Features user authentication, real-time updates via Socket.io, and comprehensive CRUD operations.",
    image: null,
    githubLink: "https://github.com/dulanjaya2005",
    liveLink: "#",
    techStack: "React,Node.js,Express,MySQL,Socket.io,JWT",
    featured: true,
  },
  {
    id: 3,
    title: "UI/UX Web Design Project",
    description: "Modern UI/UX design implementation featuring glassmorphism effects, micro-animations, a comprehensive design system and pixel-perfect components.",
    image: null,
    githubLink: "https://github.com/dulanjaya2005",
    liveLink: "#",
    techStack: "React,TypeScript,Tailwind CSS,Figma,Framer Motion",
    featured: true,
  },
  {
    id: 4,
    title: "E-Commerce Platform",
    description: "Full-featured e-commerce platform with product management, shopping cart, payment integration and order tracking system.",
    image: null,
    githubLink: "https://github.com/dulanjaya2005",
    liveLink: "#",
    techStack: "React,Node.js,MySQL,Express,Bootstrap",
    featured: false,
  },
  {
    id: 5,
    title: "Task Management App",
    description: "A Kanban-style project management application with drag-and-drop support, team collaboration, and real-time updates.",
    image: null,
    githubLink: "https://github.com/dulanjaya2005",
    liveLink: "#",
    techStack: "React,TypeScript,Socket.io,Node.js,MySQL",
    featured: false,
  },
  {
    id: 6,
    title: "Blog CMS Platform",
    description: "A content management system for developers with Markdown support, code highlighting, categories, tags, and SEO optimization.",
    image: null,
    githubLink: "https://github.com/dulanjaya2005",
    liveLink: "#",
    techStack: "Next.js,Prisma,MySQL,TypeScript,Tailwind CSS",
    featured: false,
  },
];

const gradients = [
  "from-cyan-500/20 to-blue-700/20",
  "from-purple-500/20 to-pink-700/20",
  "from-orange-500/20 to-red-700/20",
  "from-green-500/20 to-emerald-700/20",
  "from-yellow-500/20 to-amber-700/20",
  "from-indigo-500/20 to-violet-700/20",
];

type FilterType = "all" | "featured" | "github";

export default function ProjectsContent({ initialProjects }: { initialProjects: Project[] }) {
  const projects = initialProjects.length > 0 ? initialProjects : demoProjects;
  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");

  const filtered = projects.filter((p) => {
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.techStack.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || (filter === "featured" && p.featured);
    return matchSearch && matchFilter;
  });

  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="section-container">
          <SectionHeader
            eyebrow="My Work"
            title="Projects & Builds"
            subtitle="A collection of projects I've built — from personal experiments to production applications."
          />

          {/* Controls */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass border border-border/50 focus:border-primary/50 focus:outline-none bg-transparent text-sm"
              />
            </div>

            {/* Filter tabs */}
            <div className="flex gap-2">
              {(["all", "featured", "github"] as FilterType[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${
                    filter === f
                      ? "bg-primary text-primary-foreground"
                      : "glass border border-border/50 hover:border-primary/40 text-muted-foreground"
                  }`}
                >
                  {f === "github" ? "GitHub" : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Projects grid */}
          {filter !== "github" && (
            <motion.div
              layout
              className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filtered.map((project, i) => {
                  const techs = project.techStack.split(",").map((t) => t.trim());
                  return (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="group glass rounded-2xl border border-border/50 hover:border-primary/30 overflow-hidden card-hover"
                    >
                      {/* Thumbnail */}
                      <div className={`h-48 bg-gradient-to-br ${gradients[i % gradients.length]} relative overflow-hidden`}>
                        {project.image ? (
                          <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-6xl font-display font-black opacity-10 select-none">
                              {project.title.charAt(0)}
                            </span>
                          </div>
                        )}
                        {project.featured && (
                          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-primary/20 border border-primary/40 text-xs font-mono text-primary">
                            Featured
                          </div>
                        )}
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                          {project.githubLink && (
                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                              className="p-3 rounded-xl glass border border-border text-foreground hover:text-primary hover:border-primary/50 transition-all">
                              <Github className="w-5 h-5" />
                            </a>
                          )}
                          {project.liveLink && project.liveLink !== "#" && (
                            <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                              className="p-3 rounded-xl glass border border-border text-foreground hover:text-primary hover:border-primary/50 transition-all">
                              <ExternalLink className="w-5 h-5" />
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {techs.slice(0, 4).map((t) => (
                            <span key={t} className="skill-tag text-xs">{t}</span>
                          ))}
                          {techs.length > 4 && (
                            <span className="text-xs text-muted-foreground self-center">+{techs.length - 4}</span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}

          {/* GitHub repos tab */}
          {filter === "github" && <GitHubProjects />}

          {filtered.length === 0 && filter !== "github" && (
            <div className="text-center py-20 text-muted-foreground">
              No projects found matching your search.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
