# COMPLIANCE SYSTEM V2 - Complete Guide

## 🎯 What's New in V2

### 1. FILE ATTACHMENTS
Every compliance document can now have a file attached:
- Upload PDFs, images, Word docs, etc.
- Files stored securely in browser
- 📎 paperclip icon shows when file is attached
- Click any badge to view/upload/change files

### 2. CALENDAR DATE PICKERS
- Click in date fields → calendar popup appears
- No more typing dates manually
- Select date from calendar
- Works on all modern browsers

### 3. ADMIN DASHBOARDS
Two new tabs in Admin Dashboard:
- **Aircraft Compliance** - ALL aircraft from ALL orgs in one view
- **Crew Compliance** - ALL crew members in one view

---

## 📋 CUSTOMER PORTALS

### How It Works:

1. **Customer logs in** (e.g., Barrick portal, PIN: FLEET24)
2. **Scrolls down past aircraft cards**
3. **Sees compliance dashboard** embedded on page
4. **Clicks any cell** in the matrix
5. **Modal opens** with form:
   - Reference (who issued it)
   - Issue Date (calendar picker)
   - Expiry Date (calendar picker)
   - Permanent checkbox (if never expires)
   - **File Upload** (NEW!)
6. **Uploads file** (optional)
7. **Clicks Save**
8. **Cell updates** with color + 📎 icon if file attached

### Example: Adding Certificate of Insurance

```
1. Click cell for "ZS-BGM" × "Cert of Insurance"
2. Modal opens
3. Fill in:
   - Reference: "McGill and Partners"
   - Issue Date: [Click calendar] → Select 2025-07-01
   - Expiry Date: [Click calendar] → Select 2026-06-30
   - File: [Click Choose File] → Select "Insurance_ZS-BGM.pdf"
4. Click "💾 Save"
5. Cell shows "2026-06-30" in GREEN with 📎 icon
```

### To View/Download File:

1. Click the cell again
2. Modal shows: "📎 File attached: Insurance_ZS-BGM.pdf"
3. Can replace file or view info

---

## 🔐 ADMIN DASHBOARDS

### Aircraft Compliance Dashboard

**Access:** Admin Dashboard → Aircraft Compliance tab

**Shows:**
- ALL aircraft from ALL 3 organizations
- Barrick: ZS-BGM, ZS-BGO, ZS-CGO, ZS-KGM
- Highveld: ZS-AAM
- McCormick: ZS-MPT

**Features:**
- Organization label next to each aircraft
- Click any cell to edit
- Upload files for any aircraft
- Saves to correct organization automatically

**Example View:**
```
Aircraft         Org       | Cert of Insurance | Cert of Registration
------------------+---------+-------------------+---------------------
ZS-BGM (Barrick) | 2026-06-30 📎    | Permanent
ZS-BGO (Barrick) | not listed       | 2026-12-03
ZS-AAM (Highveld)| 2025-10-15 📎    | Permanent
ZS-MPT (McCormick)| 2026-01-20      | 2025-08-12
```

### Crew Compliance Dashboard

**Access:** Admin Dashboard → Crew Compliance tab

**Shows:**
- ALL crew members from ALL organizations
- Sample crew included:
  - John Smith (Captain, Barrick)
  - Sarah Johnson (First Officer, Barrick)
  - Mike Davis (Captain, Highveld)
  - Lisa Brown (First Officer, McCormick)

**Document Types (15):**
1. Pilot License
2. Medical Certificate
3. Passport
4. Visa
5. Type Rating
6. Instrument Rating
7. Night Rating
8. Multi-Engine Rating
9. Dangerous Goods
10. Security Training
11. CRM Training
12. First Aid
13. SEP Training
14. Background Check
15. Employment Contract

**Example Use:**
```
1. Click cell for "John Smith" × "Medical Certificate"
2. Fill in:
   - Reference: "SACAA Class 1"
   - Issue Date: 2025-08-15
   - Expiry Date: 2026-02-15
   - Upload: Medical_Cert.pdf
3. Save
4. Cell shows date with 📎 icon
```

---

## 🎨 COLOR CODING

Same across all dashboards:

| Color | Days to Expiry | Meaning |
|-------|----------------|---------|
| 🔴 RED | Expired or ≤10 days | URGENT ACTION NEEDED |
| 🟡 YELLOW | 11-30 days | WARNING - Renew Soon |
| 🟠 ORANGE | 31-60 days | CAUTION - Plan Renewal |
| 🟢 GREEN | >60 days | GOOD - Current |
| ⚫ GRAY | Permanent | Never Expires |
| ⚪ GRAY DASHED | not listed | No Data Entered |

