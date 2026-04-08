// THEME AND FONT SIZE DATABASE
const systemThemes = {
    "tactical": {
        "--primary": "#8bc34a", 
        "--primary-dark": "#33691e",
        "--danger": "#d32f2f", 
        "--success": "#4caf50",
        "--warning": "#ffb300", 
        "--bg-color": "#0d0d0d", 
        "--card-bg": "#1a1a1a", 
        "--input-bg": "#111111",
        "--text-color": "#e0e0e0",
        "--text-muted": "#888888",
        "--border-color": "#333333",
        "--hud-glow": "0 0 8px rgba(139, 195, 74, 0.4)",
        "--border-radius": "2px",
        "--theme-color-meta": "#1a1a1a"
    },
    "windows11": {
        "--primary": "#0078D4",      // Microsoft Blue
        "--primary-dark": "#005A9E",
        "--danger": "#D13438", 
        "--success": "#107C10",
        "--warning": "#D83B01", 
        "--bg-color": "#F3F3F3",     // Light gray background
        "--card-bg": "#FFFFFF",      // Pure white cards
        "--input-bg": "#FFFFFF",
        "--text-color": "#202020",   // Dark gray text
        "--text-muted": "#605E5C",
        "--border-color": "#E1DFDD", // Soft borders
        "--hud-glow": "0 4px 12px rgba(0,0,0,0.08)", // Soft drop shadow
        "--border-radius": "8px",     // Windows 11 rounded corners
        "--theme-color-meta": "#F3F3F3"
    }
};

const systemFonts = {
    "small": {
        "--base-font": "13px",
        "--header-font": "16px",
        "--map-font": "15px",
        "--btn-font": "14px",
        "--map-width": "80px"
    },
    "medium": {
        "--base-font": "15px",
        "--header-font": "18px",
        "--map-font": "18px",
        "--btn-font": "16px",
        "--map-width": "95px" // Widens map column so bigger numbers don't squish
    },
    "large": {
        "--base-font": "17px",
        "--header-font": "20px",
        "--map-font": "22px",
        "--btn-font": "18px",
        "--map-width": "110px"
    }
};
