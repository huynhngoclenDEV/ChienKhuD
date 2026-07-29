# Timeline Motion Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Polish `/lich-su` scroll reveals and filter/hero motion for a premium, soft feel on laptop and mobile without new animation libraries.

**Architecture:** Keep the existing `Reveal` IntersectionObserver + CSS cascade. Retune easing, durations, grow/mobile transforms, and internal stagger (dot → year → media) in `index.css`; light class and observer tweaks in `TimelinePage.tsx` / `Reveal.tsx`.

**Tech Stack:** React + Vite + Tailwind v4 (`@theme` in `src/index.css`), custom CSS transitions, IntersectionObserver.

**Spec:** `docs/superpowers/specs/2026-07-29-timeline-motion-polish-design.md`

## Global Constraints

- No Framer Motion / GSAP / new dependencies
- No layout or content restructure
- Compositor-only motion: `opacity`, `transform`, `clip-path`
- Preserve `prefers-reduced-motion: reduce` behavior
- Shared `.reveal` styles must remain usable on other pages (defaults stay compatible)

## File map

| File | Responsibility |
|------|----------------|
| `src/index.css` | Reveal easing, grow/mobile, stagger, media/year/dot, fade-up, hover media query |
| `src/components/ui/Reveal.tsx` | Slightly earlier reveal trigger (rootMargin / threshold) |
| `src/pages/TimelinePage.tsx` | Period pill transitions, image hover class, stagger delays |

---

### Task 1: CSS reveal cascade + hero timing

**Files:**
- Modify: `src/index.css` (theme animations + `.reveal*` blocks + reduced-motion)

**Interfaces:**
- Consumes: existing class names `.reveal`, `.reveal--grow`, `.reveal-media`, `.reveal-year`, `.reveal-dot`, `.is-revealed`, `--animate-fade-up`
- Produces: same class API with new timing/easing values; mobile grow override at `max-width: 767px`

- [ ] **Step 1: Update `@theme` fade-up animation token**

In `src/index.css`, change:

```css
--animate-fade-up: fade-up 0.8s ease-out both;
```

to:

```css
--animate-fade-up: fade-up 1.05s cubic-bezier(0.16, 1, 0.3, 1) both;
```

Also update the `fade-up` keyframes start offset for a softer rise:

```css
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

Leave `--animate-ken-burns: ken-burns 18s ease-out both;` unchanged.

- [ ] **Step 2: Replace the scroll-reveal CSS block**

Replace from `/* Scroll reveal — compositor-only ... */` through `.reveal-dot { ... }` (before `html {`) with:

```css
/* Scroll reveal — compositor-only (opacity + transform + clip-path) */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  pointer-events: none;
  transition:
    opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.95s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--reveal-delay, 0ms);
  will-change: opacity, transform;
}

.reveal--grow {
  transform: translateY(28px) scale(0.96);
  transform-origin: center bottom;
}

@media (max-width: 767px) {
  .reveal--grow {
    transform: translateY(20px);
  }
}

.reveal--left {
  transform: translateX(-32px) translateY(10px);
}

.reveal--right {
  transform: translateX(32px) translateY(10px);
}

.reveal.is-revealed {
  opacity: 1;
  transform: translateY(0) translateX(0) scale(1);
  pointer-events: auto;
  will-change: auto;
}

/* Timeline image opens after card reveal */
.reveal.is-revealed .reveal-media {
  clip-path: inset(0 0 0 0);
  transform: scale(1);
}

.reveal-media {
  clip-path: inset(10% 6% 10% 6%);
  transform: scale(1.03);
  transition:
    clip-path 1.1s cubic-bezier(0.16, 1, 0.3, 1) 150ms,
    transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) 150ms;
}

.reveal.is-revealed .reveal-year {
  opacity: 1;
  transform: scale(1);
}

.reveal-year {
  opacity: 0;
  transform: scale(0.92);
  transition:
    opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1) 80ms,
    transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) 80ms,
    color 0.45s cubic-bezier(0.16, 1, 0.3, 1);
  transform-origin: center;
}

.reveal.is-revealed .reveal-dot {
  transform: scale(1);
  opacity: 1;
}

.reveal-dot {
  opacity: 0;
  transform: scale(0);
  transition:
    opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0ms,
    transform 0.45s cubic-bezier(0.34, 1.25, 0.64, 1) 0ms,
    background-color 0.35s ease,
    border-color 0.35s ease;
}

