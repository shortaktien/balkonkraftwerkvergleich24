export async function GET() {
  const baseUrl = "https://balkonspeicher24.shortaktien.de";

  const productIds = [
    "zendure-aio-2400",
    "zendure-solarflow-2000", 
    "zendure-solarflow-hyper-2000", 
    "anker-solix-solarbank-pro-e1600",
    "anker-solix-solarbank2-e1600-plus",
    "growatt-noah-2000",
    "maxxicharge-3-0",
    "maxxicharge-5-0",
    "ecoflow-delta-3-plus",
    "ecoflow-delta-3",
    "ecoflow-delta-pro-3",
    "marstek-jupiter-c",
    "marstek-b2500-d",
    "hoymiles-ms-a2",
    "sunlit-bk-215",
    "bigblue-powerfree-h1",
    "xoro-solar-sps-1024",
    "xoro-solar-sps-2155",
    "vitapower-vt1000",
    "zendure-ab2000",
    "zendure-ab2000s",
    "solmate-maxxicharge-1-5",
    "growatt-nexa-2000",
  ];

  // 📌 Erstelle die URLs mit `lastmod`
  const urls = [
    { loc: `${baseUrl}/`, lastmod: new Date().toISOString() },
    ...productIds.map((id) => ({
      loc: `${baseUrl}/product/${id}`,
      lastmod: new Date().toISOString()
    })),
  ];

  // 📌 Generiere das XML für die Sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map(({ loc, lastmod }) => `<url>
        <loc>${loc}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>`)
      .join("\n")}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}