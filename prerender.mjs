// Пререндер SPA в статический HTML на этапе сборки.
// Рендерит каждый маршрут в headless-браузере (со скроллом, чтобы отработали
// анимации появления), затем сохраняет готовый HTML в dist/<route>/index.html.
// Итог: текст присутствует в разметке и индексируется без выполнения JS.

import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer";

const PORT = 4183;
const BASE = `http://localhost:${PORT}`;
const DIST = path.resolve("dist");
const viteBin = path.resolve("node_modules/vite/bin/vite.js");

// "/" рендерим последним: он же — SPA-fallback (dist/index.html),
// чтобы его перезапись не повлияла на остальные маршруты.
const routes = [
  "/privacy",
  "/terms",
  "/personal-data",
  "/articles/vip-family",
  "/articles/governess-salary",
  "/",
];

async function waitForServer(url, tries = 80) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      /* сервер ещё поднимается */
    }
    await sleep(500);
  }
  throw new Error("preview-сервер не запустился");
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0;
      const step = 400;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        total += step;
        if (total >= document.body.scrollHeight + window.innerHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 60);
    });
  });
}

async function makeStaticContentVisible(page) {
  // Framer Motion keeps off-screen sections at their initial opacity before
  // IntersectionObserver sees them. The static snapshot must stay readable
  // without JavaScript, so remove only those transient reveal styles.
  await page.evaluate(() => {
    document.querySelectorAll("[style]").forEach((element) => {
      const node = /** @type {HTMLElement} */ (element);

      if (node.style.opacity !== "0") return;

      node.style.removeProperty("opacity");
      if (/^translate[XY]?\(/.test(node.style.transform)) {
        node.style.removeProperty("transform");
      }

      if (!node.getAttribute("style")) {
        node.removeAttribute("style");
      }
    });
  });
}

const preview = spawn(
  process.execPath,
  [viteBin, "preview", "--port", String(PORT), "--strictPort"],
  { stdio: "ignore", windowsHide: true },
);

try {
  await waitForServer(BASE);

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  for (const route of routes) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });

    // Не тянем тяжёлое видео — для SEO-разметки оно не нужно.
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      if (req.resourceType() === "media") req.abort();
      else req.continue();
    });

    await page.goto(`${BASE}${route}`, { waitUntil: "networkidle2", timeout: 60000 });
    await autoScroll(page);
    await sleep(1200); // дать анимациям появления завершиться
    await makeStaticContentVisible(page);

    const inner = await page.evaluate(() => document.documentElement.outerHTML);
    const html = `<!doctype html>\n${inner}`;

    const outDir = route === "/" ? DIST : path.join(DIST, route);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(path.join(outDir, "index.html"), html, "utf8");
    console.log(`prerendered ${route}`);

    await page.close();
  }

  await browser.close();
} finally {
  preview.kill();
}
