import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`https://wmsc-whitefield.example${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the WMSC community homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>WMSC — Whitefield Malayali Social Club<\/title>/i);
  assert.match(html, /A little bit of/);
  assert.match(html, /Right here in Whitefield/);
  assert.match(html, /Sports &amp; Games/);
  assert.match(html, /Charity &amp; Blood Donation/);
  assert.match(html, /inaguration\.png/);
  assert.match(html, /og\.png/);
  assert.match(html, /G-FDDFYDCVXT/);
  assert.match(html, /href="\/onam\/"/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|Your site is taking shape/i);
});

test("server-renders the WMSC Onam page", async () => {
  const response = await render("/onam");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Onam 1\.0 in Whitefield, Bengaluru — WMSC<\/title>/i);
  assert.match(html, /A celebration of culture, unity and tradition/i);
  assert.match(html, /onam-1-poster\.jpg/);
  assert.match(html, /Cultural programmes/);
  assert.match(html, /G-FDDFYDCVXT/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|Your site is taking shape/i);
});

// Inspect the actual static files published to GitHub Pages, without hydration.
const { readFile, access } = await import("node:fs/promises");
const staticRoot = new URL("../docs/", import.meta.url);
const pageRoutes = [["index.html", "/"], ["onam/index.html", "/onam/"], ["blog/index.html", "/blog/"]];

for (const [file, route] of pageRoutes) {
  test(`static SEO is complete for ${route}`, async () => {
    const html = await readFile(new URL(file, staticRoot), "utf8");
    const canonical = [...html.matchAll(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"[^>]*>/g)];
    assert.equal(canonical.length, 1);
    assert.equal(new URL(canonical[0][1]).href, `https://wmsc.in${route}`);
    assert.match(html, /name="description" content="[^"]+"/);
    assert.match(html, /property="og:image" content="https:\/\/wmsc.in\//);
    assert.match(html, /name="twitter:card" content="summary_large_image"/);
    assert.doesNotMatch(html, /content="noindex/);
    const nodes = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
      .flatMap((match) => JSON.parse(match[1])["@graph"]);
    for (const type of ["Organization", "WebSite", "WebPage", ...(route === "/" ? [] : ["BreadcrumbList"])]) {
      assert.equal(nodes.filter(node => node["@type"] === type).length, 1, type);
    }
    const ids = new Set(nodes.map(node => node["@id"]));
    const checkReferences = (value) => {
      if (!value || typeof value !== "object") return;
      if (Object.keys(value).length === 1 && value["@id"]) assert.ok(ids.has(value["@id"]), `Unresolved reference ${value["@id"]}`);
      Object.values(value).forEach(checkReferences);
    };
    nodes.forEach(checkReferences);
    if (route === "/onam/") assert.ok(!nodes.some(node => node["@type"] === "Event"));
    if (route === "/blog/") {
      const article = nodes.find(node => node["@type"] === "NewsArticle");
      assert.equal(article.datePublished, "2026-09-04");
      assert.equal(article.inLanguage, "ml-IN");
    }
    for (const image of html.matchAll(/property="og:image" content="https:\/\/wmsc.in\/([^"]+)"/g)) {
      await access(new URL(image[1], staticRoot));
    }
  });
}

test("crawl files cover every public page and exclude error pages", async () => {
  const robots = await readFile(new URL("robots.txt", staticRoot), "utf8");
  assert.match(robots, /User-agent: \*\s+Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/wmsc.in\/sitemap.xml/);
  const sitemap = await readFile(new URL("sitemap.xml", staticRoot), "utf8");
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
  assert.deepEqual(urls, pageRoutes.map(([, route]) => `https://wmsc.in${route}`));
  const llms = await readFile(new URL("llms.txt", staticRoot), "utf8");
  urls.forEach(url => assert.ok(llms.includes(url)));
  const errorHtml = await readFile(new URL("404.html", staticRoot), "utf8");
  assert.match(errorHtml, /name="robots" content="noindex"/);
  assert.doesNotMatch(errorHtml, /name="robots" content="index/);
});
