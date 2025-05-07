import { serveDir } from "@std/http/file-server";

const ROUTES_FS_ROOT = "routes";

const STATIC_ROUTE = new URLPattern({ pathname: "/static/*"});
const BLOG_PREVIEW_CARD_ROUTE = new URLPattern({ pathname: "/blog-preview-card*" });
const QR_CODE_COMPONENT_ROUTE = new URLPattern({ pathname: "/qr-code-component*" });

function handler(req: Request) {
  if(BLOG_PREVIEW_CARD_ROUTE.exec(req.url) || QR_CODE_COMPONENT_ROUTE.exec(req.url)) {
	if (req.method === "GET") {
        	return serveDir(req, {
          		fsRoot: ROUTES_FS_ROOT, 
        	});
	}
  }

  if(STATIC_ROUTE.exec(req.url)) {
	  if(req.method === "GET") {
		  return serveDir(req);
	  }
  }

  return new Response("404 Not Found", { status: 404 });
}

Deno.serve({ hostname: "localhost", port: 8000 }, handler);
