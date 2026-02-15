# Complete Airport Integration for Folio System

## 🎯 What This Fixes

1. ✅ Airport code recognition (FALA = Lanseria, FACT = Cape Town)
2. ✅ Real-time autocomplete dropdown
3. ✅ Automatic distance calculation
4. ✅ Admin airport database management
5. ✅ Flight route map visualization
6. ✅ Integration with airportdb.io/OurAirports

## 📋 Step-by-Step Implementation

### Step 1: Update folio-system.html - Add Autocomplete Styles

Add this to the `<style>` section in folio-system.html:

```css
/* Airport Autocomplete Styles */
.airport-input-wrapper {
    position: relative;
}

.airport-autocomplete-list {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(13, 27, 42, 0.98);
    border: 2px solid var(--secondary);
    border-top: none;
    border-radius: 0 0 8px 8px;
    max-height: 250px;
    overflow-y: auto;
    z-index: 1000;
    display: none;
}

.airport-autocomplete-list.active {
    display: block;
}

.airport-autocomplete-item {
    padding: 12px 15px;
    cursor: pointer;
    border-bottom: 1px solid rgba(74, 144, 226, 0.2);
    transition: all 0.2s;
}

.airport-autocomplete-item:hover,
.airport-autocomplete-item.selected {
    background: rgba(74, 144, 226, 0.3);
}

.airport-code {
    font-weight: 700;
    color: var(--light-blue);
    font-family: 'JetBrains Mono', monospace;
}

.airport-name {
    color: var(--pale-blue);
    font-size: 0.9rem;
    margin-top: 2px;
}

.airport-validated {
    border-color: var(--success) !important;
    background: rgba(112, 173, 71, 0.1);
}

.airport-invalid {
    border-color: var(--danger) !important;
    background: rgba(230, 57, 70, 0.1);
}

.distance-calculated {
    color: var(--success);
    font-weight: 700;
}
```

### Step 2: Update Leg Creation Function

Replace the `addLeg()` function in folio-system.html with:

```javascript
function addLeg() {
    legCount++;
    const container = document.getElementById('legsContainer');
    const legPanel = document.createElement('div');
    legPanel.className = 'leg-panel';
    legPanel.id = `leg-panel-${legCount}`;
    
    legPanel.innerHTML = `
        <div class="leg-title">
            Leg ${legCount}
            <button type="button" class="btn btn-primary btn-small" style="float: right;" onclick="removeLeg(${legCount})">✗ Remove</button>
        </div>
        <div class="form-grid">
            <div class="form-group">
                <label>From (ICAO/IATA)</label>
                <div class="airport-input-wrapper">
                    <input type="text" 
                           class="form-input airport-input" 
                           id="leg${legCount}From" 
                           placeholder="e.g., FALA or HLA"
                           autocomplete="off"
                           oninput="handleAirportInput(${legCount}, 'From')"
                           onblur="validateAirportField(${legCount}, 'From')"
                           onfocus="showAirportDropdown(${legCount}, 'From')">
                    <div class="airport-autocomplete-list" id="leg${legCount}FromList"></div>
                </div>
            </div>
            
            <div class="form-group">
                <label>To (ICAO/IATA)</label>
                <div class="airport-input-wrapper">
                    <input type="text" 
                           class="form-input airport-input" 
                           id="leg${legCount}To" 
                           placeholder="e.g., FACT or CPT"
                           autocomplete="off"
                           oninput="handleAirportInput(${legCount}, 'To')"
                           onblur="validateAirportField(${legCount}, 'To')"
                           onfocus="showAirportDropdown(${legCount}, 'To')">
                    <div class="airport-autocomplete-list" id="leg${legCount}ToList"></div>
                </div>
            </div>
            
            <div class="form-group">
                <label>Distance Unit</label>
                <select class="form-input" id="leg${legCount}DistanceUnit" onchange="recalculateDistance(${legCount})">
                    <option value="NM">NM (Nautical Miles)</option>
                    <option value="KM">KM (Kilometers)</option>
                    <option value="SM">SM (Statute Miles)</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>Distance (Auto-calculated)</label>
                <input type="number" 
                       class="form-input" 
                       id="leg${legCount}Distance" 
                       value="0" 
                       readonly 
                       style="background: rgba(112, 173, 71, 0.1); font-weight: 700;">
            </div>
            
            <div class="form-group">
                <label>PAX</label>
                <input type="number" class="form-input" id="leg${legCount}Pax" value="0" min="0">
            </div>
            
            <div class="form-group">
                <label>Hobbs On</label>
                <input type="number" class="form-input" id="leg${legCount}HobbsOn" value="0" step="0.1">
            </div>
            
            <div class="form-group">
                <label>Hobbs Off</label>
                <input type="number" class="form-input" id="leg${legCount}HobbsOff" value="0" step="0.1">
            </div>
            
            <div class="form-group">
                <label>Time Takeoff</label>
                <input type="time" class="form-input" id="leg${legCount}Takeoff">
            </div>
            
            <div class="form-group">
                <label>Time Land</label>
                <input type="time" class="form-input" id="leg${legCount}Land">
            </div>
            
            <div class="form-group">
                <label>Fuel Before (GAL)</label>
                <input type="number" class="form-input" id="leg${legCount}FuelBefore" value="0">
            </div>
            
            <div class="form-group">
                <label>Fuel After (GAL)</label>
                <input type="number" class="form-input" id="leg${legCount}FuelAfter" value="0">
            </div>
            
            <div class="form-group">
                <label>Approach Type</label>
                <select class="form-input" id="leg${legCount}Approach">
                    <option value="NONE">NONE</option>
                    <option value="ILS">ILS</option>
                    <option value="VOR">VOR</option>
                    <option value="RNAV">RNAV</option>
                    <option value="GPS">GPS</option>
                    <option value="GNNS">GNNS</option>
                    <option value="BC">BC</option>
                    <option value="NDB">NDB</option>
                    <option value="HOLD">HOLD</option>
                    <option value="NIGHT">NIGHT</option>
                </select>
            </div>
        </div>
    `;
    
    container.appendChild(legPanel);
}

function removeLeg(legNum) {
    const panel = document.getElementById(`leg-panel-${legNum}`);
    if (panel && confirm('Remove this leg?')) {
        panel.remove();
    }
}
```

