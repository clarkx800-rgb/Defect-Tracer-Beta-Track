// ==========================================
// --- REPLACE YOUR CURRENT PDF EXPORT FUNCTION AT THE END OF data_engine.js ---
// ==========================================

async function generatePDFBlob(job, imgs) {
    const { jsPDF } = window.jspdf;
    
    // Auto-orient the very first page based on the first image's actual dimensions
    let firstImgW = imgs[0].w || 1200; 
    let firstImgH = imgs[0].h || 1200; 
    let firstOrientation = (firstImgW > firstImgH) ? 'landscape' : 'portrait';
    
    const doc = new jsPDF({ orientation: firstOrientation, unit: 'mm', format: 'a4' });
    const todayDate = new Date().toLocaleDateString();

    for(let i=0; i<imgs.length; i++) {
        const imgObj = imgs[i]; 
        let imgW = imgObj.w || 1200; 
        let imgH = imgObj.h || 1200; 
        
        let orientation = (imgW > imgH) ? 'landscape' : 'portrait';
        if (i > 0) doc.addPage('a4', orientation);

        // 1. PAGE & MARGIN MATH
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 5; // Narrow 5mm margin from the edge
        const boxWidth = pageWidth - (margin * 2);
        const boxHeight = pageHeight - (margin * 2);
        const cornerRadius = 4; // Modern, smooth rounded corners

        // 2. "OBJECT-FIT: COVER" MATH (Ensures no stretching)
        const imgRatio = imgW / imgH;
        const boxRatio = boxWidth / boxHeight;

        let renderWidth = boxWidth;
        let renderHeight = boxHeight;
        let xOffset = margin;
        let yOffset = margin;

        if (imgRatio > boxRatio) {
            // Photo is wider than the container. Scale to height, center horizontally.
            renderHeight = boxHeight;
            renderWidth = renderHeight * imgRatio;
            xOffset = margin - ((renderWidth - boxWidth) / 2);
        } else {
            // Photo is taller than the container. Scale to width, center vertically.
            renderWidth = boxWidth;
            renderHeight = renderWidth / imgRatio;
            yOffset = margin - ((renderHeight - boxHeight) / 2);
        }

        // 3. DRAW CLIPPED, ROUNDED IMAGE (No visible border)
        doc.saveGraphicsState(); 
        
        // Define the clipping path (the rounded rectangle boundary)
        doc.roundedRect(margin, margin, boxWidth, boxHeight, cornerRadius, cornerRadius, null);
        doc.clip(); // Activate clipping: everything drawn now is contained inside this path
        
        // Draw the full canvas picture (it dynamically scales, centers, and fills the box)
        doc.addImage(imgObj.data, 'JPEG', xOffset, yOffset, renderWidth, renderHeight);
        
        doc.restoreGraphicsState(); // Reset state: removes clipping so text can be drawn on top

        // 4. THE "MODERN WATERMARK" SHIELD
        const overlayHeight = 28; // The contrasting pill height
        const overlayX = margin + 5; 
        const overlayY = pageHeight - margin - overlayHeight - 5; // Anchored to the bottom
        const overlayWidth = boxWidth - 10; 

        // Set up the semi-transparent black background ("watermark magic")
        doc.setFillColor(20, 20, 20); // Dark grey/black
        doc.setDrawColor(20, 20, 20); // Match invisible border
        doc.setGState(new doc.GState({opacity: 0.70})); // 70% opacity shield
        
        // Draw the shield with lightly rounded inner corners
        doc.roundedRect(overlayX, overlayY, overlayWidth, overlayHeight, 2, 2, 'F'); 

        // 5. DRAW CRISP, READABLE DETAILS
        doc.setGState(new doc.GState({opacity: 1.0})); // Reset to 100% opacity for sharp text
        doc.setTextColor(255, 255, 255); // Pure white text

        // Fallbacks (|| 'N/A') used from your original context
        const safeComp = job.comp || 'N/A'; 
        const safeDef = job.def || 'N/A';
        const cleanLineName = job.lineName ? job.lineName.toString().replace(/ Line/i, '').trim().toUpperCase() : '';
        const safeRoute = job.routeName || 'UNKNOWN ROUTE';

        // Title Row: Defect & Component (Bold)
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text(`${job.tsId} | ${safeDef} - ${safeComp}`, overlayX + 5, overlayY + 8);

        // Location Row (Normal weight)
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text(`Location: ${safeRoute} ${cleanLineName ? '- ' + cleanLineName : ''}`, overlayX + 5, overlayY + 16);
        
        // Data & Page Number Row (Right-aligned page)
        doc.text(`Date taken: ${todayDate}`, overlayX + 5, overlayY + 24);
        
        const rightAlignX = overlayX + overlayWidth - 5; 
        doc.setFont("helvetica", "bold"); doc.setFontSize(9);
        doc.text(`PAGE ${i + 1} OF ${imgs.length}`, rightAlignX, overlayY + 24, { align: "right" });
        
        if (i % 2 === 0) await delay(16); // Small delay for system breathing room
    }
    return doc.output('blob');
}
