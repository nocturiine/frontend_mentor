import { serveDir } from "@std/http/file-server";

const IMAGES_FOLDER_PATH = "/images";
const ROUTE_FOLDER_PATH = "/routes";
const QR_CODE_COMPONENT_PATH = "/qr-code-component";

function handler(req: Request) {
  const url = new URL(req.url);
  const pathname = decodeURIComponent(url.pathname);

  if (pathname.startsWith(QR_CODE_COMPONENT_PATH)) {
    if (req.method === "GET") {
      return serveDir(req, {
        fsRoot: Deno.cwd().concat(ROUTE_FOLDER_PATH),
      });
    }
  }

  if (pathname.startsWith(IMAGES_FOLDER_PATH)) {
    return serveDir(req, {
      fsRoot: Deno.cwd().concat(IMAGES_FOLDER_PATH),
    });
  }

  return new Response("404 Not Found", { status: 404 });
}

Deno.serve({ hostname: "localhost", port: 8000 }, handler);
