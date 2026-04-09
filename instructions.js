const systemInstructions = `
    <div style="font-size: var(--btn-font); line-height: 1.5; color: var(--text-color); text-transform: none; padding-bottom: 20px; font-family: sans-serif;">
        
        <div style="text-align: center; margin-bottom: 20px; color: var(--text-muted);">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            <div style="font-weight: bold; letter-spacing: 2px; margin-top: 5px;">FIELD REFERENCE MANUAL</div>
        </div>

        <div style="display: flex; gap: 15px; margin-bottom: 20px; background: rgba(255,255,255,0.03); padding: 15px; border: 1px solid var(--border-color); border-radius: 8px;">
            <div style="flex-shrink: 0;">
                <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--primary); color: #000; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 18px;">1</div>
            </div>
            <div>
                <h4 style="margin: 0 0 5px 0; color: var(--primary); text-transform: uppercase; letter-spacing: 1px;">Initialize Route</h4>
                <p style="margin: 0 0 8px 0; color: var(--text-muted);">Tap top-right <b>⚙/✖</b> to open the main menu. Select Line, Direction, and Sub-Range, then tap <b>LOAD AREA</b>.</p>
                <div style="display: flex; gap: 10px; align-items: center; background: var(--input-bg); padding: 8px; border-radius: 4px; border: 1px dashed var(--border-color);">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" style="flex-shrink:0;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                    <span style="font-size: 12px; color: var(--text-muted); line-height: 1.3;"><i>Tip: Load sections in normal order, then use <b>🔃 FLIP DIR</b> if starting from the opposite end.</i></span>
                </div>
            </div>
        </div>

        <div style="display: flex; gap: 15px; margin-bottom: 20px; background: rgba(255,255,255,0.03); padding: 15px; border: 1px solid var(--border-color); border-radius: 8px;">
            <div style="flex-shrink: 0;">
                <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--warning); color: #000; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 18px;">2</div>
            </div>
            <div>
                <h4 style="margin: 0 0 5px 0; color: var(--warning); text-transform: uppercase; letter-spacing: 1px;">Rapid Data Collection</h4>
                <p style="margin: 0 0 8px 0; color: var(--text-muted);">Field time is limited. Quickly select <b>COMPONENT</b>, <b>DEFECT</b>, and tap <b>📷 PHOTO</b>. Do not stop to write detailed work requests here.</p>
                <div style="display: flex; gap: 10px; align-items: center; background: var(--input-bg); padding: 8px; border-radius: 4px; border: 1px dashed var(--border-color);">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--warning)" stroke-width="2" style="flex-shrink:0;"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                    <span style="font-size: 12px; color: var(--text-muted); line-height: 1.3;"><i>Tap the green <b>ATTACHED</b> badge to manage photos. Use <b>CUSTOM ENTRY</b> for unlisted parts.</i></span>
                </div>
            </div>
        </div>

        <div style="display: flex; gap: 15px; margin-bottom: 20px; background: rgba(255,255,255,0.03); padding: 15px; border: 1px solid var(--border-color); border-radius: 8px;">
            <div style="flex-shrink: 0;">
                <div style="width: 32px; height: 32px; border-radius: 50%; background: #0A84FF; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 18px;">3</div>
            </div>
            <div>
                <h4 style="margin: 0 0 5px 0; color: #0A84FF; text-transform: uppercase; letter-spacing: 1px;">Tactical Tools</h4>
                <ul style="margin: 0; padding-left: 15px; color: var(--text-muted); font-size: 13px; line-height: 1.5;">
                    <li style="margin-bottom: 6px;"><b>Bottom Sheath:</b> Tap the bottom center ` + "`>`" + ` to access Search, Batch Add (+), Save, and Quick Scroll tools.</li>
                    <li style="margin-bottom: 6px;"><b>Clone Engine (⇊):</b> Found a continuous defect? Log it once, hit the blue ⇊ next to the photo button, and instantly copy it to subsequent track sections.</li>
                    <li><b>Insert Pocket:</b> Long-press any TS on the left mini-map to wedge a pocket track or switch into your route.</li>
                </ul>
            </div>
        </div>

        <div style="display: flex; gap: 15px; margin-bottom: 20px; background: rgba(255,255,255,0.03); padding: 15px; border: 1px solid var(--border-color); border-radius: 8px;">
            <div style="flex-shrink: 0;">
                <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--success); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 18px;">4</div>
            </div>
            <div>
                <h4 style="margin: 0 0 5px 0; color: var(--success); text-transform: uppercase; letter-spacing: 1px;">Export to Shop</h4>
                <p style="margin: 0 0 8px 0; color: var(--text-muted);">At the <b>end of your inspection</b>, save your data and tap <b style="color: var(--success);">📊 EXPORT REPORT</b>.</p>
                <div style="display: flex; gap: 10px; align-items: center; background: var(--input-bg); padding: 8px; border-radius: 4px; border: 1px dashed var(--border-color);">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2" style="flex-shrink:0;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    <span style="font-size: 12px; color: var(--text-muted); line-height: 1.3;"><i>Take the generated Excel and PDFs back to the shop. That is where the real work orders and analysis happen.</i></span>
                </div>
            </div>
        </div>

        <div style="text-align: center; margin-top: 25px; padding-top: 15px; border-top: 1px solid var(--border-color);">
            <p style="margin: 0; font-size: 12px; color: var(--text-muted);">Need better visibility? Open the top menu (⚙) to adjust <b>UI THEME</b> and <b>FONT SIZE</b> at any time.</p>
        </div>
        
    </div>
`;
