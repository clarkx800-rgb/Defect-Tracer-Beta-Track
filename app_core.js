// ==========================================
// APP CORE: Global State Manager & Logic Flow
// ==========================================

window.currentFileName = null;
window.loadedRoutes = new Set();
window.routeLoadHistory = []; 
window.currentActiveArea = "";
window.currentActiveDirection = "";
window.isAutoScrolling = false;
window.currentRowForGallery = null; 
window.currentInsertTargetTS = null;
window.currentRowToClone = null; 
window.confirmResolve = null;

window.delay = ms => new Promise(res => setTimeout(res, ms));

async function removeRouteFromMenu(e, routeKey, routeName) {
    e.stopPropagation(); document.getElementById('stsShortcutMenu').style.display = 'none'; 
    const proceed = await showSystemConfirm(`Are you sure you want to remove "${routeName}" from the workspace?`, "REMOVE ROUTE", "Yes", "Nope");
    if (!proceed) return;

    const cardsToRemove = document.querySelectorAll(`.segment-card[data-route-key="${routeKey}"]`);
    cardsToRemove.forEach(card => { card.querySelectorAll('.defect-row').forEach(row => cleanUpRowImages(row)); card.remove(); });
    document.querySelectorAll(`.map-item[data-route-key="${routeKey}"]`).forEach(el => el.remove());
    
    window.loadedRoutes.delete(routeKey); 
    window.routeLoadHistory = window.routeLoadHistory.map(batch => batch.filter(k => k !== routeKey)).filter(batch => batch.length > 0);

    if (window.loadedRoutes.size === 0) {
        document.getElementById('quickAddGroup').style.display = 'none'; 
        window.currentActiveArea = ""; 
        window.currentActiveDirection = "";
        document.getElementById('active-area-display').style.display = 'none'; 
        document.getElementById('stsDropdownBtn').style.display = 'none'; 
        document.getElementById('active-route-display').innerHTML = 'AWAITING...';
        toggleHelp(true); updateCommandBar(); document.getElementById('mainCommandBar').classList.add('collapsed');
    } else { window.scrollBy(0, 1); window.scrollBy(0, -1); }
    toggleEmptyState();
}

