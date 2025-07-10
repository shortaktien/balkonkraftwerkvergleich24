// app/api/amazon/price/route.js
import aws4 from "aws4";
import { URL } from "url";
import { promises as fs } from "fs";
import path from "path";

const CACHE_FILE = path.join(process.cwd(), "app", "api", "amazon", "priceCache.json");

async function readCache() {
  try {
    const data = await fs.readFile(CACHE_FILE, "utf8");
    return JSON.parse(data);
  } catch {
    return {};
  }
}

async function writeCache(cache) {
  try {
    await fs.writeFile(CACHE_FILE, JSON.stringify(cache, null, 2));
  } catch (err) {
    console.log("Fehler beim Schreiben des Cache:", err.message);
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const asin = searchParams.get("asin");

  if (!asin || asin === "-") {
    return new Response(
      JSON.stringify({error:" Keine ASIN angegeben. Bitte melden."}),
      { status: 400}
    );
  }

  console.log("Amazon-Request f\xFCr ASIN:", asin);

  const cache = await readCache();
  const cached = cache[asin];
  if (cached && Date.now() - cached.timestamp < 86400 * 1000) {
    console.log("Preis aus Cache f\xFCr", asin);
    return new Response(
      JSON.stringify({ price: cached.price, listPrice: cached.listPrice, fromCache: true }),
      { status: 200 }
    );
  }

  // Hole die Amazon-Partner-Zugangsdaten aus den Umgebungsvariablen
  const accessKey = process.env.AMAZON_ACCESS_KEY;
  const secretKey = process.env.AMAZON_SECRET_KEY;
  const partnerTag = process.env.AMAZON_PARTNER_TAG;

  if (!accessKey || !secretKey || !partnerTag) {
    console.log("Amazon-Zugangsdaten fehlen");
    return new Response(
      JSON.stringify({ error: "Amazon-API-Zugangsdaten nicht konfiguriert." }),
      { status: 500 }
    );
  }

  console.log("Amazon-Zugangsdaten geladen");

  // Für den deutschen Markt: 
  const region = "eu-west-1"; 
  const host = "webservices.amazon.de"; 
  const endpoint = `https://${host}/paapi5/getitems`;

  // Aufbau des Request-Payloads für SearchItems
  const payload = {
    ItemIds: [asin],
    Resources: ["Offers.Listings.Price"],
    PartnerTag: partnerTag,
    PartnerType: "Associates",
    Marketplace: "www.amazon.de"
  };

  // Erstelle das Options-Objekt
  const options = {
    host,
    path: "/paapi5/getitems",
    service: "ProductAdvertisingAPI",
    region,
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Zusätzliche erforderliche Header hinzufügen
  options.headers["X-Amz-Target"] = "com.amazon.paapi5.v1.ProductAdvertisingAPIv1.GetItems";
  options.headers["Content-Encoding"] = "amz-1.0";

  // Signiere die Anfrage (AWS Signature Version 4)
  aws4.sign(options, { accessKeyId: accessKey, secretAccessKey: secretKey });

  // Debug: Ausgabe der signierten Optionen
  //console.log("Signierte Optionen:", options);

  try {
    console.log("Verbinde zu Amazon...");
    const response = await fetch(endpoint, {
      method: options.method,
      headers: options.headers,
      body: options.body,
    });
    console.log("Mit Amazon verbunden");
    const data = await response.json();
    const item = data.ItemsResult?.Items?.[0];
    const listing = item?.Offers?.Listings?.[0];
    const priceObj = listing?.Price;
    const price = priceObj?.DisplayAmount || null;
    let listPrice = null;
    if (priceObj && priceObj.Savings && typeof priceObj.Amount === "number") {
      const originalAmount = priceObj.Amount + priceObj.Savings.Amount;
      listPrice = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: priceObj.Currency,
      }).format(originalAmount);
    }
    if (price) {
      console.log("Produkt gefunden f\xFCr", asin);
    } else {
      console.log("Kein Produkt f\xFCr", asin, "gefunden");
    }
    cache[asin] = { price, listPrice, timestamp: Date.now() };
    await writeCache(cache);
    return new Response(
      JSON.stringify({ price, listPrice, fromCache: false }),
      { status: 200 }
    );
  } catch (error) {
    console.log("Fehler bei Amazon-Anfrage:", error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
