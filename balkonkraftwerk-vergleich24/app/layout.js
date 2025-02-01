import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head"; // Falls du Head von Next.js nutzen möchtest

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Balkonspeicher Vergleich 24",
  description: "Vergleiche Balkonspeicher und finde den richtigen für dich",
  openGraph: {
    title: "Balkonspeicher Vergleich 24",
    description: "Vergleiche Balkonspeicher und finde den richtigen für dich",
    url: "https://https://balkonspeicher24.shortaktien.de",
    siteName: "Balkonspeicher Vergleich 24",
    locale: "de_DE",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Balkonspeicher Vergleich 24",
    description: "Vergleiche Balkonspeicher und finde den richtigen für dich",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <Head>
        {/* Meta viewport für mobile Optimierung */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}