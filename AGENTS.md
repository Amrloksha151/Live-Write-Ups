# AGENTS.md — Live Write Ups

> This document is the authoritative guide for every AI agent that contributes to the **Live Write Ups** project. Read it entirely before touching a single file. No exceptions.

---

## 0. Project Overview

**Live Write Ups** is a free, open, no-signup, no-subscription platform for reading cybersecurity / CTF / hacking write-ups in a way that emphasizes *decision-making*: readers learn *why* each step was taken, not just what commands were run. Think `hackthrough.live` — but fully open.

### Core Philosophy
- **Zero friction** — no auth, no paywalls, no cookies banners beyond what's legally required.
- **Content first** — the UI serves the writing, never competes with it.
- **Decision-aware reading** — write-ups surface the *thought process* at every critical juncture.
- **Beautiful & readable** — typographically excellent, accessible, fast.

---

## 1. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Astro 4.x** | Islands architecture; pages are static by default |
| Styling | **Tailwind CSS 3.x** | Utility-first; config extended with design tokens below |
| Icons | **`astro-icon` + Lucide icon set** (`@iconify-json/lucide`) | Lightweight, tree-shaken SVG icons |
| Content | **MDX** via `@astrojs/mdx` integration | Write-ups live in `src/content/writeups/` |
| Content Collections | Astro's built-in `defineCollection` + Zod schema | Type-safe frontmatter |
| Fonts | Self-hosted via `fontsource` | No Google Fonts runtime requests |
| Deployment target | Static (`output: 'static'`) | Works on Netlify / Vercel / GitHub Pages |

### Forbidden choices
- No React, Vue, or Svelte *framework* — Astro components only unless an island of interactivity genuinely requires it (pagination counter is fine as a tiny Astro island with `client:load`).
- No CSS-in-JS, no Emotion, no Styled-Components.
- No authentication libraries.
- No database or CMS runtime — content is file-based MDX.

---

## 2. Color Palette

Sourced from: `https://coolors.co/palette/2b2d42-8d99ae-edf2f4-ef233c-d90429`

| Token name | Hex | Role |
|---|---|---|
| `space` | `#2B2D42` | Primary dark background, headings on light |
| `slate` | `#8D99AE` | Secondary text, borders, muted elements |
| `snow` | `#EDF2F4` | Primary light background, card surfaces |
| `crimson` | `#EF233C` | Accent — CTAs, active states, highlights |
| `scarlet` | `#D90429` | Accent hover / danger / tag hover states |

### Usage rules
1. **Dark surfaces** (`space`) for the site shell (navbar, footer, hero background).
2. **Light surfaces** (`snow`) for content cards and the reading area body.
3. **`slate`** for all secondary/metadata text (dates, authors, word counts).
4. **`crimson`** sparingly — one dominant CTA per viewport maximum.
5. **`scarlet`** only as a hover/focus variant of `crimson`; never used at rest.
6. Never place `crimson` or `scarlet` on `space` at small font sizes — contrast ratio fails WCAG AA below ~18px bold.

### Tailwind config extension (add to `tailwind.config.mjs`)
```js
colors: {
  space:   '#2B2D42',
  slate:   '#8D99AE',
  snow:    '#EDF2F4',
  crimson: '#EF233C',
  scarlet: '#D90429',
}
```

---

## 3. Typography

### Font pairing (Dark Glassmorphism + Cyber Aesthetic)
| Role | Font | Weight(s) | Source | Rationale |
|---|---|---|---|---|
| Display / Hero headings | **Playfair Display** | 700, 800 | `@fontsource/playfair-display` | Elegant, premium aesthetic; excellent with neon accents |
| Body / UI | **Inter** | 400, 500, 600 | `@fontsource/inter` | Modern, highly readable on dark backgrounds; de facto web standard |
| Code / Mono blocks | **Space Mono** | 400, 700 | `@fontsource/space-mono` | Grittier, tech-forward; stronger personality than JetBrains Mono |

Install:
```bash
npm install @fontsource/playfair-display @fontsource/inter @fontsource/space-mono
```

Import in `src/layouts/Base.astro`:
```js
import '@fontsource/playfair-display/700.css';
import '@fontsource/playfair-display/800.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/space-mono/400.css';
import '@fontsource/space-mono/700.css';
```

