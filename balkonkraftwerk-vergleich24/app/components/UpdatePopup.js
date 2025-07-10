// components/UpdatePopup.js
"use client";

import React, { useState } from "react";
import { Fab, Dialog, DialogTitle, DialogContent, IconButton, Typography, List, ListItem } from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import CloseIcon from "@mui/icons-material/Close";

export default function UpdatePopup() {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="Update"
        onClick={handleToggle}
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        <UpdateIcon />
      </Fab>

      <Dialog open={open} onClose={handleToggle} fullWidth maxWidth="sm">
        <DialogTitle>
          Patch Notes
          <IconButton
            aria-label="close"
            onClick={handleToggle}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Hier siehst du die neuesten Updates:
          </Typography>
          {/* Weitere Patchnotes können hier hinzugefügt werden */}
          <Typography variant="body2" gutterBottom>
            <strong>10.07.2025</strong>
          </Typography>
          <List dense>
            <ListItem>
              <Typography variant="body2">
                + Preise werden jetzt aktualisiert und angezeigt eventuell öfters nachladen
                + Favicon aktualisiert
                + Komplette EcoFlow Stream Reihe hinzugefügt
              </Typography>
            </ListItem>
          </List>
          <Typography variant="body2" gutterBottom>
            <strong>03.06.2025</strong>
          </Typography>
          <List dense>
            <ListItem>
              <Typography variant="body2">
                + Erneuerung vom Zertifikat für Sicherheit
                
              </Typography>
            </ListItem>
          </List>
          <Typography variant="body2" gutterBottom>
            <strong>09.04.2025</strong>
          </Typography>
          <List dense>
            <ListItem>
              <Typography variant="body2">
                + Neuer Speicher Anker Solix Solarbank 3 E2700 Pro
              </Typography>
            </ListItem>
          </List>
          <Typography variant="body2" gutterBottom>
            <strong>14.03.2025</strong>
          </Typography>
          <List dense>
            <ListItem>
              <Typography variant="body2">
                + Neuer Speicher Anker Solarbank 2 E1600 AC
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body2">
                + Patchnotes, damit der User immer auf dem neuesten Stand ist, was auf der Seite neu ist.
              </Typography>
            </ListItem>
          </List>
          
        </DialogContent>
      </Dialog>
    </>
  );
}
