import { serveDir } from "@std/http/file-server";

function handler(req: Request) {
  const url = new URL(req.url);
  const pathname = decodeURIComponent(url.pathname);

  if (pathname.startsWith("/")) {
    if (req.method === "GET") {
      return serveDir(req, { fsRoot: "src", urlRoot: "" });
    }
  }

  return new Response("404 Not Found", { status: 404 });
}

Deno.serve({ hostname: "localhost", port: 8000 }, handler);
