// ==========================================
// UI ENGINE: Modals, Progress, DOM Creation
// ==========================================

async function updateProgress(percent, text, title = "SYSTEM PROCESSING") {
    const overlay = document.getElementById('exportProgressOverlay');
    document.getElementById('exportMainTitle').textContent = title;
    overlay.style.display = 'flex';
    document.getElementById('exportProgressBar').style.width = percent + '%';
    document.getElementById('exportProgressText').textContent = percent + '%';
    document.getElementById('exportStatusText').textContent = text;
    await window.delay(16); 
}

function closeProgress() {
    document.getElementById('exportProgressOverlay').style.display = 'none';
}

function showSystemAlert(message, title = "SYSTEM NOTICE", isDanger = false) {
    document.getElementById('systemModalTitle').textContent = title;
    document.getElementById('systemModalTitle').style.color = isDanger ? "var(--danger)" : "var(--primary)";
    document.getElementById('systemModalTitle').style.borderColor = isDanger ? "var(--danger)" : "var(--primary)";
    document.getElementById('systemModalMessage').textContent = message;
    document.getElementById('systemModalBtnGroup').innerHTML = `<button class="btn-primary" style="width: 100%;" onclick="closeSystemModal()">ACKNOWLEDGE</button>`;
    document.getElementById('systemModalOverlay').style.display = 'flex';
}

function showSystemConfirm(message, title = "SYSTEM WARNING", confirmText = "PROCEED", cancelText = "CANCEL") {
    return new Promise((resolve) => {
        document.getElementById('systemModalTitle').textContent = title;
        document.getElementById('systemModalTitle').style.color = "var(--warning)";
        document.getElementById('systemModalTitle').style.borderColor = "var(--warning)";
        document.getElementById('systemModalMessage').textContent = message;
        document.getElementById('systemModalBtnGroup').innerHTML = `<button class="btn-danger" style="flex: 1;" onclick="resolveSystemConfirm(true)">${confirmText}</button><button class="btn-outline" style="flex: 1;" onclick="resolveSystemConfirm(false)">${cancelText}</button>`;
        window.confirmResolve = resolve;
        document.getElementById('systemModalOverlay').style.display = 'flex';
    });
}

function resolveSystemConfirm(result) { closeSystemModal(); if (window.confirmResolve) window.confirmResolve(result); }
function closeSystemModal() { document.getElementById('systemModalOverlay').style.display = 'none'; }

function toggleEmptyState() {
    const emptyState = document.getElementById('empty-workspace-state');
    const segmentsContainer = document.getElementById('segments-container');
    if (emptyState && segmentsContainer) {
        if (window.loadedRoutes.size === 0) {
            emptyState.style.display = 'flex';
            segmentsContainer.style.display = 'none';
        } else {
            emptyState.style.display = 'none';
            segmentsContainer.style.display = 'flex';
        }
    }
}

function openTemplateModal(categoryKey, categoryName) {
    document.getElementById('template-modal-title').textContent = categoryName;
    const select = document.getElementById('template-select');
    select.innerHTML = '<option value="">SELECT TEMPLATE...</option>';
    
    if(typeof templateLibrary !== 'undefined' && templateLibrary[categoryKey]) {
        templateLibrary[categoryKey].forEach(tpl => {
            let opt = document.createElement('option');
            opt.value = tpl.url;
            opt.textContent = tpl.name;
            select.appendChild(opt);
        });
    } else {
        let opt = document.createElement('option');
        opt.value = "";
        opt.textContent = "No templates found in config.";
        select.appendChild(opt);
    }
    document.getElementById('templateModalOverlay').style.display = 'flex';
    document.getElementById('mainCommandBar').classList.add('collapsed');
}

function closeTemplateModal() { document.getElementById('templateModalOverlay').style.display = 'none'; }

let currentHelpZoom = 1;
function zoomHelpModal(step) {
    currentHelpZoom = Math.max(0.8, Math.min(3.0, currentHelpZoom + step));
    const helpBody = document.getElementById('helpBodyContent');
    if ('zoom' in helpBody.style) { helpBody.style.zoom = currentHelpZoom; } 
    else { helpBody.style.transform = `scale(${currentHelpZoom})`; helpBody.style.transformOrigin = 'top left'; helpBody.style.width = `${100 / currentHelpZoom}%`; }
}

function togglePageScroll() {
    const btnIcon = document.getElementById('scrollToggleIcon');
    const dir = btnIcon.dataset.dir || 'down'; 
    const maxScroll = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight) - window.innerHeight;
    if (dir === 'up') doSmoothScroll(0, 800); else doSmoothScroll(maxScroll, 800);
}

