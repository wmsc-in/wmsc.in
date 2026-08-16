# WMSC Homepage Scroll Carousel — Design QA

## Source visual truth

- Reference screenshot: `/var/folders/gw/v65_992154b_czr4lswqlk1c0000gn/T/TemporaryItems/NSIRD_screencaptureui_AexgY1/Screenshot 2026-08-16 at 8.43.42 PM.png`
- Source pixels: 1638 × 1530 PNG.
- The screenshot was treated as visual reference only. The explicit request to expand the carousel to full width and make it scroll-driven overrides the source screenshot’s cream outer frame and rounded lower corner.

## Implementation evidence

- Route: `http://127.0.0.1:4180/`
- Desktop Vallam Kali state: `/Users/rajileshpanoli/Desktop/soance_works/wmsc.in/design-qa-home-scroll-vallam.png`
- Mobile Vallam Kali state: `/Users/rajileshpanoli/Desktop/soance_works/wmsc.in/design-qa-home-scroll-mobile.png`
- Combined source/implementation comparison: `/Users/rajileshpanoli/Desktop/soance_works/wmsc.in/design-qa-home-scroll-comparison.png`
- Desktop CSS viewport and capture: 1440 × 1000 at density 1.
- Mobile CSS viewport and capture: 390 × 844 at density 1.
- State: slide 3 of 5, “Vallam Kali · One team”.

## Findings

- No actionable P0, P1, or P2 visual mismatches remain.
- Fonts and typography: the large Georgia display headline, Malayalam subhead, compact uppercase lime label, and small white supporting line preserve the reference hierarchy. The desktop headline intentionally wraps onto two lines because the full-width scene uses a larger editorial panel.
- Spacing and layout rhythm: the image now reaches every viewport edge as requested. Badge, progress counter, controls, caption panel, and scroll prompt use consistent viewport-relative insets. Mobile retains the same hierarchy without horizontal overflow.
- Colors and visual tokens: deep WMSC green, cream-white typography, lime status accents, translucent green panels, and dark photographic overlays match the reference palette.
- Image quality and asset fidelity: the exact existing five Kerala hero assets are used. The Vallam Kali crop preserves the boat on the right and atmospheric negative space on the left, matching the supplied screenshot’s composition.
- Copy and content: all five cultural moments retain their Malayalam title, English label and existing theme. A short descriptive line was added to support the enlarged full-width layout.
- Interaction and motion: GSAP ScrollTrigger pins one full-viewport stage across five scroll lengths. Scrolling down and up scrubs the same timeline in opposite directions. Slide planes rotate on the Y axis, recede on Z, scale and crossfade; the active image also responds to pointer position with restrained X/Y rotation.
- Controls: previous/next buttons and every progress dot navigate to the correct scroll stop. Disabled end controls are visually muted. The progress counter and active dot stay synchronized.
- Accessibility: semantic carousel/slide labels, descriptive active-image alt text, real Phosphor arrow icons, keyboard-focusable controls, and reduced-motion handling remain present.
- Runtime: desktop and mobile render with no console errors. Static HTML tests pass. Lint completes with no errors; repository-wide image/analytics optimization advisories remain warnings only.

## Comparison history

1. Initial full-width pass matched the reference composition but its short snap delay raced the scrub tween, causing direct dot navigation to overshoot. This was a P2 interaction issue.
2. The scroll behavior was changed to GSAP-owned motion, scrub duration was reduced to 0.65 seconds, snap delay increased to 0.85 seconds, and snap inertia/directionality were disabled. Fresh-page tests then landed slide 3 precisely at its third scroll stop.
3. Mobile testing found no overflow: the stage measured exactly 390 × 844, controls remained inside the viewport, and reverse scrolling moved from slide 3 to slide 2 with visible 3D matrices.

## Focused comparison evidence

The combined image compares the exact Vallam Kali scene, badge, control rail, lime active indicator, Malayalam label, English headline, panel color and photographic crop in one view. Those details are large enough to judge without an additional close crop.

## Static hosting checks

- `npm run build` succeeds and refreshes the GitHub Pages `docs/` directory.
- `docs/index.html`, `CNAME`, `.nojekyll`, all five hero assets and the Onam route remain present.
- Both rendered HTML tests pass, so the site remains server-free and ready for static hosting.

final result: passed
