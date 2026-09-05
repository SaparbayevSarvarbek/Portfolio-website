/* ============================================================
   SCRIPT — rendering, interactions, motion
   ============================================================ */
"use strict";

/* ---------- helpers ---------- */
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const easeOutExpo = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const FINE = window.matchMedia("(pointer: fine)").matches;
const TOUCH = window.matchMedia("(pointer: coarse)").matches;
const S = DATA.strings;
const t = (key) => S[key] || { en: "", uz: "" };
const tx = (obj) => (typeof obj === "string" ? obj : obj[LANG] || obj.en);

let LANG = localStorage.getItem("lang") || "en";

/* ---------- inline SVG icon set (Simple Icons style, monochrome) ---------- */
const ICONS = {
  telegram: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.26-1.91.178-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.531 6.998-3.02 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.9.419.419.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.18-.42-.393-1.065-.454-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.274-1.814.454-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.181 1.05-.39 2.22-.451 1.274-.06 1.649-.075 4.859-.075zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 1 0 0-12.324zM12 8.1a3.9 3.9 0 1 1 0 7.8 3.9 3.9 0 0 1 0-7.8zm7.848-3.039a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>`,
  github: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  email: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="m3 6 9 7 9-7"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  store: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 3.5h16l-1.5 5h-13L4 3.5z"/><path d="M5.5 8.5v10.5a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V8.5"/><path d="M9.5 13v3"/></svg>`,
  flutter: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14.314 0L2.3 12l3.9 3.9L22.1 0h-7.786zm.01 11.147L8.34 17.114 14.32 23.1H22.1l-5.986-5.986 5.986-5.967h-7.766z"/></svg>`,
  dart: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.105 4.105S9.158 1.58 11.684.316a3.079 3.079 0 0 1 1.481-.315c.766.047 1.677.788 1.677.788L24 9.948v9.789h-4.263V24H9.789l-9-9C.303 14.5 0 13.795 0 13.105c0-.319.18-.818.316-1.105l3.789-7.895zm.679.679v11.787c.002.543.021 1.024.498 1.508L10.204 23h8.533v-4.263L4.784 4.784zm12.055-.678c-.899-.896-1.809-1.78-2.74-2.643-.302-.267-.567-.468-1.07-.462-.37.014-.87.195-.87.195L6.341 4.105l10.498.001z"/></svg>`,
  kotlin: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 24H0V0h24L12 12z"/></svg>`,
  firebase: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.455 8.369c-.538-.748-1.778-2.285-3.681-4.569-.826-.991-1.535-1.832-1.884-2.245a146 146 0 0 0-.488-.576l-.207-.245-.113-.133-.022-.032-.01-.005L12.57 0l-.609.488c-1.555 1.246-2.828 2.851-3.681 4.64-.523 1.064-.864 2.105-1.043 3.176-.047.241-.088.489-.121.738-.209-.017-.421-.028-.632-.033-.018-.001-.035-.002-.059-.003a7.46 7.46 0 0 0-2.28.274l-.317.089-.163.286c-.765 1.342-1.198 2.869-1.252 4.416-.07 2.01.477 3.954 1.583 5.625 1.082 1.633 2.61 2.882 4.42 3.611l.236.095.071.025.003-.001a9.59 9.59 0 0 0 2.941.568q.171.006.342.006c1.273 0 2.513-.249 3.69-.742l.008.004.313-.145a9.63 9.63 0 0 0 3.927-3.335c1.01-1.49 1.577-3.234 1.641-5.042.075-2.161-.643-4.304-2.133-6.371m-7.083 6.695c.328 1.244.264 2.44-.191 3.558-1.135-1.12-1.967-2.352-2.475-3.665-.543-1.404-.87-2.74-.974-3.975.48.157.922.366 1.315.622 1.132.737 1.914 1.902 2.325 3.461zm.207 6.022c.482.368.99.712 1.513 1.028-.771.21-1.565.302-2.369.273a8 8 0 0 1-.373-.022c.458-.394.869-.823 1.228-1.279zm1.347-6.431c-.516-1.957-1.527-3.437-3.002-4.398-.647-.421-1.385-.741-2.194-.95.011-.134.026-.268.043-.4.014-.113.03-.216.046-.313.133-.689.332-1.37.589-2.025.099-.25.206-.499.321-.74l.004-.008c.177-.358.376-.719.61-1.105l.092-.152-.003-.001c.544-.851 1.197-1.627 1.942-2.311l.288.341c.672.796 1.304 1.548 1.878 2.237 1.291 1.549 2.966 3.583 3.612 4.48 1.277 1.771 1.893 3.579 1.83 5.375-.049 1.395-.461 2.755-1.195 3.933-.694 1.116-1.661 2.05-2.8 2.708-.636-.318-1.559-.839-2.539-1.599.79-1.575.952-3.28.479-5.072zm-2.575 5.397c-.725.939-1.587 1.55-2.09 1.856-.081-.029-.163-.06-.243-.093l-.065-.026c-1.49-.616-2.747-1.656-3.635-3.01-.907-1.384-1.356-2.993-1.298-4.653.041-1.19.338-2.327.882-3.379.316-.07.638-.114.96-.131l.084-.002c.162-.003.324-.003.478 0 .227.011.454.035.677.07.073 1.513.445 3.145 1.105 4.852.637 1.644 1.694 3.162 3.144 4.515z"/></svg>`,
  android: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.523 15.3414c-.5511 0-.9993-.4484-.9993-.9997s.4482-.9993.9993-.9993c.5513 0 .9996.448.9996.9993 0 .5513-.4483.9997-.9996.9997m-11.046 0c-.5511 0-.9993-.4484-.9993-.9997s.4482-.9993.9993-.9993c.5513 0 .9996.448.9996.9993 0 .5513-.4483.9997-.9996.9997m11.4045-6.02l1.9973-3.4592a.4162.4162 0 0 0-.1523-.5684.4162.4162 0 0 0-.5684.1523l-2.0219 3.503A12.6843 12.6843 0 0 0 12 7.9291c-1.8846 0-3.6265.4453-5.1313 1.2165L4.8441 5.6414a.4162.4162 0 0 0-.5684-.1523.4158.4158 0 0 0-.1523.5684l1.9975 3.4597C2.6903 11.8704.3438 15.7215 0 19.9502h24c-.3435-4.2286-2.6902-8.0797-6.1185-10.6288z"/></svg>`,
  git: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.39-.113.85.037 1.166.353.318.318.47.78.354 1.17l2.638 2.637c.39-.113.85.037 1.167.353.416.416.57 1.027.352 1.567-.22.54-.78.898-1.34.898-.33 0-.65-.12-.898-.353-.318-.318-.47-.78-.354-1.17l-2.637-2.637c-.087.02-.176.03-.26.03-.05 0-.1 0-.15-.01l-4.933 4.932c-.02.087-.03.176-.03.265 0 .05 0 .1.01.15l6.9 6.9c.604.603 1.582.603 2.188 0l10.435-10.477c.604-.604.604-1.582 0-2.186"/></svg>`,
  cpp: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22.394 6c-.167-.29-.398-.543-.652-.69L12.926.22c-.509-.294-1.34-.294-1.848 0L2.26 5.31c-.508.293-.923 1.013-.923 1.6v10.18c0 .294.104.62.271.91.167.29.398.543.652.69l8.816 5.09c.508.293 1.34.293 1.848 0l8.816-5.09c.254-.147.485-.4.652-.69.167-.29.27-.616.27-.91V6.91c.003-.294-.1-.62-.268-.91zM12 19.11c-3.92 0-7.109-3.19-7.109-7.11 0-3.92 3.19-7.11 7.11-7.11a7.133 7.133 0 0 1 6.156 3.553l-3.076 1.78a3.567 3.567 0 0 0-3.08-1.78A3.56 3.56 0 0 0 8.444 12 3.56 3.56 0 0 0 12 15.555a3.57 3.57 0 0 0 3.08-1.778l3.078 1.78A7.135 7.135 0 0 1 12 19.11zm7.11-6.715h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79zm2.962 0h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79z"/></svg>`,
};

