// app/product/ProductData.js
import products from "../../products.json";
import { generateProductJsonLd } from "../../utils/structuredData";

// Produkt serverseitig abrufen
export function getProduct(id) {
  try {
    if (!id) {
      console.error('Keine Produkt-ID angegeben');
      return null;
    }
    const product = products.find((p) => p.id === id);
    if (!product) {
      console.error(`Produkt mit ID ${id} nicht gefunden`);
    }
    return product || null;
  } catch (error) {
    console.error('Fehler beim Abrufen des Produkts:', error);
    return null;
  }
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
    // Use absolute URL in production, relative in development
    const apiUrl = process.env.NODE_ENV === 'production' 
      ? 'https://balkonspeicher24.shortaktien.de/api/amazon'
      : '/api/amazon';
      
    const res = await fetch(`${apiUrl}?asin=${encodeURIComponent(asin)}`);
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }
    const data = await res.json();
    return data.price || null;
  } catch (error) {
    console.error("Error fetching Amazon price:", error);
    return null;
  }
}
