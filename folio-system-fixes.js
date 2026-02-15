// CRITICAL FIXES FOR FOLIO SYSTEM
// Add these functions to folio-system.html

// ============================================
// FIX 1: Initialize Everything Properly
// ============================================
let folios = [];
let currentOrg = 'barrick';
let currentAircraft = 'ZS-BGM';
let legCount = 0;
let currentFolioId = null;

function init() {
    console.log('=== INITIALIZING FOLIO SYSTEM ===');
    
    // Initialize all databases
    if (typeof initializePicklists === 'function') {
        initializePicklists();
        console.log('✓ Picklists initialized');
    }
    
    if (typeof initializeAircraftDatabase === 'function') {
        initializeAircraftDatabase();
        console.log('✓ Aircraft database initialized');
    }
    
    if (typeof initializeAirportDatabase === 'function') {
        initializeAirportDatabase();
        const airportCount = getAllAirports ? getAllAirports().length : 0;
        console.log('✓ Airport database initialized:', airportCount, 'airports');
    }
    
    // Get aircraft from URL
    const urlParams = new URLSearchParams(window.location.search);
    currentAircraft = urlParams.get('aircraft') || 'ZS-BGM';
    currentOrg = getAircraftOrgKey(currentAircraft);
    
    console.log('Current Aircraft:', currentAircraft);
    console.log('Current Org:', currentOrg);
    
    // Display aircraft name
    const aircraftNameEl = document.getElementById('aircraftName');
    if (aircraftNameEl) {
        aircraftNameEl.textContent = currentAircraft;
    }
    
    // Load folios
    loadFoliosForOrg();
    renderFolioList();
    
    console.log('=== INITIALIZATION COMPLETE ===');
}

// ============================================
// FIX 2: Load Folios for Organization
// ============================================
function loadFoliosForOrg() {
    try {
        const key = 'flywatch_folios_' + currentOrg;
        const stored = localStorage.getItem(key);
        console.log('Loading folios from key:', key);
        
        if (stored) {
            folios = JSON.parse(stored);
            console.log('✓ Loaded', folios.length, 'folios');
        } else {
            folios = [];
            console.log('No folios found, starting fresh');
        }
    } catch (error) {
        console.error('Error loading folios:', error);
        folios = [];
    }
}

// ============================================
// FIX 3: Populate Aircraft Dropdown
// ============================================
function populateAircraftDropdown() {
    const select = document.getElementById('folioAcReg');
    if (!select) {
        console.error('ERROR: AC Reg dropdown not found!');
        return;
    }
    
    console.log('Populating aircraft dropdown for org:', currentOrg);
    
    select.innerHTML = '<option value="">Select Aircraft</option>';
    
    // Get aircraft for current organization
    const aircraft = getOrgAircraft(currentOrg);
    
    console.log('Aircraft found:', aircraft ? aircraft.length : 0);
    
    if (!aircraft || aircraft.length === 0) {
        select.innerHTML += '<option value="" disabled>❌ No aircraft configured</option>';
        console.error('No aircraft found for org:', currentOrg);
        return;
    }
    
    aircraft.forEach(ac => {
        const option = document.createElement('option');
        option.value = ac.registration;
        option.textContent = `${ac.registration} - ${ac.model}`;
        select.appendChild(option);
        console.log('Added aircraft option:', ac.registration);
    });
    
    // Auto-select current aircraft
    if (currentAircraft) {
        select.value = currentAircraft;
    }
    
    console.log('✓ Aircraft dropdown populated');
}

// ============================================
// FIX 4: Airport Autocomplete System
// ============================================
let currentSelectedIndex = -1;

function setupLegAutocomplete(legNum) {
    console.log('Setting up autocomplete for leg', legNum);
    
    const fromInput = document.getElementById(`leg${legNum}From`);
    const toInput = document.getElementById(`leg${legNum}To`);
    
    if (fromInput) {
        fromInput.addEventListener('input', () => handleAirportInput(legNum, 'From'));
        fromInput.addEventListener('blur', () => {
            setTimeout(() => validateAirportField(legNum, 'From'), 200);
        });
    }
    
    if (toInput) {
        toInput.addEventListener('input', () => handleAirportInput(legNum, 'To'));
        toInput.addEventListener('blur', () => {
            setTimeout(() => validateAirportField(legNum, 'To'), 200);
        });
    }
}

function handleAirportInput(legNum, field) {
    const input = document.getElementById(`leg${legNum}${field}`);
    const value = input.value.trim();
    
    if (value.length < 2) {
        hideAirportDropdown(legNum, field);
        return;
    }
    
    console.log(`Searching for: ${value}`);
    
    // Search airports
    const results = searchAirports(value);
    console.log(`Found ${results.length} airports`);
    
    if (results && results.length > 0) {
        showAirportResults(legNum, field, results);
    } else {
        hideAirportDropdown(legNum, field);
    }
    
    // Auto-calculate distance
    setTimeout(() => autoCalculateDistance(legNum), 100);
}

