"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Loader2 } from "lucide-react";

interface Project {
  id?: number;
  title: string;
  description: string;
  image?: string | null;
  githubLink?: string | null;
  liveLink?: string | null;
  techStack: string;
  featured: boolean;
  order: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: Project) => void;
  project: Project | null;
}

const empty: Project = {
  title: "", description: "", image: "", githubLink: "",
  liveLink: "", techStack: "", featured: false, order: 0,
};

export default function ProjectFormModal({ open, onClose, onSave, project }: Props) {
  const [form, setForm] = useState<Project>(empty);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setForm(project ? { ...project } : empty);
  }, [project, open]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "portfolio/projects");
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const { url } = await res.json();
      setForm((f) => ({ ...f, image: url }));
    } catch {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl glass rounded-2xl border border-border/50 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border/50 bg-card/80 backdrop-blur-sm">
              <h2 className="font-display font-bold text-lg">
                {project ? "Edit Project" : "Add New Project"}
              </h2>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-2">Title *</label>
                  <input type="text" value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Project title"
                    className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary/50 focus:outline-none text-sm" />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-2">Description *</label>
                  <textarea value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Project description"
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary/50 focus:outline-none text-sm resize-none" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">GitHub Link</label>
                  <input type="url" value={form.githubLink || ""}
                    onChange={(e) => setForm({ ...form, githubLink: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary/50 focus:outline-none text-sm" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Live Link</label>
                  <input type="url" value={form.liveLink || ""}
                    onChange={(e) => setForm({ ...form, liveLink: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary/50 focus:outline-none text-sm" />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-2">Tech Stack (comma-separated) *</label>
                  <input type="text" value={form.techStack}
                    onChange={(e) => setForm({ ...form, techStack: e.target.value })}
                    placeholder="React, Node.js, MySQL, TypeScript"
                    className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary/50 focus:outline-none text-sm" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Order</label>
                  <input type="number" value={form.order}
                    onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary/50 focus:outline-none text-sm" />
                </div>

                <div className="flex items-center gap-3 pt-6">
                  <input type="checkbox" id="featured" checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="w-4 h-4 accent-primary" />
                  <label htmlFor="featured" className="text-sm font-medium">Featured project</label>
                </div>

                {/* Image upload */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-2">Project Image</label>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-border/50 hover:border-primary/40 cursor-pointer text-sm transition-all">
                      {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                      {uploading ? "Uploading..." : "Upload Image"}
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                    </label>
                    {form.image && (
                      <span className="text-xs text-primary truncate max-w-[200px]">✓ Image uploaded</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 flex justify-end gap-3 p-6 border-t border-border/50 bg-card/80 backdrop-blur-sm">
              <button onClick={onClose}
                className="px-5 py-2.5 rounded-xl glass border border-border/50 hover:border-primary/40 text-sm font-medium transition-all">
                Cancel
              </button>
              <button
                onClick={() => onSave(form)}
                disabled={!form.title || !form.description || !form.techStack}
                className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50">
                {project ? "Update Project" : "Create Project"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
