window.globalDatabase = window.globalDatabase || {};
window.globalDefectMaps = window.globalDefectMaps || {};

window.globalDatabase["Evergreen Line"] = {
    "Inbound Track": {
        "DEMO-AREA3-IB": {
            name: "Demo Area 3 - Inbound",
            segments: [ { start: 0, end: 5, color: "#4caf50" } ]
        }
    },
    "Outbound Track": {
        "DEMO-AREA3-OB": {
            name: "Demo Area 3 - Outbound",
            segments: [ { start: 10, end: 15, color: "#4caf50" } ]
        }
    }
};

window.globalDefectMaps["Evergreen Line"] = {
    'Evergreen Concrete Slab': ['Cracked', 'Spalling', 'Water Ingress'],
    'Evergreen Switch Motor': ['Faulty', 'Jammed', 'Needs Lube']
    // Add all EVERGREEN specific parts here...
};
