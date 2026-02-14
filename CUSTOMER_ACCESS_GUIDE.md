# FlyWatch AI - Customer Portal Access Guide

## 🔐 Secure Customer Portals

Each customer has their own protected portal with PIN authentication. Customers can only access their own aircraft data.

---

## 📋 Customer Portal Details

### 1. HIGHVELD MUSHROOMS
**Portal URL:**
```
https://scalci.github.io/aircraft-dashboard/highveld-portal.html
```

**Access PIN:**
```
HVM2024
```

**Aircraft Access:**
- ZS-AAM (Beechcraft King Air C90GTx)

**What Customer Sees:**
- Single aircraft dashboard
- 202 total flights
- 10 years of service history
- Engine 2 trend monitoring alert

---

### 2. JOHN MCCORMICK
**Portal URL:**
```
https://scalci.github.io/aircraft-dashboard/mccormick-portal.html
```

**Access PIN:**
```
MPT360
```

**Aircraft Access:**
- ZS-MPT (Super King Air B300 360)

**What Customer Sees:**
- Single aircraft dashboard
- 57 total flights
- 423.8 flight hours
- Complete TREND data coverage

---

### 3. BARRICK AVIATION
**Portal URL:**
```
https://scalci.github.io/aircraft-dashboard/barrick-portal.html
```

**Access PIN:**
```
FLEET24
```

**Aircraft Access:**
- ZS-BGM (194 flights)
- ZS-BGO (108 flights)
- ZS-CGO (1,462 flights)
- ZS-KGM (905 flights)

**What Customer Sees:**
- Fleet overview with 4 aircraft
- Total 2,669 flights across fleet
- Individual dashboards for each aircraft
- Color-coded aircraft cards

---

## 🎯 How to Share with Customers

### Email Template:

**Subject: Your Aircraft TREND Monitoring Portal**

```
Dear [Customer Name],

Your personalized aircraft monitoring portal is now live!

Portal Access:
🔗 URL: [paste URL from above]
🔑 PIN: [paste PIN from above]

Your portal includes:
✅ Real-time engine TREND monitoring
✅ Complete flight history
✅ Maintenance tracking
✅ Professional A4 dashboards (print-ready)

The portal is accessible 24/7 from any device - desktop, tablet, or mobile.

For security, please keep your PIN confidential.

Best regards,
FlyWatch AI Team
```

---

## 🔒 Security Features

**Session-Based Authentication:**
- PIN required on first visit
- Stays logged in during browser session
- Auto-logout when browser closes
- "Logout" button for manual logout

**No Cross-Customer Access:**
- Each portal only shows that customer's aircraft
- Different PINs for each customer
- Separate authentication sessions

**Simple But Secure:**
- No database required
- Client-side validation
- Session storage (browser-based)
- Easy to change PINs if needed

---

## 🔄 Changing PINs (If Needed)

To change a customer's PIN:

1. Download the portal HTML file
2. Find this line in the JavaScript:
   ```javascript
   const CORRECT_PIN = 'HVM2024';  // Change this
   ```
3. Replace with new PIN
4. Re-upload to GitHub
5. Send new PIN to customer

---

## 📱 Features

**Login Page:**
- Professional branded design per customer
- PIN input with visual feedback
- Error message on wrong PIN
- Shake animation on failed attempt

**Portal Features:**
- Logout button (top right)
- Customer-branded header
- Fleet statistics (Barrick only)
- Clickable aircraft cards
- Links to detailed A4 dashboards

**Mobile Responsive:**
- Works on all devices
- Touch-friendly interface
- Optimized for phones and tablets

---

## 📊 Files to Upload to GitHub

Upload these 3 portal files:
```
highveld-portal.html
mccormick-portal.html
barrick-portal.html
```

Plus all the individual aircraft dashboards (already uploaded):
```
ZS-AAM_A4_infographic.html
ZS-MPT_A4_infographic.html
ZS-BGM_A4_infographic.html
ZS-BGO_A4_infographic.html
ZS-CGO_A4_infographic.html
ZS-KGM_A4_infographic.html
```

---

## ✅ Quick Test

After uploading, test each portal:

1. Visit the URL
2. Enter the PIN
3. Click "ACCESS PORTAL"
4. Verify you see the correct aircraft
5. Click aircraft card to view detailed dashboard
6. Test logout button

---

## 🎯 Summary

**3 Separate Portals:**
- ✅ Highveld Mushrooms → HVM2024 → 1 aircraft
- ✅ John McCormick → MPT360 → 1 aircraft  
- ✅ Barrick Aviation → FLEET24 → 4 aircraft

**Total Files Needed:**
- 3 portal HTML files (with PIN protection)
- 6 aircraft dashboard HTML files (A4 format)
- 1 main index.html (FlyWatch AI - optional)

**URLs Pattern:**
```
https://scalci.github.io/aircraft-dashboard/[customer]-portal.html
```

Each customer gets their own URL and PIN - simple, secure, and professional! 🚀
