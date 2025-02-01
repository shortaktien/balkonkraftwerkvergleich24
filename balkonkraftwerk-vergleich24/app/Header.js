"use client";

import * as React from "react";
import { AppBar, Box, Toolbar, IconButton, Typography, Container, Button, Link } from "@mui/material";
import SolarPowerIcon from "@mui/icons-material/SolarPower";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { motion } from "framer-motion";

const pages = ["Dummy1", "Dummy2", "Dummy3"];

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

            {/* Navigation */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button key={page} sx={{ my: 2, color: "white", display: "block" }}>
                  {page}
                </Button>
              ))}
            </Box>

            {/* 🌑 **Dark Mode Toggle Button** */}
            <IconButton sx={{ ml: 1 }} onClick={toggleDarkMode} color="inherit">
              {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}