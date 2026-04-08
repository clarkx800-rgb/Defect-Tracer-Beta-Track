window.globalDatabase = window.globalDatabase || {};
window.globalDefectMaps = window.globalDefectMaps || {};

window.globalDatabase["Millenium Line"] = {
    "Inbound Track": {
        "DEMO-AREA2-IB": {
            name: "Demo Area 2 - Inbound",
            segments: [ { start: 0, end: 5, color: "#9c27b0" } ]
        }
    },
    "Outbound Track": {
        "DEMO-AREA2-OB": {
            name: "Demo Area 2 - Outbound",
            segments: [ { start: 10, end: 15, color: "#e91e63" } ]
        }
    }
};

window.globalDefectMaps["Millenium Line"] = {
    'Millennium Fastener': ['Loose', 'Missing', 'Rusted'],
    'Millennium Power Rail': ['Arc Burns', 'Steel Cap Wear']
    // Add all MILLENNIUM specific parts here...
};
