// ==========================================
// DATA ENGINE: IndexedDB, Exports, Save/Load
// ==========================================

const dbName = "TracerImageDB";
let imageDB;

const initDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);
        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains('images')) db.createObjectStore('images', { keyPath: 'id' });
        };
        request.onsuccess = (e) => { imageDB = e.target.result; resolve(imageDB); };
        request.onerror = (e) => reject(e.target.error);
    });
};
initDB().catch(err => console.error("IndexedDB Init Failed:", err));

const saveImageToDB = (base64Data, w, h) => {
    return new Promise((resolve, reject) => {
        if(!imageDB) return reject("DB offline");
        const id = 'img_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
        const transaction = imageDB.transaction(['images'], 'readwrite');
        const store = transaction.objectStore('images');
        const record = { id: id, data: base64Data, w: w, h: h };
        store.add(record);
        transaction.oncomplete = () => resolve({ id: id, w: w, h: h });
        transaction.onerror = (e) => reject(e.target.error);
    });
};

const getImageFromDB = (id) => {
    return new Promise((resolve, reject) => {
        if(!imageDB) return resolve(null);
        const transaction = imageDB.transaction(['images'], 'readonly');
        const store = transaction.objectStore('images');
        const request = store.get(id);
        request.onsuccess = (e) => resolve(e.target.result);
        request.onerror = (e) => reject(e.target.error);
    });
};

const deleteImageFromDB = (id) => {
    if(!imageDB) return;
    const transaction = imageDB.transaction(['images'], 'readwrite');
    transaction.objectStore('images').delete(id);
};

function cleanUpRowImages(row) {
    if(!row) return;
    const images = JSON.parse(row.dataset.images || "[]");
    images.forEach(img => { if (img.id) deleteImageFromDB(img.id); });
}

