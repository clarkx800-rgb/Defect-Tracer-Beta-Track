window.globalDatabase = window.globalDatabase || {};
window.globalDefectMaps = window.globalDefectMaps || {};

window.globalDatabase["Millenium Line"] = {
    "Inbound Track": {
        "SAZ-BDZ-IB": {
            name: "SAZ-BDZ-IB",
            segments: [ { start: 4639, end: 4712, color: "#DB532D" } ]
        },
        "HYBRID-EXAMPLE": {
            name: "MIXED NUMBERS AND TEXT",
            segments: [ 
                { start: 4710, end: 4712, color: "#4caf50" }, // Normal Math Loop
                { points: ["SPECIAL-BRIDGE"], color: "#ffb300" }, // Text Point
                { start: 4713, end: 4715, color: "#4caf50" } // Back to Math Loop
            ]
        }
    },
    "Outbound Track": {
        "Work-In-Progress-OB": {
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
