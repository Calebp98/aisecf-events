/* ============================================================
   VASF 2026 — Boot animation + site init
   ============================================================ */

const BOOT_LINES = [
  { text: "BIOS v2.1.4  |  VASF SECURE BOOT INIT", cls: "log-dim", delay: 0 },
  { text: "", cls: "log-dim", delay: 27 },
  { text: "Checking secure enclave..............[ OK ]", cls: "log-ok", delay: 53 },
  { text: "Loading kernel modules................[ OK ]", cls: "log-ok", delay: 93 },
  { text: "", cls: "log-dim", delay: 127 },
  { text: "$ pip install adversarial-robustness-toolbox", cls: "log-info", delay: 153 },
  { text: "  Downloading art-1.18.0.tar.gz (2.1 MB)", cls: "log-dim", delay: 200 },
  { text: "  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  2.1/2.1 MB  ✓", cls: "log-ok", delay: 260 },
  { text: "  Installing collected packages: art", cls: "log-dim", delay: 300 },
  { text: "  Successfully installed art-1.18.0", cls: "log-ok", delay: 327 },
  { text: "", cls: "log-dim", delay: 347 },
  { text: "$ pip install llm-red-team torch transformers", cls: "log-info", delay: 367 },
  { text: "  Downloading llm-red-team-0.9.2.tar.gz", cls: "log-dim", delay: 407 },
  { text: "  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  5.4/5.4 MB  ✓", cls: "log-ok", delay: 467 },
  { text: "  Downloading torch-2.6.0 (890 MB)", cls: "log-dim", delay: 500 },
  { text: "  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  890/890 MB  ✓", cls: "log-ok", delay: 600 },
  { text: "  Successfully installed llm-red-team torch transformers", cls: "log-ok", delay: 633 },
  { text: "", cls: "log-dim", delay: 653 },
  { text: "$ git clone vasf-2026-ctf --depth 1", cls: "log-info", delay: 673 },
  { text: "  Cloning into 'vasf-2026-ctf'...", cls: "log-dim", delay: 720 },
  { text: "  remote: Enumerating objects: 1337, done.", cls: "log-dim", delay: 767 },
  { text: "  ✓  Repo cloned. 1337 objects.", cls: "log-ok", delay: 813 },
  { text: "", cls: "log-dim", delay: 833 },
  { text: "$ vasf-init --load-config event.toml", cls: "log-info", delay: 853 },
  { text: "  [config] location     = Las Vegas, NV", cls: "log-dim", delay: 900 },
  { text: "  [config] dates        = 2026-08-14 to 2026-08-16", cls: "log-dim", delay: 933 },
  { text: "  [config] attendees    = 70 (capped)", cls: "log-dim", delay: 967 },
  { text: "  [config] ctf_enabled  = true", cls: "log-dim", delay: 1000 },
  { text: "  [config] network_log  = false  # nice try", cls: "log-warn", delay: 1033 },
  { text: "", cls: "log-dim", delay: 1053 },
  { text: "  All systems nominal. Launching VASF 2026...", cls: "log-ok", delay: 1087 },
  { text: "", cls: "log-dim", delay: 1120 },
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
      }, 133);
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
  setTimeout(nextLine, 67);
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