### Typographic scale (Tailwind)
- Hero title: `text-5xl lg:text-7xl font-display font-extrabold text-frost`
- Section headings: `text-3xl font-display font-bold text-frost`
- Card title: `text-xl font-display font-bold text-frost`
- Body: `text-base font-inter leading-relaxed text-frost/90` (line-height ~1.75)
- Metadata / labels: `text-sm font-inter text-frost/60`
- Code: `font-mono text-sm font-space-mono`

### Dark Mode Colors
- **Background**: `#0F172A` (slate-900)
- **Surface**: `#1E293B` (slate-800)
- **Text (Primary)**: `#E2E8F0` (frost / slate-100)
- **Text (Secondary)**: `#94A3B8` (frost/70)
- **Text (Muted)**: `#64748B` (frost/60)
- **Accent (Neon Cyan)**: `#00FFFF` (primary interactive)
- **Accent (Neon Green)**: `#00FF00` (secondary interactive)
- **Accent (Neon Magenta)**: `#FF00FF` (highlights, danger)

### Glassmorphism Effects
- Background blur: `backdrop-blur-md` (12px) to `backdrop-blur-lg` (16px)
- Glass surface: `bg-dark-surface/40` with semi-transparent overlay
- Neon glow (lg+ only): `text-shadow: 0 0 10px currentColor` (disabled on mobile)

---

## 4. Project Structure

```
live-write-ups/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/                  # Static images / OG images
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.astro
│   │   │   └── Footer.astro
│   │   ├── home/
│   │   │   ├── Hero.astro
│   │   │   └── WriteupGrid.astro
│   │   ├── writeup/
│   │   │   ├── WriteupCard.astro
│   │   │   ├── WriteupHeader.astro
│   │   │   ├── DecisionPoint.astro  ← custom MDX component
│   │   │   └── TagPill.astro
│   │   └── ui/
│   │       ├── Pagination.astro
│   │       └── Badge.astro
│   ├── content/
│   │   ├── config.ts            ← Astro content collection schema
│   │   └── writeups/
│   │       └── example-writeup.mdx
│   ├── layouts/
│   │   ├── Base.astro           ← <html>, head, fonts, meta
│   │   └── WriteupLayout.astro  ← prose layout for MDX pages
│   ├── pages/
│   │   ├── index.astro          ← Home page
│   │   └── writeups/
│   │       └── [slug].astro     ← Dynamic write-up route
│   └── styles/
│       └── global.css           ← @tailwind directives + prose overrides
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── AGENTS.md                    ← (this file)
```

---

## 5. Content Collection Schema

File: `src/content/config.ts`

```ts
import { defineCollection, z } from 'astro:content';

const writeups = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    description: z.string().max(200),
    publishedAt: z.coerce.date(),
    updatedAt:   z.coerce.date().optional(),
    author:      z.string(),
    tags:        z.array(z.string()).default([]),
    difficulty:  z.enum(['beginner', 'intermediate', 'advanced', 'expert']),
    platform:    z.string(),           // e.g. "HackTheBox", "TryHackMe", "CTF"
    category:    z.string(),           // e.g. "Web", "Pwn", "Forensics", "OSINT"
    coverImage:  z.string().optional(),
    readingTime: z.number().optional(),// minutes; auto-computed if omitted
    draft:       z.boolean().default(false),
  }),
});

export const collections = { writeups };
```

### Frontmatter example
```mdx
---
title: "Bypassing WAF with Unicode Normalization"
description: "How I exploited a misconfigured WAF by abusing UTF-8 lookalike characters on a real engagement."
publishedAt: 2025-05-10
author: "0xalpha"
tags: ["web", "waf-bypass", "unicode"]
difficulty: "advanced"
platform: "HackTheBox"
category: "Web"
coverImage: "/images/waf-unicode.png"
---

import DecisionPoint from '@/components/writeup/DecisionPoint.astro';

## Initial Reconnaissance

...narrative...

<DecisionPoint
  question="Should I attempt a direct SQLi payload or probe WAF behavior first?"
  chosen="Probe WAF behavior"
  reason="Burning attempts on direct payloads risks IP blacklisting before understanding the filter logic."
  alternatives={["Direct SQLi", "Move to a different endpoint"]}
/>

...continues...
```

---

## 6. Page-by-Page Specifications

### 6.1 Home Page (`src/pages/index.astro`)

