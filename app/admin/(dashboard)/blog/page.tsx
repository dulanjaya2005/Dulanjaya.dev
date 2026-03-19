"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Eye, EyeOff, Clock, Search } from "lucide-react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import BlogFormModal from "@/components/admin/BlogFormModal";

interface Post {
  id: number;
  title: string;
  slug: string;
  category?: string | null;
  published: boolean;
  views: number;
  readingTime?: number | null;
  createdAt: string;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/admin/blog");
      const data = await res.json();
      if (Array.isArray(data)) setPosts(data);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    setPosts((p) => p.filter((post) => post.id !== id));
    toast.success("Post deleted");
  };

  const handleSave = async (data: any) => {
    try {
      if (editing?.id) {
        const res = await fetch(`/api/admin/blog/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const updated = await res.json();
        setPosts((p) => p.map((post) => post.id === editing.id ? { ...post, ...updated } : post));
        toast.success("Post updated");
      } else {
        const res = await fetch("/api/admin/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error);
        }
        const created = await res.json();
        setPosts((p) => [created, ...p]);
        toast.success("Post created");
      }
      setModalOpen(false);
      setEditing(null);
    } catch (err: any) {
      toast.error(err.message || "Failed to save post");
    }
  };

  const filtered = posts.filter(
    (p) => !search || p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl mb-1">Blog Posts</h1>
          <p className="text-sm text-muted-foreground">{posts.length} total · {posts.filter((p) => p.published).length} published</p>
        </div>
        <button
          onClick={() => { setEditing(null); setModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input type="text" placeholder="Search posts..." value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl glass border border-border/50 focus:border-primary/50 focus:outline-none bg-transparent text-sm" />
      </div>

      <div className="glass rounded-2xl border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left p-4 font-medium text-muted-foreground">Title</th>
                <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">Category</th>
                <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">Date</th>
                <th className="text-center p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-center p-4 font-medium text-muted-foreground hidden sm:table-cell">Views</th>
                <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} className="border-b border-border/30">
                    {Array.from({ length: 6 }).map((_, j) => (
                      <td key={j} className="p-4"><div className="h-4 bg-muted rounded animate-pulse" /></td>
                    ))}
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="p-12 text-center text-muted-foreground">No posts found.</td></tr>
              ) : (
                filtered.map((post) => (
                  <tr key={post.id} className="border-b border-border/30 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <p className="font-medium truncate max-w-[220px]">{post.title}</p>
                      <p className="text-xs text-muted-foreground font-mono">/{post.slug}</p>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      {post.category ? (
                        <span className="skill-tag text-xs">{post.category}</span>
                      ) : <span className="text-muted-foreground">—</span>}
                    </td>
                    <td className="p-4 hidden lg:table-cell text-muted-foreground text-xs">
                      {format(new Date(post.createdAt), "MMM d, yyyy")}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`text-xs px-2.5 py-0.5 rounded-full border ${
                        post.published
                          ? "text-green-400 bg-green-400/10 border-green-400/20"
                          : "text-muted-foreground bg-muted border-border"
                      }`}>
                        {post.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="p-4 text-center hidden sm:table-cell text-muted-foreground text-sm">
                      {post.views}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => { setEditing(post); setModalOpen(true); }}
                          className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="p-2 rounded-lg hover:bg-red-500/10 transition-colors text-muted-foreground hover:text-red-400">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <BlogFormModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null); }}
        onSave={handleSave}
        post={editing}
      />
    </div>
  );
}
