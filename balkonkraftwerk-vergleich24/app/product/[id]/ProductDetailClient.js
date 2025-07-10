// app/product/[id]/ProductDetailClient.js
"use client";

import React, { useState, useContext, useEffect } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";
import Header from "../../Header";
import Footer from "../../Footer";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "@mui/material/Link";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: { default: "#F0F8FF", paper: "#ffffff" },
    text: { primary: "#111111", secondary: "#333333" },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#121212", paper: "#1E1E1E" },
    text: { primary: "#ffffff", secondary: "#B3B3B3" },
  },
});

export default function ProductDetailClient({ product, amazonPrice }) {
  const [open, setOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  const renderAmazonPrice = (priceObj) => {
    if (!priceObj || priceObj.price === null) {
      return "Preis manuell prüfen";
    }
    const { price, listPrice } = priceObj;
    if (listPrice && listPrice !== price) {
      return (
        <>
          <span style={{ color: "red", fontWeight: "bold" }}>{price}</span>{" "}
          <span style={{ textDecoration: "line-through", marginLeft: 4 }}>{listPrice}</span>
        </>
      );
    }
    return price;
  };

    // Optional: Passe auch den Body-Hintergrund an, falls nötig.
    useEffect(() => {
      document.body.style.backgroundColor = isDarkMode
        ? darkTheme.palette.background.default
        : lightTheme.palette.background.default;
    }, [isDarkMode]);

  return (
    <>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Typography
              sx={{ color: "text.primary" }}
              variant="h4"
              fontWeight="bold"
              gutterBottom
            >
              {product.name}
            </Typography>

            <TableContainer
              component={Paper}
              elevation={3}
              sx={{ backgroundColor: "background.paper" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      colSpan={2}
                      sx={{
                        backgroundColor: "background.default",
                        color: "text.primary",
                        fontWeight: "bold",
                      }}
                    >
                      Wichtigste Daten
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Akkukapazität</TableCell>
                    <TableCell>{product.akkukapazitaet} Wh</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Garantie</TableCell>
                    <TableCell>{product.garantie} Jahre</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Max. Eingang</TableCell>
                    <TableCell>{product.maxEingang}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Accordion sx={{ backgroundColor: "background.paper", borderRadius: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ backgroundColor: "background.default", borderRadius: 2 }}
                onClick={() => setOpen(!open)}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Alle Eigenschaften anzeigen
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer
                  component={Paper}
                  elevation={2}
                  sx={{ backgroundColor: "background.paper" }}
                >
                  <Table size="small">
                    <TableBody>
                      {[
                        { key: "akkukapazitaet", label: "Akkukapazität" },
                        { key: "maxKapazitaet", label: "Max. Kapazität" },
                        { key: "erweiterbar", label: "Erweiterbar", isBoolean: true },
                        { key: "ladezyklen", label: "Ladezyklen" },
                        { key: "garantie", label: "Garantie (Jahre)" },
                        { key: "anzahlMPPT", label: "Anzahl MPPT" },
                        { key: "maxMC4", label: "Max. MC4" },
                        { key: "maxEingang", label: "Max. Eingang" },
                        { key: "maxEingangModule", label: "Max Eingang Module" },
                        { key: "solarErweiterbar", label: "Solar Erweiterbar", isBoolean: true },
                        { key: "mppt1A", label: "MPPT1 A" },
                        { key: "mppt1V", label: "MPPT1 V" },
                        { key: "mppt2A", label: "MPPT2 A" },
                        { key: "mppt2V", label: "MPPT2 V" },
                        { key: "mppt3A", label: "MPPT3 A" },
                        { key: "mppt3V", label: "MPPT3 V" },
                        { key: "mppt4A", label: "MPPT4 A" },
                        { key: "mppt4V", label: "MPPT4 V" },
                        { key: "gewichtAkku", label: "Gewicht Akku" },
                        { key: "gewichtLaderegler", label: "Gewicht Laderegler" },
                        { key: "akkuLaenge", label: "Akku Länge (mm)" },
                        { key: "akkuBreite", label: "Akku Breite (mm)" },
                        { key: "akkuHoehe", label: "Akku Höhe (mm)" },
                        { key: "ladereglerLaenge", label: "Laderegler Länge" },
                        { key: "ladereglerBreite", label: "Laderegler Breite" },
                        { key: "ladereglerHoehe", label: "Laderegler Höhe" },
                        { key: "bt", label: "Bluetooth", isBoolean: true },
                        { key: "wifi", label: "WiFi", isBoolean: true },
                        { key: "app", label: "App", isBoolean: true },
                        { key: "cloud", label: "Cloud", isBoolean: true },
                        { key: "mqttCloud", label: "MQTT Cloud", isBoolean: true },
                        { key: "mqttOffline", label: "MQTT Offline" },
                        { key: "heizung", label: "Heizung", isBoolean: true },
                        { key: "ipKlasse", label: "IP-Klasse" },
                        { key: "notstrom", label: "Notstrom", isBoolean: true },
                        { key: "maxAusgang", label: "Max. Ausgang" },
                        { key: "shellyPro", label: "Shelly Pro 3 EM", isBoolean: true },
                        { key: "homeassistent", label: "Home Assistent", isBoolean: true },
                        { key: "wechselrichter", label: "Mit Wechselrichter", isBoolean: true },
                        { key: "bidirektional", label: "Bidirektional", isBoolean: true },
                        { key: "ladeanschluss", label: "230V Ladeanschluss", isBoolean: true },
                        { key: "asin", label: "Preis: ", isBoolean: true },
                      ].map(({ key, label, isBoolean }) => {
                        const value = key === "asin" ? renderAmazonPrice(amazonPrice) : product[key];
                        let displayValue = value;
                        if (typeof value === "boolean" && isBoolean) {
                          displayValue = value ? "Ja" : "Nein";
                        }
                        return (
                          <TableRow key={key}>
                            <TableCell>{label}</TableCell>
                            <TableCell>{displayValue}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>

            <Box>
              <Typography sx={{ color: "text.primary" }} variant="body1" gutterBottom>
                Kurze Produktbeschreibung:
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {product.produktbeschriebung}
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {product.produktbeschriebung2}
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {product.produktbeschriebung3}
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {product.produktbeschriebung4}
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {product.produktbeschriebung5}
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {product.produktbeschriebung6}
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {product.produktbeschriebung7}
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {product.produktbeschriebung8}
              </Typography>
            </Box>

            <Box>
              <Typography sx={{ color: "text.primary" }} variant="body1" gutterBottom>
                Weitere Infos direkt beim Hersteller:
              </Typography>
              <Link
                href={product.website}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "primary.light" }}
              >
                {product.website}
              </Link>
            </Box>

            {product.amazon && product.amazon !== "-" && (
              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#FFD814",
                    color: "#111",
                    "&:hover": { backgroundColor: "#F7CA00" },
                    fontWeight: "bold",
                    padding: "10px 20px",
                    fontSize: "16px",
                    borderRadius: "8px",
                  }}
                  href={product.amazon}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🔎 Jetzt Preis prüfen
                </Button>
              </Box>
            )}

            <Box sx={{ display: "flex", gap: 1 }}>
              <Button variant="contained" color="primary" onClick={() => history.back()}>
                Zurück
              </Button>
              <Button
                sx={{ backgroundColor: "#eb5656", color: "black" }}
                variant="outlined"
                onClick={() =>
                  (window.location.href = `mailto:lfsanja@gmail.com?subject=Bug melden&body=Produkt: ${product.id}`)
                }
              >
                Bug melden
              </Button>
            </Box>
            <Typography variant="body2" sx={{ fontStyle: "italic" }}>
              Dies ist ein gemeinschaftsbasiertes Projekt; wir können daher keine Haftung für die Vollständigkeit oder Richtigkeit der angezeigten Daten übernehmen. Sollten Ihnen fehlerhafte Informationen auffallen, nutzen Sie bitte den „BUG MELDEN“-Button, damit wir die Datenlage entsprechend korrigieren können.
            </Typography>
            <Typography variant="body2" sx={{ fontStyle: "italic" }}>
              * Links zu Amazon sind Ref-Links, die ausschließlich dem Erhalt dieses Projekts dienen. Für den Nutzer entstehen keine zusätzlichen Kosten.
            </Typography>
          </Box>
        </Container>
        <Footer />
      </ThemeProvider>
    </>
  );
}
