export function generateHomeJsonLd() {
    return {
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
        "articleBody": "Seit Anfang 2025 gibt es für Besitzer von Balkonkraftwerken und Photovoltaikanlagen eine erfreuliche Neuerung: Das gesetzlich verankerte Recht auf einen Smart Meter..."
      }
    };
  }
  
  // JSON-LD als React-Komponente
  export function HomeJsonLd() {
    const homeJsonLd = generateHomeJsonLd();
    
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd, null, 2) }}
      />
    );
  }