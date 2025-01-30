import React from 'react';
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

export default function MaterialUITable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5); 
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');

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
    
      const visibleRows = stableSort(rows, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440, overflowX: 'auto' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {/* Table Headers with fixed widths */}
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
  );
}
