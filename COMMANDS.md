# Project Run Commands & Quick Reference Guide

This guide lists all the commands needed to run the **Lead Scraper & Outreach CRM Dashboard** and the **Client / Demo Websites** locally.

---

## 1. Outreach CRM & Lead Scraper Dashboard

The platform dashboard manages scraped leads, pipeline statuses, outreach tracking, and WhatsApp CRM messaging.

### Start the CRM Server
```powershell
npm run dev
# or
node server.js
```
- **URL:** [http://localhost:3000](http://localhost:3000)
- **Features:** Lead filtering, pitch script generator, WhatsApp direct contact, pipeline tracking.

---

## 2. Nirvana Dental Care (Sales Demo Website)

The generalized, pitch-ready demo dental website (configured for **Koregaon Park, Pune** with zero client/competitor references).

### Run Demo Website
```powershell
python -m http.server 8000 --directory websites/demo-dental
```
- **Local URL:** [http://localhost:8000](http://localhost:8000)
- **Key Pages:**
  - Homepage: `http://localhost:8000/`
  - All Treatments: `http://localhost:8000/treatments/`
  - Technology & Equipment: `http://localhost:8000/technology.html`
  - Team & Doctor Profile: `http://localhost:8000/team.html`
  - Contact & Map: `http://localhost:8000/contact.html`

---

## 3. Akshaya Multispeciality Dental Clinic (Client Build)

The original client build (Hulimavu, Bannerghatta Road).

### Run Client Website
```powershell
python -m http.server 8080 --directory websites/akshaya
```
- **Local URL:** [http://localhost:8080](http://localhost:8080)

---

## 4. Run Everything in Parallel (Separate Terminals)

If you want both the CRM and the websites running simultaneously, open separate terminal windows:

| Service | Port | Terminal Command |
| :--- | :--- | :--- |
| **Outreach CRM** | `3000` | `node server.js` |
| **Nirvana Demo Site** | `8000` | `python -m http.server 8000 --directory websites/demo-dental` |
| **Akshaya Client Site** | `8080` | `python -m http.server 8080 --directory websites/akshaya` |

---

## 5. Git & Deployment Reference

### Commit & Push Updates
```powershell
git add .
git commit -m "feat: your update message"
git push origin main
```

### Netlify Deployment (Demo Site)
- **Repo:** `Bhaskar-kumar-arya/hustle`
- **Base directory:** `websites/demo-dental`
- **Build command:** *(leave blank)*
- **Publish directory:** `websites/demo-dental`
