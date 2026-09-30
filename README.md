# 🛡️ Jharkhand Industrial AR Safety & DGMS Compliance Portal

> **Smart India Hackathon 2024 / 2026 — Problem Statement ID: SIH26041**  
> **Dedicated Mobile AR Platform & Central Web Admin Compliance Portal**  
> *Target Sector: Jharkhand's Coal, Steel, and Mica Mines (Tribal Recruits & Underground Workers)*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![DGMS Compliant](https://img.shields.io/badge/DGMS-Standard%20Compliance-green.svg)](#)
[![Android](https://img.shields.io/badge/Platform-Android%2010%2B-brightgreen.svg)](#)
[![Languages](https://img.shields.io/badge/Languages-Santali%20%7C%20Hindi%20%7C%20English-blue.svg)](#)

---

## 📌 Executive Summary
In underground and open-cast mines across Jharkhand (Dhanbad, Jharia, Bokaro, Singhbhum), frontline and tribal workers face severe occupational hazards (roof falls, toxic methane/carbon monoxide gas leaks, machinery entanglement, and coal fires). Traditional classroom safety lectures have low comprehension due to language barriers and abstract concepts.

**SIH26041** delivers an **end-to-end, multi-lingual Mobile AR Vocational Safety Simulator & Central DGMS Gate Compliance Portal**:
1. **Interactive Mobile AR Simulator (`index.html` - Mobile View):** Provides hands-on simulated emergency scenarios directly on workers' mid-range Android smartphones without costly AR goggles.
2. **Central Web Admin Dashboard (`index.html` - Admin View):** Real-time monitoring of all 1,420 miners, gate-entry clearance, certification audit trail, and instant CSV export for DGMS Dhanbad inspectors.
3. **Dual Split-Screen Demo Mode:** Allows jury and stakeholders to test the worker mobile simulator side-by-side with the admin gate clearance console.

---

## 🏛️ Project Architecture & File Structure

```text
├── index.html                           # Complete Unified Web Application (Mobile AR + Admin + Split View)
├── app.js                               # DGMS Assessment Engine, Santali/Hindi Voice Dict, State Machine
├── styles.css                           # High-contrast, responsive industrial UI styling
├── manifest.json                        # Progressive Web App (PWA) manifest
├── sw.js                                # Offline-first Service Worker cache
├── twa-manifest.json                    # Trusted Web Activity configuration for Android APK
├── sih26041_official_presentation.html  # Authentic 6-slide SIH jury presentation deck (White theme, diagrams)
├── android-project/                     # Full Native Android Studio Project
│   ├── app/
│   │   ├── build.gradle                 # Android build config (SDK 34, auto camera permissions)
│   │   └── src/main/
│   │       ├── AndroidManifest.xml      # Camera & hardware feature declarations
│   │       ├── java/.../MainActivity.java # WebView/AR hardware bridge
│   │       └── assets/                  # Offline bundled assets
│   ├── build.gradle
│   └── settings.gradle
└── README.md                            # Comprehensive project guide
```

---

## 🔬 4-Stage DGMS Competency Assessment Engine

Unlike generic quiz apps, this platform implements a stringent, tamper-proof **4-Stage DGMS Statutory Assessment Protocol**:

1. **Hazard Spotting Phase (30s Countdown):** Worker must identify active underground hazards (unsupported roof fissure, methane accumulation, locked-out dumper).
2. **Statutory Scenario Assessment:** 4 weighted scenario questions (25 marks each) on emergency response, LOTO procedures, gas detectors, and PASS fire technique.
3. **Rigorous $\ge 80\%$ Passing Threshold:**
   - Score $\ge 80\%$: Certified competent, certificate unlocked with cryptographic SHA-256 verification hash, gate status set to `ALLOWED`.
   - Score $< 80\%$: Retest mandated, certificate stays locked, gate status remains `BLOCKED` with warning feedback.
4. **Anti-Proxy Biometric Verification:** Front camera Picture-in-Picture (PIP) ensures the worker taking the simulation matches the enrolled ID.
5. **Multi-Lingual Voice Guidance:** Full audio cues and Ol Chiki scripts for **Santali (ᱥᱟᱱᱛᱟᱲᱤ)**, **Hindi (हिन्दी)**, and **English**.

---

## 📊 Central Web Admin & Gate Clearance System

- **Live Gate-Entry Verification Panel:** Instant photo capture, worker ID lookup, and biometric status display.
- **DGMS Dhanbad Export:** 1-click CSV download containing worker records, certification timestamps, test scores, and compliance status.
- **Analytics & Gauges:** Sector-wise compliance breakdown (Coal 78%, Steel 65%, Mica 71%), tenure filters (`<30 Days New Recruits`), and live IST clock.

---

## 📲 How to Install as an Android APK

### Option A: 1-Click Cloud Build via PWABuilder (Fastest)
1. Fork or push this repository to GitHub and enable **GitHub Pages** (*Settings > Pages > Branch: `main`*).
2. Open **[PWABuilder.com](https://www.pwabuilder.com)**.
3. Enter your GitHub Pages URL (e.g. `https://vishnukant74248.github.io/SIH26041-Jharkhand-AR-Safety/`).
4. Click **Package for Android** and download the signed `.apk` file directly to your smartphone.

### Option B: Build via Android Studio
1. Open the included [`android-project/`](./android-project/) directory in **Android Studio**.
2. Wait for Gradle sync to complete.
3. Select **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
4. Locate the generated `app-debug.apk` in `app/build/outputs/apk/debug/` and install on your Android device.

---

## 📽️ Official SIH Presentation Deck

The project includes an authentic, professionally designed 6-slide presentation deck matching official SIH guidelines:
- File: [`sih26041_official_presentation.html`](./sih26041_official_presentation.html)
- Clean 100% white background, hand-coded CSS diagrams (Innovation Pyramid, Risk vs. Solution matrix, Asphalt dumper haul road, Feasibility pinned cards).
- Open in any web browser or press `Ctrl + P` to print/save as PDF.

---

## 👨‍💻 Author & Attribution
- **GitHub:** [@vishnukant74248](https://github.com/vishnukant74248)
- **Problem Statement:** SIH26041
- **Domain:** Mining Safety, AR/VR, Industrial Vocational Training
