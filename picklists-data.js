// FlyWatch Picklist Data Structure
// This would normally come from a database, but for demo purposes we'll use localStorage

const PICKLISTS = {
    // AIRCRAFT PICKLISTS
    aircraft: {
        fuelType: {
            entity: 'aircraft',
            field: 'fuelType',
            values: ['JETA-1', 'AVGAS', 'MOGAS'],
            canOverride: false
        },
        fuelUpliftUnit: {
            entity: 'aircraft',
            field: 'fuelUpliftUnit',
            values: ['GAL', 'LBS', 'LT', 'KG'],
            canOverride: false
        },
        fuelBurnUnit: {
            entity: 'aircraft',
            field: 'fuelBurnUnit',
            values: ['KG', 'LBS', 'GAL', 'LT'],
            canOverride: false
        },
        oilUnit: {
            entity: 'aircraft',
            field: 'oilUnit',
            values: ['QT', 'LT'],
            canOverride: false
        },
        operatingCostUnit: {
            entity: 'aircraft',
            field: 'operatingCostUnit',
            values: ['KM', 'Hobbs', 'Chocks', 'FlightTime'],
            canOverride: false
        }
    },

    // AIRCRAFT TYPE PICKLISTS
    aircraftType: {
        Class: {
            entity: 'aircraftType',
            field: 'Class',
            values: ['H', 'I', 'L', 'S'],
            canOverride: false
        },
        Category: {
            entity: 'aircraftType',
            field: 'Category',
            values: ['I', 'II', 'III', 'IIII'],
            canOverride: false
        }
    },

    // CREW LOGBOOK PICKLISTS
    crewLogbook: {
        CAR: {
            entity: 'crewLogbook',
            field: 'CAR',
            values: ['Part 91', 'Part 121', 'Part 125', 'Part 135', 'Part 141', 'NOT SPECIFIED'],
            canOverride: false
        },
        commandType: {
            entity: 'crewLogbook',
            field: 'commandType',
            values: ['PIC', 'Dual', 'SIC', 'PICUS', 'Instructor'],
            canOverride: false
        },
        restType: {
            entity: 'crewLogbook',
            field: 'restType',
            values: ['None', 'Class1 Rest Facility', 'Class2 Rest Facility', 'Class3 Rest Facility'],
            canOverride: false
        }
    },

    // CREW RECENCY (COMPLIANCE ITEMS)
    crewRecency: {
        recencyType: {
            entity: 'crewRecency',
            field: 'recencyType',
            values: [
                'IR', 'Medical', 'Validation', 'Language Proficiency', 'Proficiency Check - SIM',
                'Proficiency Check - Aircraft', 'Line Check', 'CRM', 'SEP T', 'RVSM', 'DG', 'TCAS',
                'Safety', 'Security', 'Fire Fighting', 'Survival', 'Airside Induction', 'Gate Pass',
                'Crew Induction', 'Familiarization Flight', 'Flight Deck Observation',
                'In Flight Proficiency Check', 'Cabin Crew Logbook'
            ],
            canOverride: true
        }
    },

    // CREW ENDORSEMENTS
    crewEndorcements: {
        endorcementType: {
            entity: 'crewEndorcements',
            field: 'endorcementType',
            values: ['PPL', 'CPL', 'ATP', 'Instructors', 'Language Proficiency - 4', 'Language Proficiency - 6'],
            canOverride: true
        }
    },

    // CREW ALERTS
    crewAlert: {
        alertType: {
            entity: 'crewAlert',
            field: 'alertType',
            values: ['Reminder', 'Action', 'Information', 'Grounding'],
            canOverride: false
        },
        alertSource: {
            entity: 'crewAlert',
            field: 'alertSource',
            values: ['Safety', 'Recency', 'Endorcements'],
            canOverride: false
        }
    },

    // MANAGED DOCUMENTS - AIRCRAFT
    managedDocuments_aircraft: {
        aircraftDocuments: {
            entity: 'managedDocuments',
            field: 'aircraftDocuments',
            values: [
                'Charts', 'FMS', 'Radio Station License', 'Weight and Balance Certificate',
                'Airworthiness Certificate', 'Type Certificate', 'Certificate of Release to Service',
                'Certificate of Registration', 'Certificate of Insurance', 'First Aid Kit',
                'Fire Extinguishers', 'Survival Kit', 'Data Plate', 'RVSM', 'GNSS'
            ],
            canOverride: true
        }
    },

    // MANAGED DOCUMENTS - CREW
    managedDocuments_crew: {
        crewDocuments: {
            entity: 'managedDocuments',
            field: 'crewDocuments',
            values: [
                'COVID', 'Visa-Chad', 'Visa-DRC', 'Visa-Congo', 'Visa-CAR', 'Visa-UK',
                'Passport-RSA', 'Passport-UK', 'Passport-USA', 'Passport-EU', 'ID', 'Personal Details',
                'Drivers License', 'Passport-Photo', 'Other'
            ],
            canOverride: true
        }
    },

    // MANAGED DOCUMENTS - ORGANIZATION
    managedDocuments_org: {
        organizationDocuments: {
            entity: 'managedDocuments',
            field: 'organizationDocuments',
            values: ['AOC Certificate', 'Logo', 'Tech Logs'],
            canOverride: true
        }
    },

    // MANAGED DOCUMENTS - OWNER
    managedDocuments_owner: {
        ownerDocuments: {
            entity: 'managedDocuments',
            field: 'ownerDocuments',
            values: [
                'ID', 'Visa-Chad', 'Visa-DRC', 'Visa-Congo', 'Visa-CAR', 'Visa-UK',
                'Passport-RSA', 'Passport-UK', 'Passport-USA', 'Passport-EU',
                'Personal Information', 'Drivers License', 'Other'
            ],
            canOverride: true
        }
    },

    // MANAGED DOCUMENTS - FLIGHT
    managedDocuments_flight: {
        flightDocuments: {
            entity: 'managedDocuments',
            field: 'flightDocuments',
            values: [
                'Notams', 'Weather', 'Flight Plan', 'Weight and Balance', 'Clearance',
                'Trip Summary', 'WhatsApp Chat Transcript', 'Other'
            ],
            canOverride: false
        }
    },

    // MANAGED DOCUMENTS - PASSENGER MANIFEST
    managedDocuments_passenger: {
        passengerManifestDocuments: {
            entity: 'managedDocuments',
            field: 'passengerManifestDocuments',
            values: [
                'DA2', 'DA2v2', 'DHA-128', 'BMA128', 'DHA-GENDEC', 'BI68', 'Gendec-FALA',
                'Gendex', 'Passenger Manifest', 'Petty Cash Requisition', 'Forex Requisition',
                'Catering', 'Handling', 'Clearance', 'Pre-Flight Risk Assessment', 'Costing',
                'Flight Folio', 'WhatsApp Chat Transcript', 'NAV Logs', 'W&B', 'Weather',
                'Flight Plan'
            ],
            canOverride: true
        },
        tripDocuments: {
            entity: 'managedDocuments',
            field: 'tripDocuments',
            values: ['Trip Summary'],
            canOverride: false
        }
    },

    // ACTIVITY LEG
    activityLeg: {
        approach: {
            entity: 'activityLeg',
            field: 'approach',
            values: [
                'ILS', 'VOR', 'RNAV', 'GPS', 'GNNS', 'BC', 'NDB', 'HOLD', 'NIGHT',
                'NIGHT - VOR', 'NIGHT - ILS', 'NONE'
            ],
            canOverride: false
        }
    },

    // AIRCRAFT DASHBOARD
    aircraftDashboard: {
        excludeFromDashboard: {
            entity: 'aircraftDashboard',
            field: 'excludeFromDashboard',
            values: ['Certificate of Registration', 'Type Certificate'],
            canOverride: false
        }
    },

    // AIRCRAFT MAINTENANCE SCHEDULE
    aircraftMaintenanceSchedule: {
        componentType: {
            entity: 'aircraftMaintenanceSchedule',
            field: 'componentType',
            values: ['Airframe', 'Power Plant', 'Propellers', 'Component'],
            canOverride: true
        },
        maintenanceType: {
            entity: 'aircraftMaintenanceSchedule',
            field: 'maintenanceType',
            values: [
                'Scheduled Maintenance', 'Airworthiness Directive', 'Service Bulletin',
                'Un-Scheduled Maintenance', 'Airworthiness Limitations'
            ],
            canOverride: true
        },
        scheduleSource: {
            entity: 'aircraftMaintenanceSchedule',
            field: 'scheduleSource',
            values: [
                'Beechcraft', 'Bombardier', 'Embraer', 'Cessna', 'Continental', 'Hartzell',
                'Rolls-Royce', 'Honeywell', 'Garmin', 'Pratt & Whitney', 'Rockwell Collins',
                'McCauley', 'Jabiru', 'Other'
            ],
            canOverride: true
        },
        schedule: {
            entity: 'aircraftMaintenanceSchedule',
            field: 'schedule',
            values: ['Hours', 'Cycles', 'Calendar', 'Ad-Hoc'],
            canOverride: false
        }
    },

    // PASSENGER
    Passenger: {
        DietPreference: {
            entity: 'Passenger',
            field: 'DietPreference',
            values: ['None', 'Vegetarian', 'Vegan', 'Halaal', 'Kosher'],
            canOverride: true
        }
    },

    // PRICE LIST
    priceList: {
        bandName: {
            entity: 'priceList',
            field: 'bandName',
            values: ['<=5200', '>5200 <= 10800', '>10800'],
            canOverride: false
        },
        moduleName: {
            entity: 'priceList',
            field: 'moduleName',
            values: ['Base', 'FDP', 'Maintenance', 'SMS', 'Audit', 'Training', 'Flight Following'],
            canOverride: false
        },
        currency: {
            entity: 'priceList',
            field: 'currency',
            values: ['ZAR', 'USD', 'AUD', 'EUR'],
            canOverride: false
        }
    },

    // WEATHER
    weather: {
        METARS: {
            entity: 'weather',
            field: 'METARS',
            values: ['FALA', 'FAOR', 'FACT', 'FYPJ', 'FYPPH'],
            canOverride: true
        }
    },

    // PROMOTIONS
    Promotions: {
        EXEUJT: {
            entity: 'Promotions',
            field: 'EXEUJT',
            values: ['36', '35'],
            canOverride: false
        },
        FWPVT: {
            entity: 'Promotions',
            field: 'FWPVT',
            values: ['29'],
            canOverride: false
        },
        AXDB9: {
            entity: 'Promotions',
            field: 'AXDB9',
            values: ['28', '34'],
            canOverride: false
        },
        AFIGLD: {
            entity: 'Promotions',
            field: 'AFIGLD',
            values: ['30', '33'],
            canOverride: false
        }
    },

    // CONTRACT
    contract: {
        chargeRateUnit: {
            entity: 'contract',
            field: 'chargeRateUnit',
            values: ['KM', 'Chocks', 'Hobbs', 'Flight', 'PAX'],
            canOverride: false
        }
    },

    // PORTAL PERMISSION
    portalPermission: {
        controllerName: {
            entity: 'portalPermission',
            field: 'controllerName',
            values: ['AircraftController'],
            canOverride: false
        }
    },

    // DEMO/DESTINATIONS
    demo: {
        destinations: {
            entity: 'demo',
            field: 'destinations',
            values: [
                'FALA', 'FACT', 'FAEL', 'FAPN', 'FAPE', 'FABL', 'FAHT', 'FAUP', 'FALE',
                'FAPY', 'FADD', 'FAPP'
            ],
            canOverride: false
        }
    },

    // CREW NOTIFICATION
    crewNotification: {
        crewNotificationType: {
            entity: 'crewNotification',
            field: 'crewNotificationType',
            values: ['Green Tag', 'Yellow Tag', 'Red Tag'],
            canOverride: false
        }
    }
};

