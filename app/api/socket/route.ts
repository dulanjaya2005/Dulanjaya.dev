import { NextRequest, NextResponse } from "next/server";

/**
 * Socket.io with Next.js App Router requires a custom server.
 *
 * For development/production, create a custom server.ts at root:
 *
 * import { createServer } from "http";
 * import { parse } from "url";
 * import next from "next";
 * import { initSocketIO } from "./lib/socket";
 *
 * const dev = process.env.NODE_ENV !== "production";
 * const app = next({ dev });
 * const handle = app.getRequestHandler();
 *
 * app.prepare().then(() => {
 *   const httpServer = createServer((req, res) => {
 *     const parsedUrl = parse(req.url!, true);
 *     handle(req, res, parsedUrl);
 *   });
 *   initSocketIO(httpServer);
 *   httpServer.listen(3000);
 * });
 *
 * Then update package.json "dev" script to: "ts-node server.ts"
 *
 * This route file simply confirms socket is reachable via /api/socket path.
 */
export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "Socket.io runs via custom server" });
}
