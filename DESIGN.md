# Portfolio redesign & refactor spec

This document merges **UI/UX (senior product design)** and **recruiter** feedback into one plan. Use it as the source of truth for what to change on this site and in what order.

---

## Goals

| Audience | What “good” looks like |
|----------|-------------------------|
| **Visitors / hiring managers** | Distinct but professional look, fast scan, proof (links, outcomes), comfortable motion. |
| **Recruiters** | Under 30 seconds: role, stack, location, current job, how to contact, resume artifact. |
| **You (maintainer)** | Clear structure, token-based CSS, easy to update copy and links. |

Non-goals for v1: full rebrand illustration set, blog, or CMS—unless you explicitly add them later.

---

## Synthesis of both reviews

### What already works (keep)

- **Design system**: CSS variables, spacing, light/dark, section numbering.
- **Real narrative**: About and projects are specific, not lorem ipsum.
- **Motion with intent**: Hero typewriter, circuit canvas, LED strip—differentiate you from static templates.
- **Current role + dates**: Clear employment signal for recruiters.
- **At least one live project link** (Micro Analytics)—keep and extend the pattern.

### Gaps to close

**Information architecture**

- **Skills** exists in the page (`#skills`) but is **missing from the main nav**—users and keyword scanners skip it.
- **Experience** vs **Projects** use the same card pattern—readers can confuse “jobs” with “portfolio work.”

**Recruiter workflow**

- No **Resume / CV** download—many recruiters still need a one-click PDF for ATS and forwarding.
- **“Computer Engineer”** is accurate locally; some markets expect **Software / Full-stack** in the headline for search and skim.
- **About** is strong but **dense** for a first pass—needs a short “value prop” layer above the long copy.
- **Proof parity**: not every project has GitHub / live / “private” note—uneven credibility.

**UI/UX & accessibility (2024–2025 bar)**

- **Inter + Playfair + neutral monochrome** is safe and common—easy to blend with generic portfolios.
- **`prefers-reduced-motion`** is not honored—hero, marquee, and scroll animations should degrade gracefully.
- No **skip-to-content** link; **focus** states for keyboard users not called out in the audit.
- **Infinite skills marquee** can feel dated and may annoy motion-sensitive users.

**Content polish**

- **“Dental Saas”** → should be **SaaS** (industry-standard casing).

---

## Design principles (for the refactor)

1. **Scan first, depth second** — Hero + one summary block answer “who / what / where / CTA” before long paragraphs.
2. **Same story everywhere** — Title, subtitle, and resume align with LinkedIn and PDF resume wording.
3. **Motion is optional** — Full experience by default; reduced motion respects system preference.
4. **Prove claims** — Prefer links, dates, and short outcomes; label gaps honestly (e.g. private repo).
5. **Differentiate without chaos** — One clear visual move (type, accent, or layout)—not a redesign every quarter.
6. **Mobile first, desktop enhanced** — Layout, type, and interactions are designed for small screens first; larger breakpoints add space, columns, and richer motion—not the other way around.

---

## Responsive strategy: mobile-first, modern, dynamic, informative

This is a **locked design direction**: the site should feel **cool and current** on a phone, not merely “scaled down desktop.”

### Philosophy

| Principle | What it means here |
|-----------|-------------------|
| **Mobile-first CSS** | Base styles target **narrow viewports** (~360–430px wide). Use **`min-width` media queries** to add complexity (columns, side-by-side hero, stronger parchment/code layer). *Legacy note: existing `styles.css` still uses `max-width` overrides; new work should use min-width layers, and we can migrate the file incrementally.* |
| **Content priority** | On small screens: **name, role, CTAs, contact** win. Decorative layers (parchment code, circuit canvas) stay **subordinate**—lower opacity, behind content, or simplified so copy stays readable without pinch-zoom. |
| **Informative, not empty** | Same facts as desktop: stack, jobs, projects. Use **vertical rhythm**, clear headings, and **tap-friendly links**—never hide the story behind hover-only affordances. |
| **Dynamic with guardrails** | Motion and canvas effects signal craft; they must **degrade** on small CPUs, `prefers-reduced-motion`, or low battery (future: pause canvas when off-screen). |

### Breakpoints (reference tokens)

Use these names consistently in new CSS and in code review:

