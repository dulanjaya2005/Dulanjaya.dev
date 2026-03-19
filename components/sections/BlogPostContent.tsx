"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, Eye, ArrowLeft, Tag } from "lucide-react";
import { format } from "date-fns";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string | null;
  coverImage?: string | null;
  category?: string | null;
  tags?: string | null;
  readingTime?: number | null;
  views: number;
  createdAt: Date;
}

function renderContent(content: string) {
  // Simple markdown-like renderer
  const lines = content.split("\n");
  const elements: JSX.Element[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (line.startsWith("## ")) {
      elements.push(<h2 key={i} className="text-3xl font-display font-bold mt-10 mb-4">{line.slice(3)}</h2>);
    } else if (line.startsWith("### ")) {
      elements.push(<h3 key={i} className="text-2xl font-display font-semibold mt-8 mb-3">{line.slice(4)}</h3>);
    } else if (line.startsWith("```")) {
      const lang = line.slice(3);
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre key={i} className="bg-muted rounded-xl p-5 overflow-x-auto mb-6 border border-border/50">
          <code className="text-sm font-mono text-foreground">{codeLines.join("\n")}</code>
        </pre>
      );
    } else if (line.startsWith("- ")) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        listItems.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <ul key={i} className="list-none space-y-2 mb-4 ml-4">
          {listItems.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      );
      continue;
    } else if (line) {
      // Inline code
      const parts = line.split(/(`[^`]+`)/g);
      const rendered = parts.map((part, j) => {
        if (part.startsWith("`") && part.endsWith("`")) {
          return <code key={j} className="font-mono text-sm px-1.5 py-0.5 rounded bg-muted text-primary">{part.slice(1, -1)}</code>;
        }
        return part;
      });
      elements.push(<p key={i} className="text-muted-foreground leading-relaxed mb-4">{rendered}</p>);
    }
    i++;
  }
  return elements;
}

export default function BlogPostContent({ post }: { post: BlogPost }) {
  const tags = post.tags ? post.tags.split(",").map((t) => t.trim()) : [];

  return (
    <div className="pt-24">
      <article className="section-padding">
        <div className="section-container max-w-4xl">
          {/* Back link */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-10"
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {post.category && (
                <span className="text-xs px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium">
                  {post.category}
                </span>
              )}
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Calendar className="w-3.5 h-3.5" />
                {format(new Date(post.createdAt), "MMMM d, yyyy")}
              </span>
              {post.readingTime && (
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readingTime} min read
                </span>
              )}
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Eye className="w-3.5 h-3.5" />
                {post.views} views
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-tight mb-6">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-xl text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </motion.header>

          {/* Cover image */}
          {post.coverImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative h-80 md:h-96 rounded-2xl overflow-hidden mb-12"
            >
              <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
            </motion.div>
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="prose-portfolio"
          >
            {renderContent(post.content)}
          </motion.div>

          {/* Tags */}
          {tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12 pt-8 border-t border-border/50"
            >
              <div className="flex items-center gap-3 flex-wrap">
                <Tag className="w-4 h-4 text-muted-foreground" />
                {tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm border border-border/50">
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </article>
    </div>
  );
}
