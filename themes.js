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
        "--primary": "#0078D4",      
        "--primary-dark": "#005A9E",
        "--danger": "#D13438", 
        "--success": "#107C10",
        "--warning": "#D83B01", 
        "--bg-color": "#F3F3F3",     
        "--card-bg": "#FFFFFF",      
        "--input-bg": "#FFFFFF",
        "--text-color": "#202020",   
        "--text-muted": "#605E5C",
        "--border-color": "#E1DFDD", 
        "--hud-glow": "0 4px 12px rgba(0,0,0,0.08)", 
        "--border-radius": "8px",     
        "--theme-color-meta": "#F3F3F3"
    },
    "pokemongo": {
        "--primary": "#28ACA8",      // UI Teal
        "--primary-dark": "#1F8A87",
        "--danger": "#E3350D",       // Pokeball Red
        "--success": "#4CAF50",
        "--warning": "#FFCB05",      // Electric Yellow
        "--bg-color": "#E1F5FE",     // Map Sky Blue
        "--card-bg": "#FFFFFF",      // Pokedex White
        "--input-bg": "#F5F5F5",
        "--text-color": "#2A2A2A",   
        "--text-muted": "#757575",
        "--border-color": "#CFD8DC", 
        "--hud-glow": "0 6px 16px rgba(0,0,0,0.12)", // Bouncy drop shadow
        "--border-radius": "16px",   // Highly rounded, game-like corners
        "--theme-color-meta": "#E1F5FE"
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
        "--map-width": "95px" 
    },
    "large": {
        "--base-font": "17px",
        "--header-font": "20px",
        "--map-font": "22px",
        "--btn-font": "18px",
        "--map-width": "110px"
    }
};
