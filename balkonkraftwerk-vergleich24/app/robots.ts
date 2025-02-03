import { NextResponse } from "next/server";

export function GET() {
  const robotsTxt = `
  User-agent: *
  Allow: /
  Disallow: /api/
  Disallow: /admin/
  Disallow: /server/
  Disallow: /_next/
  Disallow: /private/
  Disallow: /hidden/
  
  Sitemap: https://balkonspeicher24.shortaktien.de/sitemap.xml
  `;

  return new NextResponse(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
