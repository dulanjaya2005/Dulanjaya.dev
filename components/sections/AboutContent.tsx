"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar, ExternalLink } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Image from "next/image";

const employmentHistory = [
  {
    company: "Software Engineering Intern – 99x, Colombo (6 Months Internship)",
    role: "Software Engineering Intern - [Trained Software Engineer]",
    period: "2024 - Present",
    type: "Internship",
    description:
      "Gained practical experience in software development and problem solving through various projects. Developed strong coding skills and collaborated with team members to deliver high-quality results.",
    accent: "#00F5FF",
    // logo: "/99x.png",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function AboutContent() {
  return (
    <div className="pt-24">
      <section className="section-padding pb-0">
        <div className="section-container">
          <SectionHeader
            eyebrow="About Me"
            title="Crafting digital experiences with passion"
            subtitle="Software engineer with strong experience in frontend development, UI/UX design and full-stack web applications."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="glass rounded-2xl border border-border/50 p-8">
                <h3 className="font-display font-bold text-2xl mb-5">
                  Professional Summary
                </h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    I'm a passionate{" "}
                    <span className="text-foreground font-medium">Software Engineer</span>{" "}
                    based in Sri Lanka, specializing in modern web development. With over 3 years of hands-on experience, I build scalable, performant and visually compelling digital products.
                  </p>
                  <p>
                    My expertise spans the full stack — from crafting pixel-perfect UIs with{" "}
                    <span className="text-primary">React</span> and{" "}
                    <span className="text-primary">Next.js</span>, to architecting robust backend systems with{" "}
                    <span className="text-primary">Node.js</span> and{" "}
                    <span className="text-primary">MySQL</span>.
                  </p>
                  <p>
                    I care deeply about code quality, developer experience and building products that make a real difference to users.
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-border/50 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    Sri Lanka
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Briefcase className="w-4 h-4 text-primary" />
                    Open to opportunities
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 text-primary" />
                    3+ years experience
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <a
                  href="https://github.com/dulanjaya2005"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl glass border border-border/50 hover:border-primary/40 text-sm font-medium transition-all hover:text-primary"
                >
                  GitHub Profile <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://dulanjaya2005.github.io/DulanjayaThathsara/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl glass border border-border/50 hover:border-primary/40 text-sm font-medium transition-all hover:text-primary"
                >
                  Old Portfolio <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: "3+", label: "Years of Experience", color: "text-cyan-400" },
                { value: "6+", label: "Projects Completed", color: "text-purple-400" },
                { value: "3", label: "Companies Worked", color: "text-orange-400" },
                { value: "15+", label: "Technologies Mastered", color: "text-green-400" },
              ].map(({ value, label, color }) => (
                <motion.div
                  key={label}
                  variants={item}
                  className="glass rounded-2xl border border-border/50 p-6 flex flex-col items-center text-center"
                >
                  <span className={`text-5xl font-display font-black mb-2 ${color}`}>
                    {value}
                  </span>
                  <span className="text-sm text-muted-foreground">{label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Employment History */}
      <section className="section-padding">
        <div className="section-container">
          <SectionHeader
            eyebrow="Experience"
            title="Employment History"
          />

          <div className="mt-12 relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/30 to-transparent hidden md:block" />

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-8"
            >
              {employmentHistory.map((job) => (
                <motion.div
                  key={job.company}
                  variants={item}
                  className="relative md:pl-16"
                >
                  <div
                    className="absolute left-4 top-6 w-4 h-4 rounded-full border-2 border-background hidden md:flex items-center justify-center"
                    style={{ backgroundColor: job.accent }}
                  />

                  <div className="glass rounded-2xl border border-border/50 hover:border-primary/30 transition-all p-6 md:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-4">
                        {/* 99x Logo */}
                        <div className="w-14 h-14 rounded-xl bg-black border border-border/50 flex items-center justify-center p-2 flex-shrink-0 overflow-hidden">
                          <Image
                            src={job.logo}
                            alt={job.company}
                            width={48}
                            height={48}
                            className="object-contain w-full h-full"
                          />
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-xl mb-1">
                            {job.company}
                          </h3>
                          <p className="text-primary font-medium">{job.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground border border-border">
                          {job.type}
                        </span>
                        <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Calendar className="w-3.5 h-3.5" />
                          {job.period}
                        </span>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {job.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}