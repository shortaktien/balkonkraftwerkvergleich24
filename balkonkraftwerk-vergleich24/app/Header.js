"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { AppBar, Box, Toolbar, IconButton, Typography, Container, Button, Drawer, List, ListItem, ListItemButton, ListItemText, Tooltip, Divider } from "@mui/material";
import SolarPowerIcon from "@mui/icons-material/SolarPower";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";
import Link from "@mui/material/Link";

const pages = [
  { name: "Über uns", url: "/about" },
  { name: "FAQ", url: "/faq" },
  { name: "Balkon.Solar e.V.", url: "https://balkon.solar/" }
];

const SUN_COUNT = 20;

function RainEffect() {
  const [suns, setSuns] = useState([]);

  useEffect(() => {
    const generatedSuns = Array.from({ length: SUN_COUNT }).map(() => ({
      startX: Math.random() * 100, // Zufällige X-Position
      delay: Math.random() * 3, // Zufällige Verzögerung
    }));
    setSuns(generatedSuns);
  }, []); // Wird nur einmal generiert, bleibt stabil!

  return (
    <>
      {suns.map((sun, index) => (
        <motion.div
          key={index}
          initial={{ x: `${sun.startX}vw`, y: "-10vh", opacity: 0.5, rotate: 0 }}
          animate={{
            x: `${sun.startX + 10}vw`,
            y: "50vh",
            opacity: 0,
            rotate: 45,
          }}
          transition={{
            duration: 10 + Math.random() * 2, // Zufällige Dauer
            delay: sun.delay, // Zufällige Verzögerung
            repeat: Infinity,
          }}
          style={{
            position: "absolute",
            fontSize: "2rem",
            color: "rgba(255, 204, 0, 0.8)",
          }}
        >
          🌞
        </motion.div>
      ))}
    </>
  );
}

export default function Header({ isDarkMode, toggleDarkMode }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ position: "relative", overflow: "hidden" }}>
      <RainEffect />
      <AppBar position="static" sx={{ borderRadius: "10px", marginBottom: "15px" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <SolarPowerIcon sx={{ display: { xs: "none", md: "flex" }, mr: 2 }} />
              <Link href="/" underline="none" color="inherit">
                <Typography variant="h6" noWrap>
                  Vergleich Balkonkraftwerk Speicher
                </Typography>
              </Link>
            
            <Divider orientation="vertical" variant="middle" flexItem sx={{ marginLeft: "5px", backgroundColor: "white"}}/>


            {/* 🌟 Hamburger-Menü für kleine Bildschirme 🌟 */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, justifyContent: "flex-end" }}>
              <Tooltip title="Menü">
                <IconButton color="inherit" onClick={handleDrawerToggle} aria-label="Menü">
                  <MenuIcon />
                </IconButton>
              </Tooltip>
            </Box>

            {/* 🌍 Navigation für große Bildschirme 🌍 */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  component="a"
                  href={page.url}
                  target={page.url.startsWith("http") ? "_blank" : "_self"}
                  rel={page.url.startsWith("http") ? "noopener noreferrer nofollow" : ""}
                  sx={{ my: 2, color: "white", display: "block", letterSpacing: "0rem" }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            {/* 🌑 Dark Mode Toggle Button 🌞 */}
            <Tooltip title="Helles/Dunkles ändern">
              <IconButton sx={{ ml: 1 }} onClick={toggleDarkMode} color="inherit">
                {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Tooltip>
          </Toolbar>
        </Container>
      </AppBar>

      {/* 📌 Drawer für mobile Ansicht 📌 */}
      
      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
        <List sx={{ width: 250 }}>
          {pages.map((page) => (
            <ListItem key={page.name} disablePadding>
              <ListItemButton
                component="a"
                href={page.url}
                target={page.url.startsWith("http") ? "_blank" : "_self"}
                rel={page.url.startsWith("http") ? "noopener noreferrer nofollow" : ""}
              >
                <ListItemText primary={page.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}