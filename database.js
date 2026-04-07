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
            },
            "GWZ-SRZ-IB": { 
                name: "GWZ-SRZ-IB", 
                segments: [
                    { start: 4090, end: 4179, color: "#74EB63" },
                    { start: 2696, end: 2703, color: "#74EB63" }
                ]
            },
            "SRZ-COZ-IB": { 
                name: "SRZ-COZ-IB", 
                segments: [
                    { start: 2704, end: 2800, color: "#6BFFFD" }
                ]
            },
            // START OF SAZ-OB TO DC44
            "SAZ-OB-DC44": { 
                name: "SAZ-OB-DC44", 
                segments: [
                    { start: 4792, end: 4755, color: "#001A08" }, 
                    { start: 4501, end: 4532, color: "#001A08" },
                    { start: 2613, end: 2619, color: "#001A08" }
                ]
            },
            // END OF SAZ-OB TO DC44
            "COZ-NWZ-IB": {
                name: "COZ-NWZ-IB",
                segments: [
                    { start: 2801, end: 2825, color: "#7627F5"  }, 
                    { start: 2001, end: 2040, color: "#7627F5" }
                ]
            },
            "NWZ-TSZ-IB": {
                name: "NWZ-TSZ-IB",
                segments: [
                    { start: 2041, end: 2115, color: "#74EB63" }
                ]
            },
            "TSZ-EDZ-IB": {
                name: "TSZ-EDZ-IB",
                segments: [
                    { start: 2116, end: 2211, color: "#EBE963" }
                ]
            },
            "EDZ-ROZ-IB": {
                name: "EDZ-ROZ-IB",
                segments: [
                    { start: 2212, end: 2282, color: "#6339A8" },
                    { start: 1, end: 19, color: "#6339A8" }
                ]
            },
            "ROZ-PTZ-IB": {
                name: "ROZ-PTZ-IB",
                segments: [
                    { start: 20, end: 102, color: "#FF0000" }
                ]
            },
            "PTZ-JYZ-IB": {
                name: "PTZ-JYZ-IB",
                segments: [
                    { start: 103, end: 171, color: "#413387" }
                ]
            },
            "JYZ-NAZ-IB": {
                name: "JYZ-NAZ-IB",
                segments: [
                    { start: 172, end: 254, color: "#33873B" }
                ]
            },
            "NAZ-BWZ-IB": {
                name: "NAZ-BWZ-IB",
                segments: [
                    { start: 255, end: 338, color: "#FC0D91" }
                ]
            },
            "BWZ-MNZ-IB": {
                name: "BWZ-MNZ-IB",
                segments: [
                    { start: 339, end: 414, color: "#818A11" }
                ]
            },
            "MNZ-STZ-IB": {
                name: "MNZ-STZ-IB",
                segments: [
                    { start: 415, end: 482, color: "#006E54" }
                ]
            },
            "STZ-WFZ-IB": {
                name: "STZ-WFZ-IB",
                segments: [
                    { start: 483, end: 533, color: "#6E4B00" }
                ]
            },
            "WFZ-WFT-IB": {
                name: "WFZ-WFT-IB",
                segments: [
                    { start: 534, end: 566, color: "#FFF0F0" }
                ]
            }
        },
        // OUTBOUND DATA BELOW //
        "Outbound Track": {
            "WFT-WFZ-OB": { 
                name: "WFT-WFZ-OB", 
                segments: [
                    { start: 1130, end: 1099, color: "#6E4B00" },
                ] 
            },
            // START OF WF 01-02 SWITCHES
            "WFT-WFZ-OB-X1": { 
                name: "WFT-WFZ-OB | Cross DC02-01", 
                segments: [
                    { start: 1183, end: 1186, color: "#006E54" },
                ] 
            },
            // END OF WF 01-02 SWITCHES
            
            // START OF WF 03-06 SWITCHES
            "WFT-WFZ-OB-X2": { 
                name: "WFT-WFZ-OB | Cross DC03-04", 
                segments: [
                    { start: 1182, end: 1179, color: "#7D74FC" },
                ]   
            },
            "WFT-WFZ-OB-X3": { 
                name: "WFT-WFZ-OB | Cross DC06-05", 
                segments: [
                    { start: 1177, end: 1178, color: "#085900" },
                ]   
            },
            // END OF WF 03-06 SWITCHES
            
            "WFZ-STZ-OB": { 
                name: "WFZ-STZ-OB", 
                segments: [
                    { start: 1098, end: 1049, color: "#81FF70" },
                ]   
            },
            "STZ-MNZ-OB": { 
                name: "STZ-MNZ-OB", 
                segments: [
                    { start: 1048, end: 979, color: "#4F004C" },
                ] 
            },
            
            // START OF STADIUM SIDE TRACK AND SWITCHES
            "STZ-MNZ-OB-ST": { 
                name: "STZ-MNZ-OB | STS Side Track", 
                segments: [
                    { start: 1176, end: 1169, color: "#7D74FC" },
                ]   
            },
            // END OF STADIUM SIDE TRACK AND SWITCHES
            
            // START OF STADIUM SWITCHES
            "STZ-MNZ-OB-X1": { 
                name: "STZ-MNZ-OB | Cross DC09-10", 
                segments: [
                    { start: 1168, end: 1167, color: "#FF5C5C" },
                ]   
            },
            // END OF STADIUM SWITCHES
            
            // START OF MAIN SWITCHES
            "STZ-MNZ-OB-X2": { 
                name: "STZ-MNZ-OB | Cross DC12-11", 
                segments: [
                    { start: 1165, end: 1166, color: "#5C69FF" },
                ]   
            },
            // END OF MAIN SWITCHES
            
            "MNZ-BWZ-OB": { 
                name: "MNZ-BWZ-OB", 
                segments: [
                    { start: 978, end: 903, color: "#FF9500" },
                ]   
            },
            "BWZ-NAZ-OB": { 
                name: "BWZ-NAZ-OB", 
                segments: [
                    { start: 903, end: 819, color: "#9E00A3" },
                ]   
            },
            // START OF NANAIMO SWITCHES
            "BWZ-NAZ-OB-X1": { 
                name: "STZ-MNZ-OB | Pocket - DC13-18", 
                segments: [
                    { start: 1141, end: 1132, color: "#FFE100" },
                ]   
            },
            "BWZ-NAZ-OB-X2": { 
                name: "STZ-MNZ-OB | Pocket - DC14-15", 
                segments: [
                    { start: 1163, end: 1164, color: "#E4B8FF" },
                ]   
            },
            "BWZ-NAZ-OB-X3": { 
                name: "STZ-MNZ-OB | Pocket - DC16-17", 
                segments: [
                    { start: 1162, end: 1161, color: "#E4B8FF" },
                ]   
            },
            // END OF NANAIMO SWITCHES
            
            "NAZ-JYZ-OB": { 
                name: "NAZ-JYZ-OB", 
                segments: [
                    { start: 818, end: 736, color: "#0ED100" },
                ]   
            },
            "JYZ-PTZ-OB": { 
                name: "JYZ-PTZ-OB", 
                segments: [
                    { start: 735, end: 668, color: "#0ED100" },
                ]   
            },
            
            // START OF JOYCE SWITCHES
            "JYZ-PTZ-OB-X1": { 
                name: "JYZ-PTZ-OB | Cross DC19-20", 
                segments: [
                    { start: 1150, end: 1149, color: "#70A300" },
                ]   
            },
            "JYZ-PTZ-OB-X2": { 
                name: "JYZ-PTZ-OB | Cross DC22-21", 
                segments: [
                    { start: 1146, end: 1148, color: "#92FF8A" },
                ]   
            },
            // END OF JOYCE SWITCHES
            
            "PTZ-ROZ-OB": { 
                name: "PTZ-ROZ-OB", 
                segments: [
                    { start: 668, end: 585, color: "#22DDB4" },
                ]   
            },
            // START OF Metrotown POCKET
            "PTZ-ROZ-OB-X1": { 
                name: "PTZ-ROZ-OB | Pocket - DC24-25", 
                segments: [
                    { start: 1144, end: 1145, color: "#F1E3C5" },
                ]   
            },
            "PTZ-ROZ-OB-X2": { 
                name: "PTZ-ROZ-OB | Pocket - DC23-28", 
                segments: [
                    { start: 1141, end: 1132, color: "#9F63F8" },
                ]   
            },
            "PTZ-ROZ-OB-X3": { 
                name: "PTZ-ROZ-OB | Pocket - DC26-27", 
                segments: [
                    { start: 1163, end: 1164, color: "#E4B8FF" },
                ]   
            },
            // END of Metrotown POCKET
            
            "ROZ-EDZ-OB": { 
                name: "ROZ-EDZ-OB", 
                segments: [
                    { start: 584, end: 567, color: "#FF0080" },
                    { start: 2563, end: 2492, color: "#FF0080" },
                ]   
            },
            "EDZ-TSZ-OB": { 
                name: "EDZ-TSZ-OB", 
                segments: [
                    { start: 2491, end: 2397, color: "#0085C2" },
                ]   
            },
            
            // Start of Pocket DC30 - 37
            "EDZ-TSZ-OB-X1": { 
                name: "EDZ-TSZ-OB | Pocket DC30-37", 
                segments: [
                    { start: 2593, end: 2564, color: "#269C39" },
                ]   
            },
            "EDZ-TSZ-OB-X2": { 
                name: "EDZ-TSZ-OB | DC31-32", 
                segments: [
                    { start: 2600, end: 2598, color: "#A6981C" },
                ]   
            },
            "EDZ-TSZ-OB-X3": { 
                name: "EDZ-TSZ-OB | DC36-35", 
                segments: [
                    { start: 2594, end: 2595, color: "#6E14AD" },
                ]   
            },
            // End of Pocket DC30-37
            
            "TSZ-NWZ-OB": { 
                name: "TSZ-NWZ-OB", 
                segments: [
                    { start: 2396, end: 2323, color: "#13AE8A" },
                ]   
            },
            
            "NWZ-COZ-OB": { 
                name: "NWZ-COZ-OB", 
                segments: [
                    { start: 2322, end: 2283, color: "#9519A9" },
                    { start: 2999, end: 2975, color: "#9519A9" },
                ]   
            },
            
            // START OF NW & CO Switches
            "NWZ-COZ-OB-X1": { 
                name: "NWZ-COZ-OB | DC39-38", 
                segments: [
                    { start: 2601, end: 2602, color: "#C11701" },
                ]   
            },
            "NWZ-COZ-OB-X2": { 
                name: "NWZ-COZ-OB | DC42-43", 
                segments: [
                    { start: 2612, end: 2611, color: "#208CA2" },
                ]   
            },
            // END of NW & CO Switches
            
            "COZ-SRZ-OB": { 
                name: "COZ-SRZ-OB", 
                segments: [
                    { start: 2974, end: 2879, color: "#FE95CF" },
                ]   
            },
            
            // Start of SRX & Switches
            "COZ-SRZ-OB-X1": { 
                name: "COZ-SRZ-OB | SRX DC46-47", 
                segments: [
                    { start: 2627, end: 2620, color: "#B5F3A0" },
                ]   
            },
            //End of SRX & SWITCHES
            
            // Start of SAZ-IB to COZ-OB
            "COZ-OB-SAZ-IB-X2": { 
                name: "COZ-SRZ-OB-SAZ-IB | DC45-SAZ-IB", 
                segments: [
                    { start: 4570, end: 4533, color: "#978D87" },
                    { start: 4601, end: 4638, color: "#978D87" },
                ]   
            },
            // End of SAZ-IB to COZ-OB
            
            "SRZ-GWZ-OB": { 
                name: "SRZ-GWZ-OB", 
                segments: [
                    { start: 2878, end: 2870, color: "#FDC696" },
                    { start: 4352, end: 4265, color: "#FDC696" },
                ]   
            },
            
            // Start of DC48-49
            "SRZ-GWZ-OB-X1": { 
                name: "SRZ-GWZ-OB | Cross DC49-48", 
                segments: [
                    { start: 2628, end: 2631, color: "#047104" },
                ]   
            },
            // End of DC48-49
            
            // Start of GW Switches DC50-51
            "SRZ-GWZ-OB-X2": { 
                name: "GWZ-KGZ-OB | Cross DC50-51", 
                segments: [
                    { start: 4365, end: 4362, color: "#A30300" },
                ]   
            },
            "GWZ-KGZ-OB": { 
                name: "GWZ-KGZ-OB", 
                segments: [
                    { start: 4264, end: 4437, color: "#A30300" },
                ]   
            },
            // Start of GW Switches 53-59
            "GWZ-KGZ-OB-X1": { 
                name: "GWZ-KGZ-OB | Cross DC50-51", 
                segments: [
                    { start: 4358, end: 4361, color: "#C696FD" },
                ]   
            },
            "GWZ-KGZ-OB-X2": { 
                name: "GWZ-KGZ-OB | Cross DC56-57", 
                segments: [
                    { start: 4357, end: 4355, color: "#94FFEB" },
                ]   
            },
            "GWZ-KGZ-OB-X3": { 
                name: "GWZ-KGZ-OB | Cross DC59-58", 
                segments: [
                    { start: 4357, end: 4355, color: "#C6CDC9" },
                ]   
            },
            // End of GW Switches 53-59
            "KGZ-KGT-OB": { 
                name: "KGZ-KGT-OB", 
                segments: [
                    { start: 4435, end: 4435, color: "#A4FF94" },
                    { start: 4430, end: 4430, color: "#A4FF94" },
                    { start: 4424, end: 4424, color: "#A4FF94" },
                    { start: 4420, end: 4420, color: "#A4FF94" },
                    { start: 4415, end: 4415, color: "#A4FF94" },
                    { start: 4409, end: 4409, color: "#A4FF94" }
                ]   
            }
        }
    }, 
    "Millenium Line": {
        "Inbound Track": {
            "SAZ-BDZ-IB": {
                name: "SAZ-BDZ-IB",
                segments: [
                    { start: 4639, end: 4712, color: "#6364B6" }
                ]
            },
            "BDZ-LHZ-IB": {
                name: "SAZ-BDZ-IB",
                segments: [
                    { start: 4639, end: 4712, color: "#B6638E" }
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
    },
    "Evergreen Line": {
        "Inbound Track": {
            "LAT-FCZ-IB": {
                name: "LAT & LAZ-FCZ-IB",
                segments: [
                    { start: 7001, end: 7123, color: "#9c27b0" }
                ]
            },
            "FCZ-NPZ-IB": {
                name: "FCZ-NPZ-IB",
                segments: [
                    { start: 7124, end: 7266, color: "#B66463" }
                ]
            },
            "NPZ-BQZ-IB": {
                name: "NPZ-BQZ-IB",
                segments: [
                    { start: 7267, end: 7355, color: "#8BB663" }
                ]
            },
            "BQZ-LHZ-IB": {
                name: "BQZ-LHZ-IB",
                segments: [
                    { start: 7001, end: 6366, color: "#63B5B6" }
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
