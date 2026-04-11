https://clarkx800-rgb.github.io/Defect-Tracer-Beta-Track/

# 🛤️ Defect Tracer Pro

> **An offline-first Progressive Web App (PWA) engineered for mobile field track inspections.**

Defect Tracer is a modular, zero-telemetry Single Page Application (SPA) designed to operate securely in dead-zones without an internet connection. It leverages an IndexedDB memory engine to handle heavy photo attachments without crashing mobile devices, and generates Excel and PDF reports natively in the browser.

---

## 📂 System Architecture & File Directory

The application is built on a strict **Separation of Concerns (SoC)** model. UI rendering, background data processing, and state management are heavily isolated to prevent overlapping bugs.

### 🧠 The Core Engines (JavaScript Logic)
* **`app_core.js`** | **The Brain & State Manager**
  * Tracks global variables (e.g., `window.loadedRoutes`, active areas).
  * Contains the core operational logic: `generateSegments()`, `executeClone()`, `executeInsert()`, and `undoLastLoad()`.
  * Validates and injects JSON templates into the workspace.
* **`data_engine.js`** | **Storage, Files, & Exports**
  * **IndexedDB Engine:** Safely compresses and writes photos directly to the device hard drive to protect RAM (`saveImageToDB`, `getImageFromDB`).
  * **Export Pipeline:** Builds the actual `.xlsx` and `.pdf` files using local libraries and saves them to the device (`exportData`, `generatePDFBlob`).
  * **Save/Load:** Packages the current workspace into JSON backups.
* **`ui_engine.js`** | **DOM & User Interaction**
  * **The Puppeteer:** Physically draws the HTML elements on the screen.
  * Builds the track segment cards and defect dropdown rows (`createSegmentCard`, `addDefectRow`).
  * Manages modals, the photo gallery overlay, smooth scrolling, and animates the progress bar.

### 🎨 The Interface (Visuals & Structure)
* **`index.html`** | **The Skeleton**
  * The bare-bones structural shell. Holds the top header, the bottom command sheath, and the hidden modal containers. Imports all other files.
* **`styles.css`** | **The Paint**
  * Contains 100% of the CSS styling, animations, flexbox layouts, and responsive design rules.

### 🗄️ The Data & Configuration (The Memory)
* **`db_expo.js`, `db_millennium.js`, `db_evergreen.js`**
  * The static dictionaries. Defines the track station (TS) ranges, line colors, and the specific defect types that appear in the dropdown menus.
* **`themes.js`**
  * Holds the HEX color codes for the UI themes (Tactical, Windows 11, Field Trainer, macOS Dark) and font size variables.
* **`template_config.js`**
  * The routing dictionary that tells the app exactly where to fetch pre-built track layouts (e.g., LIM WALKS, SWITCH INSPECTIONS) from the server.
* **`instructions.js`**
  * Contains the raw HTML text injected into the Help/Reference Manual overlay.

### 📡 The Offline Backbone (PWA Infrastructure)
* **`sw.js`** | **The Service Worker**
  * The network interceptor. Caches every file locally so the app runs 100% offline. **Must be updated (cache version bumped) every time a code change is made.**
* **`manifest.json` & `icon.png`**
  * Instructs iOS and Android on how to install the app to the home screen, dictating the display name, icon, and full-screen standalone mode.
* **`exceljs.min.js` & `jspdf.umd.min.js`**
  * Locally hosted libraries that allow the browser to generate complex files without a backend server.

---

## 🛠️ Maintainer's Cheat Sheet

Use this quick-reference guide to immediately locate the file you need when pushing updates:

| Goal / Action | File to Edit | Look For (Function / Variable) |
| :--- | :--- | :--- |
| **Change a color, button size, or animation** | `styles.css` | Class names (e.g., `.segment-card`, `.btn-primary`) |
| **Add a new Defect to a dropdown list** | `db_expo.js` (etc.) | `window.globalDefectMaps` |
| **Add a new TS Range or Route** | `db_expo.js` (etc.) | `window.globalDatabase` |
| **Change how the Excel or PDF looks** | `data_engine.js` | `exportData()` or `generatePDFBlob()` |
| **Fix a Progress Bar or Pop-up bug** | `ui_engine.js` | `updateProgress()` or `showSystemAlert()` |
| **Tweak Switch Insertion or Cloning logic** | `app_core.js` | `executeInsert()` or `executeClone()` |
| **Add a new GitHub JSON Template** | `template_config.js` | `const templateLibrary` |

---

## 🚀 Deployment Protocol

When pushing changes to the live environment, you **must** follow these steps to ensure field devices pull the new code:
1. Make your edits to the respective `.js` or `.css` files.
2. Open **`sw.js`**.
3. Increment the `CACHE_NAME` version (e.g., change `v3.0.10` to `v3.0.11`).
4. Commit and sync to GitHub.
5. On the mobile device, fully close the app/browser tab and reopen it to force the Service Worker to fetch the fresh cache.
