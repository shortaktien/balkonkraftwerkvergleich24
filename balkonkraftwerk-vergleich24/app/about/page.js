"use client";
import { Container, Typography, Paper } from "@mui/material";
import Head from "next/head";
import { AboutJsonLd } from "../utils/aboutStructuredData";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>Über uns | Balkonspeicher24</title>
        <meta
          name="description"
          content="Lerne das Team hinter Balkonspeicher24 kennen."
        />
        <link
          rel="canonical"
          href="https://balkonspeicher24.shortaktien.de/about"
        />
        <AboutJsonLd />
      </Head>
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Paper sx={{ p: 4, boxShadow: 3 }}>
          <Typography variant="h4" gutterBottom>
            Über uns
          </Typography>
          <Typography variant="body1" gutterBottom>
            Balkonspeicher24 wird von einem kleinen Team betrieben, das sich
            leidenschaftlich mit Photovoltaik und Batteriespeichern beschäftigt.
            Unser Ziel ist es, verständliche und unabhängige Informationen zu
            liefern, damit jeder die passende Speicherlösung findet.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Die Inhalte basieren auf eigenen Erfahrungen sowie sorgfältiger
            Recherche. Transparenz und Aktualität stehen dabei für uns im
            Vordergrund.
          </Typography>
        </Paper>
      </Container>
    </>
  );
}
