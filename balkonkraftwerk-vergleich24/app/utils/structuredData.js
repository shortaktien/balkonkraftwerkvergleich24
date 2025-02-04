// utils/structuredData.js
export const generateProductJsonLd = (product) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name || "Unbekannt",
    "description": product.produktbeschriebung || "Keine Beschreibung verfügbar",
    "brand": { "@type": "Brand", "name": "Balkonspeicher24" },
    "additionalProperty": [
      { "@type": "PropertyValue", "name": "Akkukapazität", "value": `${product.akkukapazitaet} Wh` },
      { "@type": "PropertyValue", "name": "Maximale Kapazität", "value": `${product.maxKapazitaet} Wh` },
      { "@type": "PropertyValue", "name": "Erweiterbar", "value": product.erweiterbar ? "Ja" : "Nein" },
      { "@type": "PropertyValue", "name": "Ladezyklen", "value": `${product.ladezyklen}` },
      { "@type": "PropertyValue", "name": "Garantie", "value": `${product.garantie} Jahre` }
    ],
    "offers": {
      "@type": "Offer",
      "priceCurrency": "EUR",
      "price": product.preis || "350",
      "availability": "https://schema.org/InStock",
      "url": product.website || `https://balkonspeicher24.shortaktien.de/product/${product.id}`
    },
    "url": product.website || `https://balkonspeicher24.shortaktien.de/product/${product.id}`
  });
  