const BRAND = {
  telegram: ["#26a5e4", "rgba(38,165,228,.35)"],
  instagram: ["#e1306c", "rgba(225,48,108,.35)"],
  github: ["#a78bfa", "rgba(167,139,250,.35)"],
  linkedin: ["#0a66c2", "rgba(10,102,194,.35)"],
  email: ["#22c55e", "rgba(34,197,94,.35)"],
  phone: ["#3b82f6", "rgba(59,130,246,.35)"],
  flutter: ["#54c5f8", "rgba(84,197,248,.4)"],
  dart: ["#0175c2", "rgba(1,117,194,.4)"],
  kotlin: ["#a78bfa", "rgba(167,139,250,.4)"],
  firebase: ["#ffca28", "rgba(255,202,40,.4)"],
  android: ["#3ddc84", "rgba(61,220,132,.4)"],
  git: ["#f05033", "rgba(240,80,51,.4)"],
  cpp: ["#00599c", "rgba(0,89,156,.4)"],
};

const brandStyle = (id) =>
  `--icon-brand:${BRAND[id] ? BRAND[id][0] : "var(--a2)"};--icon-brand-glow:${BRAND[id] ? BRAND[id][1] : "var(--glow)"}`;

function socialAnchor(s, extra = "") {
  return `<a class="social-icon" style="${brandStyle(s.id)}${extra}" href="${s.url}" target="_blank" rel="noopener" aria-label="${s.name}" data-social="${s.id}">${ICONS[s.id]}<span class="tooltip">${s.name}</span></a>`;
}

/* ============================================================
   RENDERING
   ============================================================ */
