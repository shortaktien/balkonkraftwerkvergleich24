// app/product/[id]/page.js
import { getProduct, ProductJsonLd } from "./ProductData";
import { Container, Typography } from "@mui/material";
import ProductDetailClient from "./ProductDetailClient";

export const revalidate = 86400; // ISR: 24 Stunden

// Statische Generierung für alle bekannten Produkte
export async function generateStaticParams() {
  try {
    const products = await import('../../products.json');
    return products.default.map((product) => ({
      id: product.id,
    }));
  } catch (error) {
    console.error('Fehler beim Generieren der statischen Params:', error);
    return [];
  }
}

export default function ProductDetail({ params }) {
  // Einfache Implementierung ohne async/await
  const id = params?.id;
  
  if (!id) {
    return (
      <Container>
        <Typography variant="h5">Fehler: Keine Produkt-ID angegeben</Typography>
      </Container>
    );
  }

  const product = getProduct(id);
  
  if (!product) {
    return (
      <Container>
        <Typography variant="h5">Produkt nicht gefunden</Typography>
      </Container>
    );
  }

  return (
    <>
      <ProductDetailClient product={product} amazonPrice={null} />
    </>
  );
}
