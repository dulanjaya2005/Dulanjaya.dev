"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, UserCircle, Shield } from "lucide-react";
import { format } from "date-fns";
import toast from "react-hot-toast";

interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "admin" });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setUsers(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      const user = await res.json();
      setUsers((prev) => [...prev, user]);
      setForm({ name: "", email: "", password: "", role: "admin" });
      toast.success("Admin user created");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this user?")) return;
    await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    setUsers((prev) => prev.filter((u) => u.id !== id));
    toast.success("User deleted");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-2xl mb-1">User Management</h1>
        <p className="text-sm text-muted-foreground">Manage admin panel access</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create user form */}
        <div className="lg:col-span-1">
          <div className="glass rounded-2xl border border-border/50 p-6">
            <h2 className="font-semibold mb-5 flex items-center gap-2">
              <Plus className="w-4 h-4 text-primary" /> Create Admin User
            </h2>
            <form onSubmit={handleCreate} className="space-y-4">
              {[
                { field: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
                { field: "email", label: "Email", type: "email", placeholder: "admin@example.com" },
                { field: "password", label: "Password", type: "password", placeholder: "Min. 8 characters" },
              ].map(({ field, label, type, placeholder }) => (
                <div key={field}>
                  <label className="block text-sm font-medium mb-1.5">{label}</label>
                  <input type={type} value={(form as any)[field]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    placeholder={placeholder} required minLength={field === "password" ? 8 : 1}
                    className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary/50 focus:outline-none text-sm" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium mb-1.5">Role</label>
                <select value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary/50 focus:outline-none text-sm">
                  <option value="admin">Admin</option>
                  <option value="superadmin">Super Admin</option>
                </select>
              </div>
              <button type="submit" disabled={creating}
                className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors">
                {creating ? "Creating..." : "Create User"}
              </button>
            </form>
          </div>
        </div>

        {/* Users list */}
        <div className="lg:col-span-2">
          <div className="glass rounded-2xl border border-border/50 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left p-4 font-medium text-muted-foreground">User</th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden sm:table-cell">Role</th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">Joined</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <tr key={i} className="border-b border-border/30">
                      <td className="p-4"><div className="h-8 bg-muted rounded animate-pulse" /></td>
                      <td className="p-4 hidden sm:table-cell"><div className="h-4 bg-muted rounded w-16 animate-pulse" /></td>
                      <td className="p-4 hidden md:table-cell"><div className="h-4 bg-muted rounded w-24 animate-pulse" /></td>
                      <td className="p-4"><div className="h-4 bg-muted rounded w-8 ml-auto animate-pulse" /></td>
                    </tr>
                  ))
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-12 text-center text-muted-foreground">
                      No users found. Create the first admin above.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="border-b border-border/30 last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 hidden sm:table-cell">
                        <span className={`text-xs px-2.5 py-0.5 rounded-full border flex items-center gap-1 w-fit ${
                          user.role === "superadmin"
                            ? "text-purple-400 bg-purple-400/10 border-purple-400/20"
                            : "text-primary bg-primary/10 border-primary/20"
                        }`}>
                          <Shield className="w-3 h-3" /> {user.role}
                        </span>
                      </td>
                      <td className="p-4 hidden md:table-cell text-xs text-muted-foreground">
                        {format(new Date(user.createdAt), "MMM d, yyyy")}
                      </td>
                      <td className="p-4 text-right">
                        <button onClick={() => handleDelete(user.id)}
                          className="p-2 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-400 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
