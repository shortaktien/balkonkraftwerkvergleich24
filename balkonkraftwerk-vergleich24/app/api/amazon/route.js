// app/api/amazon/price/route.js
import aws4 from "aws4";
import { URL } from "url";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  // Verwende hier einen Query-Parameter für die Suche (zum Beispiel "query")
  const query = searchParams.get("query") || "kindle";

  // Hole die Amazon-Partner-Zugangsdaten aus den Umgebungsvariablen
  const accessKey = process.env.AMAZON_ACCESS_KEY;
  const secretKey = process.env.AMAZON_SECRET_KEY;
  const partnerTag = process.env.AMAZON_PARTNER_TAG;
  
  if (!accessKey || !secretKey || !partnerTag) {
    return new Response(
      JSON.stringify({ error: "Amazon-API-Zugangsdaten nicht konfiguriert." }),
      { status: 500 }
    );
  }

  // Für den deutschen Markt: 
  const region = "eu-west-1"; 
  const host = "webservices.amazon.de"; 
  const endpoint = `https://${host}/paapi5/searchitems`;

  // Aufbau des Request-Payloads für SearchItems
  const payload = {
    Marketplace: "www.amazon.de", // oder "www.amazon.com", wenn dein Konto das unterstützt
    PartnerType: "Associates",
    PartnerTag: partnerTag,
    Keywords: query,
    SearchIndex: "All",
    ItemCount: 3,
    Resources: ["Images.Primary.Large", "ItemInfo.Title", "Offers.Listings.Price"]
  };

  // Erstelle das Options-Objekt
  const options = {
    host,
    path: "/paapi5/searchitems",
    service: "ProductAdvertisingAPI",
    region,
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Zusätzliche erforderliche Header hinzufügen
  options.headers["X-Amz-Target"] = "com.amazon.paapi5.v1.ProductAdvertisingAPIv1.SearchItems";
  options.headers["Content-Encoding"] = "amz-1.0";

  // Signiere die Anfrage (AWS Signature Version 4)
  aws4.sign(options, { accessKeyId: accessKey, secretAccessKey: secretKey });

  // Debug: Ausgabe der signierten Optionen
  console.log("Signierte Optionen:", options);

  try {
    const response = await fetch(endpoint, {
      method: options.method,
      headers: options.headers,
      body: options.body,
    });
    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
