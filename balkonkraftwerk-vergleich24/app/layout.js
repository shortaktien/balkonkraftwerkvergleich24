import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Script from "next/script"; 
import Head from "next/head"; 
import products from "./products.json";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 🟢 **Generiere JSON-LD für strukturierte Daten**
const generateStructuredData = (products) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Balkonspeicher Vergleich 24",
  "description": "Vergleiche Balkonspeicher und finde den richtigen für dich.",
  "url": "https://balkonspeicher24.shortaktien.de",
  "itemListElement": products.map((product, index) => ({
    "@type": "Product",
    "position": index + 1,
    "name": product.name,
    "description": `Kapazität: ${product.akkukapazitaet} Wh, Max: ${product.maxKapazitaet} Wh. 
      Erweiterbar: ${product.erweiterbar ? "Ja" : "Nein"}, Ladezyklen: ${product.ladezyklen}, Garantie: ${product.garantie} Jahre.`,
    "brand": { "@type": "Brand", "name": "Balkonspeicher24" },
    "additionalProperty": [
      { "@type": "PropertyValue", "name": "Akkukapazität", "value": `${product.akkukapazitaet} Wh` },
      { "@type": "PropertyValue", "name": "Maximale Kapazität", "value": `${product.maxKapazitaet} Wh` },
      { "@type": "PropertyValue", "name": "Erweiterbar", "value": product.erweiterbar ? "Ja" : "Nein" },
      { "@type": "PropertyValue", "name": "Ladezyklen", "value": `${product.ladezyklen}` },
      { "@type": "PropertyValue", "name": "Garantie", "value": `${product.garantie} Jahre` },
      { "@type": "PropertyValue", "name": "Bluetooth", "value": product.bt ? "Ja" : "Nein" },
      { "@type": "PropertyValue", "name": "WiFi", "value": product.wifi ? "Ja" : "Nein" },
      { "@type": "PropertyValue", "name": "App-Unterstützung", "value": product.app ? "Ja" : "Nein" },
      { "@type": "PropertyValue", "name": "Cloud-Anbindung", "value": product.cloud ? "Ja" : "Nein" },
      { "@type": "PropertyValue", "name": "MQTT Cloud", "value": product.mqttCloud ? "Ja" : "Nein" },
      { "@type": "PropertyValue", "name": "MQTT Offline", "value": product.mqttOffline || "Nicht unterstützt" },
      { "@type": "PropertyValue", "name": "Heizung", "value": product.heizung ? "Ja" : "Nein" },
      { "@type": "PropertyValue", "name": "Notstrom", "value": product.notstrom ? "Ja" : "Nein" },
      { "@type": "PropertyValue", "name": "Maximale Ausgangsleistung", "value": product.maxAusgang !== "-" ? `${product.maxAusgang} W` : "Keine Angabe" },
      { "@type": "PropertyValue", "name": "Shelly Pro 3EM Unterstützung", "value": product.shellyPro ? "Ja" : "Nein" },
      { "@type": "PropertyValue", "name": "Wechselrichter integriert", "value": product.wechselrichter ? "Ja" : "Nein" },
      { "@type": "PropertyValue", "name": "Bidirektional", "value": product.bidirektional ? "Ja" : "Nein" },
      { "@type": "PropertyValue", "name": "230V Ladeanschluss", "value": product.ladeanschluss ? "Ja" : "Nein" },
      { "@type": "PropertyValue", "name": "Home Assistant Unterstützung", "value": product.homeassistent ? "Ja" : "Nein" }
    ],
    "url": product.website || "https://balkonspeicher24.shortaktien.de"
  }))
});

export const metadata = {
  title: "Balkonspeicher Vergleich 24",
  description: "Vergleiche Balkonspeicher und finde den richtigen für dich.",
  openGraph: {
    title: "Balkonspeicher Vergleich 24",
    description: "Vergleiche Balkonspeicher und finde den richtigen für dich.",
    url: "https://balkonspeicher24.shortaktien.de",
    siteName: "Balkonspeicher Vergleich 24",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Balkonspeicher Vergleich 24",
    description: "Vergleiche Balkonspeicher und finde den richtigen für dich.",
  },
};

export default function RootLayout({ children }) {
  const structuredData = generateStructuredData(products); // JSON-LD generieren

  return (
    <html lang="de">
      <Head>
        {/* ✅ Mobile Optimierung */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Balkonspeicher Vergleich 24" />
        
        {/* ✅ Performance-Optimierung für Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* ✅ SEO: Strukturierte Daten JSON-LD */}
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive" // 🚀 Läd JSON-LD asynchron
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* ✅ Kritische CSS inline setzen (Vermeidung von FOUC - Flash of Unstyled Content) */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            body {
              font-family: 'Geist', sans-serif;
              background-color: #F0F8FF;
              margin: 0;
              padding: 0;
            }
            `,
          }}
        />

        {/* ✅ CSS lazy-loaden für bessere Ladezeit */}
        <link rel="stylesheet" href="/css/ac8beb2aa2892cf0.css" as="style" />
        <link rel="stylesheet" href="/css/c468f4c3ae374853.css" as="style" />
      </Head>

      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>{children}</Providers>

        {/* ✅ Lazy-Loading für nicht-kritische Skripte */}
        
      </body>
    </html>
  );
}
