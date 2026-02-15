# Folio System Bug Fixes - Complete Solution

## 🐛 Issues Identified

1. **Folio doesn't show in list after capture**
2. **Airports don't show in autocomplete**
3. **Distance doesn't auto-calculate**
4. **AC dropdown is empty (no aircraft shown)**
5. **No Airports section in admin**

## ✅ Solutions

### Issue 1: Folio Not Showing in List

**Problem:** Folios are being created but not saved to localStorage or not rendering.

**Fix:** Update the `saveFolio()` function in folio-system.html

```javascript
function saveFolio() {
    const folioData = {
        id: currentFolioId || 'folio_' + Date.now(),
        date: document.getElementById('folioDate').value,
        acReg: document.getElementById('folioAcReg').value,
        status: document.getElementById('folioStatus').value,
        type: document.getElementById('folioType').value,
        folioNo: document.getElementById('folioNo').value,
        flightNo: document.getElementById('flightNo').value,
        route: '', // Will be calculated from legs
        legs: collectLegData(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    // Calculate route from legs
    if (folioData.legs && folioData.legs.length > 0) {
        const route = folioData.legs.map(leg => 
            `${leg.from}-${leg.to}`
        ).join(', ');
        folioData.route = route;
    }
    
    // Save to folios array
    const existingIndex = folios.findIndex(f => f.id === folioData.id);
    if (existingIndex !== -1) {
        folios[existingIndex] = folioData;
    } else {
        folios.push(folioData);
    }
    
    // Save to localStorage
    try {
        localStorage.setItem('flywatch_folios_' + currentOrg, JSON.stringify(folios));
        console.log('Folio saved successfully:', folioData);
    } catch (error) {
        console.error('Error saving folio:', error);
        alert('Error saving folio: ' + error.message);
        return;
    }
    
    // Refresh the list
    renderFolioList();
    
    // Close editor and show success
    closeFolioEditor();
    alert('Folio saved successfully!');
}

function collectLegData() {
    const legs = [];
    const legPanels = document.querySelectorAll('.leg-panel');
    
    legPanels.forEach((panel, index) => {
        const legNum = index + 1;
        const leg = {
            from: document.getElementById(`leg${legNum}From`)?.value || '',
            to: document.getElementById(`leg${legNum}To`)?.value || '',
            distance: parseInt(document.getElementById(`leg${legNum}Distance`)?.value) || 0,
            distanceUnit: document.getElementById(`leg${legNum}DistanceUnit`)?.value || 'NM',
            pax: parseInt(document.getElementById(`leg${legNum}Pax`)?.value) || 0,
            hobbsOn: parseFloat(document.getElementById(`leg${legNum}HobbsOn`)?.value) || 0,
            hobbsOff: parseFloat(document.getElementById(`leg${legNum}HobbsOff`)?.value) || 0,
            takeoff: document.getElementById(`leg${legNum}Takeoff`)?.value || '',
            land: document.getElementById(`leg${legNum}Land`)?.value || '',
            fuelBefore: parseFloat(document.getElementById(`leg${legNum}FuelBefore`)?.value) || 0,
            fuelAfter: parseFloat(document.getElementById(`leg${legNum}FuelAfter`)?.value) || 0,
            approach: document.getElementById(`leg${legNum}Approach`)?.value || 'NONE'
        };
        
        if (leg.from || leg.to) {
            legs.push(leg);
        }
    });
    
    return legs;
}
```

### Issue 2 & 3: Airports Not Showing & Distance Not Calculating

**Problem:** Script not loaded or functions not accessible.

**Fix 1:** Ensure scripts are loaded in correct order in folio-system.html

Add BEFORE the closing `</body>` tag:

```html
<!-- Load data libraries in correct order -->
<script src="picklists-data.js"></script>
<script src="aircraft-config-data.js"></script>
<script src="airports-data.js"></script>

<script>
// Verify libraries loaded
window.addEventListener('DOMContentLoaded', function() {
    console.log('Checking data libraries...');
    console.log('Picklists loaded:', typeof initializePicklists !== 'undefined');
    console.log('Aircraft loaded:', typeof initializeAircraftDatabase !== 'undefined');
    console.log('Airports loaded:', typeof initializeAirportDatabase !== 'undefined');
    console.log('Total airports:', getAllAirports ? getAllAirports().length : 0);
});
</script>
```

**Fix 2:** Add the actual autocomplete implementation

Add this complete autocomplete system to folio-system.html:

