"use client";

import { useParams, useRouter } from "next/navigation";
import products from "@/app/products.json";
import {
  Box,
  Typography,
  Link as MuiLink,
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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function ProductDetail() {
  const params = useParams();      // Holt die dynamischen Routen-Parameter
  const router = useRouter();
  const { id } = params;

  // Produkt anhand der ID aus der JSON-Datei finden
  const product = products.find((p) => p.id === id);

  // Falls kein Produkt gefunden wurde → zu eigener 404-Seite leiten oder Meldung anzeigen
  if (!product) {
    // Beispiel: Navigiere zu einer (statischen) 404-Seite
    // oder zeige stattdessen ein eigenes "Produkt nicht gefunden" Layout.
    router.push("/404");
    return null;
  }

  // Optional: Mache für jedes Feld ein Label – so kannst du "erweiterbar" → "Erweiterbar" usw.  
  // Außerdem kannst du booleans (true/false) in "Ja"/"Nein" umwandeln
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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 4 }}>
      {/* Überschrift */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {product.name}
      </Typography>

      {/* Kurze Übersichtstabelle (z.B. wichtigste Daten) */}
      <TableContainer component={Paper} elevation={3} sx={{ mb: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={2}
                sx={{ backgroundColor: "#f0f8ff", fontWeight: "bold" }}
              >
                Wichtigste Daten
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Beispiel: zeig 3 Felder im "Schnellüberblick" */}
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

      {/* Accordion für alle weiteren Felder */}
      <Accordion sx={{ boxShadow: 3, borderRadius: 2 }}>
        <AccordionSummary sx={{ boxShadow: 3, borderRadius: 2}} expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Alle Eigenschaften anzeigen
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper} elevation={2}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell
                    colSpan={2}
                    sx={{ backgroundColor: "#fafafa", fontWeight: "bold" }}
                  >
                    Technische Daten (Detail)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allFields.map(({ key, label, isBoolean }) => {
                  const value = product[key];
                  // Wenn Boolean, dann "Ja" oder "Nein" statt true/false
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
        <p>Kurze Produktbeschreibung:</p>
        <br></br>
        <p>{product.produktbeschriebung}</p>
      </Box>

      {/* Hersteller-Link */}
      <Box>
        <Typography variant="body1" gutterBottom>
          Weitere Infos direkt beim Hersteller:
        </Typography>
        <MuiLink href={product.website} target="_blank" rel="noopener noreferrer">
          {product.website}
        </MuiLink>
      </Box>

      {/* Amazon-Link, falls vorhanden */}
      {product.amazon && product.amazon !== "-" && (
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="body1" gutterBottom>
            Preis bei Amazon Prüfen:
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FFD814", // Amazon-Gelb
              color: "#111", // Dunkle Amazon-Schrift
              "&:hover": {
                backgroundColor: "#F7CA00", // Dunkleres Gelb beim Hover
              },
              fontWeight: "bold",
              textTransform: "none",
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

      {/* (Optional) Button „Zurück“ */}
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button 
          variant="contained"
          color="primary"
          onClick={() => history.back()}
        >
          Zurück
        </Button>
        <Button 
                  variant="outlined"
                  onClick={() => {
                    const subject = encodeURIComponent("Bug melden");
                    const body = encodeURIComponent(
                      `Produkt: ${product.id} \nBrowser: \nMobile/PC: \nTechnischer Fehler: \nInhaltlicher Fehler: \nSonstiges: \n`
                    );
                    window.location.href = `mailto:lfsanja@gmail.com?subject=${subject}&body=${body}`;
                  }}
                >
                  Bug melden
                </Button>
      </Box>
    </Box>
  );
}