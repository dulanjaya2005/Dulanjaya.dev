import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { page } = await req.json();
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const userAgent = req.headers.get("user-agent") || undefined;

    await prisma.visitor.create({
      data: {
        ipAddress: ip,
        userAgent,
        page,
      },
    });

    return NextResponse.json({ success: true });
  } catch {
    // Silently fail
    return NextResponse.json({ success: false });
  }
}

export async function GET() {
  try {
    const [total, today] = await Promise.all([
      prisma.visitor.count(),
      prisma.visitor.count({
        where: {
          visitedAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
      }),
    ]);
    return NextResponse.json({ total, today });
  } catch {
    return NextResponse.json({ total: 0, today: 0 });
  }
}