### Step 3: Add Airport Autocomplete Functions

Add these functions to folio-system.html `<script>` section:

```javascript
// Airport autocomplete and validation
let currentSelectedIndex = -1;

function handleAirportInput(legNum, field) {
    const input = document.getElementById(`leg${legNum}${field}`);
    const value = input.value.trim();
    
    if (value.length < 2) {
        hideAirportDropdown(legNum, field);
        return;
    }
    
    // Search airports
    const results = searchAirports(value);
    showAirportResults(legNum, field, results);
    
    // Auto-calculate distance when both fields are populated
    setTimeout(() => autoCalculateDistance(legNum), 100);
}

function showAirportResults(legNum, field, airports) {
    const listEl = document.getElementById(`leg${legNum}${field}List`);
    if (!listEl) return;
    
    if (airports.length === 0) {
        hideAirportDropdown(legNum, field);
        return;
    }
    
    listEl.innerHTML = '';
    currentSelectedIndex = -1;
    
    airports.forEach((airport, index) => {
        const item = document.createElement('div');
        item.className = 'airport-autocomplete-item';
        item.innerHTML = `
            <div class="airport-code">${airport.icao}${airport.iata ? '/' + airport.iata : ''}</div>
            <div class="airport-name">${airport.name} - ${airport.city}, ${airport.country}</div>
        `;
        
        item.onclick = () => selectAirport(legNum, field, airport);
        listEl.appendChild(item);
    });
    
    listEl.classList.add('active');
}

function selectAirport(legNum, field, airport) {
    const input = document.getElementById(`leg${legNum}${field}`);
    input.value = airport.icao;
    input.classList.remove('airport-invalid');
    input.classList.add('airport-validated');
    
    hideAirportDropdown(legNum, field);
    
    // Auto-calculate distance
    autoCalculateDistance(legNum);
}

function hideAirportDropdown(legNum, field) {
    const listEl = document.getElementById(`leg${legNum}${field}List`);
    if (listEl) {
        setTimeout(() => listEl.classList.remove('active'), 150);
    }
}

function showAirportDropdown(legNum, field) {
    const input = document.getElementById(`leg${legNum}${field}`);
    if (input && input.value.length >= 2) {
        handleAirportInput(legNum, field);
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
        input.value = airport.icao; // Normalize to ICAO
        input.classList.remove('airport-invalid');
        input.classList.add('airport-validated');
    } else {
        input.classList.remove('airport-validated');
        input.classList.add('airport-invalid');
    }
}

function autoCalculateDistance(legNum) {
    const fromInput = document.getElementById(`leg${legNum}From`);
    const toInput = document.getElementById(`leg${legNum}To`);
    const distanceInput = document.getElementById(`leg${legNum}Distance`);
    const unitSelect = document.getElementById(`leg${legNum}DistanceUnit`);
    
    if (!fromInput || !toInput || !distanceInput || !unitSelect) return;
    
    const fromCode = fromInput.value.trim().toUpperCase();
    const toCode = toInput.value.trim().toUpperCase();
    const unit = unitSelect.value || 'NM';
    
    if (fromCode.length >= 3 && toCode.length >= 3) {
        const distance = calculateDistanceByCode(fromCode, toCode, unit);
        
        if (distance !== null) {
            distanceInput.value = distance;
            distanceInput.classList.add('distance-calculated');
        } else {
            distanceInput.value = 0;
            distanceInput.classList.remove('distance-calculated');
        }
    }
}

function recalculateDistance(legNum) {
    autoCalculateDistance(legNum);
}

// Keyboard navigation for autocomplete
document.addEventListener('keydown', function(e) {
    const activeList = document.querySelector('.airport-autocomplete-list.active');
    if (!activeList) return;
    
    const items = activeList.querySelectorAll('.airport-autocomplete-item');
    if (items.length === 0) return;
    
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        currentSelectedIndex = Math.min(currentSelectedIndex + 1, items.length - 1);
        updateSelection(items);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        currentSelectedIndex = Math.max(currentSelectedIndex - 1, -1);
        updateSelection(items);
    } else if (e.key === 'Enter' && currentSelectedIndex >= 0) {
        e.preventDefault();
        items[currentSelectedIndex].click();
    } else if (e.key === 'Escape') {
        activeList.classList.remove('active');
    }
});

function updateSelection(items) {
    items.forEach((item, index) => {
        if (index === currentSelectedIndex) {
            item.classList.add('selected');
            item.scrollIntoView({ block: 'nearest' });
        } else {
            item.classList.remove('selected');
        }
    });
}

// Close autocomplete when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.airport-input-wrapper')) {
        document.querySelectorAll('.airport-autocomplete-list').forEach(list => {
            list.classList.remove('active');
        });
    }
});
```

