<div align="center">
  <img src="assets/img/6a5cea2858ba9471c589d6dc_fav_512x512.png" width="108" alt="project-s-clone" />
  <h1>project-s-clone</h1>
  <p><b>An offline, high-fidelity replica of the "Project S" page by Lenval Properties</b><br /><sub>Single-file HTML · all assets localized · opens via file:// · for frontend study only</sub></p>
  <p>
    <img src="https://img.shields.io/badge/HTML5-single%20page-E34F26" alt="HTML5">
    <img src="https://img.shields.io/badge/CSS3-static-1572B6" alt="CSS3">
    <img src="https://img.shields.io/badge/GSAP-motion%20stack-88CE02" alt="GSAP">
    <img src="https://img.shields.io/badge/Lenis-smooth%20scroll-111111" alt="Lenis">
    <img src="https://img.shields.io/badge/Three.js-WebGL-049EF4" alt="Three.js">
    <img src="https://img.shields.io/badge/Purpose-study%20only-F59E0B" alt="Purpose: study only">
  </p>
  <p>
    <a href="README.md">简体中文</a> ·
    <b>English</b>
  </p>
</div>

An offline, high-fidelity replica of the **Project S** project detail page on the [Lenval Properties](https://www.lenvalproperties.com) website (originally built with Webflow). This repository localizes the page together with **all** of its fonts, images, videos, and motion scripts as static assets: it works offline, opens directly from `file://`, and reproduces the original scrolling / hover / parallax / cursor / modal behavior.

The sole purpose of this replica is to **read a production-grade Webflow motion stack line by line**. It also serves as the reference implementation behind the "Lenval-style" redesign of my personal blog.

> ⚠️ **All rights to the page design, images, fonts, and videos belong to their original owner, Lenval Properties.** This repository is for personal learning only, grants no license, and must not be used commercially. See [Copyright Notice](#-copyright-notice).

## Overview

| | |
| --- | --- |
| **Original** | [Lenval Properties](https://www.lenvalproperties.com) · Project S (Webflow) |
| **Replica** | A single `index.html` (≈124 KB) + localized `assets/` (css / fonts / img / js / media) |
| **Motion stack** | GSAP + ScrollTrigger + SplitText + Flip + CustomEase · Lenis smooth scroll · barba.js transitions · Swiper · Three.js |
| **Fonts** | Helvetica Now Display + Financier Display (self-hosted woff2) |
| **Access** | <https://sunfleeting-debug.github.io/project-s-clone/> or open locally |
| **License** | None (design © original owner; code for study reference only) |

---

## ✨ Highlights

### 🎬 Original motion, untouched

- All scrolling / hover / parallax / cursor / modal behavior is driven by **`assets/js/vendor/site-motion.js`** — the original site's own motion script, dropped in as-is.
- Commercially licensed fonts and every vendor library (the GSAP family, Lenis, barba, Swiper, Three.js) are **localized one by one**; no CDN requests remain.

### 🔌 Offline compatibility shim (added by the replicator, two files only)

- **`assets/js/offline-compat.js`** implements no motion itself. It does exactly three things:
  1. **Preloader watchdog** — if the motion script hasn't finished within 15 s, force-dismiss the preloader layer (`html.motion-off`) so content never stays hidden;
  2. **Form fallback** — under `file://` or local preview, intercept form submits and show an inline note (the original POSTs to a Webflow backend);
  3. **Diagnostics** — log to the console whether the nine key libraries are present, plus the Lenis instance and ScrollTrigger count.
- **`assets/css/offline.css`** handles only the watchdog fallback and the form note styling; it takes no part in the visual restoration.

### 🖥 Local preview

```bash
# Double-click index.html under file://, or serve statically:
python -m http.server 8080
# Open http://127.0.0.1:8080
```

---

## 📁 Structure

```text
project-s-clone/
├── index.html                    Original page HTML, asset links rewritten to local paths
├── .nojekyll                     Skip Jekyll processing on GitHub Pages
└── assets/
    ├── css/
    │   ├── site.css              Original stylesheet (as-is)
    │   ├── offline.css           Offline fallback (added by replicator)
    │   └── vendor/lenis.css      Official Lenis styles
    ├── fonts/                    Helvetica Now Display / Financier Display (woff2)
    ├── img/                      Page imagery, decorative SVGs, favicons
    ├── js/
    │   ├── offline-compat.js     Offline compatibility shim (added by replicator)
    │   └── vendor/               GSAP · ScrollTrigger · SplitText · Flip · CustomEase
    │                             Lenis · barba · Swiper · Three.js · site-motion.js
    └── media/                    Videos (webm / mp4)
```

---

## ⚠️ Copyright Notice

- This repository is a **study-purpose, high-fidelity replica**, not an original work.
- The design, copy, photography, videos, and fonts of Lenval Properties and its Project S page belong to their original owner and rights holders; their inclusion here is solely for personal learning and research.
- This repository **grants no license**. Do not use any of its resources commercially or redistribute them.
- Will be taken down immediately upon the original author's request.
