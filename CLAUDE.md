# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a browser-based English word spelling learning game implemented as a static web application. The game features multiple difficulty levels, pronunciation synthesis, gamification elements, and local progress tracking.

## Development Commands

Since this is a static web application, no build system is required:

```bash
# Run locally - open in browser
open index.html
# or
python -m http.server 8000  # Python 3
# then visit http://localhost:8000
```

## Project Architecture

### File Structure
```
├── index.html          # Main HTML page with game screens
├── css/style.css       # Comprehensive styling with animations
├── js/
│   ├── words.js        # Word database and speech synthesis
│   └── game.js         # Core game logic and state management
└── README.md           # Documentation in Chinese
```

### Core Components

**Game State Management (`js/game.js`)**:
- `SpellingGame` class manages all game state and UI interactions
- Game screens: start, game, result, settings
- Features: scoring, streaks, levels, wrong word tracking
- LocalStorage integration for settings and progress persistence

**Word Database (`js/words.js`)**:
- Three difficulty levels: easy, medium, hard (20+ words each)
- Each word object contains: `word`, `meaning` (Chinese), `phonetic` (IPA)
- Browser Speech Synthesis API integration via `speakWord()`
- Browser capability detection functions

**UI Architecture**:
- Single-page application with screen-based navigation
- CSS animations for transitions and feedback
- Responsive design for mobile and desktop
- Gradient-based design with glassmorphism effects

### Key Features

1. **Multi-level Difficulty System**: Easy (3-6 letters), Medium (7-12 letters), Hard (13+ letters)
2. **Audio Integration**: Web Speech API for pronunciation
3. **Gamification**: Points, streaks, levels, wrong word review
4. **Local Persistence**: Settings and progress saved to localStorage
5. **Responsive Design**: Mobile-first CSS with flexbox layouts

### Browser Compatibility

- Chrome 33+, Firefox 49+, Safari 7+, Edge 14+
- Requires Speech Synthesis API support for audio features
- localStorage required for progress persistence

## Code Patterns

- Event-driven architecture with comprehensive event binding
- Class-based JavaScript for game state management  
- CSS custom properties for consistent theming
- Progressive enhancement for browser features
- Separation of concerns: data (words.js), logic (game.js), presentation (style.css)