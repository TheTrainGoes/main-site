# Kid Sheets — Project Summary

## Overview
Educational activity sheet generator for kids. Generates printable/PDF-ready sheets directly in the browser. No frameworks, no build tools, no dependencies — plain HTML, CSS, and JavaScript only.

## Live Site
https://thetraingoes.github.io/main-site/

## GitHub Repo
https://github.com/TheTrainGoes/main-site

## Hosting
GitHub Pages — branch: `main`, root: `/`
To deploy: just push to main. Pages rebuilds automatically.

---

## Tech Stack
- Plain HTML / CSS / JavaScript (no npm, no build step)
- Print/PDF via browser `window.print()` with `@media print` CSS
- `@page { size: letter portrait; margin: 0.5in; }` for all printable sheets

## File Structure
```
main-site/
├── index.html          # Landing page with cards for each generator
├── word-search.html    # Word search generator page
├── css/
│   └── style.css       # All styles (screen + print)
└── js/
    └── word-search.js  # Word search logic + all word lists
```

---

## Design Decisions
- **Style:** Clean and minimal. White/light-gray background, blue accent (`#3b5bdb`), system font stack.
- **No emojis** anywhere on the site.
- **Print layout:** Each sheet targets US Letter (8.5×11"). Controls/header hidden on print, puzzle content only.
- **All word list entries must be single words** (no spaces). Two-word entries break the grid display.

---

## Word Search Generator — Complete Spec

### Difficulty
| Level  | Grid   | Words |
|--------|--------|-------|
| Easy   | 10×10  | 10    |
| Medium | 15×15  | 15    |
| Hard   | 20×20  | 20    |

### Category Dropdowns
1. **Difficulty** — Easy / Medium / Hard
2. **Category** — General / Boy / Girl
3. **Topic** — populated dynamically based on category selection

### Word Placement
- All 8 directions: horizontal, vertical, diagonal (all 4 diagonals), and all reverses
- Fully randomized on every generate — same settings always produce a different layout
- Words filtered to fit grid size before selection (word length ≤ grid dimension)
- Remaining cells filled with random letters

### Print/PDF
- "Print / Save as PDF" button calls `window.print()`
- User selects "Save as PDF" in browser print dialog
- Print CSS scales grid to fit page:
  - Easy: 5.5in wide
  - Medium: 6.5in wide
  - Hard: 6.25in wide
- Word list printed below grid in 5 columns

### Word Lists
- **60 topics total** — 20 per category (Boy / Girl / General)
- **40 words per topic** (pool is shuffled and filtered per difficulty)
- All words are single words — no spaces, no hyphens

#### Boy Topics (20)
Dinosaurs, Space, Sports, Superheroes, Vehicles, Pirates, Robots, Gaming, Wild Animals, Ninjas, Sharks, Science, Construction, Bugs, Weather, Mythology, Knights, Camping, Trains, Jungle

#### Girl Topics (20)
Unicorns, Fairy Tales, Fashion, Butterflies, Mermaids, Ballet, Horses, Art and Crafts, Baking, Princesses, Garden, Music, Cats, Gemstones, Rainbows, Spa and Beauty, Dogs and Puppies, Tea Party, Travel, Cooking

#### General Topics (20)
Animals, Food, Fruits and Vegetables, Weather, School, Ocean Life, Farm, Holidays, Countries, Instruments, Space and Planets, Nature, Sports, Birds, Family, Transportation, Human Body, Technology, Ancient History, World Mythology

---

## Generators — Status

| Generator       | Status      | Notes |
|-----------------|-------------|-------|
| Word Search     | Complete    | See above |
| Math Sheets     | Not started | Parameters TBD |
| Language Sheets | Not started | Parameters TBD |

---

## To Resume in a New Chat
1. Clone or open `https://github.com/TheTrainGoes/main-site`
2. Read this file
3. Check `git log --oneline` for recent changes
4. Continue from where we left off — next up is Math Sheets (user to provide parameters)
