https://clarkx800-rgb.github.io/Defect-Tracer-Beta-Track/



<b>1. The Core Engines (The JavaScript Logic)</b>
These three files power the app. Because of the modular split, they communicate by attaching variables to the global window. object (e.g., window.loadedRoutes).


<b>app_core.js (The Brain / State Manager)</b>
What it does: 
  -Tracks what is currently happening in the app and runs the heavy mathematical or logical operations.

Key Functions inside:
  -generateSegments(): Reads the selected track and builds the workspace.
  -executeClone(): Handles the logic of duplicating a row to multiple TS numbers.
  -executeInsert(): Splices a switch or pocket track into the middle of your active workspace.
  -undoLastLoad(): Reverts the last added route.
  -injectProjectData(): Parses JSON templates or saved files and feeds them to the UI.


<b>data_engine.js (Storage, Files, & Exports)</b>
What it does: 
  -Strictly handles reading/writing to the hard drive, saving photos, and building Excel/PDF files. It does not touch the HTML.

Key Functions inside:
  -initDB(), saveImageToDB(), getImageFromDB(): Your IndexedDB memory engine that keeps the app from crashing due to RAM overload.
  -saveProject(), loadProject(): Saves your current workspace to a .json file.
  -exportData(), generatePDFBlob(): The heavy lifters that use ExcelJS and jsPDF to compile your reports natively on the device.



<b>ui_engine.js (DOM & User Interaction)</b>
What it does:
  -The "puppeteer." It creates HTML elements on the fly, opens/closes menus, animates the progress bar, and handles button clicks.

Key Functions inside:
  -createSegmentCard(), addDefectRow(): The factories that actually draw the track segments and dropdowns on your screen.
  -showSystemAlert(), showSystemConfirm(): Controls the pop-up warning boxes.
  -updateProgress(): Animates the lock-screen progress bar.
  -openGallery(), removeImageFromGallery(): Handles the photo viewing overlay.
  -scrollToCard(), togglePageScroll(): Controls automatic and manual smooth scrolling.

-------------------------------------------------------------------

<b>2. The Visuals & Structure (The Interface)</b>

<b>index.html (The Skeleton)</b>
What it does: 
  -The bare-bones structure of the app. It holds the hidden modal containers, the top header bar, and the bottom command sheath. It contains almost zero logic.

When to edit: 
  -If you want to add a completely new button to the bottom command bar, or add a new link to the top settings menu.
  

<b>styles.css (The Paint)</b>
What it does: 
  -Contains 100% of the CSS sizing, animations, fonts, and layout rules.

When to edit: 
  -If you want to change the width of a button, adjust the bouncy animation of the segment cards, or fix overlapping text.

-------------------------------------------------------------------

3. The Data & Configuration (The Memory)
These files act as the "dictionaries" the app reads from when booting up.


<b>db_expo.js, db_millennium.js, db_evergreen.js</b>

What they do: 
  -Define the exact start/end numbers of track segments, the line colors, and the specific drop-down lists (e.g., what parts show up when you select "Inboard Running Rail").

When to edit: 
  -If you need to add a new defect type to a dropdown, or update a track station (TS) range.


<b>themes.js</b>
What it does:
  -Holds the HEX color codes for Tactical, Windows 11, and Pokemon Go themes.


<b>template_config.js</b>
What it does: 
  -Tells the app the exact URLs/file paths to fetch your pre-built track layouts.


<b>instructions.js</b>
What it does:
  -Holds the HTML text for the Help/Manual overlay.

-------------------------------------------------------------------

<b>4. The Offline Backbone (PWA Infrastructure)</b>
These files are what make the app act like a native iOS/Android application instead of a website.

<b>sw.js (The Service Worker)</b>

What it does: 
  -The security guard between the app and the internet. The first time you load the app, it downloads every file listed inside it to the phone's hard drive. From then on, it intercepts all network requests and serves them from the local hard drive, allowing 100% offline use.

When to edit: 
  -<b>CRITICAL</b>: Every single time you make a change to any .js or .css file, you must open sw.js and change const CACHE_NAME = 'defect-tracer-v...' to a higher number. If you don't, the phones will never download your new changes.



<b>manifest.json & icon.png</b>
<ul>What they do:</ul>
  -Tells the iPhone/Android operating system what icon to put on the home screen, what the app is named, and to hide the Safari/Chrome URL bar so it looks like a real app.



<b>exceljs.min.js & jspdf.umd.min.js</b>
<ul>What they do:</ul>
  -Your locally hosted library files that allow Python-level file generation directly inside a mobile browser.

<b>The Maintainer's Cheat Sheet: "Where do I go to..."</b>
  -Change a color, font, or button size? → styles.css
  -Add a new Defect to a dropdown? → db_expo.js (or respective line DB)
  -Change how the Excel file looks? → data_engine.js (look for exportData())
  -Fix a bug with the Progress Bar freezing? → ui_engine.js (look for updateProgress())
  -Change the logic of inserting a switch? → app_core.js (look for executeInsert())
  -Push an update to phones? → sw.js (bump the CACHE_NAME version)
