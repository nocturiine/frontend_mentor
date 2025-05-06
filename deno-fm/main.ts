import { serveDir } from "@std/http/file-server";

const ROUTE_ROOT_NAME = "routes";

const BLOG_PREVIEW_CARD_PATH = "/blog-preview-card";
const QR_CODE_COMPONENT_PATH = "/qr-code-component";

function handler(req: Request) {
  const url = new URL(req.url);
  const pathname = decodeURIComponent(url.pathname);

  if (!pathname.includes(ROUTE_ROOT_NAME)) {
    if (
      pathname.startsWith(BLOG_PREVIEW_CARD_PATH) ||
      pathname.startsWith(QR_CODE_COMPONENT_PATH)
    ) {
      if (req.method === "GET") {
        return serveDir(req, {
          fsRoot: ROUTE_ROOT_NAME,
        });
      }
    }

    return serveDir(req, {
      showDirListing: true,
    });
  }
  return new Response("404 Not Found", { status: 404 });
}

Deno.serve({ hostname: "localhost", port: 8000 }, handler);
