"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, Clock, Calendar, Eye, Tag, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { format } from "date-fns";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  coverImage?: string | null;
  category?: string | null;
  tags?: string | null;
  readingTime?: number | null;
  views: number;
  createdAt: Date;
}

const demoPosts: BlogPost[] = [
  {
    id: 1,
    title: "Building Modern Web Apps with Next.js 14 App Router",
    slug: "building-modern-web-apps-nextjs-14",
    excerpt: "Explore the latest features in Next.js 14, including Server Components, the App Router, and how they revolutionize full-stack development.",
    category: "Next.js",
    tags: "nextjs,react,typescript,webdev",
    readingTime: 8,
    views: 1240,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: 2,
    title: "TypeScript Best Practices for Large-Scale Applications",
    slug: "typescript-best-practices",
    excerpt: "A deep dive into TypeScript patterns that improve code maintainability, type safety, and developer experience in production applications.",
    category: "TypeScript",
    tags: "typescript,javascript,bestpractices",
    readingTime: 6,
    views: 890,
    createdAt: new Date("2024-01-08"),
  },
  {
    id: 3,
    title: "Real-time Features with Socket.io & React",
    slug: "realtime-socketio-react",
    excerpt: "Learn how to implement real-time notifications, live updates, and collaborative features using Socket.io in your React applications.",
    category: "Node.js",
    tags: "nodejs,socketio,react,realtime",
    readingTime: 10,
    views: 650,
    createdAt: new Date("2023-12-20"),
  },
  {
    id: 4,
    title: "Mastering CSS Grid and Flexbox in 2024",
    slug: "mastering-css-grid-flexbox",
    excerpt: "A comprehensive guide to modern CSS layout techniques with practical examples, common patterns, and tips for responsive design.",
    category: "CSS",
    tags: "css,layout,flexbox,grid",
    readingTime: 7,
    views: 420,
    createdAt: new Date("2023-12-01"),
  },
  {
    id: 5,
    title: "Optimizing MySQL Queries for Web Applications",
    slug: "optimizing-mysql-queries",
    excerpt: "Practical techniques to write faster MySQL queries, use indexes effectively, and improve database performance in production.",
    category: "Database",
    tags: "mysql,database,performance,backend",
    readingTime: 9,
    views: 340,
    createdAt: new Date("2023-11-15"),
  },
  {
    id: 6,
    title: "Building a REST API with Node.js, Express and Prisma",
    slug: "rest-api-nodejs-express-prisma",
    excerpt: "Step-by-step guide to building a production-ready REST API using Node.js, Express.js, Prisma ORM and MySQL database.",
    category: "Node.js",
    tags: "nodejs,express,prisma,api,backend",
    readingTime: 12,
    views: 780,
    createdAt: new Date("2023-10-28"),
  },
];

const categoryColors: Record<string, string> = {
  "Next.js": "text-blue-400 bg-blue-400/10 border-blue-400/20",
  "TypeScript": "text-blue-600 bg-blue-600/10 border-blue-600/20",
  "Node.js": "text-green-400 bg-green-400/10 border-green-400/20",
  "React": "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  "CSS": "text-pink-400 bg-pink-400/10 border-pink-400/20",
  "Database": "text-orange-400 bg-orange-400/10 border-orange-400/20",
};

const gradients = [
  "from-cyan-500/20 to-blue-600/20",
  "from-purple-500/20 to-pink-600/20",
  "from-green-500/20 to-emerald-600/20",
  "from-orange-500/20 to-red-600/20",
  "from-yellow-500/20 to-amber-600/20",
  "from-indigo-500/20 to-violet-600/20",
];

