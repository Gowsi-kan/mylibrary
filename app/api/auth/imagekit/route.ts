import config from "@/lib/config";
import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const {
  imagekit: { publicKey, privateKey, urlEndpoint },
} = config.image;

const imagekit = new ImageKit({
  publicKey,
  privateKey,
  urlEndpoint,
});

// ✅ Domains you want to allow (production + previews)
const allowedDomainSuffixes = [".vercel.app", "mylibrary-drab.vercel.app"];

// Helper to check allowed origins
function isAllowedOrigin(origin: string | null) {
  if (!origin) return false;
  try {
    const url = new URL(origin);
    return allowedDomainSuffixes.some((suffix) =>
      url.hostname.endsWith(suffix)
    );
  } catch {
    return false;
  }
}

// Create CORS headers dynamically
function createCorsHeaders(origin: string | null) {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
  if (isAllowedOrigin(origin)) {
    headers["Access-Control-Allow-Origin"] = origin!;
  }
  return headers;
}

// Handle OPTIONS (preflight)
export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin");
  return new NextResponse(null, {
    status: 200,
    headers: createCorsHeaders(origin),
  });
}

// Handle GET
export async function GET(req: Request) {
  const origin = req.headers.get("origin");
  const headers = createCorsHeaders(origin);
  return NextResponse.json(imagekit.getAuthenticationParameters(), {
    headers,
  });
}
