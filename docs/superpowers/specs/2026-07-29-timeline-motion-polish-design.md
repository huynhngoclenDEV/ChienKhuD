# Timeline page motion polish

**Date:** 2026-07-29  
**Route:** `/lich-su` (`TimelinePage`)  
**Goal:** Premium, smoother motion feel on laptop and mobile — softer easing, clearer stagger, synced year / dot / media — without adding animation libraries.

## Context

The history page already uses:

- Hero ken-burns + `animate-fade-up` title
- Sticky period filter with IntersectionObserver scroll-spy
- `Reveal` (IntersectionObserver) with `variant="grow"`
- CSS secondary reveals: `.reveal-media` (clip-path), `.reveal-year`, `.reveal-dot`

User chose **premium feel** (option B), not a jank-first rewrite. Approach: polish the existing CSS cascade.

## Non-goals

- No Framer Motion / GSAP / new dependencies
- No layout or content restructure
- No scroll-scrubbed timeline
- No changes to other pages except shared `Reveal` / CSS that already apply globally (keep reveal defaults compatible)

## Approach

Polish CSS cascade in `index.css`, with light tweaks in `Reveal.tsx` and `TimelinePage.tsx`.

## Motion design

### Global reveal easing

- Primary easing: `cubic-bezier(0.16, 1, 0.3, 1)`
- Card reveal duration: ~0.85–1.0s (opacity + transform)
- Keep compositor-only properties: `opacity`, `transform`, `clip-path`

### Grow variant

- Desktop: start at `translateY(28px) scale(0.96)` (was ~36px / 0.92)
- Mobile (`max-width: 767px`): `translateY(20px)` only — no scale on the card shell

### Internal stagger (when `.is-revealed`)

Order and approximate delays:

| Element        | Delay after reveal | Duration |
|----------------|--------------------|----------|
| `.reveal-dot`  | ~0ms               | ~0.45s   |
| `.reveal-year` | ~80ms              | ~0.85s   |
| text (via card)| 0 (card itself)    | ~0.9s    |
| `.reveal-media`| ~150ms             | ~1.1s    |

Dot scale uses a soft overshoot bezier (existing spring-like curve is fine if toned slightly). Year uses opacity + gentle scale from ~0.92 → 1 (not 0.85). Media: slower clip-path open + scale 1.03 → 1.

### Sticky period filter

- Active pill: color / background / shadow transitions (~300–400ms), soft easing
- Remove or replace `scale-105` on active state (scale feels jumpy)
- Keep existing IntersectionObserver; optional: slightly smoother visual only (no debounce required unless flicker appears)

### Hero

- Title block: slightly longer fade-up (~0.95–1.1s) with softer easing if keyed via CSS
- Ken-burns: keep slow (~18s); no change required unless it fights with title

### Hover / touch

- Image hover `scale-[1.02]`: keep on `md+` only (`@media (hover: hover)`)
- On coarse pointers / touch: no hover scale

### Reduced motion

Preserve existing `@media (prefers-reduced-motion: reduce)`: instant reveal, no transforms/clip-path animations.

## Files to change

| File | Change |
|------|--------|
| `src/index.css` | Easing, durations, grow/mobile overrides, stagger delays, media/year/dot polish, hover media query |
| `src/components/ui/Reveal.tsx` | Optional: rootMargin / threshold tweak for earlier soft reveal; keep one-shot observer |
| `src/pages/TimelinePage.tsx` | Filter pill classes; stagger delays; hero animation class if needed; hover scale class cleanup |

## Success criteria

- Scrolling `/lich-su` on desktop: cards feel soft and sequenced (dot → year → media)
- Same page on mobile: no heavy scale pop; still clear stagger
- Period chips transition without bounce/jump
- `prefers-reduced-motion: reduce` still disables motion
- Bundle size unchanged (no new deps)

## Testing

- Manual: Chrome desktop + mobile viewport (or device) on `/lich-su`
- Scroll through all periods; tap period chips; verify sticky bar
- Toggle OS reduced-motion and confirm static content