// EXPORT ENGINE
async function exportData() {
    if (typeof ExcelJS === 'undefined' || typeof window.jspdf === 'undefined') {
        showSystemAlert("Libraries offline. Requires network connection for initial boot.", "EXPORT ERROR", true);
        return;
    }

    const cards = document.querySelectorAll('.segment-card');
    if (cards.length === 0) { showSystemAlert('No data available to export.', 'EXPORT FAILED'); return; }

    let requiresFolder = false;
    document.querySelectorAll('.defect-row').forEach(row => {
        if (JSON.parse(row.dataset.images || "[]").length > 0) requiresFolder = true;
    });

    const date = new Date().toISOString().split('T')[0];
    const excelFilename = `DEFECT_REPORT_${date}.xlsx`;
    let dirHandle = null;
    let singleFileHandle = null;

    try {
        if (requiresFolder && window.showDirectoryPicker) {
            dirHandle = await window.showDirectoryPicker({ mode: 'readwrite' });
        } else if (!requiresFolder && window.showSaveFilePicker) {
            singleFileHandle = await window.showSaveFilePicker({
                suggestedName: excelFilename,
                types: [{ description: 'Excel File', accept: {'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']} }],
            });
        }
    } catch (err) {
        if (err.name !== 'AbortError') {
            console.error(err);
            showSystemAlert('Folder/File selection failed.', 'EXPORT ERROR', true);
        }
        return; 
    }

    try {
        await updateProgress(5, "INITIALIZING EXCEL...", "EXPORTING DATA");
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Defects Report');
        
        worksheet.columns = [
            { header: 'Line / Area', key: 'line', width: 18 },
            { header: 'Route', key: 'route', width: 22 },
            { header: 'TS', key: 'segment', width: 15 },
            { header: 'Notes', key: 'notes', width: 35 },
            { header: 'Component', key: 'component', width: 20 },
            { header: 'Defect', key: 'defect', width: 20 }
        ];
        worksheet.getRow(1).font = { bold: true };

        let pdfJobs = [];
        let hasDataRows = false;
        let total = cards.length;

        for(let i=0; i<total; i++) {
            const card = cards[i];
            const segmentNum = card.getAttribute('data-segment');
            const tsId = `TS-${segmentNum}`;
            const routeName = card.getAttribute('data-route-name');
            const areaName = card.getAttribute('data-area-name') || '';
            const notes = card.querySelector('.segment-notes').value;
            const rows = card.querySelectorAll('.defect-row');
            
            await updateProgress(5 + Math.round((i/total)*25), `SCRAPING TS-${segmentNum}...`, "EXPORTING DATA");

            let hasDefects = false;

            rows.forEach((row, index) => {
                const isCustom = row.dataset.isCustom === "true";
                const comp = isCustom ? row.querySelector('.custom-comp').value : row.querySelector('.component-select').value;
                const def = isCustom ? row.querySelector('.custom-def').value : row.querySelector('.defect-select').value;
                const refs = JSON.parse(row.dataset.images || "[]");
                
                if (comp || def || refs.length > 0) {
                    hasDefects = true;
                    hasDataRows = true;
                    worksheet.addRow({ line: areaName, route: routeName, segment: tsId, notes: notes, component: comp, defect: def });
                }

                if (refs.length > 0) {
                    pdfJobs.push({
                        lineName: areaName, routeName: routeName, tsId: tsId, notes: notes, comp: comp || "N/A", def: def || "N/A",
                        refs: refs, defectID: index + 1
                    });
                }
            });

            if (!hasDefects && notes.trim() !== '') {
                hasDataRows = true;
                worksheet.addRow({ line: areaName, route: routeName, segment: tsId, notes: notes, component: '', defect: '' });
            }
            if (i % 5 === 0) await delay(16); 
        }

        if (!hasDataRows) {
            closeProgress();
            showSystemAlert("No filled track sections found to export to Excel.", "EXPORT NOTICE");
            return;
        }

        await updateProgress(35, "GENERATING EXCEL BLOB...", "EXPORTING DATA");
        const buffer = await workbook.xlsx.writeBuffer();
        const excelBlob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        
        const totalSteps = pdfJobs.length + 1;

        if (dirHandle) {
            await updateProgress(42, "SAVING EXCEL REPORT...", "GENERATING EXPORT");
            const excelFileHandle = await dirHandle.getFileHandle(excelFilename, { create: true });
            const excelWritable = await excelFileHandle.createWritable();
            await excelWritable.write(excelBlob);
            await excelWritable.close();

            for (let j = 0; j < pdfJobs.length; j++) {
                const job = pdfJobs[j];
                await updateProgress(42 + Math.round(((j+0.5) / totalSteps) * 58), `BUILDING PDF ${j+1}/${pdfJobs.length} [${job.tsId}]...`, "GENERATING EXPORT");
                
                const imgs = [];
                for(let r of job.refs) { 
                    if (r.id) {
                        const d = await getImageFromDB(r.id); 
                        if(d && d.data) imgs.push(d); 
                    } else if (r.img) { 
                        imgs.push({ data: r.img, w: r.w || 1200, h: r.h || 1200 }); 
                    }
                }
                
                if (imgs.length === 0) continue;

                const pdfBlob = await generatePDFBlob(job, imgs);
                const cleanComp = job.comp ? job.comp.toString().replace(/[^a-z0-9]/gi, '_') : 'UNKNOWN';
                const pdfFilename = `${job.tsId}_${cleanComp}_DEFECT.pdf`;
                
                const pdfFileHandle = await dirHandle.getFileHandle(pdfFilename, { create: true });
                const pdfWritable = await pdfFileHandle.createWritable();
                await pdfWritable.write(pdfBlob);
                await pdfWritable.close();
                await delay(16);
            }
            
            await updateProgress(100, "ALL FILES EXPORTED!", "GENERATING EXPORT");
            setTimeout(() => { closeProgress(); showSystemAlert("All files successfully saved to the selected folder.", "EXPORT COMPLETE"); }, 1000);
        } else if (singleFileHandle) {
            const writable = await singleFileHandle.createWritable();
            await writable.write(excelBlob);
            await writable.close();
            await updateProgress(100, "EXCEL REPORT SAVED!", "GENERATING EXPORT");
            setTimeout(() => { closeProgress(); showSystemAlert("Excel report saved successfully.", "EXPORT COMPLETE"); }, 1000);
        } else {
            fallbackDownload(excelBlob, excelFilename, pdfJobs, totalSteps);
        }

    } catch (error) {
        console.error("Export Crash:", error);
        closeProgress();
        showSystemAlert("Export failed: " + error.message, "CRITICAL ERROR", true);
    }
}

