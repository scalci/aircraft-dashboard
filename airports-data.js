// Airport Database - OurAirports Format
// Full database would be loaded from API, this is a sample for South Africa + common international airports

const AIRPORTS_DATABASE = [
    // South Africa - Major Airports
    { icao: 'FALA', iata: 'HLA', name: 'Lanseria International Airport', city: 'Johannesburg', country: 'South Africa', lat: -25.9385, lon: 27.9261, elevation: 4517 },
    { icao: 'FAOR', iata: 'JNB', name: 'OR Tambo International Airport', city: 'Johannesburg', country: 'South Africa', lat: -26.1392, lon: 28.2460, elevation: 5558 },
    { icao: 'FACT', iata: 'CPT', name: 'Cape Town International Airport', city: 'Cape Town', country: 'South Africa', lat: -33.9715, lon: 18.6021, elevation: 151 },
    { icao: 'FADN', iata: 'DUR', name: 'King Shaka International Airport', city: 'Durban', country: 'South Africa', lat: -29.6144, lon: 31.1197, elevation: 295 },
    { icao: 'FAPE', iata: 'PLZ', name: 'Port Elizabeth Airport', city: 'Port Elizabeth', country: 'South Africa', lat: -33.9849, lon: 25.6173, elevation: 226 },
    { icao: 'FABL', iata: 'BFN', name: 'Bram Fischer International Airport', city: 'Bloemfontein', country: 'South Africa', lat: -29.0927, lon: 26.3024, elevation: 4458 },
    { icao: 'FAGM', iata: 'GRJ', name: 'George Airport', city: 'George', country: 'South Africa', lat: -34.0056, lon: 22.3789, elevation: 648 },
    { icao: 'FAMG', iata: 'MQP', name: 'Kruger Mpumalanga International Airport', city: 'Nelspruit', country: 'South Africa', lat: -25.3832, lon: 31.1056, elevation: 2829 },
    { icao: 'FAPN', iata: 'NTY', name: 'Pilanesberg International Airport', city: 'Sun City', country: 'South Africa', lat: -25.3338, lon: 27.1734, elevation: 3412 },
    { icao: 'FAWK', iata: 'KIM', name: 'Kimberley Airport', city: 'Kimberley', country: 'South Africa', lat: -28.8028, lon: 24.7651, elevation: 3950 },
    { icao: 'FAUP', iata: 'ULD', name: 'Prince Mangosuthu Buthelezi Airport', city: 'Ulundi', country: 'South Africa', lat: -28.3206, lon: 31.4165, elevation: 1720 },
    { icao: 'FALE', iata: 'LLE', name: 'Riverside Airport', city: 'Malelane', country: 'South Africa', lat: -25.4300, lon: 31.5667, elevation: 1040 },
    { icao: 'FAPY', iata: 'PHW', name: 'Hendrik Van Eck Airport', city: 'Phalaborwa', country: 'South Africa', lat: -23.9372, lon: 31.1554, elevation: 1432 },
    { icao: 'FADD', iata: '', name: 'Wonderboom Airport', city: 'Pretoria', country: 'South Africa', lat: -25.6539, lon: 28.2242, elevation: 4095 },
    { icao: 'FAPP', iata: 'PTG', name: 'Polokwane International Airport', city: 'Polokwane', country: 'South Africa', lat: -23.8453, lon: 29.4586, elevation: 4076 },
    { icao: 'FASK', iata: 'SIS', name: 'Sishen Airport', city: 'Sishen', country: 'South Africa', lat: -27.6486, lon: 22.9993, elevation: 3848 },
    { icao: 'FAHT', iata: 'HDS', name: 'Hoedspruit Air Force Base', city: 'Hoedspruit', country: 'South Africa', lat: -24.3686, lon: 31.0487, elevation: 1743 },
    { icao: 'FAGG', iata: 'GCJ', name: 'Grand Central Airport', city: 'Johannesburg', country: 'South Africa', lat: -25.9863, lon: 28.1401, elevation: 5325 },
    
    // Neighboring Countries
    { icao: 'FYWH', iata: 'WVB', name: 'Walvis Bay Airport', city: 'Walvis Bay', country: 'Namibia', lat: -22.9799, lon: 14.6453, elevation: 299 },
    { icao: 'FYWE', iata: 'WDH', name: 'Hosea Kutako International Airport', city: 'Windhoek', country: 'Namibia', lat: -22.4799, lon: 17.4709, elevation: 5640 },
    { icao: 'FQMA', iata: 'MPM', name: 'Maputo International Airport', city: 'Maputo', country: 'Mozambique', lat: -25.9208, lon: 32.5726, elevation: 145 },
    { icao: 'FQVL', iata: 'VNX', name: 'Vilankulo Airport', city: 'Vilankulo', country: 'Mozambique', lat: -22.0184, lon: 35.3133, elevation: 46 },
    { icao: 'FBSK', iata: 'GBE', name: 'Sir Seretse Khama International Airport', city: 'Gaborone', country: 'Botswana', lat: -24.5552, lon: 25.9182, elevation: 3299 },
    { icao: 'FBMN', iata: 'MUB', name: 'Maun Airport', city: 'Maun', country: 'Botswana', lat: -19.9726, lon: 23.4311, elevation: 3093 },
    { icao: 'FZAA', iata: 'FIH', name: 'Ndjili International Airport', city: 'Kinshasa', country: 'DRC', lat: -4.3858, lon: 15.4446, elevation: 1027 },
    { icao: 'FZIC', iata: 'FBM', name: 'Lubumbashi International Airport', city: 'Lubumbashi', country: 'DRC', lat: -11.5913, lon: 27.5309, elevation: 4295 },
    { icao: 'FLKK', iata: 'LUN', name: 'Kenneth Kaunda International Airport', city: 'Lusaka', country: 'Zambia', lat: -15.3308, lon: 28.4526, elevation: 3779 },
    { icao: 'FVHA', iata: 'HRE', name: 'Robert Gabriel Mugabe International Airport', city: 'Harare', country: 'Zimbabwe', lat: -17.9318, lon: 31.0928, elevation: 4887 },
    { icao: 'FVBU', iata: 'BUQ', name: 'Joshua Mqabuko Nkomo International Airport', city: 'Bulawayo', country: 'Zimbabwe', lat: -20.0174, lon: 28.6179, elevation: 4359 },
    
    // Common International Destinations
    { icao: 'EGLL', iata: 'LHR', name: 'London Heathrow Airport', city: 'London', country: 'United Kingdom', lat: 51.4700, lon: -0.4543, elevation: 83 },
    { icao: 'LFPG', iata: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France', lat: 49.0097, lon: 2.5479, elevation: 392 },
    { icao: 'EDDF', iata: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt', country: 'Germany', lat: 50.0379, lon: 8.5622, elevation: 364 },
    { icao: 'OMDB', iata: 'DXB', name: 'Dubai International Airport', city: 'Dubai', country: 'UAE', lat: 25.2532, lon: 55.3657, elevation: 62 },
    { icao: 'HECA', iata: 'CAI', name: 'Cairo International Airport', city: 'Cairo', country: 'Egypt', lat: 30.1219, lon: 31.4056, elevation: 382 },
    { icao: 'OTHH', iata: 'DOH', name: 'Hamad International Airport', city: 'Doha', country: 'Qatar', lat: 25.2731, lon: 51.6080, elevation: 13 },
    
    // Mining/Remote Airports
    { icao: 'FAEL', iata: 'ELL', name: 'Ellisras Airport', city: 'Ellisras', country: 'South Africa', lat: -23.7278, lon: 27.6881, elevation: 2772 },
    { icao: 'FAKP', iata: 'KXE', name: 'P C Pelser Airport', city: 'Klerksdorp', country: 'South Africa', lat: -26.8711, lon: 26.7180, elevation: 4444 },
    { icao: 'FAPJ', iata: 'PRY', name: 'Wonderboom Airport', city: 'Pretoria', country: 'South Africa', lat: -25.6539, lon: 28.2242, elevation: 4095 }
];

// Initialize airport database
function initializeAirportDatabase() {
    if (!localStorage.getItem('flywatch_airports')) {
        localStorage.setItem('flywatch_airports', JSON.stringify(AIRPORTS_DATABASE));
    }
}

// Get all airports
function getAllAirports() {
    const stored = localStorage.getItem('flywatch_airports');
    return stored ? JSON.parse(stored) : AIRPORTS_DATABASE;
}

// Enhanced search - searches ICAO, IATA, name, and city
function searchAirports(query) {
    if (!query || query.length < 2) return [];
    
    const airports = getAllAirports();
    const q = query.toUpperCase();
    
    return airports.filter(airport => 
        airport.icao.toUpperCase().includes(q) ||
        (airport.iata && airport.iata.toUpperCase().includes(q)) ||
        airport.name.toUpperCase().includes(q) ||
        airport.city.toUpperCase().includes(q)
    ).slice(0, 25); // Limit to 25 results
}

// Get airport by ICAO code (exact match)
function getAirportByICAO(icao) {
    if (!icao) return null;
    const airports = getAllAirports();
    return airports.find(a => a.icao.toUpperCase() === icao.toUpperCase());
}

// Get airport by IATA code (exact match)
function getAirportByIATA(iata) {
    if (!iata) return null;
    const airports = getAllAirports();
    return airports.find(a => a.iata && a.iata.toUpperCase() === iata.toUpperCase());
}

// Get airport by any code (tries ICAO first, then IATA)
function getAirportByCode(code) {
    if (!code) return null;
    return getAirportByICAO(code) || getAirportByIATA(code);
}

// Calculate distance between two airports (Great Circle Distance - Haversine formula)
function calculateDistance(airport1, airport2, unit = 'NM') {
    if (!airport1 || !airport2) return null;
    
    const R = 3440.065; // Earth's radius in nautical miles
    
    const lat1 = airport1.lat * Math.PI / 180;
    const lat2 = airport2.lat * Math.PI / 180;
    const deltaLat = (airport2.lat - airport1.lat) * Math.PI / 180;
    const deltaLon = (airport2.lon - airport1.lon) * Math.PI / 180;
    
    const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(deltaLon/2) * Math.sin(deltaLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    let distance = R * c; // Distance in nautical miles
    
    // Convert to requested unit
    if (unit === 'KM') {
        distance = distance * 1.852; // NM to KM
    } else if (unit === 'SM') {
        distance = distance * 1.15078; // NM to statute miles
    }
    
    return Math.round(distance);
}

// Calculate distance between two airport codes (ICAO or IATA)
function calculateDistanceByCode(fromCode, toCode, unit = 'NM') {
    const airport1 = getAirportByCode(fromCode);
    const airport2 = getAirportByCode(toCode);
    
    if (!airport1 || !airport2) {
        return null;
    }
    
    return calculateDistance(airport1, airport2, unit);
}

// Get formatted airport label for dropdowns (with smart formatting)
function getAirportLabel(airport) {
    if (!airport) return '';
    
    const codes = airport.iata ? 
        `${airport.icao}/${airport.iata}` : 
        airport.icao;
    
    return `${codes} - ${airport.name} (${airport.city})`;
}

// Get short airport label (just codes and city)
function getAirportShortLabel(airport) {
    if (!airport) return '';
    
    const codes = airport.iata ? 
        `${airport.icao}/${airport.iata}` : 
        airport.icao;
    
    return `${codes} - ${airport.city}`;
}

// Validate airport code (returns airport if valid, null if not)
function validateAirportCode(code) {
    if (!code || code.length < 3) return null;
    return getAirportByCode(code);
}

// Add or update airport in database
function upsertAirport(airportData) {
    const airports = getAllAirports();
    const index = airports.findIndex(a => a.icao.toUpperCase() === airportData.icao.toUpperCase());
    
    if (index !== -1) {
        airports[index] = airportData;
    } else {
        airports.push(airportData);
    }
    
    localStorage.setItem('flywatch_airports', JSON.stringify(airports));
    return true;
}

// Delete airport from database
function deleteAirport(icao) {
    const airports = getAllAirports();
    const filtered = airports.filter(a => a.icao.toUpperCase() !== icao.toUpperCase());
    
    if (filtered.length < airports.length) {
        localStorage.setItem('flywatch_airports', JSON.stringify(filtered));
        return true;
    }
    return false;
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AIRPORTS_DATABASE,
        initializeAirportDatabase,
        getAllAirports,
        searchAirports,
        getAirportByICAO,
        getAirportByIATA,
        getAirportByCode,
        calculateDistance,
        calculateDistanceByCode,
        getAirportLabel,
        getAirportShortLabel,
        validateAirportCode,
        upsertAirport,
        deleteAirport
    };
}
