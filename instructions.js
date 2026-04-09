const systemInstructions = `
    <div style="font-size: var(--base-font); line-height: 1.6; color: var(--text-muted); text-transform: none;">
        <p style="color: var(--text-color); font-weight: bold; text-transform: uppercase;">STEP 1: ESTABLISH ROUTE</p>
        <ul style="margin-top: 5px; padding-left: 20px; margin-bottom: 20px;">
            <li>Open the top right menu (✖/⚙).</li>
            <li>Select <b>1. LINE (EX, MI, EV)</b>, <b>2. DIRECTION</b> (IB or OB), and <b>3. SUB-TO-SUB AREA</b>.</li>
            <li>Tap <b>LOAD AREA</b> to generate your inspection route. This is needed on the first run.</li>
                <b>TIP:</b> Load all needed sub to sub areas in normal order <b>before flipping direction</b> if the start of inpsection is on the opposite end.
        </ul>

        <p style="color: var(--text-color); font-weight: bold; text-transform: uppercase;">STEP 2: LOG DEFECTS</p>
        <ul style="margin-top: 5px; padding-left: 20px; margin-bottom: 20px;">
            <li>Scroll to current Track Section (TS) or use the Search (🔍) tool.</li>
            <li>Select <b>COMPONENT</b> and <b>DEFECT</b> from dropdowns.</li>
            <li>Use <b>CUSTOM ENTRY...</b> for unlisted component or defect.</li>
            <li>Tap <b>📷 PHOTO</b> to attach visual evidence (Multiple allowed).</li>
        </ul>

        <p style="color: var(--text-color); font-weight: bold; text-transform: uppercase;">STEP 3: INSERT POCKET TRACK (OB ONLY)</p>
        <ul style="margin-top: 5px; padding-left: 20px; margin-bottom: 20px;">
            <li><b>LONG PRESS</b> desired TS on the mini-map to Insert a pocket track TS numbers.</li>
            <li>Tap the <b>Floating "+" Button</b> to quick-add track section series for pocket.</li>
            <li>Pocket tracks can be found in OUTBOUND drop-down menu</li>
        </ul>

        <p style="color: var(--warning); font-weight: bold; text-transform: uppercase;">STEP 4: SAVE DATA ⚠️</p>
        <ul style="margin-top: 5px; padding-left: 20px;">
            <li>System does not auto-save. Open menu and tap <b style="color: var(--warning)">💾 SAVE DATA</b> frequently.</li>
            <li>Tap <b style="color: var(--success)">📊 EXPORT REPORT</b> at the end of inspection to generate your data collected to Excel & PDF picture files.</li>
            <li>The exported file can then be saved in your <b>One Drive</b> via phone upload or send via email.</li>
        </ul>

        <p style="color: var(--text-color); font-weight: bold; text-transform: uppercase;">EXTRA: STYLES & TEXT SIZES</p>
        <ul style="margin-top: 5px; padding-left: 20px; margin-bottom: 20px;">
            <li><b>SAVING ROUTES</b> can be used as a templates for later use. Just save it in the device and <b>LOAD</b> when needed.
            <li><b>FONT SIZE:</b> Open the top right menu (✖/⚙) to choose font sizes: STANDARD, MEDIUM, LARGE.</li>
            <li><b>UI THEME:</b> TACTICAL (DARK), WINDOWS11 (LIGHT), FIELD TRAINER, MAC-OS-Dark.</li>
        </ul>
    </div>
`;
