import React, { useState, useEffect } from 'react';
import Link from "next/link";
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
    Box,
    Button,
    Stack
 } from '@mui/material';

 import rows from './products.json';
 import TableFilters from './TableFilters';
 import TableUserSettings from './TableUserSettings';
import AmazonPrice from "./api/amazon/AmazonPrice";

export default function MaterialUITable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10); 
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

  // 🟢 **STATE für Sichtbare Spalten**
  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    akkukapazitaet: true,
    maxKapazitaet: true,
    erweiterbar: true,
    ladezyklen: true,
    garantie: true,
    anzahlMPPT: true,
    maxEingang: true,
    solarErweiterbar: true,
    asin: true,
  });

  const [priceCache, setPriceCache] = useState({});
  const [cacheLoaded, setCacheLoaded] = useState(false);

  useEffect(() => {
    async function loadCache() {
      try {
        const res = await fetch('/api/amazon/cache');
        const data = await res.json();
        setPriceCache(data);
      } catch {
        // ignore errors, we will fallback to live fetches
      } finally {
        setCacheLoaded(true);
      }
    }
    loadCache();
  }, []);


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
      if (filters.homeassistent && !row.homeassistent) showRow = false;
      if (filters.wechselrichter && !row.wechselrichter) showRow = false;
      
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
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Erste Zeile: Filter und Einstellungen */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Container für Filter und Einstellungen*/}
          <Box sx={{ flexGrow: 1, minWidth: "300px" }}>
            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
              <TableFilters
                filters={filters}
                setFilters={setFilters}
                minAkkukapazitaet={minAkkukapazitaet}
                setMinAkkukapazitaet={setMinAkkukapazitaet}
                minEingang={minEingang}
                setMinEingang={setMinEingang}
              />
              <TableUserSettings
                visibleColumns={visibleColumns}
                setVisibleColumns={setVisibleColumns}
              />
            </Stack>
          </Box>

          {/* Fester Container für den Bug-Melden-Button */}
          <Box sx={{ flexShrink: 0 }}>
            <Button
              variant="outlined"
              sx={{ minWidth: "150px", backgroundColor: "#eb5656", color: "black" }}
              onClick={() => {
                const subject = encodeURIComponent("Bug melden");
                const body = encodeURIComponent(
                  `Browser: \nMobile/PC: \nTechnischer Fehler: \nInhaltlicher Fehler: \nSonstiges: \n`
                );
                window.location.href = `mailto:lfsanja@gmail.com?subject=${subject}&body=${body}`;
              }}
            >
              Bug melden
            </Button>
          </Box>
        </Box>
        {/* Falls du noch weitere Inhalte hast, können diese hier folgen */}
      </Box>

      <Paper elevation={5} sx={{ width: '100%', overflow: 'hidden', marginTop: '10px', marginBottom: '20px'}}>
        <TableContainer sx={{ maxHeight: 680, overflowX: 'auto' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                
              {visibleColumns.name && (
                <TableCell style={{ width: 150 }} sortDirection={orderBy === "name" ? order : false}>
                  <TableSortLabel
                    active={orderBy === "name"}
                    direction={orderBy === "name" ? order : "asc"}
                    onClick={(event) => handleRequestSort(event, "name")}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
              )}
                
                {visibleColumns.akkukapazitaet && (
                <TableCell style={{ width: 150 }} sortDirection={orderBy === 'akkukapazitaet' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'akkukapazitaet'}
                    direction={orderBy === 'akkukapazitaet' ? order : 'asc'}
                    onClick={(event) => handleRequestSort(event, 'akkukapazitaet')}
                  >
                    Akkukapazität
                  </TableSortLabel>
                </TableCell>
                )}

                {visibleColumns.maxKapazitaet && (
                <TableCell style={{ width: 150 }} sortDirection={orderBy === 'maxKapazitaet' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'maxKapazitaet'}
                    direction={orderBy === 'maxKapazitaet' ? order : 'asc'}
                    onClick={(event) => handleRequestSort(event, 'maxKapazitaet')}
                  >
                  Max. Kapazität
                  </TableSortLabel>
                </TableCell>
                )}

                {visibleColumns.erweiterbar && (
                <TableCell style={{ width: 150 }} sortDirection={orderBy === 'erweiterbar' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'erweiterbar'}
                    direction={orderBy === 'erweiterbar' ? order : 'asc'}
                    onClick={(event) => handleRequestSort(event, 'erweiterbar')}
                  >
                  Erweiterbar
                  </TableSortLabel>
                </TableCell>
                )}
                
                {visibleColumns.ladezyklen && (
                <TableCell style={{ width: 150 }} sortDirection={orderBy === 'ladezyklen' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'ladezyklen'}
                    direction={orderBy === 'ladezyklen' ? order : 'asc'}
                    onClick={(event) => handleRequestSort(event, 'ladezyklen')}
                  >
                  Ladezyklen
                  </TableSortLabel>
                </TableCell>
                )}

                {visibleColumns.garantie && (
                <TableCell style={{ width: 150 }}>Garantie</TableCell>
                )}
                {visibleColumns.anzahlMPPT && (
                <TableCell style={{ width: 150 }}>Anzahl MPPT</TableCell>
                )}
                {visibleColumns.maxMC4 && (
                <TableCell style={{ width: 150 }}>Max. MC4</TableCell>
              )}
                {visibleColumns.maxEingang && (
                <TableCell style={{ width: 150 }}>Max Eingang</TableCell>
              )}
                {visibleColumns.maxEingangModule && (
                <TableCell style={{ width: 150 }}>Max Eingang Module</TableCell>
              )}
                {visibleColumns.solarErweiterbar && (
                <TableCell style={{ width: 150 }}>Solar Erweiterbar</TableCell>
              )}
                {visibleColumns.mppt1A && (
                <TableCell style={{ width: 150 }}>MPPT 1 Max A</TableCell>
              )}
                {visibleColumns.mppt1V && (
                <TableCell style={{ width: 150 }}>MPPT 1 Max V</TableCell>
              )}
                {visibleColumns.mppt2A && (
                <TableCell style={{ width: 150 }}>MPPT 2 Max A</TableCell>
              )}
                {visibleColumns.mppt2V && (
                <TableCell style={{ width: 150 }}>MPPT 2 Max V</TableCell>
              )}
                {visibleColumns.mppt3A && (
                <TableCell style={{ width: 150 }}>MPPT 3 Max A</TableCell>
              )}
                {visibleColumns.mppt3V && (
                <TableCell style={{ width: 150 }}>MPPT 3 Max V</TableCell>
              )}
                {visibleColumns.mppt4A && (
                <TableCell style={{ width: 150 }}>MPPT 4 Max A</TableCell>
              )}
                {visibleColumns.mppt4V && (
                <TableCell style={{ width: 150 }}>MPPT 4 Max V</TableCell>
              )}
                {visibleColumns.gewichtAkku && (
                <TableCell style={{ width: 150 }}>Gewicht Akkueinheit</TableCell>
              )}
                {visibleColumns.gewichtLaderegler && (
                <TableCell style={{ width: 150 }}>Gewicht Laderegler</TableCell>
              )}
                {visibleColumns.akkuLaenge && (
                <TableCell style={{ width: 150 }}>Akkueinheit Länge</TableCell>
              )}
                {visibleColumns.akkuBreite && (
                <TableCell style={{ width: 150 }}>Akkueinheit Breite</TableCell>
              )}
                {visibleColumns.akkuHoehe && (
                <TableCell style={{ width: 150 }}>Akkueinheit Höhe</TableCell>
              )}
                {visibleColumns.ladereglerLaenge && (
                <TableCell style={{ width: 150 }}>Laderegler Länge</TableCell>
              )}
                {visibleColumns.ladereglerBreite && (
                <TableCell style={{ width: 150 }}>Laderegler Breite</TableCell>
              )}
                {visibleColumns.ladereglerHoehe && (
                <TableCell style={{ width: 150 }}>Laderegler Höhe</TableCell>
              )}
                {visibleColumns.bt && (
                <TableCell style={{ width: 150 }}>Bluetooth</TableCell>
              )}
                {visibleColumns.wifi && (
                <TableCell style={{ width: 150 }}>WiFi</TableCell>
              )}
                {visibleColumns.app && (
                <TableCell style={{ width: 150 }}>App</TableCell>
                )}
                {visibleColumns.cloud && (
                <TableCell style={{ width: 150 }}>Cloud</TableCell>
              )}
                {visibleColumns.mqttCloud && (
                <TableCell style={{ width: 150 }}>MQTT Cloud</TableCell>
              )}
                {visibleColumns.heizung && (
                <TableCell style={{ width: 150 }}>Heizung</TableCell>
              )}
                {visibleColumns.ipKlasse && (
                <TableCell style={{ width: 150 }}>IP Klasse</TableCell>
              )}
                {visibleColumns.notstrom && (
                <TableCell style={{ width: 150 }}>Notstrom</TableCell>
              )}
                {visibleColumns.maxAusgang && (
                <TableCell style={{ width: 150 }}>Max Ausgang</TableCell>
              )}
                {visibleColumns.shellyPro && (
                <TableCell style={{ width: 150 }}>Shelly Pro 3 EM</TableCell>
              )}
              {visibleColumns.homeassistent && (
                <TableCell style={{ width: 150 }}>Home Assistent</TableCell>
              )}
                {visibleColumns.wechselrichter && (
                <TableCell style={{ width: 150 }}>Mit Wechselrichter</TableCell>
              )}
                {visibleColumns.bidirektional && (
                <TableCell style={{ width: 150 }}>Bidirektional</TableCell>
              )}
                {visibleColumns.ladeanschluss && (
                <TableCell style={{ width: 150 }}>230V Ladeanschluss</TableCell>
              )}
                {visibleColumns.ladeanschluss && (
                <TableCell style={{ width: 150 }}>Website</TableCell>
                )}

                {visibleColumns.asin && (
                  <TableCell style={{ width: 150 }} sortDirection={orderBy === 'asin' ? order : false}>
                    <TableSortLabel
                      active={orderBy === 'asin'}
                      direction={orderBy === 'asin' ? order : 'asc'}
                      onClick={(event) => handleRequestSort(event, 'asin')}
                    >Preis</TableSortLabel>
                  
                  
                  </TableCell>
                )}
                <TableCell style={{ width: 150 }}>Amazon</TableCell>
                
              
              </TableRow>
            </TableHead>

            <TableBody>
              {/* Rendering Rows */}
              {visibleRows.map((row, index) => (
                <TableRow key={index} tabIndex={-1}>
                  {visibleColumns.name && (
                    <TableCell>
                      <Link
                        href={`/product/${row.id}`}
                        style={{ textDecoration: "none", color: "inherit", fontWeight: "bold" }}
                      >
                        {row.name}
                      </Link>
                    </TableCell>
                  )}        
                    {visibleColumns.akkukapazitaet && <TableCell>{row.akkukapazitaet}</TableCell>}
                    {visibleColumns.maxKapazitaet && <TableCell>{row.maxKapazitaet}</TableCell>}
                    {visibleColumns.erweiterbar && (<TableCell>{row.erweiterbar ? 'Ja' : 'Nein'}</TableCell>)}
                    {visibleColumns.ladezyklen && <TableCell>{row.ladezyklen}</TableCell>}
                    {visibleColumns.garantie && <TableCell>{row.garantie}</TableCell>}
                    {visibleColumns.anzahlMPPT && <TableCell>{row.anzahlMPPT}</TableCell>}
                    {visibleColumns.maxMC4 && <TableCell>{row.maxMC4}</TableCell>}
                    {visibleColumns.maxEingang && <TableCell>{row.maxEingang}</TableCell>}
                    {visibleColumns.maxEingangModule && <TableCell>{row.maxEingangModule}</TableCell>}
                    {visibleColumns.solarErweiterbar && (<TableCell>{row.solarErweiterbar ? 'Ja' : 'Nein'}</TableCell>)}
                    {visibleColumns.mppt1A && <TableCell>{row.mppt1A}</TableCell>}
                    {visibleColumns.mppt1V && <TableCell>{row.mppt1V}</TableCell>}
                    {visibleColumns.mppt2A && <TableCell>{row.mppt2A}</TableCell>}
                    {visibleColumns.mppt2V && <TableCell>{row.mppt2V}</TableCell>}
                    {visibleColumns.mppt3A && <TableCell>{row.mppt3A}</TableCell>}
                    {visibleColumns.mppt3V && <TableCell>{row.mppt3V}</TableCell>}
                    {visibleColumns.mppt4A && <TableCell>{row.mppt4A}</TableCell>}
                    {visibleColumns.mppt4V && <TableCell>{row.mppt4V}</TableCell>}
                    {visibleColumns.gewichtAkku && <TableCell>{row.gewichtAkku}</TableCell>}
                    {visibleColumns.gewichtLaderegler && <TableCell>{row.gewichtLaderegler}</TableCell>}
                    {visibleColumns.akkuLaenge && <TableCell>{row.akkuLaenge}</TableCell>}
                    {visibleColumns.akkuBreite && <TableCell>{row.akkuBreite}</TableCell>}
                    {visibleColumns.akkuHoehe && <TableCell>{row.akkuHoehe}</TableCell>}
                    {visibleColumns.ladereglerLaenge && <TableCell>{row.ladereglerLaenge}</TableCell>}
                    {visibleColumns.ladereglerBreite && <TableCell>{row.ladereglerBreite}</TableCell>}
                    {visibleColumns.ladereglerHoehe && <TableCell>{row.ladereglerHoehe}</TableCell>}
                    {visibleColumns.bt && (<TableCell>{row.bt ? 'Ja' : 'Nein'}</TableCell>)}
                    {visibleColumns.wifi && (<TableCell>{row.wifi ? 'Ja' : 'Nein'}</TableCell>)}
                    {visibleColumns.app && (<TableCell>{row.app ? 'Ja' : 'Nein'}</TableCell>)}
                    {visibleColumns.cloud && (<TableCell>{row.cloud ? 'Ja' : 'Nein'}</TableCell>)}
                    {visibleColumns.mqttCloud && (<TableCell>{row.mqttCloud ? 'Ja' : 'Nein'}</TableCell>)}
                    {visibleColumns.heizung && (<TableCell>{row.heizung ? 'Ja' : 'Nein'}</TableCell>)}
                    {visibleColumns.ipKlasse && <TableCell>{row.ipKlasse}</TableCell>}
                    {visibleColumns.notstrom && (<TableCell>{row.notstrom ? 'Ja' : 'Nein'}</TableCell>)}
                    {visibleColumns.maxAusgang && <TableCell>{row.maxAusgang}</TableCell>}
                    {visibleColumns.shellyPro && (<TableCell>{row.shellyPro ? 'Ja' : 'Nein'}</TableCell>)}
                    {visibleColumns.homeassistent && (<TableCell>{row.homeassistent ? 'Ja' : 'Nein'}</TableCell>)}
                    {visibleColumns.wechselrichter && (<TableCell>{row.wechselrichter ? 'Ja' : 'Nein'}</TableCell>)}
                    {visibleColumns.bidirektional && (<TableCell>{row.bidirektional ? 'Ja' : 'Nein'}</TableCell>)}
                    {visibleColumns.ladeanschluss && (<TableCell>{row.ladeanschluss ? 'Ja' : 'Nein'}</TableCell>)}
                    {visibleColumns.website && (<TableCell>
                        <Link href={row.website} underline="hover" target="_blank" rel="noopener noreferrer">{'Hersteller Seite'}</Link>
                    </TableCell>)}
                      
                    <TableCell style={{ width: 150 }}>
                      <AmazonPrice asin={row.asin} cached={priceCache[row.asin]} cacheLoaded={cacheLoaded} />
                    </TableCell>

                    <TableCell>
                      {row.amazon && row.amazon !== "-" ? (
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#FFD814", // Amazon-Gelb
                            color: "#111", // Dunkle Amazon-Schrift
                            "&:hover": {
                              backgroundColor: "#F7CA00", // Dunkleres Gelb beim Hover
                            },
                            fontWeight: "bold",
                            textTransform: "none",
                            padding: "8px 16px",
                            fontSize: "12px",
                            borderRadius: "8px",
                            width: "100%",
                            
                          }}
                          href={row.amazon}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          🔎 Preis Prüfen *
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          disabled
                          sx={{
                            backgroundColor: "#B0B0B0", // Grauer Button, wenn kein Link vorhanden
                            color: "#666",
                            fontWeight: "bold",
                            textTransform: "none",
                            padding: "8px 16px",
                            fontSize: "12px",
                            borderRadius: "8px",
                            width: "100%",
                          }}
                        >
                          ❌ Nicht verfügbar
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Zeilen pro Seite:"
        />
      </Paper>
    </div>
  );
}
