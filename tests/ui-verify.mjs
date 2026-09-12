/**
 * Renders the built site in a real browser and asserts the things a compiled
 * stylesheet cannot prove: no horizontal overflow, no console errors, working
 * disclosure navigation, visible focus rings and correct grid collapse.
 *
 *   npm run build && npm start
 *   npm run verify:ui                      # defaults to http://127.0.0.1:3000
 *   BASE_URL=http://127.0.0.1:3211 npm run verify:ui
 *
 * Screenshots land in tests/screenshots/ for manual review.
 */
import { mkdirSync } from "node:fs";
import { chromium } from "@playwright/test";

const BASE = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const SHOTS = new URL("./screenshots/", import.meta.url).pathname.slice(1);
const routes = ["/", "/services", "/about", "/contact", "/design-system"];
const widths = [360, 375, 390, 430, 768, 1024, 1280, 1440];

mkdirSync(SHOTS, { recursive: true });

const problems = [];
const log = (m) => console.log(m);
const browser = await chromium.launch();

/* --- every route at every breakpoint: status, overflow, console --- */
for (const width of widths) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    deviceScaleFactor: 1,
  });
  for (const route of routes) {
    const page = await context.newPage();
    const consoleErrors = [];
    page.on("console", (m) => {
      if (m.type() === "error") consoleErrors.push(m.text());
    });
    page.on("pageerror", (e) => consoleErrors.push(`pageerror: ${e.message}`));

    const res = await page.goto(BASE + route, { waitUntil: "networkidle" });
    if (res.status() !== 200)
      problems.push(`${route} @${width}: HTTP ${res.status()}`);

    const overflow = await page.evaluate(() => {
      const d = document.documentElement;
      const offenders = [];
      if (d.scrollWidth > d.clientWidth) {
        for (const el of document.querySelectorAll("body *")) {
          const r = el.getBoundingClientRect();
          if (r.right > d.clientWidth + 1 || r.left < -1)
            offenders.push(
              `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)}`,
            );
        }
      }
      return {
        scrollWidth: d.scrollWidth,
        clientWidth: d.clientWidth,
        offenders: offenders.slice(0, 5),
      };
    });
    if (overflow.scrollWidth > overflow.clientWidth)
      problems.push(
        `${route} @${width}: overflow ${overflow.scrollWidth}>${overflow.clientWidth} :: ${overflow.offenders.join(" | ")}`,
      );
    if (consoleErrors.length)
      problems.push(`${route} @${width}: console ${consoleErrors.join(" ; ")}`);
    await page.close();
  }
  await context.close();
}
log(`breakpoint sweep: ${routes.length * widths.length} route/width combinations`);

/* --- mobile disclosure navigation --- */
{
  const context = await browser.newContext({
    viewport: { width: 375, height: 780 },
  });
  const page = await context.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });

  const toggle = page.locator('button[aria-controls="mobile-nav-panel"]');
  if (!(await toggle.isVisible())) problems.push("mobile: toggle not visible");
  if ((await toggle.getAttribute("aria-expanded")) !== "false")
    problems.push("mobile: aria-expanded not false when closed");
  if ((await toggle.getAttribute("aria-label")) !== "Open menu")
    problems.push("mobile: closed label wrong");
  if (await page.locator("#mobile-nav-panel").count())
    problems.push("mobile: panel present before open");

  await toggle.click();
  const panel = page.locator("#mobile-nav-panel");
  if (!(await panel.isVisible())) problems.push("mobile: panel did not open");
  if ((await toggle.getAttribute("aria-expanded")) !== "true")
    problems.push("mobile: aria-expanded not true when open");
  if ((await toggle.getAttribute("aria-label")) !== "Close menu")
    problems.push("mobile: open label wrong");

  /* The panel has an entrance transition, so its box is still moving for the
     first frames. This assertion is about where the panel comes to rest, not
     where it starts — wait for the animation to finish rather than racing it. */
  await panel.evaluate((node) =>
    Promise.all(node.getAnimations().map((a) => a.finished)),
  );

  const panelBox = await panel.boundingBox();
  const headerBox = await page.locator("header").boundingBox();
  if (Math.abs(panelBox.y - (headerBox.y + headerBox.height)) > 1)
    problems.push("mobile: panel not flush under header");
  if (panelBox.width !== 375)
    problems.push(`mobile: panel width ${panelBox.width} != 375`);

  const links = page.locator("#mobile-nav-panel nav a");
  const count = await links.count();
  if (count < 4) problems.push(`mobile: expected 4 links, got ${count}`);
  for (let i = 0; i < count; i++) {
    const b = await links.nth(i).boundingBox();
    if (b.height < 44)
      problems.push(`mobile: link ${i} touch target ${Math.round(b.height)}px < 44`);
  }

  await page.screenshot({ path: SHOTS + "menu-375.png" });

  await page.keyboard.press("Escape");
  if (await page.locator("#mobile-nav-panel").count())
    problems.push("mobile: Escape did not close panel");
  const refocused = await page.evaluate(() =>
    document.activeElement?.getAttribute("aria-label"),
  );
  if (refocused !== "Open menu")
    problems.push(`mobile: focus not returned to toggle (got ${refocused})`);

  await toggle.click();
  await links.filter({ hasText: "Services" }).first().click();
  await page.waitForURL("**/services");
  if (await page.locator("#mobile-nav-panel").count())
    problems.push("mobile: panel stayed open after navigation");
  await context.close();
  log("mobile disclosure navigation: open, escape, focus return, close-on-navigate");
}

