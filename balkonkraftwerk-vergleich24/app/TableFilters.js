import React, {useState} from 'react';
import { Checkbox, FormGroup, FormControlLabel, Divider } from '@mui/material';
import { blue } from '@mui/material/colors';
import InputAdornment from '@mui/material/InputAdornment';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import TextField from '@mui/material/TextField';
import PowerIcon from '@mui/icons-material/Power';

export default function TableFilters({ filters, setFilters, minAkkukapazitaet, setMinAkkukapazitaet, minEingang, setMinEingang }) {
    const [showFilters, setShowFilters] = useState(false);

    //--------------------Checkbox Eigenschaften-------------------------
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: checked,
        }));
    };

    const toggleFilters = () => {
        setShowFilters((prev) => !prev);  
    };
    
    //-----------------------------------------------------------------
    
    //--------------------Filter MinKapazität--------------------------
    const handleAkkukapazitaetChange = (event) => {
        setMinAkkukapazitaet(event.target.value);  // Speichern des Werts der minimalen Akkukapazität
    };
    //-----------------------------------------------------------------

    //--------------------Filter MinEingang----------------------------
    const handleEingangChange = (event) => {
        setMinEingang(event.target.value);
    };


    return (
        <div>
            <Button name="filterButton" variant="contained" onClick={toggleFilters} startIcon={<FilterAltIcon />}>
                {showFilters ? 'Filter Verbergen' : 'Eigenschaften Filtern'}
            </Button>                    
            
            {/*Ein und Ausklappen der Filter*/}
            {showFilters && (
                <Paper elevation={5} sx={{ width: '100%', marginTop: '10px', padding: '15px' }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: '10px', marginBottom: '20px' }}>
                    <FormGroup sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', padding: '15px' }}>

                    <Box sx={{marginBottom: '10px'}}>
                    <p>Hier kannst du die Eigenschaften filtern.</p>
                    <p>Beispiel: Wenn dein Balkonspeicher unbedingt eine App haben muss, aktiviere 
                        die Checkbox "App". Dann werden nur Balkonspeicher angezeigt, die eine App unterstützen. Du kannst beliebig viele Filter gleichzeitig nutzen.
                    </p>
                    </Box>
                    
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="erweiterbar"
                                    checked={filters.erweiterbar}
                                    onChange={handleCheckboxChange}
                                    inputProps={{ 'aria-label': 'Erweiterbar filter' }}
                                    sx={{ color: blue[800] }}
                                />
                            }
                            label="Erweiterbar"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="app"
                                    checked={filters.app}
                                    onChange={handleCheckboxChange}
                                    inputProps={{ 'aria-label': 'App filter' }}
                                    sx={{ color: blue[800] }}
                                />
                            }
                            label="App"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="bt"
                                    checked={filters.bt}
                                    onChange={handleCheckboxChange}
                                    inputProps={{ 'aria-label': 'Bluetooth filter' }}
                                    sx={{ color: blue[800] }}
                                />
                            }
                            label="Bluetooth"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="wifi"
                                    checked={filters.wifi}
                                    onChange={handleCheckboxChange}
                                    inputProps={{ 'aria-label': 'WiFi filter' }}
                                    sx={{ color: blue[800] }}
                                />
                            }
                            label="WiFi"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="cloud"
                                    checked={filters.cloud}
                                    onChange={handleCheckboxChange}
                                    inputProps={{ 'aria-label': 'Cloud filter' }}
                                    sx={{ color: blue[800] }}
                                />
                            }
                            label="Cloud"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="mqttCloud"
                                    checked={filters.mqttCloud}
                                    onChange={handleCheckboxChange}
                                    inputProps={{ 'aria-label': 'MQTT Cloud filter' }}
                                    sx={{ color: blue[800] }}
                                />
                            }
                            label="MQTT Cloud"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="heizung"
                                    checked={filters.heizung}
                                    onChange={handleCheckboxChange}
                                    inputProps={{ 'aria-label': 'Heizung' }}
                                    sx={{ color: blue[800] }}
                                />
                            }
                            label="Heizung"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="notstrom"
                                    checked={filters.notstrom}
                                    onChange={handleCheckboxChange}
                                    inputProps={{ 'aria-label': 'Notstrom' }}
                                    sx={{ color: blue[800] }}
                                />
                            }
                            label="Notstrom"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="shellyPro"
                                    checked={filters.shellyPro}
                                    onChange={handleCheckboxChange}
                                    inputProps={{ 'aria-label': 'ShellyPro' }}
                                    sx={{ color: blue[800] }}
                                />
                            }
                            label="Shelly Pro 3 EM"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="wechselrichter"
                                    checked={filters.wechselrichter}
                                    onChange={handleCheckboxChange}
                                    inputProps={{ 'aria-label': 'Wechselrichter' }}
                                    sx={{ color: blue[800] }}
                                />
                            }
                            label="Integrierter Wechselrichter"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="bidirektional"
                                    checked={filters.bidirektional}
                                    onChange={handleCheckboxChange}
                                    inputProps={{ 'aria-label': 'Bidirektional' }}
                                    sx={{ color: blue[800] }}
                                />
                            }
                            label="Bidirektionales Laden"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="ladeanschluss"
                                    checked={filters.ladeanschluss}
                                    onChange={handleCheckboxChange}
                                    inputProps={{ 'aria-label': 'Ladeanschluss' }}
                                    sx={{ color: blue[800] }}
                                />
                            }
                            label="Ladeanschluss vorhanden"
                        />

                        <Box sx={{display: 'flex', flexDirection: 'row'}}>
                        <TextField
                            sx={{marginTop:'15px', marginRight: '10px'}}
                            label="Minimale Akkukapazität in Wh"
                            variant="outlined" // Oder "filled" für ein anderes Design
                            fullWidth
                            value={minAkkukapazitaet}
                            onChange={handleAkkukapazitaetChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <BatteryChargingFullIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            sx={{marginTop:'15px'}}
                            label="Maximaler Eingang"
                            variant="outlined" 
                            fullWidth
                            value={minEingang}
                            onChange={handleEingangChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PowerIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        </Box>
                    </FormGroup>
                </Box>
            </Paper>
            )}
        </div>
    );
}
