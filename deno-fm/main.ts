import { serveDir } from "@std/http/file-server";

const ROUTES_FS_ROOT = "routes";
const STATIC_ROUTE = new URLPattern({ pathname: "/static/*" });

const fileRoutes = [
  new URLPattern({
    pathname: "/blog-preview-card*",
  }),
  new URLPattern({
    pathname: "/qr-code-component*",
  }),
  new URLPattern({ pathname: "/recipe-page*" }),
  new URLPattern({
    pathname: "/social-links-profile*",
  }),
];

function handler(req: Request) {
  for (const route of fileRoutes) {
    if (route.exec(req.url) && req.method === "GET") {
      return serveDir(req, { fsRoot: ROUTES_FS_ROOT });
    }
  }

  if (STATIC_ROUTE.exec(req.url) && req.method === "GET") {
    return serveDir(req);
  }

  return new Response("404 Not Found", { status: 404 });
}

Deno.serve({ hostname: "localhost", port: 8080 }, handler);