📎 = File attached

---

## 💾 DATA STORAGE

### Where Data is Stored:

**Aircraft Compliance:**
- `localStorage.compliance_barrick` - Barrick aircraft documents
- `localStorage.compliance_highveld` - Highveld aircraft documents
- `localStorage.compliance_mccormick` - McCormick aircraft documents

**Crew Compliance:**
- `localStorage.crew_compliance` - All crew members (shared)

**Files:**
- Stored as base64 encoded strings in same localStorage
- Included with document data
- Download link reconstructed from base64

### File Size Considerations:

- localStorage limit: ~5-10MB per domain
- PDF files: ~1-2MB typical
- Image files: ~100KB-500KB typical
- Recommended: Keep files under 1MB
- Large files may hit browser limits

---

## 🚀 DEPLOYMENT

### Files to Upload (12 total):

1. **Portals (4):**
   - index.html
   - barrick-portal.html
   - highveld-portal.html
   - mccormick-portal.html

2. **Admin (2):**
   - admin-login.html
   - admin-dashboard.html

3. **Systems (2):**
   - compliance-widget-v2.js (NEW - with file attachments)
   - folio-system.html

4. **Data (3):**
   - aircraft-config-data.js
   - airports-data.js
   - picklists-data.js

5. **Assets (1):**
   - flywatch-logo.svg

### Upload Instructions:

1. Upload ALL 12 files to your server
2. Keep them in the same directory
3. Access:
   - Customers: `yoursite.com/barrick-portal.html`
   - Admin: `yoursite.com/admin-login.html`

---

## 📱 TESTING CHECKLIST

### Test Customer Portal:
- [ ] Login to Barrick portal (PIN: FLEET24)
- [ ] See compliance dashboard on page
- [ ] See 4 aircraft (BGM, BGO, CGO, KGM)
- [ ] Click a cell
- [ ] Modal opens
- [ ] Click date field → calendar appears
- [ ] Upload a PDF file
- [ ] Save
- [ ] See cell update with 📎 icon
- [ ] Click cell again → see file name

### Test Highveld Portal:
- [ ] Login (PIN: HVM2024)
- [ ] See only 1 aircraft (ZS-AAM)
- [ ] No Barrick aircraft shown ✅

### Test McCormick Portal:
- [ ] Login (PIN: JOHN24)
- [ ] See only 1 aircraft (ZS-MPT)
- [ ] Add document with file

### Test Admin Dashboard:
- [ ] Login (username: admin, password: flywatch2024)
- [ ] Click "Aircraft Compliance" tab
- [ ] See ALL 6 aircraft
- [ ] See org labels (Barrick/Highveld/McCormick)
- [ ] Click "Crew Compliance" tab
- [ ] See 4 crew members
- [ ] Add crew document with file

---

## ❓ TROUBLESHOOTING

**Q: Files not uploading?**
A: Check browser console for errors. File may be too large (>5MB).

**Q: Calendar not showing?**
A: Works on Chrome, Firefox, Edge, Safari. If using old browser, will show text input.

**Q: Changes not saving?**
A: Check localStorage not disabled. Try different browser.

**Q: Admin shows wrong aircraft?**
A: Clear browser cache and reload page.

**Q: Highveld shows Barrick aircraft?**
A: Re-upload barrick-portal.html and highveld-portal.html. Make sure using latest files.

---

## 🎓 BEST PRACTICES

1. **File Naming:**
   - Use descriptive names: "Insurance_ZS-BGM_2025.pdf"
   - Include aircraft reg and year
   - Keep under 50 characters

2. **Date Entry:**
   - Always use calendar picker
   - Don't type dates manually
   - Ensures correct format

3. **File Sizes:**
   - Compress PDFs before upload
   - Use JPEG for photos (not PNG)
   - Keep under 1MB per file

4. **Regular Updates:**
   - Review dashboard weekly
   - Update expiring docs (YELLOW/ORANGE)
   - Replace files when docs renewed

---

## 📞 SUPPORT

If you need help or find issues:
1. Check browser console (F12) for errors
2. Clear browser cache and reload
3. Try different browser
4. Check all 12 files uploaded correctly

---

**System Version:** V2.0
**Last Updated:** February 15, 2026
**Author:** FlyWatch.AI Development Team
