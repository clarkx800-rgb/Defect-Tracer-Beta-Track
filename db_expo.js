window.globalDatabase = window.globalDatabase || {};
window.globalDefectMaps = window.globalDefectMaps || {};

window.globalDatabase["Expo Line"] = {
    "Inbound Track": {
        "KGT-KGZ-IB": { 
            name: "KGT-KGZ-IB", 
            segments: [
                { start: 4366, end: 4366, color: "#007bff" },
                { start: 4370, end: 4370, color: "#007bff" }
                // ... Add the rest of your Expo Inbound here
            ]
        }
    },
    "Outbound Track": {
        "WFT-WFZ-OB": { 
            name: "WFT-WFZ-OB", 
            segments: [
                { start: 1130, end: 1099, color: "#6E4B00" }
                // ... Add the rest of your Expo Outbound here
            ] 
        }
    }
};

window.globalDefectMaps["Expo Line"] = {
    'Expo Running Rail': ['Broken', 'Wear', 'Corrugation', 'Spall'],
    'Expo Rail Pad': ['Missing Pandrol', 'Broken Pad Washer', 'Shims out'],
    'Expo Lim Rail': ['Black Marks', 'Broken Cap Bolt(s)', 'Broken Studs']
    // Add all EXPO specific parts here...
};
