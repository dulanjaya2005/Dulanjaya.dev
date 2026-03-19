import { Server as SocketIOServer } from "socket.io";
import { Server as NetServer } from "http";

let io: SocketIOServer | null = null;

export function getSocketIO(): SocketIOServer | null {
  return io;
}

export function initSocketIO(server: NetServer): SocketIOServer {
  if (io) return io;

  io = new SocketIOServer(server, {
    path: "/api/socket",
    addTrailingSlash: false,
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("join-admin", () => {
      socket.join("admin-room");
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  return io;
}

export function emitNewMessage(messageData: {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}) {
  if (!io) return;
  io.to("admin-room").emit("new-message", messageData);
  io.to("admin-room").emit("notification", {
    type: "message",
    title: "New Contact Message",
    body: `${messageData.name} sent you a message`,
    data: messageData,
  });
}
