# TimeCard PWA — Setup Guide

A free, private, GPS-enabled punch clock that lives on your wife's iPhone home screen.
No app store. No Xcode. No subscription. All data stays on the device.

---

## What's in this folder

| File | Purpose |
|------|---------|
| `index.html` | The entire app |
| `manifest.json` | Makes it installable as a PWA |
| `sw.js` | Service worker — enables offline use |

---

## One-time GitHub Pages setup (takes ~5 minutes)

1. **Create a free GitHub account** at github.com if you don't have one.

2. **Create a new repository**
   - Click **+** → New repository
   - Name it `timecard` (or anything you like)
   - Set it to **Public** (required for free GitHub Pages)
   - Click **Create repository**

3. **Upload the 3 files**
   - Click **Add file** → **Upload files**
   - Drag in `index.html`, `manifest.json`, `sw.js`
   - Commit with message "Initial upload"

4. **Enable GitHub Pages**
   - Go to your repo → **Settings** → **Pages** (left sidebar)
   - Under *Source*, choose **Deploy from a branch**
   - Branch: `main` / folder: `/ (root)`
   - Click **Save**
   - Wait ~60 seconds. Your URL will be: `https://YOUR-USERNAME.github.io/timecard/`

5. **Add icon (optional but nice)**
   - Use any 192×192 and 512×512 PNG images named `icon-192.png` and `icon-512.png`
   - Upload them to the repo

---

## Installing on iPhone (Safari required)

1. Open Safari and navigate to your GitHub Pages URL
2. Tap the **Share** button (box with arrow pointing up)
3. Scroll down and tap **"Add to Home Screen"**
4. Tap **Add** — the app icon appears on the home screen
5. Open it — Safari will ask for **Location** permission → tap **Allow While Using App**

That's it! It now runs fullscreen like a native app.

---

## How data is stored

- All punches are stored in **localStorage** on the device — never uploaded anywhere
- Data persists across app opens, reboots, and iOS updates
- iOS can clear localStorage in extreme low-storage conditions → use **Export CSV** regularly

## Exporting data

Tap **⬇ Export CSV** in the app. iOS will download a `.csv` file to your **Files** app (Downloads folder). You can then:
- Open it in Numbers
- Email it
- Share it to Google Sheets

## Updating the app

If you push changes to GitHub, your wife's app auto-updates next time she opens it with an internet connection (the service worker handles this). She never needs to reinstall.

---

## Privacy notes

- No server, no account, no tracking
- GPS coordinates are only read at the moment of a punch and stored locally
- The site is served over HTTPS (GitHub Pages enforces this), so geolocation works correctly
- Location data never leaves the device unless she exports and shares the CSV

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Location shows "unavailable" | Check iOS Settings → Safari → Location → Allow |
| App doesn't install to home screen | Must use Safari (not Chrome) on iOS |
| Data missing after update | Didn't happen — localStorage is preserved. Check if iOS cleared storage (low storage warning) |
| Blank page on GitHub Pages | Wait 2–3 minutes after enabling Pages for first deploy |
