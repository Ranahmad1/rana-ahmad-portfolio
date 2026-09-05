# 🌌 RA.OS — Rana Ahmad's AI-Powered Portfolio

> A futuristic, space-themed personal portfolio website by **Rana Ahmad** — Full Stack Engineer from Faisalabad, Pakistan.
> Built with zero frameworks. Pure HTML, CSS, and JavaScript.

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-00d4ff?style=for-the-badge)](https://ranahmad1.github.io/rana-ahmad-portfolio/)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Deployed-22c55e?style=for-the-badge&logo=github)](https://ranahmad1.github.io/rana-ahmad-portfolio/)
[![License](https://img.shields.io/badge/License-Personal_Use-7c3aed?style=for-the-badge)](LICENSE)
[![Tests](https://img.shields.io/badge/Tests-107_Passing-00c853?style=for-the-badge&logo=jest)](test/)

**Live:** [ranahmad1.github.io/rana-ahmad-portfolio](https://ranahmad1.github.io/rana-ahmad-portfolio/)

---

## ✨ Features

- **Immersive Boot Sequence** — Custom loader with cycling status messages and animated progress ring
- **2D Canvas Space Background** — Real-time starfield, nebula, neural network, and energy orb; reduced-motion version for accessibility
- **Custom Cursor** — Smooth pointer follow with hover-state scaling (desktop only)
- **Interactive 3D Tilt Cards** — Project, skill, certificate, and honor cards with perspective transforms
- **Live GitHub Project Feed** — Fetches latest repos via GitHub API with graceful fallback
- **Coverflow Gallery** — 3D carousel (drag/swipe, keyboard, autoplay)
- **Ahmad Bot Chat Widget** — Rule-based conversational assistant with 70+ intent patterns, session memory, and context-aware follow-ups
- **Scroll-Spy Navigation** — Active nav link updates as sections enter viewport
- **Certificate Flip Cards** — Tap-to-flip with verification links and PDF downloads
- **Magnetic Buttons** — CTA buttons subtly pull toward cursor on desktop
- **Fully Responsive & Accessible** — Mobile-first, ARIA labels, keyboard navigation, `prefers-reduced-motion` respected throughout
- **SEO-Optimized** — `robots.txt`, `sitemap.xml`, semantic HTML, meta tags

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Markup** | HTML5 semantic elements |
| **Styling** | CSS3 — Flexbox, Grid, animations, custom properties, glassmorphism |
| **Scripting** | Vanilla JavaScript (ES5-compatible) |
| **3D Graphics** | 2D Canvas API — starfield, nebula, neural network, energy orb |
| **Data** | GitHub REST API (live project feed) |
| **Storage** | SessionStorage (chat memory, per-tab) |
| **Testing** | Jest — 107 tests across 4 suites |
| **Hosting** | GitHub Pages (static, free, fast) |

**No framework dependencies.** No React, no Vue, no build step. Instant load. Full control.

---

## 📁 Project Structure

```
rana-ahmad-portfolio/
├── index.html               # Main HTML structure & all sections
├── script.js                # All JS: boot, space bg, cursor, animations, Ahmad Bot, API
├── utils.js                 # Shared utilities (also imported by tests)
├── style.css                # All CSS: layout, glassmorphism, animations, responsiveness
├── robots.txt               # Search engine crawling rules
├── sitemap.xml              # SEO sitemap
├── package.json             # Dev dependencies (serve, jest)
├── jest.config.js           # Jest configuration
├── test/                    # Automated unit tests
│   ├── escapeHtml.test.js
│   ├── detectVisitorName.test.js
│   ├── findBestIntent.test.js
│   └── contactObfuscation.test.js
└── assets/
    ├── rana-ahmad-resume.pdf
    ├── images/              # Profile photo, awards
    └── certs/               # Certificate PDFs and thumbnails
```

---

## 🚀 Quick Start

### View Live
[ranahmad1.github.io/rana-ahmad-portfolio](https://ranahmad1.github.io/rana-ahmad-portfolio/) — works in any modern browser.

### Run Locally

```bash
git clone https://github.com/Ranahmad1/rana-ahmad-portfolio.git
cd rana-ahmad-portfolio
npm install
npm run dev       # http://localhost:3000
npm test          # Run 107 Jest tests
```

### Deploy

Push to `main` — GitHub Pages auto-rebuilds within seconds.

```bash
git add . && git commit -m "update" && git push origin main
```

---

## 🤖 Ahmad Bot — Chat Widget

A rule-based conversational assistant embedded in the portfolio:

- **70+ intent patterns** covering portfolio facts, tech questions, and general knowledge
- **Session memory** — stores visitor name and chat history in `sessionStorage` (never sent to a server)
- **Context-aware** — "explain more" refers to the last topic discussed
- **Clarification interviews** — for multi-step questions, bot asks before answering
- **Honest fallback** — "I don't know" + quick options, never fake data
- **XSS-safe** — all user input is escaped before rendering

---

## ♿ Accessibility

- Full keyboard navigation (Tab, Enter, Space, Escape, Arrow keys)
- ARIA labels and `aria-expanded` on all interactive elements
- `aria-live="polite"` region for new chat messages
- All animations respect `prefers-reduced-motion`
- Semantic HTML with `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- WCAG AA contrast ratios

---

## 🧪 Tests

```bash
npm test
```

107 tests across 4 suites covering core bot logic:

| Test Suite | Tests | Coverage |
|---|---|---|
| `escapeHtml.test.js` | 25 | XSS prevention |
| `detectVisitorName.test.js` | 37 | Name extraction from chat input |
| `findBestIntent.test.js` | 24 | Intent matching accuracy |
| `contactObfuscation.test.js` | 21 | ROT13 email encoding |

---

## 📊 Performance

- **Page Load:** ~2.5 MB uncompressed (images); gzipped ~600 KB
- **First Paint:** ~1.2s (boot sequence + canvas initialization)
- **Interactive:** ~1.5s
- **Runtime:** 60 FPS on modern devices; auto-scales particle count on mobile for 30+ FPS

---

## 🔐 Privacy & Security

- No analytics (no Google Analytics, no tracking pixels)
- No cookies — `sessionStorage` only, per-tab, never sent to a server
- Email stored as ROT13 in source, decoded at runtime (reduces scraper harvesting)
- Can run under strict Content Security Policy

---

## 👤 Author

**Rana Ahmad** — Full Stack Engineer | AI Developer | BSCS Student

- 🌐 [Portfolio](https://ranahmad1.github.io/rana-ahmad-portfolio/)
- 💼 [LinkedIn](https://www.linkedin.com/in/rana-ahmad-896004365/)
- 🐙 [GitHub](https://github.com/Ranahmad1)
- 📧 ahmadaslam0904@gmail.com
- 📍 Faisalabad, Pakistan

Full Stack Engineer @ MADigital.pk | Building FlexERP | BSCS @ University of Central Punjab (Batch 2025)

---

## 🤝 Contributing

This is a personal portfolio. If you find a bug or security issue, please open an issue or email directly (no public disclosure for security bugs).

Feel free to use it as a template for your own portfolio with or without attribution.

---

## 📄 License

Provided as-is for personal and portfolio use. See [LICENSE](LICENSE).

---

*Keywords: Rana Ahmad portfolio · Full Stack Engineer Pakistan · personal portfolio website · vanilla JavaScript portfolio · space theme portfolio · AI portfolio · GitHub Pages portfolio · canvas animation portfolio · responsive portfolio · BSCS UCP · Faisalabad developer · Ahmad Bot chatbot*

**Last Updated:** September 2026
