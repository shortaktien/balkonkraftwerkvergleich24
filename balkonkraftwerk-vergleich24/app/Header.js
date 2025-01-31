import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import SolarPowerIcon from '@mui/icons-material/SolarPower';
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { motion } from "framer-motion";

const pages = ['Dummy1', 'Dummy2', 'Dummy3'];

const SUN_COUNT = 20;

function RainEffect() {
    return (
      <>
        {Array.from({ length: SUN_COUNT }).map((_, index) => {
          const startX = Math.random() * 100; // Zufällige Startposition (0-100% Breite)
          const delay = Math.random() * 2; // Zufällige Verzögerung
  
          return (
            <motion.div
              key={index}
              initial={{ x: `${startX}vw`, y: "-10vh", opacity: 0.5, rotate: 0 }}
              animate={{
                x: `${startX + 10}vw`, // Leicht schräg nach rechts bewegen
                y: "100vh", // Nach unten fallen
                opacity: 0,
                rotate: 45, // Drehung für realistischeres Fallen
              }}
              transition={{
                duration: 10 + Math.random() * 2, // Unterschiedliche Fallgeschwindigkeiten
                delay: delay,
                repeat: Infinity, // Endloser Regen-Effekt
              }}
              style={{
                position: "absolute",
                fontSize: "2rem",
                color: "rgba(255, 204, 0, 0.8)", // Halbtransparentes Gelb
              }}
            >
              <WbSunnyIcon />
            </motion.div>
          );
        })}
      </>
    );
  }

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <Box sx={{ position: "relative", overflow: "hidden" }}>
      <RainEffect /> {/* Hier wird der Sonnenregen eingefügt */}
    <AppBar position="static" sx={{borderRadius: '10px', marginBottom: '15px'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SolarPowerIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 900,
              letterSpacing: '.05rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Vergleich Balkonkraftwerk Speicher
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 400,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              fontSize: 15,
            }}
          >
            Balkonkraftwerk Speicher
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          
        </Toolbar>
      </Container>
    </AppBar>
    </Box>
  );
}
export default Header;