function showAirportResults(legNum, field, airports) {
    const listId = `leg${legNum}${field}List`;
    let listEl = document.getElementById(listId);
    
    if (!listEl) {
        const input = document.getElementById(`leg${legNum}${field}`);
        const wrapper = input.parentElement;
        
        listEl = document.createElement('div');
        listEl.id = listId;
        listEl.className = 'airport-autocomplete-list';
        wrapper.appendChild(listEl);
    }
    
    listEl.innerHTML = '';
    
    airports.forEach((airport, index) => {
        const item = document.createElement('div');
        item.className = 'airport-autocomplete-item';
        
        const codes = airport.iata ? `${airport.icao}/${airport.iata}` : airport.icao;
        
        item.innerHTML = `
            <div class="airport-code">${codes}</div>
            <div class="airport-name">${airport.name} - ${airport.city}</div>
        `;
        
        item.onclick = () => selectAirport(legNum, field, airport);
        listEl.appendChild(item);
    });
    
    listEl.classList.add('active');
}

function selectAirport(legNum, field, airport) {
    console.log(`Selected: ${airport.icao} - ${airport.name}`);
    
    const input = document.getElementById(`leg${legNum}${field}`);
    input.value = airport.icao;
    input.classList.remove('airport-invalid');
    input.classList.add('airport-validated');
    
    hideAirportDropdown(legNum, field);
    
    setTimeout(() => autoCalculateDistance(legNum), 50);
}

function hideAirportDropdown(legNum, field) {
    const listId = `leg${legNum}${field}List`;
    const listEl = document.getElementById(listId);
    if (listEl) {
        listEl.classList.remove('active');
    }
}

function validateAirportField(legNum, field) {
    const input = document.getElementById(`leg${legNum}${field}`);
    const code = input.value.trim().toUpperCase();
    
    if (!code) {
        input.classList.remove('airport-validated', 'airport-invalid');
        return;
    }
    
    const airport = validateAirportCode(code);
    
    if (airport) {
        input.value = airport.icao;
        input.classList.remove('airport-invalid');
        input.classList.add('airport-validated');
        console.log('✓ Valid airport:', airport.icao);
    } else {
        input.classList.remove('airport-validated');
        input.classList.add('airport-invalid');
        console.log('✗ Invalid airport code:', code);
    }
}

// ============================================
// FIX 5: Auto-Calculate Distance
// ============================================
function autoCalculateDistance(legNum) {
    const fromInput = document.getElementById(`leg${legNum}From`);
    const toInput = document.getElementById(`leg${legNum}To`);
    const distanceInput = document.getElementById(`leg${legNum}Distance`);
    const unitSelect = document.getElementById(`leg${legNum}DistanceUnit`);
    
    if (!fromInput || !toInput || !distanceInput) {
        console.log('Distance calc: Missing elements for leg', legNum);
        return;
    }
    
    const fromCode = fromInput.value.trim().toUpperCase();
    const toCode = toInput.value.trim().toUpperCase();
    const unit = unitSelect ? unitSelect.value : 'NM';
    
    if (fromCode.length >= 3 && toCode.length >= 3) {
        console.log(`Calculating: ${fromCode} → ${toCode} (${unit})`);
        
        const distance = calculateDistanceByCode(fromCode, toCode, unit);
        
        if (distance !== null && distance > 0) {
            distanceInput.value = distance;
            distanceInput.classList.add('distance-calculated');
            console.log(`✓ Distance: ${distance} ${unit}`);
        } else {
            distanceInput.value = 0;
            distanceInput.classList.remove('distance-calculated');
            console.log('✗ Distance calculation failed');
        }
    }
}

function recalculateDistance(legNum) {
    autoCalculateDistance(legNum);
}

