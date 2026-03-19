import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { emitNewMessage } from "@/lib/socket";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newMessage = await prisma.message.create({
      data: { name, email, subject, message },
    });

    // Create notification
    await prisma.notification.create({
      data: {
        type: "message",
        title: "New Contact Message",
        message: `${name} (${email}) sent a message`,
      },
    });

    // Emit real-time event
    emitNewMessage(newMessage);

    return NextResponse.json({ success: true, id: newMessage.id });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  return NextResponse.json({ status: "Contact API is running" });
}
