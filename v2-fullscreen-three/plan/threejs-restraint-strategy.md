# v2 Three.js Restraint Strategy

Scott's direction:

> I’m rethinking the Three.js and only using it where it is needed.

This is the right strategic constraint. The v2 experience should not depend on Three.js everywhere. Three.js should appear only when it clarifies orchestration, transformation, or surprise better than HTML/CSS/2D UI.

---

## Principle

Use Three.js as a **meaning layer**, not a decoration layer.

Three.js is worth using when it helps the visitor understand:

- many businesses running in parallel
- agents moving between systems
- portfolio orchestration
- complexity becoming coherent
- a hidden/surprise reveal
- maturity/IPO-ready transformation

If a section is mostly text, proof, metrics, or contact conversion, default to semantic HTML/CSS.

---

## Why restraint is better

A fully WebGL-heavy site risks becoming:

- slower on mobile
- harder to maintain
- harder to make accessible
- visually impressive but strategically unclear
- risky for visitors who just want to know whether to hire Scott

Selective Three.js keeps the experience:

- faster
- clearer
- more accessible
- easier to iterate
- more credible to hiring visitors
- more memorable because the 3D moments are intentional

---

## Recommended use of Three.js

### Use Three.js for

1. **The orchestrator map**
   - businesses as living nodes/cells/planets
   - agent helpers moving between them
   - portfolio state changing in real time

2. **Major transformation moments**
   - chaos becoming coherent
   - business node stabilizing
   - agent swarm coordinating
   - IPO-ready finale / tree / constellation reveal

3. **Tiny puzzle interactions where 3D matters**
   - rotate/align a system node
   - route an agent through a 3D path
   - connect business constellations
   - reveal hidden proof nodes

4. **Surprises / rewards**
   - hidden field notes
   - living tree finale
   - command-surface reveal
   - portfolio constellation unlock

### Avoid Three.js for

- long-form article content
- service descriptions
- project proof cards
- keyword chips
- case study text
- basic metrics/dashboard UI
- contact forms / CTAs
- anything that needs precise accessibility or search indexing

---

## Hybrid architecture direction

The future v2 should be a hybrid product, not a pure 3D site.

```text
Semantic HTML/CSS = clarity, SEO, accessibility, hiring conversion
Three.js = orchestration metaphor, transformation, puzzles, surprise
```

A good split:

- **70% semantic/product UI**
- **30% purposeful 3D moments**

The visitor should still understand Scott's offer if WebGL fails.

---

## Revised experience model

### Layer 1: Product narrative

Built with semantic HTML/CSS:

- problem statement
- business audience framing
- proof/project cards
- agent roles
- metrics dashboard
- field notes
- CTA paths

### Layer 2: Orchestration UI

Mostly HTML/CSS, with possible SVG/canvas as needed:

- portfolio dashboard
- business inspector
- agent assignment controls
- progress rail
- event notifications
- command palette

### Layer 3: Selective Three.js moments

Three.js only for the highest-impact parts:

- business constellation / orchestrator map
- agent motion across business nodes
- puzzle scenes
- finale reveal

---

## Suggested first prototype after planning

Do **not** start with a full-screen 3D world.

Start with a focused hybrid prototype:

```text
HTML/CSS orchestrator dashboard
+ one Three.js business constellation panel
+ deterministic agent assignment interaction
```

Prototype behavior:

1. Show 3-5 businesses running in parallel.
2. Visitor selects one business.
3. Visitor assigns an agent intervention.
4. A small Three.js constellation or node animation shows the change.
5. HTML metrics update from `Noisy` to `Coherent`.
6. CTA remains visible and accessible.

This validates the core idea without overcommitting to WebGL complexity.

---

## Decision rule

Before adding any Three.js scene, ask:

1. Does 3D make the concept clearer?
2. Does it teach a hiring-relevant point?
3. Is it usable on mobile?
4. Does the page still work without it?
5. Is the performance cost worth the impact?

If the answer is not yes to all five, use HTML/CSS/SVG instead.

---

## Updated north star

The site should not be:

> A Three.js portfolio.

It should be:

> A clear, gamified Agentic Engineering proof artifact that uses Three.js only when it makes orchestration, transformation, or surprise more powerful.