// ============================================
// FIX 6: Save Folio and Show in List
// ============================================
function saveFolio() {
    console.log('=== SAVING FOLIO ===');
    
    const folioData = {
        id: currentFolioId || 'folio_' + Date.now(),
        date: document.getElementById('folioDate').value,
        acReg: document.getElementById('folioAcReg').value,
        status: document.getElementById('folioStatus').value,
        type: document.getElementById('folioType').value,
        folioNo: document.getElementById('folioNo').value || 'AUTO-' + Date.now(),
        flightNo: document.getElementById('flightNo').value || '',
        legs: collectLegData(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    // Calculate route
    if (folioData.legs && folioData.legs.length > 0) {
        const route = folioData.legs.map(leg => `${leg.from}-${leg.to}`).join(', ');
        folioData.route = route;
        
        // Calculate total distance
        const totalDistance = folioData.legs.reduce((sum, leg) => sum + (leg.distance || 0), 0);
        folioData.totalDistance = totalDistance;
    }
    
    console.log('Folio data:', folioData);
    
    // Save to array
    const existingIndex = folios.findIndex(f => f.id === folioData.id);
    if (existingIndex !== -1) {
        folios[existingIndex] = folioData;
        console.log('Updated existing folio');
    } else {
        folios.push(folioData);
        console.log('Added new folio');
    }
    
    // Save to localStorage
    try {
        const key = 'flywatch_folios_' + currentOrg;
        localStorage.setItem(key, JSON.stringify(folios));
        console.log('✓ Saved to localStorage:', key);
    } catch (error) {
        console.error('ERROR saving folio:', error);
        alert('Error saving folio: ' + error.message);
        return;
    }
    
    // Refresh list
    renderFolioList();
    
    // Close editor
    closeFolioEditor();
    
    alert('Folio saved successfully!');
    console.log('=== SAVE COMPLETE ===');
}

function collectLegData() {
    const legs = [];
    const legPanels = document.querySelectorAll('.leg-panel');
    
    console.log('Collecting data from', legPanels.length, 'legs');
    
    legPanels.forEach((panel, index) => {
        const legNum = index + 1;
        
        const fromEl = document.getElementById(`leg${legNum}From`);
        const toEl = document.getElementById(`leg${legNum}To`);
        
        if (!fromEl || !toEl) return;
        
        const leg = {
            from: fromEl.value || '',
            to: toEl.value || '',
            distance: parseInt(document.getElementById(`leg${legNum}Distance`)?.value) || 0,
            distanceUnit: document.getElementById(`leg${legNum}DistanceUnit`)?.value || 'NM',
            pax: parseInt(document.getElementById(`leg${legNum}Pax`)?.value) || 0,
            hobbsOn: parseFloat(document.getElementById(`leg${legNum}HobbsOn`)?.value) || 0,
            hobbsOff: parseFloat(document.getElementById(`leg${legNum}HobbsOff`)?.value) || 0
        };
        
        if (leg.from || leg.to) {
            legs.push(leg);
            console.log(`Leg ${legNum}:`, leg);
        }
    });
    
    return legs;
}

// ============================================
// FIX 7: Render Folio List
// ============================================
function renderFolioList() {
    const tbody = document.getElementById('folioTableBody');
    if (!tbody) {
        console.error('Folio table body not found!');
        return;
    }
    
    console.log('Rendering', folios.length, 'folios');
    
    tbody.innerHTML = '';
    
    if (folios.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" style="text-align: center; padding: 40px; color: #85C1E9;">No folios captured yet. Click "New Folio" to get started.</td></tr>';
        return;
    }
    
    folios.forEach(folio => {
        const row = document.createElement('tr');
        
        const statusBadge = folio.status === 'COMPLETED' ? 
            '<span style="background: var(--success); padding: 4px 8px; border-radius: 4px; font-size: 0.8rem;">COMPLETED</span>' :
            '<span style="background: var(--warning); padding: 4px 8px; border-radius: 4px; font-size: 0.8rem;">SCHEDULED</span>';
        
        row.innerHTML = `
            <td><button class="btn btn-secondary btn-small" onclick="editFolio('${folio.id}')">✎ Edit</button></td>
            <td>${folio.folioNo || 'N/A'}</td>
            <td>${folio.date || 'N/A'}</td>
            <td>${statusBadge}</td>
            <td><strong>${folio.acReg}</strong></td>
            <td>${folio.folioNo || '-'}</td>
            <td>${folio.flightNo || '-'}</td>
            <td>${folio.route || '-'}</td>
            <td>${folio.legs ? folio.legs.length : 0}</td>
            <td>${folio.totalDistance || 0} NM</td>
        `;
        
        tbody.appendChild(row);
    });
    
    console.log('✓ Folio list rendered');
}

// ============================================
// FIX 8: Open New Folio Editor
// ============================================
function openNewFolio() {
    console.log('=== OPENING NEW FOLIO ===');
    
    currentFolioId = null;
    
    // Reset form
    document.getElementById('folioDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('folioStatus').value = 'SCHEDULED';
    document.getElementById('folioType').value = 'COMMERCIAL';
    
    // Populate aircraft dropdown
    populateAircraftDropdown();
    
    // Clear legs
    legCount = 0;
    document.getElementById('legsContainer').innerHTML = '';
    
    // Add first leg
    addLeg();
    
    // Show editor
    document.getElementById('folioListView').style.display = 'none';
    document.getElementById('folioEditorView').style.display = 'block';
    
    console.log('✓ New folio editor opened');
}

function closeFolioEditor() {
    document.getElementById('folioListView').style.display = 'block';
    document.getElementById('folioEditorView').style.display = 'none';
}

// ============================================
// Call init on page load
// ============================================
window.addEventListener('DOMContentLoaded', init);
