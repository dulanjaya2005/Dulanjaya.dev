import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, Code2, Heart } from "lucide-react";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://github.com/dulanjaya2005", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
  { href: "mailto:dulanjayathathsara9@gmail.com", icon: Mail, label: "Email" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border/50 mt-20">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-primary" />
              </div>
              <span className="font-display font-bold text-lg gradient-text">
                Dulanjaya Thathsara
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Software Engineer crafting modern web experiences with passion and precision.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display font-semibold mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold mb-4 text-foreground">Connect</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Available for freelance &amp; full-time roles.
            </p>
          </div>
        </div>

        <div className="border-t border-border/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            © {new Date().getFullYear()} Dulanjaya Thathsara. Built with
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            v1.0.0 · Next.js 14 · TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}
