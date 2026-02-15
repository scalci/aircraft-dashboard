# Folio System Integration Updates

## New Features Added

### 1. Aircraft Configuration per Organization
- AC Reg dropdown now shows only aircraft in the current organization
- Aircraft data includes: model, fuel type, oil unit, engines, etc.
- Aircraft parameters auto-populate when aircraft is selected

### 2. Airport Database Integration
- FROM and TO airport fields now have autocomplete
- Uses OurAirports data format (ICAO codes)
- Auto-calculates distance between airports
- 50+ airports pre-loaded (South Africa + international)

### 3. Distance Auto-Calculation
- When FROM and TO airports are selected
- Automatically calculates Great Circle Distance
- Supports NM (nautical miles), KM, SM (statute miles)
- Uses Haversine formula for accuracy

## Required Script Additions

Add these scripts to `folio-system.html` BEFORE the closing `</body>` tag:

```html
<!-- Load data libraries -->
<script src="picklists-data.js"></script>
<script src="aircraft-config-data.js"></script>
<script src="airports-data.js"></script>
```

## Code Changes Needed

### Change 1: Initialize All Data

In the `init()` function, add:

```javascript
function init() {
    // Existing code...
    
    // NEW: Initialize all databases
    initializePicklists();
    initializeAircraftDatabase();
    initializeAirportDatabase();
    
    // NEW: Get aircraft from URL or session
    const urlParams = new URLSearchParams(window.location.search);
    currentAircraft = urlParams.get('aircraft') || sessionStorage.getItem('current_aircraft') || 'ZS-AAM';
    currentOrg = getAircraftOrgKey(currentAircraft);
    
    document.getElementById('aircraftName').textContent = currentAircraft;
    
    loadSampleFolios();
    renderFolioList();
}
```

### Change 2: Populate AC Reg Dropdown

Replace the AC Reg dropdown population:

```javascript
function populateAircraftDropdown() {
    const select = document.getElementById('folioAcReg');
    select.innerHTML = ''; // Clear existing
    
    // Get aircraft for current organization
    const aircraft = getOrgAircraft(currentOrg);
    
    aircraft.forEach(ac => {
        const option = document.createElement('option');
        option.value = ac.registration;
        option.textContent = `${ac.registration} - ${ac.model}`;
        if (ac.registration === currentAircraft) {
            option.selected = true;
        }
        select.appendChild(option);
    });
}

// Add event listener for aircraft selection
document.getElementById('folioAcReg')?.addEventListener('change', function(e) {
    const registration = e.target.value;
    loadAircraftParameters(registration);
});

function loadAircraftParameters(registration) {
    const aircraft = getAircraftByRegistration(registration);
    if (!aircraft) return;
    
    // Auto-populate aircraft parameters
    document.getElementById('fuelType').value = aircraft.fuelType || '';
    document.getElementById('engineType').value = aircraft.model || '';
    document.getElementById('oilUnit').value = aircraft.oilUnit || 'QT';
    document.getElementById('fuelBurnUnit').value = aircraft.fuelBurnUnit || 'GAL';
    document.getElementById('engines').value = aircraft.engines || 0;
    document.getElementById('cruisingSPD').value = aircraft.cruisingSpeed || 0;
    document.getElementById('fuelBurnHr').value = aircraft.fuelBurnPerHour || 0;
}
```

### Change 3: Airport Autocomplete for Legs

Replace the FROM/TO inputs in `addLeg()` with autocomplete:

```javascript
function addLeg() {
    legCount++;
    const container = document.getElementById('legsContainer');
    const legPanel = document.createElement('div');
    legPanel.className = 'leg-panel';
    legPanel.innerHTML = `
        <div class="leg-title">Leg ${legCount}</div>
        <div class="form-grid">
            <div class="form-group">
                <label>From (ICAO)</label>
                <input type="text" 
                       class="airport-autocomplete" 
                       id="leg${legCount}From" 
                       placeholder="e.g., FALA"
                       oninput="handleAirportInput(${legCount}, 'From')"
                       list="airportList">
            </div>
            <div class="form-group">
                <label>To (ICAO)</label>
                <input type="text" 
                       class="airport-autocomplete" 
                       id="leg${legCount}To" 
                       placeholder="e.g., FACT"
                       oninput="handleAirportInput(${legCount}, 'To')"
                       list="airportList">
            </div>
            <div class="form-group">
                <label>Distance Unit</label>
                <select id="leg${legCount}DistanceUnit">
                    <option value="NM">NM</option>
                    <option value="KM">KM</option>
                    <option value="SM">SM</option>
                </select>
            </div>
            <div class="form-group">
                <label>Distance (auto)</label>
                <input type="number" id="leg${legCount}Distance" value="0" readonly style="background: rgba(74, 144, 226, 0.1);">
            </div>
            <!-- Rest of leg fields... -->
        </div>
    `;
    container.appendChild(legPanel);
    
    // Add change listener to auto-calculate distance
    document.getElementById(`leg${legCount}DistanceUnit`)?.addEventListener('change', () => {
        calculateLegDistance(legCount);
    });
}

// Create datalist for airports (autocomplete)
function createAirportDatalist() {
    const datalist = document.createElement('datalist');
    datalist.id = 'airportList';
    
    const airports = getAllAirports();
    airports.forEach(airport => {
        const option = document.createElement('option');
        option.value = airport.icao;
        option.textContent = getAirportLabel(airport);
        datalist.appendChild(option);
    });
    
    document.body.appendChild(datalist);
}

function handleAirportInput(legNum, field) {
    // When both FROM and TO are filled, auto-calculate distance
    setTimeout(() => calculateLegDistance(legNum), 100);
}

function calculateLegDistance(legNum) {
    const fromICAO = document.getElementById(`leg${legNum}From`)?.value.trim().toUpperCase();
    const toICAO = document.getElementById(`leg${legNum}To`)?.value.trim().toUpperCase();
    const unit = document.getElementById(`leg${legNum}DistanceUnit`)?.value || 'NM';
    
    if (fromICAO && toICAO && fromICAO.length >= 4 && toICAO.length >= 4) {
        const distance = calculateDistanceByICAO(fromICAO, toICAO, unit);
        if (distance !== null) {
            document.getElementById(`leg${legNum}Distance`).value = distance;
        }
    }
}
```

### Change 4: Update window.onload

```javascript
window.onload = function() {
    init();
    populateAircraftDropdown();
    createAirportDatalist();
};
```

## HTML Changes Needed

### Add Autocomplete Styling

Add this to the `<style>` section:

```css
.airport-autocomplete {
    text-transform: uppercase;
}

.airport-autocomplete:focus {
    background: rgba(13, 27, 42, 0.95);
    border-color: var(--secondary);
}

.form-group input[readonly] {
    cursor: not-allowed;
    opacity: 0.7;
}
```

## Testing the Integration

1. **Test Aircraft Dropdown:**
   - Open folio system for Barrick
   - AC Reg should show: ZS-BGM, ZS-BGO, ZS-CGO, ZS-KGM
   - Open folio system for Highveld
   - AC Reg should show: ZS-AAM only

2. **Test Aircraft Parameters:**
   - Select an aircraft in AC Reg dropdown
   - Fuel Type, Oil Unit, Engines should auto-populate
   - Cruising Speed and Fuel Burn should populate

3. **Test Airport Autocomplete:**
   - Add a leg
   - Type "FA" in FROM field
   - Should see dropdown with FALA, FACT, FAOR, etc.
   - Select FALA

4. **Test Distance Calculation:**
   - Set FROM: FALA
   - Set TO: FACT
   - Distance should auto-calculate to ~1235 NM
   - Change unit to KM
   - Distance should update to ~2288 KM

## Production Notes

### Loading Full Airport Database

For production, you can load the complete OurAirports database:

```javascript
// Fetch from OurAirports API
async function loadFullAirportDatabase() {
    const response = await fetch('https://davidmegginson.github.io/ourairports-data/airports.csv');
    const csv = await response.text();
    // Parse CSV and store in database
}
```

### Aircraft Config from Backend

Replace localStorage with API:

```javascript
async function getOrgAircraft(orgKey) {
    const response = await fetch(`/api/orgs/${orgKey}/aircraft`);
    return await response.json();
}
```

## Distance Calculation Details

The Haversine formula used:

```
a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
c = 2 ⋅ atan2(√a, √(1−a))
d = R ⋅ c
```

Where:
- φ is latitude
- λ is longitude
- R is earth's radius (3440.065 NM)
- Δφ is difference in latitude
- Δλ is difference in longitude

Accuracy: ±0.5% for distances up to 10,000 NM