function doSmoothScroll(targetY, duration) {
    window.isPageScrolling = true;
    const startY = window.scrollY; const diff = targetY - startY; let startTime = null;
    function step(timestamp) {
        if (!window.isPageScrolling) return; 
        if (!startTime) startTime = timestamp;
        const time = timestamp - startTime; let percent = Math.min(time / duration, 1);
        percent = percent < 0.5 ? 2 * percent * percent : -1 + (4 - 2 * percent) * percent;
        window.scrollTo(0, startY + diff * percent);
        if (time < duration) requestAnimationFrame(step); else window.isPageScrolling = false;
    }
    requestAnimationFrame(step);
}

['touchstart', 'mousedown', 'wheel'].forEach(evt => { window.addEventListener(evt, () => { if (window.isPageScrolling) window.isPageScrolling = false; }, { passive: true }); });

window.addEventListener('scroll', () => {
    const btnIcon = document.getElementById('scrollToggleIcon');
    if (!btnIcon) return;
    if (window.scrollY < 100) { 
        btnIcon.style.transform = 'rotate(180deg)'; 
        btnIcon.dataset.dir = 'down'; 
    } else { 
        btnIcon.style.transform = 'rotate(0deg)'; 
        btnIcon.dataset.dir = 'up'; 
    }
}, { passive: true });

function toggleCommandBar(e) {
    if (e) e.stopPropagation();
    const bar = document.getElementById('mainCommandBar');
    if (bar.classList.contains('collapsed')) { bar.classList.remove('collapsed'); toggleHelp(false); closeCloneModal(); } 
    else { bar.classList.add('collapsed'); toggleQuickAddModal(false); }
}

function updateCommandBar() {
    const btn = document.getElementById('dynamicSaveLoadBtn');
    if (window.loadedRoutes.size === 0) {
        btn.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="pointer-events: none;"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`;
        btn.onclick = () => { document.getElementById('importFile').click(); };
    } else {
        btn.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="pointer-events: none;"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>`;
        btn.onclick = () => saveProject();
    }
}

function toggleHelp(forceShow = null) {
    const overlay = document.getElementById('helpOverlay');
    const header = document.getElementById('stickyHeader');
    const shouldShow = forceShow !== null ? forceShow : overlay.style.display === 'none';
    if (shouldShow) {
        const headerHeight = header.offsetHeight;
        overlay.style.top = `${headerHeight}px`;
        overlay.style.height = `calc(100vh - ${headerHeight}px - 85px)`; 
        document.getElementById('helpBodyContent').innerHTML = systemInstructions + `<div id="sw-version-fetcher" style="text-align:center; padding-top:20px; color:var(--text-muted); font-weight:bold; font-size:14px; letter-spacing:1px;">Checking App Version...</div>`;
        
        fetch('sw.js').then(r => r.text()).then(text => {
            const match = text.match(/v?\d+\.\d+\.\d+/);
            const vDiv = document.getElementById('sw-version-fetcher');
            if (match && vDiv) { let v = match[0]; if (!v.startsWith('v')) v = 'v' + v; vDiv.textContent = 'TRACER ' + v; vDiv.style.color = 'var(--primary)'; } 
            else if (vDiv) { vDiv.textContent = 'VERSION UNKNOWN'; }
        }).catch(() => {
            const vDiv = document.getElementById('sw-version-fetcher');
            if (vDiv) vDiv.textContent = 'TRACER (OFFLINE CACHE)';
        });
        overlay.style.display = 'flex';
        if (document.getElementById('collapsible-menu').classList.contains('expanded')) toggleMenu(true);
        document.getElementById('mainCommandBar').classList.add('collapsed');
        toggleQuickAddModal(false); closeCloneModal();
    } else { overlay.style.display = 'none'; }
}

function toggleMenu(forceClose = false) {
    const menu = document.getElementById('collapsible-menu');
    const btn = document.getElementById('menuBtn');
    if (forceClose || menu.classList.contains('expanded')) {
        menu.classList.remove('expanded'); menu.classList.add('collapsed'); btn.innerHTML = '<span class="menu-toggle-icon">&#9881;&#xFE0E;</span>';
    } else {
        menu.classList.remove('collapsed'); menu.classList.add('expanded'); btn.innerHTML = '<span class="menu-toggle-icon">✖</span>';
        document.getElementById('stsShortcutMenu').style.display = 'none'; closeCloneModal();
    }
}

