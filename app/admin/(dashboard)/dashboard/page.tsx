"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FolderKanban, FileText, MessageSquare, Eye,
  TrendingUp, ArrowUpRight, Users, Clock,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar,
} from "recharts";
import { formatDistanceToNow, format } from "date-fns";

interface Stats {
  totalProjects: number;
  totalBlogPosts: number;
  totalMessages: number;
  unreadMessages: number;
  totalVisitors: number;
  recentMessages: any[];
  visitorsByDay: any[];
}

const demoStats: Stats = {
  totalProjects: 12,
  totalBlogPosts: 8,
  totalMessages: 24,
  unreadMessages: 5,
  totalVisitors: 1840,
  recentMessages: [
    { id: 1, name: "John Doe", email: "john@example.com", message: "Hi, I have a project for you...", isRead: false, createdAt: new Date() },
    { id: 2, name: "Jane Smith", email: "jane@example.com", message: "Would love to collaborate...", isRead: true, createdAt: new Date(Date.now() - 3600000) },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", message: "Your portfolio is amazing!", isRead: false, createdAt: new Date(Date.now() - 7200000) },
  ],
  visitorsByDay: [
    { date: "2024-01-10", count: 42 },
    { date: "2024-01-11", count: 65 },
    { date: "2024-01-12", count: 55 },
    { date: "2024-01-13", count: 80 },
    { date: "2024-01-14", count: 95 },
    { date: "2024-01-15", count: 72 },
    { date: "2024-01-16", count: 110 },
  ],
};

const statCards = (s: Stats) => [
  { label: "Total Projects", value: s.totalProjects, icon: FolderKanban, color: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/20", change: "+2 this month" },
  { label: "Blog Posts", value: s.totalBlogPosts, icon: FileText, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20", change: "+1 this week" },
  { label: "Messages", value: s.totalMessages, icon: MessageSquare, color: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/20", change: `${s.unreadMessages} unread` },
  { label: "Total Visitors", value: s.totalVisitors, icon: Eye, color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/20", change: "+12% this week" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>(demoStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((data) => {
        if (data && data.totalProjects !== undefined) setStats(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const chartData = stats.visitorsByDay.map((d: any) => ({
    date: format(new Date(d.date), "MMM d"),
    visitors: Number(d.count),
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-2xl mb-1">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stat cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5"
      >
        {statCards(stats).map(({ label, value, icon: Icon, color, bg, border, change }) => (
          <motion.div
            key={label}
            variants={item}
            className="glass rounded-2xl border border-border/50 p-5 hover:border-primary/30 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl ${bg} border ${border} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className={`text-3xl font-display font-black mb-1 ${color}`}>
              {loading ? "—" : value.toLocaleString()}
            </p>
            <p className="text-sm font-medium mb-1">{label}</p>
            <p className="text-xs text-muted-foreground">{change}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Visitor chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="xl:col-span-2 glass rounded-2xl border border-border/50 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display font-semibold text-base">Visitor Analytics</h2>
              <p className="text-xs text-muted-foreground">Last 7 days</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-green-400">
              <TrendingUp className="w-4 h-4" />
              +12.5%
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="visitorGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00F5FF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00F5FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Area type="monotone" dataKey="visitors" stroke="#00F5FF" strokeWidth={2} fill="url(#visitorGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl border border-border/50 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-semibold text-base">Recent Messages</h2>
            <a href="/admin/messages" className="text-xs text-primary hover:underline">View all</a>
          </div>
          <div className="space-y-4">
            {stats.recentMessages.map((msg: any) => (
              <div key={msg.id} className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${!msg.isRead ? "bg-primary/5 border border-primary/10" : "hover:bg-muted/50"}`}>
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 text-xs font-bold">
                  {msg.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold truncate">{msg.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{msg.message}</p>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                    <Clock className="w-2.5 h-2.5" />
                    {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })}
                  </p>
                </div>
                {!msg.isRead && <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1" />}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