| Token | Approx min-width | Role |
|-------|------------------|------|
| **(base)** | 0 | Default: single column, full-width nav drawer, stacked hero, touch-first spacing. |
| **sm** | `480px` | Slightly larger type; comfortable section padding; footer may stay stacked. |
| **md** | `768px` | Tablet: optional two-column where it helps; nav may switch to horizontal (current site uses hamburger ≤768—keep or tune). |
| **lg** | `1024px` | Desktop: hero split layout, parchment/code as ambient layer, project meta + body side-by-side. |
| **xl** | `1280px`+ | Max container width; extra whitespace, not new features only for huge screens. |

### What “cool & modern” means per viewport

- **Phone**: Bold typographic hierarchy, generous padding, **glass nav** stays; hero **stack** with name + subtitle + primary actions first; code/parchment as **subtle background** (already fades at ≤1024—keep improving contrast on base).
- **Tablet**: Balance—two columns only where scan improves (e.g. project cards).
- **Desktop**: Full **split hero**, readable typewriter, circuit canvas visible—**reward** without blocking understanding.

### Dynamic behavior (informative first)

1. **Hero**: Typewriter/code remains “signature”; on narrow screens ensure **no horizontal overflow** and **line length** for subtitle/body ≤ ~65ch.
2. **Skills**: Prefer **horizontal scroll with snap** or **wrapped chips** on mobile for quick scan; infinite marquee is **secondary** or disabled when `prefers-reduced-motion` or on very narrow widths.
3. **About**: LED panel already hidden below `768px`—acceptable; replace with a **lightweight** visual (icon strip or static diagram) if the section feels empty on phone.
4. **Projects / Experience**: Single column on mobile; **dates + title** scannable in one thumb-scroll; link rows **full-width tap targets** (min ~44×44 CSS px).

### Touch & ergonomics

- Interactive controls (theme toggle, menu, CTAs): target at least **44×44px** touch area; use `touch-action: manipulation` where appropriate to avoid double-tap zoom delay on legacy browsers.
- Respect **safe areas** (`env(safe-area-inset-*)`) on notched devices when adding fixed footers or full-bleed buttons (future polish).
- **Sticky nav** height is accounted for in scroll offset (already ~80px in JS—keep in sync with `--nav-height`).

### Testing checklist (before shipping layout changes)

- [ ] iPhone SE width (~375px) and a large Android (~412px)—no horizontal scroll except intentional carousels.
- [ ] Landscape phone: hero + nav still usable.
- [ ] Keyboard: focus order matches visual order on mobile (nav open/close).
- [ ] Lighthouse **mobile** performance and accessibility (quick pass).

---

## Target narrative & structure

This section is the **content north star**: it aligns the live site with your **resume** and the positioning we agreed on. Implement copy and section order to match; keep dates identical across resume, LinkedIn, and portfolio.

### Positioning (one sentence)

You are a **full-stack developer who ships systems that solve real business problems**—automation, operations, fewer manual steps—plus **end-to-end ownership** (requirements → design → implementation → deploy) and **integrations** (APIs, webhooks, messaging, payments, event-driven workflows). **RBAC, validation, and structured workflows** are part of your story, not footnotes. **BS Computer Engineering** and **IoT/embedded** experience support a secondary narrative: depth when hardware and real-time systems matter.

### Resume-aligned facts (source of truth)

| Field | Value |
|-------|--------|
| **Professional title** | Full-Stack Developer (use in hero subtitle or primary line; “Computer Engineer” can remain as degree/context if desired). |
| **Location** | Manila, Philippines |
| **Contact** | `mbelteshazzar.bm.1247@gmail.com` · **Phone** (optional on public site): +63-960-6054-628 |
| **Education** | BS Computer Engineering, University of Mindanao, **2019–2024** — embedded systems, IoT, microcontrollers, real-time applications |
| **Current role** | **Full-Stack Web Developer**, CliqueHA Information Services OPC — **March 2025 – Present** |
| **Freelance** | **January 2025 – August 2025** — client sites (Squarespace landing pages, WordPress e-commerce), conversion-focused delivery |
| **Resume skills line** | System design · Architecture planning · **MCP server integration** · Documentation & logic structuring · End-to-end system development |

**Sync check:** If the site still shows different employment dates (e.g. June vs March 2025), update **`index.html`** to match this table.

### Narrative pillars (“how I work”)

Use these as the **three bullets** under the hero or at the top of About—short, parallel wording:

