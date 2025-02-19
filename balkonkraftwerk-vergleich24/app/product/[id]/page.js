// app/product/[id]/page.js
import { getProduct, ProductJsonLd } from "./ProductData";
import Head from "next/head";
import { Container, Typography } from "@mui/material";
import ProductDetailClient from "./ProductDetailClient";

export const revalidate = 86400;

export default async function ProductDetail({ params }) {
  const { id } = params;
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
      <Head>
        <title>{product.name} | Balkonspeicher24</title>
        {/* Nutzt den serverseitig generierten JSON‑LD */}
        <ProductJsonLd id={id} />
      </Head>
      {/* Übergibt das serialisierbare Produktobjekt an den Client Component */}
      <ProductDetailClient product={product} />
    </>
  );
}
