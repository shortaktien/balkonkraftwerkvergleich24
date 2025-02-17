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
import { HomeJsonLd } from "./utils/homeStructuredData";
import Head from "next/head";

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
    <>
    <Head>
      <HomeJsonLd />
    </Head>

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
                Balkonkraftwerk Speicher Vergleich – Die besten Lösungen für mehr Eigenverbrauch
                <IconButton size="small" onClick={() => setOpen(!open)} aria-label="Artikel komplett anzeigen">
                  <ExpandMoreIcon />
                </IconButton>
              </Typography>
              <Typography variant="body1" gutterBottom>
                Immer mehr Haushalte setzen auf Balkonkraftwerke, um ihre Energiekosten zu senken und einen Beitrag zur Energiewende zu leisten. Doch ohne Speicher wird überschüssiger Solarstrom oft ungenutzt ins Netz eingespeist – meist ohne Vergütung. Ein Balkonspeicher kann hier Abhilfe schaffen, indem er den Strom speichert und ihn zu einem späteren Zeitpunkt verfügbar macht. Dadurch steigt der Eigenverbrauch, die Stromkosten sinken und die Wirtschaftlichkeit des Balkonkraftwerks verbessert sich.
              </Typography>
              <Collapse in={open}>
                <Typography variant="body1" gutterBottom>
                  <strong>Warum lohnt sich ein Balkonkraftwerk Speicher?</strong>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Ein Balkonkraftwerk erzeugt tagsüber Strom, aber viele Verbraucher wie Waschmaschine oder Herd werden erst abends genutzt. Ohne Speicher fließt die überschüssige Energie ins Netz, und der Haushalt muss abends wieder teuren Strom beziehen. Ein Speicher ermöglicht es, den erzeugten Strom dann zu nutzen, wenn er tatsächlich gebraucht wird. Besonders AC-gekoppelte Speicher sind als Nachrüstlösung interessant, da sie unabhängig vom Wechselrichter funktionieren und flexibel einsetzbar sind.
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Smart Meter und gesetzliche Neuerungen</strong>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Seit 2025 haben Haushalte das Recht auf einen <Link href="https://www.bmwk.de/Redaktion/DE/Pressemitteilungen/2023/05/20230512-smart-meter-gesetz-final-beschlossen.html">Smart Meter</Link>. Damit lassen sich Verbrauchsdaten in Echtzeit erfassen und der Eigenverbrauch optimieren. Hersteller wie Anker, Hoymiles oder Zendure bieten Speicherlösungen, die mit Smart Metern wie dem Shelly Pro 3EM kombiniert werden können, um eine bedarfsgerechte Einspeisung zu ermöglichen.
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Die besten Balkonkraftwerk Speicher im Vergleich</strong>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Testsieger: Anker Solarbank 2 Pro E1600</strong> – Hohe Flexibilität mit vier MPPT-Trackern, integrierte Notstromsteckdose (1000 W), Smart Meter-Anbindung und erweiterbar auf 9,6 kWh Kapazität. Preis: ca. 900 Euro.
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Maximale Kapazität: Zendure Hyper 2000</strong> – Erweiterbar auf 23 kWh, integrierter Hybrid-Wechselrichter, Unterstützung für dynamische Tarife. Preis: ab 998 Euro.
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Einfache Inbetriebnahme: Hoymiles MS-A2</strong> – AC-gekoppelt, einfache Nachrüstung, Kapazität 2,24 kWh. Preis: ca. 999 Euro.
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Schicke All-in-One-Lösung: Zendure AIO 2400</strong> – Kompakt, erweiterbar, Unterstützung für Smart Meter. Preis: ab 750 Euro.
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Lohnt sich ein Balkonkraftwerk Speicher?</strong>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Ein Balkonkraftwerk mit 2-kWh-Speicher amortisiert sich laut Berechnungen der HTW Berlin nach etwa 5 Jahren. Ohne Speicher bereits nach 2–3 Jahren, aber mit Speicher fällt der langfristige Gewinn höher aus. Förderprogramme können die Anschaffungskosten zusätzlich senken.
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Fazit</strong>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Die richtige Wahl hängt von den individuellen Bedürfnissen ab. Wer einfache Nachrüstung sucht, ist mit dem Hoymiles MS-A2 gut bedient. Wer maximale Speicherkapazität benötigt, greift zum Zendure Hyper 2000. Die Anker Solarbank 2 Pro E1600 bietet eine intelligente Steuerung mit Smart Meter-Anbindung und ist eine zukunftssichere Wahl für alle, die ihren Eigenverbrauch maximieren wollen.
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


          <Box sx={{ maxWidth: "1200px", mx: "auto", mt: 2 }}>
            <Paper sx={{ p: 4, boxShadow: 3 }}>
              <Typography
                variant="h5"
                gutterBottom
                onClick={() => setOpen(!open)}
                sx={{ cursor: "pointer" }}
              >
                Balkonkraftwerk Speicher – Die Zukunft der dezentralen Energieversorgung
                <IconButton
                  size="small"
                  onClick={() => setOpen(!open)}
                  aria-label="Artikel komplett anzeigen"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </Typography>
              <Typography variant="body1" gutterBottom>
                Die Energiewende ist längst in vollem Gange, und immer mehr Haushalte setzen auf erneuerbare Energien. 
                Balkonkraftwerke sind dabei sehr beliebt, weil sie eine unkomplizierte Möglichkeit bieten, vor Ort selbst Strom zu erzeugen, 
                einen großen Teil der Energie produzieren wir sicherlich privat. Allerdings gibt es ein Problem: Oft wird mehr Strom produziert, 
                als gerade benötigt wird. Hier kommen Balkonkraftwerk Speicher – auch Balkonspeicher genannt – ins Spiel. Sie ermöglichen es uns, 
                überschüssige Energie zu speichern und später abzurufen, wenn der Verbrauch ansteigt. Oder während man auf der Arbeit ist, über den Tag 
                den Balkonspeicher laden und Abends vom kostenlosen Storm profitieren. Doch welche Vorteile bietet ein solcher Speicher wirklich? 
                Lohnt sich die Investition auch Finanziell, und welche Entwicklungen zeichnen sich in diesem Bereich ab?
              </Typography>
              <Collapse in={open}>
                <Typography variant="body1" gutterBottom>
                  <strong>Warum ein Balkonkraftwerk Speicher sinnvoll ist</strong>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Ein Balkonkraftwerk, auch als Steckersolargerät bekannt, besteht meist aus einem oder mehreren Solarmodulen und einem Wechselrichter, 
                  der den erzeugten Gleichstrom in haushaltsüblichen Wechselstrom umwandelt. Der so gewonnene Strom wird direkt in das heimische Netz eingespeist 
                  und kann sofort genutzt werden. Aber was passiert, wenn die Produktion einmal die aktuelle Nachfrage übersteigt? 
                  Ohne Speicher wird der Überschuss in das öffentliche Netz eingespeist – meist ohne Vergütung und für alle die Neu Einspeisen wollen,
                  sinkt die Vergütung immer weiter. Ein Balkonspeicher hingegen fängt diesen überschüssigen Strom auf und macht ihn später verfügbar.
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Die Vorteile eines Balkonkraftwerk Speichers im Überblick:</strong>
                </Typography>
                <Typography variant="body1" gutterBottom component="div">
                  <ul>
                    <li>
                      <strong>Erhöhter Eigenverbrauch:</strong> Statt überschüssigen Strom ins Netz zu geben, wird er gespeichert und bei Bedarf genutzt.
                    </li>
                    <li>
                      <strong>Unabhängigkeit vom Stromnetz:</strong> Durch den Zwischenspeicher verringert sich der Strombezug aus dem öffentlichen Netz – 
                      ein Pluspunkt angesichts steigender Strompreise.
                    </li>
                    <li>
                      <strong>Optimale Nutzung der Solarenergie:</strong> Auch abends oder nachts kann so die tagsüber erzeugte Solarenergie genutzt werden.
                    </li>
                    <li>
                      <strong>Entlastung des Stromnetzes:</strong> Ein optimierter Eigenverbrauch hilft, Lastspitzen zu reduzieren.
                    </li>
                    <li>
                      <strong>Beitrag zur Energiewende:</strong> Dezentral gespeicherter Strom stärkt die Stabilität des gesamten Netzes.
                    </li>
                  </ul>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>AC- vs. DC-gekoppelte Speicher – Welche Variante passt zu Ihnen?</strong>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Grundsätzlich gibt es zwei Arten von Batteriespeichern für Balkonkraftwerke: AC-gekoppelte und DC-gekoppelte Systeme.
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>AC-gekoppelte Balkonkraftwerk Speicher</strong>
                </Typography>
                <Typography variant="body1" gutterBottom component="div">
                  Diese Speicher punkten vor allem mit ihrer Flexibilität, denn sie können unabhängig von der vorhandenen Solaranlage nachgerüstet werden. 
                  Zudem können sie auch Strom aus dem öffentlichen Netz speichern – etwa dann, wenn dynamische Tarife besonders attraktive Preise bieten.
                </Typography>
                <Typography variant="body1" gutterBottom component="div">
                  <strong>✅ Vorteile:</strong>
                  <ul>
                    <li>Einfache Nachrüstung möglich</li>
                    <li>Nutzung dynamischer Stromtarife</li>
                    <li>Problemlose Integration in bestehende Systeme</li>
                  </ul>
                </Typography>
                <Typography variant="body1" gutterBottom component="div">
                  <strong>❌ Nachteile:</strong>
                  <ul>
                    <li>Etwas höhere Umwandlungsverluste</li>
                    <li>Aufwändigere Installation</li>
                  </ul>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>DC-gekoppelte Balkonkraftwerk Speicher</strong>
                </Typography>
                <Typography variant="body1" gutterBottom component="div">
                  Hier wird der Strom direkt am Solarmodul abgegriffen, bevor er den Wechselrichter erreicht. Dadurch können Umwandlungsverluste deutlich reduziert werden.
                </Typography>
                <Typography variant="body1" gutterBottom component="div">
                  <strong>✅ Vorteile:</strong>
                  <ul>
                    <li>Höhere Effizienz durch weniger Umwandlungen</li>
                    <li>Geringere Energieverluste</li>
                    <li>Direkte Kopplung an die Solarmodule</li>
                  </ul>
                </Typography>
                <Typography variant="body1" gutterBottom component="div">
                  <strong>❌ Nachteile:</strong>
                  <ul>
                    <li>Kompliziertere Nachrüstung</li>
                    <li>In der Regel keine Kombination mit Netztarifen möglich</li>
                  </ul>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  In den letzten Jahren setzen sich AC-gekoppelte Speicher zunehmend durch – sie bieten die nötige Flexibilität und lassen sich gut 
                  mit modernen Energiemanagement-Systemen kombinieren.
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Balkonspeicher und die Netzdienlichkeit – Warum es so wichtig ist</strong>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Ein zentraler Punkt der Energiewende ist die Netzdienlichkeit von Batteriespeichern. Das bedeutet, dass solche Speicher nicht nur den Eigenverbrauch steigern,
                  sondern auch dazu beitragen, das öffentliche Stromnetz stabil zu halten. Ein aktueller Blick auf die Situation in Deutschland zeigt:
                </Typography>
                <Typography variant="body1" gutterBottom component="div">
                  <ul>
                    <li>Über 2 Millionen Steckersolargeräte sind bereits in Betrieb + Dunkelziffer die sich nciht regestriert haben.</li>
                    <li>Lediglich 5 % davon verfügen über einen Speicher.</li>
                    <li>
                      Dynamische Stromtarife gewinnen an Bedeutung, weil sie Verbraucher durch Preissignale zu einem netzdienlichen Laden und Entladen motivieren.
                    </li>
                  </ul>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Ein intelligenter Betrieb von Kleinspeichern kann helfen, Redispatch-Kosten zu senken, die durch Eingriffe zur Netzstabilisierung entstehen, 
                  und so das gesamte Energiesystem effizienter zu nutzen.
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Gesetzliche Rahmenbedingungen für Balkonkraftwerk Speicher</strong>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Die Bundesregierung hat erkannt, wie wichtig dezentrale Speicherlösungen für die Energiewende sind. 
                  Seit dem 1. Januar 2025 gilt für alle Stromlieferanten die Pflicht zur Einführung dynamischer Tarife. Das ermöglicht Nutzern von Balkonspeichern, 
                  finanziell von niedrigeren Börsenstrompreisen zu profitieren – vorausgesetzt, sie passen ihren Verbrauch entsprechend an. Dennoch gibt es Herausforderungen:
                </Typography>
                <Typography variant="body1" gutterBottom component="div">
                  <ul>
                    <li>
                      Nur 1,9 % der Haushalte verfügen über ein intelligentes Messsystem (Smart Meter), das für eine optimale Nutzung notwendig wäre.
                    </li>
                    <li>
                      Die aktuellen Netzentgelte bieten noch nicht genug Anreize für eine flexible Lastverschiebung.
                    </li>
                  </ul>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Die Bundesnetzagentur arbeitet bereits an neuen Regelungen, um eine bessere Integration der Speicher in das bestehende Energiesystem zu ermöglichen.
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Lohnt sich ein Balkonkraftwerk Speicher finanziell?</strong>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Die Kosten für einen Balkonspeicher liegen je nach Kapazität zwischen 500 und 3.500 Euro. Wie schnell sich die Investition amortisiert, 
                  hängt von mehreren Faktoren ab:
                </Typography>
                <Typography variant="body1" gutterBottom component="div">
                  <ul>
                    <li>Einsparungen durch den erhöhten Eigenverbrauch</li>
                    <li>Dynamische Stromtarife und variable Netzentgelte</li>
                    <li>Zukünftige Strompreissteigerungen</li>
                  </ul>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Eine beispielhafte Rechnung könnte so aussehen:
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  component="pre"
                  sx={{ backgroundColor: "#f5f5f5", p: 2 }}
                >
                  {`Parameter              Ohne Speicher         Mit Speicher (1 kWh)
                  Eigenverbrauch         30 %                 80 %
                  Netzbezug (€/Jahr)     600 €                300 €
                  Amortisationszeit      –                    3–8 Jahre`}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Zudem gibt es aktuell verschiedene Förderprogramme für Balkonspeicher – in einigen Bundesländern und Städten können Käufer sogar Zuschüsse erhalten.
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Zukunftsperspektiven – Wohin geht die Reise?</strong>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Die Marktaussichten für Balkonkraftwerk Speicher sind vielversprechend. Experten erwarten in den kommenden Jahren ein starkes Wachstum 
                  und sehen vor allem folgende Trends:
                </Typography>
                <Typography variant="body1" gutterBottom component="div">
                  <ul>
                    <li>Smarte Speicherlösungen mit KI-gestütztem Energiemanagement</li>
                    <li>Die Kombination von Balkonspeichern mit Elektroautos als zusätzliche Speichermöglichkeit</li>
                    <li>Eine engere Vernetzung mit dem öffentlichen Stromnetz</li>
                    <li>Sinkende Kosten durch Massenproduktion</li>
                  </ul>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Diese Entwicklungen dürften die Attraktivität und Wirtschaftlichkeit von Balkonkraftwerk Speichern weiter steigern.
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Fazit – Ist ein Balkonkraftwerk Speicher sinnvoll?</strong>
                </Typography>
                <Typography variant="body1">
                  Kurz gesagt kann ein Balkonkraftwerk mit Speicher für viele Haushalte eine lohnenswerte Investition sein – 
                  vor allem, wenn dynamische Stromtarife genutzt werden, das ist aber ein Bonus. Die Vorteile liegen klar auf der Hand: 
                  Mehr Eigenverbrauch, größere Unabhängigkeit vom öffentlichen Netz und ein wertvoller Beitrag zur Netzstabilität. 
                  Langfristig dürften die Preise für Speichersysteme weiter sinken, während der Bedarf an einer flexiblen und effizienten Stromnutzung steigt. 
                  Wer also auf eine zukunftssichere Eigenversorgung setzt, sollte die Anschaffung eines Balkonkraftwerk Speichers ernsthaft in Betracht ziehen.
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
    </>
  );
}