1. **End-to-end delivery** — From requirements and system design through implementation, testing, and deployment; AI-accelerated where it helps, engineering fundamentals first.
2. **Automation & integrations** — Workflows, APIs, webhooks, event-driven connections between tools (messaging, payments, internal ops).
3. **Solid foundations** — Role-based access, data validation, structured workflows, maintainable backend logic for real operational use.

### Section-by-section intent

| Section | Narrative job | Content notes |
|---------|----------------|---------------|
| **Hero** | Instant clarity: **who**, **what**, **where**, **CTA**. | Name → line 1: **Full-Stack Developer** (or equivalent) → **value prop** (one sentence from resume About) → Manila → socials → **Resume PDF** + **Contact**. Phone optional secondary. |
| **About** | Proof of thought, not wall of text. | Open with **3 pillars** (above), then 1–2 short paragraphs expanding CliqueHA + freelance + side projects + thesis/IoT as needed. |
| **Skills** | Two layers: **systems** + **stack**. | **Row A (resume):** system design, architecture, MCP, documentation, end-to-end. **Row B (tech):** Laravel, React/Vue, Node, SQL, Docker, AWS, WordPress, etc.—only what you’ll defend in interview. |
| **Experience** | **Employment only**—visually distinct from Projects. | **Block 1:** CliqueHA, Mar 2025–Present — 2–3 outcome bullets (lifecycle, RBAC/automation/integrations). **Block 2:** Freelance, Jan–Aug 2025 — client delivery, Squarespace/WordPress e-commerce. |
| **Projects** | **Selected work**—products and proof. | Order by story: **Dental SaaS** (platform + AI + infra) → **Micro Analytics** (keep **Live** prominent) → **IoT flood / thesis** (engineering depth). Each card: short outcome + **Live · GitHub · Private/N/A** consistently. |
| **Education** | One compact block. | Degree + university + years + **one IoT/embedded line** linking to thesis card. |
| **Contact** | Low friction. | Email CTA; link resume again if useful. |

### Differentiators to surface (not generic “I code”)

- **MCP server integration** — Short callout in Skills or About: modern tooling / agentic workflows (one line, no jargon pile-up).
- **Event-driven & integrations** — Ties resume bullets to real hiring keywords (payments, webhooks, messaging).
- **Thesis / IoT** — Positions you beyond typical web-only portfolios when teams care about systems + physical world.

### What to avoid

- Headline that only says “Computer Engineer” with no **full-stack / systems** context for international recruiters—use subtitle to bridge.
- Same visual pattern for **job history** and **portfolio projects** without labels (“Work” vs “Selected work”).
- Long bullet lists on the site—**resume carries detail**; site carries **scannable** proof.

---

## Recommended information architecture

This nav and section roles **implement** the **Target narrative & structure** section above.

### Primary nav (single set)

Order as implemented on the page, **including Skills**:

Home · About · **Skills** · Experience · Projects · Contact

Optional later: **Resume** as a nav item *or* a persistent button—see Phase 1.

### Section roles (clarify in UI copy, not only in headings)

| Section | Job |
|---------|-----|
| Hero | Name, role + **searchable subtitle** (stack), location, social, **Resume** + **Contact** CTAs. |
| About | **3-line value prop** (bullets or short paragraph), then existing narrative. |
| Skills | **Static** primary stack (chips or row) for scan + SEO; optional carousel below or remove. |
| Experience | Employment timeline—visually distinct from Projects (e.g. timeline, left rail, or “Work” label system). |
| Projects | Side projects & thesis—cards with **consistent link row** (Live · Repo · Case study). |
| Contact | Short line + email CTA (keep). |

---

## Visual direction (phased)

### Phase A — “Polish & clarity” (default first step)

- Fix IA (nav, Skills), recruiter block, resume link, typo, proof links structure.
- Add **a11y** baseline: skip link, `prefers-reduced-motion`, visible `:focus-visible`.
- Optionally add a **single accent color** (used for links, primary button, active nav) to break pure grayscale—keep tokens in `:root`.

### Phase B — “Distinctive” (when you want a stronger brand)

Pick **one** lever so the site doesn’t read as “default portfolio”:

- **Typography**: Replace or pair Inter with a less overused body font; keep Playfair or swap display for one strong editorial face.
- **Layout**: Asymmetric hero, larger type scale, or editorial grid for Projects.
- **Imagery**: One consistent treatment—project thumbnails, monoline icons, or diagram style.

Document the chosen direction here when you lock it (font names, accent hex, rules).

