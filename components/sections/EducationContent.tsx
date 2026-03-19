"use client";

import { motion } from "framer-motion";
import { BookOpen, Calendar } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Image from "next/image";

const education = [
  {
    institution: "MR / Deiyandara National School",
    degree: "G.C.E. Ordinary Level (O/L)",
    period: "Completed",
    type: "Secondary Education",
    logo: "/school.webp",
    description: "Completed Ordinary Level examinations with strong results in Mathematics, Science and ICT subjects at MR / Deiyandara National School.",
    color: "#00F5FF",
    gradient: "from-cyan-500/20 to-blue-600/20",
  },
  {
    institution: "DP Education Coding School",
    degree: "Cetificate in Information Technology",
    period: "2024 – Present",
    type: "Cetificate",
    logo: "/dp-education.png",
    description: "Successfully completed all 324 projects at DP Education Coding School, earning qualification as both an app and web developer. Demonstrated strong computer science proficiency through Code.org (USA).",
    color: "#BF5AF2",
    gradient: "from-purple-500/20 to-pink-600/20",
    courses: ["UI, UX Design", "Database Connectivity", "App Development", "Block Coding", "Loops and conditions used in coding", "Robotics", "Machine Learning", "AI", "Face Detection", "Object Moving", "Sound Detection", "Augmented Reality", "Virtual Reality", "HTML", "CSS", "JAVA SCRIPT", "Web Development", "How is a database connected to a website"],
  },
  {
    institution: "IMS Campus",
    degree: "Diploma in Information Technology",
    period: "2025",
    type: "Diploma",
    logo: "/ims-campus.png",
    description: "Completed Diploma in Information Technology at IMS Campus, gaining comprehensive knowledge in software development, database management and system integration.",
    color: "#39FF14",
    gradient: "from-green-500/20 to-emerald-600/20",
  },
  {
    institution: "Center for Open and Distance Learning (CODL)",
    degree: "Web Programming Training",
    period: "2024 – Present",
    type: "Certificate",
    institution2: "University of Moratuwa, Sri Lanka",
    logo: "/moratuwa.png",
    description: "Advanced web programming training provided by the University of Moratuwa through CODL. Covering server-side web programming, front-end web development, web design and Python programming.",
    color: "#FF6B35",
    gradient: "from-orange-500/20 to-red-600/20",
    courses: ["Server-side web programming", "Front-end web development", "Web design", "Python programming"],
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function EducationContent() {
  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="section-container">
          <SectionHeader
            eyebrow="Academic Background"
            title="Education & Training"
            subtitle="A foundation built through formal education and continuous learning in technology and software development."
          />

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-16 grid gap-8"
          >
            {education.map((edu, i) => (
              <motion.div key={edu.institution} variants={item} className="group relative">
                <div className="glass rounded-2xl border border-border/50 hover:border-primary/30 overflow-hidden transition-all">
                  <div className={`h-1.5 w-full bg-gradient-to-r ${edu.gradient.replace("/20", "/60")}`} />
                  <div className="p-8">
                    <div className="flex flex-col md:flex-row md:items-start gap-6">

                      {/* Institution Logo */}
                      <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 p-2 bg-white/10"
                        style={{ border: `1px solid ${edu.color}30` }}
                      >
                        <Image
                          src={edu.logo}
                          alt={edu.institution}
                          width={64}
                          height={64}
                          className="object-contain w-full h-full"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                          <div>
                            <h3 className="font-display font-bold text-xl mb-0.5">{edu.institution}</h3>
                            {edu.institution2 && (
                              <p className="text-sm text-muted-foreground">{edu.institution2}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <span
                              className="text-xs px-3 py-1 rounded-full border font-medium"
                              style={{ color: edu.color, backgroundColor: edu.color + "15", borderColor: edu.color + "30" }}
                            >
                              {edu.type}
                            </span>
                            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                              <Calendar className="w-3.5 h-3.5" />
                              {edu.period}
                            </span>
                          </div>
                        </div>
                        <h4 className="font-semibold text-primary mb-3">{edu.degree}</h4>
                        <p className="text-muted-foreground leading-relaxed mb-3">{edu.description}</p>
                        {edu.courses && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {edu.courses.map((course) => (
                              <span key={course} className="text-xs px-3 py-1 rounded-full bg-muted border border-border text-muted-foreground">
                                {course}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {i < education.length - 1 && (
                  <div className="flex justify-center my-2">
                    <div className="w-px h-8 bg-gradient-to-b from-primary/40 to-transparent" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 glass rounded-2xl border border-primary/20 p-6 flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Continuous Learning</h4>
              <p className="text-sm text-muted-foreground">
                Beyond formal education, I constantly improve through online courses, developer documentation, open-source contributions, and hands-on project experience.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}