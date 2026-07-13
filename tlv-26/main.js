/* ============================================================
   TASF 2026 — CRT console: boot + session init
   ============================================================ */

const BOOT_LINES = [
  { t: "AISF-CRT v2.6  ·  phosphor terminal  ·  Heron systems", c: "log-dim", d: 0 },
  { t: "", c: "log-dim", d: 8 },
  { t: "[ 0.000] powering cathode-ray tube ......... [ OK ]", c: "log-ok", d: 16 },
  { t: "[ 0.014] warming phosphor coating .......... [ OK ]", c: "log-ok", d: 24 },
  { t: "[ 0.031] secure boot chain verified ........ [ OK ]", c: "log-ok", d: 34 },
  { t: "[ 0.052] mounting encrypted volumes ........ [ OK ]", c: "log-ok", d: 44 },
  { t: "[ 0.061] firewall rules loaded ............. [ OK ]", c: "log-ok", d: 54 },
  { t: "", c: "log-dim", d: 60 },
  { t: "> aisf-init --load-config tlv.toml", c: "log-info", d: 66 },
  { t: "  [config] location = Tel Aviv, Israel", c: "log-dim", d: 76 },
  { t: "  [config] venue    = Tel Aviv Museum of Art", c: "log-dim", d: 84 },
  { t: "  [config] date     = 2026-11-22 (Sunday)", c: "log-dim", d: 92 },
  { t: "  [config] hours    = 09:00 – 20:00 IST", c: "log-dim", d: 100 },
  { t: "  [config] capacity = ~300 (application-based)", c: "log-dim", d: 108 },
  { t: "  [config] host     = Heron", c: "log-dim", d: 116 },
  { t: "  [config] threat_level = elevated", c: "log-warn", d: 124 },
  { t: "", c: "log-dim", d: 132 },
  { t: "  seeding entropy pool ................ [ OK ]", c: "log-ok", d: 138 },
  { t: "  initializing registration system .... [ OK ]", c: "log-ok", d: 148 },
  { t: "  establishing secure comms ........... [ OK ]", c: "log-ok", d: 158 },
  { t: "", c: "log-dim", d: 166 },
  { t: "  all systems nominal — launching session...", c: "log-ok", d: 184 },
  { t: "", c: "log-dim", d: 200 },
];

function runBoot() {
  const log = document.getElementById("boot-log");
  const boot = document.getElementById("boot-screen");
  let i = 0;
  function next() {
    if (i >= BOOT_LINES.length) {
      setTimeout(() => {
        boot.classList.add("fade-out");
        ["statusbar", "site", "footbar"].forEach(id => document.getElementById(id).classList.remove("hidden"));
        document.body.classList.add("power-on");   // CRT switch-on flash
        requestAnimationFrame(() => requestAnimationFrame(() =>
          document.getElementById("site").classList.add("visible")));
        setTimeout(() => boot.remove(), 220);
        initSession();
      }, 90);
      return;
    }
    const item = BOOT_LINES[i];
    const span = document.createElement("span");
    span.className = "l " + item.c;
    span.textContent = item.t || " ";
    log.appendChild(span);
    i++;
    const nx = BOOT_LINES[i];
    setTimeout(next, nx ? Math.max((nx.d - item.d) * 2.2, 12) : 40);
  }
  setTimeout(next, 40);
}

/* ---------- session init ---------- */
function initSession() {
  runTypewriter();
  updateClock();
  setInterval(updateClock, 1000);
  initScrollSpy();
}

function runTypewriter() {
  document.querySelectorAll(".typed").forEach(el => {
    const text = el.dataset.text || "";
    el.textContent = "";
    let i = 0;
    (function type() {
      if (i < text.length) { el.textContent += text[i++]; setTimeout(type, 16 + Math.random() * 12); }
    })();
  });
}

function updateClock() {
  const el = document.getElementById("clock");
  if (!el) return;
  // November 22, 2026 09:00 IST (Tel Aviv, UTC+2)
  const diff = new Date("2026-11-22T09:00:00+02:00") - Date.now();
  if (diff <= 0) { el.textContent = "[ LIVE ]"; return; }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  el.textContent = `T-${d}d ${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}

/* highlight the active section in the status bar nav */
function initScrollSpy() {
  const links = [...document.querySelectorAll(".sb-nav a")];
  const map = links.map(a => ({ a, sec: document.querySelector(a.getAttribute("href")) })).filter(x => x.sec);
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const hit = map.find(x => x.sec === e.target);
        if (hit) { links.forEach(l => l.classList.remove("active")); hit.a.classList.add("active"); }
      }
    });
  }, { rootMargin: "-30% 0px -60% 0px" });
  map.forEach(x => obs.observe(x.sec));
}

document.addEventListener("DOMContentLoaded", runBoot);