function openCloneModal(row) {
    window.currentRowToClone = row; 
    document.getElementById('cloneTsInput').value = ''; 
    document.getElementById('cloneModal').style.display = 'flex';
    toggleMenu(true); toggleQuickAddModal(false); toggleHelp(false); document.getElementById('mainCommandBar').classList.add('collapsed');
    setTimeout(() => document.getElementById('cloneTsInput').focus(), 100);
}

function closeCloneModal() { 
    document.getElementById('cloneModal').style.display = 'none'; 
    window.currentRowToClone = null; 
}

function updatePhotoUI(row, cameraBtn, badgeContainer) {
    const images = JSON.parse(row.dataset.images || "[]");
    if (images.length === 0) {
        cameraBtn.innerHTML = '📷 PHOTO'; cameraBtn.style.backgroundColor = 'var(--border-color)'; cameraBtn.style.color = 'var(--text-color)'; badgeContainer.innerHTML = ''; 
    } else {
        cameraBtn.innerHTML = '➕ ADD'; cameraBtn.style.backgroundColor = 'var(--success)'; cameraBtn.style.color = '#fff';
        badgeContainer.innerHTML = `<div class="photo-status-badge" onclick="openGallery(this.closest('.defect-row'))">${images.length} ATTACHED (VIEW)</div>`;
    }
}

async function openGallery(row) {
    window.currentRowForGallery = row;
    const images = JSON.parse(row.dataset.images || "[]");
    const grid = document.getElementById('galleryGrid');
    grid.innerHTML = '<div style="text-align:center; padding:20px; color:var(--primary); font-weight:bold;">⏳ LOADING DB...</div>';
    document.getElementById('galleryModalOverlay').style.display = 'flex';

    grid.innerHTML = ''; 
    for(let i=0; i<images.length; i++) {
        const imgRef = images[i];
        let imgData = null;
        if (imgRef.id) { const dbImg = await getImageFromDB(imgRef.id); if(dbImg) imgData = dbImg.data; } 
        else if (imgRef.img) { imgData = imgRef.img; }
        
        if(imgData) {
            const item = document.createElement('div'); item.className = 'gallery-item';
            const img = document.createElement('img'); img.src = imgData;
            const delBtn = document.createElement('button'); delBtn.className = 'remove-img-btn'; delBtn.innerHTML = 'REMOVE PIC';
            delBtn.onclick = () => removeImageFromGallery(i);
            item.appendChild(img); item.appendChild(delBtn); grid.appendChild(item);
        }
    }
}

function removeImageFromGallery(indexToRemove) {
    if (!window.currentRowForGallery) return;
    let images = JSON.parse(window.currentRowForGallery.dataset.images || "[]");
    const imgToRemove = images[indexToRemove];
    if(imgToRemove && imgToRemove.id) deleteImageFromDB(imgToRemove.id); 
    images.splice(indexToRemove, 1); 
    window.currentRowForGallery.dataset.images = JSON.stringify(images); 
    const wrapper = window.currentRowForGallery.querySelector('.photo-wrapper');
    updatePhotoUI(window.currentRowForGallery, wrapper.querySelector('.camera-btn'), wrapper.querySelector('.status-badge-container'));
    checkSegmentData(window.currentRowForGallery.closest('.segment-card'));
    if (images.length === 0) closeGallery(); else openGallery(window.currentRowForGallery); 
}

function closeGallery() { document.getElementById('galleryModalOverlay').style.display = 'none'; window.currentRowForGallery = null; }

function changeTheme(themeName) { localStorage.setItem('appTheme', themeName); applySavedSettings(); }
function changeFontSize(sizeName) { localStorage.setItem('appFontSize', sizeName); applySavedSettings(); }

function searchTSFromPill() {
    const input = document.getElementById('pillSearchInput');
    const tsNumber = input.value.trim();
    if(tsNumber) { input.blur(); searchTS(tsNumber); input.value = ''; document.getElementById('mainCommandBar').classList.add('collapsed'); }
}

function searchTS(passedTs = null) {
    const tsNumber = passedTs; if (!tsNumber) return;
    const targetCard = document.querySelector(`.segment-card[data-segment="${tsNumber}"]`);
    if (targetCard) {
        window.isAutoScrolling = true; scrollToCard(targetCard);
        const targetMapItem = document.querySelector(`.map-item[data-map-segment="${tsNumber}"]`);
        if (targetMapItem) {
            const mapContainer = document.getElementById('miniMap');
            mapContainer.scrollTo({ top: mapContainer.scrollTop + (targetMapItem.getBoundingClientRect().top - mapContainer.getBoundingClientRect().top) - (mapContainer.getBoundingClientRect().height / 2) + (targetMapItem.getBoundingClientRect().height / 2), behavior: 'smooth' });
        }
        setTimeout(() => { targetCard.classList.add('search-highlight'); setTimeout(() => { targetCard.classList.remove('search-highlight'); }, 1200); }, 500);
        setTimeout(() => { window.isAutoScrolling = false; }, 800);
    } else { showSystemAlert(`Could not find TS-${tsNumber}.\nSub to sub section may have not been loaded.`, "TS MISSING", true); }
}