function renderNav() {
  const ul = $("#navLinks");
  const underline = ul.querySelector(".nav-underline");
  DATA.nav.forEach((n) => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="#${n.id}" data-section="${n.id}">${n[LANG] || n.en}</a>`;
    ul.insertBefore(li, underline);
  });

  const mob = $("#mobileLinks");
  DATA.nav.forEach((n, i) => {
    const li = document.createElement("li");
    li.innerHTML = `<a class="m-link" style="--i:${i}" href="#${n.id}" data-section="${n.id}">${n[LANG] || n.en}</a>`;
    mob.appendChild(li);
  });

  $("#navSocials").innerHTML = DATA.social.map((s) => socialAnchor(s)).join("");
  $("#mobileSocials").innerHTML = DATA.social.map((s, i) => socialAnchor(s, `;--i:${i}`)).join("");
  $("#heroSocials").innerHTML =
    DATA.social.map((s) => socialAnchor(s)).join("") +
    `<a class="social-icon" style="${brandStyle("email")}" href="mailto:${DATA.owner.email}" aria-label="Email">${ICONS.email}<span class="tooltip">Email</span></a>`;
  $("#footerSocials").innerHTML = DATA.social.map((s) => socialAnchor(s)).join("");
}

function renderStats() {
  const grid = $("#statsGrid");
  const labels = S.statsLabels;
  grid.innerHTML = DATA.stats.map((s, i) => {
    const label = labels[i];
    const isNumber = s.value >= 0;
    if (isNumber) {
      return `<div class="stat-card" style="--i:${i}">
        <div class="stat-value-row">
          <span class="stat-value" data-count="${s.value}">0</span><span class="stat-suffix">${s.suffix}</span>
        </div>
        <span class="stat-label">${tx(label)}</span>
      </div>`;
    }
    return `<div class="stat-card" style="--i:${i}">
      <span class="stat-value static-val gradient-text">iOS & Android</span>
      <span class="stat-label">${tx(label)}</span>
    </div>`;
  }).join("");
}

function renderSkills() {
  const wrap = $("#skillGroups");
  let idx = 0;
  wrap.innerHTML =
    DATA.skills.map((g) => {
      const pills = g.items
        .map((it) => `<span class="skill-pill" style="--i:${idx++}">${it}</span>`)
        .join("");
      return `<div class="skill-group"><div class="skill-group-title">${tx(g.group)}</div><div class="skill-pills">${pills}</div></div>`;
    }).join("") + `<div class="skills-shimmer" aria-hidden="true"></div>`;
}

function renderTimeline() {
  const tl = $("#timeline");
  DATA.experience.forEach((e, i) => {
    const dir = i % 2 === 0 ? "slide-left" : "slide-right";
    const el = document.createElement("div");
    el.className = "t-item";
    el.innerHTML = `
      <div class="timeline-dot"><span class="dot-core"></span></div>
      <div class="t-card" data-reveal="${dir}">
        <div class="t-head">
          <div><div class="t-title">${e.title}</div><div class="t-company">${e.company}</div></div>
          <span class="t-period"></span>
        </div>
        <ul class="t-points"></ul>
      </div>`;
    const period = el.querySelector(".t-period");
    period.setAttribute("data-trans", "");
    period._en = e.period.en; period._uz = e.period.uz;
    period.textContent = tx(e.period);
    const ul = el.querySelector(".t-points");
    e.points.forEach((p, j) => {
      const li = document.createElement("li");
      li.setAttribute("data-trans", "");
      li._en = p.en; li._uz = p.uz;
      li.textContent = tx(p);
      ul.appendChild(li);
    });
    tl.appendChild(el);
  });
}

function renderProjects() {
  const grid = $("#projectsGrid");
  DATA.projects.forEach((p, i) => {
    const card = document.createElement("article");
    card.className = "project-card";
    card.dataset.category = p.category;
    card.style.setProperty("--i", i % 3); // stagger within a row
    card.innerHTML = `
      <div class="specular" aria-hidden="true"></div>
      <div class="project-media">
        <img src="${p.image}" alt="${p.title} — project screenshot" loading="lazy" width="640" height="400" />
        ${p.featured ? `<span class="badge-featured" data-i18n="featured">Featured</span>` : ""}
      </div>
      <div class="project-body">
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc"></p>
        <div class="project-tags">${p.tags.map((tg) => `<span class="tag">${tg}</span>`).join("")}</div>
        <div class="project-links">
          ${p.links ? `
            ${p.links.github ? `<a class="project-link u-grow" href="${p.links.github}" target="_blank" rel="noopener">${ICONS.github}<span data-i18n="viewCode">GitHub</span></a>` : ""}
            ${p.links.store ? `<a class="project-link u-grow" href="${p.links.store}" target="_blank" rel="noopener">${ICONS.store}<span data-i18n="viewApp">Play Store</span></a>` : ""}
          ` : `<span class="project-nda" data-i18n="privateLabel">Private / NDA</span>`}
        </div>
      </div>`;
    const desc = card.querySelector(".project-desc");
    desc.setAttribute("data-trans", "");
    desc._en = p.desc.en; desc._uz = p.desc.uz;
    desc.textContent = tx(p.desc);
    grid.appendChild(card);
  });

  const chips = $("#filterChips");
  DATA.filters.forEach((f, i) => {
    const b = document.createElement("button");
    b.className = "chip" + (f.key === "all" ? " active" : "");
    b.type = "button";
    b.setAttribute("role", "tab");
    b.dataset.filter = f.key;
    b.setAttribute("data-trans", "");
    b.style.setProperty("--i", i);
    b._en = f.en; b._uz = f.uz;
    b.textContent = tx(f);
    chips.appendChild(b);
  });
}

function renderContact() {
  const grid = $("#contactCards");
  const cards = [
    { icon: "email", label: "Email", value: DATA.owner.email, href: `mailto:${DATA.owner.email}` },
    { icon: "phone", label: "Phone", value: DATA.owner.phone, href: `tel:${DATA.owner.phoneHref}` },
    { icon: "telegram", label: "Telegram", value: "@imSarvarbek", href: "https://t.me/imSarvarbek", ext: true },
    { icon: "instagram", label: "Instagram", value: "@imsarvarbek", href: "https://www.instagram.com/imsarvarbek", ext: true },
    { icon: "github", label: "GitHub", value: "SaparbayevSarvarbek", href: "https://github.com/SaparbayevSarvarbek", ext: true },
    { icon: "linkedin", label: "LinkedIn", value: "Sarvarbek Saparbayev", href: "https://www.linkedin.com/in/sarvarbek-saparbayev-514a21272/", ext: true },
  ];
  grid.innerHTML = cards.map((c) => `
    <a class="contact-card" style="${brandStyle(c.icon)}" href="${c.href}" ${c.ext ? 'target="_blank" rel="noopener"' : ""} aria-label="${c.label}: ${c.value}">
      <span class="contact-icon">${ICONS[c.icon]}</span>
      <span class="contact-meta"><span class="contact-label">${c.label}</span><span class="contact-value">${c.value}</span></span>
    </a>`).join("");
}

function renderOrbits() {
  const field = $("#orbitField");
  // two rings, opposite directions; slots counter-rotate so icons stay upright
  const rings = [
    {
      cls: "orbit-ring-cw",
      dir: "cw",
      dur: "34s",
      radiusVar: "--r1",
      techs: [
        { id: "flutter", name: "Flutter" },
        { id: "dart", name: "Dart" },
        { id: "kotlin", name: "Kotlin" },
        { id: "firebase", name: "Firebase" },
      ],
    },
    {
      cls: "orbit-ring-ccw",
      dir: "ccw",
      dur: "52s",
      radiusVar: "--r2",
      techs: [
        { id: "android", name: "Android" },
        { id: "git", name: "Git" },
        { id: "cpp", name: "C++" },
      ],
    },
  ];

  // dashed deco tracks
  field.insertAdjacentHTML("beforeend",
    `<div class="orbit-track r1" aria-hidden="true"></div><div class="orbit-track r2" aria-hidden="true"></div>`);

  let idx = 0;
  rings.forEach((ring, ri) => {
    const ringEl = document.createElement("div");
    ringEl.className = `orbit-ring ${ring.cls}`;
    ringEl.style.setProperty("--ring-dur", ring.dur);
    ringEl.style.setProperty("--ring-i", ri);
    const n = ring.techs.length;
    ring.techs.forEach((tc, i) => {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2; // start at top, spread evenly
      // slot positioned by polar coords via CSS var radius
      const slot = document.createElement("div");
      slot.className = `orbit-slot in-${ring.dir}` + (ring.dir === "ccw" ? " outer" : "");
      slot.style.setProperty("--rx", `calc(cos(${angle}rad) * var(${ring.radiusVar}))`);
      slot.style.setProperty("--ry", `calc(sin(${angle}rad) * var(${ring.radiusVar}))`);
      const item = document.createElement("div");
      item.className = "orbit-item";
      item.style.setProperty("--i", idx);
      item.style.setProperty("--bob-delay", `${(idx * 0.7) % 4}s`);
      item.style.cssText += `;${brandStyle(tc.id)}`;
      item.setAttribute("data-orbit", "");
      item.innerHTML = `${ICONS[tc.id]}<span class="tooltip">${tc.name}</span>`;
      slot.appendChild(item);
      ringEl.appendChild(slot);
      idx++;
    });
    field.appendChild(ringEl);
  });
}

/* ============================================================
   THEME (View-Transition circular wave with fallback)
   ============================================================ */
function applyTheme(theme, animate = false) {
  const toggleBtn = $("#themeToggle");
  const setAttr = () => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("theme", theme); } catch (e) {}
    toggleBtn.setAttribute("aria-label", theme === "dark" ? tx(t("themeToLight")) : tx(t("themeToDark")));
  };
  if (!animate || REDUCED || !document.startViewTransition) {
    if (animate) document.body.classList.add("theme-fading");
    setAttr();
    setTimeout(() => document.body.classList.remove("theme-fading"), 550);
    return;
  }
  const rect = toggleBtn.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const r = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy));
  const transition = document.startViewTransition(setAttr);
  transition.ready.then(() => {
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${cx}px ${cy}px)`, `circle(${r}px at ${cx}px ${cy}px)`] },
      { duration: 600, easing: "cubic-bezier(0.22,0.61,0.36,1)", pseudoElement: "::view-transition-new(root)" }
    );
  }).catch(() => {});
}