async function fallbackDownload(excelBlob, excelFilename, pdfJobs, totalSteps) {
    await updateProgress(45, "TRIGGERING EXCEL DOWNLOAD...", "GENERATING EXPORT");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(excelBlob);
    link.download = excelFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (pdfJobs.length > 0) {
        await delay(800); 
        for (let j = 0; j < pdfJobs.length; j++) { 
            const job = pdfJobs[j];
            await updateProgress(45 + Math.round(((j+0.5) / totalSteps) * 55), `BUILDING PDF ${j+1}/${pdfJobs.length} [${job.tsId}]...`, "GENERATING EXPORT");
            
            const imgs = [];
            for(let r of job.refs) { 
                if (r.id) { const d = await getImageFromDB(r.id); if(d && d.data) imgs.push(d); }
                else if (r.img) { imgs.push({ data: r.img, w: r.w || 1200, h: r.h || 1200 }); }
            }
            
            if (imgs.length === 0) continue;

            const pdfBlob = await generatePDFBlob(job, imgs);
            const cleanComp = job.comp ? job.comp.toString().replace(/[^a-z0-9]/gi, '_') : 'UNKNOWN';
            const pdfFilename = `${job.tsId}_${cleanComp}_DEFECT.pdf`;
            
            const pdflink = document.createElement("a");
            pdflink.href = URL.createObjectURL(pdfBlob);
            pdflink.download = pdfFilename;
            document.body.appendChild(pdflink);
            pdflink.click();
            document.body.removeChild(pdflink);
            await delay(800); 
        }
    }
    await updateProgress(100, "ALL FILES EXPORTED!", "GENERATING EXPORT");
    setTimeout(() => { closeProgress(); showSystemAlert("Files downloaded to your device Downloads folder.", "EXPORT COMPLETE"); }, 1000);
}