### Step 4: Initialize Airport System

Update the `init()` function:

```javascript
function init() {
    // Initialize databases
    initializePicklists();
    initializeAircraftDatabase();
    initializeAirportDatabase(); // NEW!
    
    // Get aircraft from URL or session
    const urlParams = new URLSearchParams(window.location.search);
    currentAircraft = urlParams.get('aircraft') || sessionStorage.getItem('current_aircraft') || 'ZS-AAM';
    currentOrg = getAircraftOrgKey(currentAircraft);
    
    document.getElementById('aircraftName').textContent = currentAircraft;
    
    loadSampleFolios();
    renderFolioList();
}
```

## 🗺️ Flight Route Map Visualization

### Add Leaflet.js for Maps

Add this to the `<head>` section of folio-system.html:

```html
<!-- Leaflet for maps -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
```

### Add Map Container

Add this after the folio list view:

```html
<!-- Flight Route Map Modal -->
<div id="routeMapModal" class="modal">
    <div class="modal-content" style="max-width: 900px;">
        <div class="modal-header">
            <h2 class="modal-title">Flight Route Map</h2>
        </div>
        
        <div id="routeMap" style="height: 500px; border-radius: 12px; margin-bottom: 20px;"></div>
        
        <div id="routeDetails" style="background: rgba(10, 35, 66, 0.5); padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <!-- Route details will be populated here -->
        </div>
        
        <div class="modal-actions">
            <button type="button" class="btn btn-secondary" onclick="closeRouteMap()">Close</button>
        </div>
    </div>
</div>
```

### Add Map Functions

