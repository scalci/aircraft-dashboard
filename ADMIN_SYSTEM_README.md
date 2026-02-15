# FlyWatch.AI Complete System - Customer Portals + Admin

## 🎯 What's Included

This package contains a complete web-based system for FlyWatch.AI with:

### 1. **Customer Portal System** (Public-Facing)
- Unified login page with PIN authentication
- 3 customer portals (Highveld, McCormick, Barrick)
- Flight folio data capture system
- TREND analysis dashboards
- A4 printable summaries

### 2. **Admin Portal System** (Restricted Access)
- Separate admin login (username/password)
- Picklist management (complete CRUD)
- Dashboard with statistics
- User management (placeholder)
- Organization management (placeholder)
- Compliance engine config (placeholder)
- Audit logs (placeholder)

## 📂 File Structure

```
flywatch-complete-package/
├── CUSTOMER PORTAL FILES
│   ├── index.html                    # Customer login (PIN-based)
│   ├── highveld-portal.html          # Highveld portal
│   ├── mccormick-portal.html         # McCormick portal
│   ├── barrick-portal.html           # Barrick fleet portal
│   ├── folio-system.html             # Flight folio capture
│   ├── ZS-*_A4_infographic.html      # A4 dashboards (6 files)
│   └── *_trend_infographic.html      # TREND charts (6 files)
│
├── ADMIN PORTAL FILES
│   ├── admin-login.html              # Admin login (separate from customer)
│   ├── admin-dashboard.html          # Admin dashboard with picklist mgmt
│   └── picklists-data.js             # Picklist data structure & API
│
├── DOCUMENTATION
│   ├── README.txt                    # Quick start (old)
│   ├── ADMIN_SYSTEM_README.md        # This file
│   ├── QUICK_START.txt               # Customer access guide
│   ├── UPDATE_FOLIO_WITH_PICKLISTS.md # Integration guide
│   ├── FOLIO_SYSTEM_SUMMARY.md       # Folio system documentation
│   └── CUSTOMER_ACCESS_GUIDE.md      # How to share with customers
│
├── ASSETS
│   └── flywatch-logo.svg             # Logo file
│
└── DATA FILES (Optional)
    └── *.xlsx                        # Excel dashboards
```

## 🚀 Quick Start

### Customer Portal Deployment

1. **Upload to GitHub Pages:**
   - Go to your repo: `https://github.com/scalci/aircraft-dashboard`
   - Upload ALL files from this package
   - Wait 2 minutes for deployment

2. **Share with Customers:**
   ```
   URL: https://scalci.github.io/aircraft-dashboard/
   
   Highveld PIN: HVM2024
   McCormick PIN: MPT360
   Barrick PIN: FLEET24
   ```

### Admin Portal Deployment

1. **Upload admin files to the same repo**

2. **Access Admin Panel:**
   ```
   URL: https://scalci.github.io/aircraft-dashboard/admin-login.html
   
   Default Credentials:
   Username: admin
   Password: FlyWatch2024!
   
   OR
   
   Username: superadmin
   Password: FlyWatch2024!
   ```

3. **🔒 SECURITY WARNING:**
   - Change default passwords immediately!
   - In production, implement server-side authentication
   - Current auth is client-side demo only

## 🔐 Access Credentials

### Customer Portals (PIN Access)
| Customer | PIN | Aircraft |
|----------|-----|----------|
| Highveld Mushrooms | HVM2024 | ZS-AAM |
| John McCormick | MPT360 | ZS-MPT |
| Barrick Aviation | FLEET24 | ZS-BGM, ZS-BGO, ZS-CGO, ZS-KGM |

### Admin Portal (Username/Password)
| Username | Password | Role |
|----------|----------|------|
| admin | FlyWatch2024! | Administrator |
| superadmin | FlyWatch2024! | Super Admin |
| afi-admin | AFI2024Admin | AFI Admin |

**⚠️ Change these immediately in production!**

## 📋 Admin Portal Features

### Picklist Management (Fully Functional)
- **View All Picklists:** See every picklist in the system
- **Search & Filter:** By entity, field, or override setting
- **Add New Picklists:** Create custom picklists for any entity/field
- **Edit Picklists:** Modify values (pipe-separated)
- **Delete Picklists:** Remove unused picklists
- **Override Settings:** Control org-level customization

### Picklist Structure
```
Entity: aircraft
Field: fuelType
Values: JETA-1|AVGAS|MOGAS
Can Override: ☐ No
```

### Available Picklists (Pre-loaded)

**Aircraft:**
- fuelType, fuelUpliftUnit, fuelBurnUnit, oilUnit, operatingCostUnit

**Crew:**
- CAR, commandType, restType, recencyType, endorcementType