/* ============================================================
   LANGUAGE (cross-fade swap)
   ============================================================ */
function applyLang(lang, initial = false) {
  const swap = () => {
    $$("[data-i18n]").forEach((el) => {
      const v = t(el.getAttribute("data-i18n"))[lang];
      if (v) el.textContent = v;
    });
    // Re-split section titles whose inner spans were wiped by textContent swap
    $$('[data-reveal="split-words"]').forEach((el) => {
      const h2 = el.querySelector(".section-title") || el;
      splitWords(h2);
      if (el.classList.contains("revealed")) {
        $$(".split-word", h2).forEach((w) => {
          w.style.animation = "none";
          w.style.opacity = "1";
          w.style.transform = "none";
        });
      }
    });
    $$("[data-i18n-aria]").forEach((el) => {
      const v = t(el.getAttribute("data-i18n-aria"))[lang];
      if (v) el.setAttribute("aria-label", v);
    });
    $$("[data-trans]").forEach((el) => {
      if (el._en !== undefined) el.textContent = lang === "uz" ? el._uz : el._en;
    });
    $$("[data-section]").forEach((a) => {
      const n = DATA.nav.find((x) => x.id === a.dataset.section);
      if (n) a.textContent = n[lang];
    });
    // hamburger aria-label refresh
    const burger = $("#hamburger");
    if (burger && !$("#mobileMenu").classList.contains("open")) {
      burger.setAttribute("aria-label", tx(t("menuOpen")));
    }
    $$(".lang-btn").forEach((b) => b.classList.toggle("active", b.dataset.lang === lang));
    $(".lang-switch").setAttribute("data-active", lang);
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.removeAttribute("data-lang-swap");
    if (!initial) startTyping(true);
  };

  try { localStorage.setItem("lang", lang); } catch (e) {}
  LANG = lang;

  if (initial || REDUCED) { swap(); return; }
  document.documentElement.setAttribute("data-lang-swap", "");
  setTimeout(swap, 160);
}

/* ============================================================
   TYPEWRITER
   ============================================================ */