#### Hero Section
- Full-width, dark (`space`) background.
- Left-aligned layout on desktop; centered on mobile.
- Content:
  - Overline label: `LIVE WRITE UPS` in `crimson`, uppercase, letter-spaced, small caps style.
  - H1: Two-line headline — e.g. *"Read the hack. Learn the thinking."* — Syne 800, `snow` colored.
  - Subheading (1–2 sentences): explain the decision-making angle. DM Sans 500, `slate` colored.
  - One CTA button: "Browse Write-ups" → scrolls to the grid. Background `crimson`, text `snow`, hover `scarlet`.
- Decorative element: subtle geometric grid or noise texture overlay (CSS only, no images). Optional: a faint red diagonal accent line or bracket motif.
- Height: `min-h-[60vh]` — not forced full-screen; content drives height.

#### Write-up Grid Section
- Section heading: "Recent Write-ups" — Syne Bold, `space`.
- **Grid rules:**
  - 1 column on mobile (`< 640px`)
  - 2 columns on sm (`640px`)
  - 3 columns on md (`768px`)
  - 4 columns on lg (`1024px`)
  - 5 columns on xl (`1280px+`)
  - Each row = one CSS grid row; show **max 4 rows** = max 20 cards per page (on xl), 4 cards per page on mobile.
- **Pagination:**
  - Previous / Next buttons below the grid.
  - No infinite scroll, no lazy loading — pure static pagination via URL query param `?page=N`.
  - Astro generates pages statically using `getStaticPaths` if possible; otherwise implement as a small client island.
  - Show current page indicator: "Page 2 of 7".
  - Previous button disabled (visually + `aria-disabled`) on page 1; Next disabled on last page.
- **Sort order:** most recent `publishedAt` first. Draft write-ups (`draft: true`) are excluded entirely.
- **Empty state:** If no write-ups exist, show a centered message with a Lucide `FileSearch` icon.

#### WriteupCard Component (`src/components/writeup/WriteupCard.astro`)
Each card must display:
- Cover image (if present) — `aspect-video`, `object-cover`, rounded top corners.
- Tag pills (max 3 visible, overflow hidden).
- Title — Syne Bold, 2-line clamp (`line-clamp-2`).
- Description — DM Sans, 2-line clamp, `slate` color.
- Footer row: author avatar placeholder (initials in a circle) + author name + `·` + formatted date + `·` + difficulty badge.
- The entire card is a link (`<a>`) wrapping to `/writeups/[slug]`.
- Hover state: subtle lift (`translate-y-[-2px]`), `crimson` left border (`border-l-4`), shadow deepens.
- Background: `snow`. Border: `1px solid` using `slate` at 30% opacity.
- No JS required for the card itself.

**Difficulty badge colors:**
| Difficulty | Background | Text |
|---|---|---|
| beginner | `#d1fae5` | `#065f46` |
| intermediate | `#fef3c7` | `#92400e` |
| advanced | `#fee2e2` | `#991b1b` |
| expert | `space` | `snow` |

---

### 6.2 Write-up Page (`src/pages/writeups/[slug].astro`)

Layout: `WriteupLayout.astro` wraps MDX content.

**Structure (top to bottom):**
1. **WriteupHeader** — title, author, date, reading time, tags, difficulty, platform, category.
2. **Table of Contents** — auto-generated from `##` headings; sticky on desktop (`sticky top-24`), collapsible on mobile.
3. **Prose body** — MDX rendered content.
4. **Footer navigation** — Previous / Next write-up links (by date).

**Prose styles (Tailwind `prose` plugin):**
- Enable `@tailwindcss/typography`.
- Override prose colors to match palette: headings `space`, body `#3a3c52` (slightly lighter than `space`), links `crimson` underline on hover.
- Code blocks: background `space`, text `snow`, `JetBrains Mono`.
- Inline code: background `slate` at 15% opacity, `space` text, slight padding.
- Blockquotes: left border `crimson`, background `snow`, italic.
- `max-w-2xl` centered reading column on desktop.

**DecisionPoint Component** (`src/components/writeup/DecisionPoint.astro`):

This is the signature feature of the platform. It renders an interactive "decision card" inside the write-up flow:

Props:
```ts
interface Props {
  question: string;       // The decision the author faced
  chosen: string;         // What they actually did
  reason: string;         // Why they chose it
  alternatives: string[]; // Other paths considered
}
```

