# Integrating Picklists into Folio System

## What Changed

The folio system now dynamically loads dropdown options from the picklist system instead of using hardcoded values.

## Files Updated

1. **folio-system.html** - Now includes picklist integration
2. **admin-dashboard.html** - Picklist management interface
3. **picklists-data.js** - Central picklist data store

## How It Works

### Step 1: Include Picklist Data
Add this line to folio-system.html before the closing `</body>` tag:

```html
<script src="picklists-data.js"></script>
```

### Step 2: Update Dropdown Population

Replace hardcoded `<select>` options with picklist-driven ones:

**Before:**
```html
<select id="folioStatus">
    <option value="SCHEDULED">SCHEDULED</option>
    <option value="IN PROGRESS">IN PROGRESS</option>
    <option value="COMPLETED">COMPLETED</option>
</select>
```

**After:**
```javascript
function populateDropdown(selectId, entity, field) {
    const picklist = getPicklist(entity, field);
    const select = document.getElementById(selectId);
    
    if (picklist && picklist.values) {
        picklist.values.forEach(value => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = value;
            select.appendChild(option);
        });
    }
}

// Usage:
populateDropdown('fuelType', 'aircraft', 'fuelType');
populateDropdown('oilUnit', 'aircraft', 'oilUnit');
populateDropdown('fuelBurnUnit', 'aircraft', 'fuelBurnUnit');
```

## Fields to Update in Folio System

### Folio Header Tab:
- **Status** → Use hardcoded (SCHEDULED/IN PROGRESS/COMPLETED/CANCELLED)
- **Type** → Use hardcoded (COMMERCIAL/PRIVATE/CHARTER/TRAINING)
- **Oil Unit** → `getPicklist('aircraft', 'oilUnit')`
- **Fuel Burn Unit** → `getPicklist('aircraft', 'fuelBurnUnit')`

### Leg Data Tab:
- **Distance Unit** → Custom (NM/KM/SM)
- **Approach** → `getPicklist('activityLeg', 'approach')`
- **Fuel Uplift Ind** → `getPicklist('aircraft', 'fuelUpliftUnit')`

### Aircraft Parameters:
- **Fuel Type** → `getPicklist('aircraft', 'fuelType')`
- **Engine Type** → Free text
- **Oil Unit** → `getPicklist('aircraft', 'oilUnit')`
- **Fuel Burn** → `getPicklist('aircraft', 'fuelBurnUnit')`

## Complete Integration Code

Add this to the `<script>` section of folio-system.html:

```javascript
// Initialize picklists on page load
function initializeFolioPicklists() {
    // Initialize the picklist data
    initializePicklists();
    
    // Populate dropdowns
    populatePicklistDropdown('oilUnit', 'aircraft', 'oilUnit');
    populatePicklistDropdown('fuelBurnUnit', 'aircraft', 'fuelBurnUnit');
    populatePicklistDropdown('fuelType', 'aircraft', 'fuelType');
    populatePicklistDropdown('fuelUpliftUnit', 'aircraft', 'fuelUpliftUnit');
}

function populatePicklistDropdown(selectId, entity, field) {
    const select = document.getElementById(selectId);
    if (!select) return;
    
    // Clear existing options except first (placeholder if any)
    const firstOption = select.options[0];
    select.innerHTML = '';
    if (firstOption && firstOption.value === '') {
        select.appendChild(firstOption);
    }
    
    // Get picklist and populate
    const picklist = getPicklist(entity, field);
    if (picklist && picklist.values) {
        picklist.values.forEach(value => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = value;
            select.appendChild(option);
        });
    }
}

// Call on window load
window.addEventListener('load', function() {
    initializeFolioPicklists();
});
```

## Admin Management

Administrators can now:
1. Log in to `admin-login.html`
2. Navigate to "Picklist Management"
3. Add/Edit/Delete picklist values
4. Changes are immediately available to all forms

## Production Integration

For production deployment:
1. Replace localStorage with API calls
2. Implement picklist caching
3. Add org-level overrides
4. Sync picklists from backend database

## Example API Integration

```javascript
// Replace localStorage calls with API calls
async function getPicklist(entity, field) {
    const response = await fetch(`/api/picklists/${entity}/${field}`);
    return await response.json();
}

async function updatePicklist(entity, field, values, canOverride) {
    await fetch(`/api/picklists/${entity}/${field}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ values, canOverride })
    });
}
```