// Initialize localStorage with picklists if not already present
function initializePicklists() {
    if (!localStorage.getItem('flywatch_picklists')) {
        localStorage.setItem('flywatch_picklists', JSON.stringify(PICKLISTS));
    }
}

// Get all picklists
function getAllPicklists() {
    const stored = localStorage.getItem('flywatch_picklists');
    return stored ? JSON.parse(stored) : PICKLISTS;
}

// Get picklist by entity and field
function getPicklist(entity, field) {
    const picklists = getAllPicklists();
    return picklists[entity]?.[field] || null;
}

// Update picklist
function updatePicklist(entity, field, values, canOverride) {
    const picklists = getAllPicklists();
    if (!picklists[entity]) {
        picklists[entity] = {};
    }
    picklists[entity][field] = {
        entity,
        field,
        values: Array.isArray(values) ? values : values.split('|').map(v => v.trim()),
        canOverride: canOverride !== undefined ? canOverride : false
    };
    localStorage.setItem('flywatch_picklists', JSON.stringify(picklists));
    return true;
}

// Delete picklist
function deletePicklist(entity, field) {
    const picklists = getAllPicklists();
    if (picklists[entity] && picklists[entity][field]) {
        delete picklists[entity][field];
        if (Object.keys(picklists[entity]).length === 0) {
            delete picklists[entity];
        }
        localStorage.setItem('flywatch_picklists', JSON.stringify(picklists));
        return true;
    }
    return false;
}

// Get all entities
function getAllEntities() {
    const picklists = getAllPicklists();
    return Object.keys(picklists).sort();
}

// Get fields for an entity
function getEntityFields(entity) {
    const picklists = getAllPicklists();
    return picklists[entity] ? Object.keys(picklists[entity]).sort() : [];
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PICKLISTS,
        initializePicklists,
        getAllPicklists,
        getPicklist,
        updatePicklist,
        deletePicklist,
        getAllEntities,
        getEntityFields
    };
}
