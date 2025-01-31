"use client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./page.module.css";
import TableComponent from "./TableComponent";
import Header from "./Header";
import Footer from "./Footer";
import { Box, Typography } from '@mui/material';
import SolarPowerIcon from "@mui/icons-material/SolarPower";



export default function Home() {
  
  
  return (
    <div className={styles.page}>
      <Header />
        <main className={styles.main}>
        <Box
        sx={{
          width: "100%",
          textAlign: "center",
          bgcolor: "#F0F8FF",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
        >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          <SolarPowerIcon fontSize="large" sx={{ verticalAlign: "middle", mr: 1 }} />
          Finde den perfekten Balkonkraftwerk Speicher!
        </Typography>
  
        <Typography variant="body1" sx={{ maxWidth: "600px", mx: "auto", mb: 3 }}>
          Du möchtest deinen eigenen <strong>Balkonkraftwerk Speicher</strong> nutzen, um 
          <strong> Solarenergie effizient zu speichern</strong>, bist dir aber unsicher, welcher der richtige für dich ist?
        </Typography>
  
        <Typography variant="body1" sx={{ maxWidth: "600px", mx: "auto", mb: 3 }}>
          Mit Balkonspeicher-Vergleich findest du schnell und einfach den passenden Batteriespeicher für dein  
          <strong> Balkonkraftwerk</strong>. Vergleiche technische Daten, Kapazitäten und Funktionen – und finde die optimale Lösung 
          für deine Energieunabhängigkeit!
        </Typography>
  
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          🔍 So funktioniert's:
        </Typography>
  
        <Typography variant="body2" sx={{ maxWidth: "600px", mx: "auto", mb: 1 }}>
          ✅ Filtere nach <strong>Kapazität, Leistung und Features</strong>  
          ✅ Vergleiche verschiedene <strong>Balkonspeicher-Modelle</strong>  
          ✅ Wähle den Speicher, der am besten zu deinem Verbrauch passt  
        </Typography>
      </Box>

          
          <TableComponent />
          <Footer />
        </main>
        
    </div>
  );
}