async function generatePDFBlob(job, imgs) {
    const { jsPDF } = window.jspdf;
    let firstOrientation = (imgs[0].w > imgs[0].h) ? 'landscape' : 'portrait';
    const doc = new jsPDF({ orientation: firstOrientation, unit: 'mm', format: 'a4' });
    
    const activeTheme = localStorage.getItem('appTheme') || 'tactical';
    const todayDate = new Date().toLocaleDateString();

    for(let i=0; i<imgs.length; i++) {
        const imgObj = imgs[i];
        let orientation = (imgObj.w > imgObj.h) ? 'landscape' : 'portrait';
        if (i > 0) doc.addPage('a4', orientation);

        const pageWidth = orientation === 'landscape' ? 297 : 210;
        const pageHeight = orientation === 'landscape' ? 210 : 297;
        const margin = 10;
        const borderW = pageWidth - (margin * 2);
        const borderH = pageHeight - (margin * 2);

        if (activeTheme === 'windows11') {
            doc.setDrawColor(0, 120, 212); doc.setLineWidth(0.5); doc.roundedRect(margin, margin, borderW, borderH, 3, 3, 'S');
        } else if (activeTheme === 'pokemongo') {
            doc.setDrawColor(227, 53, 13); doc.setLineWidth(1.0); doc.roundedRect(margin, margin, borderW, borderH, 5, 5, 'S');
            doc.setDrawColor(40, 172, 168); doc.setLineWidth(0.3); doc.roundedRect(margin + 1, margin + 1, borderW - 2, borderH - 2, 4, 4, 'S');
        } else if (activeTheme === 'macosdark') {
            doc.setDrawColor(80, 80, 80); doc.setLineWidth(0.5); doc.roundedRect(margin, margin, borderW, borderH, 4, 4, 'S');
        } else {
            doc.setDrawColor(30, 30, 30); doc.setLineWidth(1.0); doc.rect(margin, margin, borderW, borderH, 'S'); doc.setLineWidth(0.3); doc.rect(margin + 1.5, margin + 1.5, borderW - 3, borderH - 3, 'S');
        }

        const footerHeight = 22; const safeZoneX = margin + 2; const safeZoneY = margin + 2; const safeZoneW = borderW - 4; const safeZoneH = borderH - footerHeight - 4; 
        const imgRatio = imgObj.w / imgObj.h; const safeRatio = safeZoneW / safeZoneH;
        
        let finalW, finalH, finalX, finalY;
        if (imgRatio > safeRatio) { finalW = safeZoneW; finalH = safeZoneW / imgRatio; } else { finalH = safeZoneH; finalW = safeZoneH * imgRatio; }
        
        finalX = safeZoneX + ((safeZoneW - finalW) / 2); finalY = safeZoneY + ((safeZoneH - finalH) / 2);

        doc.addImage(imgObj.data, 'JPEG', finalX, finalY, finalW, finalH);

        doc.setDrawColor(200, 200, 200); doc.setLineWidth(0.3); doc.line(margin, pageHeight - margin - footerHeight, pageWidth - margin, pageHeight - margin - footerHeight);

        const textStartX = margin + 4; let textStartY = pageHeight - margin - 14; 
        
        doc.setTextColor(0, 0, 0); doc.setFont("helvetica", "bold"); doc.setFontSize(11);
        
        const safeComp = job.comp || 'N/A';
        const safeDef = job.def || 'N/A';
        doc.text(`${job.tsId} | ${safeDef}  ${safeComp}`, textStartX, textStartY);
        
        textStartY += 5; doc.setFont("helvetica", "normal"); doc.setFontSize(10);
        const cleanLineName = job.lineName ? job.lineName.toString().replace(/ Line/i, '').trim().toUpperCase() : '';
        const safeRoute = job.routeName || 'UNKNOWN ROUTE';
        doc.text(`Location: ${safeRoute} - ${cleanLineName}`, textStartX, textStartY);
        
        textStartY += 5; doc.text(`Date taken: ${todayDate}`, textStartX, textStartY);

        const rightAlignX = pageWidth - margin - 4; doc.setFont("helvetica", "bold"); doc.setFontSize(9);
        doc.text(`PAGE ${i + 1} OF ${imgs.length}`, rightAlignX, textStartY, { align: "right" });
        
        if (i % 2 === 0) await delay(16); 
    }

    return doc.output('blob');
}

