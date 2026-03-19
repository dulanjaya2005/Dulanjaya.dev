"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Download, Mail, Github, Linkedin } from "lucide-react";
import { useEffect, useRef } from "react";
import Image from "next/image";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; color: string;
    }> = [];

    const colors = ["#00F5FF", "#BF5AF2", "#FF6B35", "#39FF14"];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const init = () => {
      resize();
      particles = Array.from({ length: 60 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });

      // Draw connecting lines
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 245, 255, ${(1 - dist / 120) * 0.1})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener("resize", init);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animated-gradient opacity-90" />
      <div className="absolute inset-0 grid-overlay opacity-40" />

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-500/10 blur-[100px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-orange-500/8 blur-[80px] animate-pulse-slow" style={{ animationDelay: "4s" }} />

      <div className="relative z-10 section-container w-full pt-24 pb-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex-1"
        >
          {/* Availability badge */}
          <motion.div variants={item} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 text-sm font-mono text-primary">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for new opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={item}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-[0.9] mb-4"
          >
            <span className="block text-foreground">Dulanjaya</span>
            <span className="block gradient-text">Thathsara</span>
          </motion.h1>

          {/* Title */}
          <motion.div variants={item} className="mb-6">
            <p className="text-xl md:text-2xl font-mono text-primary font-medium">
              &lt; Software Engineer /&gt;
            </p>
          </motion.div>

          {/* Intro */}
          <motion.p
            variants={item}
            className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed mb-10"
          >
            Software Engineer with{" "}
            <span className="text-foreground font-medium">3+ years of hands-on project experience</span>{" "}
            building modern web applications using{" "}
            <span className="text-primary">React</span>,{" "}
            <span className="text-primary">Node.js</span> and{" "}
            <span className="text-primary">MySQL</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={item}
            className="flex flex-wrap gap-4 mb-12"
          >
            <Link
              href="/projects"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] hover:scale-105"
            >
              View Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="/cv.pdf"
              download
              className="flex items-center gap-2 px-6 py-3 rounded-xl glass border border-border hover:border-primary/50 font-medium transition-all hover:bg-primary/5"
            >
              <Download className="w-4 h-4" />
              Download CV
            </a>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border hover:border-primary/50 font-medium transition-all hover:bg-muted"
            >
              <Mail className="w-4 h-4" />
              Contact Me
            </Link>
          </motion.div>

          {/* Social + stats */}
          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-6"
          >
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/dulanjaya2005"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            <div className="h-6 w-px bg-border" />

            <div className="flex gap-6">
              {[
                { value: "3+", label: "Years Exp" },
                { value: "6+", label: "Projects" },
                { value: "3", label: "Companies" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-2xl font-display font-bold text-primary">{value}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Profile Image - Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden lg:flex flex-col items-center gap-6"
        >
          <div className="relative">
            {/* Glow ring */}
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/30 via-purple-500/20 to-orange-500/20 blur-xl animate-pulse-slow" />
            <div className="relative w-72 h-80 rounded-3xl overflow-hidden border-2 border-primary/30 shadow-2xl shadow-primary/20">
              <Image
                src="/dula.jpg"
                alt="Dulanjaya Thathsara"
                fill
                className="object-cover object-top"
                priority
              />
              {/* Bottom gradient overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full glass border border-primary/40 text-xs font-mono text-primary whitespace-nowrap">
              Software Engineer
            </div>
          </div>
        </motion.div>

        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground font-mono">scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-10 bg-gradient-to-b from-primary to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}