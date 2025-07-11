export function generateAboutJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "name": "Über uns",
    "url": "https://balkonspeicher24.shortaktien.de/about",
    "publisher": {
      "@type": "Organization",
      "name": "Balkonspeicher24",
      "logo": {
        "@type": "ImageObject",
        "url": "https://balkonspeicher24.shortaktien.de/logo.png"
      }
    },
    "about": {
      "@type": "Organization",
      "name": "Balkonspeicher24",
      "description": "Wir sind Enthusiasten rund um Photovoltaik und Batteriespeicher und teilen unser Wissen auf dieser Seite."
    }
  };
}

export function AboutJsonLd() {
  const jsonLd = generateAboutJsonLd();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd, null, 2) }}
    />
  );
}
