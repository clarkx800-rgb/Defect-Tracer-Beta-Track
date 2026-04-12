window.globalDatabase = window.globalDatabase || {};
window.globalDefectMaps = window.globalDefectMaps || {};

window.globalDatabase["Millennium Line"] = {
    "Inbound Track": {
        "SAZ-BDZ-IB": {
            name: "SAZ-BDZ-IB",
            segments: [ { start: 4639, end: 4712, color: "#DB532D" } ]
        },
       "BDZ-PWZ-IB": {
            name: "EAM-BDZ-LHZ-IB",
            icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d32f2f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:5px; vertical-align:middle;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
            segments: [ 
                { start: 4710, end: 4712, color: "#4caf50" }, // Normal Math Loop
                { points: ["FOR EAM ONLY"], color: "#ffb300" }, // Text Point
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

window.globalDefectMaps["Millennium Line"] = {
    'Millennium Fastener': ['Loose', 'Missing', 'Rusted'],
    'Millennium Power Rail': ['Arc Burns', 'Steel Cap Wear']
    // Add all MILLENNIUM specific parts here...
};