Visual design:
- Slightly inset card, `snow` bg with `crimson` top border (4px).
- Icon: Lucide `GitFork` or `Lightbulb` in `crimson`.
- Label: "Decision Point" in small caps `crimson`.
- Question in Syne bold.
- Chosen path highlighted with a `crimson` checkmark icon.
- Alternatives listed with `×` icons in `slate`.
- Reason in italic DM Sans below.
- Full-width, distinct from prose flow — acts as a visual break.

---

## 7. Navbar (`src/components/layout/Navbar.astro`)

- Background: `space`.
- Logo: "Live Write Ups" in Syne 700, `snow`, with a small `crimson` dot or bracket accent.
- Navigation links: "Write-ups", "About", "Submit" (links to a GitHub issue template or mailto).
- Mobile: hamburger menu (Lucide `Menu` / `X` icons), toggleable with minimal JS (`<script>` in the component).
- Sticky (`sticky top-0 z-50`) with a very subtle bottom border in `slate` at 20% opacity.
- No dropdown menus needed at v1.

---

## 8. Footer (`src/components/layout/Footer.astro`)

- Background: `space`, text `slate`.
- Three columns (stacked on mobile):
  1. Brand blurb — project name + one-sentence mission.
  2. Quick links — Home, All Write-ups, Submit a Write-up.
  3. Meta — "Built with Astro & MDX · Open Source · No tracking".
- Bottom bar: copyright line + link to GitHub repo.
- No newsletter signup, no social icons beyond GitHub.

---

## 9. Pagination Logic

Static pagination is preferred. The home page should use Astro's `getStaticPaths` to pre-render `/`, `/page/2`, `/page/3`, etc.

```ts
// src/pages/index.astro  (or src/pages/page/[page].astro)
export async function getStaticPaths({ paginate }) {
  const allWriteups = await getCollection('writeups', ({ data }) => !data.draft);
  const sorted = allWriteups.sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf()
  );
  // pageSize = 20 (5 cols × 4 rows) — but adapt to actual responsive max
  // For simplicity use 12 (3×4) as universal page size
  return paginate(sorted, { pageSize: 12 });
}
```

The `page` object from `paginate()` provides `page.data`, `page.url.prev`, `page.url.next`, `page.currentPage`, `page.lastPage`.

Pass these to `WriteupGrid.astro` and `Pagination.astro`.

---

## 10. SEO & Meta

Every page must have in `<head>` (managed by `Base.astro`):
- `<title>` — write-up title + " | Live Write Ups" (or just "Live Write Ups" for home).
- `<meta name="description">` — write-up description or site tagline.
- Open Graph: `og:title`, `og:description`, `og:image` (cover image or default OG image), `og:type`.
- `<link rel="canonical">`.
- `<meta name="robots" content="index, follow">`.
- No analytics scripts. No tracking pixels. Zero third-party JS from external domains.

---

## 11. Accessibility Requirements

- All interactive elements must have visible focus rings (use `focus-visible:ring-2 ring-crimson`).
- Color contrast must pass WCAG AA for all text. Run `npx @accessibility-checker/cli` or similar before each PR.
- Images must have descriptive `alt` text; decorative images use `alt=""`.
- `<nav>` elements must have `aria-label`.
- Pagination buttons must include `aria-label="Go to next page"` etc.
- Keyboard navigation must be fully functional.
- `lang="en"` on `<html>`.

---

## 12. Performance Constraints

- **No client-side JavaScript** except:
  - Mobile navbar toggle (inline `<script>`, < 20 lines).
  - Pagination (if not using static `getStaticPaths` — use a minimal Astro island).
- No external font requests at runtime (all fonts self-hosted via fontsource).
- No external CDN scripts.
- Images: use Astro's `<Image>` component (`@astrojs/image` or built-in) for automatic optimization.
- Target Lighthouse scores: Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- No CLS — reserve space for images using `aspect-ratio`.

---

## 13. `astro.config.mjs` Template

```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';

export default defineConfig({
  integrations: [
    tailwind(),
    mdx(),
    icon({
      include: {
        lucide: ['*'], // tree-shaken at build time
      },
    }),
  ],
  output: 'static',
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
```

---

## 14. `tailwind.config.mjs` Template

