# RA.OS Portfolio — Rana Ahmad

A futuristic, AI-inspired personal portfolio website showcasing skills, projects, certifications, and achievements. Built with vanilla HTML, CSS, and JavaScript — no framework overhead, full control, instant load times.

**Live Site:** [GitHub Pages](https://ranahmad1.github.io/rana-ahmad-portfolio/)

---

## ✨ Features

- **Immersive Boot Sequence** — Custom loader with cycling status messages and animated progress ring
- **2D Canvas Space Background** — Real-time starfield, nebula, neural network, and energy orb (motion-reduced version for accessibility)
- **Custom Cursor** — Smooth pointer follow and hover state scaling (fine-pointer devices only)
- **Interactive 3D Tilt Cards** — Project, skill, certificate, and honor cards with perspective transforms
- **Live GitHub Project Feed** — Fetches your latest repositories via GitHub API with graceful fallback
- **Coverflow Gallery** — 3D carousel through photos and moments (drag/swipe, keyboard, autoplay)
- **Ahmad Bot Chat Widget** — Rule-based conversational assistant integrated into the page
  - Session memory (persists visitor name and chat history across reloads)
  - 70+ intent patterns covering portfolio, tech, and general knowledge
  - Clarification interviews for multi-step answers
  - Context-aware "explain more" follow-ups
- **Scroll-Spy Navigation** — Active nav link updates as you scroll through sections
- **Scroll Progress Bar** — Visual indicator of page scroll position
- **Typewriter Hero** — Animated text cycling through job roles
- **Scroll Reveals** — Staggered entrance animations for content blocks
- **Certificate Flip Cards** — Tap-to-flip cards with verification links and downloadable PDFs
- **Magnetic Buttons** — CTA buttons subtly pull toward the cursor (fine-pointer devices only)
- **Responsive & Accessible**
  - Mobile-first design, optimized for all screen sizes
  - Full keyboard navigation for chat, gallery, and interactive elements
  - ARIA labels, live regions, and semantic HTML
  - Respects `prefers-reduced-motion` throughout
  - SEO-friendly with robots.txt and sitemap.xml

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Markup** | HTML5 semantic elements |
| **Styling** | CSS3 (Flexbox, Grid, custom properties, animations, transitions) |
| **Scripting** | Vanilla JavaScript (ES5 compatible, no transpilation needed) |
| **3D Graphics** | 2D Canvas (starfield, nebula, neural network, orb) |
| **External Data** | GitHub API (live project feed) |
| **Storage** | SessionStorage (chat session memory) |
| **Hosting** | GitHub Pages (static, free, fast) |

**No Framework Dependencies** — Pure client-side JavaScript means instant interactivity and no build step.

---

## 📁 Project Structure

```
rana-ahmad-portfolio/
├── README.md                 # This file
├── index.html               # Main HTML structure
├── script.js                # All JavaScript (boot, space, cursor, animations, bot, API)
├── utils.js                 # Shared utility functions (also used by tests)
├── style.css                # All CSS (layout, animations, glassmorphism, responsiveness)
├── package.json             # Dev dependencies (serve for local testing, jest for tests)
├── jest.config.js           # Jest test configuration
├── package-lock.json        # Dependency lock file
├── robots.txt               # Search engine crawling rules
├── sitemap.xml              # SEO sitemap
├── test/                    # Automated unit tests (Jest)
│   ├── escapeHtml.test.js
│   ├── detectVisitorName.test.js
│   ├── findBestIntent.test.js
│   └── contactObfuscation.test.js
└── assets/                  # Images, PDFs, icons
    ├── rana-ahmad-resume.pdf
    ├── images/              # Photos and awards
    └── certs/               # Certificate PDFs and thumbnails
```

---

## 🚀 Getting Started

### View Live
Visit the [live portfolio](https://ranahmad1.github.io/rana-ahmad-portfolio/) in any modern browser (Chrome, Firefox, Safari, Edge).

### Develop Locally

**Prerequisites:**
- Node.js 14+ (for the dev server and tests)
- Git

**Setup:**

```bash
# Clone the repository
git clone https://github.com/Ranahmad1/rana-ahmad-portfolio.git
cd rana-ahmad-portfolio

# Install dev dependencies
npm install

# Start local dev server (http://localhost:3000)
npm run dev

# Run automated tests
npm test
```

Open your browser to `http://localhost:3000` — the site will auto-reload on file changes.

### Deploy

The site is already configured for GitHub Pages. After making changes:

```bash
git add .
git commit -m "describe your changes"
git push origin main
```

GitHub Pages will automatically rebuild and deploy your changes within seconds.

---

## 📖 Key Components

### Boot Sequence (`runBoot()`)
- SVG progress ring with animated stroke
- Cycling status messages: "Initializing" → "Loading neural pathways" → ... → "Launching experience"
- ~3.4 second duration, perfectly timed to transition into the main experience
- Respects `prefers-reduced-motion` (skips animation)

### Space Background (`initSpace()`)
- 2D Canvas with 3D-projected particles
- Dynamically scales particle counts down on mobile for smooth 60 FPS
- Pause/resume when tab visibility changes (saves CPU on background tabs)
- Components:
  - Starfield (rotating sphere of 220–500 stars)
  - Nebula disc (spiral galaxy effect)
  - Neural network (nodes + connecting links, gentle sway)
  - Energy orb (wireframe core + rotating rings + glow)
  - Glass cube (rotating square on the left)

### Ahmad Bot Chat Widget (`initBot()`)
- 70+ intent patterns across portfolio, tech basics, and light general knowledge
- Session memory: stores chat history and visitor name in `sessionStorage`
- Conversation flow:
  1. User types or taps a quick option
  2. Bot matches against intent patterns (exact word-boundary match, then loose substring fallback)
  3. For clarification intents, bot asks a follow-up before answering
  4. Responses are HTML (allows links, code snippets, formatting)
  5. Typing delay simulates natural response time (500–800ms)
- Context-aware: "explain more" refers back to the last topic discussed
- Fallback: honest "I don't know" message + quick options, never fake data

### 3D Tilt Cards (`apply3DTilt()`)
- Shared helper for project, skill, certificate, and honor cards
- Mouse position inside card maps to X/Y rotation
- Perspective transforms for depth effect
- Disabled on touch devices and when motion is reduced
- Smooth ease-out animation (15% per frame) to avoid jank

### Moments Gallery (`initMoments()`)
- Coverflow-style 3D carousel
- Navigation: arrow buttons, dot indicators, keyboard arrows, drag/swipe, autoplay
- Each slide has caption and sub-text
- 3D transforms: scale, rotate, translateZ for depth

### Scroll Reveals (`initReveal()`)
- IntersectionObserver watches for elements entering viewport
- Staggered entrance animations (configured via `data-reveal-delay` attribute)
- Removes observer after first reveal to avoid re-triggering

---

## ♿ Accessibility

### Keyboard Navigation
- **Tab** moves through focusable elements
- **Enter/Space** activates buttons
- **Arrow keys** control the moments gallery
- **Escape** closes the chat widget
- All interactive elements (buttons, links, form inputs) are keyboard-accessible

### Screen Readers
- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- ARIA labels on icon-only buttons
- `aria-expanded` and `aria-hidden` on the chat widget
- Live regions on the chat (`aria-live="polite"` for new bot messages)
- `alt` text on all images

### Motion & Animation
- All animations check `prefers-reduced-motion`
- If the user prefers reduced motion:
  - Boot sequence completes instantly
  - Space background stops animating (shows static frame)
  - 3D tilt on cards is disabled
  - Coverflow autoplay is skipped
  - Typewriter shows the first role only (no animation)

### Color & Contrast
- Glassmorphic background with backdrop-filter for clarity
- Text uses sufficient contrast ratios (WCAG AA minimum)
- No color-only information (buttons use icons + labels)

---

## 🔧 Customization

### Edit Your Data
All portfolio data is stored at the top of `script.js` in the `owner`, `skillClusters`, `certificates`, and `honors` objects. Update these to reflect your information:

```javascript
var owner = {
  name: 'Rana Ahmad',
  title: 'Full Stack Engineer | AI Developer | Computer Science Student',
  // ... other fields
};
```

### Add/Remove Sections
Sections are tied to IDs in the HTML (`<section id="skills">`, etc.) and the navbar scrollspy. Add or remove sections by:
1. Adding/removing the `<section>` in `index.html`
2. Updating the `sections` array in `initNav()` in `script.js`
3. Optionally add a nav link

### Customize Colors & Fonts
All colors and layout dimensions are defined in `style.css`. Key custom properties:

```css
:root {
  --primary: oklch(0.78 0.13 220);       /* Bright blue */
  --text-primary: oklch(1 0 0);          /* White */
  --text-secondary: oklch(0.7 0 0);      /* Light gray */
  --bg-dark: oklch(0.15 0.08 280);       /* Dark blue-ish */
  /* ... more */
}
```

---

## 🧪 Testing

### Automated Tests
Run the Jest test suite:

```bash
npm test
```

107 tests across 4 suites covering core bot logic:
- `escapeHtml()` — XSS prevention (25 tests)
- `detectVisitorName()` — name extraction (37 tests)
- `findBestIntent()` — intent matching (24 tests)
- `rot13` / contact obfuscation (21 tests)

### Manual Testing Checklist
- [ ] Boot animation completes without freezing the page
- [ ] Space background renders smoothly and stops when tab is hidden
- [ ] Custom cursor appears on desktop (pointer devices)
- [ ] Project cards load from GitHub API (or show honest fallback)
- [ ] Chat widget opens/closes and responds to text input
- [ ] Keyboard navigation: Tab through elements, Arrow keys in gallery, Escape closes chat
- [ ] Mobile: responsive layout, touch gestures work (swipe gallery, tap to flip certs)
- [ ] `prefers-reduced-motion`: Disable animations in OS settings, verify no motion
- [ ] Network throttling: Simulate slow connection, verify fallback UI works

---

## 📊 Performance

- **Page Load:** ~2.5 MB uncompressed (mostly images in assets/); gzipped ~600 KB
- **First Paint:** ~1.2s (boot sequence + space background rendering)
- **Interactive:** ~1.5s (after boot, page is fully interactive)
- **Runtime:** Smooth 60 FPS on modern devices; 30 FPS on low-end devices (particle counts auto-scale)

---

## 🔐 Privacy & Security

- **No External Analytics** — No Google Analytics, Mixpanel, or similar
- **No Tracking** — No cookies set (session storage is per-browser-tab only)
- **Contact Info** — Email is stored obfuscated (ROT13) in source and decoded at runtime, reducing scraper harvesting
- **Form Data** — Chat history stays local (sessionStorage), never sent to a server
- **Content Security Policy** — The site can run under strict CSP (no `unsafe-inline`)

---

## 🤝 Contributing

This is a personal portfolio, so direct contributions aren't expected. However, if you find a bug or have a suggestion:

1. Open an issue describing the problem
2. For security issues, please email instead of opening a public issue

---

## 📜 License

This project is provided as-is for personal and portfolio use. Feel free to use it as a template for your own portfolio, with or without attribution.

---

## 👨‍💻 Author

**Rana Ahmad**  
Full Stack Engineer | AI Developer | Computer Science Student @ University of Central Punjab

- **Email:** [Ahmadaslam0904@gmail.com](mailto:Ahmadaslam0904@gmail.com)
- **LinkedIn:** [linkedin.com/in/ranahmad0](https://linkedin.com/in/ranahmad0)
- **GitHub:** [github.com/Ranahmad1](https://github.com/Ranahmad1)

---

**Last Updated:** September 2, 2026
