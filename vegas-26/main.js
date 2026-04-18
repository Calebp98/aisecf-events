/* ============================================================
   VASF 2026 — Boot animation + site init
   ============================================================ */

const BOOT_LINES = [
  { text: "BIOS v2.1.4  |  VASF SECURE BOOT INIT", cls: "log-dim", delay: 0 },
  { text: "", cls: "log-dim", delay: 80 },
  { text: "Checking secure enclave..............[ OK ]", cls: "log-ok", delay: 160 },
  { text: "Loading kernel modules................[ OK ]", cls: "log-ok", delay: 280 },
  { text: "", cls: "log-dim", delay: 380 },
  { text: "$ pip install adversarial-robustness-toolbox", cls: "log-info", delay: 460 },
  { text: "  Downloading art-1.18.0.tar.gz (2.1 MB)", cls: "log-dim", delay: 600 },
  { text: "  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  2.1/2.1 MB  ✓", cls: "log-ok", delay: 780 },
  { text: "  Installing collected packages: art", cls: "log-dim", delay: 900 },
  { text: "  Successfully installed art-1.18.0", cls: "log-ok", delay: 980 },
  { text: "", cls: "log-dim", delay: 1040 },
  { text: "$ pip install llm-red-team torch transformers", cls: "log-info", delay: 1100 },
  { text: "  Downloading llm-red-team-0.9.2.tar.gz", cls: "log-dim", delay: 1220 },
  { text: "  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  5.4/5.4 MB  ✓", cls: "log-ok", delay: 1400 },
  { text: "  Downloading torch-2.6.0 (890 MB)", cls: "log-dim", delay: 1500 },
  { text: "  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  890/890 MB  ✓", cls: "log-ok", delay: 1800 },
  { text: "  Successfully installed llm-red-team torch transformers", cls: "log-ok", delay: 1900 },
  { text: "", cls: "log-dim", delay: 1960 },
  { text: "$ git clone vasf-2026-ctf --depth 1", cls: "log-info", delay: 2020 },
  { text: "  Cloning into 'vasf-2026-ctf'...", cls: "log-dim", delay: 2160 },
  { text: "  remote: Enumerating objects: 1337, done.", cls: "log-dim", delay: 2300 },
  { text: "  ✓  Repo cloned. 1337 objects.", cls: "log-ok", delay: 2440 },
  { text: "", cls: "log-dim", delay: 2500 },
  { text: "$ vasf-init --load-config event.toml", cls: "log-info", delay: 2560 },
  { text: "  [config] location     = Las Vegas, NV", cls: "log-dim", delay: 2700 },
  { text: "  [config] dates        = 2026-08-14 to 2026-08-16", cls: "log-dim", delay: 2800 },
  { text: "  [config] attendees    = 70 (capped)", cls: "log-dim", delay: 2900 },
  { text: "  [config] ctf_enabled  = true", cls: "log-dim", delay: 3000 },
  { text: "  [config] network_log  = false  # nice try", cls: "log-warn", delay: 3100 },
  { text: "", cls: "log-dim", delay: 3160 },
  { text: "  All systems nominal. Launching VASF 2026...", cls: "log-ok", delay: 3260 },
  { text: "", cls: "log-dim", delay: 3360 },
];

function runBoot() {
  const log = document.getElementById("boot-log");
  const bootScreen = document.getElementById("boot-screen");
  const site = document.getElementById("site");

  let i = 0;
  function nextLine() {
    if (i >= BOOT_LINES.length) {
      // Done — fade out boot, show site
      setTimeout(() => {
        bootScreen.classList.add("fade-out");
        site.classList.remove("hidden");
        requestAnimationFrame(() => {
          requestAnimationFrame(() => site.classList.add("visible"));
        });
        setTimeout(() => bootScreen.remove(), 600);
        initSite();
      }, 400);
      return;
    }
    const item = BOOT_LINES[i];
    const span = document.createElement("span");
    span.className = "log-line " + (item.cls || "");
    span.textContent = item.text || "\u00a0";
    log.appendChild(span);
    log.scrollTop = log.scrollHeight;
    i++;
    const next = BOOT_LINES[i];
    const wait = next ? (next.delay - item.delay) : 80;
    setTimeout(nextLine, Math.max(wait, 20));
  }
  setTimeout(nextLine, 200);
}

/* ============================================================
   SITE INIT
   ============================================================ */
function initSite() {
  updateClock();
  setInterval(updateClock, 1000);
  runTypewriter();
  animateBars();
}

function updateClock() {
  const el = document.getElementById("tmux-clock");
  if (!el) return;
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");
  el.textContent = `${h}:${m}:${s}`;
}

function runTypewriter() {
  const els = document.querySelectorAll(".typed-text");
  els.forEach(el => {
    const text = el.dataset.text || "";
    el.textContent = "";
    let i = 0;
    function type() {
      if (i < text.length) {
        el.textContent += text[i++];
        setTimeout(type, 40 + Math.random() * 30);
      }
    }
    setTimeout(type, 300);
  });
}

function animateBars() {
  const fills = document.querySelectorAll(".stat-fill");
  fills.forEach((fill, idx) => {
    fill.style.animationDelay = `${idx * 120}ms`;
  });
}

/* ============================================================
   FORM SUBMIT (stub)
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("apply-form");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const btn = form.querySelector(".btn-terminal");
      btn.textContent = "✓ submitted — we'll be in touch";
      btn.style.background = "#00cc6a";
      btn.disabled = true;
    });
  }
  runBoot();
});