function toggleStsMenu(e) {
    if (e) e.stopPropagation();
    const menu = document.getElementById('stsShortcutMenu');
    if (menu.style.display === 'flex') { menu.style.display = 'none'; } 
    else { populateStsMenu(); menu.style.display = 'flex'; toggleMenu(true); toggleQuickAddModal(false); closeCloneModal(); }
}

function populateStsMenu() {
    const menu = document.getElementById('stsShortcutMenu'); menu.innerHTML = '';
    const cards = document.querySelectorAll('.segment-card');
    if (cards.length === 0) { menu.innerHTML = '<div style="padding:10px; color:var(--text-muted); font-size:var(--base-font);">NO SECTIONS LOADED</div>'; return; }
    const orderedRoutes = [];
    cards.forEach(card => {
        const key = card.getAttribute('data-route-key'); const name = card.getAttribute('data-route-name'); const color = card.getAttribute('data-color') || 'var(--primary)';
        if (!orderedRoutes.find(r => r.key === key)) orderedRoutes.push({ key, name, color });
    });
    orderedRoutes.forEach((route, index) => {
        const row = document.createElement('div'); row.style.display = 'flex'; row.style.alignItems = 'stretch'; row.style.background = 'var(--card-bg)'; row.style.border = '1px solid var(--border-color)'; row.style.marginBottom = '4px'; row.style.borderRadius = 'var(--border-radius)'; row.style.overflow = 'hidden';
        const btn = document.createElement('button'); btn.className = 'sts-menu-item'; btn.style.flex = '1'; btn.style.border = 'none'; btn.style.margin = '0'; btn.style.display = 'flex'; btn.style.alignItems = 'center';
        btn.innerHTML = `<span style="display:inline-block; width:12px; height:12px; border-radius:50%; background-color:${route.color}; margin-right:10px; flex-shrink:0; border:1px solid rgba(255,255,255,0.2);"></span><span style="color:var(--primary); margin-right:8px;">${index + 1}.</span><span>${route.name}</span>`;
        btn.onclick = () => jumpToRoute(route.key);
        const delBtn = document.createElement('button'); delBtn.style.background = 'transparent'; delBtn.style.border = 'none'; delBtn.style.borderLeft = '1px solid var(--border-color)'; delBtn.style.color = 'var(--text-muted)'; delBtn.style.width = '56px'; delBtn.style.cursor = 'pointer'; delBtn.style.display = 'flex'; delBtn.style.alignItems = 'center'; delBtn.style.justifyContent = 'center';
        delBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
        delBtn.onmousedown = () => { delBtn.style.color = 'var(--danger)'; delBtn.style.background = 'rgba(211,47,47,0.1)'; }; delBtn.onmouseup = () => { delBtn.style.color = 'var(--text-muted)'; delBtn.style.background = 'transparent'; }; delBtn.onmouseleave = () => { delBtn.style.color = 'var(--text-muted)'; delBtn.style.background = 'transparent'; };
        delBtn.onclick = (e) => removeRouteFromMenu(e, route.key, route.name);
        row.appendChild(btn); row.appendChild(delBtn); menu.appendChild(row);
    });
}

function jumpToRoute(routeKey) {
    window.isAutoScrolling = true; 
    const firstCard = document.querySelector(`.segment-card[data-route-key="${routeKey}"]`);
    if (firstCard) scrollToCard(firstCard);
    const firstMapItem = document.querySelector(`.map-item[data-route-key="${routeKey}"]`);
    if (firstMapItem) {
        const mapContainer = document.getElementById('miniMap');
        mapContainer.scrollTo({ top: mapContainer.scrollTop + (firstMapItem.getBoundingClientRect().top - mapContainer.getBoundingClientRect().top) - (mapContainer.getBoundingClientRect().height / 2) + (firstMapItem.getBoundingClientRect().height / 2), behavior: 'smooth' });
    }
    document.getElementById('stsShortcutMenu').style.display = 'none';
    setTimeout(() => { window.isAutoScrolling = false; }, 800); 
}