/* Image hover zoom only when fine pointer can hover */
@media (hover: hover) and (pointer: fine) {
  .reveal-media img.reveal-media-zoom {
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .reveal-media img.reveal-media-zoom:hover {
    transform: scale(1.02);
  }
}
```

- [ ] **Step 3: Confirm reduced-motion block still covers new classes**

Keep the existing `@media (prefers-reduced-motion: reduce)` block. Ensure `.reveal`, `.reveal-media`, `.reveal-year`, `.reveal-dot` remain forced to visible/static. No change required if the block already matches:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .reveal,
  .reveal-media,
  .reveal-year,
  .reveal-dot {
    opacity: 1 !important;
    transform: none !important;
    clip-path: none !important;
    pointer-events: auto !important;
  }

  html {
    scroll-behavior: auto;
  }
}
```

- [ ] **Step 4: Smoke-check CSS loads**

Run: `npm run dev` (if not already running) and open `http://localhost:5173/lich-su`  
Expected: page loads; scrolling still reveals cards (timing may already feel softer).

- [ ] **Step 5: Commit**

```bash
git add src/index.css
git commit -m "style: soften timeline reveal cascade and hero fade-up"
```

---

### Task 2: Reveal trigger + TimelinePage polish

**Files:**
- Modify: `src/components/ui/Reveal.tsx`
- Modify: `src/pages/TimelinePage.tsx`

**Interfaces:**
- Consumes: CSS classes from Task 1 (`.reveal-media-zoom`, soft grow)
- Produces: earlier one-shot reveal; period pills without `scale-105`; image hover via CSS class

- [ ] **Step 1: Soften Reveal observer margins**

In `src/components/ui/Reveal.tsx`, change the IntersectionObserver options from:

```ts
{ rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
```

to:

```ts
{ rootMargin: '0px 0px -6% 0px', threshold: 0.06 },
```

Keep one-shot disconnect on first intersect and reduced-motion early exit unchanged.

- [ ] **Step 2: Update period filter buttons on TimelinePage**

In `src/pages/TimelinePage.tsx`, replace the button `className` template:

```tsx
className={`rounded-full px-5 py-2 text-sm font-medium transition duration-300 ${
  active
    ? 'scale-105 bg-muted text-white shadow-md shadow-muted/25'
    : 'border border-muted/25 text-muted hover:border-muted hover:text-ink'
}`}
```

with:

```tsx
className={`rounded-full px-5 py-2 text-sm font-medium transition-[color,background-color,border-color,box-shadow] duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
  active
    ? 'border border-transparent bg-muted text-white shadow-md shadow-muted/20'
    : 'border border-muted/25 bg-transparent text-muted hover:border-muted hover:text-ink'
}`}
```

Note: if Tailwind does not emit `duration-350`, use `duration-300` instead.

- [ ] **Step 3: Tune event Reveal delays and image hover**

For event cards, change:

```tsx
delay={Math.min(eventIndex * 80, 160)}
```

to:

```tsx
delay={Math.min(eventIndex * 100, 200)}
```

On the event `<img>`, replace:

```tsx
className="aspect-[16/10] w-full object-cover transition duration-500 hover:scale-[1.02]"
```

with:

```tsx
className="reveal-media-zoom aspect-[16/10] w-full object-cover"
```

Leave hero ken-burns and structure unchanged.

- [ ] **Step 4: Manual verification (desktop + mobile)**

1. Open `/lich-su` at desktop width (≥768px): scroll — cards rise softly; dot then year then image; active period chip crossfades without scale jump.
2. Resize to mobile width (<768px) or use device mode: cards fade/translate without scale pop; image does not zoom on tap.
3. Click each period chip: smooth scroll + active style.
4. Enable OS “Reduce motion” / Chrome emulate `prefers-reduced-motion: reduce`: content appears static, no clip-path animation.

Expected: all four checks pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/Reveal.tsx src/pages/TimelinePage.tsx
git commit -m "feat: polish timeline reveal trigger and period filter motion"
```

---

## Spec coverage checklist

| Spec item | Task |
|-----------|------|
| Soft primary easing `cubic-bezier(0.16, 1, 0.3, 1)` | Task 1 |
| Card duration ~0.85–1.0s | Task 1 |
| Grow desktop scale 0.96 / mobile no scale | Task 1 |
| Stagger dot → year → media delays | Task 1 |
| Year scale from 0.92; media ~1.1s | Task 1 |
| Sticky filter without scale-105 | Task 2 |
| Hero longer fade-up; ken-burns unchanged | Task 1 |
| Hover zoom only with fine pointer | Task 1 + 2 |
| Reduced motion preserved | Task 1 |
| Reveal rootMargin tweak | Task 2 |
| No new deps / no layout restructure | Global |

## Plan self-review

- No TBD/placeholder steps
- Class names consistent across tasks (`.reveal-media-zoom`)
- Manual QA replaces unit tests (pure CSS/motion polish; no existing test harness for this)
