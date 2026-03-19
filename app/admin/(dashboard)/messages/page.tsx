"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, MailOpen, Trash2, Search, Calendar, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";

interface Message {
  id: number;
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [selected, setSelected] = useState<Message | null>(null);

  useEffect(() => {
    fetch("/api/admin/messages")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setMessages(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const markRead = async (id: number) => {
    await fetch(`/api/admin/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isRead: true }),
    });
    setMessages((prev) => prev.map((m) => m.id === id ? { ...m, isRead: true } : m));
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selected?.id === id) setSelected(null);
    toast.success("Message deleted");
  };

  const filtered = messages.filter((m) => {
    const matchFilter = filter === "all" || !m.isRead;
    const matchSearch = !search ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.message.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl mb-1">Messages</h1>
          <p className="text-sm text-muted-foreground">
            {messages.length} total · <span className="text-primary">{unreadCount} unread</span>
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input type="text" placeholder="Search messages..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl glass border border-border/50 focus:border-primary/50 focus:outline-none bg-transparent text-sm" />
        </div>
        <div className="flex gap-2">
          {(["all", "unread"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${filter === f ? "bg-primary text-primary-foreground" : "glass border border-border/50 text-muted-foreground hover:border-primary/40"}`}>
              {f === "unread" ? `Unread (${unreadCount})` : "All"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Message list */}
        <div className="lg:col-span-2 space-y-2">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="glass rounded-xl border border-border/50 p-4 animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
            ))
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No messages found.
            </div>
          ) : (
            filtered.map((msg) => (
              <motion.div key={msg.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => { setSelected(msg); markRead(msg.id); }}
                className={`glass rounded-xl border cursor-pointer p-4 transition-all hover:-translate-y-0.5 ${
                  selected?.id === msg.id
                    ? "border-primary/50 bg-primary/5"
                    : !msg.isRead
                      ? "border-primary/20 bg-primary/5"
                      : "border-border/50 hover:border-primary/30"
                }`}>
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 ${!msg.isRead ? "text-primary" : "text-muted-foreground"}`}>
                    {msg.isRead ? <MailOpen className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <p className={`text-sm truncate ${!msg.isRead ? "font-semibold" : "font-medium"}`}>
                        {msg.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground flex-shrink-0">
                        {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{msg.email}</p>
                    <p className="text-xs text-muted-foreground truncate mt-1">{msg.message}</p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Message detail */}
        <div className="lg:col-span-3">
          {selected ? (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-2xl border border-border/50 p-6"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="font-display font-bold text-xl mb-1">{selected.name}</h2>
                  <p className="text-sm text-primary">{selected.email}</p>
                  {selected.subject && (
                    <p className="text-sm text-muted-foreground mt-1">Re: {selected.subject}</p>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(selected.id)}
                  className="p-2.5 rounded-xl hover:bg-red-500/10 text-muted-foreground hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6 pb-4 border-b border-border/50">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(selected.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {selected.message}
              </p>

              <div className="mt-6 pt-4 border-t border-border/50">
                <a
                  href={`mailto:${selected.email}?subject=Re: ${selected.subject || "Your message"}`}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors w-fit"
                >
                  <Mail className="w-4 h-4" /> Reply via Email
                </a>
              </div>
            </motion.div>
          ) : (
            <div className="glass rounded-2xl border border-border/50 p-12 text-center text-muted-foreground">
              <Mail className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>Select a message to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
