import { NextRequest, NextResponse } from "next/server";

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "dulanjaya2005";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function GET(req: NextRequest) {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "portfolio-app",
    };

    if (GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${GITHUB_TOKEN}`;
    }

    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=20&type=public`,
      { headers, next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`);
    }

    const repos = await res.json();

    // Filter and clean up
    const cleaned = repos
      .filter((r: any) => !r.fork)
      .map((r: any) => ({
        id: r.id,
        name: r.name,
        description: r.description,
        language: r.language,
        stargazers_count: r.stargazers_count,
        forks_count: r.forks_count,
        html_url: r.html_url,
        updated_at: r.updated_at,
        topics: r.topics || [],
      }));

    return NextResponse.json(cleaned);
  } catch (error: any) {
    console.error("GitHub API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
