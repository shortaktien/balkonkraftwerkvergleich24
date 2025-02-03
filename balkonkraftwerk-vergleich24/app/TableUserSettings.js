import React, { useState } from "react";
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  Paper,
  Box,
  Button,
} from "@mui/material";
import EditAttributesIcon from '@mui/icons-material/EditAttributes';

const columnOptions = {
  name: "Produktname",
  akkukapazitaet: "Akkukapazität (Wh)",
  maxKapazitaet: "Max. Kapazität (Wh)",
  erweiterbar: "Erweiterbar",
  ladezyklen: "Ladezyklen",
  garantie: "Garantie (Jahre)",
  anzahlMPPT: "Anzahl MPPT",
  maxMC4: "Max. MC4",
  maxEingang: "Max. Eingang (W)",
  maxEingangModule: "Max. Eingang Module (W)",
  solarErweiterbar: "Solar Erweiterbar",
  mppt1A: "MPPT 1 Max A",
  mppt1V: "MPPT 1 Max V",
  mppt2A: "MPPT 2 Max A",
  mppt2V: "MPPT 2 Max V",
  mppt3A: "MPPT 3 Max A",
  mppt3V: "MPPT 3 Max V",
  mppt4A: "MPPT 4 Max A",
  mppt4V: "MPPT 4 Max V",
  gewichtAkku: "Gewicht Akku (kg)",
  gewichtLaderegler: "Gewicht Laderegler (kg)",
  akkuLaenge: "Akkueinheit Länge (mm)",
  akkuBreite: "Akkueinheit Breite (mm)",
  akkuHoehe: "Akkueinheit Höhe (mm)",
  ladereglerLaenge: "Laderegler Länge (mm)",
  ladereglerBreite: "Laderegler Breite (mm)",
  ladereglerHoehe: "Laderegler Höhe (mm)",
  bt: "Bluetooth",
  wifi: "WiFi",
  app: "App",
  cloud: "Cloud",
  mqttCloud: "MQTT Cloud",
  mqttOffline: "MQTT Offline",
  heizung: "Heizung",
  ipKlasse: "IP Klasse",
  notstrom: "Notstrom",
  maxAusgang: "Max. Ausgang (W)",
  shellyPro: "Shelly Pro 3EM",
  homeassistent: "Home Assistent",
  wechselrichter: "Wechselrichter integriert",
  bidirektional: "Bidirektional",
  ladeanschluss: "230V Ladeanschluss",
  website: "Hersteller-Website",
};

export default function TableUserSettings({ visibleColumns, setVisibleColumns }) {
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings((prev) => !prev);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setVisibleColumns((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <div>
      <Button variant="contained" onClick={toggleSettings} startIcon={<EditAttributesIcon />} >
        {showSettings ? "Einstellungen verbergen" : "Eigenscahften An/Ausschalten"}
      </Button>

      {showSettings && (
        <Paper elevation={5} sx={{width: '100%', padding: '15px', marginTop: "10px" }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            <FormGroup sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
              {Object.entries(columnOptions).map(([key, label]) => (
                <FormControlLabel
                  key={key}
                  control={
                    <Checkbox
                      name={key}
                      checked={!!visibleColumns[key]}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label={label}
                />
              ))}
            </FormGroup>
          </Box>
        </Paper>
      )}
    </div>
  );
}
