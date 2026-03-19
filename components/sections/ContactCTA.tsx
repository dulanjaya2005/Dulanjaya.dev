"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export default function ContactCTA() {
  return (
    <section className="section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 animated-gradient" />
          <div className="absolute inset-0 grid-overlay opacity-30" />
          <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-primary/20 blur-[80px]" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-purple-500/20 blur-[60px]" />

          <div className="relative z-10 text-center px-6 py-20">
            <p className="text-xs font-mono text-primary mb-3 tracking-widest uppercase">
              Let's Work Together
            </p>
            <h2 className="text-4xl md:text-6xl font-display font-black mb-6">
              Have a project in{" "}
              <span className="gradient-text">mind?</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-lg">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] hover:scale-105 text-lg"
              >
                <Mail className="w-5 h-5" />
                Get In Touch
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
