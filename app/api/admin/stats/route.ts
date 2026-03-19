import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromCookies } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const auth = getAuthFromCookies();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [
    totalProjects,
    totalBlogPosts,
    totalMessages,
    unreadMessages,
    totalVisitors,
    unreadNotifications,
    recentMessages,
    visitorsByDay,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.blogPost.count({ where: { published: true } }),
    prisma.message.count(),
    prisma.message.count({ where: { isRead: false } }),
    prisma.visitor.count(),
    prisma.notification.count({ where: { isRead: false } }),
    prisma.message.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, name: true, email: true, message: true, isRead: true, createdAt: true },
    }),
    // Visitors per day for last 7 days
    prisma.$queryRaw`
      SELECT DATE(visited_at) as date, COUNT(*) as count
      FROM visitors
      WHERE visited_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
      GROUP BY DATE(visited_at)
      ORDER BY date ASC
    `,
  ]);

  return NextResponse.json({
    totalProjects,
    totalBlogPosts,
    totalMessages,
    unreadMessages,
    totalVisitors,
    unreadNotifications,
    recentMessages,
    visitorsByDay,
  });
}
