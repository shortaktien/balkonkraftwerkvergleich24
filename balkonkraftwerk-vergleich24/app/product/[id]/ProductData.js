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