async function executeClone() {
    try {
        const rowToClone = window.currentRowToClone;
        if (!rowToClone) return;

        const targetTS = document.getElementById('cloneTsInput').value.trim();
        document.getElementById('cloneTsInput').blur(); 
        if (!targetTS) { closeCloneModal(); return; }

        const startCard = rowToClone.closest('.segment-card');
        const endCard = document.querySelector(`.segment-card[data-segment="${targetTS}"]`);
        
        if (!endCard) { 
            showSystemAlert(`Cannot find TS-${targetTS} in the current workspace. Please ensure it is loaded.`, "CLONE ERROR", true); 
            return; 
        }

        const isCustom = rowToClone.dataset.isCustom === "true";
        const comp = isCustom ? rowToClone.querySelector('.custom-comp').value : rowToClone.querySelector('.component-select').value;
        const def = isCustom ? rowToClone.querySelector('.custom-def').value : rowToClone.querySelector('.defect-select').value;
        const originalRefs = JSON.parse(rowToClone.dataset.images || "[]");

        if (!comp && !def && originalRefs.length === 0) { 
            closeCloneModal();
            showSystemAlert("This row is entirely empty. There is no data to clone.", "CLONE ERROR", true); 
            return; 
        }

        closeCloneModal();
        await updateProgress(10, "INITIALIZING CLONE...", "CLONING DEFECT");

        const allCards = Array.from(document.querySelectorAll('.segment-card'));
        const startIdx = allCards.indexOf(startCard); 
        const endIdx = allCards.indexOf(endCard);
        
        if(startIdx === -1 || endIdx === -1) {
            closeProgress();
            showSystemAlert("Could not locate cards in workspace.", "CLONE ERROR", true);
            return;
        }

        const minIdx = Math.min(startIdx, endIdx); 
        const maxIdx = Math.max(startIdx, endIdx);
        let count = 0, total = Math.max(1, maxIdx - minIdx);

        for (let i = minIdx; i <= maxIdx; i++) {
            if (i === startIdx) continue; 
            
            const targetCard = allCards[i]; 
            const areaName = targetCard.getAttribute('data-area-name'); 
            const defectList = targetCard.querySelector('.defect-list'); 
            const existingRows = defectList.querySelectorAll('.defect-row');
            
            await updateProgress(10 + Math.round((count/total)*80), `CLONING TO TS-${targetCard.dataset.segment}...`, "CLONING DEFECT");

            if (existingRows.length === 1) {
                const r = existingRows[0]; 
                const rIsCustom = r.dataset.isCustom === "true"; 
                const rComp = rIsCustom ? r.querySelector('.custom-comp').value : r.querySelector('.component-select').value; 
                const rDef = rIsCustom ? r.querySelector('.custom-def').value : r.querySelector('.defect-select').value; 
                const rImgs = JSON.parse(r.dataset.images || "[]");
                
                if (!rComp && !rDef && rImgs.length === 0) { 
                    cleanUpRowImages(r); 
                    r.remove(); 
                }
            }

            const newRefs = [];
            for(let ref of originalRefs) {
                if (ref.id) { 
                    const dbImg = await getImageFromDB(ref.id); 
                    if(dbImg) { 
                        const newRef = await saveImageToDB(dbImg.data, dbImg.w, dbImg.h); 
                        newRefs.push(newRef); 
                    } 
                } 
                else if (ref.img) { 
                    const newRef = await saveImageToDB(ref.img, ref.w || 1200, ref.h || 1200); 
                    newRefs.push(newRef); 
                }
            }

            addDefectRow(defectList, { isCustom, comp, def, images: newRefs }, areaName); 
            checkSegmentData(targetCard); 
            count++;
        }

        await updateProgress(100, "CLONE COMPLETE!", "CLONING DEFECT");
        setTimeout(() => { 
            closeProgress(); 
            showSystemAlert(`Successfully cloned defect payload to ${count} track sections.`, "CLONE COMPLETE"); 
        }, 800);
        
    } catch (err) {
        console.error("Clone Crash:", err);
        closeProgress();
        showSystemAlert("Clone failed: " + err.message, "CRITICAL ERROR", true);
    }
}