function openInitialQuickAdd() {
    const area = document.getElementById('general-area').value;
    const dir = document.getElementById('page-direction').value;
    if (!area || !dir) { showSystemAlert('Please select Line and Direction first.', 'MISSING INFO', true); return; }
    window.currentActiveArea = area; window.currentActiveDirection = dir; toggleQuickAddModal(true);
}

function openInsertModal(tsNumber, baseRouteKey) {
    window.currentInsertTargetTS = tsNumber; document.getElementById('insert-target-ts').textContent = tsNumber;
    updateInsertDropdown(baseRouteKey); document.getElementById('insertModal').style.display = 'flex';
    toggleMenu(true); toggleQuickAddModal(false); closeCloneModal(); document.getElementById('stsShortcutMenu').style.display = 'none'; document.getElementById('mainCommandBar').classList.add('collapsed');
}

function closeInsertModal() { document.getElementById('insertModal').style.display = 'none'; window.currentInsertTargetTS = null; }

function updateInsertDropdown(baseRouteKey) {
    const dropdown = document.getElementById('insert-route-select'); dropdown.innerHTML = '<option value="">AWAITING INPUT...</option>';
    if (window.currentActiveArea && window.currentActiveDirection && window.globalDatabase[window.currentActiveArea] && window.globalDatabase[window.currentActiveArea][window.currentActiveDirection]) {
        const routes = window.globalDatabase[window.currentActiveArea][window.currentActiveDirection]; let hasOptions = false;
        for (let key in routes) {
            const routeName = routes[key].name; const isSwitchOrPocket = key.includes('-X') || key.endsWith('-ST') || routeName.includes('Pocket') || routeName.includes('Cross') || routeName.includes('Spur');
            if (!window.loadedRoutes.has(key) && isSwitchOrPocket) { let opt = document.createElement('option'); opt.value = key; opt.textContent = routeName; dropdown.appendChild(opt); hasOptions = true; }
        }
        if (!hasOptions) dropdown.innerHTML = '<option value="">ALL SWITCHES LOADED</option>';
    } else { dropdown.innerHTML = '<option value="">NO AREA LOADED</option>'; }
}

function attachMapItemListeners(mapBtn, card, itemNum, routeKey) {
    mapBtn.onclick = () => { window.isAutoScrolling = true; scrollToCard(card); setTimeout(() => { window.isAutoScrolling = false; }, 800); };
    let pressTimer; const startPress = (e) => { if (e.type === 'mousedown' && e.button !== 0) return; pressTimer = setTimeout(() => openInsertModal(itemNum, routeKey), 600); }; const cancelPress = () => clearTimeout(pressTimer);
    mapBtn.addEventListener('touchstart', startPress, {passive: true}); mapBtn.addEventListener('touchend', cancelPress); mapBtn.addEventListener('touchmove', cancelPress); mapBtn.addEventListener('mousedown', startPress); mapBtn.addEventListener('mouseup', cancelPress); mapBtn.addEventListener('mouseleave', cancelPress); mapBtn.addEventListener('contextmenu', (e) => { e.preventDefault(); openInsertModal(itemNum, routeKey); });
}

function getLineColors(lineName) {
    const activeTheme = localStorage.getItem('appTheme') || 'tactical'; const isLightMode = !['tactical', 'macosdark'].includes(activeTheme);
    if (!lineName) return { bg: 'transparent', text: 'var(--text-color)', border: 'var(--border-color)' }; const name = lineName.toUpperCase();
    if (name.includes("AREA 1") || name.includes("EXPO")) return { bg: isLightMode ? '#ffc107' : '#3e3000', text: isLightMode ? '#000' : '#ffc107', border: '#ffc107' };
    if (name.includes("AREA 2") || name.includes("MILLENIUM") || name.includes("MILLENNIUM")) return { bg: isLightMode ? '#3399ff' : '#00254d', text: isLightMode ? '#fff' : '#3399ff', border: '#3399ff' };
    if (name.includes("AREA 3") || name.includes("EVERGREEN")) return { bg: isLightMode ? '#4caf50' : '#0f3316', text: isLightMode ? '#fff' : '#4caf50', border: '#4caf50' };
    return { bg: isLightMode ? '#e5e5e5' : '#222', text: isLightMode ? '#000' : '#aaa', border: '#555' };
}