let typeTimer = null;
function startTyping(restart = false) {
  clearTimeout(typeTimer);
  const el = $("#typed");
  if (!el) return;
  const words = t("typewriter")[LANG];
  if (REDUCED) { el.textContent = words[0]; return; }
  if (restart) el.textContent = "";
  let wi = 0, ci = 0, deleting = false;
  const speed = 62;
  const step = () => {
    const word = words[wi];
    if (!deleting) {
      ci++;
      el.textContent = word.slice(0, ci);
      if (ci === word.length) { deleting = true; typeTimer = setTimeout(step, 1700); return; }
      typeTimer = setTimeout(step, speed);
    } else {
      ci--;
      el.textContent = word.slice(0, ci);
      if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; typeTimer = setTimeout(step, 320); return; }
      typeTimer = setTimeout(step, speed * 0.55);
    }
  };
  typeTimer = setTimeout(step, restart ? 300 : 400);
}

/* ============================================================
   PRELOADER + HERO ENTRANCE
   ============================================================ */
function initPreloader() {
  const pre = $("#preloader");
  const run = () => {
    pre.classList.add("done");
    $$(".hero-el").forEach((el, i) => el.style.setProperty("--d", i));
    const rings = $$(".orbit-ring");
    const items = $$(".orbit-item");
    setTimeout(() => {
      $("#home").classList.add("hero-enter");
      // rings pop in as a whole, then orbital rotation starts
      rings.forEach((r, ri) => {
        r.classList.add("pop-in");
        setTimeout(() => r.classList.add("orbit-live"), 500 + ri * 160 + 950);
      });
      // items pop individually on top
      items.forEach((o, i) => {
        o.classList.add("item-in");
        setTimeout(() => o.classList.add("orbit-live"), 600 + i * 90 + 640);
      });
    }, 80);
    setTimeout(() => pre.remove(), 900);
    startTyping();
  };
  if (REDUCED) {
    // no animation: everything visible immediately
    $("#home").classList.add("hero-enter");
    $$(".hero-el").forEach((el, i) => el.style.setProperty("--d", i));
    $$(".orbit-ring").forEach((r) => r.classList.add("orbit-live"));
    $$(".orbit-item").forEach((o) => o.classList.add("orbit-live"));
    pre.classList.add("done");
    startTyping();
    setTimeout(() => pre.remove(), 100);
    return;
  }
  setTimeout(run, 850);
}

/* ============================================================
   SCROLL REVEALS
   ============================================================ */
function splitWords(el) {
  const text = el.textContent;
  el.innerHTML = text
    .split(" ")
    .map((w, i) => `<span class="split-words-mask"><span class="split-word" style="--i:${i}">${w}</span></span>`)
    .join(" ");
}

function initReveals() {
  $$('[data-reveal="split-words"]').forEach((el) => {
    const h2 = el.querySelector(".section-title") || el;
    splitWords(h2);
  });

  $$(".section .container").forEach((c) => {
    if (c.closest("#home") || c.closest(".stats")) return;
    if (!c.querySelector(":scope > .sep-line")) {
      const sep = document.createElement("span");
      sep.className = "sep-line";
      c.prepend(sep);
    }
  });

  $$(".section-head").forEach((h) => {
    if (!h.querySelector(".title-bar")) {
      const bar = document.createElement("span");
      bar.className = "title-bar";
      h.appendChild(bar);
    }
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      io.unobserve(el);
      el.classList.add("revealed");
      const section = el.closest(".section");
      if (section) section.classList.add("revealed");
      if (el.classList.contains("skill-groups") || el.classList.contains("skill-group")) {
        $$(".skill-pill").forEach((p) => p.classList.add("pill-shown"));
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -10% 0px" });

  $$("[data-reveal]").forEach((el) => io.observe(el));
  $$(".section-head").forEach((h) => {
    if (!h.hasAttribute("data-reveal")) io.observe(h);
  });

  // skill pills: observe the groups container
  const skillIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      skillIO.unobserve(en.target);
      $$(".skill-pill").forEach((p) => p.classList.add("pill-shown"));
    });
  }, { threshold: 0.1 });
  const sg = $("#skillGroups");
  if (sg) skillIO.observe(sg);

  // filter chips
  const chipIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      chipIO.unobserve(en.target);
      $$(".chip").forEach((c) => c.classList.add("pill-shown"));
    });
  }, { threshold: 0.1 });
  const fc = $("#filterChips");
  if (fc) chipIO.observe(fc);

  // stats count-up
  const statIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      statIO.unobserve(en.target);
      countUp(en.target);
    });
  }, { threshold: 0.4 });
  $$(".stat-card").forEach((c) => statIO.observe(c));

  // code typing
  const codeIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      codeIO.unobserve(en.target);
      typeCode();
    });
  }, { threshold: 0.3 });
  const code = $("#codeCard");
  if (code) codeIO.observe(code);

  // timeline dots
  const dotIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.querySelector(".timeline-dot")?.classList.add("lit");
      dotIO.unobserve(en.target);
    });
  }, { threshold: 0.35 });
  $$(".t-item").forEach((it) => dotIO.observe(it));

  // card reveal (projects + stats) — .card-reveal/.card-in classes, no inline styles,
  // so tilt/FLIP transforms stay conflict-free
  const cardIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const card = en.target;
      cardIO.unobserve(card);
      card.classList.add("card-in");
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
  $$(".project-card, .stat-card").forEach((c) => {
    c.classList.add("card-reveal");
    cardIO.observe(c);
  });
}

