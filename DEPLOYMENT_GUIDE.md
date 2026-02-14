# Aircraft Fleet Dashboard Website

## 📋 Overview
A professional web-based dashboard for monitoring aircraft engine health and maintenance across your fleet.

## 📁 Files Included

### Main Files
- `index.html` - Main landing page with fleet overview
- `ZS-MPT_A4_infographic.html` - ZS-MPT aircraft dashboard
- `ZS-AAM_A4_infographic.html` - ZS-AAM aircraft dashboard  
- `Barrick_Fleet_A4_infographic.html` - Barrick fleet (4 aircraft) dashboard

### Excel Dashboards (optional)
- `ZS-MPT_COMPLETE_Dashboard.xlsx` - Full TREND data and charts
- `Highveld_ZS-AAM_TREND_Dashboard.xlsx` - Highveld TREND data
- `Barrick_Fleet_Comparison_Dashboard.xlsx` - Fleet comparison

## 🚀 Deployment Options

### Option 1: GitHub Pages (FREE & EASY)
**Best for: Quick, free hosting**

1. Create a GitHub account at https://github.com
2. Create a new repository (e.g., "aircraft-dashboard")
3. Upload all HTML files to the repository
4. Go to Settings → Pages
5. Select "main" branch and save
6. Your site will be live at: `https://yourusername.github.io/aircraft-dashboard`

**Pros:** Free, easy, automatic HTTPS, good for sharing
**Cons:** Public by default (unless you have GitHub Pro)

---

### Option 2: Netlify (FREE & EASY)
**Best for: Drag-and-drop deployment**

1. Go to https://www.netlify.com
2. Sign up for free account
3. Drag and drop your folder with all HTML files
4. Get instant URL like: `https://your-site-name.netlify.app`
5. Optional: Add custom domain or password protection

**Pros:** Super easy, free SSL, can add password protection, custom domains
**Cons:** None really!

---

### Option 3: Vercel (FREE & EASY)
**Best for: Professional deployment**

1. Go to https://vercel.com
2. Sign up for free account
3. Click "New Project"
4. Upload your files or connect to GitHub
5. Deploy instantly
6. Get URL like: `https://your-project.vercel.app`

**Pros:** Fast, professional, free SSL, excellent performance
**Cons:** Requires sign-up

---

### Option 4: Google Drive (SIMPLE)
**Best for: Internal team sharing**

1. Upload all HTML files to Google Drive
2. Right-click each file → Share → Get link
3. Share links with your team
4. They can view directly in browser

**Pros:** Very simple, uses existing Google account
**Cons:** Not a "real" website, URLs are long

---

### Option 5: AWS S3 + CloudFront (PROFESSIONAL)
**Best for: Enterprise-grade hosting**

1. Create AWS account
2. Create S3 bucket
3. Upload HTML files
4. Enable static website hosting
5. (Optional) Add CloudFront CDN for speed
6. (Optional) Add Route53 for custom domain

**Pros:** Highly scalable, professional, full control
**Cons:** Requires AWS knowledge, small cost (usually <$1/month)

---

### Option 6: Your Own Web Server
**Best for: Full control**

If you have existing web hosting:
1. Upload all HTML files to your server via FTP
2. Place in public_html or www directory
3. Access via your domain

**Pros:** Full control, use existing infrastructure
**Cons:** Requires server access

---

## 🔒 Security & Privacy Options

### Password Protection
**For Netlify:**
- Free tier: Basic auth (paid)
- Alternative: Use Netlify Identity (free for small teams)

**For Vercel:**
- Add authentication with Vercel Pro
- Or use third-party auth services

**For GitHub Pages:**
- Requires GitHub Pro for private repos
- Alternative: Use Cloudflare Access (free tier available)

### Custom Domain
Most services allow custom domains:
- `dashboard.yourcompany.com`
- Update DNS records to point to hosting service
- Free SSL certificates included

---

## 📱 Mobile Access
All dashboards are responsive and work on:
- ✅ Desktop computers
- ✅ Tablets  
- ✅ Mobile phones
- ✅ Print to PDF (Ctrl+P / Cmd+P)

---

## 🔄 Updating Data

When you have new flight data:

1. Send new folio images to Claude
2. Claude updates the HTML files
3. Re-upload updated files to your hosting service
4. Changes appear immediately

**Automation Option:**
- Connect Claude to GitHub
- Claude commits updates directly
- Site auto-deploys (GitHub Pages, Netlify, Vercel support this)

---

## 💡 Recommended Solution

**For most users, I recommend Netlify:**
1. Easiest to set up (5 minutes)
2. Free forever for small sites
3. Automatic HTTPS
4. Can add password later if needed
5. Professional URLs
6. Easy updates (just drag & drop new files)

**Steps:**
1. Go to https://netlify.com
2. Sign up with email or GitHub
3. Drag your folder with all HTML files
4. Done! Get your URL
5. Share with team

---

## 📞 Support

If you need help deploying, just ask! I can:
- Guide you through any deployment option
- Help set up custom domains
- Configure password protection
- Set up automatic updates

---

## 🎯 Quick Start (Netlify - Recommended)

```
1. Visit: https://app.netlify.com/drop
2. Drag all your HTML files
3. Get instant URL
4. Share with team
```

That's it! No installation, no setup, works immediately.