async function saveProject() {
    const cards = document.querySelectorAll('.segment-card');
    if (cards.length === 0) { showSystemAlert('No data available to save.', 'SAVE FAILED', true); return; }

    let exportName = currentFileName || `TRACK_DATA_${new Date().toISOString().split('T')[0]}.json`;
    let fileHandle = null;

    if (window.showSaveFilePicker) {
        try {
            fileHandle = await window.showSaveFilePicker({
                suggestedName: exportName,
                types: [{ description: 'JSON File', accept: {'application/json': ['.json']} }],
            });
        } catch (err) {
            if (err.name !== 'AbortError') {
                console.error(err);
                showSystemAlert('File selection failed.', 'SAVE ERROR', true);
            }
            return; 
        }
    }

    await updateProgress(10, "PACKAGING TRACK DATA...", "SAVING DATA");
    const projectData = [];
    
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        await updateProgress(10 + Math.round((i / cards.length) * 50), `PACKAGING TS-${card.getAttribute('data-segment')}...`, "SAVING DATA");
        
        const segData = {
            segmentNum: card.getAttribute('data-segment'),
            routeKey: card.getAttribute('data-route-key'),
            routeName: card.getAttribute('data-route-name'),
            direction: card.getAttribute('data-direction'),
            color: card.getAttribute('data-color'),
            areaName: card.getAttribute('data-area-name'), 
            notes: card.querySelector('.segment-notes').value,
            defects: []
        };

        const rows = card.querySelectorAll('.defect-row');
        for(let row of rows) {
            const isCustom = row.dataset.isCustom === "true";
            const imgRefs = JSON.parse(row.dataset.images || "[]");
            const fullImgs = [];
            for(let ref of imgRefs) {
                if(ref.id) {
                    const dbImg = await getImageFromDB(ref.id);
                    if(dbImg) fullImgs.push({ data: dbImg.data, w: dbImg.w, h: dbImg.h });
                } else if(ref.img) {
                    fullImgs.push({ data: ref.img, w: ref.w, h: ref.h }); 
                }
            }
            segData.defects.push({
                isCustom: isCustom,
                comp: isCustom ? row.querySelector('.custom-comp').value : row.querySelector('.component-select').value,
                def: isCustom ? row.querySelector('.custom-def').value : row.querySelector('.defect-select').value,
                images: fullImgs 
            });
        }
        projectData.push(segData);
    }

    await updateProgress(75, "WRITING JSON FILE...", "SAVING DATA");
    const dataStr = JSON.stringify(projectData, null, 2);

    try {
        if (fileHandle) {
            await updateProgress(90, "FINALIZING WRITE...", "SAVING DATA");
            const writable = await fileHandle.createWritable();
            await writable.write(dataStr);
            await writable.close();
            currentFileName = fileHandle.name;
            await updateProgress(100, "SAVE COMPLETE!", "SAVING DATA");
            setTimeout(() => { closeProgress(); showSystemAlert('Data saved successfully to selected location.', 'SAVE COMPLETE'); }, 1000);
        } else {
            const blob = new Blob([dataStr], { type: 'application/json' });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = exportName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            await updateProgress(100, "SAVE COMPLETE!", "SAVING DATA");
            setTimeout(() => { closeProgress(); showSystemAlert('Data downloaded to your device Downloads folder.', 'SAVE COMPLETE'); }, 1000);
        }
    } catch (err) {
        closeProgress();
        console.error(err);
        showSystemAlert('Failed to write file.', 'SAVE ERROR', true);
    }
    toggleMenu(true);
    document.getElementById('mainCommandBar').classList.add('collapsed');
}

function loadProject(event) {
    const fileInput = event.target;
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async function(e) {
        try {
            const projectData = JSON.parse(e.target.result);
            await injectProjectData(projectData, file.name);
        } catch (err) {
            closeProgress();
            showSystemAlert('Corrupt or invalid JSON file.', 'SYSTEM ERROR', true);
            console.error(err);
        }
        fileInput.value = ''; 
    };
    
    reader.onerror = function() {
        showSystemAlert('Could not read file from device.', 'FILE ERROR', true);
        fileInput.value = ''; 
    };

    reader.readAsText(file);
}

async function injectProjectData(projectData, fileName) {
    try {
        if (!Array.isArray(projectData)) throw new Error("Invalid format");
        await updateProgress(10, "UNPACKING STRUCTURE...", "LOADING DATA");

        const container = document.getElementById('segments-container');
        const mapContainer = document.getElementById('miniMap');
        container.innerHTML = '';
        mapContainer.innerHTML = '';
        
        loadedRoutes.clear(); 
        routeLoadHistory = [];
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
                                const ref = await saveImageToDB(imgData.img, imgData.w, imgData.h);
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

            if (activeKey && !loadedRoutes.has(activeKey)) {
                loadedRoutes.add(activeKey);
                routeLoadHistory.push([activeKey]);
            }
            currentActiveArea = safeAreaName;
            currentActiveDirection = segData.direction;
        }

        if (loadedRoutes.size > 0) document.getElementById('quickAddGroup').style.display = 'flex';

        await updateProgress(100, "SYSTEM READY", "LOAD COMPLETE");
        setTimeout(() => {
            closeProgress();
            currentFileName = fileName;
            showSystemAlert('Data imported successfully.', 'DATA LOADED');
            toggleMenu(true);
            updateCommandBar();
            document.getElementById('mainCommandBar').classList.add('collapsed');
            toggleEmptyState();
        }, 800);

    } catch (err) {
        closeProgress();
        showSystemAlert('Corrupt or invalid JSON data.', 'SYSTEM ERROR', true);
        console.error(err);
    }
}