```js
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        space:   '#2B2D42',
        slate:   '#8D99AE',
        snow:    '#EDF2F4',
        crimson: '#EF233C',
        scarlet: '#D90429',
      },
      fontFamily: {
        syne: ['Syne', ...defaultTheme.fontFamily.sans],
        dm:   ['DM Sans', ...defaultTheme.fontFamily.sans],
        mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'), // or use built-in if Tailwind >=3.3
  ],
};
```

---

## 15. Agent Task Checklist

When an agent begins work, it must confirm each item below before marking a task complete.

### Bootstrap
- [ ] `npm create astro@latest` with "Empty" template, TypeScript strict
- [ ] Install all dependencies listed in §1 and §3
- [ ] Configure `astro.config.mjs` per §13
- [ ] Configure `tailwind.config.mjs` per §14
- [ ] Import fonts in `Base.astro` per §3

### Content Layer
- [ ] `src/content/config.ts` with Zod schema per §5
- [ ] At least 3 sample write-up MDX files with varied `publishedAt` dates and all frontmatter fields populated
- [ ] One sample uses `<DecisionPoint>` component at least twice

### Components
- [ ] `Base.astro` — html shell, head, meta, font imports
- [ ] `Navbar.astro` — sticky, mobile hamburger, correct colors
- [ ] `Footer.astro` — three-column layout
- [ ] `Hero.astro` — dark bg, headline, subtext, CTA
- [ ] `WriteupCard.astro` — all fields, hover state, difficulty badge
- [ ] `WriteupGrid.astro` — responsive 1→5 col grid, receives `writeups` prop
- [ ] `Pagination.astro` — prev/next, page indicator, disabled states
- [ ] `DecisionPoint.astro` — all props rendered, crimson top border
- [ ] `TagPill.astro` — small pill, slate bg, space text, crimson on hover
- [ ] `WriteupHeader.astro` — title, meta row, tags, difficulty

### Pages
- [ ] `src/pages/index.astro` — uses `getStaticPaths` + `paginate`, renders Hero + WriteupGrid
- [ ] `src/pages/page/[page].astro` — handles page 2+ (or merge into index with paginate)
- [ ] `src/pages/writeups/[slug].astro` — renders single write-up via WriteupLayout
- [ ] `WriteupLayout.astro` — TOC, prose body, prev/next footer nav

### Quality
- [ ] No draft write-ups appear on the site
- [ ] All pages pass `astro check` (TypeScript clean)
- [ ] No inline styles — Tailwind classes only
- [ ] All images use `<Image>` component with `alt`
- [ ] Keyboard navigation works on nav, cards, pagination
- [ ] `aria-label` on all nav and button elements
- [ ] Run `npm run build` — zero errors, zero warnings

---

## 16. What Agents Must NOT Do

- **Do not** add authentication, sessions, or cookies (beyond Astro's own if needed for nothing here).
- **Do not** add a CMS integration (Contentful, Sanity, etc.) — MDX files are the source of truth.
- **Do not** add Google Fonts `<link>` tags — use fontsource only.
- **Do not** add analytics (GA, Plausible, Fathom) unless explicitly asked by the project owner later.
- **Do not** use `client:load` or any client directive unless strictly necessary for an interactive island.
- **Do not** deviate from the color palette defined in §2.
- **Do not** use fonts other than those specified in §3.
- **Do not** add placeholder "lorem ipsum" text to any component that ships — use realistic security/CTF-themed copy.
- **Do not** hardcode write-up data in components — always pull from the content collection.
- **Do not** use `<form>` HTML elements for navigation or pagination — use `<a>` links.

---

## 17. Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| Astro components | PascalCase | `WriteupCard.astro` |
| Pages | kebab-case | `index.astro`, `[slug].astro` |
| MDX write-ups | kebab-case slug | `waf-unicode-bypass.mdx` |
| CSS classes | Tailwind utilities only | `bg-space text-snow` |
| Content fields | camelCase | `publishedAt`, `coverImage` |
| TS interfaces/types | PascalCase | `WriteupFrontmatter` |

---

## 18. Git Commit Convention

Use Conventional Commits:
```
feat(hero): add animated bracket accent to hero section
fix(card): correct line-clamp on Safari < 16
style(palette): ensure crimson never appears below 18px body text
docs(agents): update DecisionPoint prop table
```

---

*End of AGENTS.md — Last updated: 2026-05-12*