/* --- skip link and focus rings --- */
{
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });
  const page = await context.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  await page.waitForTimeout(400); // the skip link slides in over --duration-fast
  const skip = await page.evaluate(() => {
    const el = document.activeElement;
    const cs = getComputedStyle(el);
    return {
      text: el.textContent.trim(),
      top: Math.round(el.getBoundingClientRect().top),
      outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor}`,
    };
  });
  if (skip.text !== "Skip to content")
    problems.push(`skip link: first tab stop is "${skip.text}"`);
  if (skip.top < 0) problems.push(`skip link: offscreen on focus (${skip.top})`);
  if (!skip.outline.includes("2px") || skip.outline.includes("none"))
    problems.push(`skip link: no focus ring (${skip.outline})`);
  log(`skip link: "${skip.text}" top=${skip.top} outline=${skip.outline}`);
  await context.close();
}

/* --- desktop header --- */
{
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });
  const page = await context.newPage();
  await page.goto(BASE + "/services", { waitUntil: "networkidle" });

  const active = (
    await page.locator("nav[aria-label='Main'] a[aria-current='page']").innerText()
  ).trim();
  if (active !== "Services") problems.push(`desktop nav: active item "${active}"`);

  const header = await page.locator("header").boundingBox();
  if (Math.round(header.height) !== 65) // h-16 bar plus its 1px bottom border
    problems.push(`header height ${header.height} != 65`);

  const wordmark = await page.locator("header a[href='/']").first().boundingBox();
  const ctaBtn = await page.locator("header a[href='/contact']").last().boundingBox();
  const wmMid = wordmark.y + wordmark.height / 2;
  const ctaMid = ctaBtn.y + ctaBtn.height / 2;
  if (Math.abs(wmMid - ctaMid) > 1.5)
    problems.push(`header: wordmark/CTA misaligned (${wmMid} vs ${ctaMid})`);

  await page.evaluate(() => window.scrollTo(0, 1200));
  await page.waitForTimeout(150);
  const stuck = await page.locator("header").boundingBox();
  if (Math.round(stuck.y) !== 0) problems.push(`header not sticky (y=${stuck.y})`);
  log(`header: h=${header.height} active="${active}" sticky ok`);
  await context.close();
}

/* --- footer grid collapse --- */
for (const [width, expected] of [
  [375, 1],
  [768, 2],
  [1280, 4],
]) {
  const context = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await context.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const cols = await page.evaluate(
    () =>
      getComputedStyle(document.querySelector("footer .grid")).gridTemplateColumns.split(
        " ",
      ).length,
  );
  if (cols !== expected)
    problems.push(`footer @${width}: ${cols} columns, expected ${expected}`);
  log(`footer @${width}: ${cols} cols`);
  await context.close();
}

/* --- the footer's closing prompt must not point at the page you are on --- */
{
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  for (const [route, expected] of [
    ["/", true],
    ["/services", true],
    ["/about", true],
    ["/contact", false],
  ]) {
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    // scoped to the closing row's heading: the footer nav always carries a
    // plain "Contact" link, which is navigation rather than a CTA
    const present =
      (await page
        .getByRole("heading", { name: /Ready to get your books in order/ })
        .count()) > 0;
    if (present !== expected)
      problems.push(
        `footer @${route}: closing prompt ${present ? "present" : "absent"}, expected ${expected ? "present" : "absent"}`,
      );

    // placeholder contact details must be listed, never offered as live channels
    const deadChannels = await page
      .locator("footer a[href^='tel:'], footer a[href^='mailto:']")
      .count();
    if (deadChannels > 0)
      problems.push(
        `footer @${route}: ${deadChannels} tel:/mailto: links to placeholder contacts`,
      );
  }
  log("footer closing: suppressed on /contact, no tel:/mailto: placeholders");
  await context.close();
}

/* --- hero CTAs stack full width and keep their touch target --- */
{
  const context = await browser.newContext({ viewport: { width: 360, height: 900 } });
  const page = await context.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const btns = page.locator("main section:first-of-type a");
  const count = await btns.count();
  const boxes = [];
  for (let i = 0; i < count; i++) boxes.push(await btns.nth(i).boundingBox());
  for (const b of boxes) {
    if (b.height < 44) problems.push(`hero CTA height ${b.height} < 44 @360`);
    if (b.width > 360) problems.push("hero CTA overflows viewport @360");
  }
  log(
    `hero CTAs @360: ${boxes.map((b) => `${Math.round(b.width)}x${Math.round(b.height)}`).join(", ")}`,
  );
  await page.screenshot({ path: SHOTS + "home-360.png", fullPage: true });
  await context.close();
}

/* --- Phase 0 form primitives: labels, hints, errors, disabled, focus --- */
{
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });
  const page = await context.newPage();
  await page.goto(BASE + "/design-system", { waitUntil: "networkidle" });

  const orphanLabels = await page.evaluate(
    () =>
      [...document.querySelectorAll("label[for]")].filter(
        (l) => !document.getElementById(l.htmlFor),
      ).length,
  );
  if (orphanLabels) problems.push(`forms: ${orphanLabels} label(s) point at no control`);

  const brokenDescribedBy = await page.evaluate(
    () =>
      [...document.querySelectorAll("[aria-describedby]")].filter((el) =>
        el
          .getAttribute("aria-describedby")
          .split(/\s+/)
          .some((id) => !document.getElementById(id)),
      ).length,
  );
  if (brokenDescribedBy)
    problems.push(`forms: ${brokenDescribedBy} broken aria-describedby reference(s)`);

  await page.locator("input").first().focus();
  const ring = await page.evaluate(() => {
    const cs = getComputedStyle(document.activeElement);
    return `${cs.outlineWidth} ${cs.outlineStyle}`;
  });
  if (!ring.startsWith("2px")) problems.push(`forms: input focus ring is "${ring}"`);

  const invalid = await page.evaluate(() => {
    const el = document.querySelector("[aria-invalid='true']");
    return el ? getComputedStyle(el).borderTopColor : null;
  });
  if (invalid !== "rgb(154, 74, 50)")
    problems.push(`forms: aria-invalid border is ${invalid}, expected the negative token`);

  const shortControls = await page.evaluate(
    () =>
      [...document.querySelectorAll("input, select")].filter(
        (el) => el.getBoundingClientRect().height < 44,
      ).length,
  );
  if (shortControls)
    problems.push(`forms: ${shortControls} control(s) under the 44px touch target`);

  log(`form primitives: labels, describedby, focus ring ${ring}, invalid ${invalid}`);
  await context.close();
}

/* --- homepage structure, headings and CTA routing --- */
{
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });
  const page = await context.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });

  const h1s = await page.locator("main h1").allInnerTexts();
  if (h1s.length !== 1) problems.push(`home: ${h1s.length} h1 elements, expected 1`);

  // heading levels must not skip on the way down
  const levels = await page.evaluate(() =>
    [...document.querySelectorAll("main h1, main h2, main h3, main h4")].map((el) =>
      Number(el.tagName[1]),
    ),
  );
  for (let i = 1; i < levels.length; i++)
    if (levels[i] - levels[i - 1] > 1)
      problems.push(`home: heading jumps h${levels[i - 1]} -> h${levels[i]}`);

  const sections = await page.locator("main > section").count();
  if (sections < 8) problems.push(`home: ${sections} sections, expected 8`);

  // every CTA must resolve to a real route
  const hrefs = await page.evaluate(() =>
    [...document.querySelectorAll("main a")].map((a) => a.getAttribute("href")),
  );
  const allowed = new Set(["/", "/services", "/about", "/contact"]);
  // Service links carry an anchor (/services#tax-preparation). The route is the
  // part that has to exist, so compare with the fragment stripped.
  const bad = [...new Set(hrefs)].filter(
    (h) => !allowed.has(h.replace(/#.*$/, "")),
  );
  if (bad.length) problems.push(`home: unexpected link targets ${bad.join(", ")}`);

  const emptyNames = await page.evaluate(
    () =>
      [...document.querySelectorAll("main a")].filter(
        (a) => !(a.innerText.trim() || a.getAttribute("aria-label")),
      ).length,
  );
  if (emptyNames) problems.push(`home: ${emptyNames} link(s) with no accessible name`);

  // illustrative figures must be labelled as such
  const bodyText = await page.locator("main").innerText();
  if (!/illustrative/i.test(bodyText))
    problems.push("home: financial figures shown without an illustrative label");

  log(`home: 1 h1, ${sections} sections, ${hrefs.length} links all routable`);
  await context.close();
}

/* --- services page structure, anchors and CTA routing --- */
{
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });
  const page = await context.newPage();
  await page.goto(BASE + "/services", { waitUntil: "networkidle" });

  const h1s = await page.locator("main h1").allInnerTexts();
  if (h1s.length !== 1)
    problems.push(`services: ${h1s.length} h1 elements, expected 1`);

  const levels = await page.evaluate(() =>
    [...document.querySelectorAll("main h1, main h2, main h3, main h4")].map((el) =>
      Number(el.tagName[1]),
    ),
  );
  for (let i = 1; i < levels.length; i++)
    if (levels[i] - levels[i - 1] > 1)
      problems.push(`services: heading jumps h${levels[i - 1]} -> h${levels[i]}`);

  // hero + index + 5 service sections + catch-up + one closing band
  const sections = await page.locator("main > section").count();
  if (sections !== 9) problems.push(`services: ${sections} sections, expected 9`);

  // the page must close on exactly one consultation band, not a stack
  const closingBands = await page
    .getByRole("heading", { level: 2, name: /Not Sure Where to Start|Finances Organized/ })
    .count();
  if (closingBands !== 1)
    problems.push(`services: ${closingBands} closing CTA bands, expected 1`);

  // each of the six services must be an addressable, labelled landmark
  const ids = [
    "monthly-bookkeeping",
    "tax-preparation",
    "payroll-support",
    "business-accounting",
    "financial-reporting",
    "catch-up-bookkeeping",
  ];
  for (const id of ids) {
    const sec = page.locator(`section#${id}`);
    if ((await sec.count()) !== 1) {
      problems.push(`services: section#${id} missing`);
      continue;
    }
    const labelled = await sec.getAttribute("aria-labelledby");
    if (!labelled || !(await page.locator(`#${labelled}`).count()))
      problems.push(`services: section#${id} has no resolvable aria-labelledby`);
  }

  // every in-page anchor must point at something that exists
  const danglingAnchors = await page.evaluate(() =>
    [...document.querySelectorAll('main a[href^="#"], main a[href*="#"]')]
      .map((a) => a.getAttribute("href").split("#")[1])
      .filter((frag) => frag && !document.getElementById(frag)),
  );
  if (danglingAnchors.length)
    problems.push(`services: dangling anchors ${danglingAnchors.join(", ")}`);

  const hrefs = await page.evaluate(() =>
    [...document.querySelectorAll("main a")].map((a) => a.getAttribute("href")),
  );
  const allowedRoutes = new Set(["/", "/services", "/about", "/contact"]);
  // Same-page anchors ("#tax-preparation") have no route part; the dangling
  // anchor check above already proves they resolve.
  const badHrefs = [...new Set(hrefs)].filter(
    (h) => !h.startsWith("#") && !allowedRoutes.has(h.replace(/#.*$/, "")),
  );
  if (badHrefs.length)
    problems.push(`services: unexpected link targets ${badHrefs.join(", ")}`);

  const emptyNames = await page.evaluate(
    () =>
      [...document.querySelectorAll("main a")].filter(
        (a) => !(a.innerText.trim() || a.getAttribute("aria-label")),
      ).length,
  );
  if (emptyNames)
    problems.push(`services: ${emptyNames} link(s) with no accessible name`);

  // scroll-mt must clear the sticky header when an index link is followed
  await page.locator('main a[href="#financial-reporting"]').first().click();
  await page.waitForTimeout(700);
  const landing = await page.evaluate(() => {
    const top = document.getElementById("financial-reporting").getBoundingClientRect().top;
    return { top, header: document.querySelector("header").getBoundingClientRect().height };
  });
  if (landing.top < landing.header)
    problems.push(
      `services: #financial-reporting lands under the header (top ${Math.round(landing.top)} < ${landing.header})`,
    );

  const bodyText = await page.locator("main").innerText();
  if (!/illustrative/i.test(bodyText))
    problems.push("services: financial figures shown without an illustrative label");

  log(
    `services: 1 h1, ${sections} sections, 6 anchored services, ${hrefs.length} links all routable`,
  );
  await context.close();
}

/* --- about page structure and CTA routing --- */
{
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });
  const page = await context.newPage();
  await page.goto(BASE + "/about", { waitUntil: "networkidle" });

  const h1s = await page.locator("main h1").allInnerTexts();
  if (h1s.length !== 1) problems.push(`about: ${h1s.length} h1 elements, expected 1`);

  const levels = await page.evaluate(() =>
    [...document.querySelectorAll("main h1, main h2, main h3, main h4")].map((el) =>
      Number(el.tagName[1]),
    ),
  );
  for (let i = 1; i < levels.length; i++)
    if (levels[i] - levels[i - 1] > 1)
      problems.push(`about: heading jumps h${levels[i - 1]} -> h${levels[i]}`);

  const sections = await page.locator("main > section").count();
  if (sections !== 8) problems.push(`about: ${sections} sections, expected 8`);

  const hrefs = await page.evaluate(() =>
    [...document.querySelectorAll("main a")].map((a) => a.getAttribute("href")),
  );
  const allowedRoutes = new Set(["/", "/services", "/about", "/contact"]);
  const badHrefs = [...new Set(hrefs)].filter(
    (h) => !h.startsWith("#") && !allowedRoutes.has(h.replace(/#.*$/, "")),
  );
  if (badHrefs.length)
    problems.push(`about: unexpected link targets ${badHrefs.join(", ")}`);

  const emptyNames = await page.evaluate(
    () =>
      [...document.querySelectorAll("main a")].filter(
        (a) => !(a.innerText.trim() || a.getAttribute("aria-label")),
      ).length,
  );
  if (emptyNames) problems.push(`about: ${emptyNames} link(s) with no accessible name`);

  // the page must reach /contact and /services from its own body copy
  const routed = new Set(hrefs.map((h) => h.replace(/#.*$/, "")));
  for (const route of ["/contact", "/services"])
    if (!routed.has(route)) problems.push(`about: no link to ${route}`);

  // no invented credentials, counts or figures may appear on this page
  const bodyText = await page.locator("main").innerText();
  const forbidden = [
    /\bCPA\b/,
    /\bcertified\b/i,
    /\baward/i,
    /\b\d+\+?\s*(years|clients|customers)\b/i,
    /\$\s?\d/,
    /\b\d{1,3}%/,
  ];
  for (const pattern of forbidden)
    if (pattern.test(bodyText))
      problems.push(`about: unsupported claim matching ${pattern} in body copy`);

  log(`about: 1 h1, ${sections} sections, ${hrefs.length} links all routable`);
  await context.close();
}

/* --- contact page structure, consultation form and honest demo state --- */
{
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });
  const page = await context.newPage();
  await page.goto(BASE + "/contact", { waitUntil: "networkidle" });

  const h1s = await page.locator("main h1").allInnerTexts();
  if (h1s.length !== 1) problems.push(`contact: ${h1s.length} h1 elements, expected 1`);

  const levels = await page.evaluate(() =>
    [...document.querySelectorAll("main h1, main h2, main h3, main h4")].map((el) =>
      Number(el.tagName[1]),
    ),
  );
  for (let i = 1; i < levels.length; i++)
    if (levels[i] - levels[i - 1] > 1)
      problems.push(`contact: heading jumps h${levels[i - 1]} -> h${levels[i]}`);

  const sections = await page.locator("main > section").count();
  if (sections !== 5) problems.push(`contact: ${sections} sections, expected 5`);

  // every control must have a real label, and nothing may describe a missing id
  const formIssues = await page.evaluate(() => {
    const controls = [...document.querySelectorAll("main input, main select, main textarea")];
    const unlabelled = controls.filter(
      (el) => !document.querySelector(`label[for="${el.id}"]`),
    ).length;
    const broken = [...document.querySelectorAll("main [aria-describedby]")].filter((el) =>
      el
        .getAttribute("aria-describedby")
        .split(/\s+/)
        .some((id) => !document.getElementById(id)),
    ).length;
    const short = controls.filter(
      (el) => el.tagName !== "TEXTAREA" && el.getBoundingClientRect().height < 44,
    ).length;
    return { count: controls.length, unlabelled, broken, short };
  });
  if (formIssues.count !== 8)
    problems.push(`contact: ${formIssues.count} form controls, expected 8`);
  if (formIssues.unlabelled)
    problems.push(`contact: ${formIssues.unlabelled} control(s) with no label`);
  if (formIssues.broken)
    problems.push(`contact: ${formIssues.broken} broken aria-describedby reference(s)`);
  if (formIssues.short)
    problems.push(`contact: ${formIssues.short} control(s) under the 44px touch target`);

  // submitting empty must flag the required fields rather than silently pass
  await page.locator('main button[type="submit"]').click();
  await page.waitForTimeout(200);
  const invalidCount = await page.locator("main [aria-invalid='true']").count();
  if (invalidCount !== 3)
    problems.push(`contact: empty submit flagged ${invalidCount} fields, expected 3`);
  const focused = await page.evaluate(() => document.activeElement?.id);
  if (focused !== "inquiry-name")
    problems.push(`contact: focus not moved to first invalid field (got ${focused})`);

  // a successful submit must not claim the inquiry was delivered
  await page.fill("#inquiry-name", "Test Person");
  await page.fill("#inquiry-email", "test@example.com");
  await page.fill("#inquiry-message", "Checking the demo state.");
  await page.locator('main button[type="submit"]').click();
  await page.waitForTimeout(200);
  const confirmation = await page.locator("main [role='status']").innerText();
  if (!/demonstration/i.test(confirmation))
    problems.push("contact: submit confirmation does not disclose the demo state");
  // Delivery verbs are fine inside a negated clause ("nothing was sent"), so the
  // check runs per clause rather than over the whole string.
  const impliesDelivery = confirmation
    .split(/[.,;]/)
    .some(
      (clause) =>
        /\b(sent|received|submitted|delivered|in touch)\b/i.test(clause) &&
        !/\b(not|no|nothing|never)\b/i.test(clause),
    );
  if (impliesDelivery)
    problems.push(`contact: confirmation implies delivery :: ${confirmation}`);

  // Both halves of this swap replace the element holding focus. If focus is
  // allowed to fall back to <body>, a keyboard user is silently returned to
  // the top of the document and a screen reader announces nothing.
  const afterSubmit = await page.evaluate(() =>
    document.activeElement?.getAttribute("role"),
  );
  if (afterSubmit !== "status")
    problems.push(`contact: focus after submit is role="${afterSubmit}", expected status`);

  await page.getByRole("button", { name: /return to the form/i }).click();
  await page.waitForSelector("#inquiry-name");
  const afterReturn = await page.evaluate(() => document.activeElement?.id);
  if (afterReturn !== "inquiry-name")
    problems.push(`contact: focus after returning to the form is ${afterReturn}`);
  log("contact focus: retained across both directions of the demo-state swap");

  await page.reload({ waitUntil: "networkidle" });

  const hrefs = await page.evaluate(() =>
    [...document.querySelectorAll("main a")].map((a) => a.getAttribute("href")),
  );
  const allowedRoutes = new Set(["/", "/services", "/about", "/contact"]);
  const badHrefs = [...new Set(hrefs)].filter(
    (h) => !h.startsWith("#") && !allowedRoutes.has(h.replace(/#.*$/, "")),
  );
  if (badHrefs.length)
    problems.push(`contact: unexpected link targets ${badHrefs.join(", ")}`);
  if (!hrefs.some((h) => h.replace(/#.*$/, "") === "/services"))
    problems.push("contact: no link to /services");

  const emptyNames = await page.evaluate(
    () =>
      [...document.querySelectorAll("main a")].filter(
        (a) => !(a.innerText.trim() || a.getAttribute("aria-label")),
      ).length,
  );
  if (emptyNames) problems.push(`contact: ${emptyNames} link(s) with no accessible name`);

  // no credentials, and no response-time or outcome promise
  const bodyText = await page.locator("main").innerText();
  const forbidden = [
    /\bCPA\b/,
    /\bcertified\b/i,
    /\baward/i,
    /\bguarantee/i,
    /\bfree consultation/i,
    /within \d+ (business )?(hour|day)/i,
    /\b\d+\+?\s*(years|clients|customers)\b/i,
    /\$\s?\d/,
    /\b\d{1,3}%/,
  ];
  for (const pattern of forbidden)
    if (pattern.test(bodyText))
      problems.push(`contact: unsupported claim matching ${pattern} in body copy`);

  log(
    `contact: 1 h1, ${sections} sections, ${formIssues.count} labelled controls, demo state honest`,
  );
  await context.close();
}

/* --- contact form geometry across the widths the brief asks to be reviewed --- */
for (const width of [360, 375, 390, 430, 768, 1024]) {
  const context = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await context.newPage();
  await page.goto(BASE + "/contact", { waitUntil: "networkidle" });

  const geometry = await page.evaluate(() => {
    const controls = [
      ...document.querySelectorAll("main input, main select, main textarea"),
    ];
    const rects = controls.map((el) => el.getBoundingClientRect());
    const widest = Math.max(...rects.map((r) => r.width));
    const card = document
      .querySelector("main form")
      .closest("div.rounded-md")
      .getBoundingClientRect();
    return {
      columns: new Set(rects.map((r) => Math.round(r.left))).size,
      ragged: rects.filter((r) => r.width < widest / 2.2).length,
      overflow: rects.filter((r) => r.right > card.right + 1).length,
      short: rects.filter(
        (r, i) => controls[i].tagName !== "TEXTAREA" && r.height < 44,
      ).length,
      textarea: Math.round(
        rects[controls.findIndex((el) => el.tagName === "TEXTAREA")].height,
      ),
    };
  });

  // below sm the grid must collapse to one column of full-width fields
  const expected = width < 640 ? 1 : 2;
  if (geometry.columns !== expected)
    problems.push(
      `contact @${width}: form uses ${geometry.columns} column(s), expected ${expected}`,
    );
  if (geometry.ragged)
    problems.push(`contact @${width}: ${geometry.ragged} control(s) not filling their column`);
  if (geometry.overflow)
    problems.push(`contact @${width}: ${geometry.overflow} control(s) overflow the card`);
  if (geometry.short)
    problems.push(`contact @${width}: ${geometry.short} control(s) under 44px`);
  if (geometry.textarea < 120)
    problems.push(`contact @${width}: textarea only ${geometry.textarea}px tall`);

  // the form must be reachable before the direct-contact block on a phone
  const formFirst = await page.evaluate(() => {
    const form = document.querySelector("main form");
    const direct = [...document.querySelectorAll("main h3")].find((h) =>
      h.textContent.includes("Prefer to Reach Out"),
    );
    return form.getBoundingClientRect().top < direct.getBoundingClientRect().top;
  });
  if (width < 1024 && !formFirst)
    problems.push(`contact @${width}: direct-contact block sits above the form`);

  await context.close();
}
log("contact form: one column under sm, full-width fields, form ahead of direct contact");

/* --- reduced motion must leave content visible --- */
{
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const hidden = await page.evaluate(
    () =>
      [...document.querySelectorAll(".reveal")].filter(
        (el) => Number(getComputedStyle(el).opacity) < 1,
      ).length,
  );
  if (hidden)
    problems.push(`reduced motion: ${hidden} reveal block(s) still transparent`);
  log(`reduced motion: all reveal blocks visible`);
  await context.close();
}

/* --- keyboard path through the homepage --- */
{
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });
  const page = await context.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const seen = [];
  let ringless = 0;
  for (let i = 0; i < 30; i++) {
    await page.keyboard.press("Tab");
    const info = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const cs = getComputedStyle(el);
      return {
        tag: el.tagName.toLowerCase(),
        ring: cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0,
      };
    });
    if (!info) break;
    seen.push(info.tag);
    if (!info.ring) ringless++;
  }
  if (ringless) problems.push(`keyboard: ${ringless} focused element(s) with no ring`);
  if (seen.length < 15)
    problems.push(`keyboard: only ${seen.length} focusable stops reached`);
  log(`keyboard: ${seen.length} stops, all with visible focus rings`);
  await context.close();
}

/* --- metadata, crawl surfaces and site-wide claim integrity --- */
{
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  const publicRoutes = ["/", "/services", "/about", "/contact"];
  const titles = new Map();
  const descriptions = new Map();

  for (const route of publicRoutes) {
    await page.goto(BASE + route, { waitUntil: "networkidle" });

    const meta = await page.evaluate(() => ({
      title: document.title,
      description:
        document
          .querySelector('meta[name="description"]')
          ?.getAttribute("content") ?? "",
      robots:
        document.querySelector('meta[name="robots"]')?.getAttribute("content") ??
        "",
      canonical:
        document.querySelector('link[rel="canonical"]')?.getAttribute("href") ??
        "",
      h1s: [...document.querySelectorAll("h1")].map((h) => h.innerText.trim()),
      bodyText: document.body.innerText,
      social: Object.fromEntries(
        [
          "og:title",
          "og:description",
          "og:type",
          "og:site_name",
          "og:url",
          "twitter:card",
          "twitter:title",
          "twitter:description",
        ].map((key) => [
          key,
          document
            .querySelector(`meta[property="${key}"], meta[name="${key}"]`)
            ?.getAttribute("content") ?? "",
        ]),
      ),
    }));

    if (!meta.title) problems.push(`${route}: no title`);
    if (meta.title.length > 65)
      problems.push(`${route}: title ${meta.title.length} chars, over 65`);
    if (!meta.description) problems.push(`${route}: no meta description`);
    if (meta.description.length > 165)
      problems.push(
        `${route}: description ${meta.description.length} chars, over 165`,
      );
    if (meta.description === meta.title)
      problems.push(`${route}: description merely repeats the title`);
    if (meta.h1s.length !== 1)
      problems.push(`${route}: ${meta.h1s.length} h1 elements, expected 1`);
    if (/noindex/.test(meta.robots))
      problems.push(`${route}: public page is noindex`);

    // No origin is configured in this environment, so Next must not fall back
    // to a localhost canonical — that would be an actively wrong signal.
    if (meta.canonical && /localhost|127\.0\.0\.1/.test(meta.canonical))
      problems.push(`${route}: canonical points at ${meta.canonical}`);

    // A shared link must not describe the page differently from its own
    // <meta>, so these are asserted against the tags the page already
    // publishes rather than against literals.
    for (const [key, expected] of [
      ["og:description", meta.description],
      ["twitter:description", meta.description],
      ["og:type", "website"],
      ["twitter:card", "summary"],
    ])
      if (meta.social[key] !== expected)
        problems.push(
          `${route}: ${key} is "${meta.social[key]}", expected "${expected}"`,
        );
    for (const key of ["og:title", "og:site_name", "twitter:title"])
      if (!meta.social[key]) problems.push(`${route}: no ${key}`);

    // og:url travels with the shared link, so it is withheld for the same
    // reason as the canonical: a localhost URL is worse than none.
    if (meta.social["og:url"] && !meta.canonical)
      problems.push(`${route}: og:url set to ${meta.social["og:url"]} with no canonical`);
    if (/localhost|127\.0\.0\.1/.test(meta.social["og:url"]))
      problems.push(`${route}: og:url points at ${meta.social["og:url"]}`);

    if (titles.has(meta.title))
      problems.push(
        `${route}: title duplicates ${titles.get(meta.title)} :: ${meta.title}`,
      );
    titles.set(meta.title, route);

    if (descriptions.has(meta.description))
      problems.push(
        `${route}: description duplicates ${descriptions.get(meta.description)}`,
      );
    descriptions.set(meta.description, route);

    // Whole document, header and footer included — the service-area
    // placeholder and the response-time promise both lived outside <main>.
    const forbiddenSiteWide = [
      /to be confirmed/i,
      /within \d+ (business )?(hour|day)/i,
      /\bnear me\b/i,
      // Superiority claims only. Bare "best" is left alone: the copy uses it
      // adverbially ("works best when", "best support you"), which asserts
      // nothing about ranking.
      /\bthe best\b/i,
      /\bbest\s+(accounting|bookkeeping|tax|payroll|firm|service)/i,
      /\btop[- ]rated\b/i,
      /#\s?1\b/,
      /\bnumber one\b/i,
      /\bguarantee/i,
      /\bCPA\b/,
      /\bcertified\b/i,
    ];
    for (const pattern of forbiddenSiteWide)
      if (pattern.test(meta.bodyText))
        problems.push(`${route}: unsupported or stuffed copy matching ${pattern}`);
  }
  log(
    `metadata: ${publicRoutes.length} public routes, unique titles and descriptions, 1 h1 each`,
  );
  log("social: og + twitter on every public route, no localhost og:url");

  // the specimen route must stay out of search
  await page.goto(BASE + "/design-system", { waitUntil: "networkidle" });
  const dsRobots = await page.evaluate(
    () =>
      document.querySelector('meta[name="robots"]')?.getAttribute("content") ??
      "",
  );
  if (!/noindex/.test(dsRobots))
    problems.push(`design-system: robots "${dsRobots}", expected noindex`);

  const sitemap = await (await page.request.get(BASE + "/sitemap.xml")).text();
  const locs = [...sitemap.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1]);
  if (locs.length !== publicRoutes.length)
    problems.push(`sitemap: ${locs.length} urls, expected ${publicRoutes.length}`);
  for (const route of publicRoutes)
    if (!locs.some((loc) => loc === route || loc.endsWith(route)))
      problems.push(`sitemap: missing ${route}`);
  if (locs.some((loc) => /design-system/.test(loc)))
    problems.push("sitemap: includes /design-system");

  const robotsTxt = await (await page.request.get(BASE + "/robots.txt")).text();
  if (!/Allow:\s*\/\s*$/m.test(robotsTxt))
    problems.push("robots.txt: does not allow /");
  if (!/Disallow:\s*\/design-system/m.test(robotsTxt))
    problems.push("robots.txt: does not disallow /design-system");
  for (const route of publicRoutes.slice(1))
    if (new RegExp(`Disallow:\\s*${route}\\s*$`, "m").test(robotsTxt))
      problems.push(`robots.txt: blocks ${route}`);

  log(
    `crawl surfaces: sitemap ${locs.length} public urls, design-system noindex + disallowed`,
  );
  await context.close();
}

/* --- structured data --- */
{
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  const publicRoutes = ["/", "/services", "/about", "/contact"];

  const expectedPageType = {
    "/": "WebPage",
    "/services": "CollectionPage",
    "/about": "AboutPage",
    "/contact": "ContactPage",
  };
  const expectedServices = [
    "Monthly Bookkeeping",
    "Tax Preparation",
    "Payroll Support",
    "Business Accounting",
    "Financial Reporting",
    "Catch-Up Bookkeeping",
  ];

  // ClearLedger has no premises, reputation or credentials. These properties
  // would each assert one, so none may appear at any depth of the graph — a
  // fabricated address is no more acceptable to a parser than to a reader.
  const forbiddenKeys = [
    "address", "streetAddress", "addressLocality", "addressRegion",
    "postalCode", "addressCountry", "areaServed", "serviceArea", "location",
    "geo", "latitude", "longitude", "hasMap",
    "aggregateRating", "ratingValue", "reviewCount", "review", "rating",
    "award", "hasCredential", "foundingDate", "numberOfEmployees",
    "priceRange", "offers", "price", "paymentAccepted",
    "openingHours", "openingHoursSpecification",
    "logo", "image", "sameAs", "founder", "employee", "owner",
  ];
  // `LocalBusiness` and its subtypes are excluded on purpose: they assert a
  // physical place of business that does not exist.
  const forbiddenTypes = [
    "BreadcrumbList", "ListItem", "FAQPage", "Question", "Answer",
    "Review", "AggregateRating", "LocalBusiness", "AccountingService",
    "ProfessionalService", "Person", "PostalAddress", "Place", "SearchAction",
  ];

  for (const route of publicRoutes) {
    await page.goto(BASE + route, { waitUntil: "networkidle" });

    const found = await page.evaluate(() => ({
      blocks: [
        ...document.querySelectorAll('script[type="application/ld+json"]'),
      ].map((s) => s.textContent ?? ""),
      title: document.title,
      description:
        document
          .querySelector('meta[name="description"]')
          ?.getAttribute("content") ?? "",
    }));

    if (found.blocks.length !== 1) {
      problems.push(
        `${route}: ${found.blocks.length} ld+json blocks, expected 1`,
      );
      continue;
    }

    let doc;
    try {
      doc = JSON.parse(found.blocks[0]);
    } catch (error) {
      problems.push(`${route}: ld+json does not parse — ${error.message}`);
      continue;
    }

    if (doc["@context"] !== "https://schema.org")
      problems.push(`${route}: @context is "${doc["@context"]}"`);
    const nodes = doc["@graph"];
    if (!Array.isArray(nodes) || nodes.length === 0) {
      problems.push(`${route}: @graph is missing or empty`);
      continue;
    }

    const ids = nodes.map((node) => node["@id"]);
    const refs = [];

    const walk = (value, path) => {
      if (Array.isArray(value))
        return value.forEach((item, i) => walk(item, `${path}[${i}]`));
      if (!value || typeof value !== "object") return;

      for (const [key, child] of Object.entries(value)) {
        if (forbiddenKeys.includes(key))
          problems.push(
            `${route}: schema asserts unverifiable "${key}" at ${path}`,
          );
        if (key === "@type")
          for (const type of Array.isArray(child) ? child : [child])
            if (forbiddenTypes.includes(type))
              problems.push(`${route}: schema uses forbidden @type "${type}"`);
        if ((key === "@id" || key === "url") && typeof child === "string")
          if (
            !/^(https?:\/\/|\/)/.test(child) ||
            /undefined|localhost|127\.0\.0\.1|example\.com/.test(child)
          )
            problems.push(`${route}: unusable schema URL "${child}"`);
        walk(child, `${path}.${key}`);
      }
      // A node carrying only an @id is a pointer at another node, not a node.
      if (value["@id"] && !value["@type"]) refs.push(value["@id"]);
    };
    walk(nodes, "@graph");

    for (const ref of refs)
      if (!ids.includes(ref))
        problems.push(`${route}: reference to "${ref}" resolves to nothing`);
    for (const id of ids)
      if (ids.filter((other) => other === id).length > 1)
        problems.push(`${route}: duplicate @id "${id}"`);

    const orgs = nodes.filter((node) => node["@type"] === "Organization");
    if (orgs.length !== 1)
      problems.push(`${route}: ${orgs.length} Organization nodes, expected 1`);
    const orgId = orgs[0]?.["@id"];

    if (!nodes.some((node) => node["@type"] === "WebSite"))
      problems.push(`${route}: no WebSite node`);

    const pageNode = nodes.find(
      (node) => node["@type"] === expectedPageType[route],
    );
    if (!pageNode) {
      problems.push(`${route}: no ${expectedPageType[route]} node`);
    } else {
      if (pageNode.description !== found.description)
        problems.push(
          `${route}: schema description differs from the meta description`,
        );
      if (!found.title.startsWith(pageNode.name))
        problems.push(
          `${route}: schema name "${pageNode.name}" is not the page title`,
        );
      if (pageNode.url !== route && !String(pageNode.url).endsWith(route))
        problems.push(`${route}: page node url is "${pageNode.url}"`);
    }

    const serviceNodes = nodes.filter((node) => node["@type"] === "Service");
    if (route === "/services") {
      if (serviceNodes.length !== expectedServices.length)
        problems.push(
          `/services: ${serviceNodes.length} Service nodes, expected ${expectedServices.length}`,
        );
      for (const name of expectedServices)
        if (!serviceNodes.some((node) => node.name === name))
          problems.push(`/services: no Service node named "${name}"`);
      for (const node of serviceNodes) {
        if (node.provider?.["@id"] !== orgId)
          problems.push(
            `/services: "${node.name}" provider does not point at the organization`,
          );
        if (!String(node["@id"]).includes("/services#"))
          problems.push(
            `/services: "${node.name}" @id "${node["@id"]}" is not the section anchor`,
          );
        if (!node.description)
          problems.push(`/services: "${node.name}" has no description`);
      }
      // The site is careful to offer payroll record-keeping rather than
      // payroll processing; the schema has to carry that same limit.
      const payroll = serviceNodes.find((node) => node.name === "Payroll Support");
      if (payroll && !/not operate as a payroll provider/i.test(payroll.description ?? ""))
        problems.push(
          "/services: Payroll Support schema drops the not-a-payroll-provider qualification",
        );
    } else if (serviceNodes.length) {
      problems.push(
        `${route}: ${serviceNodes.length} Service nodes outside /services`,
      );
    }
  }

  // The specimen route is noindex; it has nothing to describe to a crawler.
  await page.goto(BASE + "/design-system", { waitUntil: "networkidle" });
  const dsBlocks = await page.evaluate(
    () =>
      document.querySelectorAll('script[type="application/ld+json"]').length,
  );
  if (dsBlocks !== 0)
    problems.push(`design-system: ${dsBlocks} ld+json blocks, expected none`);

  log(
    `structured data: ${publicRoutes.length} graphs parse, Organization + WebSite + page entity, 6 services, no location or rating claims`,
  );
  await context.close();
}

/* --- stills at every width the brief asks to be reviewed --- */
for (const [route, name, stillWidths] of [
  ["/", "home", [360, 390, 768, 1024, 1280, 1440]],
  ["/services", "services", [360, 390, 430, 768, 1024, 1280, 1440]],
  ["/about", "about", [360, 375, 390, 430, 768, 1024, 1280, 1440]],
  ["/contact", "contact", [360, 375, 390, 430, 768, 1024, 1280, 1440]],
]) {
  for (const width of stillWidths) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
    });
    const page = await context.newPage();
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    // Reveal blocks only unhide once observed, so walk the page before capturing.
    // `behavior: "instant"` is required: globals.css sets scroll-behavior: smooth,
    // which would otherwise animate (and cancel) each scripted jump.
    // Observations are delivered per frame, so a step the renderer coalesces away
    // is never seen again once we return to the top — hence walking until settled.
    await page.evaluate(async () => {
      const settled = () =>
        [...document.querySelectorAll(".reveal")].every(
          (e) => e.getAttribute("data-revealed") === "true",
        );
      for (let pass = 0; pass < 4 && !settled(); pass++) {
        for (let y = 0; y < document.documentElement.scrollHeight; y += 300) {
          window.scrollTo({ top: y, behavior: "instant" });
          await new Promise((r) =>
            requestAnimationFrame(() => requestAnimationFrame(r)),
          );
          await new Promise((r) => setTimeout(r, 40));
        }
      }
      window.scrollTo({ top: 0, behavior: "instant" });
    });
    await page.waitForFunction(
      () =>
        [...document.querySelectorAll(".reveal")].every(
          (e) => e.getAttribute("data-revealed") === "true",
        ),
      null,
      { timeout: 5000 },
    );
    await page.waitForTimeout(800);
    await page.screenshot({ path: `${SHOTS}${name}-${width}.png`, fullPage: true });
    await context.close();
  }
}

await browser.close();

console.log("\n=== RESULT ===");
if (problems.length === 0) {
  console.log("PASS - no issues found");
} else {
  console.log(`${problems.length} issue(s):`);
  for (const p of problems) console.log(" - " + p);
  process.exitCode = 1;
}
