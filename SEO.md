# WMSC search and AI discoverability

All three public pages have unique titles, descriptions, canonical URLs, Open Graph and Twitter metadata. JSON-LD identifies WMSC as an Organization, links the WebSite and WebPage entities, adds breadcrumbs to secondary pages, and describes the Malayalam news report as a NewsArticle. Only facts supported by the visible website are included.

- Shared metadata and schema: `lib/seo.ts`.
- Homepage metadata: `app/page.tsx`; interactive homepage: `app/home.tsx`.
- Onam metadata: `app/onam/layout.tsx`.
- News metadata and article schema: `app/blog/page.tsx`.
- Public crawler resources: `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt`.
- `npm test` builds the site and checks server-rendered content, static metadata, schema references, social image assets, crawler resources and 404 indexing.
- `npm run build` refreshes both `dist/client` and the GitHub Pages `docs` output.

## Publication and indexing

Publish the generated `docs` output through the existing GitHub Pages process for wmsc.in. Then verify `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/`, `/onam/` and `/blog/` on the public domain. Submit https://wmsc.in/sitemap.xml to Google Search Console and Bing Webmaster Tools using the site's verified owner account. Check the pages with Google's Rich Results Test and URL Inspection. Account verification tokens must come from those services; none have been fabricated.

The configured Sites copy is owner-private. It is not a substitute for publishing the public wmsc.in website. Crawl permissions in robots.txt cannot override authentication, hosting firewall restrictions or a crawler provider's indexing choices.

## Keeping facts current

When adding a page, give it metadata and schema using the shared helpers and add its canonical URL to the sitemap and llms.txt. Do not list error pages, duplicate HTML aliases or fragment-only sections as separate pages. Add sitemap lastmod only when an accurate content-modification date is available.

Onam currently says its date and venue are to be announced. Once confirmed details are visible, add Event schema with the actual start date, venue and address, organizer, and any confirmed ticket availability or prices. Do not invent dates, ratings, registration status, tax IDs, addresses, telephone numbers or free admission for schema completeness.

The article publication date is 4 September 2026. Add dateModified only after a substantive article update and keep the displayed date consistent. The article is Malayalam; its sharing locale and structured-data language reflect that.

llms.txt is a supplementary readable site guide, not a standardized ranking or inclusion guarantee. Google says no special AI text files or AI-specific schema are required for its AI search features. Rankings, rich results and citations remain the providers' decisions.

References:
- https://developers.google.com/search/docs/appearance/structured-data/organization
- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
