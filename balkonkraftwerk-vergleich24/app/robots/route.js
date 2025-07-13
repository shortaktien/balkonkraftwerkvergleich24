export function GET() {
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /server/
Disallow: /_next/
Disallow: /private/
Disallow: /hidden/

Sitemap: https://balkonspeicher24.shortaktien.de/sitemap.xml
`;

  return new Response(robotsTxt, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}