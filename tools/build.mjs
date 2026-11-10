// Bouwt de DevNL-outro als HyperFrames-scenes (16:9 en 9:16) en de voorbeeldprojecten.
// Gebruik (vanuit de repo-root): node tools/build.mjs [--local-gsap]
// --local-gsap: laad GSAP uit assets/gsap.min.js in plaats van de CDN (voor offline renderen).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LOCAL_GSAP = process.argv.includes("--local-gsap");
const GSAP_CDN = "https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js";
const DUR = 5;
const HF_JSON = JSON.stringify({
  $schema: "https://hyperframes.heygen.com/schema/hyperframes.json",
  registry: "https://raw.githubusercontent.com/heygen-com/hyperframes/main/registry",
  paths: { blocks: "compositions", components: "compositions/components", assets: "assets" },
  media: { autoProxy: true },
}, null, 2) + "\n";
const attrJSON = (o) => JSON.stringify(o).replace(/&/g, "&amp;").replace(/'/g, "&#39;");
const ID = "devnl-outro";

const TR = 'transform="translate(-18.79 -21.31)"';
const TOP = [
  { fill: "#cc1d2e", d: "M283.33,21.31,240.15,83.46l-11,15.79-66.76,96-36.69,52.68-47,67.66H18.79V83.46h85.3a198.53,198.53,0,0,0,82.1-17.81Z" },
  { fill: "#e81f2d", d: "M501.77,83.46H374L453.08,197.1l35.37,50.79H408.9L307.11,101.64,205.27,247.89H119.44L75.21,315.55H595.39V177.11A93.62,93.62,0,0,0,501.77,83.46Z" },
];
const BOT = [
  { fill: "#12509b", d: "M541.69,419.4,494,487.06H408.9L307.11,633.32,205.27,487.06H125.72L240.15,651.5H112.44a93.65,93.65,0,0,1-93.65-93.65V419.4Z" },
  { fill: "#0f477f", d: "M595.39,419.4V651.5H510.12A197.58,197.58,0,0,0,428,669.31l-97.19,44.3L374,651.5l11-15.79,73-104.93,30.44-43.72,47.09-67.66Z" },
];
const svg = (p) => `<svg class="dno-piece" viewBox="0 0 576.6 692.3" xmlns="http://www.w3.org/2000/svg"><path fill="${p.fill}" d="${p.d}" ${TR}/></svg>`;

const LAYOUTS = {
  "16x9": { W: 1920, H: 1080, logoH: 230, logoCY: 340, textTop: 505, textSize: 64, textW: 1500, twoLine: false,
            divY: 628, divW: 520, zoneTop: 668, zoneH: 232, zoneW: 1040, nameSize: 54, linkSize: 32, plogo: 68 },
  "9x16": { W: 1080, H: 1920, logoH: 300, logoCY: 640, textTop: 860, textSize: 76, textW: 860, twoLine: true,
            divY: 1088, divW: 420, zoneTop: 1140, zoneH: 320, zoneW: 864, nameSize: 62, linkSize: 38, plogo: 84 },
};

const VARS = [
  { id: "ctaText", type: "string", label: "Call to action (zonder 'op DevNL')", default: "Bekijk mijn project", maxLength: 32,
    description: "Het begin van de eindtitel. 'op DevNL' wordt altijd automatisch toegevoegd." },
  { id: "productName", type: "string", label: "Productnaam", default: "", maxLength: 28,
    description: "Naam van het project of product. Leeg = geen productblok." },
  { id: "productLink", type: "string", label: "DevNL-link", default: "devnl.nl/s/42",
    description: "Korte showcase-link, bijvoorbeeld devnl.nl/s/42." },
  { id: "productLogo", type: "string", label: "Productlogo (pad in je project)", default: "",
    description: "Optioneel, bijvoorbeeld assets/logo.svg. Leeg = geen logo." },
  { id: "theme", type: "enum", label: "Thema", default: "light",
    options: [{ value: "light", label: "Licht" }, { value: "dark", label: "Donker" }] },
];

function scene(L) {
  const u = L.logoH / 692.3;
  const logoW = L.logoH * (576.6 / 692.3);
  const logoTop = L.logoCY - L.logoH / 2;
  const dyC = Math.round(L.H / 2 - L.logoCY);
  const gT = (51.87 * u).toFixed(2), gB = (-51.94 * u).toFixed(2);

  // Dot grid (static markup; revealed by an animated soft mask)
  const SP = 40, cx = L.W / 2, cy = L.H * 0.45, rx = L.W * 0.55, ry = L.H * 0.55;
  let dots = "";
  for (let y = SP / 2; y < L.H; y += SP) for (let x = SP / 2; x < L.W; x += SP) {
    if (((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 > 1.05) continue;
    dots += `<i style="left:${x - 2}px;top:${y - 2}px"></i>`;
  }
  const cyPct = Math.round((L.logoCY / L.H) * 100);
  const gsapSrc = LOCAL_GSAP ? "assets/gsap.min.js" : GSAP_CDN;

  return `<!doctype html>
<!--
  DevNL outro — ${L.W}×${L.H}, ${DUR} s, zonder geluid.
  Verplichte laatste scene voor video's die op DevNL worden gedeeld.
  Pas alleen de variabelen aan (ctaText, productName, productLink, productLogo, theme).
  "op DevNL", het logo en de animatie liggen vast. Zie README.md.
-->
<html lang="nl" data-composition-variables='${attrJSON(VARS)}'>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=${L.W}, height=${L.H}" />
    <title>DevNL outro ${L.W}×${L.H}</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: ${L.W}px; height: ${L.H}px; overflow: hidden; background: #fff; }
    </style>
  </head>
  <body>
    <div id="${ID}" data-composition-id="${ID}" data-width="${L.W}" data-height="${L.H}" data-start="0" data-duration="${DUR}">
      <style>
        #dno-stage {
          --dno-ground: #ffffff; --dno-ink: #0d1424; --dno-muted: #5b6474; --dno-dot: rgba(13, 20, 36, 0.18);
          --dno-red: #e81f2d; --dno-blue: #12509b;
          position: absolute; inset: 0; overflow: hidden; background: var(--dno-ground); font-family: Inter, sans-serif;
        }
        #dno-stage[data-theme="dark"] { --dno-ground: #0b0f17; --dno-ink: #f3f5f9; --dno-muted: #9aa4b5; --dno-dot: rgba(243, 245, 249, 0.22); }
        #dno-grid { position: absolute; inset: 0;
          -webkit-mask-image: radial-gradient(ellipse 55% 55% at 50% 45%, #000 0%, transparent 100%);
                  mask-image: radial-gradient(ellipse 55% 55% at 50% 45%, #000 0%, transparent 100%); }
        #dno-grid-reveal { position: absolute; inset: 0; --r: 0px;
          -webkit-mask-image: radial-gradient(circle at 50% ${cyPct}%, #000 calc(var(--r) * 0.55), transparent var(--r));
                  mask-image: radial-gradient(circle at 50% ${cyPct}%, #000 calc(var(--r) * 0.55), transparent var(--r)); }
        #dno-grid-reveal i { position: absolute; width: 4px; height: 4px; border-radius: 50%; background: var(--dno-dot); }
        #dno-logo { position: absolute; left: ${((L.W - logoW) / 2).toFixed(1)}px; top: ${logoTop}px; width: ${logoW.toFixed(1)}px; height: ${L.logoH}px; z-index: 2; }
        #dno-stage .dno-lw { position: absolute; inset: 0; }
        #dno-stage .dno-piece { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
        #dno-tagline { position: absolute; left: 0; width: 100%; top: ${L.textTop}px; text-align: center;
          font-weight: 800; font-size: ${L.textSize}px; letter-spacing: -0.025em; line-height: 1.12; color: var(--dno-ink); }
        #dno-stage .dno-mw { display: inline-block; overflow: hidden; vertical-align: top; padding: 0 0.04em 0.14em; margin-bottom: -0.14em; }
        #dno-stage .dno-w { display: inline-block; }
        #dno-divider { position: absolute; left: ${(L.W - L.divW) / 2}px; top: ${L.divY}px; width: ${L.divW}px; height: 3px;
          border-radius: 2px; background: linear-gradient(90deg, var(--dno-red) 0 50%, var(--dno-blue) 50% 100%); }
        #dno-zone { position: absolute; left: ${(L.W - L.zoneW) / 2}px; top: ${L.zoneTop}px; width: ${L.zoneW}px; height: ${L.zoneH}px;
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: ${Math.round(L.nameSize * 0.32)}px; }
        #dno-prod-row { display: flex; align-items: center; gap: ${Math.round(L.plogo * 0.3)}px; }
        #dno-prod-logo { width: ${L.plogo}px; height: ${L.plogo}px; object-fit: contain; }
        #dno-prod-name { font-weight: 800; font-size: ${L.nameSize}px; letter-spacing: -0.02em; color: var(--dno-ink); white-space: nowrap; }
        #dno-prod-link { font-family: "JetBrains Mono", monospace; font-size: ${L.linkSize}px; color: var(--dno-muted); white-space: nowrap; }
      </style>

      <div id="dno-stage" class="clip" data-start="0" data-duration="${DUR}" data-track-index="0" data-track-kind="graphics" data-layout-allow-overlap>
        <div id="dno-grid" data-layout-ignore><div id="dno-grid-reveal">${dots}</div></div>
        <div id="dno-logo" data-layout-allow-overflow>
          <div id="dno-move" class="dno-lw">
            <div id="dno-spin" class="dno-lw">
              <div id="dno-top-enter" class="dno-lw"><div id="dno-top-gap" class="dno-lw">${TOP.map(svg).join("")}</div></div>
              <div id="dno-bot-enter" class="dno-lw"><div id="dno-bot-gap" class="dno-lw">${BOT.map(svg).join("")}</div></div>
            </div>
          </div>
        </div>
        <div id="dno-tagline" data-layout-allow-overflow></div>
        <div id="dno-divider"></div>
        <div id="dno-zone">
          <div id="dno-prod-row">
            <img id="dno-prod-logo" alt="" />
            <div id="dno-prod-name"></div>
          </div>
          <div id="dno-prod-link"></div>
        </div>
      </div>

      <script src="${gsapSrc}"></script>
      <script>
        (function () {
          window.__timelines = window.__timelines || {};
          var V = (window.__hyperframes && window.__hyperframes.getVariables && window.__hyperframes.getVariables()) || {};
          document.getElementById("dno-stage").dataset.theme = V.theme === "dark" ? "dark" : "light";

          // --- Call to action: the user's part + the fixed "op DevNL" ---
          var cta = String(V.ctaText || "Bekijk mijn project").trim()
            .replace(/\\s+op\\s+devnl\\s*[.!]*$/i, "")   // "op DevNL" is always added by the scene
            .replace(/[.!?,:;\\s]+$/, "");
          if (!cta) cta = "Bekijk mijn project";
          var words = cta.split(/\\s+/).concat(["op", "DevNL"]);
          var ctaWords = words.length - 2;
          // Fit: ${L.twoLine ? "two lines (cta / op DevNL), the first line must fit" : "one line"} inside ${L.textW}px (Inter 800 ≈ 0.56 em per character)
          var chars = ${L.twoLine ? "Math.max(cta.length, 8)" : "cta.length + 9"};
          var size = Math.min(${L.textSize}, Math.floor(${L.textW} / (0.56 * chars)));
          var tag = document.getElementById("dno-tagline");
          tag.style.fontSize = size + "px";
          tag.innerHTML = words.map(function (w, i) {
            var safe = w.replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
            var br = ${L.twoLine ? 'i === ctaWords ? "<br/>" : ""' : '""'};
            return br + '<span class="dno-mw"><span id="dno-w' + i + '" class="dno-w">' + safe + "</span></span>";
          }).join(" ");

          // --- Product block ---
          var name = String(V.productName || "").trim();
          var link = String(V.productLink || "").trim().replace(/^https?:\\/\\//, "");
          var logo = String(V.productLogo || "").trim();
          document.getElementById("dno-prod-name").textContent = name;
          document.getElementById("dno-prod-link").textContent = link;
          var img = document.getElementById("dno-prod-logo");
          if (logo) img.src = logo; else img.style.display = "none";
          if (!name) document.getElementById("dno-prod-row").style.display = "none";
          if (!name && !link) document.getElementById("dno-zone").style.display = "none";

          // --- Timeline ---
          var tl = gsap.timeline({ paused: true });
          function hold(sel, props) { tl.fromTo(sel, props, Object.assign({}, props, { duration: 0.01 }), 0); }

          // 1. Big halves clap shut in the middle of the frame
          hold("#dno-move", { y: ${dyC}, scale: 3 });
          hold("#dno-top-gap", { y: ${gT} });
          hold("#dno-bot-gap", { y: ${gB} });
          tl.fromTo("#dno-top-enter", { y: ${-Math.round(L.H * 0.3)}, filter: "blur(6px)" }, { y: 0, filter: "blur(0px)", duration: 0.36, ease: "power2.in" }, 0.02);
          tl.fromTo("#dno-bot-enter", { y: ${Math.round(L.H * 0.3)}, filter: "blur(6px)" }, { y: 0, filter: "blur(0px)", duration: 0.36, ease: "power2.in" }, 0.02);
          tl.fromTo("#dno-spin", { scaleX: 1, scaleY: 1 }, { scaleX: 1.04, scaleY: 0.93, duration: 0.06, ease: "power2.out" }, 0.38);
          tl.to("#dno-spin", { scaleX: 1, scaleY: 1, duration: 0.3, ease: "back.out(3)" }, 0.44);
          // 2. Reopen, then float into place with one turn
          tl.to("#dno-top-gap", { y: 0, duration: 0.35, ease: "power3.out" }, 0.62);
          tl.to("#dno-bot-gap", { y: 0, duration: 0.35, ease: "power3.out" }, 0.62);
          tl.to("#dno-move", { y: 0, scale: 1, duration: 1.0, ease: "power3.inOut" }, 0.66);
          tl.fromTo("#dno-spin", { rotation: 0 }, { rotation: 360, duration: 1.0, ease: "power2.inOut" }, 0.66);
          // 3. Dot grid: one soft wave from the logo
          tl.fromTo("#dno-grid-reveal", { "--r": "0px" }, { "--r": "${Math.round(Math.max(L.W, L.H) * 1.1)}px", duration: 1.4, ease: "power2.out" }, 1.25);
          // 4. Call to action rises word by word from a mask, while the logo is still settling
          words.forEach(function (_, i) {
            tl.fromTo("#dno-w" + i, { yPercent: 115 }, { yPercent: 0, duration: 0.7, ease: "expo.out" }, 1.3 + i * 0.07);
          });
          var after = 1.3 + words.length * 0.07;
          // 5. Divider, then the product block
          tl.fromTo("#dno-divider", { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.5, ease: "expo.out" }, after + 0.15);
          tl.fromTo("#dno-prod-row", { opacity: 0, y: 14, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, ease: "expo.out" }, after + 0.4);
          tl.fromTo("#dno-prod-link", { opacity: 0, filter: "blur(6px)" }, { opacity: 1, filter: "blur(0px)", duration: 0.3, ease: "power4.out" }, after + 0.6);

          window.__timelines["${ID}"] = tl;
        })();
      </script>
    </div>
  </body>
</html>
`;
}

function demoIndex(L, file, values) {
  const gsapSrc = LOCAL_GSAP ? "assets/gsap.min.js" : GSAP_CDN;
  return `<!doctype html>
<html lang="nl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=${L.W}, height=${L.H}" />
    <script src="${gsapSrc}"></script>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: ${L.W}px; height: ${L.H}px; overflow: hidden; background: #fff; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${DUR}" data-width="${L.W}" data-height="${L.H}">
      <!-- Je eigen scenes komen hiervoor. De DevNL-outro is altijd de laatste scene. -->
      <div
        id="${ID}"
        data-composition-id="${ID}"
        data-composition-src="compositions/devnl-outro/${file}"
        data-start="0"
        data-duration="${DUR}"
        data-track-index="1"
        data-track-kind="graphics"
        data-width="${L.W}"
        data-height="${L.H}"
        data-variable-values='${attrJSON(values)}'
      ></div>
    </div>
    <script>
      window.__timelines = window.__timelines || {};
      window.__timelines["main"] = gsap.timeline({ paused: true });
    </script>
  </body>
</html>
`;
}

// --- write scene files ---
const sceneDir = path.join(REPO, "scene");
fs.mkdirSync(sceneDir, { recursive: true });
for (const [ratio, L] of Object.entries(LAYOUTS)) fs.writeFileSync(path.join(sceneDir, `devnl-outro-${ratio}.html`), scene(L));

// --- demo projects: voorbeeld/ (16:9) and voorbeeld-verticaal/ (9:16) ---
const values = { ctaText: "Probeer mijn app", productName: "Taskly", productLink: "devnl.nl/s/42", productLogo: "assets/voorbeeld-logo.svg", theme: "light" };
export function writeDemo(dir, ratio, vals) {
  const L = LAYOUTS[ratio], file = `devnl-outro-${ratio}.html`;
  fs.mkdirSync(path.join(dir, "compositions/devnl-outro"), { recursive: true });
  fs.mkdirSync(path.join(dir, "assets"), { recursive: true });
  fs.copyFileSync(path.join(sceneDir, file), path.join(dir, "compositions/devnl-outro", file));
  fs.writeFileSync(path.join(dir, "assets/voorbeeld-logo.svg"),
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7c5cff"/><stop offset="1" stop-color="#22c1c3"/></linearGradient></defs><rect width="100" height="100" rx="24" fill="url(#g)"/><path d="M30 64 L50 32 L70 64 Z" fill="#fff"/></svg>`);
  if (LOCAL_GSAP) fs.copyFileSync(path.join(REPO, "tools/gsap.min.js"), path.join(dir, "assets/gsap.min.js"));
  fs.writeFileSync(path.join(dir, "index.html"), demoIndex(L, file, vals));
  fs.writeFileSync(path.join(dir, "hyperframes.json"), HF_JSON);
  fs.writeFileSync(path.join(dir, "package.json"), JSON.stringify({ name: "devnl-outro-" + path.basename(dir), private: true, type: "module",
    scripts: { dev: "npx --yes hyperframes@0.9.31 preview", check: "npx --yes hyperframes@0.9.31 check", render: "npx --yes hyperframes@0.9.31 render" } }, null, 2) + "\n");
}
{
  writeDemo(path.join(REPO, "voorbeeld"), "16x9", values);
  writeDemo(path.join(REPO, "voorbeeld-verticaal"), "9x16", values);
}
console.log("ok", REPO);
