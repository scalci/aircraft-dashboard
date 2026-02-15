# Admin Airport Database Management

## Adding Airport Management to Admin Dashboard

### Step 1: Add Navigation Item

In admin-dashboard.html, after the Aircraft Configuration nav item:

```html
<li class="nav-item">
    <a href="#" class="nav-link" onclick="showSection('airports')">
        <span class="nav-icon">🌍</span>
        <span>Airport Database</span>
    </a>
</li>
```

### Step 2: Add Airport Management Section

Add this after the aircraft configuration section:

```html
<!-- AIRPORT DATABASE SECTION -->
<div id="section-airports" class="page-section">
    <div class="content-card">
        <div class="card-header">
            <h2 class="card-title">Airport Database Management</h2>
            <button class="btn btn-success" onclick="openAddAirportModal()">+ Add Airport</button>
        </div>

        <div class="search-filter-bar">
            <input type="text" class="search-input" id="searchAirport" placeholder="Search airports (ICAO, IATA, name, city)..." onkeyup="filterAirports()">
            <select class="filter-select" id="filterCountry" onchange="filterAirports()">
                <option value="">All Countries</option>
                <option value="South Africa">South Africa</option>
                <option value="Namibia">Namibia</option>
                <option value="Botswana">Botswana</option>
                <option value="Zimbabwe">Zimbabwe</option>
                <option value="Mozambique">Mozambique</option>
            </select>
            <button class="btn btn-secondary" onclick="importFromOurAirports()">⬇ Import from OurAirports</button>
        </div>

        <div class="stats-row" style="display: flex; gap: 20px; margin-bottom: 20px;">
            <div style="background: rgba(74, 144, 226, 0.2); padding: 15px; border-radius: 8px; flex: 1; text-align: center;">
                <div style="font-size: 2rem; font-weight: 700; color: var(--secondary);" id="totalAirports">0</div>
                <div style="color: var(--pale-blue); font-size: 0.9rem;">Total Airports</div>
            </div>
            <div style="background: rgba(112, 173, 71, 0.2); padding: 15px; border-radius: 8px; flex: 1; text-align: center;">
                <div style="font-size: 2rem; font-weight: 700; color: var(--success);" id="totalCountries">0</div>
                <div style="color: var(--pale-blue); font-size: 0.9rem;">Countries</div>
            </div>
        </div>

        <div style="overflow-x: auto;">
            <table class="picklist-table">
                <thead>
                    <tr>
                        <th>ICAO</th>
                        <th>IATA</th>
                        <th>Name</th>
                        <th>City</th>
                        <th>Country</th>
                        <th>Lat/Lon</th>
                        <th>Elevation (ft)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="airportTableBody">
                    <!-- Populated by JavaScript -->
                </tbody>
            </table>
        </div>
    </div>
</div>
```

### Step 3: Add Airport Modal

Add this before the aircraft modal:

```html
<!-- Add/Edit Airport Modal -->
<div id="airportModal" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h2 class="modal-title" id="airportModalTitle">Add New Airport</h2>
        </div>
        
        <form id="airportForm" onsubmit="saveAirport(event)">
            <div class="form-group">
                <label class="form-label">ICAO Code *</label>
                <input type="text" class="form-input" id="airportICAO" required maxlength="4" placeholder="e.g., FALA" style="text-transform: uppercase;">
            </div>

            <div class="form-group">
                <label class="form-label">IATA Code</label>
                <input type="text" class="form-input" id="airportIATA" maxlength="3" placeholder="e.g., HLA" style="text-transform: uppercase;">
            </div>

            <div class="form-group">
                <label class="form-label">Airport Name *</label>
                <input type="text" class="form-input" id="airportName" required placeholder="e.g., Lanseria International Airport">
            </div>

            <div class="form-group">
                <label class="form-label">City *</label>
                <input type="text" class="form-input" id="airportCity" required placeholder="e.g., Johannesburg">
            </div>

            <div class="form-group">
                <label class="form-label">Country *</label>
                <input type="text" class="form-input" id="airportCountry" required placeholder="e.g., South Africa">
            </div>

            <div class="form-group">
                <label class="form-label">Latitude (Decimal) *</label>
                <input type="number" class="form-input" id="airportLat" required step="0.0001" placeholder="e.g., -25.9385">
                <div class="form-hint">Negative for South, positive for North (-90 to 90)</div>
            </div>

            <div class="form-group">
                <label class="form-label">Longitude (Decimal) *</label>
                <input type="number" class="form-input" id="airportLon" required step="0.0001" placeholder="e.g., 27.9261">
                <div class="form-hint">Negative for West, positive for East (-180 to 180)</div>
            </div>

            <div class="form-group">
                <label class="form-label">Elevation (feet)</label>
                <input type="number" class="form-input" id="airportElevation" placeholder="e.g., 4517">
            </div>

            <div class="modal-actions">
                <button type="button" class="btn btn-secondary" onclick="closeAirportModal()">Cancel</button>
                <button type="submit" class="btn btn-success">Save Airport</button>
            </div>
        </form>
    </div>
</div>
```

