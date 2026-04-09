const systemInstructions = `
    <div style="font-size: var(--base-font); line-height: 1.6; color: var(--text-muted); text-transform: none; padding-bottom: 20px;">
        
        <div style="background: rgba(255,255,255,0.05); border-left: 4px solid var(--primary); padding: 10px 15px; margin-bottom: 20px; border-radius: 4px;">
            <p style="color: var(--primary); font-weight: bold; text-transform: uppercase; margin-top: 0; font-size: var(--header-font);">🚀 1. Initializing the Workspace</p>
            <ul style="margin: 5px 0 0 0; padding-left: 20px;">
                <li>Open the Top Right Menu <b>(⚙ / ✖)</b>.</li>
                <li>Select your <b>Line</b> (EX, MI, EV), <b>Direction</b>, and <b>Sub-Range</b>.</li>
                <li>Tap <b style="color: var(--primary);">LOAD AREA</b> to build the track.</li>
                <li style="margin-top: 5px; font-size: 11px; color: var(--warning);"><i>TIP: If starting from the opposite end, load your sections in normal order first, then tap <b>🔃 FLIP DIR</b> to reverse the entire track!</i></li>
            </ul>
        </div>

        <div style="background: rgba(255,255,255,0.05); border-left: 4px solid #0A84FF; padding: 10px 15px; margin-bottom: 20px; border-radius: 4px;">
            <p style="color: #0A84FF; font-weight: bold; text-transform: uppercase; margin-top: 0; font-size: var(--header-font);">🕹️ 2. The Command Sheath</p>
            <p style="margin: 5px 0 10px 0;">Tap the bottom-center pill menu to access your main tools:</p>
            <ul style="margin: 0; padding-left: 20px;">
                <li><b>TS- [SEARCH]:</b> Type a track section (e.g., '210') and press Enter. The app will auto-scroll and highlight that exact section.</li>
                <li><b style="font-size: 16px;">+</b> <b>(Batch Load):</b> Open the Quick-Add checklist. Select multiple sub-ranges at once to build your whole shift in one tap.</li>
                <li><b>⇊ / ⇈ (Scroll):</b> Instantly rocket to the top or bottom of the page. Tap the screen mid-scroll to stop.</li>
            </ul>
        </div>

        <div style="background: rgba(255,255,255,0.05); border-left: 4px solid var(--warning); padding: 10px 15px; margin-bottom: 20px; border-radius: 4px;">
            <p style="color: var(--warning); font-weight: bold; text-transform: uppercase; margin-top: 0; font-size: var(--header-font);">📝 3. Logging Defects & Photos</p>
            <ul style="margin: 5px 0 0 0; padding-left: 20px;">
                <li>Select a <b>Component</b> and a <b>Defect</b>.</li>
                <li>Tap <b>📷 PHOTO</b> to attach images. You can add as many as you need.</li>
                <li>Tap the green <b>[ ATTACHED (VIEW) ]</b> badge to open the Image Gallery where you can review or delete photos.</li>
                <li>Need more rows? Tap <b style="color: var(--text-muted);">+ ADD DEFECT ROW</b> at the bottom of any TS card.</li>
            </ul>
        </div>

        <div style="background: rgba(255,255,255,0.05); border-left: 4px solid var(--danger); padding: 10px 15px; margin-bottom: 20px; border-radius: 4px;">
            <p style="color: var(--danger); font-weight: bold; text-transform: uppercase; margin-top: 0; font-size: var(--header-font);">🕵️ 4. Hidden & Advanced Features</p>
            <ul style="margin: 5px 0 0 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;"><b>The Clone Engine (⇊):</b> Found a continuous defect? Log it once, tap the blue <b>⇊</b> button, enter your End TS, and the app will instantly copy the defect and photos to every section in between!</li>
                <li style="margin-bottom: 8px;"><b>Long-Press Splice:</b> Need to insert a pocket track or switch mid-route? <b>LONG-PRESS</b> any TS number on the left-side Mini-Map to wedge a new route exactly at that location.</li>
                <li style="margin-bottom: 8px;"><b>Custom Entries:</b> If a part isn't listed, select <b>"CUSTOM ENTRY..."</b> from the bottom of the dropdown. It will unlock manual text fields. Tap <b>↺</b> to revert to normal dropdowns.</li>
                <li><b>Mini-Map Tracker:</b> As you log data, the corresponding TS number on the left Mini-Map will light up, showing you exactly what has been completed.</li>
            </ul>
        </div>

        <div style="background: rgba(255,255,255,0.05); border-left: 4px solid var(--success); padding: 10px 15px; margin-bottom: 10px; border-radius: 4px;">
            <p style="color: var(--success); font-weight: bold; text-transform: uppercase; margin-top: 0; font-size: var(--header-font);">💾 5. Saving & Exporting</p>
            <ul style="margin: 5px 0 0 0; padding-left: 20px;">
                <li>The app does <i>not</i> auto-save. Tap <b>💾 SAVE DATA</b> to download a backup file so you don't lose your work.</li>
                <li>At the end of your shift, open the Top Menu and tap <b style="color: var(--success);">📊 EXPORT REPORT</b>.</li>
                <li>The app will generate 1 Master Excel Sheet and individual PDF reports for every photo taken, safely stored in your device's Downloads folder.</li>
            </ul>
        </div>
        
    </div>
`;
