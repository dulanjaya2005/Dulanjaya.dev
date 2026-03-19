"use client";

import { useEffect, useState } from "react";
import { Github, Star, GitFork, ExternalLink, RefreshCw } from "lucide-react";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  updated_at: string;
  topics: string[];
}

const langColors: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Python: "#3776AB",
  PHP: "#777BB4",
  HTML: "#E34F26",
  CSS: "#1572B6",
  Java: "#ED8B00",
  "C#": "#239120",
};

export default function GitHubProjects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRepos = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/github/repos");
      if (!res.ok) throw new Error("Failed to fetch repositories");
      const data = await res.json();
      setRepos(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRepos(); }, []);

  if (loading) {
    return (
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="glass rounded-2xl border border-border/50 p-6 animate-pulse">
            <div className="h-5 bg-muted rounded w-3/4 mb-3" />
            <div className="h-3 bg-muted rounded w-full mb-2" />
            <div className="h-3 bg-muted rounded w-2/3 mb-5" />
            <div className="flex gap-3">
              <div className="h-3 bg-muted rounded w-16" />
              <div className="h-3 bg-muted rounded w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-10 text-center py-16">
        <p className="text-muted-foreground mb-4">{error}</p>
        <button
          onClick={fetchRepos}
          className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-border/50 hover:border-primary/40 mx-auto text-sm"
        >
          <RefreshCw className="w-4 h-4" /> Retry
        </button>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          {repos.length} repositories from{" "}
          <a href="https://github.com/dulanjaya2005" target="_blank" rel="noopener noreferrer"
            className="text-primary hover:underline">
            @dulanjaya2005
          </a>
        </p>
        <button onClick={fetchRepos}
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo) => (
          <div key={repo.id}
            className="group glass rounded-2xl border border-border/50 hover:border-primary/30 p-6 transition-all card-hover">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 text-muted-foreground" />
                <h3 className="font-medium text-sm group-hover:text-primary transition-colors truncate max-w-[160px]">
                  {repo.name}
                </h3>
              </div>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors">
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2 min-h-[2.5rem]">
              {repo.description || "No description available."}
            </p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              {repo.language && (
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: langColors[repo.language] || "#888" }} />
                  {repo.language}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5" />
                {repo.stargazers_count}
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="w-3.5 h-3.5" />
                {repo.forks_count}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
