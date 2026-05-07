/* ============================================================
   VASF 2026 — Boot animation + site init
   ============================================================ */

const BOOT_LINES = [
  { text: "BIOS v2.1.4  |  VASF SECURE BOOT INIT", cls: "log-dim", delay: 0 },
  { text: "", cls: "log-dim", delay: 8 },
  { text: "[ 0.000] Starting VASF kernel security module...", cls: "log-dim", delay: 16 },
  { text: "[ 0.031] CPU microcode updated (CVE-2025-7142 patched)", cls: "log-dim", delay: 24 },
  { text: "[ 0.047] Secure boot chain verified", cls: "log-ok", delay: 32 },
  { text: "[ 0.062] Firewall rules loaded", cls: "log-ok", delay: 40 },
  { text: "[ 0.078] Audit daemon started", cls: "log-ok", delay: 48 },
  { text: "Initializing memory..........................[ OK ]", cls: "log-ok", delay: 56 },
  { text: "Checking secure enclave..............[ OK ]", cls: "log-ok", delay: 64 },
  { text: "Loading kernel modules................[ OK ]", cls: "log-ok", delay: 72 },
  { text: "Mounting encrypted volumes...........[ OK ]", cls: "log-ok", delay: 80 },
  { text: "", cls: "log-dim", delay: 86 },
  { text: "$ pip install adversarial-robustness-toolbox", cls: "log-info", delay: 92 },
  { text: "  Collecting adversarial-robustness-toolbox", cls: "log-dim", delay: 100 },
  { text: "  Downloading art-1.18.0.tar.gz (2.1 MB)", cls: "log-dim", delay: 108 },
  { text: "  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  2.1/2.1 MB  ✓", cls: "log-ok", delay: 122 },
  { text: "  Building wheel for art (setup.py)...", cls: "log-dim", delay: 130 },
  { text: "  Installing collected packages: art", cls: "log-dim", delay: 138 },
  { text: "  Successfully installed art-1.18.0", cls: "log-ok", delay: 146 },
  { text: "", cls: "log-dim", delay: 152 },
  { text: "$ pip install llm-red-team torch transformers", cls: "log-info", delay: 158 },
  { text: "  Collecting llm-red-team", cls: "log-dim", delay: 166 },
  { text: "  Downloading llm-red-team-0.9.2.tar.gz", cls: "log-dim", delay: 174 },
  { text: "  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  5.4/5.4 MB  ✓", cls: "log-ok", delay: 188 },
  { text: "  Building wheel for llm-red-team (setup.py)...", cls: "log-dim", delay: 196 },
  { text: "  Collecting torch", cls: "log-dim", delay: 204 },
  { text: "  Downloading torch-2.6.0 (890 MB)", cls: "log-dim", delay: 212 },
  { text: "  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  890/890 MB  ✓", cls: "log-ok", delay: 242 },
  { text: "  Collecting transformers", cls: "log-dim", delay: 250 },
  { text: "  Downloading transformers-4.40.0 (3.2 MB)", cls: "log-dim", delay: 258 },
  { text: "  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  3.2/3.2 MB  ✓", cls: "log-ok", delay: 270 },
  { text: "  Successfully installed llm-red-team torch transformers", cls: "log-ok", delay: 278 },
  { text: "", cls: "log-dim", delay: 284 },
  { text: "$ git clone vasf-2026-ctf --depth 1", cls: "log-info", delay: 290 },
  { text: "  Cloning into 'vasf-2026-ctf'...", cls: "log-dim", delay: 298 },
  { text: "  remote: Enumerating objects: 1337, done.", cls: "log-dim", delay: 308 },
  { text: "  remote: Counting objects: 100% (1337/1337), done.", cls: "log-dim", delay: 318 },
  { text: "  remote: Compressing objects: 100% (892/1337), done.", cls: "log-dim", delay: 328 },
  { text: "  Receiving objects: 100% (1337/1337), 4.2 MiB | 12.1 MiB/s", cls: "log-dim", delay: 340 },
  { text: "  Resolving deltas: 100% (445/1337), done.", cls: "log-dim", delay: 350 },
  { text: "  ✓  Repo cloned. 1337 objects.", cls: "log-ok", delay: 358 },
  { text: "", cls: "log-dim", delay: 364 },
  { text: "$ vasf-init --load-config event.toml", cls: "log-info", delay: 370 },
  { text: "  [config] location     = Las Vegas, NV", cls: "log-dim", delay: 378 },
  { text: "  [config] date         = 2026-08-06", cls: "log-dim", delay: 386 },
  { text: "  [config] time         = 10:00 PDT", cls: "log-dim", delay: 394 },
  { text: "  [config] capacity     = ~200 (application-based)", cls: "log-dim", delay: 402 },
  { text: "  [config] ctf_enabled  = true", cls: "log-dim", delay: 410 },
  { text: "  [config] network_log  = false  # nice try", cls: "log-warn", delay: 418 },
  { text: "  [config] tls_cert     = valid (expires 2027-01-01)", cls: "log-dim", delay: 426 },
  { text: "  [config] threat_level = elevated", cls: "log-warn", delay: 434 },
  { text: "  [config] format       = talks, workshops, networking", cls: "log-dim", delay: 442 },
  { text: "  [config] speakers     = pending confirmation", cls: "log-dim", delay: 450 },
  { text: "", cls: "log-dim", delay: 456 },
  { text: "  Checking dependencies........................[ OK ]", cls: "log-ok", delay: 462 },
  { text: "  Seeding entropy pool.....................[ OK ]", cls: "log-ok", delay: 470 },
  { text: "  Configuring event handlers..............[ OK ]", cls: "log-ok", delay: 478 },
  { text: "  Initializing registration system............[ OK ]", cls: "log-ok", delay: 486 },
  { text: "  Verifying auth tokens....................[ OK ]", cls: "log-ok", delay: 494 },
  { text: "  Loading threat intelligence..............[ OK ]", cls: "log-ok", delay: 502 },
  { text: "  Establishing secure comms................[ OK ]", cls: "log-ok", delay: 510 },
  { text: "", cls: "log-dim", delay: 518 },
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
const QUOTES = [
  { text: "The forum helped us shape our work and product in some really meaningful ways that helped answer some really hard technical questions about what the future of Security was going to look like.", attr: "— Will Pearce, CEO @ Dreadnode" },
  { text: "The Forum is where I've been able to connect to the beating heart of the AI Security community.", attr: "— Jason Clinton, Deputy CISO @ Anthropic" },
  { text: "Some of the most useful conversations I've had about AI — with both technical and policy people — started at AISF. It's one of the few venues that consistently brings that range of people into the same room.", attr: "— Kristian Ronn, CEO @ Lucid Computing" },
  { text: "The rare event where security engineers, policy people, and AI researchers are actually in the same room talking to each other.", attr: "— Security Researcher, AI Lab" },
  { text: "I left with a clearer sense of the threat landscape and a network of people I can actually call when things go sideways.", attr: "— Policy Advisor, National Security Community" },
];

const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*<>[]{}|;:.,?/\\-_=+~`";

function glitchIn(text, el, duration, onDone) {
  const start = Date.now();
  function frame() {
    const progress = Math.min((Date.now() - start) / duration, 1);
    const locked = Math.floor(progress * text.length);
    let display = "";
    for (let i = 0; i < text.length; i++) {
      if (i < locked || text[i] === " ") display += text[i];
      else display += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
    }
    el.textContent = display;
    if (progress < 1) setTimeout(frame, 28);
    else { el.textContent = text; onDone && onDone(); }
  }
  frame();
}

function glitchOut(text, el, duration, onDone) {
  const start = Date.now();
  function frame() {
    const progress = Math.min((Date.now() - start) / duration, 1);
    const remaining = Math.floor((1 - progress) * text.length);
    let display = "";
    for (let i = 0; i < remaining; i++) {
      display += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
    }
    el.textContent = display;
    if (progress < 1) setTimeout(frame, 28);
    else { el.textContent = ""; onDone && onDone(); }
  }
  frame();
}

function fitQuoteFontSize(textEl, attrEl, containerEl, text, attr) {
  // Temporarily populate to measure; no paint occurs mid-sync-JS
  attrEl.textContent = attr;
  let size = 42;
  textEl.style.fontSize = size + "px";
  textEl.textContent = text;
  while (containerEl.scrollHeight > containerEl.offsetHeight && size > 16) {
    size -= 1;
    textEl.style.fontSize = size + "px";
  }
  textEl.textContent = "";
  attrEl.textContent = "";
  return size;
}

function runQuoteCarousel() {
  const textEl = document.getElementById("quote-text");
  const attrEl = document.getElementById("quote-attr");
  if (!textEl || !attrEl) return;
  const containerEl = attrEl.closest(".testimonial");

  let idx = Math.floor(Math.random() * QUOTES.length);

  function showNext() {
    const { text, attr } = QUOTES[idx];
    const fontSize = fitQuoteFontSize(textEl, attrEl, containerEl, text, attr);
    textEl.style.fontSize = fontSize + "px";
    attrEl.textContent = "";
    glitchIn(text, textEl, 500, () => {
      attrEl.textContent = attr;
      setTimeout(() => {
        attrEl.textContent = "";
        glitchOut(text, textEl, 300, () => {
          idx = (idx + 1) % QUOTES.length;
          setTimeout(showNext, 300);
        });
      }, 3500);
    });
  }

  setTimeout(showNext, 800);
}

function initSite() {
  updateClock();
  setInterval(updateClock, 1000);
  runTypewriter();
  animateBars();
  runQuoteCarousel();
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