function updateQuickAddChecklist() {
    const container = document.getElementById('quick-add-checklist'); container.innerHTML = '';
    if (window.currentActiveArea && window.currentActiveDirection && window.globalDatabase[window.currentActiveArea] && window.globalDatabase[window.currentActiveArea][window.currentActiveDirection]) {
        const routes = window.globalDatabase[window.currentActiveArea][window.currentActiveDirection]; let hasOptions = false;
        for (let routeKey in routes) {
            if (!window.loadedRoutes.has(routeKey)) {
                const label = document.createElement('label'); label.className = 'checkbox-item';
                const cb = document.createElement('input'); cb.type = 'checkbox'; cb.value = routeKey; cb.dataset.index = Object.keys(routes).indexOf(routeKey);
                label.appendChild(cb); label.appendChild(document.createTextNode(routes[routeKey].name)); container.appendChild(label); hasOptions = true;
            }
        }
        if (!hasOptions) { container.innerHTML = '<div style="color: var(--text-muted); text-align: center;">ALL SECTIONS LOADED</div>'; }
    } else { container.innerHTML = '<div style="color: var(--text-muted); text-align: center; font-style: italic;">AWAITING INPUT...</div>'; }
}

function toggleQuickAddModal(eventOrShow) {
    const modal = document.getElementById('quickAddModal'); let shouldShow;
    if (eventOrShow === true || eventOrShow === false) { shouldShow = eventOrShow; } else if (eventOrShow && typeof eventOrShow === 'object' && eventOrShow.stopPropagation) { eventOrShow.stopPropagation(); shouldShow = modal.style.display !== 'flex'; } else { shouldShow = modal.style.display !== 'flex'; }
    if (shouldShow) {
        const dirCode = window.currentActiveDirection === "Inbound Track" ? "IB" : "OB"; document.getElementById('quick-add-title').textContent = `${window.currentActiveArea} [${dirCode}]`;
        updateQuickAddChecklist(); modal.style.display = 'flex'; toggleMenu(true); document.getElementById('stsShortcutMenu').style.display = 'none'; toggleHelp(false); closeCloneModal();
    } else { modal.style.display = 'none'; }
}

function checkSegmentData(card) {
    if (!card) return;
    const segNum = card.getAttribute('data-segment'); let hasData = false;
    if (card.querySelector('.segment-notes').value.trim() !== '') hasData = true;
    card.querySelectorAll('.defect-row').forEach(row => {
        const images = JSON.parse(row.dataset.images || "[]"); const isCustom = row.dataset.isCustom === "true";
        const compVal = isCustom ? row.querySelector('.custom-comp').value : row.querySelector('.component-select').value;
        const defVal = isCustom ? row.querySelector('.custom-def').value : row.querySelector('.defect-select').value;
        if (compVal || defVal || images.length > 0) hasData = true;
    });
    const mapItem = document.querySelector(`.map-item[data-map-segment="${segNum}"]`);
    if (mapItem) { if (hasData) mapItem.classList.add('has-data'); else mapItem.classList.remove('has-data'); }
}

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const segNum = entry.target.getAttribute('data-segment'); const routeName = entry.target.getAttribute('data-route-name'); const areaName = entry.target.getAttribute('data-area-name');
            const routeDisplay = document.getElementById('active-route-display'); const areaDisplay = document.getElementById('active-area-display');
            routeDisplay.textContent = routeName ? routeName : 'AWAITING...';
            if (areaName) {
                areaDisplay.textContent = areaName; areaDisplay.style.display = 'inline-block';
                const colors = getLineColors(areaName); areaDisplay.style.backgroundColor = colors.bg; areaDisplay.style.color = colors.text; areaDisplay.style.borderColor = colors.border;
                document.getElementById('stsDropdownBtn').style.display = 'inline-flex';
            } else { areaDisplay.style.display = 'none'; document.getElementById('stsDropdownBtn').style.display = 'none'; }

            document.querySelectorAll('.map-item').forEach(item => item.classList.remove('active-map'));
            const activeMapItem = document.querySelector(`.map-item[data-map-segment="${segNum}"]`);
            if (activeMapItem) {
                activeMapItem.classList.add('active-map');
                if (!window.isAutoScrolling) {
                    const mapContainer = document.getElementById('miniMap');
                    mapContainer.scrollTo({ top: mapContainer.scrollTop + (activeMapItem.getBoundingClientRect().top - mapContainer.getBoundingClientRect().top) - (mapContainer.getBoundingClientRect().height / 2) + (activeMapItem.getBoundingClientRect().height / 2), behavior: 'smooth' });
                }
            }
        }
    });
}, { rootMargin: '-120px 0px -60% 0px' }); 

