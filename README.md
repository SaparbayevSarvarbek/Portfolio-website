# Sarvarbek Saparbayev — Personal Portfolio

A premium, animated portfolio website for a Flutter/Mobile developer.
Pure HTML5 + CSS3 + vanilla JavaScript — no frameworks, no build step.
Open `index.html` directly or host on GitHub Pages.

## Structure

```
index.html                  — page markup
css/style.css               — layout, components, themes, responsive
css/animations.css          — keyframes, easings, reveal system
js/data.js                  — ALL content (EN/UZ): texts, projects, skills, links
js/script.js                — rendering from data.js + all interactions
assets/demo-*.png           — generated demo image per project (replace with real screenshots)
assets/project-placeholder.png — generic fallback
assets/Sarvarbek_Saparbayev_CV.pdf — downloadable CV (hero button)
assets/avatar.jpg           — demo avatar (replace with a real photo)
```

## Editing content

Everything lives in **js/data.js**. No HTML editing needed for content.

### Replace a project image

The site ships with **generated demo images** (`assets/demo-joytop.png`, `demo-4rent.png`, …) so every card looks finished out of the box. Each project in `DATA.projects` has an `image` field:

```js
{
  title: "Joy Top — Real Estate Marketplace",
  ...
  image: "assets/demo-joytop.png",   // ← change this path to your screenshot
}
```

1. Drop your real screenshot into `assets/` (e.g. `assets/joytop.png`).
2. Set `image: "assets/joytop.png"` for that project.
3. Recommended: 640×400px (16:10) or larger; the card crops via `object-fit: cover`.

To replace the demo avatar, overwrite `assets/avatar.jpg` with a square photo (~520×520 works best); if the file is missing, a gradient "SS" circle is shown instead.

### Add a project

Append an object to `DATA.projects`:

```js
{
  title: "My New App",
  desc: { en: "Short description.", uz: "Qisqa tavsif." },
  category: "utility",          // "marketplace" | "utility" | "travel" (or add a new filter in DATA.filters)
  featured: true,               // optional — shows the shimmering "Featured" badge
  image: "assets/project-placeholder.png",
  tags: ["Flutter", "Firebase"],
  links: { github: "https://github.com/...", store: "https://play.google.com/..." },
  // links: null  →  shows a "Private / NDA" label instead
}
```

The grid and filter chips update automatically.

### Change accent colors

Only CSS variables in **css/style.css** — two blocks:

```css
:root {                    /* dark theme */
  --a1: #22c55e;            /* accent 1 */
  --a2: #3b82f6;            /* accent 2 */
  --a3: #a855f7;            /* accent 3 */
  --grad: linear-gradient(135deg, #22c55e 0%, #3b82f6 50%, #a855f7 100%);
}
[data-theme="light"] { /* same variables for light theme */ }
```

The gradient uses the three accents everywhere (buttons, titles, timeline,
underlines). Update `--grad` to match if you change the accents.

### Set the Formspree endpoint

In **js/script.js**, find this block inside `initForm()`:

```js
const FORMSPREE_ENDPOINT = ""; // <-- PUT YOUR FORMSPREE ENDPOINT HERE
```

1. Create a free form at [formspree.io](https://formspree.io) → copy the endpoint
   (looks like `https://formspree.io/f/abcdwxyz`).
2. Paste it between the quotes.
3. Done — submissions post via `fetch`. If left empty, the form falls back to
   opening the visitor's mail client (`mailto:`), so it never breaks.

### Tune animation speed (global)

All durations multiply by one variable — in **css/animations.css** (and mirrored
in style.css `:root`):

```css
:root {
  --motion-scale: 1;   /* 1 = normal · 0.5 = 2× faster · 2 = 2× slower */
}
```

Keyframe loops (ambient blobs, floating icons) ignore it by design so the idle
mood stays constant; every reveal, stagger, count-up and typing effect respects it.

## Features

- Dark/light theme with circular View-Transition wave from the toggle, persisted in `localStorage`
- EN/UZ language switch with cross-fading text swap
- Scroll-spy navbar with sliding gradient underline, compressed scrolled state
- Hero: typewriter loop, conic-gradient avatar ring, 7 floating tech icons on Lissajous paths with mouse parallax
- Scroll reveals: blur-up / scale-in / slide / clip-up / split-words with per-child stagger
- Stats count-up, code-card typing with syntax colors, scroll-drawn experience timeline with ripple dots
- Project cards: 3D tilt + specular highlight, FLIP-animated filter transitions
- Magnetic buttons, custom cursor (desktop only), back-to-top with progress ring
- `prefers-reduced-motion` respected (opacity fades only); no-JS fallback keeps content visible

## Deploy to GitHub Pages

1. Create a repository (e.g. `portfolio`) on GitHub.
2. Push these files to the `main` branch:

   ```bash
   git init
   git add .
   git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/<username>/portfolio.git
   git push -u origin main
   ```

3. On GitHub: **Settings → Pages → Source: Deploy from a branch → main / (root) → Save**.
4. Your site goes live at `https://<username>.github.io/portfolio/` within a minute or two.

No build step required — GitHub Pages serves the files as-is.

## Accessibility & performance

- Semantic landmarks, `aria-label`s on icon-only links, focus-visible rings, skip link
- `font-display: swap` + system fallbacks (no layout shift on font load)
- Lazy-loaded images with width/height set; transforms/opacity only for GPU-friendly animation
