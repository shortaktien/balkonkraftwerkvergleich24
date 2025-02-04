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
  
  export const generateHomeJsonLd = () => ({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Balkonspeicher Vergleich 24",
    "description": "Vergleiche Balkonspeicher und finde den richtigen für dich.",
    "url": "https://balkonspeicher24.shortaktien.de",
    "publisher": {
      "@type": "Organization",
      "name": "Balkonspeicher24",
      "logo": {
        "@type": "ImageObject",
        "url": "https://balkonspeicher24.shortaktien.de/logo.png"
      }
    },
    "mainEntity": {
      "@type": "Article",
      "headline": "Recht auf Smart Meter: Fortschritt oder Kostenfalle?",
      "author": {
        "@type": "Person",
        "name": "Balkonspeicher24 Redaktion"
      },
      "datePublished": "2025-01-01",
      "dateModified": "2025-01-01",
      "publisher": {
        "@type": "Organization",
        "name": "Balkonspeicher24"
      },
      "articleBody": "Seit Anfang 2025 gibt es für Besitzer von Balkonkraftwerken und Photovoltaikanlagen eine erfreuliche Neuerung: Das gesetzlich verankerte Recht auf einen Smart Meter. Bislang war man auf Drittanbieterlösungen wie den Shelly 3EM Pro oder den Anker SOLIX Smart Meter angewiesen, um eine Nulleinspeisung zu erreichen. Heute heißt es, dass wer einen Smart Meter wünscht, diesen auch vom lokalen Stromanbieter im Verteilerkasten installiert bekommt..."
    }
  });