```javascript
// Global variables for autocomplete
let currentAutocompleteField = null;
let currentSelectedIndex = -1;

// Initialize autocomplete when leg is added
function setupLegAutocomplete(legNum) {
    const fromInput = document.getElementById(`leg${legNum}From`);
    const toInput = document.getElementById(`leg${legNum}To`);
    
    if (fromInput) {
        fromInput.addEventListener('input', () => handleAirportInput(legNum, 'From'));
        fromInput.addEventListener('focus', () => showAirportDropdown(legNum, 'From'));
        fromInput.addEventListener('blur', () => {
            setTimeout(() => hideAirportDropdown(legNum, 'From'), 200);
            validateAirportField(legNum, 'From');
        });
    }
    
    if (toInput) {
        toInput.addEventListener('input', () => handleAirportInput(legNum, 'To'));
        toInput.addEventListener('focus', () => showAirportDropdown(legNum, 'To'));
        toInput.addEventListener('blur', () => {
            setTimeout(() => hideAirportDropdown(legNum, 'To'), 200);
            validateAirportField(legNum, 'To');
        });
    }
}

function handleAirportInput(legNum, field) {
    const input = document.getElementById(`leg${legNum}${field}`);
    const value = input.value.trim().toUpperCase();
    
    if (value.length < 2) {
        hideAirportDropdown(legNum, field);
        return;
    }
    
    // Search airports
    const results = searchAirports(value);
    
    if (results && results.length > 0) {
        showAirportResults(legNum, field, results);
    } else {
        hideAirportDropdown(legNum, field);
    }
    
    // Auto-calculate distance when both fields populated
    setTimeout(() => autoCalculateDistance(legNum), 100);
}

function showAirportResults(legNum, field, airports) {
    const listId = `leg${legNum}${field}List`;
    let listEl = document.getElementById(listId);
    
    if (!listEl) {
        // Create dropdown if doesn't exist
        const input = document.getElementById(`leg${legNum}${field}`);
        const wrapper = input.parentElement;
        
        listEl = document.createElement('div');
        listEl.id = listId;
        listEl.className = 'airport-autocomplete-list';
        wrapper.appendChild(listEl);
    }
    
    listEl.innerHTML = '';
    currentSelectedIndex = -1;
    
    airports.forEach((airport, index) => {
        const item = document.createElement('div');
        item.className = 'airport-autocomplete-item';
        
        const codes = airport.iata ? `${airport.icao}/${airport.iata}` : airport.icao;
        
        item.innerHTML = `
            <div class="airport-code">${codes}</div>
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
    setTimeout(() => autoCalculateDistance(legNum), 50);
}