---

## Accessibility checklist (target)

- [ ] Skip link: “Skip to main content” → `#main` wrapper on first meaningful content.
- [ ] Landmark: `<main id="main">` wrapping primary sections (nav/footer outside).
- [ ] `prefers-reduced-motion: reduce`: disable or shorten CSS animations; pause/stop marquee; optional instant scroll.
- [ ] `:focus-visible` styles for links, buttons, nav—visible keyboard path.
- [ ] Theme toggle: update `aria-pressed` or label to reflect state (optional enhancement).
- [ ] Mobile menu: focus trap and ESC to close (if not already)—verify after refactor.

---

## Recruiter checklist (target)

- [ ] **Resume**: Button in hero (and/or nav) → `/resume.pdf` or external URL; add file to repo when ready.
- [ ] **Subtitle**: One line under title, e.g. *Full-stack engineer — Laravel, React, Node, cloud & CI/CD* (adjust to truth).
- [ ] **Scan block**: Three bullets max under hero or start of About: current role, strongest proof, stack focus.
- [ ] **Projects**: Each item has Live / GitHub / N/A with reason where applicable.
- [ ] **LinkedIn**: Consider custom URL when eligible—low effort, slightly cleaner on resumes.

---

## Implementation phases

### Phase 1 — High impact, low risk

1. Add **Skills** to nav; ensure scroll-spy / active states include `#skills`.
2. Add **hero subtitle** (role + stack keywords for international recruiters).
3. Add **Resume** CTA (href placeholder until PDF exists); document filename in README.
4. Add **recruiter summary** (3 bullets or short paragraph) at top of About.
5. Fix **SaaS** spelling on dental project.
6. **Differentiate** Experience vs Projects in CSS (section modifier classes, border, or small “Work” vs “Selected work” labels).

### Phase 2 — Accessibility & motion

1. Wrap content in `<main id="main">`; skip link at top of `<body>`.
2. CSS: `prefers-reduced-motion` overrides for `.section`, hero animations, skills track.
3. JS: respect `matchMedia('(prefers-reduced-motion: reduce)')` for typewriter/marquee/circuit where needed.
4. Global `:focus-visible` rules.

### Phase 3 — Content & proof

1. Add GitHub/live links per project or explicit “Private / in development.”
2. Tighten project descriptions to **outcome-oriented** lines where possible (metric, user, or scope).
3. Optional: **static skill chips** above or beside carousel; carousel becomes secondary or removed.

### Phase 4 — Visual identity (optional)

1. Choose accent color + document in this file.
2. Typography swap or pairing per Phase B.
3. Project thumbnails or simple icons if you have assets.

---

## Success metrics (lightweight)

- **You**: Updating copy or a link takes minutes without hunting through duplicate markup.
- **Peer review**: “I get what you do in 20 seconds” from someone who doesn’t know you.
- **Technical**: No new a11y regressions on Lighthouse or axe for critical paths (manual test with keyboard + reduced motion).

---

## Open decisions (fill in before build)

| Decision | Options | Your call |
|----------|---------|-----------|
| Headline title | Keep “Computer Engineer” only vs add “/ Software Engineer” in subtitle | |
| Resume file | `resume.pdf` in repo vs hosted on Drive/Notion | |
| Skills UI | Static chips only vs chips + slow carousel vs carousel only for `prefers-reduced-motion: no-preference` | |
| Experience layout | Timeline vs current card + stronger section header | |
| Responsive CSS migration | Incremental `min-width` layers for new components vs full `styles.css` rewrite | |

---

## Changelog

| Date | Change |
|------|--------|
| 2026-03-22 | Initial spec from combined UI/UX + recruiter reviews. |
| 2026-03-22 | Locked **mobile-first** responsive strategy: breakpoints, touch, dynamic vs informative tradeoffs; noted legacy max-width CSS migration path. |
| 2026-03-22 | Added **Target narrative & structure**: resume-aligned positioning, dates, pillars, section-by-section intent, differentiators. |
| 2026-03-22 | **Phase 1 implemented** in `index.html` / `styles.css` / `script.js`: Skills + Resume nav, hero narrative + CTAs, About pillars + education, skills chips, Experience vs Projects styling, resume-aligned dates/copy, SaaS typo, skip link + `<main>`, focus-visible, scroll-spy for Home. |

When you complete a phase, add a short row here so future you knows what shipped.
