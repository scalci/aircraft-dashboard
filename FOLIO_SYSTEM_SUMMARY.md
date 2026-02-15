# FlyWatch Flight Folio System - Implementation Summary

## What We've Built

### 1. **Flight Folio Data Capture System** (`folio-system.html`)

A comprehensive web-based system for capturing flight data with:

#### Folio List View
- Filterable table showing all folios
- Columns: Action, ID, Date, Status, Reg, Folio, Flight No, Route, Legs, Distance, Sync, Owner, Version
- Status indicators: SCHEDULED (orange), COMPLETED (green)
- Sync status legend (4 states: Synced, Not Synced, Error, Owned by other)
- Controls: Aircraft filter, Date filter, Sort options
- **New Entry** button to create folios

#### Folio Editor (6 Tabs)

**Tab 1 - Folio Header:**
- **Folio Details Section:**
  - Date, AC Reg, Status (SCHEDULED/IN PROGRESS/COMPLETED/CANCELLED)
  - Type (COMMERCIAL/PRIVATE/CHARTER/TRAINING)
  - Folio No (auto-generated), Flight No, Order No, Invoice No
  - Quote No, Auth No, Clearance No, Trip Id
  - Notes (text area)

- **Aircraft Parameters Section:**
  - Cruising SPD Kts, Fuel Burn/Hr, Fuel Burn/Hr (Actual)
  - Fuel Type, Engine Type
  - Last Hobbs, Last Folio, Last Destination
  - Oil Unit (QT/L), Fuel Burn Unit (GAL/L/LBS/KG)
  - Fuel Uplift, Engines
  - Total Duration, Total Fuel Burn, Total Fuel Uplift, Landings (computed)

**Tab 2 - Leg Data:**
- **Add Leg** button (supports multiple legs)
- Each leg contains:
  - From, To, Distance Unit, Distance
  - PAX (passengers)
  - Hobbs On, Hobbs Off, Hobbs Time
  - Time Takeoff, Time Land, Flight Time
  - Off Chocks Time, On Chocks Time, Chocks-to-Chocks Time
  - Fuel Before, Fuel After, Fuel Burn
  - Fuel Uplift, Fuel Uplift Ind (indicator)
  - Oil Eng#1, Oil Eng#2
  - Landings
  - Reduced TO, Approach, PIC, F/O

**Tab 3 - Trends:**
- **Flight Performance:**
  - Cruise FL, IAS, OATC, Mach, TAS

- **Component Life (This Folio Only):**
  - Airframe (Hours, Cycles)
  - Engine 1 (Hours, Cycles)
  - Engine 2 (Hours, Cycles)
  - Engine 3 (Hours, Cycles)
  - APU (Hours, Cycles)

- **Trend Parameters** (for Eng 1, 2, 3):
  - Start Temp
  - ITT (Interstage Turbine Temperature)
  - Torque
  - RPM
  - Fuel Flow
  - N1
  - Oil Temp
  - Oil Press
  - Generator Load
  - EGT
  - Vibration
  - Manifold Pressure
  - T6

**Tab 4-6 - Future Features:**
- Route Expenses (placeholder)
- Crew Expenses (placeholder)
- Snags / Defects (placeholder)

### 2. **Integration with Customer Portals**

Each portal now has 3 dashboard options:

**For Individual Aircraft (Highveld, McCormick):**
- 📝 Flight Folios (NEW)
- 📄 A4 Summary Dashboard
- 📊 TREND Analysis & Charts

**For Barrick Fleet (4 aircraft):**
Each aircraft has its own 3 buttons including Flight Folios

### 3. **Current Data Storage**

- Uses browser `sessionStorage` (demo mode)
- Auto-generates folio IDs (6-character alphanumeric)
- Passes aircraft context via URL parameter

### 4. **Design Patterns Implemented**

✅ **Multi-tab Interface** - Clean organization of complex data
✅ **Dynamic Leg Addition** - Scalable for multi-leg flights  
✅ **Auto-calculated Fields** - Totals computed from leg data
✅ **Status Management** - Workflow support (Scheduled → In Progress → Completed)
✅ **Dark Theme** - Matches FlyWatch brand (blue/aviation theme)
✅ **Responsive Grid Layouts** - Works on mobile/tablet/desktop

## What Needs to be Added (Production)

### Backend Integration Required

Based on the FlyWatch architecture document, the folio system needs:

1. **API Endpoints:**
   ```
   POST /api/orgs/{orgId}/folios
   GET /api/orgs/{orgId}/folios
   GET /api/orgs/{orgId}/folios/{folioId}
   PUT /api/orgs/{orgId}/folios/{folioId}
   DELETE /api/orgs/{orgId}/folios/{folioId}
   POST /api/orgs/{orgId}/folios/{folioId}/legs
   ```

2. **Database Tables:**
   - `folio` (header data)
   - `folio_leg` (leg data, one-to-many)
   - `folio_trend_data` (trend parameters)
   - `folio_attachment` (evidence/documents)

3. **Compliance Integration:**
   - Link TREND data → `compliance_item_instance`
   - Auto-update aircraft hours/cycles
   - Create defects from snags tab
   - Attach fuel slips to finance module

4. **Sync Status:**
   - Replace sessionStorage with API calls
   - Implement offline-first with service workers
   - Sync queue for mobile/offline capture
   - Conflict resolution

5. **Picklist Integration:**
   - Aircraft dropdown → from org aircraft list
   - Status options → from compliance status engine
   - Type options → from lookup values
   - Fuel units, Oil units → from system picklists

## File Structure

```
/mnt/user-data/outputs/
├── folio-system.html          # Complete folio capture system
├── highveld-portal.html       # Updated with folio link
├── mccormick-portal.html      # Updated with folio link
├── barrick-portal.html        # Updated with folio links (4 aircraft)
└── [all other dashboard files]
```

## Next Steps

1. **Upload Picklist Screenshots** - To understand picklist admin UI requirements
2. **Backend Implementation** - Using .NET 8 architecture from technical doc
3. **Mobile Optimization** - Offline capture capability
4. **Evidence Attachments** - File upload for fuel slips, release-to-service docs
5. **Validation Rules** - Required fields, data constraints
6. **Auto-calculations** - Flight time from takeoff/land times, fuel burn from before/after

## Architecture Alignment

The folio system is designed to integrate with:

✅ **Multi-tenant Model** - OrgId context throughout  
✅ **Compliance Engine** - TREND data feeds dashboards  
✅ **Document Management** - Attachments link to FileObject  
✅ **Audit Trail** - Created/Updated by/at fields ready  
✅ **Status Engine** - Computed statuses (scheduled/completed/etc)  

## URLs After Deployment

```
Main Login:
https://scalci.github.io/aircraft-dashboard/

Highveld Folio System:
https://scalci.github.io/aircraft-dashboard/folio-system.html?aircraft=ZS-AAM

McCormick Folio System:
https://scalci.github.io/aircraft-dashboard/folio-system.html?aircraft=ZS-MPT

Barrick Folio Systems:
https://scalci.github.io/aircraft-dashboard/folio-system.html?aircraft=ZS-BGM
https://scalci.github.io/aircraft-dashboard/folio-system.html?aircraft=ZS-BGO
https://scalci.github.io/aircraft-dashboard/folio-system.html?aircraft=ZS-CGO
https://scalci.github.io/aircraft-dashboard/folio-system.html?aircraft=ZS-KGM
```

---

**Status:** Frontend complete, backend integration pending
**Demo:** Fully functional with sample data
**Production Ready:** After backend API integration