**Documents:**
- aircraftDocuments, crewDocuments, organizationDocuments, ownerDocuments, flightDocuments, passengerManifestDocuments

**Operations:**
- approach (ILS|VOR|RNAV|GPS|GNNS|BC|NDB|HOLD|NIGHT...)

**And many more...**

## 🔧 How Picklists Work

### Storage
- **Demo Mode:** Browser localStorage
- **Production:** Replace with API calls to backend

### Integration with Forms
Forms in folio-system.html can dynamically load picklist values:

```javascript
// Get picklist values
const fuelTypes = getPicklist('aircraft', 'fuelType');
// Returns: { entity: 'aircraft', field: 'fuelType', values: ['JETA-1', 'AVGAS', 'MOGAS'], canOverride: false }

// Populate dropdown
populateDropdown('fuelTypeSelect', 'aircraft', 'fuelType');
```

See `UPDATE_FOLIO_WITH_PICKLISTS.md` for complete integration guide.

## 🔄 Data Flow

```
Admin modifies picklist → Saved to localStorage → 
Customer forms load picklists → Dropdowns populated dynamically
```

## 📊 Dashboard Stats

Admin dashboard shows:
- **Total Picklists:** Count of all picklist items
- **Entities:** Number of unique entities
- **Organizations:** Count of active orgs
- **Active Users:** Number of users in system

## 🎨 Design Differences

### Customer Portal
- **Blue theme** (#4472C4, #4A90E2)
- **PIN authentication** (6-7 characters)
- **Aircraft-focused** branding

### Admin Portal
- **Red/dark theme** (#E63946, #c62828)
- **Username/password** authentication
- **System management** branding
- **Sidebar navigation**

## 🛠️ Customization

### Change Admin Password
Edit `admin-login.html`:
```javascript
const ADMIN_CREDENTIALS = {
    'admin': 'YOUR_NEW_PASSWORD',
    'superadmin': 'YOUR_NEW_PASSWORD'
};
```

### Change Customer PINs
Edit `index.html`:
```javascript
const PIN_ROUTES = {
    'YOUR_NEW_PIN': 'highveld-portal.html',
    // ...
};
```

### Add New Picklists
1. Log in to admin portal
2. Click "Picklist Management"
3. Click "+ Add Picklist"
4. Fill in entity, field, values
5. Save

## 📱 Mobile Support

Both portals are responsive and work on:
- ✅ Desktop browsers
- ✅ Tablets
- ✅ Mobile phones

## 🔮 Future Enhancements

### Immediate (Manual Implementation Needed)
1. **Server-side Authentication**
   - Replace sessionStorage with JWT tokens
   - Implement proper password hashing
   - Add role-based access control

2. **Backend API Integration**
   - Replace localStorage with database
   - Implement picklist API endpoints
   - Add audit logging

3. **User Management**
   - Add/Edit/Delete users
   - Assign roles and permissions
   - Password reset functionality

4. **Organization Management**
   - Create/manage organizations
   - Org-level picklist overrides
   - Multi-tenant data isolation

### Phase 2 (Planned)
- Compliance engine UI
- Real-time audit logging
- Advanced reporting
- Notification system
- Mobile app integration

## 🐛 Troubleshooting

### Issue: Admin login fails
- **Solution:** Check that you're using correct credentials (case-sensitive)
- **Default:** admin / FlyWatch2024!

### Issue: Picklists not loading
- **Solution:** Open browser console, check for JavaScript errors
- **Check:** Is picklists-data.js loaded?

### Issue: Changes not saving
- **Solution:** Check browser localStorage is enabled
- **Note:** Private/incognito mode may block localStorage

### Issue: Can't access admin portal
- **Solution:** Make sure you uploaded admin-login.html and admin-dashboard.html
- **URL:** yourdomain.com/admin-login.html

## 📞 Support

For technical support with deployment:
1. Check browser console for errors (F12)
2. Verify all files uploaded correctly
3. Test in different browsers
4. Clear browser cache

## 🔒 Security Best Practices

**For Production Deployment:**

1. ✅ Change ALL default passwords
2. ✅ Implement server-side authentication
3. ✅ Use HTTPS only
4. ✅ Add rate limiting on login attempts
5. ✅ Implement session timeout
6. ✅ Add audit logging for all admin actions
7. ✅ Regular security audits
8. ✅ Principle of least privilege for users

**Current demo uses client-side auth for simplicity - NOT production-ready!**

## 📄 License

FlyWatch.AI System - Property of AFI
All rights reserved.

---

**Version:** 1.0  
**Last Updated:** February 15, 2026  
**Created by:** Claude (Anthropic) for AFI/FlyWatch