function countUp(card) {
  const valEl = card.querySelector(".stat-value[data-count]");
  if (!valEl) { card.classList.add("counted"); return; }
  const target = parseInt(valEl.dataset.count, 10);
  if (REDUCED) { valEl.textContent = target; card.classList.add("counted"); return; }
  const dur = 1600;
  const t0 = performance.now();
  const tick = (now) => {
    const p = clamp((now - t0) / dur, 0, 1);
    valEl.textContent = Math.round(easeOutExpo(p) * target);
    if (p < 1) requestAnimationFrame(tick);
    else card.classList.add("counted");
  };
  requestAnimationFrame(tick);
}

/* code card typing with syntax colors */
function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
function highlightCode(line) {
  let html = esc(line);
  html = html.replace(/'[^']*'/g, (m) => `<span class="str">${m}</span>`);
  html = html.replace(/\b(const|new|return)\b/g, '<span class="kw">$1</span>');
  html = html.replace(/\b(true|false|null)\b/g, '<span class="bool">$1</span>');
  html = html.replace(/^(\s*)([A-Za-z_][\w]*):/g, '$1<span class="prop">$2</span>:');
  return html;
}

let codeTyped = false;
function typeCode() {
  if (codeTyped) return;
  codeTyped = true;
  const body = $("#codeBody");
  const lines = S.codeCard;
  const cursorHTML = '<span class="code-cursor"></span>';
  const render = (li, partial) => {
    body.innerHTML =
      lines.slice(0, li).map(highlightCode).join("\n") +
      (li > 0 ? "\n" : "") +
      highlightCode(partial) + cursorHTML;
  };
  if (REDUCED) {
    body.innerHTML = lines.map(highlightCode).join("\n") + cursorHTML;
    return;
  }
  let li = 0;
  const typeLine = () => {
    if (li >= lines.length) {
      body.innerHTML = lines.map(highlightCode).join("\n") + cursorHTML;
      return;
    }
    const line = lines[li];
    let ci = 0;
    const typeChar = () => {
      ci++;
      render(li, line.slice(0, ci));
      if (ci < line.length) setTimeout(typeChar, 26);
      else {
        li++;
        setTimeout(typeLine, li < lines.length ? 150 : 0);
      }
    };
    typeChar();
  };
  typeLine();
}

/* ============================================================
   NAVBAR: scroll state, scrollspy, underline, progress, menu
   ============================================================ */
function initNavbar() {
  const navbar = $("#navbar");
  const underline = $("#navUnderline");
  const progress = $("#scrollProgress");
  const links = $$("#navLinks a");

  // Cache section offsets; recalc only on resize / content change
  let sectionTops = [];
  let docMax = 1;
  const recalcOffsets = () => {
    sectionTops = DATA.nav
      .map((n) => {
        const el = document.getElementById(n.id);
        if (!el) return null;
        return { id: n.id, top: el.offsetTop + 60 };
      })
      .filter(Boolean);
    docMax = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    onScroll();
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      navbar.classList.toggle("scrolled", y > 20);
      progress.style.transform = `scaleX(${clamp(y / docMax, 0, 1)})`;

      let active = null;
      for (const s of sectionTops) {
        if (y >= s.top - 140) active = s.id;
      }
      links.forEach((a) => a.classList.toggle("active", a.dataset.section === active));
      const act = links.find((a) => a.dataset.section === active);
      if (act) {
        underline.classList.add("active");
        underline.style.left = `${act.offsetLeft}px`;
        underline.style.width = `${act.offsetWidth}px`;
      } else {
        underline.classList.remove("active");
      }
      updateBackToTop(y, docMax);
      updateTimeline();
      ticking = false;
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(recalcOffsets, 150);
  });
  // fonts/images can shift offsets after load
  if (document.fonts?.ready) document.fonts.ready.then(() => setTimeout(recalcOffsets, 50));
  setTimeout(recalcOffsets, 600);
  recalcOffsets();

  const burger = $("#hamburger");
  const menu = $("#mobileMenu");
  const toggleMenu = (open) => {
    burger.classList.toggle("open", open);
    menu.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? tx(t("menuClose")) : tx(t("menuOpen")));
    menu.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) setTimeout(recalcOffsets, 50);
  };
  burger.addEventListener("click", () => toggleMenu(!menu.classList.contains("open")));
  $$("#mobileLinks a").forEach((a) => a.addEventListener("click", () => toggleMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("open")) toggleMenu(false);
  });
  window.addEventListener("resize", () => {
    if (innerWidth > 900 && menu.classList.contains("open")) toggleMenu(false);
  });
}

/* ============================================================
   AMBIENT: hero glow + orbit parallax — rAF sleeps when idle.
   The loop runs only while the mouse delta is still settling,
   then stops completely until the next mousemove.
   ============================================================ */
function initAmbient() {
  if (TOUCH || REDUCED) return;
  const glow = $("#heroGlow");
  const orbitField = $("#orbitField");
  const hero = $("#home");
  let mx = 0, my = 0, gx = 0, gy = 0, raf = null;

  const apply = () => {
    if (glow) glow.style.transform = `translate3d(calc(-50% + ${gx * 0.35}px), calc(-40% + ${gy * 0.35}px), 0)`;
    if (orbitField) orbitField.style.translate = `${-gx / 55}px ${-gy / 55}px`;
  };

  const settle = () => {
    gx = lerp(gx, mx, 0.08);
    gy = lerp(gy, my, 0.08);
    apply();
    const done = Math.abs(gx - mx) < 0.1 && Math.abs(gy - my) < 0.1;
    if (done) {
      gx = mx; gy = my;
      apply();
      raf = null;
      return;
    }
    raf = requestAnimationFrame(settle);
  };

  hero.addEventListener("mousemove", (e) => {
    const r = hero.getBoundingClientRect();
    mx = e.clientX - r.left - r.width / 2;
    my = e.clientY - r.top - r.height / 2;
    if (!raf) raf = requestAnimationFrame(settle);
  }, { passive: true });
  hero.addEventListener("mouseleave", () => {
    mx = 0; my = 0;
    if (!raf) raf = requestAnimationFrame(settle);
  });
}

