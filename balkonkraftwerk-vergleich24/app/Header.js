"use client";

import * as React from "react";
import { AppBar, Box, Toolbar, IconButton, Typography, Container, Button, Link, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import SolarPowerIcon from "@mui/icons-material/SolarPower";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";

const pages = [
  { name: "Balkon.Solar e.V.", url: "https://balkon.solar/" },
  { name: "Dummylink", url: "#" }
];

const SUN_COUNT = 20;

function RainEffect() {
  return (
    <>
      {Array.from({ length: SUN_COUNT }).map((_, index) => {
        const startX = Math.random() * 100;
        const delay = Math.random() * 2;
        return (
          <motion.div
            key={index}
            initial={{ x: `${startX}vw`, y: "-10vh", opacity: 0.5, rotate: 0 }}
            animate={{
              x: `${startX + 10}vw`,
              y: "100vh",
              opacity: 0,
              rotate: 45,
            }}
            transition={{
              duration: 10 + Math.random() * 2,
              delay: delay,
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
        );
      })}
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
            <Link href="/" passHref>
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 900,
                  letterSpacing: ".05rem",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Vergleich Balkonkraftwerk Speicher
              </Typography>
            </Link>

            {/* 🌟 Hamburger-Menü für kleine Bildschirme 🌟 */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, justifyContent: "flex-end" }}>
              <IconButton color="inherit" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
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
            <IconButton sx={{ ml: 1 }} onClick={toggleDarkMode} color="inherit">
              {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
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