// BUG FIXED: Upgraded Switch Splicer to read Text-based 'points'
async function executeInsert() {
    const targetTS = window.currentInsertTargetTS;
    if (!targetTS) return;
    const area = window.currentActiveArea; 
    const direction = window.currentActiveDirection; 
    const routeKey = document.getElementById('insert-route-select').value;
    
    if (!area || !routeKey) { showSystemAlert('Invalid Selection. Ensure Route is selected.', 'SELECTION ERROR', true); return; }
    if (window.loadedRoutes.has(routeKey)) { showSystemAlert('This section is already loaded in the workspace.', 'DUPLICATE LOAD'); return; }

    const selectedRouteData = window.globalDatabase[area][direction][routeKey];
    const container = document.getElementById('segments-container'); const mapContainer = document.getElementById('miniMap');

    await updateProgress(10, "SPLICING NEW SWITCH...", "LOADING SECTIONS");
    const newCards = []; 
    
    selectedRouteData.segments.forEach(range => { 
        const blockColor = range.color || 'var(--primary)'; 
        if (range.points) {
            range.points.forEach(pt => newCards.push({ num: pt, color: blockColor }));
        } else if (range.start !== undefined && range.end !== undefined) {
            if (range.start <= range.end) { for (let i = range.start; i <= range.end; i++) newCards.push({ num: i, color: blockColor }); } 
            else { for (let i = range.start; i >= range.end; i--) newCards.push({ num: i, color: blockColor }); } 
        }
    });

    const targetCard = document.querySelector(`.segment-card[data-segment="${targetTS}"]`); const targetMap = document.querySelector(`.map-item[data-map-segment="${targetTS}"]`);
    const refCard = targetCard ? targetCard.nextSibling : null; const refMap = targetMap ? targetMap.nextSibling : null;

    for (let i=0; i<newCards.length; i++) {
        const item = newCards[i];
        await updateProgress(10 + Math.round((i/newCards.length)*80), `INSERTING TS-${item.num}...`, "LOADING SECTIONS");
        const card = createSegmentCard(item.num, routeKey, selectedRouteData.name, direction, item.color, area);
        card.style.animationDelay = `${i * 0.05}s`; container.insertBefore(card, refCard); scrollObserver.observe(card);
        const mapBtn = document.createElement('div'); mapBtn.className = 'map-item'; mapBtn.setAttribute('data-map-segment', item.num); mapBtn.setAttribute('data-route-key', routeKey); mapBtn.textContent = `TS-${item.num}`; mapBtn.style.borderLeft = `4px solid ${item.color}`;
        attachMapItemListeners(mapBtn, card, item.num, routeKey); mapContainer.insertBefore(mapBtn, refMap);
    }

    window.loadedRoutes.add(routeKey); window.routeLoadHistory.push([routeKey]); closeInsertModal(); toggleEmptyState();
    const firstNewCard = document.querySelector(`.segment-card[data-route-key="${routeKey}"]`);
    if(firstNewCard) { window.isAutoScrolling = true; scrollToCard(firstNewCard); firstNewCard.classList.add('search-highlight'); setTimeout(() => { firstNewCard.classList.remove('search-highlight'); window.isAutoScrolling = false; }, 1200); }
    await updateProgress(100, "SPLICE COMPLETE!"); setTimeout(closeProgress, 800);
}

async function loadSelectedTemplate() {
    const select = document.getElementById('template-select');
    const url = select.value;
    if (!url) {
        showSystemAlert("Please select a template first.", "NO SELECTION", true);
        return;
    }
    
    closeTemplateModal();
    await updateProgress(10, "DOWNLOADING TEMPLATE...", "LOADING SYSTEM");

    try {
        const response = await fetch(url + '?t=' + new Date().getTime());
        if (!response.ok) throw new Error('Network response was not ok. Ensure file exists.');
        const data = await response.json();
        const fileName = url.split('/').pop();
        await injectProjectData(data, fileName);
    } catch (err) {
        console.error("Fetch error:", err);
        closeProgress();
        showSystemAlert(`Failed to load template: ${err.message || 'Check network connection or valid template format.'}`, 'DOWNLOAD FAILED', true);
    } 
}