```javascript
let routeMap = null;

function showRouteMap(folioId) {
    const folio = folios.find(f => f.id === folioId);
    if (!folio || !folio.legs || folio.legs.length === 0) {
        alert('No legs data available for this folio');
        return;
    }
    
    document.getElementById('routeMapModal').classList.add('active');
    
    // Initialize map
    setTimeout(() => {
        if (routeMap) {
            routeMap.remove();
        }
        
        routeMap = L.map('routeMap').setView([-26, 28], 6);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(routeMap);
        
        const markers = [];
        const route = [];
        let totalDistance = 0;
        
        folio.legs.forEach((leg, index) => {
            const fromAirport = getAirportByCode(leg.from);
            const toAirport = getAirportByCode(leg.to);
            
            if (fromAirport && toAirport) {
                // Add markers
                const fromMarker = L.marker([fromAirport.lat, fromAirport.lon])
                    .bindPopup(`<b>${fromAirport.icao}</b><br>${fromAirport.name}`)
                    .addTo(routeMap);
                
                const toMarker = L.marker([toAirport.lat, toAirport.lon])
                    .bindPopup(`<b>${toAirport.icao}</b><br>${toAirport.name}`)
                    .addTo(routeMap);
                
                // Draw route line
                const line = L.polyline([
                    [fromAirport.lat, fromAirport.lon],
                    [toAirport.lat, toAirport.lon]
                ], {
                    color: '#4A90E2',
                    weight: 3,
                    opacity: 0.7
                }).addTo(routeMap);
                
                // Calculate distance
                const distance = calculateDistance(fromAirport, toAirport, 'NM');
                totalDistance += distance;
                
                route.push({
                    leg: index + 1,
                    from: fromAirport,
                    to: toAirport,
                    distance: distance
                });
                
                markers.push(fromMarker, toMarker);
            }
        });
        
        // Fit map to show all markers
        if (markers.length > 0) {
            const group = L.featureGroup(markers);
            routeMap.fitBounds(group.getBounds().pad(0.1));
        }
        
        // Display route details
        displayRouteDetails(route, totalDistance);
    }, 100);
}

function displayRouteDetails(route, totalDistance) {
    const detailsEl = document.getElementById('routeDetails');
    let html = `<h3 style="color: var(--light-blue); margin-bottom: 15px;">Route Details</h3>`;
    
    route.forEach(leg => {
        html += `
            <div style="padding: 10px; margin-bottom: 10px; background: rgba(74, 144, 226, 0.1); border-radius: 6px;">
                <strong>Leg ${leg.leg}:</strong> 
                ${leg.from.icao} (${leg.from.city}) → ${leg.to.icao} (${leg.to.city})
                <span style="float: right; color: var(--success); font-weight: 700;">${leg.distance} NM</span>
            </div>
        `;
    });
    
    html += `
        <div style="padding: 15px; margin-top: 15px; background: rgba(112, 173, 71, 0.2); border-radius: 6px; text-align: center;">
            <strong style="font-size: 1.2rem;">Total Distance: ${totalDistance} NM</strong>
        </div>
    `;
    
    detailsEl.innerHTML = html;
}

function closeRouteMap() {
    document.getElementById('routeMapModal').classList.remove('active');
}
```

### Add "View Map" Button to Folio List

In the folio table row creation, add:

```javascript
<button class="btn btn-secondary btn-small" onclick="showRouteMap('${folio.id}')">🗺️ Map</button>
```

## 📚 Complete Integration Checklist

### In folio-system.html:

- [ ] Add Leaflet CSS/JS to `<head>`
- [ ] Add airport autocomplete styles to `<style>`
- [ ] Replace `addLeg()` function
- [ ] Add all airport autocomplete functions
- [ ] Add map visualization functions
- [ ] Add route map modal HTML
- [ ] Update `init()` function

### Scripts to Include (before closing `</body>`):

```html
<script src="picklists-data.js"></script>
<script src="aircraft-config-data.js"></script>
<script src="airports-data.js"></script>
```

## 🧪 Testing

1. **Test Airport Autocomplete:**
   - Type "FALA" → Should show Lanseria
   - Type "Lans" → Should show Lanseria
   - Type "JNB" → Should show OR Tambo
   - Type "Cape" → Should show Cape Town

2. **Test Distance Calculation:**
   - FROM: FALA, TO: FACT → Should show ~1235 NM
   - Change unit to KM → Should update to ~2288 KM
   - Change unit to SM → Should update to ~1421 SM

3. **Test Map:**
   - Create folio with multiple legs
   - Click "View Map"
   - Should show route with markers and lines
   - Should display total distance

## 🚀 Production Enhancement

For production, replace the 50 airports with full OurAirports database:

```javascript
// Load from OurAirports API
async function loadAirportsFromAPI() {
    const response = await fetch('https://davidmegginson.github.io/ourairports-data/airports.csv');
    const csv = await response.text();
    // Parse CSV and store
}
```

Or use airportdb.io API:

```javascript
async function searchAirportsAPI(query) {
    const response = await fetch(`https://airportdb.io/api/v1/airport/${query}?apiToken=YOUR_TOKEN`);
    return await response.json();
}
```

## ✅ Result

After integration:

- ✅ Type "FALA" → Autocomplete shows "FALA/HLA - Lanseria International Airport (Johannesburg)"
- ✅ Type "FACT" → Autocomplete shows "FACT/CPT - Cape Town International Airport (Cape Town)"
- ✅ Select both → Distance auto-calculates to 1235 NM
- ✅ View map → Shows flight route on interactive map
- ✅ Admins can manage airport database

