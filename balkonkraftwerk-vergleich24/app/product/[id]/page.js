// app/product/[id]/page.js
import { getProduct, ProductJsonLd, getAmazonPrice } from "./ProductData";
import Head from "next/head";
import { Container, Typography } from "@mui/material";
import ProductDetailClient from "./ProductDetailClient";

export const revalidate = 86400; // ISR: 24 Stunden

export default async function ProductDetail({ params }) {
  const { id } = params;
  const product = await getProduct(id);
  if (!product) {
    return (
      <Container>
        <Typography variant="h5">Produkt nicht gefunden</Typography>
      </Container>
    );
  }

  // Amazon-Preis wird serverseitig abgerufen.
  const amazonPrice = await getAmazonPrice(product.asin);

  return (
    <>
      <Head>
        <title>{product.name} | Balkonspeicher24</title>
        <ProductJsonLd id={id} />
      </Head>
      {/* Übergabe des Produktobjekts plus des serverseitig abgerufenen Preises */}
      <ProductDetailClient product={product} amazonPrice={amazonPrice} />
    </>
  );
}