function scrollToCard(card) {
    const headerHeight = document.getElementById('stickyHeader').offsetHeight;
    const elementPosition = card.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: elementPosition - headerHeight - 15, behavior: "smooth" });
}

function createSegmentCard(segmentNum, routeKey, routeText, direction, color = 'var(--primary)', areaName = '') {
    const card = document.createElement('div');
    card.className = 'segment-card'; card.setAttribute('data-segment', segmentNum); card.setAttribute('data-route-key', routeKey); card.setAttribute('data-route-name', routeText); card.setAttribute('data-direction', direction); card.setAttribute('data-color', color); card.setAttribute('data-area-name', areaName); card.style.borderLeft = `4px solid ${color}`;
    const colors = getLineColors(areaName); const areaBadge = areaName ? `<span class="direction-badge" style="background-color: ${colors.bg}; color: ${colors.text}; border-color: ${colors.border};">${areaName}</span>` : '';
    card.innerHTML = `<div class="segment-header"><h3>TS-${segmentNum}</h3><div class="segment-header-badges">${areaBadge}<span class="direction-badge">${routeText}</span></div></div><textarea class="segment-notes" placeholder="INPUT SECTION LOG..."></textarea><div class="defect-list"></div><button class="add-defect-btn" onclick="addDefectRow(this.previousElementSibling, null, '${areaName}')">+ ADD DEFECT ROW</button>`;
    addDefectRow(card.querySelector('.defect-list'), null, areaName); return card;
}