async function injectProjectData(projectData, fileName) {
    try {
        if (!Array.isArray(projectData)) throw new Error("Invalid Format: Ensure the template is a valid JSON Array containing track segments.");
        
        await updateProgress(10, "UNPACKING STRUCTURE...", "LOADING DATA");

        const container = document.getElementById('segments-container');
        const mapContainer = document.getElementById('miniMap');
        container.innerHTML = '';
        mapContainer.innerHTML = '';
        
        window.loadedRoutes.clear(); 
        window.routeLoadHistory = [];
        toggleHelp(false);

        let totalSegs = projectData.length;
        for (let index = 0; index < totalSegs; index++) {
            const segData = projectData[index];
            await updateProgress(10 + Math.round((index / totalSegs) * 80), `BUILDING TS-${segData.segmentNum}...`, "LOADING DATA");

            const safeAreaName = segData.areaName || '';
            const activeKey = segData.routeKey || segData.routeName; 
            
            const card = createSegmentCard(segData.segmentNum, activeKey, segData.routeName, segData.direction, segData.color, safeAreaName);
            card.style.animationDelay = `${index * 0.05}s`;
            
            card.querySelector('.segment-notes').value = segData.notes || '';
            const defectList = card.querySelector('.defect-list');
            defectList.innerHTML = '';
            
            if (!segData.defects || segData.defects.length === 0) { 
                addDefectRow(defectList, null, safeAreaName); 
            } else { 
                for (let defData of segData.defects) {
                    if (defData.photoBase64 && (!defData.images || defData.images.length === 0)) {
                        defData.images = [{ img: defData.photoBase64, w: defData.imgW || 1200, h: defData.imgH || 1200 }];
                    }
                    if (defData.images && defData.images.length > 0) {
                        const newRefs = [];
                        for (let imgData of defData.images) {
                            if(imgData.data) { 
                                const ref = await saveImageToDB(imgData.data, imgData.w, imgData.h);
                                newRefs.push(ref);
                            } else if (imgData.img) { 
                                const ref = await saveImageToDB(imgData.img, imgData.w || 1200, imgData.h || 1200);
                                newRefs.push(ref);
                            } else if (imgData.id) {
                                newRefs.push(imgData); 
                            }
                        }
                        defData.images = newRefs; 
                    }
                    addDefectRow(defectList, defData, safeAreaName); 
                }
            }

            container.appendChild(card);
            scrollObserver.observe(card);

            const mapBtn = document.createElement('div');
            mapBtn.className = 'map-item';
            mapBtn.setAttribute('data-map-segment', segData.segmentNum);
            mapBtn.setAttribute('data-route-key', activeKey);
            mapBtn.textContent = `TS-${segData.segmentNum}`;
            mapBtn.style.borderLeft = `4px solid ${segData.color || '#ccc'}`;
            
            attachMapItemListeners(mapBtn, card, segData.segmentNum, activeKey);
            
            mapContainer.appendChild(mapBtn);
            checkSegmentData(card);

            if (activeKey && !window.loadedRoutes.has(activeKey)) {
                window.loadedRoutes.add(activeKey);
                window.routeLoadHistory.push([activeKey]);
            }
            window.currentActiveArea = safeAreaName;
            window.currentActiveDirection = segData.direction;
        }

        if (window.loadedRoutes.size > 0) document.getElementById('quickAddGroup').style.display = 'flex';

        await updateProgress(100, "SYSTEM READY", "LOAD COMPLETE");
        setTimeout(() => {
            closeProgress();
            window.currentFileName = fileName;
            showSystemAlert('Data imported successfully.', 'DATA LOADED');
            toggleMenu(true);
            updateCommandBar();
            document.getElementById('mainCommandBar').classList.add('collapsed');
            toggleEmptyState();
        }, 800);

    } catch (err) {
        closeProgress();
        showSystemAlert(`Error Loading Data: ${err.message}`, 'SYSTEM ERROR', true);
        console.error(err);
    }
}

