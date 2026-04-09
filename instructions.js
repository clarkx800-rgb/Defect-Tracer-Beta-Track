const systemInstructions = `
    <div style="font-size: 15px; line-height: 1.5; color: var(--text-color); text-transform: none; padding-bottom: 20px; font-family: sans-serif;">
        
        <div style="text-align: center; margin-bottom: 20px; color: var(--text-muted);">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            <div style="font-weight: bold; letter-spacing: 1px; margin-top: 10px; font-size: 18px; color: var(--text-color);">FIELD REFERENCE MANUAL</div>
            <div style="font-size: 13px; color: var(--primary); margin-top: 4px; font-weight: bold; letter-spacing: 2px;">DESIGNED AND CREATED BY: "THAT GUY". Yeah, that guy.</div>
            
            <div style="margin-top: 15px; font-size: 14px; color: var(--warning); font-weight: bold; border: 2px solid var(--warning); display: inline-block; padding: 8px 12px; border-radius: 4px; background: rgba(255, 179, 0, 0.1);">
                CAN'T READ THIS? Tap the ⚙ top-right to change FONT SIZE.
            </div>
        </div>

        <div style="display: flex; gap: 15px; margin-bottom: 20px; background: rgba(255,255,255,0.05); padding: 15px; border: 2px solid var(--border-color); border-radius: 8px;">
            <div style="flex-shrink: 0;">
                <div style="width: 36px; height: 36px; border-radius: 50%; background: var(--primary); color: #000; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 20px;">1</div>
            </div>
            <div>
                <h4 style="margin: 0 0 8px 0; color: var(--primary); text-transform: uppercase; letter-spacing: 1px; font-size: 18px;">Load Your Track</h4>
                <p style="margin: 0 0 8px 0; font-size: 15px; font-weight: 500;">Tap the top-right <b>⚙ menu</b>. Pick your LINE (EX, MI, EV), Direction (IB/OB), and Sub Range. Tap <b style="color: var(--primary);">LOAD AREA</b>.</p>
                <div style="background: var(--bg-color); padding: 10px; border-radius: 4px; border-left: 3px solid var(--primary); font-size: 14px;">
                    <b>TIP:</b> Walking the other way? Hit <b>🔃 FLIP DIR</b> to reverse the track order. Load all needed sub to subs first though.
                </div>
            </div>
        </div>

        <div style="display: flex; gap: 15px; margin-bottom: 20px; background: rgba(255,255,255,0.05); padding: 15px; border: 2px solid var(--border-color); border-radius: 8px;">
            <div style="flex-shrink: 0;">
                <div style="width: 36px; height: 36px; border-radius: 50%; background: var(--warning); color: #000; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 20px;">2</div>
            </div>
            <div>
                <h4 style="margin: 0 0 8px 0; color: var(--warning); text-transform: uppercase; letter-spacing: 1px; font-size: 18px;">Log Defects Fast</h4>
                <p style="margin: 0 0 8px 0; font-size: 15px; font-weight: 500;">Pick a <b>COMPONENT</b> and <b>DEFECT</b>. Tap <b>📷 PHOTO</b> to attach pictures. This helps create a point of reference on a progressing defect.</p>
                <div style="background: var(--bg-color); padding: 10px; border-radius: 4px; border-left: 3px solid var(--warning); font-size: 14px;">
                    <b>TIP:</b> Part not on the list? Scroll to the very bottom and select <b>CUSTOM ENTRY</b>.
                </div>
            </div>
        </div>

        <div style="display: flex; gap: 15px; margin-bottom: 20px; background: rgba(255,255,255,0.05); padding: 15px; border: 2px solid var(--border-color); border-radius: 8px;">
            <div style="flex-shrink: 0;">
                <div style="width: 36px; height: 36px; border-radius: 50%; background: #0A84FF; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 20px;">3</div>
            </div>
            <div>
                <h4 style="margin: 0 0 8px 0; color: #0A84FF; text-transform: uppercase; letter-spacing: 1px; font-size: 18px;">Bottom Menu Tools</h4>
                <ul style="margin: 0; padding-left: 20px; font-size: 15px; font-weight: 500; line-height: 1.6;">
                    <li style="margin-bottom: 8px;"><b>(SEARCH):</b> Tap the bottom bar and type a TS number to jump straight to it.</li>
                    <li style="margin-bottom: 8px;"><b>+ (Batch Add):</b> Add multiple sub to sub to your list all at once.</li>
                    <li style="margin-bottom: 8px;"><b>Clone (⇊):</b> Found a continuous issue? Tap the blue <b>⇊</b> next to the photo button to instantly copy that defect down the line.</li>
                    <li><b>Insert Track:</b> Long-press a TS on the left map to insert a pocket tracks. For instance, VTB and at DC13. Find TS of DC13 and load pocket track range on it.</li>
                </ul>
            </div>
        </div>

        <div style="display: flex; gap: 15px; margin-bottom: 20px; background: rgba(255,255,255,0.05); padding: 15px; border: 2px solid var(--border-color); border-radius: 8px;">
            <div style="flex-shrink: 0;">
                <div style="width: 36px; height: 36px; border-radius: 50%; background: var(--success); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 20px;">4</div>
            </div>
            <div>
                <h4 style="margin: 0 0 8px 0; color: var(--success); text-transform: uppercase; letter-spacing: 1px; font-size: 18px;">End of Shift Export</h4>
                <p style="margin: 0 0 8px 0; font-size: 15px; font-weight: 500;">At end of inspection, hit <b>💾 SAVE</b> to back it up, or directly tap <b style="color: var(--success);">📊 EXPORT REPORT</b>.</p>
                <div style="background: var(--bg-color); padding: 10px; border-radius: 4px; border-left: 3px solid var(--success); font-size: 14px;">
                    Generated files: excel and pdf can now be uploaded to your <b>ONE DRIVE</b> or send via email to work email. Attach PDF picture files to your newly opened work orders.
                </div>
            </div>
        </div>
        
    </div>
`;
