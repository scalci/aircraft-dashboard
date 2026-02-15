# SIDEBAR NAVIGATION PORTALS - V3

## 🎯 What's New

### Complete Reorganization with Sidebar Navigation

Each customer portal now has:

**FIXED SIDEBAR (Left Side):**
- Logo/Title at top
- Navigation menu with icons
- Logout button at bottom
- Active section highlighting
- Smooth transitions

**MAIN CONTENT AREA (Right Side):**
- Top bar with current section title
- Section content that changes based on navigation
- All existing functionality preserved

---

## 📋 Navigation Structure

Each portal has **5 main sections:**

### 1. 📋 COMPLIANCE (First/Default)
**Shows:**
- Aircraft Compliance Dashboard (matrix)
- Crew Compliance Dashboard (matrix)
- Both embedded on same page
- File attachments
- Calendar date pickers
- Color-coded expiry tracking

### 2. ✈️ FLEET OVERVIEW
**Shows:**
- Grid of all aircraft cards
- Quick access buttons for each aircraft
- Links to Folios and TREND charts

### 3. 📝 FLIGHT FOLIOS
**Shows:**
- Links to folio system for each aircraft
- Organized by aircraft registration
- Direct access to folio management

### 4. 📊 TREND CHARTS
**Shows:**
- Links to TREND analysis for each aircraft
- Engine performance charts
- Historical data visualization

### 5. 📄 DOCUMENTS
**Shows:**
- A4 summary reports
- Other documents per aircraft
- Download/view access

---

## 🎨 Visual Layout

```
╔═══════════════════════════════════════════════════════╗
║ SIDEBAR          │ MAIN CONTENT AREA                  ║
║                  │                                     ║
║ BARRICK          │ ┌─────────────────────────────┐   ║
║ Aviation Portal  │ │ Compliance Dashboard        │   ║
║                  │ └─────────────────────────────┘   ║
║ ┌──────────────┐ │                                     ║
║ │📋 Compliance │ │ [Aircraft Compliance Matrix]       ║
║ │✈️ Fleet      │ │                                     ║
║ │📝 Folios     │ │ [Crew Compliance Matrix]           ║
║ │📊 Trends     │ │                                     ║
║ │📄 Documents  │ │                                     ║
║ └──────────────┘ │                                     ║
║                  │                                     ║
║ [🚪 Logout]      │                                     ║
╚═══════════════════════════════════════════════════════╝
```

---

## 🎯 Features Per Section

### COMPLIANCE SECTION
- **Aircraft Compliance:**
  - Matrix table (Aircraft × Documents)
  - 15 document types
  - Color-coded expiry dates
  - Click cells to add/edit
  - Upload files (PDFs, images)
  - 📎 icon when file attached

- **Crew Compliance:**
  - Matrix table (Crew × Documents)
  - 15 crew document types
  - Same functionality as aircraft
  - Filter by organization (admin only)

### FLEET OVERVIEW
- Visual grid of aircraft
- Color-coded by tail number
- Quick stats display
- Direct links to:
  - Flight Folios
  - TREND Charts

### FLIGHT FOLIOS
- Organized list of aircraft
- One-click access to folio system
- Opens folio management per aircraft
- Maintains existing folio functionality

### TREND CHARTS
- Access to TREND analysis
- Engine performance data
- ITT/EGT/Fuel charts
- Per-aircraft viewing

### DOCUMENTS
- A4 summary reports
- Download/view access
- Organized by aircraft
- Future: Upload custom documents

---

## 🔄 Navigation Behavior

### How It Works:
1. **Click any sidebar item** → Section changes
2. **Active section highlighted** with green border
3. **Page title updates** in top bar
4. **Smooth transitions** between sections
5. **No page reloads** - all instant

### Default Section:
- **Compliance** loads first (as requested)
- Most important/frequently used
- Both Aircraft and Crew compliance visible

---

## 🎨 Color Coding

