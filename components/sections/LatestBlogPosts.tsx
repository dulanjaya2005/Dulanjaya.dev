"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";

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

const demoPosts: BlogPost[] = [
  {
    id: 1,
    title: "Building Modern Web Apps with Next.js 14",
    slug: "building-modern-web-apps-nextjs-14",
    excerpt: "Explore the latest features in Next.js 14, including Server Components, the App Router, and how they revolutionize full-stack development.",
    category: "Next.js",
    readingTime: 8,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: 2,
    title: "TypeScript Best Practices for Large Scale Apps",
    slug: "typescript-best-practices",
    excerpt: "A deep dive into TypeScript patterns that improve code maintainability, type safety, and developer experience in production applications.",
    category: "TypeScript",
    readingTime: 6,
    createdAt: new Date("2024-01-08"),
  },
  {
    id: 3,
    title: "Real-time Features with Socket.io & React",
    slug: "realtime-socketio-react",
    excerpt: "Learn how to implement real-time notifications, live updates, and collaborative features using Socket.io in your React applications.",
    category: "Node.js",
    readingTime: 10,
    createdAt: new Date("2023-12-20"),
  },
];

const categoryColors: Record<string, string> = {
  "Next.js": "text-blue-400 bg-blue-400/10 border-blue-400/20",
  "TypeScript": "text-blue-600 bg-blue-600/10 border-blue-600/20",
  "Node.js": "text-green-400 bg-green-400/10 border-green-400/20",
  "React": "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  "CSS": "text-pink-400 bg-pink-400/10 border-pink-400/20",
};

export function LatestBlogPosts({ posts }: { posts: BlogPost[] }) {
  const displayPosts = posts.length > 0 ? posts : demoPosts;

  return (
    <section className="section-padding bg-muted/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-xs font-mono text-primary mb-2 tracking-widest uppercase">
              Writing
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold">
              Latest{" "}
              <span className="gradient-text">Articles</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            All posts <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="space-y-4">
          {displayPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="glass rounded-2xl border border-border/50 hover:border-primary/30 p-6 transition-all hover:-translate-y-1">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        {post.category && (
                          <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${categoryColors[post.category] || "text-primary bg-primary/10 border-primary/20"}`}>
                            {post.category}
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(post.createdAt), "MMM d, yyyy")}
                        </span>
                        {post.readingTime && (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {post.readingTime} min read
                          </span>
                        )}
                      </div>
                      <h3 className="font-display font-semibold text-lg group-hover:text-primary transition-colors mb-1 truncate">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LatestBlogPosts;
