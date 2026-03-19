"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, ExternalLink, Github, Star, Search } from "lucide-react";
import toast from "react-hot-toast";
import ProjectFormModal from "@/components/admin/ProjectFormModal";

interface Project {
  id: number;
  title: string;
  description: string;
  image?: string | null;
  githubLink?: string | null;
  liveLink?: string | null;
  techStack: string;
  featured: boolean;
  order: number;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/admin/projects");
      const data = await res.json();
      if (Array.isArray(data)) setProjects(data);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this project?")) return;
    try {
      await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      setProjects((prev) => prev.filter((p) => p.id !== id));
      toast.success("Project deleted");
    } catch {
      toast.error("Failed to delete project");
    }
  };

  const handleSave = async (data: any) => {
    try {
      if (editing) {
        const res = await fetch(`/api/admin/projects/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const updated = await res.json();
        setProjects((prev) => prev.map((p) => (p.id === editing.id ? updated : p)));
        toast.success("Project updated");
      } else {
        const res = await fetch("/api/admin/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const created = await res.json();
        setProjects((prev) => [created, ...prev]);
        toast.success("Project created");
      }
      setModalOpen(false);
      setEditing(null);
    } catch {
      toast.error("Failed to save project");
    }
  };

  const filtered = projects.filter(
    (p) =>
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.techStack.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl mb-1">Projects</h1>
          <p className="text-sm text-muted-foreground">{projects.length} total projects</p>
        </div>
        <button
          onClick={() => { setEditing(null); setModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl glass border border-border/50 focus:border-primary/50 focus:outline-none bg-transparent text-sm"
        />
      </div>

      {/* Table */}
      <div className="glass rounded-2xl border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left p-4 font-medium text-muted-foreground">Project</th>
                <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">Tech Stack</th>
                <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">Links</th>
                <th className="text-center p-4 font-medium text-muted-foreground">Featured</th>
                <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} className="border-b border-border/30">
                    <td className="p-4"><div className="h-4 bg-muted rounded w-40 animate-pulse" /></td>
                    <td className="p-4 hidden md:table-cell"><div className="h-4 bg-muted rounded w-32 animate-pulse" /></td>
                    <td className="p-4 hidden lg:table-cell"><div className="h-4 bg-muted rounded w-20 animate-pulse" /></td>
                    <td className="p-4"><div className="h-4 bg-muted rounded w-8 mx-auto animate-pulse" /></td>
                    <td className="p-4"><div className="h-4 bg-muted rounded w-16 ml-auto animate-pulse" /></td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-muted-foreground">
                    No projects found.
                  </td>
                </tr>
              ) : (
                filtered.map((project) => (
                  <tr key={project.id} className="border-b border-border/30 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <p className="font-medium truncate max-w-[200px]">{project.title}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[200px]">{project.description}</p>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {project.techStack.split(",").slice(0, 3).map((t) => (
                          <span key={t} className="skill-tag text-[10px]">{t.trim()}</span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <div className="flex items-center gap-2">
                        {project.githubLink && (
                          <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors">
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {project.liveLink && project.liveLink !== "#" && (
                          <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      {project.featured ? (
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mx-auto" />
                      ) : (
                        <Star className="w-4 h-4 text-muted-foreground mx-auto" />
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => { setEditing(project); setModalOpen(true); }}
                          className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="p-2 rounded-lg hover:bg-red-500/10 transition-colors text-muted-foreground hover:text-red-400"
                        >
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

      <ProjectFormModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null); }}
        onSave={handleSave}
        project={editing}
      />
    </div>
  );
}
