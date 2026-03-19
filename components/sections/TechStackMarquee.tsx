"use client";

import React from "react";
import { 
  SiHtml5, SiCss3, SiJavascript, SiTypescript, SiReact,
  SiNextdotjs, SiNodedotjs, SiExpress, SiMysql, SiPhp,
  SiAngular, SiBootstrap, SiWordpress, SiElectron,
  SiOpenai, SiGoogle, SiGithub, SiFigma,
} from "react-icons/si";

type TechItemType = {
  icon: React.ElementType;
  name: string;
  color: string;
};

const techStack: TechItemType[] = [
  { icon: SiHtml5, name: "HTML5", color: "#E34F26" },
  { icon: SiCss3, name: "CSS3", color: "#1572B6" },
  { icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
  { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
  { icon: SiReact, name: "React", color: "#61DAFB" },
  { icon: SiNextdotjs, name: "Next.js", color: "#ffffff" },
  { icon: SiNodedotjs, name: "Node.js", color: "#339933" },
  { icon: SiExpress, name: "Express", color: "#ffffff" },
  { icon: SiMysql, name: "MySQL", color: "#4479A1" },
  { icon: SiPhp, name: "PHP", color: "#777BB4" },
  { icon: SiAngular, name: "Angular", color: "#DD0031" },
  { icon: SiBootstrap, name: "Bootstrap", color: "#7952B3" },
  { icon: SiWordpress, name: "WordPress", color: "#21759B" },
  { icon: SiElectron, name: "Electron", color: "#47848F" },
  { icon: SiFigma, name: "Figma", color: "#F24E1E" },
  { icon: SiOpenai, name: "ChatGPT", color: "#74AA9C" },
  { icon: SiGoogle, name: "Gemini", color: "#4285F4" },
  { icon: SiGithub, name: "Copilot", color: "#6e40c9" },
];

function TechItem({ icon: Icon, name, color }: TechItemType) {
  if (!Icon) return null;
  return (
    <div className="flex items-center gap-3 px-6 py-3 glass rounded-xl border border-border/50 mx-2 min-w-max group hover:border-primary/30 transition-all">
      <Icon className="w-5 h-5 transition-transform group-hover:scale-110" style={{ color }} />
      <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
        {name}
      </span>
    </div>
  );
}

export default function TechStackMarquee() {
  return (
    <section className="py-16 overflow-hidden border-y border-border/50 relative">
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-background to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-background to-transparent" />

      <div className="mb-3">
        <p className="text-center text-xs font-mono text-muted-foreground mb-6 tracking-widest uppercase">
          Technologies &amp; Tools
        </p>
      </div>

      {/* Row 1 */}
      <div className="relative flex overflow-hidden mb-3">
        <div className="animate-marquee flex">
          {techStack.map((tech) => (
            <TechItem key={tech.name + "1"} {...tech} />
          ))}
        </div>
        <div className="animate-marquee2 flex absolute top-0">
          {techStack.map((tech) => (
            <TechItem key={tech.name + "2"} {...tech} />
          ))}
        </div>
      </div>

      {/* Row 2 */}
      <div className="relative flex overflow-hidden">
        <div className="animate-marquee2 flex">
          {[...techStack].reverse().map((tech) => (
            <TechItem key={tech.name + "3"} {...tech} />
          ))}
        </div>
        <div className="animate-marquee flex absolute top-0">
          {[...techStack].reverse().map((tech) => (
            <TechItem key={tech.name + "4"} {...tech} />
          ))}
        </div>
      </div>
    </section>
  );
}