// Aircraft Configuration Data Structure
// This manages aircraft per organization

const AIRCRAFT_DATABASE = {
    // Organization: Highveld Mushrooms
    'highveld': {
        aircraft: [
            {
                id: 'aircraft_001',
                registration: 'ZS-AAM',
                model: 'Beechcraft Premier 1A',
                serialNumber: '123456',
                category: 'Jet',
                engines: 2,
                fuelType: 'JETA-1',
                oilUnit: 'QT',
                fuelBurnUnit: 'KG',
                fuelUpliftUnit: 'L',
                cruisingSpeed: 450,
                fuelBurnPerHour: 120,
                active: true
            }
        ]
    },
    
    // Organization: McCormick
    'mccormick': {
        aircraft: [
            {
                id: 'aircraft_002',
                registration: 'ZS-MPT',
                model: 'Super King Air B300 360',
                serialNumber: '789012',
                category: 'Turboprop',
                engines: 2,
                fuelType: 'JETA-1',
                oilUnit: 'QT',
                fuelBurnUnit: 'KG',
                fuelUpliftUnit: 'L',
                cruisingSpeed: 310,
                fuelBurnPerHour: 85,
                active: true
            }
        ]
    },
    
    // Organization: Barrick Aviation
    'barrick': {
        aircraft: [
            {
                id: 'aircraft_003',
                registration: 'ZS-BGM',
                model: 'Beechcraft King Air',
                serialNumber: '345678',
                category: 'Turboprop',
                engines: 2,
                fuelType: 'JETA-1',
                oilUnit: 'QT',
                fuelBurnUnit: 'KG',
                fuelUpliftUnit: 'L',
                cruisingSpeed: 290,
                fuelBurnPerHour: 75,
                active: true
            },
            {
                id: 'aircraft_004',
                registration: 'ZS-BGO',
                model: 'Beechcraft King Air',
                serialNumber: '345679',
                category: 'Turboprop',
                engines: 2,
                fuelType: 'JETA-1',
                oilUnit: 'QT',
                fuelBurnUnit: 'KG',
                fuelUpliftUnit: 'L',
                cruisingSpeed: 290,
                fuelBurnPerHour: 75,
                active: true
            },
            {
                id: 'aircraft_005',
                registration: 'ZS-CGO',
                model: 'Beechcraft King Air',
                serialNumber: '345680',
                category: 'Turboprop',
                engines: 2,
                fuelType: 'JETA-1',
                oilUnit: 'QT',
                fuelBurnUnit: 'KG',
                fuelUpliftUnit: 'L',
                cruisingSpeed: 290,
                fuelBurnPerHour: 75,
                active: true
            },
            {
                id: 'aircraft_006',
                registration: 'ZS-KGM',
                model: 'Textron Cessna Caravan 208',
                serialNumber: '345681',
                category: 'Turboprop',
                engines: 1,
                fuelType: 'JETA-1',
                oilUnit: 'QT',
                fuelBurnUnit: 'KG',
                fuelUpliftUnit: 'L',
                cruisingSpeed: 175,
                fuelBurnPerHour: 55,
                active: true
            }
        ]
    }
};

// Initialize aircraft database
function initializeAircraftDatabase() {
    if (!localStorage.getItem('flywatch_aircraft')) {
        localStorage.setItem('flywatch_aircraft', JSON.stringify(AIRCRAFT_DATABASE));
    }
}

// Get all aircraft database
function getAllAircraftDatabase() {
    const stored = localStorage.getItem('flywatch_aircraft');
    return stored ? JSON.parse(stored) : AIRCRAFT_DATABASE;
}

// Get aircraft for a specific organization
function getOrgAircraft(orgKey) {
    const db = getAllAircraftDatabase();
    return db[orgKey]?.aircraft || [];
}

// Get aircraft by registration
function getAircraftByRegistration(registration) {
    const db = getAllAircraftDatabase();
    for (const org in db) {
        const aircraft = db[org].aircraft.find(a => a.registration === registration);
        if (aircraft) return aircraft;
    }
    return null;
}

// Add aircraft to organization
function addAircraft(orgKey, aircraftData) {
    const db = getAllAircraftDatabase();
    if (!db[orgKey]) {
        db[orgKey] = { aircraft: [] };
    }
    
    aircraftData.id = 'aircraft_' + Date.now();
    db[orgKey].aircraft.push(aircraftData);
    localStorage.setItem('flywatch_aircraft', JSON.stringify(db));
    return true;
}

// Update aircraft
function updateAircraft(registration, updates) {
    const db = getAllAircraftDatabase();
    for (const org in db) {
        const index = db[org].aircraft.findIndex(a => a.registration === registration);
        if (index !== -1) {
            db[org].aircraft[index] = { ...db[org].aircraft[index], ...updates };
            localStorage.setItem('flywatch_aircraft', JSON.stringify(db));
            return true;
        }
    }
    return false;
}

// Delete aircraft
function deleteAircraft(registration) {
    const db = getAllAircraftDatabase();
    for (const org in db) {
        const index = db[org].aircraft.findIndex(a => a.registration === registration);
        if (index !== -1) {
            db[org].aircraft.splice(index, 1);
            localStorage.setItem('flywatch_aircraft', JSON.stringify(db));
            return true;
        }
    }
    return false;
}

// Map aircraft registration to org key
function getAircraftOrgKey(registration) {
    if (registration.includes('AAM')) return 'highveld';
    if (registration.includes('MPT')) return 'mccormick';
    return 'barrick';
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AIRCRAFT_DATABASE,
        initializeAircraftDatabase,
        getAllAircraftDatabase,
        getOrgAircraft,
        getAircraftByRegistration,
        addAircraft,
        updateAircraft,
        deleteAircraft,
        getAircraftOrgKey
    };
}