**Barrick Portal:**
- BGM: Blue (#4472C4)
- BGO: Orange (#ED7D31)  
- CGO: Green (#70AD47)
- KGM: Yellow (#FFC000)

**Highveld Portal:**
- AAM: Blue (#5DADE2)

**McCormick Portal:**
- MPT: Blue (#5DADE2)

**Compliance Colors:**
- 🔴 RED: Expired/≤10 days
- 🟡 YELLOW: 11-30 days
- 🟠 ORANGE: 31-60 days
- 🟢 GREEN: >60 days
- ⚫ GRAY: Permanent

---

## 📱 Responsive Design

**Desktop (>1024px):**
- Sidebar: 280px wide
- Full navigation visible
- All features accessible

**Tablet (768px-1024px):**
- Sidebar: 220px wide
- Compact navigation
- Still fixed position

**Mobile (<768px):**
- Sidebar: Full width top
- Collapsible menu
- Touch-optimized

---

## 🚀 Benefits

### For Users:
✅ **Faster Navigation** - One click to any section
✅ **Clear Organization** - Everything categorized
✅ **Compliance First** - Most important at top
✅ **No Page Reloads** - Instant switching
✅ **Visual Clarity** - Know where you are

### For Administrators:
✅ **Consistent Layout** - Same across all portals
✅ **Easy to Extend** - Add new sections easily
✅ **Branded** - Each org has unique styling
✅ **Professional** - Modern, clean interface

---

## 📦 Files Structure

**Portal Files (3):**
- barrick-portal-v3.html
- highveld-portal-v3.html
- mccormick-portal-v3.html

**Required Scripts:**
- compliance-widget-v2.js
- aircraft-config-data.js

**Other Systems:**
- folio-system.html (unchanged)
- TREND charts (unchanged)
- A4 summaries (unchanged)

---

## 🔐 Access Control

**Login Credentials:**
- Barrick: PIN `FLEET24`
- Highveld: PIN `HVM2024`
- McCormick: PIN `JMC2024`

**Session Management:**
- Stored in sessionStorage
- Persists during browser session
- Logout clears session
- Redirects to main login

---

## 💡 Usage Examples

### Example 1: Check Compliance
1. Login to portal
2. **Already on Compliance section** (default)
3. See Aircraft compliance matrix
4. Scroll down → See Crew compliance matrix
5. Click any cell → Add/edit document

### Example 2: View TREND Charts
1. Login to portal
2. Click **"📊 Trends"** in sidebar
3. See grid of aircraft
4. Click **"📊 View TREND Charts"** for desired aircraft
5. Opens TREND analysis page

### Example 3: Manage Folios
1. Login to portal
2. Click **"📝 Folios"** in sidebar
3. See list of aircraft
4. Click **"📝 Manage Folios"** for desired aircraft
5. Opens folio management system

---

## 🎓 Best Practices

### For Users:
1. **Start at Compliance** - Check expiring documents daily
2. **Use Sidebar** - Don't use browser back button
3. **Stay Logged In** - Session persists until logout
4. **Check All Sections** - Explore full portal

### For Administrators:
1. **Review Compliance Weekly** - Check all orgs
2. **Update Documents** - Keep current
3. **Upload Files** - Attach PDFs for verification
4. **Monitor Expiries** - Act on RED/YELLOW items

---

## 🔧 Customization Options

### Future Enhancements:
- [ ] Collapsible sidebar
- [ ] Dark/Light theme toggle
- [ ] Custom sections per customer
- [ ] Notification badges
- [ ] Search functionality
- [ ] Export compliance reports
- [ ] Email alerts for expiring docs

---

## 📞 Support

**Common Questions:**

**Q: How do I switch sections?**
A: Click any item in the left sidebar.

**Q: Where is compliance now?**
A: First section, loads by default.

**Q: Can I still access folios?**
A: Yes! Click "📝 Folios" in sidebar.

**Q: Is the old layout gone?**
A: Yes, replaced with better organized sidebar layout.

**Q: Do I need to re-login?**
A: Only once per browser session.

---

**Version:** V3.0 - Sidebar Navigation
**Date:** February 15, 2026
**Status:** Ready for deployment
