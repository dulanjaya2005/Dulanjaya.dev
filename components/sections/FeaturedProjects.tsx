"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Github, ExternalLink, ArrowRight } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  image?: string | null;
  githubLink?: string | null;
  liveLink?: string | null;
  techStack: string;
}

// Fallback demo projects
const demoProjects: Project[] = [
  {
    id: 1,
    title: "Personal Portfolio Website",
    description: "A modern, responsive portfolio website built with Next.js and TypeScript, featuring smooth animations and a dark/light mode.",
    image: null,
    githubLink: "https://github.com/dulanjaya2005",
    liveLink: "https://dulanjaya2005.github.io/DulanjayaThathsara/",
    techStack: "Next.js,TypeScript,Tailwind CSS,Framer Motion",
  },
  {
    id: 2,
    title: "Responsive Web Application",
    description: "A full-stack web application with React frontend, Node.js backend and MySQL database. Features authentication, CRUD operations and real-time updates.",
    image: null,
    githubLink: "https://github.com/dulanjaya2005",
    liveLink: "#",
    techStack: "React,Node.js,Express,MySQL,Socket.io",
  },
  {
    id: 3,
    title: "UI/UX Web Design Project",
    description: "Modern UI/UX design implementation with glassmorphism effects, micro-animations and a comprehensive design system.",
    image: null,
    githubLink: "https://github.com/dulanjaya2005",
    liveLink: "#",
    techStack: "React,TypeScript,Tailwind CSS,Figma",
  },
];

const gradients = [
  "from-cyan-500/20 to-blue-600/20",
  "from-purple-500/20 to-pink-600/20",
  "from-orange-500/20 to-red-600/20",
];

export default function FeaturedProjects({ projects }: { projects: Project[] }) {
  const displayProjects = projects.length > 0 ? projects : demoProjects;

  return (
    <section className="section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-xs font-mono text-primary mb-2 tracking-widest uppercase">
              Featured Work
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold">
              Selected{" "}
              <span className="gradient-text">Projects</span>
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayProjects.map((project, i) => {
            const techArray = project.techStack.split(",").map((t) => t.trim());
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative glass rounded-2xl border border-border/50 hover:border-primary/30 overflow-hidden card-hover"
              >
                {/* Project image / gradient placeholder */}
                <div className={`h-48 bg-gradient-to-br ${gradients[i % gradients.length]} relative overflow-hidden`}>
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="grid grid-cols-3 gap-2 opacity-30">
                        {Array.from({ length: 9 }).map((_, j) => (
                          <div key={j} className="w-8 h-8 rounded-lg bg-primary/40" />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Overlay links */}
                  <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl glass border border-border text-foreground hover:text-primary hover:border-primary/50 transition-all"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {project.liveLink && project.liveLink !== "#" && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl glass border border-border text-foreground hover:text-primary hover:border-primary/50 transition-all"
                      >
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
                  <div className="flex flex-wrap gap-2">
                    {techArray.slice(0, 3).map((tech) => (
                      <span key={tech} className="skill-tag text-xs">
                        {tech}
                      </span>
                    ))}
                    {techArray.length > 3 && (
                      <span className="text-xs text-muted-foreground py-1">
                        +{techArray.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-8 md:hidden"
        >
          <Link
            href="/projects"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            View all projects <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