export default function BlogContent({
  initialPosts,
  categories,
  searchParams,
}: {
  initialPosts: BlogPost[];
  categories: string[];
  searchParams: { category?: string; search?: string };
}) {
  const router = useRouter();
  const posts = initialPosts.length > 0 ? initialPosts : demoPosts;
  const allCategories = categories.length > 0
    ? categories
    : [...new Set(demoPosts.map((p) => p.category!).filter(Boolean))];

  const [search, setSearch] = useState(searchParams.search || "");
  const [activeCategory, setActiveCategory] = useState(searchParams.category || "");

  const filtered = posts.filter((p) => {
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.excerpt || "").toLowerCase().includes(search.toLowerCase());
    const matchCat = !activeCategory || p.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="section-container">
          <SectionHeader
            eyebrow="Writing"
            title="Developer Blog & Articles"
            subtitle="Thoughts, tutorials and insights on modern web development, best practices and the tools I use."
          />

          {/* Controls */}
          <div className="mt-10 flex flex-col gap-4">
            {/* Search */}
            <div className="relative max-w-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl glass border border-border/50 focus:border-primary/50 focus:outline-none bg-transparent text-sm"
              />
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory("")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === ""
                    ? "bg-primary text-primary-foreground"
                    : "glass border border-border/50 text-muted-foreground hover:border-primary/40"
                }`}
              >
                All
              </button>
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(activeCategory === cat ? "" : cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : `glass border ${categoryColors[cat] || "border-border/50 text-muted-foreground"} hover:border-primary/40`
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Featured post */}
          {filtered[0] && !search && !activeCategory && (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10"
            >
              <Link href={`/blog/${filtered[0].slug}`} className="group block">
                <div className={`glass rounded-3xl border border-border/50 hover:border-primary/30 overflow-hidden transition-all`}>
                  <div className="flex flex-col lg:flex-row">
                    <div className={`lg:w-1/2 h-64 lg:h-auto bg-gradient-to-br ${gradients[0]} relative`}>
                      {filtered[0].coverImage ? (
                        <Image src={filtered[0].coverImage} alt={filtered[0].title} fill className="object-cover" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-8xl font-display font-black opacity-10">
                            {filtered[0].title.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-primary/20 border border-primary/40 text-xs font-mono text-primary">
                        Featured
                      </div>
                    </div>
                    <div className="lg:w-1/2 p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-3">
                        {filtered[0].category && (
                          <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${categoryColors[filtered[0].category] || "text-primary bg-primary/10 border-primary/20"}`}>
                            {filtered[0].category}
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(filtered[0].createdAt), "MMM d, yyyy")}
                        </span>
                      </div>
                      <h2 className="font-display font-bold text-2xl md:text-3xl mb-3 group-hover:text-primary transition-colors">
                        {filtered[0].title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                        {filtered[0].excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        {filtered[0].readingTime && (
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{filtered[0].readingTime} min read</span>
                        )}
                        <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{filtered[0].views} views</span>
                        <span className="flex items-center gap-2 ml-auto text-primary font-medium text-sm group-hover:gap-3 transition-all">
                          Read more <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          )}

          {/* Posts grid */}
          <motion.div layout className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {(search || activeCategory ? filtered : filtered.slice(1)).map((post, i) => (
                <motion.article
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.07 }}
                  className="group"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="glass rounded-2xl border border-border/50 hover:border-primary/30 overflow-hidden transition-all card-hover h-full flex flex-col">
                      {/* Cover */}
                      <div className={`h-44 bg-gradient-to-br ${gradients[(i + 1) % gradients.length]} relative`}>
                        {post.coverImage ? (
                          <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-5xl font-display font-black opacity-10">{post.title.charAt(0)}</span>
                          </div>
                        )}
                      </div>

                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 mb-3">
                          {post.category && (
                            <span className={`text-xs px-2 py-0.5 rounded-full border ${categoryColors[post.category] || "text-primary bg-primary/10 border-primary/20"}`}>
                              {post.category}
                            </span>
                          )}
                          <span className="text-xs text-muted-foreground ml-auto flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {format(new Date(post.createdAt), "MMM d, yyyy")}
                          </span>
                        </div>

                        <h3 className="font-display font-semibold text-base mb-2 group-hover:text-primary transition-colors line-clamp-2 flex-1">
                          {post.title}
                        </h3>

                        {post.excerpt && (
                          <p className="text-xs text-muted-foreground line-clamp-2 mb-4">
                            {post.excerpt}
                          </p>
                        )}

                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto pt-3 border-t border-border/50">
                          {post.readingTime && (
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readingTime} min</span>
                          )}
                          <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{post.views}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              No articles found matching your criteria.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
