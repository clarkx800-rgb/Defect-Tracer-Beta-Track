window.globalDatabase = window.globalDatabase || {};
window.globalDefectMaps = window.globalDefectMaps || {};

window.globalDatabase["Evergreen Line"] = {
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
                { start: 7356, end: 7420, color: "#63B5B6" },
                { start: 6321, end: 6366, color: "#63B5B6" }
            ]
        }
    },
    "Outbound Track": {
        "LHZ-BQZ-OB": {
            name: "LHZ-BQZ-OB",
            segments: [
                { start: 6400, end: 6368, color: "#CC3752" },
                { start: 7839, end: 7774, color: "#CC3752" }
            ]
        },
        "LHZ-BQZ-OB-X1": {
            name: "LHZ-BQZ-OB DC201-200",
            segments: [
                { start: 7896, end: 7897, color: "#37CCB1" }
            ]
        },
        "LHZ-BQZ-OB-X2": {
            name: "LHZ-BQZ-OB DC202-203",
            segments: [
                { start: 7895, end: 7893, color: "#E7A2AE" }
            ]
        },            
        "BQZ-NPZ-OB": {
            name: "BQZ-NPZ-OB",
            segments: [
                { start: 7773, end: 7686, color: "#9DCC37" }
            ]
        },
        "NPZ-FCZ-OB": {
            name: "NPZ-FCZ-OB",
            segments: [
                { start: 7685, end: 7545, color: "#37CCB1" }
            ]
        },
        "NPZ-FCZ-OB-X1": {
            name: "NPZ-FCZ-OB DC205-204",
            segments: [
                { start: 7890, end: 7892, color: "#3752CC" }
            ]
        },
        "NPZ-FCZ-OB-X2": {
            name: "NPZ-FCZ-OB DC206-207",
            segments: [
                { start: 7889, end: 7887, color: "#CC3752" }
            ]
        },
        "NPZ-FCZ-OB-X3": {
            name: "NPZ-FCZ-OB DC214-215",
            segments: [
                { start: 7685, end: 7545, color: "#37CCB1" }
            ]
        },            
        "FCZ-LAT-OB": {
            name: "FCZ-LAT-OB",
            segments: [
                { start: 7544, end: 7421, color: "#6637CC" }
            ]
        },
        "FCZ-LAT-OB-X1": {
            name: "FCZ-LAT-OB DC219-218",
            segments: [
                { start: 7861, end: 7862, color: "#CC6637" }
            ]
        },
        "FCZ-LAT-OB-X2": {
            name: "FCZ-LAT-OB DC221-222",
            segments: [
                { start: 7860, end: 7860, color: "#CCB137" }
            ]
        },
        "FCZ-LAT-OB-X3": {
            name: "FCZ-LAT-OB DC220-RH Spur End",
            segments: [
                { start: 7857, end: 7852, color: "#37CC66" }
            ]
        },
        "FCZ-LAT-OB-X4": {
            name: "FCZ-LAT-OB DC223-LH Spur End",
            segments: [
                { start: 7850, end: 7848, color: "#52CC37" }
            ]
        },
        "FCZ-LAT-OB-X5": {
            name: "FCZ-LAT-OB DC223-LH Spur End",
            segments: [
                { start: 7850, end: 7848, color: "#D4596F" }
            ]
        },
        "FCZ-LAT-OB-X6": {
            name: "FCZ-LAT-OB DC225-224",
            segments: [
                { start: 7845, end: 7847, color: "#3752CC" }
            ]
        },
        "FCZ-LAT-OB-X7": {
            name: "FCZ-LAT DC226-227",
            segments: [
                { start: 7844, end: 7840, color: "#CC3752" }
            ]
        }
    }
};

window.globalDefectMaps["Evergreen Line"] = {
    'Inboard Running Rail': ['Broken', 'Wear', 'Corrugation', 'Spall', 'Missing Clips', 'Flow', 'Joint-bar'],
    'Outboard Running Rail': ['Broken', 'Wear', 'Corrugation', 'Spall', 'Missing Clips', 'Flow', 'Joint-bar'],
    'Rail Pads': ['Missing Pandrol', 'Broken Delkor Washer', 'Broken Delkor Pad', 'Shims out (Delkor)', 'Delaminated Delkor Pad'],
    'Lim Rail': ['Black Marks', 'Broken Cap Bolt(s)', 'Scuff Marks', 'Cracked Top Cap', 'Broken/missing Continuity', 'High Lim'],
    'Lim Rail (I-beam)': ['Broken stud(s)', 'Corroded Studs'],
    '(+) Pwr Rail PH5': ['Broken Anchor', 'Iso Arc Burns', 'Ramp Corrugation', 'Steel Cap Wear/burn', 'Pull-apart', 'Broken/Damaged Post', 'Calcification', 'Coverboards'],
    '(-) Pwr Rail PH5': ['Broken Anchor', 'Iso Arc Burns', 'Ramp Corrugation', 'Steel Cap Wear/burn', 'Pull-apart', 'Broken/Damaged Post', 'Calcification', 'Coverboards'],
    'EV (+) Pwr Rail Exp': ['Siezed', 'Arc Burns', 'Gap closed/wide'],
    'EV (-) Pwr Rail Exp': ['Siezed', 'Arc Burns', 'Gap closed/wide'],
    'Drain': ['Plugged', 'Debris Around Drain', 'Flooding'],
    'Structure': ['Leaking', 'Cracked', 'Weed/Tree Sticking', 'Hanging Wire'],
    'Fence': ['Cut open', 'Need Patching', 'Repair Needed'],
    'Walk-way Panel': ['Missing Hardware', 'Panel Sticking Up', 'Missing Panel'],
    'Track': ['Blue Light Not Working','Need Cleaning with RBE', 'Weed Trimming', 'Tree Trimming'],
};
