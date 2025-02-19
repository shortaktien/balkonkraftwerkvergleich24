// app/product/ProductData.js
import products from "../../products.json";
import { generateProductJsonLd } from "../../utils/structuredData";

// Produkt serverseitig abrufen
export function getProduct(id) {
  return products.find((p) => p.id === id) || null;
}

// JSON-LD serverseitig generieren
export function ProductJsonLd({ id }) {
  const product = getProduct(id);
  if (!product) return null;
  const productJsonLd = generateProductJsonLd(product);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd, null, 2) }}
    />
  );
}

// Amazon-Preis serverseitig abrufen
export async function getAmazonPrice(asin) {
  if (!asin || asin === "-") {
    return null;
  }
  try {
    // Hier rufst du deine API-Route (oder einen externen Service) ab.
    const res = await fetch(`/api/amazon?asin=${asin}`);
    const data = await res.json();
    const item = data.ItemsResult?.Items[0];
    const priceInfo = item?.Offers?.Listings[0]?.Price;
    return priceInfo?.DisplayAmount || null;
  } catch (error) {
    console.error("Error fetching Amazon price:", error);
    return null;
  }
}
