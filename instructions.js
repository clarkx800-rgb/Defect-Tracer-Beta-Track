const systemInstructions = `
    <div style="font-size: var(--base-font); line-height: 1.6; color: var(--text-muted); text-transform: none;">
        <p style="color: var(--text-color); font-weight: bold; text-transform: uppercase;">STEP 1: ESTABLISH ROUTE</p>
        <ul style="margin-top: 5px; padding-left: 20px; margin-bottom: 20px;">
            <li>Open the top right menu (✖/⚙).</li>
            <li>Select <b>1. LINE</b>, <b>2. DIRECTION</b> (IB or OB), and <b>3. SUB-TO-SUB AREA</b>.</li>
            <li>Tap <b>LOAD AREA</b> to generate your inspection route.</li>
                <b>TIP:</b> Load all needed sub to sub areas in normal order before flipping direction if the start of inpsection is on the opposite side.
        </ul>

        <p style="color: var(--text-color); font-weight: bold; text-transform: uppercase;">STEP 2: LOG DEFECTS</p>
        <ul style="margin-top: 5px; padding-left: 20px; margin-bottom: 20px;">
            <li>Scroll to current Track Section (TS) or use the Search (🔍) tool.</li>
            <li>Select <b>COMPONENT</b> and <b>DEFECT</b> from dropdowns.</li>
            <li>Use <b>CUSTOM ENTRY...</b> for unlisted anomalies.</li>
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
        </ul>

        <p style="color: var(--text-color); font-weight: bold; text-transform: uppercase;">EXTRAS: STYLES & TEXT SIZES</p>
        <ul style="margin-top: 5px; padding-left: 20px; margin-bottom: 20px;">
            <b>FONT SIZE:</b> Open the top right menu (✖/⚙) to choose font sizes: STANDARD, MEDIUM, LARGE. For <b>UI THEME:</b> TACTICAL (DARK), WINDOWS11 (LIGHT), FIELD TRAINER (GAME).</ul>
    </div>
`;