function addDefectRow(container, prefill = null, areaName = '') {
    const row = document.createElement('div'); row.className = 'defect-row'; row.dataset.images = "[]"; row.dataset.isCustom = "false"; 
    const specificDefectMap = window.globalDefectMaps && window.globalDefectMaps[areaName] ? window.globalDefectMaps[areaName] : {};
    const compSelect = document.createElement('select'); compSelect.className = 'component-select';
    ['Select Component', ...Object.keys(specificDefectMap), 'CUSTOM ENTRY...'].forEach(c => { let opt = document.createElement('option'); opt.value = c === 'Select Component' ? '' : c; opt.textContent = c.toUpperCase(); compSelect.appendChild(opt); });
    const defSelect = document.createElement('select'); defSelect.className = 'defect-select'; defSelect.disabled = true; let defaultOpt = document.createElement('option'); defaultOpt.value = ''; defaultOpt.textContent = 'AWAITING COMPONENT'; defSelect.appendChild(defaultOpt);
    const customCompInput = document.createElement('input'); customCompInput.type = 'text'; customCompInput.placeholder = 'COMP NAME...'; customCompInput.className = 'custom-comp'; customCompInput.style.display = 'none';
    const customDefInput = document.createElement('input'); customDefInput.type = 'text'; customDefInput.placeholder = 'DEFECT TYPE...'; customDefInput.className = 'custom-def'; customDefInput.style.display = 'none';
    const revertBtn = document.createElement('button'); revertBtn.className = 'delete-btn revert-btn'; revertBtn.innerHTML = '↺'; revertBtn.style.display = 'none';
    revertBtn.onclick = function() { row.dataset.isCustom = "false"; compSelect.style.display = ''; defSelect.style.display = ''; customCompInput.style.display = 'none'; customDefInput.style.display = 'none'; revertBtn.style.display = 'none'; compSelect.value = ''; customCompInput.value = ''; customDefInput.value = ''; updateDefects(''); checkSegmentData(row.closest('.segment-card')); };

    function updateDefects(selectedComp, selectedDefect = '') {
        defSelect.innerHTML = '';
        if (selectedComp && specificDefectMap[selectedComp]) {
            defSelect.disabled = false; let defDefault = document.createElement('option'); defDefault.value = ''; defDefault.textContent = 'SELECT DEFECT'; defSelect.appendChild(defDefault);
            specificDefectMap[selectedComp].forEach(d => { let opt = document.createElement('option'); opt.value = d; opt.textContent = d.toUpperCase(); defSelect.appendChild(opt); });
            if (selectedDefect) defSelect.value = selectedDefect;
        } else { defSelect.disabled = true; let resetOpt = document.createElement('option'); resetOpt.value = ''; resetOpt.textContent = 'AWAITING COMPONENT'; defSelect.appendChild(resetOpt); }
    }

    compSelect.addEventListener('change', function() { 
        if (this.value === 'CUSTOM ENTRY...') { row.dataset.isCustom = "true"; compSelect.style.display = 'none'; defSelect.style.display = 'none'; customCompInput.style.display = 'block'; customDefInput.style.display = 'block'; revertBtn.style.display = 'flex'; customCompInput.focus(); } 
        else { updateDefects(this.value); } checkSegmentData(row.closest('.segment-card'));
    });
    customCompInput.addEventListener('input', () => checkSegmentData(row.closest('.segment-card'))); customDefInput.addEventListener('input', () => checkSegmentData(row.closest('.segment-card')));

    const photoWrapper = document.createElement('div'); photoWrapper.className = 'photo-wrapper';
    const fileInputId = 'photo-' + Math.random().toString(36).substr(2, 9);
    const fileInput = document.createElement('input'); fileInput.type = 'file'; fileInput.accept = 'image/*'; fileInput.capture = 'environment'; fileInput.className = 'file-input'; fileInput.id = fileInputId;
    const cameraLabel = document.createElement('label'); cameraLabel.htmlFor = fileInputId; cameraLabel.className = 'camera-btn'; cameraLabel.innerHTML = '📷 PHOTO';
    const badgeContainer = document.createElement('div'); badgeContainer.className = 'status-badge-container';
    const cloneBtn = document.createElement('button'); cloneBtn.className = 'clone-btn'; cloneBtn.innerHTML = '⇊'; cloneBtn.title = "Clone Defect to other Track Sections"; cloneBtn.onclick = function() { openCloneModal(row); };
    const delBtn = document.createElement('button'); delBtn.className = 'delete-btn'; delBtn.innerHTML = '✖'; delBtn.onclick = function() { const card = row.closest('.segment-card'); cleanUpRowImages(row); row.remove(); checkSegmentData(card); };

    // HIGH QUALITY IMAGE CAPTURE MODIFICATION
    fileInput.addEventListener('change', function(e) {
        if (this.files && this.files.length > 0) {
            const file = this.files[0]; cameraLabel.innerHTML = '⏳ LOAD...'; const reader = new FileReader();
            reader.onload = function(event) {
                const img = new Image();
                img.onload = function() {
                    const canvas = document.createElement('canvas'); 
                    // HDR / Native quality limits 
                    const MAX_WIDTH = 2400, MAX_HEIGHT = 2400; 
                    let width = img.width, height = img.height;
                    
                    if (width > height) { if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; } } 
                    else { if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; } }
                    
                    canvas.width = width; canvas.height = height; 
                    const ctx = canvas.getContext('2d', { alpha: false }); 
                    ctx.fillStyle = "#FFFFFF"; ctx.fillRect(0, 0, width, height); 
                    ctx.drawImage(img, 0, 0, width, height);
                    
                    // Increased JPEG quality to 95%
                    saveImageToDB(canvas.toDataURL('image/jpeg', 0.95), width, height).then(imgRef => {
                        const currentImages = JSON.parse(row.dataset.images || "[]"); currentImages.push(imgRef); row.dataset.images = JSON.stringify(currentImages); updatePhotoUI(row, cameraLabel, badgeContainer); checkSegmentData(row.closest('.segment-card'));
                        canvas.width = 0; canvas.height = 0; img.src = ''; fileInput.value = ''; 
                    }).catch(err => {
                        cameraLabel.innerHTML = '📷 PHOTO'; console.error(err); showSystemAlert("Failed to save image. Device storage may be full.", "DATABASE ERROR", true);
                    });
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        } else { fileInput.value = ''; }
    });

    photoWrapper.appendChild(cameraLabel); photoWrapper.appendChild(fileInput); photoWrapper.appendChild(badgeContainer); photoWrapper.appendChild(cloneBtn); photoWrapper.appendChild(delBtn); 
    row.appendChild(compSelect); row.appendChild(defSelect); row.appendChild(customCompInput); row.appendChild(customDefInput); row.appendChild(revertBtn); row.appendChild(photoWrapper); container.appendChild(row);

    if (prefill) {
        if (prefill.isCustom || (prefill.comp && prefill.comp !== '' && !specificDefectMap[prefill.comp])) {
            row.dataset.isCustom = "true"; compSelect.style.display = 'none'; defSelect.style.display = 'none'; customCompInput.style.display = 'block'; customDefInput.style.display = 'block'; revertBtn.style.display = 'flex'; customCompInput.value = prefill.comp || ''; customDefInput.value = prefill.def || '';
        } else if (prefill.comp) { compSelect.value = prefill.comp; updateDefects(prefill.comp, prefill.def); }
        if (prefill.images && prefill.images.length > 0) { row.dataset.images = JSON.stringify(prefill.images); updatePhotoUI(row, cameraLabel, badgeContainer); }
    }
}
