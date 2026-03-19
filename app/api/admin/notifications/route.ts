import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromCookies } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const auth = getAuthFromCookies();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const notifications = await prisma.notification.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
  });
  return NextResponse.json(notifications);
}

export async function PATCH(req: NextRequest) {
  const auth = getAuthFromCookies();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Mark all as read
  await prisma.notification.updateMany({
    where: { isRead: false },
    data: { isRead: true },
  });

  return NextResponse.json({ success: true });
}
