import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper } from '@mui/material';

// Produkt-Daten
const rows = [
  {
    name: "Zendure AIO 2400",
    akkukapazitaet: "2400Wh",
    maxKapazitaet: "-",
    erweiterbar: "",
    ladezyklen: 8000,
    garantie: 10,
    anzahlMPPT: 2,
    maxMC4: 2,
    maxEingang: "1200W",
    maxEingangModule: "1560W",
    solarErweiterbar: false,
    mppt1A: "16A",
    mppt1V: "60V",
    mppt2A: "28A",
    mppt2V: "60V",
    mppt3A: "-",
    mppt3V: "-",
    mppt4A: "-",
    mppt4V: "-",
    gewichtAkku: "31,3kg",
    gewichtLaderegler: "-",
    akkuLaenge: "657mm",
    akkuBreite: "427mm",
    akkuHoehe: "150mm",
    ladereglerLaenge: "-",
    ladereglerBreite: "-",
    ladereglerHoehe: "-",
    bt: true,
    wifi: true,
    app: true,
    cloud: true,
    mqttCloud: "In Planung",
    mqttOffline: "OpenSource",
    heizung: true,
    ipKlasse: 65,
    notstrom: false,
    maxAusgang: "-",
    shellyPro: true,
    wechselrichter: false,
    bidirektional: false,
    ladeanschluss: false,
    website: "-",
    amazon: "-",
  },
];

export default function MaterialUITable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5); 

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440, overflowX: 'auto' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {/* Table Headers with fixed widths */}
              <TableCell style={{ width: 150 }}>Name</TableCell>
              <TableCell style={{ width: 150 }}>Akkukapazität</TableCell>
              <TableCell style={{ width: 150 }}>Max. Akkukapazität</TableCell>
              <TableCell style={{ width: 150 }}>Erweiterbar</TableCell>
              <TableCell style={{ width: 150 }}>Ladezyklen</TableCell>
              <TableCell style={{ width: 150 }}>Garantie</TableCell>
              <TableCell style={{ width: 150 }}>Anzahl MPPT</TableCell>
              <TableCell style={{ width: 150 }}>Max. MC4</TableCell>
              <TableCell style={{ width: 150 }}>Max Eingang</TableCell>
              <TableCell style={{ width: 150 }}>Max Eingang Module</TableCell>
              <TableCell style={{ width: 150 }}>Solar Erweiterbar</TableCell>
              <TableCell style={{ width: 150 }}>MPPT 1 Max A</TableCell>
              <TableCell style={{ width: 150 }}>MPPT 1 Max V</TableCell>
              <TableCell style={{ width: 150 }}>MPPT 2 Max A</TableCell>
              <TableCell style={{ width: 150 }}>MPPT 2 Max V</TableCell>
              <TableCell style={{ width: 150 }}>MPPT 3 Max A</TableCell>
              <TableCell style={{ width: 150 }}>MPPT 3 Max V</TableCell>
              <TableCell style={{ width: 150 }}>MPPT 4 Max A</TableCell>
              <TableCell style={{ width: 150 }}>MPPT 4 Max V</TableCell>
              <TableCell style={{ width: 150 }}>Gewicht Akkueinheit</TableCell>
              <TableCell style={{ width: 150 }}>Gewicht Laderegler</TableCell>
              <TableCell style={{ width: 150 }}>Akkueinheit Länge</TableCell>
              <TableCell style={{ width: 150 }}>Akkueinheit Breite</TableCell>
              <TableCell style={{ width: 150 }}>Akkueinheit Höhe</TableCell>
              <TableCell style={{ width: 150 }}>Laderegler Länge</TableCell>
              <TableCell style={{ width: 150 }}>Laderegler Breite</TableCell>
              <TableCell style={{ width: 150 }}>Laderegler Höhe</TableCell>
              <TableCell style={{ width: 150 }}>Bluetooth</TableCell>
              <TableCell style={{ width: 150 }}>WiFi</TableCell>
              <TableCell style={{ width: 150 }}>App</TableCell>
              <TableCell style={{ width: 150 }}>Cloud</TableCell>
              <TableCell style={{ width: 150 }}>MQTT Cloud</TableCell>
              <TableCell style={{ width: 150 }}>Heizung</TableCell>
              <TableCell style={{ width: 150 }}>IP Klasse</TableCell>
              <TableCell style={{ width: 150 }}>Notstrom</TableCell>
              <TableCell style={{ width: 150 }}>Max Ausgang</TableCell>
              <TableCell style={{ width: 150 }}>Shelly Pro 3 EM</TableCell>
              <TableCell style={{ width: 150 }}>Mit Wechselrichter</TableCell>
              <TableCell style={{ width: 150 }}>Bidirektional</TableCell>
              <TableCell style={{ width: 150 }}>230V Ladeanschluss</TableCell>
              <TableCell style={{ width: 150 }}>Website</TableCell>
              <TableCell style={{ width: 150 }}>Amazon</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {/* Rendering Rows */}
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.akkukapazitaet}</TableCell>
                  <TableCell>{row.maxKapazitaet}</TableCell>
                  <TableCell>{row.erweiterbar || 'Nein'}</TableCell>
                  <TableCell>{row.ladezyklen}</TableCell>
                  <TableCell>{row.garantie}</TableCell>
                  <TableCell>{row.anzahlMPPT}</TableCell>
                  <TableCell>{row.maxMC4}</TableCell>
                  <TableCell>{row.maxEingang}</TableCell>
                  <TableCell>{row.maxEingangModule}</TableCell>
                  <TableCell>{row.solarErweiterbar ? 'Ja' : 'Nein'}</TableCell>
                  <TableCell>{row.mppt1A}</TableCell>
                  <TableCell>{row.mppt1V}</TableCell>
                  <TableCell>{row.mppt2A}</TableCell>
                  <TableCell>{row.mppt2V}</TableCell>
                  <TableCell>{row.mppt3A}</TableCell>
                  <TableCell>{row.mppt3V}</TableCell>
                  <TableCell>{row.mppt4A}</TableCell>
                  <TableCell>{row.mppt4V}</TableCell>
                  <TableCell>{row.gewichtAkku}</TableCell>
                  <TableCell>{row.gewichtLaderegler}</TableCell>
                  <TableCell>{row.akkuLaenge}</TableCell>
                  <TableCell>{row.akkuBreite}</TableCell>
                  <TableCell>{row.akkuHoehe}</TableCell>
                  <TableCell>{row.ladereglerLaenge}</TableCell>
                  <TableCell>{row.ladereglerBreite}</TableCell>
                  <TableCell>{row.ladereglerHoehe}</TableCell>
                  <TableCell>{row.bt ? 'Ja' : 'Nein'}</TableCell>
                  <TableCell>{row.wifi}</TableCell>
                  <TableCell>{row.app}</TableCell>
                  <TableCell>{row.cloud}</TableCell>
                  <TableCell>{row.mqttCloud}</TableCell>
                  <TableCell>{row.heizung}</TableCell>
                  <TableCell>{row.ipKlasse}</TableCell>
                  <TableCell>{row.notstrom}</TableCell>
                  <TableCell>{row.maxAusgang}</TableCell>
                  <TableCell>{row.shellyPro}</TableCell>
                  <TableCell>{row.wechselrichter}</TableCell>
                  <TableCell>{row.bidirektional}</TableCell>
                  <TableCell>{row.ladeanschluss}</TableCell>
                  <TableCell>{row.website}</TableCell>
                  <TableCell>{row.amazon}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