### Step 4: Add JavaScript Functions

Add to admin-dashboard.html `<script>` section:

```javascript
let currentEditAirport = null;

// Airport Management Functions
function loadAirportTable() {
    const airports = getAllAirports();
    const tbody = document.getElementById('airportTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    airports.forEach(airport => {
        const row = createAirportRow(airport);
        tbody.appendChild(row);
    });
    
    updateAirportStats();
}

function createAirportRow(airport) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><strong>${airport.icao}</strong></td>
        <td>${airport.iata || '-'}</td>
        <td>${airport.name}</td>
        <td>${airport.city}</td>
        <td>${airport.country}</td>
        <td style="font-family: 'JetBrains Mono', monospace; font-size: 0.85rem;">
            ${airport.lat.toFixed(4)}, ${airport.lon.toFixed(4)}
        </td>
        <td>${airport.elevation || '-'}</td>
        <td class="actions-cell">
            <button class="btn btn-secondary btn-small" onclick="editAirport('${airport.icao}')">✎ Edit</button>
            <button class="btn btn-primary btn-small" onclick="deleteAirportConfirm('${airport.icao}')">✗ Delete</button>
        </td>
    `;
    return row;
}

function updateAirportStats() {
    const airports = getAllAirports();
    const countries = new Set(airports.map(a => a.country));
    
    document.getElementById('totalAirports').textContent = airports.length;
    document.getElementById('totalCountries').textContent = countries.size;
}

function filterAirports() {
    const searchText = (document.getElementById('searchAirport')?.value || '').toLowerCase();
    const filterCountry = document.getElementById('filterCountry')?.value || '';

    const rows = document.getElementById('airportTableBody')?.getElementsByTagName('tr') || [];
    
    for (let row of rows) {
        const icao = row.cells[0].textContent.toLowerCase();
        const iata = row.cells[1].textContent.toLowerCase();
        const name = row.cells[2].textContent.toLowerCase();
        const city = row.cells[3].textContent.toLowerCase();
        const country = row.cells[4].textContent;

        const matchesSearch = icao.includes(searchText) || 
                             iata.includes(searchText) || 
                             name.includes(searchText) || 
                             city.includes(searchText);
        const matchesCountry = !filterCountry || country === filterCountry;

        row.style.display = (matchesSearch && matchesCountry) ? '' : 'none';
    }
}

function openAddAirportModal() {
    currentEditAirport = null;
    
    document.getElementById('airportModalTitle').textContent = 'Add New Airport';
    document.getElementById('airportICAO').value = '';
    document.getElementById('airportIATA').value = '';
    document.getElementById('airportName').value = '';
    document.getElementById('airportCity').value = '';
    document.getElementById('airportCountry').value = '';
    document.getElementById('airportLat').value = '';
    document.getElementById('airportLon').value = '';
    document.getElementById('airportElevation').value = '';
    
    document.getElementById('airportModal').classList.add('active');
}

function editAirport(icao) {
    currentEditAirport = icao;
    
    const airport = getAirportByICAO(icao);
    if (!airport) return;
    
    document.getElementById('airportModalTitle').textContent = 'Edit Airport';
    document.getElementById('airportICAO').value = airport.icao;
    document.getElementById('airportIATA').value = airport.iata || '';
    document.getElementById('airportName').value = airport.name;
    document.getElementById('airportCity').value = airport.city;
    document.getElementById('airportCountry').value = airport.country;
    document.getElementById('airportLat').value = airport.lat;
    document.getElementById('airportLon').value = airport.lon;
    document.getElementById('airportElevation').value = airport.elevation || '';
    
    document.getElementById('airportModal').classList.add('active');
}

function closeAirportModal() {
    document.getElementById('airportModal').classList.remove('active');
}

function saveAirport(event) {
    event.preventDefault();
    
    const airportData = {
        icao: document.getElementById('airportICAO').value.trim().toUpperCase(),
        iata: document.getElementById('airportIATA').value.trim().toUpperCase() || null,
        name: document.getElementById('airportName').value.trim(),
        city: document.getElementById('airportCity').value.trim(),
        country: document.getElementById('airportCountry').value.trim(),
        lat: parseFloat(document.getElementById('airportLat').value),
        lon: parseFloat(document.getElementById('airportLon').value),
        elevation: parseInt(document.getElementById('airportElevation').value) || null
    };
    
    // Validate
    if (airportData.lat < -90 || airportData.lat > 90) {
        alert('Latitude must be between -90 and 90');
        return;
    }
    
    if (airportData.lon < -180 || airportData.lon > 180) {
        alert('Longitude must be between -180 and 180');
        return;
    }
    
    upsertAirport(airportData);
    
    loadAirportTable();
    closeAirportModal();
    
    alert('Airport saved successfully!');
}

