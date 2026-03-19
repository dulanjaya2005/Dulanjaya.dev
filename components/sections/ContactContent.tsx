"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Github, Linkedin, Phone, CheckCircle, AlertCircle } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import toast from "react-hot-toast";

const contactInfo = [
  { icon: Mail, label: "Email", value: "dulanjayathathsara9@gmail.com", href: "mailto:dulanjayathathsara9@gmail.com" },
  { icon: MapPin, label: "Location", value: "Sri Lanka", href: null },
  { icon: Phone, label: "Phone", value: "+94-760792011", href: "tel:+94760792011" },
  { icon: Github, label: "GitHub", value: "github.com/dulanjaya2005", href: "https://github.com/dulanjaya2005" },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/dulanjaya", href: "https://linkedin.com" },
];

export default function ContactContent() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setSent(true);
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="section-container">
          <SectionHeader
            eyebrow="Get In Touch"
            title="Let's Work Together"
            subtitle="Have a project in mind or just want to say hello? I'd love to hear from you."
          />

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Left info panel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="glass rounded-2xl border border-border/50 p-6">
                <h3 className="font-display font-bold text-xl mb-2">Let's connect</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  I'm always open to discussing new projects, creative ideas or opportunities to be part of something amazing.
                </p>

                <div className="space-y-4">
                  {contactInfo.map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{label}</p>
                        {href ? (
                          <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-primary transition-colors">
                            {value}
                          </a>
                        ) : (
                          <p className="text-sm font-medium">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability card */}
              <div className="glass rounded-2xl border border-green-500/20 bg-green-500/5 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm font-semibold text-green-400">Available for work</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Currently open to freelance projects and full-time positions. Response time: usually within 24 hours.
                </p>
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              {sent ? (
                <div className="glass rounded-2xl border border-green-500/30 p-12 text-center">
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="font-display font-bold text-2xl mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-6">
                    Thanks for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="glass rounded-2xl border border-border/50 p-8 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Dulanjaya Thathsara"
                        className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary/50 focus:outline-none text-sm transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary/50 focus:outline-none text-sm transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="Project inquiry, collaboration..."
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary/50 focus:outline-none text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell me about your project or idea..."
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary/50 focus:outline-none text-sm transition-colors resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(0,245,255,0.3)]"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