/* ============================================================
   MAGNETIC ELEMENTS (buttons + hero socials)
   ============================================================ */
function initMagnetic() {
  if (TOUCH || REDUCED) return;
  $$(".magnetic, .hero-socials .social-icon, .back-to-top").forEach((el) => {
    let raf = null, tx2 = 0, ty2 = 0, cx = 0, cy = 0;
    const RADIUS = 60, MAX = 8;
    const tick = () => {
      cx = lerp(cx, tx2, 0.15);
      cy = lerp(cy, ty2, 0.15);
      el.style.transform = `translate(${cx}px, ${cy}px)`;
      if (Math.abs(cx - tx2) > 0.1 || Math.abs(cy - ty2) > 0.1) raf = requestAnimationFrame(tick);
      else raf = null;
    };
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      if (Math.hypot(dx, dy) < RADIUS + 24) {
        tx2 = clamp(dx / RADIUS, -1.3, 1.3) * MAX;
        ty2 = clamp(dy / RADIUS, -1.3, 1.3) * MAX;
      }
      if (!raf) raf = requestAnimationFrame(tick);
    });
    el.addEventListener("mouseleave", () => {
      tx2 = 0; ty2 = 0; cx = 0; cy = 0;
      el.style.transition = "transform 0.5s var(--ease-spring)";
      el.style.transform = "translate(0,0)";
      setTimeout(() => { el.style.transition = ""; }, 500);
      if (raf) { cancelAnimationFrame(raf); raf = null; }
    });
  });
}

/* ============================================================
   PROJECT CARDS: 3D tilt + specular + FLIP filter
   ============================================================ */