function hideAirportDropdown(legNum, field) {
    const listId = `leg${legNum}${field}List`;
    const listEl = document.getElementById(listId);
    if (listEl) {
        listEl.classList.remove('active');
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
    
    if (!fromInput || !toInput || !distanceInput || !unitSelect) {
        console.log('Distance calc: Missing elements for leg', legNum);
        return;
    }
    
    const fromCode = fromInput.value.trim().toUpperCase();
    const toCode = toInput.value.trim().toUpperCase();
    const unit = unitSelect.value || 'NM';
    
    console.log(`Calculating distance: ${fromCode} to ${toCode} in ${unit}`);
    
    if (fromCode.length >= 3 && toCode.length >= 3) {
        const distance = calculateDistanceByCode(fromCode, toCode, unit);
        
        if (distance !== null && distance > 0) {
            distanceInput.value = distance;
            distanceInput.classList.add('distance-calculated');
            console.log(`Distance calculated: ${distance} ${unit}`);
        } else {
            distanceInput.value = 0;
            distanceInput.classList.remove('distance-calculated');
            console.log('Distance calculation failed - airports not found');
        }
    }
}

function recalculateDistance(legNum) {
    autoCalculateDistance(legNum);
}
```

### Issue 4: AC Dropdown Empty

**Problem:** Aircraft not being loaded for the current organization.

**Fix:** Update the `openNewFolio()` and aircraft dropdown population:

```javascript
function openNewFolio() {
    currentFolioId = null;
    
    // Reset form
    document.getElementById('folioDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('folioStatus').value = 'SCHEDULED';
    document.getElementById('folioType').value = 'COMMERCIAL';
    
    // CRITICAL: Populate AC dropdown
    populateAircraftDropdown();
    
    // Clear legs
    legCount = 0;
    document.getElementById('legsContainer').innerHTML = '';
    
    // Add first leg
    addLeg();
    
    // Show editor
    document.getElementById('folioListView').style.display = 'none';
    document.getElementById('folioEditorView').style.display = 'block';
}

function populateAircraftDropdown() {
    const select = document.getElementById('folioAcReg');
    if (!select) {
        console.error('AC Reg dropdown not found!');
        return;
    }
    
    select.innerHTML = '<option value="">Select Aircraft</option>';
    
    console.log('Current org:', currentOrg);
    
    // Get aircraft for current organization
    const aircraft = getOrgAircraft(currentOrg);
    
    console.log('Aircraft found:', aircraft);
    
    if (!aircraft || aircraft.length === 0) {
        select.innerHTML += '<option value="" disabled>No aircraft configured for this organization</option>';
        return;
    }
    
    aircraft.forEach(ac => {
        const option = document.createElement('option');
        option.value = ac.registration;
        option.textContent = `${ac.registration} - ${ac.model}`;
        select.appendChild(option);
    });
    
    // Select current aircraft if available
    if (currentAircraft) {
        select.value = currentAircraft;
    }
}

// Call this on page load
function init() {
    console.log('Initializing folio system...');
    
    // Initialize all databases
    initializePicklists();
    initializeAircraftDatabase();
    initializeAirportDatabase();
    
    console.log('Airports available:', getAllAirports().length);
    
    // Get aircraft from URL or session
    const urlParams = new URLSearchParams(window.location.search);
    currentAircraft = urlParams.get('aircraft') || sessionStorage.getItem('current_aircraft') || 'ZS-AAM';
    currentOrg = getAircraftOrgKey(currentAircraft);
    
    console.log('Current aircraft:', currentAircraft);
    console.log('Current org:', currentOrg);
    
    document.getElementById('aircraftName').textContent = currentAircraft;
    
    // Load folios for this org
    loadFoliosForOrg();
    renderFolioList();
}

function loadFoliosForOrg() {
    try {
        const stored = localStorage.getItem('flywatch_folios_' + currentOrg);
        if (stored) {
            folios = JSON.parse(stored);
            console.log('Loaded folios:', folios.length);
        } else {
            folios = [];
            console.log('No folios found for org:', currentOrg);
        }
    } catch (error) {
        console.error('Error loading folios:', error);
        folios = [];
    }
}
```

### Issue 5: Add Airports Section to Admin

**Already created in previous files!** See `ADMIN_AIRPORT_MANAGEMENT.md`

But here's a quick integration checklist:

1. Add navigation item
2. Add section HTML
3. Add modal HTML
4. Add JavaScript functions
5. Load airports-data.js

## 🔧 Complete Integration Checklist

### In folio-system.html:

- [ ] Add CSS for airport autocomplete
- [ ] Add script tags for data libraries (in order!)
- [ ] Update `init()` function
- [ ] Update `openNewFolio()` function
- [ ] Add `populateAircraftDropdown()` function
- [ ] Add all autocomplete functions
- [ ] Add `saveFolio()` and `collectLegData()` functions
- [ ] Update `addLeg()` to call `setupLegAutocomplete()`
- [ ] Test each function in console

### In admin-dashboard.html:

- [ ] Add Airports nav item
- [ ] Add Airports section
- [ ] Add Airport modal
- [ ] Add JavaScript functions
- [ ] Load airports-data.js
- [ ] Test CRUD operations

## 🧪 Testing Steps

### Test 1: Aircraft Dropdown
1. Go to Barrick portal
2. Click "Flight Folios"
3. Click "New Folio"
4. Check AC Reg dropdown - should show ZS-BGM, ZS-BGO, ZS-CGO, ZS-KGM
5. ✅ Pass if all 4 aircraft shown

### Test 2: Airport Autocomplete
1. Add a leg
2. Click in FROM field
3. Type "FALA"
4. Should see dropdown with Lanseria
5. Click to select
6. ✅ Pass if FALA populates field

### Test 3: Distance Calculation
1. FROM: FALA
2. TO: FACT
3. Wait 100ms
4. Distance should auto-fill: 1235 NM
5. Change unit to KM
6. Should update to: 2288 KM
7. ✅ Pass if auto-calculates

### Test 4: Folio Save & Display
1. Fill in folio details
2. Add 2 legs with airports
3. Click "Save and Close"
4. Check folio list
5. ✅ Pass if new folio appears in list

### Test 5: Admin Airports
1. Go to admin dashboard
2. Click "Airport Database"
3. Should see 168 airports
4. Search for "FALA"
5. Should filter to show Lanseria
6. ✅ Pass if search works

## 🚨 Common Issues & Solutions

### Issue: "getAllAirports is not defined"
**Solution:** airports-data.js not loaded. Check script tag order.

### Issue: "getOrgAircraft is not defined"
**Solution:** aircraft-config-data.js not loaded. Check script tag order.

### Issue: Dropdown shows but selecting doesn't work
**Solution:** Event handler timing. Use `onclick` not `addEventListener` in dynamic HTML.

### Issue: Distance always shows 0
**Solution:** Airport codes not being found. Check console for airport lookup failures.

### Issue: Folios save but don't show
**Solution:** renderFolioList() not being called. Check localStorage key matches org.

## 📝 Console Debug Commands

Test in browser console:

```javascript
// Check libraries loaded
console.log('Airports:', getAllAirports().length);
console.log('Aircraft:', getAllAircraftDatabase());
console.log('Current org:', currentOrg);

// Test airport search
console.log(searchAirports('FALA'));

// Test distance calculation
console.log(calculateDistanceByCode('FALA', 'FACT', 'NM'));

// Test aircraft for org
console.log(getOrgAircraft('barrick'));

// Check folios
console.log('Folios:', folios);
```

## ✅ Success Criteria

After fixes:
- ✅ AC dropdown shows correct aircraft for organization
- ✅ Typing in airport field shows autocomplete
- ✅ Selecting airport populates field
- ✅ Distance auto-calculates when both airports entered
- ✅ Saved folios appear in list immediately
- ✅ Admin can view all 168 airports
- ✅ Admin can search/filter airports
- ✅ Admin can add/edit/delete airports

---

**Ready to implement these fixes!**
