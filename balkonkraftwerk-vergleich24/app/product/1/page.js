"use client";
import { useParams } from "next/navigation";
import products from "../../products.json";
import { Box, Typography, Paper, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return <Typography variant="h5" color="error">Produkt nicht gefunden.</Typography>;
  }

  return (
    <Box sx={{ maxWidth: "800px", mx: "auto", mt: 5 }}>
      <Paper sx={{ p: 4, boxShadow: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Akkukapazität: <strong>{product.akkukapazitaet} Wh</strong>
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Maximale Kapazität: <strong>{product.maxKapazitaet}</strong>
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Garantie: <strong>{product.garantie} Jahre</strong>
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          WLAN: {product.wifi ? "✅ Ja" : "❌ Nein"}
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Bluetooth: {product.bt ? "✅ Ja" : "❌ Nein"}
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Wechselrichter: {product.wechselrichter ? "✅ Ja" : "❌ Nein"}
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Mehr Infos:{" "}
          <a href={product.website} target="_blank" rel="noopener noreferrer">
            Offizielle Webseite
          </a>
        </Typography>

        <Link href="/">
          <Button variant="contained" color="primary" startIcon={<ArrowBackIcon />}>
            Zurück zur Übersicht
          </Button>
        </Link>
      </Paper>
    </Box>
  );
}