// BUG FIXED: Upgraded Section Generator to read Text-based 'points'
async function generateSegments() {
    const area = window.currentActiveArea; const direction = window.currentActiveDirection;
    const checkboxes = Array.from(document.querySelectorAll('#quick-add-checklist input[type="checkbox"]:checked'));
    if (checkboxes.length === 0) { showSystemAlert('Please select at least one route to add.', 'SELECTION ERROR', true); return; }
    checkboxes.sort((a, b) => parseInt(a.dataset.index) - parseInt(b.dataset.index)); const selectedRouteKeys = checkboxes.map(cb => cb.value);

    toggleHelp(false); let firstNewCardToScroll = null;
    await updateProgress(10, "BUILDING WORKSPACE...", "LOADING ROUTES");

    for (let j=0; j<selectedRouteKeys.length; j++) {
        const selectedRouteKey = selectedRouteKeys[j];
        if (window.loadedRoutes.has(selectedRouteKey)) continue; 

        const selectedRouteData = window.globalDatabase[area][direction][selectedRouteKey];
        const container = document.getElementById('segments-container'); const mapContainer = document.getElementById('miniMap');
        const newCards = []; 
        
        selectedRouteData.segments.forEach(range => { 
            const blockColor = range.color || 'var(--primary)'; 
            if (range.points) {
                range.points.forEach(pt => newCards.push({ num: pt, color: blockColor }));
            } else if (range.start !== undefined && range.end !== undefined) {
                if (range.start <= range.end) { for (let i = range.start; i <= range.end; i++) newCards.push({ num: i, color: blockColor }); } 
                else { for (let i = range.start; i >= range.end; i--) newCards.push({ num: i, color: blockColor }); } 
            }
        });
        
        for (let i=0; i<newCards.length; i++) {
            const item = newCards[i];
            await updateProgress(10 + Math.round(((j+0.5)/selectedRouteKeys.length)*80), `BUILDING TS-${item.num}...`, "LOADING ROUTES");
            const card = createSegmentCard(item.num, selectedRouteKey, selectedRouteData.name, direction, item.color, area); card.style.animationDelay = `${i * 0.05}s`; container.appendChild(card); scrollObserver.observe(card);
            const mapBtn = document.createElement('div'); mapBtn.className = 'map-item'; mapBtn.setAttribute('data-map-segment', item.num); mapBtn.setAttribute('data-route-key', selectedRouteKey); mapBtn.textContent = `TS-${item.num}`; mapBtn.style.borderLeft = `4px solid ${item.color}`;
            attachMapItemListeners(mapBtn, card, item.num, selectedRouteKey); mapContainer.appendChild(mapBtn);
            if (!firstNewCardToScroll) firstNewCardToScroll = card;
        }
        window.loadedRoutes.add(selectedRouteKey);
    }

    window.routeLoadHistory.push(selectedRouteKeys); document.getElementById('quickAddGroup').style.display = 'flex'; toggleQuickAddModal(false); updateCommandBar(); document.getElementById('mainCommandBar').classList.add('collapsed'); toggleEmptyState();
    if(firstNewCardToScroll) { window.isAutoScrolling = true; scrollToCard(firstNewCardToScroll); firstNewCardToScroll.classList.add('search-highlight'); setTimeout(() => { firstNewCardToScroll.classList.remove('search-highlight'); window.isAutoScrolling = false; }, 1200); }
    await updateProgress(100, "ROUTES LOADED"); setTimeout(closeProgress, 500);
}

async function undoLastLoad() {
    if (window.routeLoadHistory.length === 0) { showSystemAlert("No actions to undo.", "SYSTEM NOTICE"); return; }
    const lastTransactionKeys = window.routeLoadHistory[window.routeLoadHistory.length - 1]; const keysToUndo = Array.isArray(lastTransactionKeys) ? lastTransactionKeys : [lastTransactionKeys];
    let hasData = false; let conflictTS = ""; let conflictRoute = ""; let cardsToRemove = [];

    keysToUndo.forEach(key => {
        const cards = document.querySelectorAll(`.segment-card[data-route-key="${key}"]`);
        cards.forEach(card => {
            cardsToRemove.push(card); if (hasData) return; 
            if (card.querySelector('.segment-notes').value.trim() !== '') hasData = true;
            card.querySelectorAll('.defect-row').forEach(row => {
                const images = JSON.parse(row.dataset.images || "[]"); const isCustom = row.dataset.isCustom === "true";
                const compVal = isCustom ? row.querySelector('.custom-comp').value : row.querySelector('.component-select').value;
                const defVal = isCustom ? row.querySelector('.custom-def').value : row.querySelector('.defect-select').value;
                if (compVal || defVal || images.length > 0) hasData = true;
            });
            if (hasData) { conflictTS = card.getAttribute('data-segment'); conflictRoute = card.getAttribute('data-route-name'); }
        });
    });

    if (hasData) { const proceed = await showSystemConfirm(`TS-${conflictTS} has data.\n\nUndoing this will erase "${conflictRoute}" and details.\n\nAre you sure you want to cancel?`); if (!proceed) return; }
    
    window.routeLoadHistory.pop();
    cardsToRemove.forEach(card => { card.querySelectorAll('.defect-row').forEach(row => cleanUpRowImages(row)); card.remove(); });
    keysToUndo.forEach(key => { document.querySelectorAll(`.map-item[data-route-key="${key}"]`).forEach(el => el.remove()); window.loadedRoutes.delete(key); });
    
    if (window.loadedRoutes.size === 0) {
        document.getElementById('quickAddGroup').style.display = 'none'; window.currentActiveArea = ""; window.currentActiveDirection = ""; document.getElementById('active-area-display').style.display = 'none'; document.getElementById('stsDropdownBtn').style.display = 'none'; document.getElementById('active-route-display').innerHTML = 'AWAITING...'; toggleHelp(true);
    }
    toggleQuickAddModal(false); updateCommandBar(); document.getElementById('mainCommandBar').classList.add('collapsed'); toggleEmptyState();
}

