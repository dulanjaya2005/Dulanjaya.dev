"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Loader2 } from "lucide-react";

interface Post {
  id?: number;
  title: string;
  slug?: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  category?: string;
  tags?: string;
  published: boolean;
}

const empty: Post = {
  title: "", content: "", excerpt: "", coverImage: "",
  category: "", tags: "", published: false,
};

export default function BlogFormModal({
  open, onClose, onSave, post,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (data: Post) => void;
  post: Post | null;
}) {
  const [form, setForm] = useState<Post>(empty);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setForm(post ? { ...post } : empty);
  }, [post, open]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "portfolio/blog");
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const { url } = await res.json();
      setForm((f) => ({ ...f, coverImage: url }));
    } catch { alert("Upload failed"); }
    finally { setUploading(false); }
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl glass rounded-2xl border border-border/50 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border/50 bg-card/80 backdrop-blur-sm">
              <h2 className="font-display font-bold text-lg">{post?.id ? "Edit Post" : "New Post"}</h2>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <input type="text" value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Post title"
                  className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary/50 focus:outline-none text-sm" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <input type="text" value={form.category || ""}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="Next.js, React, Node.js..."
                    className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary/50 focus:outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                  <input type="text" value={form.tags || ""}
                    onChange={(e) => setForm({ ...form, tags: e.target.value })}
                    placeholder="react,nextjs,webdev"
                    className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary/50 focus:outline-none text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Excerpt</label>
                <textarea value={form.excerpt || ""}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  placeholder="Short description for the post..."
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary/50 focus:outline-none text-sm resize-none" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Content * (Markdown supported)</label>
                <textarea value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="## Introduction&#10;&#10;Write your post content here..."
                  rows={14}
                  className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary/50 focus:outline-none text-sm font-mono resize-y" />
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.published}
                    onChange={(e) => setForm({ ...form, published: e.target.checked })}
                    className="w-4 h-4 accent-primary" />
                  <span className="text-sm font-medium">Publish immediately</span>
                </label>

                <label className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-border/50 hover:border-primary/40 cursor-pointer text-sm transition-all">
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  {uploading ? "Uploading..." : "Cover Image"}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                </label>
                {form.coverImage && <span className="text-xs text-primary">✓ Uploaded</span>}
              </div>
            </div>

            <div className="sticky bottom-0 flex justify-end gap-3 p-6 border-t border-border/50 bg-card/80 backdrop-blur-sm">
              <button onClick={onClose}
                className="px-5 py-2.5 rounded-xl glass border border-border/50 text-sm font-medium">Cancel</button>
              <button
                onClick={() => onSave(form)}
                disabled={!form.title || !form.content}
                className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50">
                {post?.id ? "Update Post" : "Create Post"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
