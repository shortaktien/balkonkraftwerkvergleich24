"use client";

import { useContext, useState, useEffect } from "react";
import { DarkModeContext } from "./context/DarkModeContext";
import styles from "./page.module.css";
import TableComponent from "./TableComponent";
import Header from "./Header";
import Footer from "./Footer";
import { Box, Typography, Container } from "@mui/material";
import SolarPowerIcon from "@mui/icons-material/SolarPower";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

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

  // Falls du trotzdem local state für isDarkMode haben möchtest (optional), 
  // solltest du diesen nicht mit dem Context vermischen. Der Context steuert bereits den Zustand.
  // Daher entfernen wir hier eine eigene useState()-Definition für Dark Mode.

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
          <Container maxWidth="800px">
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
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                <SolarPowerIcon fontSize="large" sx={{ verticalAlign: "middle", mr: 1 }} />
                Finde den perfekten Balkonkraftwerk Speicher!
              </Typography>

              <Typography variant="body1" sx={{ maxWidth: "600px", mx: "auto", mb: 3, color: "text.secondary" }}>
                Du möchtest deinen eigenen <strong>Balkonkraftwerk Speicher</strong> nutzen, um 
                <strong> Solarenergie effizient zu speichern</strong>, bist dir aber unsicher, welcher der richtige für dich ist?
              </Typography>

              <Typography variant="body1" sx={{ maxWidth: "600px", mx: "auto", mb: 3, color: "text.secondary" }}>
                Mit Balkonspeicher-Vergleich findest du schnell und einfach den passenden Batteriespeicher für dein  
                <strong> Balkonkraftwerk</strong>. Vergleiche technische Daten, Kapazitäten und Funktionen – und finde die optimale Lösung 
                für deine Energieunabhängigkeit!
              </Typography>

              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
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
              
          <Footer />
        </main>
      </div>
    </ThemeProvider>
  );
}