function flipOrder() {
    const container = document.getElementById('segments-container'); const mapContainer = document.getElementById('miniMap');
    const cards = Array.from(container.children); const mapItems = Array.from(mapContainer.children);
    if (cards.length === 0) return;
    cards.reverse(); mapItems.reverse();
    cards.forEach((card, index) => { container.appendChild(card); card.style.animation = 'none'; void card.offsetWidth; card.style.animation = `cascadingFadeIn 0.3s ease-out ${index * 0.05}s both`; });
    mapItems.forEach(item => mapContainer.appendChild(item));
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('theme-selector').value = localStorage.getItem('appTheme') || 'tactical';
    document.getElementById('font-selector').value = localStorage.getItem('appFontSize') || 'small';
    const areaSelect = document.getElementById('general-area');
    if(window.globalDatabase) { for (let area in window.globalDatabase) { let opt = document.createElement('option'); opt.value = area; opt.textContent = area; areaSelect.appendChild(opt); } }
    if (window.loadedRoutes.size === 0) toggleHelp(true);
    updateCommandBar(); toggleEmptyState();
});

document.addEventListener('click', (e) => {
    const menu = document.getElementById('collapsible-menu'); const fabModal = document.getElementById('quickAddModal'); const stsMenu = document.getElementById('stsShortcutMenu'); const insertModal = document.getElementById('insertModal'); const cloneModal = document.getElementById('cloneModal'); const menuBtn = document.getElementById('menuBtn'); const stsBtn = document.getElementById('stsDropdownBtn'); const helpOverlay = document.getElementById('helpOverlay'); const cmdBar = document.getElementById('mainCommandBar');
    if (!menu.contains(e.target) && !menuBtn.contains(e.target) && menu.classList.contains('expanded')) toggleMenu(true);
    if (stsMenu && stsBtn && !stsMenu.contains(e.target) && !stsBtn.contains(e.target) && stsMenu.style.display === 'flex') stsMenu.style.display = 'none';
    if (insertModal && !insertModal.contains(e.target) && !e.target.closest('.map-item') && insertModal.style.display === 'flex') closeInsertModal();
    if (cloneModal && !cloneModal.contains(e.target) && !e.target.closest('.clone-btn') && cloneModal.style.display === 'flex') closeCloneModal();
    if (helpOverlay.style.display === 'flex' && e.target === helpOverlay) toggleHelp(false);
    if (cmdBar && !cmdBar.classList.contains('collapsed') && !cmdBar.contains(e.target) && (!fabModal || !fabModal.contains(e.target))) { cmdBar.classList.add('collapsed'); toggleQuickAddModal(false); }
});

window.addEventListener('beforeunload', function (e) { const cards = document.querySelectorAll('.segment-card'); if (cards.length > 0) { e.preventDefault(); e.returnValue = 'Data loss imminent. Are you sure you want to cancel?'; } });
window.history.pushState({ isAppOpen: true }, "", "");
window.addEventListener('popstate', function(event) {
    const cards = document.querySelectorAll('.segment-card');
    if (cards.length > 0) { window.history.pushState({ isAppOpen: true }, "", ""); showSystemConfirm("WARNING: Using the system back button will exit the app and delete unsaved data.\n\nAre you sure you want to exit?", "DATA LOSS IMMINENT").then(proceed => { if (proceed) window.history.go(-2); }); } 
    else { window.history.back(); }
});
