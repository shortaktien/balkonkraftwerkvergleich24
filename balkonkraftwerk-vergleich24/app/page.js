//app/page.js
"use client";

import { useContext, useState, useEffect } from "react";
import { DarkModeContext } from "./context/DarkModeContext";
import styles from "./page.module.css";
import TableComponent from "./TableComponent";
import Header from "./Header";
import Footer from "./Footer";
import { Box, Typography, Container, Paper, Collapse, IconButton, Link } from "@mui/material";
import SolarPowerIcon from "@mui/icons-material/SolarPower";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";

<Image src="/solar-icon.png" alt="Solar Icon" width={40} height={40} />


// 🎨 **Light Mode Theme**
const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#F0F8FF", // Heller Hintergrund
      paper: "#ffffff",   // Weiße Boxen
    },
    text: {
      primary: "#000000", // Schwarze Schrift
      secondary: "#555555", // Dunkelgraue Untertitel
    },
  },
});

// 🌙 **Dark Mode Theme**
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212", // Dunkler Hintergrund
      paper: "#1E1E1E",   // Dunkle Boxen
    },
    text: {
      primary: "#ffffff", // Weiße Schrift
      secondary: "#B3B3B3", // Graue Schrift für Untertitel
    },
  },
});

export default function Home() {
  // Aus dem Context erhältst du isDarkMode und toggleDarkMode
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [open, setOpen] = useState(false);


  // Hintergrundfarbe setzen, wenn Theme gewechselt wird
  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode
      ? darkTheme.palette.background.default
      : lightTheme.palette.background.default;
  }, [isDarkMode]);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className={styles.page}>
        {/* Übergib toggleDarkMode statt setIsDarkMode */}
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

        <main className={styles.main}>
          <Container maxWidth="bg" sx={{ maxWidth: "1300px" }}>
            <Box
              sx={{
                textAlign: "center",
                bgcolor: "background.paper",
                p: 4,
                borderRadius: 2,
                boxShadow: 3,
                color: "text.primary",
                mb: 4,
              }}
            >
              <Typography
                variant="h3"
                fontWeight="bold"
                gutterBottom
                sx={{
                  mb: 2,
                }}
              >
                <SolarPowerIcon fontSize="inherit" sx={{ verticalAlign: "middle", mr: 1 }} />
                Finde den perfekten Balkonkraftwerk Speicher!
              </Typography>

              <Typography variant="body1" sx={{ maxWidth: "600px", mx: "auto", mb: 3, color: "text.secondary" }}>
                Du möchtest deinen eigenen <strong>Balkonkraftwerk Speicher</strong> nutzen, um 
                <strong> Solarenergie effizient zu speichern</strong>, bist dir aber unsicher, welcher der richtige für dich ist?
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  maxWidth: "600px",
                  mx: "auto",
                  mb: 3,
                  color: "text.secondary",
                  fontSize: "1.1rem", // Etwas größer für bessere Lesbarkeit
                }}
              >
                Mit Balkonspeicher-Vergleich findest du schnell und einfach den passenden 
                <strong>Batteriespeicher</strong> für dein Balkonkraftwerk!
              </Typography>

              <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
                🔍 So funktioniert's:
              </Typography>

              <Typography variant="body2" sx={{ maxWidth: "600px", mx: "auto", mb: 1, color: "text.secondary" }}>
                ✅ Filtere nach <strong>Kapazität, Leistung und Features</strong>  
                ✅ Vergleiche verschiedene <strong>Balkonspeicher-Modelle</strong>  
                ✅ Wähle den Speicher, der am besten zu deinem Verbrauch passt  
              </Typography>
            </Box>

            {/* Tabelle */}
            <Box sx={{ mt: 4 }}>
              <TableComponent />
                <Typography variant="body2" sx={{ fontStyle: "italic" }}>Dies ist ein gemeinschaftsbasiertes Projekt; 
                  wir können daher keine Haftung für die Vollständigkeit oder Richtigkeit der angezeigten Daten übernehmen. 
                  Sollten Ihnen fehlerhafte Informationen auffallen, nutzen Sie bitte den „BUG MELDEN“-Button, 
                  damit wir die Datenlage entsprechend korrigieren können.</Typography>
                <Typography variant="body2" sx={{ fontStyle: "italic" }}>* Links zu Amazon sind Ref-Links, 
                  die ausschließlich dem Erhalt dieses Projekts dienen. Für den Nutzer entstehen keine zusätzlichen 
                  Kosten.
                </Typography>
            </Box>
          </Container>

          <Box sx={{ maxWidth: "1200px", mx: "auto", mt: 2 }}>
            <Paper sx={{ p: 4, boxShadow: 3 }}>
              <Typography variant="h5" gutterBottom onClick={() => setOpen(!open)}>
                Recht auf Smart Meter: Fortschritt oder Kostenfalle?
                <IconButton size="small" onClick={() => setOpen(!open)} aria-label="Artikel komplett anzeigen">
                  <ExpandMoreIcon />
                </IconButton>
              </Typography>
                <Typography variant="body1" gutterBottom>
                  Seit Anfang 2025 gibt es für Besitzer von Balkonkraftwerken und Photovoltaikanlagen eine erfreuliche Neuerung:
                  Das gesetzlich <Link href="https://www.bmwk.de/Redaktion/DE/Pressemitteilungen/2023/05/20230512-smart-meter-gesetz-final-beschlossen.html">
                  verankerte Recht auf einen Smart Meter</Link>. Bislang war man auf Drittanbieterlösungen wie den Shelly 3EM Pro oder
                  den Anker SOLIX Smart Meter angewiesen, um eine Nulleinspeisung zu erreichen. Heute heißt es, dass wer einen Smart Meter wünscht,
                  diesen auch vom lokalen Stromanbieter im Verteilerkasten installiert bekommt. So weit so gut.
                </Typography>
                <Collapse in={open}>
                <Typography variant="body1" gutterBottom>
                  Der Schritt des Gesetzgebers ist zweifelsohne ein Fortschritt – insbesondere für alle, die ihren eigenen Strom erzeugen und optimal nutzen möchten.
                  Doch wie immer gibt es auch hier Haken: Entscheidend ist, ob die eingebauten Smart Meter den hohen Anforderungen gerecht werden.
                  Welche Daten werden dem Kunden angezeigt? Wie erfolgt die Anbindung an den Balkonspeicher? 
                  Bleibt die Kommunikation zwischen Smart Meter und Balkonkraftwerk Speicher optimal, nützt der technische Fortschritt leider kaum etwas.
                  Da greift man doch auf eine Drittlösung, die Funktionieren und die Community kennt sich aus.
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Ein neues Problem drängt sich zudem in den Fokus: die Kosten. Ein aktueller  
                  <Link href="https://www.golem.de/news/smart-meter-verbraucherschuetzer-leiten-verfahren-gegen-stromkonzerne-ein-2501-192920.html">
                   Artikel von Golem</Link> zeigt, dass der Verbraucherzentrale Bundesverband (VZBV)
                  inzwischen Unterlassungsverfahren gegen mehrere Stromkonzerne eingeleitet hat. Anlass ist das sogenannte Recht auf Smart Meter,
                  das Verbrauchern seit dem 1. Januar 2025 zusteht. Während einige Netzbetreiber – wie Rheinnetz oder die Stadtwerke München – den Einbau für 30 Euro anbieten,
                  verlangen andere Anbieter teilweise bis zu 100 Euro oder sogar weit mehr. So fordert etwa die Eon-Tochter Avacon bei einem Jahresverbrauch bis zu 3.000 Kilowattstunden
                  satte 848,10 Euro, Bayernwerk geht mit 888,98 Euro in die Höhe. Die Stromkonzerne rechtfertigen die höheren Preise mit einem neuen Gesetzentwurf, der den Preis
                  künftig auf 100 Euro anheben könnte – ein Schritt, der laut VZBV gerade für Verbraucher ohne Photovoltaik-Anlage, Wärmepumpe oder E-Ladestation kaum akzeptabel erscheint.
                  Und wieder ein Punkt, auf eine Drittlösung zu setzen.
                </Typography>
                <Typography variant="body1">
                  Für alle, die sich für den Eigenverbrauch und eine nachhaltige Energiewende interessieren, ist es daher wichtig, nicht nur auf die technische Umsetzung,
                  sondern auch auf die Kostenstruktur zu achten, die rentabilität spielt für viele eine große Rolle. Ein Smart Meter sollte mehr als nur ein Zähler sein – er muss als zentrale Schnittstelle zwischen Balkonspeicher und
                  Stromversorgung funktionieren und den Nutzer transparent über seinen Verbrauch informieren.
                </Typography>
              </Collapse>
              <Typography
                variant="body2"
                color="primary"
                sx={{ cursor: "pointer", mt: 2 }}
                onClick={() => setOpen(!open)}
              >
                {open ? "Weniger anzeigen" : "Mehr anzeigen"}
              </Typography>
            </Paper>
          </Box>
              
          <Footer />
        </main>
      </div>
    </ThemeProvider>
  );
}