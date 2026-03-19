"use client";

import { motion } from "framer-motion";
import {
  SiHtml5, SiCss3, SiSass, SiJavascript, SiTypescript, SiReact, SiNextdotjs,
  SiAngular, SiMui, SiBootstrap, SiNodedotjs, SiExpress, SiPhp,
  SiMysql, SiGit, SiFigma, SiWordpress, SiElectron, SiMongodb,
  SiOpenai, SiGoogle, SiGithub, SiX,
} from "react-icons/si";
import SectionHeader from "@/components/ui/SectionHeader";
import { Users, Lightbulb, HeartHandshake, Bot } from "lucide-react";

const skillCategories = [
  {
    category: "Frontend",
    color: "from-cyan-500/10 to-blue-600/10",
    accent: "#00F5FF",
    skills: [
      { name: "HTML5", icon: SiHtml5, color: "#E34F26", level: 95 },
      { name: "CSS3", icon: SiCss3, color: "#1572B6", level: 92 },
      { name: "SASS", icon: SiSass, color: "#CC6699", level: 60 },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", level: 60 },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6", level: 50 },
      { name: "React", icon: SiReact, color: "#61DAFB", level: 92 },
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff", level: 55 },
      { name: "Angular", icon: SiAngular, color: "#DD0031", level: 75 },
      { name: "Material UI", icon: SiMui, color: "#007FFF", level: 70 },
      { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3", level: 85 },
    ],
  },
  {
    category: "Backend",
    color: "from-green-500/10 to-emerald-600/10",
    accent: "#39FF14",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933", level: 85 },
      { name: "Express.js", icon: SiExpress, color: "#ffffff", level: 82 },
      { name: "PHP", icon: SiPhp, color: "#777BB4", level: 70 },
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff", level: 45 },
    ],
  },
  {
    category: "Database",
    color: "from-orange-500/10 to-amber-600/10",
    accent: "#FF6B35",
    skills: [
      { name: "MySQL", icon: SiMysql, color: "#4479A1", level: 88 },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248", level: 72 },
    ],
  },
  {
    category: "Tools",
    color: "from-purple-500/10 to-pink-600/10",
    accent: "#BF5AF2",
    skills: [
      { name: "Git", icon: SiGit, color: "#F05032", level: 90 },
      { name: "Figma", icon: SiFigma, color: "#F24E1E", level: 82 },
      { name: "WordPress", icon: SiWordpress, color: "#21759B", level: 78 },
      { name: "Electron", icon: SiElectron, color: "#47848F", level: 72 },
    ],
  },
  {
    category: "AI Tools",
    color: "from-pink-500/10 to-rose-600/10",
    accent: "#FF2D78",
    skills: [
      { name: "ChatGPT", icon: SiOpenai, color: "#74AA9C", level: 90 },
      { name: "Claude AI", icon: SiX, color: "#D97757", level: 88 },
      { name: "Google Gemini", icon: SiGoogle, color: "#4285F4", level: 85 },
      { name: "Grok", icon: SiX, color: "#ffffff", level: 80 },
      { name: "GitHub Copilot", icon: SiGithub, color: "#ffffff", level: 85 },
    ],
  },
];

const softSkills = [
  { name: "Leadership", icon: Users, desc: "Leading teams and driving projects to completion." },
  { name: "Team Collaboration", icon: HeartHandshake, desc: "Working effectively in cross-functional teams." },
  { name: "Problem Solving", icon: Lightbulb, desc: "Creative thinking to tackle complex technical challenges." },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const skillItem = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "backOut" } },
};

function SkillCard({
  name,
  icon: Icon,
  color,
  level,
}: {
  name: string;
  icon: any;
  color: string;
  level: number;
}) {
  return (
    <motion.div
      variants={skillItem}
      whileHover={{ y: -4, scale: 1.03 }}
      className="group glass rounded-xl border border-border/50 hover:border-primary/30 p-4 transition-all cursor-default"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center group-hover:scale-110 transition-transform">
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <span className="font-medium text-sm">{name}</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
      <p className="text-right text-xs text-muted-foreground mt-1">{level}%</p>
    </motion.div>
  );
}

export default function SkillsContent() {
  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="section-container">
          <SectionHeader
            eyebrow="Capabilities"
            title="Skills & Technologies"
            subtitle="A comprehensive overview of my technical expertise and the tools I use to build modern web applications."
          />

          <div className="mt-16 space-y-12">
            {skillCategories.map((cat) => (
              <div key={cat.category}>
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-2 h-8 rounded-full"
                    style={{ backgroundColor: cat.accent }}
                  />
                  <h3 className="font-display font-bold text-2xl">{cat.category}</h3>
                </div>
                <motion.div
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-50px" }}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                >
                  {cat.skills.map((skill) => (
                    <SkillCard key={skill.name + cat.category} {...skill} />
                  ))}
                </motion.div>
              </div>
            ))}
          </div>

          {/* Soft Skills */}
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-8 rounded-full bg-gradient-to-b from-cyan-400 to-purple-500" />
              <h3 className="font-display font-bold text-2xl">Soft Skills</h3>
            </div>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {softSkills.map(({ name, icon: Icon, desc }) => (
                <motion.div
                  key={name}
                  variants={skillItem}
                  className="glass rounded-2xl border border-border/50 hover:border-primary/30 p-6 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-display font-semibold text-lg mb-2">{name}</h4>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}