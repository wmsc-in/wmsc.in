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
  assert.match(html, /wmsc-community-hero\.png/);
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
  assert.match(html, /<title>Onam 1\.0 — WMSC<\/title>/i);
  assert.match(html, /A celebration of culture, unity and tradition/i);
  assert.match(html, /onam-1-poster\.jpg/);
  assert.match(html, /Cultural programmes/);
  assert.match(html, /G-FDDFYDCVXT/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|Your site is taking shape/i);
});