function initProjectCards() {
  // tilt: write styles inside one rAF per frame, skip on touch/reduced
  if (!TOUCH && !REDUCED) {
    $$(".project-card").forEach((card) => {
      let raf = null, px = 0.5, py = 0.5, hovered = false;
      const apply = () => {
        card.style.setProperty("--mx", `${px * 100}%`);
        card.style.setProperty("--my", `${py * 100}%`);
        if (hovered) {
          const rx = (0.5 - py) * 6;
          const ry = (px - 0.5) * 6;
          card.style.transform = `translateY(-8px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        }
        raf = null;
      };
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        px = (e.clientX - r.left) / r.width;
        py = (e.clientY - r.top) / r.height;
        if (!raf) raf = requestAnimationFrame(apply);
      }, { passive: true });
      card.addEventListener("mouseenter", () => { hovered = true; });
      card.addEventListener("mouseleave", () => {
        hovered = false;
        if (raf) { cancelAnimationFrame(raf); raf = null; }
        card.style.transform = "";
      });
    });
  }

  $("#filterChips").addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip || chip.classList.contains("active")) return;
    $$(".chip").forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    const key = chip.dataset.filter;
    const cards = $$(".project-card");

    // First: measure
    const rects = new Map(cards.map((c) => [c, c.getBoundingClientRect()]));
    const matches = cards.map((c) => key === "all" || c.dataset.category === key);

    // hide non-matching (shrink+fade)
    cards.forEach((c, i) => {
      if (!matches[i]) c.classList.add("hide-out");
    });

    const layout = () => {
      // Last: apply display changes
      cards.forEach((c, i) => { c.style.display = matches[i] ? "" : "none"; });
      // Invert + Play — remove card-in first so its animation transform can't fight FLIP
      cards.forEach((c, i) => {
        if (!matches[i]) return;
        c.classList.remove("card-reveal", "card-in");
        const prev = rects.get(c);
        const now = c.getBoundingClientRect();
        const dx = prev.left - now.left;
        const dy = prev.top - now.top;
        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
          c.classList.add("flipping");
          c.style.transition = "none";
          c.style.transform = `translate(${dx}px, ${dy}px)`;
          requestAnimationFrame(() => {
            c.style.transition = "";
            c.style.transform = "";
            setTimeout(() => c.classList.remove("flipping"), 600);
          });
        }
      });
      // re-show matching cards that were hidden (pop back in)
      cards.forEach((c, i) => {
        if (matches[i] && c.classList.contains("hide-out")) {
          c.classList.remove("hide-out");
          c.classList.add("flipping-in");
          setTimeout(() => c.classList.remove("flipping-in"), 550);
        }
      });
    };

    if (REDUCED) {
      cards.forEach((c, i) => { c.style.display = matches[i] ? "" : "none"; });
      return;
    }
    // wait for shrink-out animation, then FLIP
    const hiddenAny = matches.some((m) => !m);
    setTimeout(layout, hiddenAny ? 340 : 30);
  });
}

/* ============================================================
   TIMELINE PROGRESS (scroll-driven, offset-cached)
   ============================================================ */
let updateTimeline = () => {};
function initTimeline() {
  const tl = $("#timeline");
  const bar = $("#timelineProgress");
  if (!tl || !bar) return;
  let tlTop = 0, tlH = 1;
  const recalc = () => {
    tlTop = tl.offsetTop;
    tlH = Math.max(1, tl.offsetHeight);
  };
  updateTimeline = () => {
    const viewY = window.scrollY + innerHeight * 0.75;
    const passed = clamp((viewY - tlTop) / tlH, 0, 1);
    bar.style.transform = `scaleY(${passed})`;
  };
  window.addEventListener("resize", () => setTimeout(recalc, 150));
  setTimeout(recalc, 600);
  recalc();
}

/* ============================================================
   BACK TO TOP (progress ring + custom smooth scroll)
   ============================================================ */
let updateBackToTop = () => {};
function smoothScrollTo(y, duration = 900) {
  if (REDUCED) { window.scrollTo(0, y); return; }
  const start = window.scrollY;
  if (Math.abs(start - y) < 2) return;
  const t0 = performance.now();
  const ease = (p) => 1 - Math.pow(1 - p, 4);
  const step = (now) => {
    const p = clamp((now - t0) / duration, 0, 1);
    window.scrollTo(0, lerp(start, y, ease(p)));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function initBackToTop() {
  const btn = $("#backToTop");
  const ring = $("#ringFill");
  const CIRC = 2 * Math.PI * 20;
  updateBackToTop = (y, max) => {
    btn.classList.toggle("show", y > 400);
    ring.style.strokeDashoffset = `${CIRC * (1 - clamp(y / (max || 1), 0, 1))}`;
  };
  btn.addEventListener("click", () => smoothScrollTo(0, 900));
}

/* ============================================================
   CUSTOM CURSOR (desktop, pointer:fine only)
   ============================================================ */
function initCursor() {
  if (!FINE || REDUCED || TOUCH) return;
  const dot = $("#cursorDot");
  const ring = $("#cursorRing");
  const label = $("#cursorLabel");
  document.documentElement.classList.add("custom-cursor");
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, raf = null;

  const settle = () => {
    rx = lerp(rx, mx, 0.12);
    ry = lerp(ry, my, 0.12);
    dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
    if (Math.abs(rx - mx) < 0.1 && Math.abs(ry - my) < 0.1) {
      rx = mx; ry = my;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = null;
      return;
    }
    raf = requestAnimationFrame(settle);
  };

  window.addEventListener("mousemove", (e) => {
    mx = e.clientX; my = e.clientY;
    if (!raf) raf = requestAnimationFrame(settle);
  }, { passive: true });

  window.addEventListener("mouseleave", () => { dot.style.opacity = "0"; ring.style.opacity = "0"; });
  window.addEventListener("mouseenter", () => { dot.style.opacity = ""; ring.style.opacity = ""; });

  const hoverSel = "a, button, .chip, .skill-pill, input, textarea, label";
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(".project-media")) {
      ring.classList.add("viewing"); ring.classList.remove("hovering");
      label.textContent = tx(t("view"));
    } else if (e.target.closest(hoverSel)) {
      ring.classList.add("hovering"); ring.classList.remove("viewing");
    } else {
      ring.classList.remove("hovering", "viewing");
    }
  });
}

/* ============================================================
   CONTACT FORM (Formspree with mailto fallback)
   ============================================================ */
function initForm() {
  const form = $("#contactForm");
  const note = $("#formNote");
  const sendBtn = form.querySelector(".form-send");

  /* ==========================================================================
     FORMSPREE ENDPOINT:
     1) Create a form at https://formspree.io and copy your endpoint ID.
     2) Replace the empty string below with e.g. "https://formspree.io/f/abcdwxyz".
     If left empty, the form falls back to opening the visitor's mail client.
     ========================================================================== */
  const FORMSPREE_ENDPOINT = ""; // <-- PUT YOUR FORMSPREE ENDPOINT HERE

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = $("#cfName").value.trim();
    const email = $("#cfEmail").value.trim();
    const message = $("#cfMessage").value.trim();
    if (!name || !email || !message) {
      note.textContent = LANG === "uz" ? "Iltimos, barcha maydonlarni toʻldiring." : "Please fill in all fields.";
      note.style.color = "var(--spark)";
      return;
    }
    const original = sendBtn.textContent;
    sendBtn.textContent = tx(t("formSending"));
    sendBtn.disabled = true;

    if (FORMSPREE_ENDPOINT) {
      try {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ name, email, message }),
        });
        if (res.ok) {
          note.textContent = LANG === "uz" ? "Xabaringiz yuborildi. Rahmat!" : "Your message was sent. Thank you!";
          note.style.color = "var(--a1)";
          form.reset();
        } else throw new Error("failed");
      } catch (err) {
        note.textContent = LANG === "uz" ? "Xatolik yuz berdi. Email orqali yozing." : "Something went wrong. Please email me instead.";
        note.style.color = "var(--spark)";
      }
    } else {
      const subject = encodeURIComponent(`Portfolio message from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:${DATA.owner.email}?subject=${subject}&body=${body}`;
      note.textContent = LANG === "uz" ? "Mail ilovasi ochildi." : "Opening your mail app…";
    }
    sendBtn.textContent = original;
    sendBtn.disabled = false;
  });
}

/* ============================================================
   BOOT
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  renderNav();
  renderStats();
  renderSkills();
  renderTimeline();
  renderProjects();
  renderContact();
  renderOrbits();

  initReveals();
  initNavbar();
  initAmbient();
  initMagnetic();
  initProjectCards();
  initTimeline();
  initBackToTop();
  initCursor();
  initForm();
  initPreloader();

  applyLang(LANG, true);

  $("#themeToggle").addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme") || "dark";
    applyTheme(cur === "dark" ? "light" : "dark", true);
  });
  $$(".lang-btn").forEach((b) =>
    b.addEventListener("click", () => {
      if (b.dataset.lang !== LANG) applyLang(b.dataset.lang);
    })
  );
});
