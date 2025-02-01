"use client";

import { useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { DarkModeContext } from "../../context/DarkModeContext";
import products from "../../products.json";
import Header from "../../Header";
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
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "@mui/material/Link";

// Light Theme
const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: { default: "#F0F8FF", paper: "#ffffff" },
    text: { primary: "#111111", secondary: "#333333" },
  },
});

// Dark Theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#121212", paper: "#1E1E1E" },
    text: { primary: "#ffffff", secondary: "#B3B3B3" },
  },
});

export default function ProductDetail() {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const product = products.find((p) => p.id === id);
  if (!product) {
    router.push("/404");
    return null;
  }

  const allFields = [
    { key: "akkukapazitaet", label: "Akkukapazität" },
    { key: "maxKapazitaet", label: "Max. Kapazität" },
    { key: "erweiterbar", label: "Erweiterbar", isBoolean: true },
    { key: "ladezyklen", label: "Ladezyklen" },
    { key: "garantie", label: "Garantie (Jahre)" },
    { key: "anzahlMPPT", label: "Anzahl MPPT" },
    { key: "maxMC4", label: "Max. MC4" },
    { key: "maxEingang", label: "Max. Eingang" },
    { key: "maxEingangModule", label: "Max. Eingang Module" },
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
    { key: "wechselrichter", label: "Mit Wechselrichter", isBoolean: true },
    { key: "bidirektional", label: "Bidirektional", isBoolean: true },
    { key: "ladeanschluss", label: "230V Ladeanschluss", isBoolean: true },
    // Website/Amazon verlinken wir separat
  ];

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Typography sx={{ color: "text.primary" }} variant="h4" fontWeight="bold" gutterBottom>
            {product.name}
          </Typography>

          <TableContainer component={Paper} elevation={3} sx={{ backgroundColor: "background.paper" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={2} sx={{ backgroundColor: "background.default", color: "text.primary", fontWeight: "bold" }}>
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
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: "background.default", borderRadius: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>Alle Eigenschaften anzeigen</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer component={Paper} elevation={2} sx={{ backgroundColor: "background.paper" }}>
                <Table size="small">
                  <TableBody>
                    {allFields.map(({ key, label, isBoolean }) => {
                      const value = product[key];
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
            <Typography sx={{ color: "text.primary" }} variant="body1" gutterBottom>Kurze Produktbeschreibung:</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>{product.produktbeschriebung}</Typography>
          </Box>

          <Box>
            <Typography sx={{ color: "text.primary" }} variant="body1" gutterBottom>Weitere Infos direkt beim Hersteller:</Typography>
            <Link href={product.website} target="_blank" rel="noopener noreferrer" sx={{ color: "primary.light" }}>
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
            <Button variant="contained" color="primary" onClick={() => history.back()}>Zurück</Button>
            <Button variant="outlined" onClick={() => window.location.href = `mailto:lfsanja@gmail.com?subject=Bug melden&body=Produkt: ${product.id}`}>Bug melden</Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}