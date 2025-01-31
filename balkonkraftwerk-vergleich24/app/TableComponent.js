import React, { useState } from 'react';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    TablePagination, 
    Paper,
    TableSortLabel,
 } from '@mui/material';

 import rows from './products.json';
 import TableFilters from './TableFilters';

export default function MaterialUITable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5); 
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const [minAkkukapazitaet, setMinAkkukapazitaet] = useState("");
    const [minEingang, setMinEingang] = useState("");
    const [filters, setFilters] = useState({
      app: false,
      bt: false,
      wifi: false,
      cloud: false,
      erweiterbar: false,
      mqttCloud: false,
      heizung: false,
      notstrom: false,
      shellyPro: false,
      wechselrichter: false,
      bidirektional: false,
      ladeanschluss: false,
  });

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
      };
    
      const stableSort = (array, comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
          const order = comparator(a[0], b[0]);
          if (order !== 0) return order;
          return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
      };
    
      const descendingComparator = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
          return -1;
        }
        if (b[orderBy] > a[orderBy]) {
          return 1;
        }
        return 0;
      };
    
      const getComparator = (order, orderBy) => {
        return order === 'desc'
          ? (a, b) => descendingComparator(a, b, orderBy)
          : (a, b) => -descendingComparator(a, b, orderBy);
      };
    
      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

    // Filterlogik: Zeige nur Produkte, die die Checkboxen erfüllen--------------
    const filteredRows = rows.filter((row) => {
      let showRow = true;
      if (filters.app && !row.app) showRow = false;
      if (filters.bt && !row.bt) showRow = false;
      if (filters.wifi && !row.wifi) showRow = false;
      if (filters.cloud && !row.cloud) showRow = false;
      if (filters.erweiterbar && !row.erweiterbar) showRow = false;
      if (filters.mqttCloud && !row.mqttCloud) showRow = false;
      if (filters.heizung && !row.heizung) showRow = false;
      if (filters.notstrom && !row.notstrom) showRow = false;
      if (filters.shellyPro && !row.shellyPro) showRow = false;
      if (filters.wechselrichter && !row.wechselrichter) showRow = false;
      if (filters.bidirektional && !row.bidirektional) showRow = false;
      if (filters.ladeanschluss && !row.ladeanschluss) showRow = false;
      
      // Akkukapazität filtern
      const minAkkukapazitaetValue = parseInt(minAkkukapazitaet, 10); // Eingabe des Users umwandeln
      const rowAkkukapazitaetValue = parseInt(row.akkukapazitaet, 10); // JSON-Daten umwandeln
      
      //console.log(`Eingabe Min Akku: ${minAkkukapazitaetValue}, Produkt Akku: ${rowAkkukapazitaetValue}`);

      //Mindest Akkukapazität
      if (!isNaN(minAkkukapazitaetValue) && !isNaN(rowAkkukapazitaetValue)) {
        if (rowAkkukapazitaetValue < minAkkukapazitaetValue) {
            showRow = false;
        }
      }

      const minEingangValue = parseInt(minEingang, 10);
      const rowEingangValue = parseInt(row.maxEingang, 10);

      //Mindest Eingang Filter
      if (!isNaN(minEingangValue) && !isNaN(rowEingangValue)) {
        if (rowEingangValue < minEingangValue) {
          showRow = false;
        }
      }

      return showRow;
  });
    
      const visibleRows = stableSort(filteredRows, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div>
            <TableFilters filters={filters} setFilters={setFilters} minAkkukapazitaet={minAkkukapazitaet} setMinAkkukapazitaet={setMinAkkukapazitaet} minEingang={minEingang} setMinEingang={setMinEingang}/>
    <Paper elevation={5} sx={{ width: '100%', overflow: 'hidden', marginTop: '10px', marginBottom: '20px'}}>
      <TableContainer sx={{ maxHeight: 440, overflowX: 'auto' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              

              <TableCell style={{ width: 150 }} sortDirection={orderBy === 'name' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={(event) => handleRequestSort(event, 'name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              
              <TableCell style={{ width: 150 }} sortDirection={orderBy === 'akkukapazitaet' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'akkukapazitaet'}
                  direction={orderBy === 'akkukapazitaet' ? order : 'asc'}
                  onClick={(event) => handleRequestSort(event, 'akkukapazitaet')}
                >
                  Akkukapazität
                </TableSortLabel>
              </TableCell>
              
              <TableCell style={{ width: 150 }} sortDirection={orderBy === 'maxKapazitaet' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'maxKapazitaet'}
                  direction={orderBy === 'maxKapazitaet' ? order : 'asc'}
                  onClick={(event) => handleRequestSort(event, 'maxKapazitaet')}
                >
                 Max. Kapazität
                </TableSortLabel>
              </TableCell>

              <TableCell style={{ width: 150 }} sortDirection={orderBy === 'erweiterbar' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'erweiterbar'}
                  direction={orderBy === 'erweiterbar' ? order : 'asc'}
                  onClick={(event) => handleRequestSort(event, 'erweiterbar')}
                >
                 Erweiterbar
                </TableSortLabel>
              </TableCell>
              
              <TableCell style={{ width: 150 }} sortDirection={orderBy === 'ladezyklen' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'ladezyklen'}
                  direction={orderBy === 'ladezyklen' ? order : 'asc'}
                  onClick={(event) => handleRequestSort(event, 'ladezyklen')}
                >
                 Ladezyklen
                </TableSortLabel>
              </TableCell>

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
            {visibleRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index} tabIndex={-1}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.akkukapazitaet}</TableCell>
                  <TableCell>{row.maxKapazitaet}</TableCell>
                  <TableCell>{row.erweiterbar ? 'Ja' : 'Nein'}</TableCell>
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
                  <TableCell>{row.wifi ? 'Ja' : 'Nein'}</TableCell>
                  <TableCell>{row.app ? 'Ja' : 'Nein'}</TableCell>
                  <TableCell>{row.cloud ? 'Ja' : 'Nein'}</TableCell>
                  <TableCell>{row.mqttCloud ? 'Ja' : 'Nein'}</TableCell>
                  <TableCell>{row.heizung ? 'Ja' : 'Nein'}</TableCell>
                  <TableCell>{row.ipKlasse}</TableCell>
                  <TableCell>{row.notstrom ? 'Ja' : 'Nein'}</TableCell>
                  <TableCell>{row.maxAusgang}</TableCell>
                  <TableCell>{row.shellyPro ? 'Ja' : 'Nein'}</TableCell>
                  <TableCell>{row.wechselrichter ? 'Ja' : 'Nein'}</TableCell>
                  <TableCell>{row.bidirektional ? 'Ja' : 'Nein'}</TableCell>
                  <TableCell>{row.ladeanschluss ? 'Ja' : 'Nein'}</TableCell>
                  <TableCell>
                      <a href={row.website} target="_blank" rel="noopener noreferrer">Hersteller-Link</a>
                  </TableCell>
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
    </div>
  );
}
