/* ============================================================
   VASF 2026 — Boot animation + site init
   ============================================================ */

const BOOT_LINES = [
  { text: "BIOS v2.1.4  |  VASF SECURE BOOT INIT", cls: "log-dim", delay: 0 },
  { text: "", cls: "log-dim", delay: 14 },
  { text: "Checking secure enclave..............[ OK ]", cls: "log-ok", delay: 27 },
  { text: "Loading kernel modules................[ OK ]", cls: "log-ok", delay: 47 },
  { text: "", cls: "log-dim", delay: 64 },
  { text: "$ pip install adversarial-robustness-toolbox", cls: "log-info", delay: 77 },
  { text: "  Downloading art-1.18.0.tar.gz (2.1 MB)", cls: "log-dim", delay: 100 },
  { text: "  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  2.1/2.1 MB  ✓", cls: "log-ok", delay: 130 },
  { text: "  Installing collected packages: art", cls: "log-dim", delay: 150 },
  { text: "  Successfully installed art-1.18.0", cls: "log-ok", delay: 164 },
  { text: "", cls: "log-dim", delay: 174 },
  { text: "$ pip install llm-red-team torch transformers", cls: "log-info", delay: 184 },
  { text: "  Downloading llm-red-team-0.9.2.tar.gz", cls: "log-dim", delay: 204 },
  { text: "  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  5.4/5.4 MB  ✓", cls: "log-ok", delay: 234 },
  { text: "  Downloading torch-2.6.0 (890 MB)", cls: "log-dim", delay: 250 },
  { text: "  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  890/890 MB  ✓", cls: "log-ok", delay: 300 },
  { text: "  Successfully installed llm-red-team torch transformers", cls: "log-ok", delay: 317 },
  { text: "", cls: "log-dim", delay: 327 },
  { text: "$ git clone vasf-2026-ctf --depth 1", cls: "log-info", delay: 337 },
  { text: "  Cloning into 'vasf-2026-ctf'...", cls: "log-dim", delay: 360 },
  { text: "  remote: Enumerating objects: 1337, done.", cls: "log-dim", delay: 384 },
  { text: "  ✓  Repo cloned. 1337 objects.", cls: "log-ok", delay: 407 },
  { text: "", cls: "log-dim", delay: 417 },
  { text: "$ vasf-init --load-config event.toml", cls: "log-info", delay: 427 },
  { text: "  [config] location     = Las Vegas, NV", cls: "log-dim", delay: 450 },
  { text: "  [config] date         = 2026-08-06", cls: "log-dim", delay: 467 },
  { text: "  [config] attendees    = 70 (capped)", cls: "log-dim", delay: 484 },
  { text: "  [config] ctf_enabled  = true", cls: "log-dim", delay: 500 },
  { text: "  [config] network_log  = false  # nice try", cls: "log-warn", delay: 517 },
  { text: "", cls: "log-dim", delay: 527 },
  { text: "  All systems nominal. Launching VASF 2026...", cls: "log-ok", delay: 544 },
  { text: "", cls: "log-dim", delay: 560 },
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
        setTimeout(() => bootScreen.remove(), 200);
        initSite();
      }, 67);
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
    const wait = next ? (next.delay - item.delay) : 40;
    setTimeout(nextLine, Math.max(wait, 10));
  }
  setTimeout(nextLine, 34);
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
  // August 6, 2026 10:00 AM PDT (Las Vegas)
  const target = new Date("2026-08-06T10:00:00-07:00");
  const diff = target - Date.now();
  if (diff <= 0) {
    el.textContent = "[ LIVE ]";
    return;
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  el.textContent = `T-${d}d ${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
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
        setTimeout(type, 13 + Math.random() * 10);
      }
    }
    setTimeout(type, 100);
  });
}

function animateBars() {
  const fills = document.querySelectorAll(".stat-fill");
  fills.forEach((fill, idx) => {
    fill.style.animationDelay = `${idx * 40}ms`;
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
