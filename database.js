const globalDatabase = {
    "Expo Line": {
        "Inbound Track": {
            "KGT-KGZ-IB": { 
                name: "KGT-KGZ-IB", 
                segments: [
                    { start: 4366, end: 4366, color: "#007bff" },
                    { start: 4370, end: 4370, color: "#007bff" },
                    { start: 4377, end: 4377, color: "#007bff" },
                    { start: 4381, end: 4381, color: "#007bff" },
                    { start: 4385, end: 4385, color: "#007bff" },
                    { start: 4390, end: 4390, color: "#007bff" },
                    { start: 4395, end: 4395, color: "#007bff" }
                ]
            },
            "KGZ-GWZ-IB": {
                name: "KGZ-GWZ-IB", 
                segments: [
                    { start: 4400, end: 4400, color: "#fd7e14" },
                    { start: 4405, end: 4405, color: "#fd7e14" },
                    { start: 4408, end: 4408, color: "#fd7e14" },
                    { start: 4012, end: 4089, color: "#fd7e14" }
                ]
            }
        },
        "Outbound Track": {
            "WFT-WFZ-OB": { 
                name: "WFT-WFZ-OB", 
                segments: [
                    { start: 1130, end: 1099, color: "#6E4B00" },
                ] 
            },
            "WFT-WFZ-OB-X1": { 
                name: "WFT-WFZ-OB | Cross DC02-01", 
                segments: [
                    { start: 1183, end: 1186, color: "#006E54" },
                ] 
            }
        }
    },
    "Millenium Line": {
        "Inbound Track": {
            "DEMO-AREA2-IB": {
                name: "Demo Area 2 - Inbound",
                segments: [
                    { start: 0, end: 5, color: "#9c27b0" }
                ]
            }
        },
        "Outbound Track": {
            "DEMO-AREA2-OB": {
                name: "Demo Area 2 - Outbound",
                segments: [
                    { start: 10, end: 15, color: "#e91e63" }
                ]
            }
        }
    }, // <--- THIS BRACKET AND COMMA WERE MISSING!
    "Evergreen Line": {
        "Inbound Track": {
            "DEMO-AREA3-IB": {
                name: "Demo Area 3 - Inbound",
                segments: [
                    { start: 0, end: 5, color: "#9c27b0" }
                ]
            }
        },
        "Outbound Track": {
            "DEMO-AREA3-OB": {
                name: "Demo Area 3 - Outbound",
                segments: [
                    { start: 10, end: 15, color: "#e91e63" }
                ]
            }
        }
    }
    // You can keep adding "Area 4", "Area 5", etc. below!
};

// Defect definitions are also kept here for safety
const defectMap = {
    'Inboard Running Rail': ['Broken', 'Wear', 'Corrugation', 'Spall', 'Missing Clips', 'Flow'],
    'Outboard Running Rail': ['Broken', 'Wear', 'Corrugation', 'Spall', 'Missing Clips', 'Flow'],
    'Rail Pad': ['Missing Pandrol', 'Broken Pad Washer', 'Broken Rail Pad', 'Pandrol-Shoulder', 'Shims out'],
    'Lim Rail': ['Black Marks', 'Broken Cap Bolt(s)', 'Scuff Marks', 'Cracked Top Cap', 'Broken/missing Continuity', 'High Lim', 'Broken Studs'],
    '(+) Power Rail': ['Arc Burns', 'Ramp Corrugation', 'Steel Cap Wear', 'Pull-apart', 'Broken Post', 'Calcification', 'Coverboards'],
    '(-) Power Rail': ['Arc Burns', 'Ramp Corrugation', 'Steel Cap Wear', 'Pull-apart', 'Broken Post', 'Calcification', 'Coverboards'],
    '(+) Power Rail Exp': ['Siezed', 'Arc Burns At Tapered Cut', 'Gap closed/wide'],
    '(-) Power Rail Exp': ['Siezed', 'Arc Burns At Tapered Cut', 'Gap closed/wide'],
    'Drain': ['Plugged', 'Debris Around Drain', 'Flooding'],
    'Structure': ['Leaking', 'Cracked', 'Weed/Tree Sticking', 'Hanging Wire'],
    'Fence': ['Cut open', 'Need Patching'],
    'Walk-way Panel': ['Missing Harware', 'Panel Sticking Up', 'Missing Panel'],
    'Track': ['Need Cleaning with RBE', 'Weed Trimming', 'Tree Trimming'],
};
const components = ['Select Component', ...Object.keys(defectMap)];