function deleteAirportConfirm(icao) {
    const airport = getAirportByICAO(icao);
    if (!airport) return;
    
    if (confirm(`Delete airport:\n\n${icao} - ${airport.name}\n\nThis action cannot be undone.`)) {
        deleteAirport(icao);
        loadAirportTable();
        alert('Airport deleted successfully!');
    }
}

async function importFromOurAirports() {
    if (!confirm('Import airports from OurAirports?\n\nThis will download and add airports from the OurAirports database.\n\nContinue?')) {
        return;
    }
    
    try {
        const response = await fetch('https://davidmegginson.github.io/ourairports-data/airports.csv');
        const csv = await response.text();
        
        // Simple CSV parsing (production should use a proper library)
        const lines = csv.split('\n');
        const headers = lines[0].split(',');
        let imported = 0;
        
        for (let i = 1; i < Math.min(lines.length, 1000); i++) { // Limit to 1000 for demo
            const values = lines[i].split(',');
            if (values.length < headers.length) continue;
            
            const airport = {
                icao: values[1]?.replace(/"/g, '').trim() || '',
                iata: values[13]?.replace(/"/g, '').trim() || null,
                name: values[3]?.replace(/"/g, '').trim() || '',
                city: values[10]?.replace(/"/g, '').trim() || '',
                country: values[8]?.replace(/"/g, '').trim() || '',
                lat: parseFloat(values[4]) || 0,
                lon: parseFloat(values[5]) || 0,
                elevation: parseInt(values[6]) || null
            };
            
            if (airport.icao && airport.name && airport.lat && airport.lon) {
                upsertAirport(airport);
                imported++;
            }
        }
        
        loadAirportTable();
        alert(`Successfully imported ${imported} airports from OurAirports!`);
        
    } catch (error) {
        alert('Error importing airports: ' + error.message);
    }
}
```

### Step 5: Update window.onload

Add to initialization:

```javascript
window.onload = function() {
    initializePicklists();
    initializeAircraftDatabase();
    initializeAirportDatabase(); // Add this
    loadDashboardStats();
    loadPicklistTable();
    loadEntityFilter();
    loadAircraftTable();
    loadAirportTable(); // Add this
};
```

### Step 6: Update showSection

Add 'airports' to the titles object:

```javascript
const titles = {
    'dashboard': 'Dashboard',
    'picklists': 'Picklist Management',
    'aircraft': 'Aircraft Configuration',
    'airports': 'Airport Database', // Add this
    'users': 'User Management',
    // ...
};
```

### Step 7: Load airports-data.js

Add script tag in admin-dashboard.html:

```html
<script src="picklists-data.js"></script>
<script src="aircraft-config-data.js"></script>
<script src="airports-data.js"></script> <!-- Add this -->
```

## Features

✅ **View all airports** in sortable table  
✅ **Search** by ICAO, IATA, name, or city  
✅ **Filter** by country  
✅ **Add** new airports manually  
✅ **Edit** existing airports  
✅ **Delete** airports  
✅ **Import** from OurAirports CSV  
✅ **Stats** showing total airports and countries  
✅ **Validation** for coordinates  

## Import from OurAirports

The "Import from OurAirports" button:
1. Downloads the latest airports.csv from OurAirports GitHub
2. Parses the CSV data
3. Imports airports (limited to 1000 in demo)
4. Updates the database

For production, you should:
- Use a proper CSV parser library
- Import all airports (28,000+)
- Run as a scheduled background job
- Show progress indicator
- Allow filtering by region/country before import

## Testing

1. Click "Airport Database" in admin nav
2. See list of pre-loaded airports
3. Search for "FALA" - should show Lanseria
4. Click "Edit" on FALA
5. Change city to "Johannesburg/Lanseria"
6. Save - should update
7. Click "+ Add Airport"
8. Add a new airport with valid data
9. Should appear in list

## API Integration (Production)

Replace localStorage with backend API:

```javascript
async function getAllAirports() {
    const response = await fetch('/api/airports');
    return await response.json();
}

async function upsertAirport(airportData) {
    await fetch('/api/airports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(airportData)
    });
}
```

Use the .NET code from the document provided for the backend implementation.
