# Portfolio v2 Fullscreen Three.js Planning Brief

> **Status:** Planning only. No Next.js scaffold or production code yet.

**Goal:** Plan a new version of Scott Williams' portfolio as a fullscreen Next.js + Three.js experience centered on Agentic Engineering, local-first AI, autonomous systems, and nature/tech/math aesthetics.

**Architecture direction:** The future build should be a mobile-first, fullscreen, section-driven site where Three.js is not decoration but the main storytelling layer. Content should remain accessible as semantic HTML over/alongside WebGL so search, performance, and readability stay strong.

**Tech Stack:** Next.js, React, TypeScript, Three.js, CSS/Tailwind-style utilities, responsive/mobile-first layout, possible lightweight animation helpers only if needed.

---

## Current context

Scott's current portfolio is already being repositioned around:

- Agentic Engineering
- AI Systems Architecture
- multi-agent AI swarms
- local-first AI workflows
- edge/local LLM orchestration
- secure private AI systems
- zero-downtime modernization
- product-driven technical leadership

Recent visual patterns that worked:

- Hero: large transparent cube / system block
- About: interactive Three.js mode visual
- Skills: contained geometric motion field
- Services: scattered glass boxes assembling into one system
- Live Projects: mobile horizontal carousel
- Blog: agentic engineering transition note with searchable keyword chips

The v2 should feel more intentional and immersive than the current section-by-section iteration.

**New creative mandate:** v2 should be really unique and different — not a polished remix of the current portfolio, not a normal landing page, and not another stack of conventional sections. It should feel like a memorable interactive artifact: part systems map, part living garden, part AI command surface, and part personal mythology for Scott's Agentic Engineering work.

---

## Core concept

**Working title:** `Systems Garden / Agentic Observatory`

A fullscreen portfolio where the visitor moves through a living AI systems environment:

1. **Seed / Signal** — Scott as Systems Architect + Agentic Engineering lead
2. **Swarm / Orchestration** — autonomous agents and local LLMs coordinating
3. **Modernization / Assembly** — scattered legacy blocks forming clean systems
4. **Nature / Intelligence** — flower-of-life, trees, water, math lines, and signals
5. **Proof / Work** — shipped products and production outcomes
6. **Contact / Collaboration** — consulting, fractional architect roles, partnerships

Visual language:

- white / clean base backgrounds
- transparent glass objects
- teal + orange accent system
- mathematical linework
- nature motifs: trees, flower-of-life, water, growth rings
- agent/system motifs: nodes, signals, blocks, constellations

---

## Proposed site structure

### 1. Fullscreen Hero

**Purpose:** Immediate positioning and visual impact.

**Content:**

- `Agentic Engineering for Local-First AI Systems`
- One short paragraph about autonomous agents, privacy-first workflows, and modernization.
- CTA: `Build With Me`
- Secondary CTA: `Explore Systems`

**Three.js idea:**

A fullscreen transparent system cube / living lattice that slowly assembles from small blocks, with nature/math patterns embedded inside. On mobile, keep one focal object large and centered.

### 2. Agentic Systems Section

**Purpose:** Explain what Scott does in plain business terms.

**Content pillars:**

- Autonomous agent orchestration
- Local-first AI and private workflows
- Edge LLM systems
- Product engineering leadership

**Three.js idea:**

A multi-agent swarm: small geometric agents route signals into a stable business outcome node.

### 3. Modernization Section

**Purpose:** Show legacy-to-modern transformation.

**Content pillars:**

- strangler fig migrations
- zero-downtime modernization
- platform decomposition
- observability and quality gates

**Three.js idea:**

Old fragmented blocks separate, rotate, and reassemble into a clean transparent architecture.

### 4. Nature + Math Intelligence Section

**Purpose:** Capture Scott's preferred nature/tech/math aesthetic.

**Content pillars:**

- systems thinking
- organic growth
- quality and resilience
- human-centered technology

**Three.js idea:**

Button-driven or scroll-driven modes:

- flower-of-life geometry
- running water / flow fields
- textured tree / growth graph

### 5. Live Work / Proof Section

**Purpose:** Keep real work visible and credible.

**Content:**

- Aury AI
- Henry Meds
- iConnections
- Soul Games Studios
- Meditation Experience

**Layout:**

- horizontal mobile scroll
- larger immersive cards on desktop
- each card tied to a system/outcome, not just tech stack

### 6. Field Notes / Search Section

**Purpose:** SEO and narrative around the transition to agentic engineering.

**Content:**

- featured post about transition to agentic engineer
- keyword chips for search
- short field notes / essays later

### 7. Contact / Collaboration Section

**Purpose:** Convert visitors.

**Offer language:**

- consulting engagements
- fractional architect roles
- strategic technical partnerships
- AI system modernization reviews

---

## Planning tasks before build

### Task 1: Decide routing strategy

**Question:** Should v2 live as a separate route in the existing repo or become the main site once ready?

Options:

- `app/v2/page.tsx` inside current repo for preview
- separate package/app folder inside current repo
- separate repository later

Recommended starting point: plan as a separate preview route, then promote to home when approved.

### Task 2: Define content model

Create a content map for:

- hero copy
- section headings
- service offers
- project summaries
- article/search keywords
- CTA language

Keep it in `v2-fullscreen-three/plan/content-map.md`.

### Task 3: Define Three.js scenes

Create one planning doc per scene:

- hero system lattice
- agent swarm
- modernization assembly
- nature/math intelligence
- project proof cards

Each scene doc should include:

- goal
- mobile behavior
- desktop behavior
- reduced motion fallback
- accessibility notes
- performance budget

### Task 4: Choose implementation architecture

Before coding, decide:

- direct Three.js vs React Three Fiber
- single persistent canvas vs one canvas per section
- scroll-driven camera vs section-based scene swaps
- asset loading strategy
- mobile performance budget

Initial recommendation: direct Three.js or a small scene manager first, because the current portfolio already uses direct Three.js successfully.

### Task 5: Create build checklist

Before implementation begins, define acceptance criteria:

- mobile first
- no horizontal page overflow
- reduced-motion support
- semantic content visible without WebGL
- Lighthouse performance targets
- `npm run lint` and `npm run build` pass
- visual verification on mobile and desktop

---

## Open questions for Scott

1. Should v2 eventually replace the homepage or live as a separate experimental route first?
2. Should the experience feel more like a **calm systems garden** or a **futuristic AI command center**?
3. Do you want scroll-driven storytelling or one fullscreen scene with navigation between states?
4. Should we reuse the current copy/projects or rewrite everything from scratch for v2?
5. Do you want real 3D models from Poly Pizza/other CC0 sources, or mostly procedural geometry?

---

## Initial recommendation

Start with a preview route later, not a separate repo yet:

```text
app/v2/page.tsx
components/v2/
data/v2/
```

But until Scott says “build it,” keep all work in:

```text
v2-fullscreen-three/plan/
```

This keeps the current site stable while we shape the new fullscreen Three.js experience together.
