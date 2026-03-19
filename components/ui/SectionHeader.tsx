"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = false,
}: SectionHeaderProps) {
  const parts = title.split(" ");
  const lastWord = parts.pop();
  const rest = parts.join(" ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={centered ? "text-center" : ""}
    >
      {eyebrow && (
        <p className="text-xs font-mono text-primary mb-3 tracking-widest uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
        {rest} <span className="gradient-text">{lastWord}</span>
      </h2>
      {subtitle && (
        <p className={`text-muted-foreground text-lg leading-relaxed ${centered ? "max-w-2xl mx-auto" : "max-w-xl"}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
