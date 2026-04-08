# Career Landscape Explorer — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page web app that lets law students compare how AI affects different legal careers using interactive pentagon radar charts and a five-variable framework.

**Architecture:** Hash-based SPA routing (`#/`, `#/practice`, `#/compare/litigation-civil`, etc.) with vanilla JS modules. All profile data lives in a JS file. State (stars, custom profiles, last view) persists to localStorage. SVG-based radar charts. No build step — just static files served from Render.

**Tech Stack:** Vanilla HTML/CSS/JS (ES modules), SVG for charts, html2canvas for PNG export, Render static hosting.

**Source documents:**
- Spec: `Class 12-1 Career Landscape Explorer Spec.md`
- Profile content source: `AI and the Business of Law - Sector Analysis.md`

---

## File Structure

```
career-landscape/
├── index.html              — Single HTML shell with #app mount point
├── css/
│   └── styles.css          — All styles (entry, browse, compare, builder, starred)
├── js/
│   ├── data.js             — Profile objects + hierarchy tree definitions
│   ├── radar.js            — SVG pentagon chart: create, update, highlight, dim
│   ├── router.js           — Hash-based SPA router
│   ├── state.js            — App state + localStorage read/write
│   ├── views/
│   │   ├── entry.js        — Landing screen with 3 entry paths
│   │   ├── browse.js       — Category & subcategory list screens + breadcrumbs
│   │   ├── compare.js      — Comparison view: chips + radar + detail cards
│   │   ├── builder.js      — Custom profile builder form
│   │   └── starred.js      — Starred comparison view + summary table
│   └── export.js           — PNG download + shareable link encode/decode
└── render.yaml             — Render static site config
```

Each view module exports a single `render(container, params)` function. The router calls the appropriate view's `render()` on hash change.

---

## Task 1: Project Skeleton + Render Config

**Files:**
- Create: `index.html`
- Create: `css/styles.css`
- Create: `js/router.js`
- Create: `render.yaml`

- [ ] **Step 1: Create `render.yaml`**

```yaml
services:
  - type: web
    name: career-landscape-explorer
    runtime: static
    buildCommand: echo "Static site, no build needed"
    staticPublishPath: .
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

- [ ] **Step 2: Create `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Career Landscape Explorer</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <nav id="top-nav">
    <a href="#/" class="nav-logo">Career Landscape Explorer</a>
    <button id="starred-nav-btn" class="starred-nav-btn" style="display:none">
      ★ <span id="starred-count">0</span> Starred Profiles
    </button>
  </nav>
  <main id="app"></main>
  <script type="module" src="js/router.js"></script>
</body>
</html>
```

- [ ] **Step 3: Create minimal `css/styles.css`**

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --purple: #7c3aed;
  --purple-light: #ede9fe;
  --blue: #2563eb;
  --amber: #d97706;
  --red: #dc2626;
  --green: #059669;
  --teal: #0891b2;
  --text: #1a1a1a;
  --text-secondary: #666;
  --text-muted: #888;
  --text-dim: #aaa;
  --border: #e5e7eb;
  --bg: #ffffff;
  --bg-hover: #f9fafb;
  --radius: 10px;
  --font: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

body {
  font-family: var(--font);
  color: var(--text);
  background: var(--bg);
  line-height: 1.5;
}

#top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  background: var(--bg);
  z-index: 100;
}

.nav-logo {
  font-size: 16px;
  font-weight: 600;
  color: var(--purple);
  text-decoration: none;
}

.starred-nav-btn {
  background: none;
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 6px 16px;
  font-size: 14px;
  cursor: pointer;
  color: var(--text);
  transition: background 0.15s;
}

.starred-nav-btn:hover {
  background: var(--bg-hover);
}

#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px;
}
```

- [ ] **Step 4: Create `js/router.js`**

```js
import { renderEntry } from './views/entry.js';
import { renderBrowse } from './views/browse.js';
import { renderCompare } from './views/compare.js';
import { renderBuilder } from './views/builder.js';
import { renderStarred } from './views/starred.js';
import { loadState, getStarredCount } from './state.js';
import { loadFromURL } from './export.js';

const app = document.getElementById('app');

const routes = [
  { pattern: /^#\/$|^$|^#$/,                       view: renderEntry },
  { pattern: /^#\/practice$/,                       view: renderBrowse, params: { mode: 'practice' } },
  { pattern: /^#\/firm$/,                           view: renderBrowse, params: { mode: 'firm' } },
  { pattern: /^#\/practice\/(.+)$/,                 view: renderBrowse, params: { mode: 'practice' } },
  { pattern: /^#\/firm\/(.+)$/,                     view: renderBrowse, params: { mode: 'firm' } },
  { pattern: /^#\/compare\/(.+)$/,                  view: renderCompare },
  { pattern: /^#\/builder$/,                        view: renderBuilder },
  { pattern: /^#\/builder\/(.+)$/,                  view: renderBuilder },
  { pattern: /^#\/starred$/,                        view: renderStarred },
];

function navigate() {
  const hash = window.location.hash || '#/';
  
  // Check for shareable link params on first load
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('starred')) {
    loadFromURL(urlParams);
    window.location.replace('#/starred');
    return;
  }

  for (const route of routes) {
    const match = hash.match(route.pattern);
    if (match) {
      app.innerHTML = '';
      const params = { ...(route.params || {}), segments: match.slice(1) };
      route.view(app, params);
      updateStarredNav();
      return;
    }
  }
  // Fallback
  window.location.hash = '#/';
}

function updateStarredNav() {
  const btn = document.getElementById('starred-nav-btn');
  const count = getStarredCount();
  btn.style.display = count > 0 ? 'block' : 'none';
  document.getElementById('starred-count').textContent = count;
  btn.onclick = () => window.location.hash = '#/starred';
}

window.addEventListener('hashchange', navigate);
window.addEventListener('DOMContentLoaded', () => {
  loadState();
  navigate();
});
```

- [ ] **Step 5: Create stub view files so imports don't break**

Create each of these files with a placeholder render function:

`js/views/entry.js`:
```js
export function renderEntry(container) {
  container.innerHTML = '<h1>Career Landscape Explorer</h1><p>Entry screen placeholder</p>';
}
```

`js/views/browse.js`:
```js
export function renderBrowse(container, params) {
  container.innerHTML = `<p>Browse placeholder (mode: ${params.mode})</p>`;
}
```

`js/views/compare.js`:
```js
export function renderCompare(container, params) {
  container.innerHTML = `<p>Compare placeholder (${params.segments?.[0]})</p>`;
}
```

`js/views/builder.js`:
```js
export function renderBuilder(container, params) {
  container.innerHTML = '<p>Builder placeholder</p>';
}
```

`js/views/starred.js`:
```js
export function renderStarred(container) {
  container.innerHTML = '<p>Starred placeholder</p>';
}
```

`js/state.js`:
```js
let state = { starred: [], customProfiles: [], lastView: '#/' };

export function loadState() {
  try {
    const saved = localStorage.getItem('career-landscape-state');
    if (saved) state = { ...state, ...JSON.parse(saved) };
  } catch (e) { /* ignore corrupt state */ }
}

function saveState() {
  localStorage.setItem('career-landscape-state', JSON.stringify(state));
}

export function getStarredCount() {
  return state.starred.length;
}

export function getState() { return state; }
```

`js/export.js`:
```js
export function loadFromURL(params) {
  // Stub — implemented in Task 12
}
```

- [ ] **Step 6: Verify in browser**

Open `index.html` in a browser (or use a local server: `npx serve .`). You should see:
- Sticky nav bar with "Career Landscape Explorer" in purple
- "Entry screen placeholder" text
- No console errors
- Changing the hash to `#/practice` shows "Browse placeholder (mode: practice)"
- Hash `#/starred` shows "Starred placeholder"

- [ ] **Step 7: Initialize git repo and commit**

```bash
git init
git add index.html css/styles.css js/router.js js/state.js js/export.js js/views/entry.js js/views/browse.js js/views/compare.js js/views/builder.js js/views/starred.js render.yaml
git commit -m "feat: project skeleton with SPA router and Render config"
```

---

## Task 2: Profile Data + Hierarchy Trees

**Files:**
- Create: `js/data.js`

This is the data layer. All ~25-30 profiles stored as JS objects, plus two hierarchy trees (by practice area, by firm type) that reference profile IDs. Profile ratings and descriptions are adapted from the sector analysis document.

- [ ] **Step 1: Create `js/data.js` with the profile data structure and hierarchy trees**

The file exports three things: `PROFILES` (object keyed by ID), `PRACTICE_TREE` (hierarchy for "by practice area"), and `FIRM_TREE` (hierarchy for "by firm type").

```js
// Profile color slots — assigned in order of activation
export const PROFILE_COLORS = ['#2563eb', '#d97706', '#dc2626', '#059669', '#7c3aed', '#0891b2'];

// Verdict badge colors
export const VERDICT_STYLES = {
  protected:  { bg: '#dbeafe', color: '#1e40af', label: 'Well Protected' },
  growth:     { bg: '#ede9fe', color: '#6d28d9', label: 'Growth' },
  multiplier: { bg: '#fef3c7', color: '#92400e', label: 'Force Multiplier' },
  squeezed:   { bg: '#ffedd5', color: '#9a3412', label: 'Squeezed' },
  vulnerable: { bg: '#fee2e2', color: '#991b1b', label: 'Vulnerable' },
  political:  { bg: '#e0f2fe', color: '#0e7490', label: 'Political Variable' },
};

// Variable metadata — used by radar chart axis labels and builder
export const VARIABLES = [
  { key: 'dimensionality',        label: 'Dimensionality',          shortLabel: 'D', sublabel: 'Task complexity' },
  { key: 'focusEffect',           label: 'Focus Effect',            shortLabel: 'F', sublabel: 'Benefit from automation' },
  { key: 'demandElasticity',      label: 'Demand Elasticity',       shortLabel: 'E', sublabel: 'Market expansion' },
  { key: 'selfServiceResistance', label: 'Self-Service Resistance', shortLabel: 'R', sublabel: 'Client bypass risk (inv.)' },
  { key: 'decisionMakerAlignment',label: 'Decision-Maker Alignment',shortLabel: 'A', sublabel: 'Hiring incentives' },
];

// Rating label helpers
export function ratingLabel(value) {
  return ['Low', 'Moderate', 'High', 'Very High'][value - 1] || '';
}

/**
 * PROFILES — keyed by unique string ID.
 * Each profile has: id, name, category (breadcrumb path), firmType,
 * junior {} and senior {} objects with the 5 ratings + verdict + descriptions.
 *
 * Ratings adapted from: "AI and the Business of Law - Sector Analysis.md"
 * The sector analysis uses 4 variables; Focus Effect has been split out from
 * Dimensionality per the spec's 5-variable framework.
 */
export const PROFILES = {
  // ═══════════════════════════════════════
  // LITIGATION — CIVIL
  // ═══════════════════════════════════════

  'biglaw-lit-defense': {
    id: 'biglaw-lit-defense',
    name: 'BigLaw Defense (Am Law 50)',
    category: 'Litigation > Civil',
    firmType: 'BigLaw',
    junior: {
      dimensionality: 3,
      focusEffect: 2,
      demandElasticity: 1,
      selfServiceResistance: 4,
      decisionMakerAlignment: 3,
      verdict: 'Well Protected',
      verdictType: 'protected',
      descriptions: {
        dimensionality: 'Even juniors touch research, drafting, discovery management, and case preparation across multiple workstreams on large matters.',
        focusEffect: 'Some routine tasks get automated, but the firm may need fewer juniors rather than the same juniors doing higher work. Mixed benefit.',
        demandElasticity: 'When a company faces a $2B lawsuit, it doesn\'t shop for a discount. Among the most inelastic segments of the legal market.',
        selfServiceResistance: 'No GC is defending a bet-the-company case with ChatGPT. Stakes too high, work too complex, adversarial dynamics require human judgment.',
        decisionMakerAlignment: 'Partners want revenue, clients want to win. Neither has incentive to displace senior lawyers. But both may thin the junior layer.',
      },
    },
    senior: {
      dimensionality: 4,
      focusEffect: 2,
      demandElasticity: 1,
      selfServiceResistance: 4,
      decisionMakerAlignment: 4,
      verdict: 'Very Well Protected',
      verdictType: 'protected',
      descriptions: {
        dimensionality: 'Lead partner combines strategy, expert management, client counseling at board level, courtroom advocacy, settlement negotiation, and team leadership.',
        focusEffect: 'Already achieved focus through human leverage — associates handle routine work. AI replacing associate work doesn\'t free up much partner time.',
        demandElasticity: 'Bet-the-company litigation is driven by disputes, not by price. Making defense cheaper doesn\'t create more $2B lawsuits.',
        selfServiceResistance: 'No corporation self-serves on existential litigation. The adversarial stakes and reputational risk demand experienced counsel.',
        decisionMakerAlignment: 'The partner IS the decision-maker at this level. Clients depend on the relationship and are fully aligned with keeping senior counsel.',
      },
    },
  },

  'midmarket-commercial-lit': {
    id: 'midmarket-commercial-lit',
    name: 'Mid-Market Commercial Litigation',
    category: 'Litigation > Civil',
    firmType: 'Mid-Market',
    junior: {
      dimensionality: 3,
      focusEffect: 3,
      demandElasticity: 2,
      selfServiceResistance: 3,
      decisionMakerAlignment: 2,
      verdict: 'Squeezed',
      verdictType: 'squeezed',
      descriptions: {
        dimensionality: 'Partners handle a broader range of tasks personally than BigLaw counterparts — less specialization, smaller teams. Juniors get wider exposure.',
        focusEffect: 'Currently stretched across routine and substantive work. AI frees meaningful time for higher-value case strategy and client interaction.',
        demandElasticity: 'Business disputes worth $5–50M are significant but not existential. Clients consider cost when choosing counsel, creating some price sensitivity.',
        selfServiceResistance: 'Sophisticated corporate clients may handle more pre-litigation work internally — demand letters, early case assessment — using AI tools.',
        decisionMakerAlignment: 'Squeezed from both sides: clients consolidating with larger firms that have better AI, and boutiques with lower overhead undercutting on price.',
      },
    },
    senior: {
      dimensionality: 4,
      focusEffect: 2,
      demandElasticity: 2,
      selfServiceResistance: 3,
      decisionMakerAlignment: 3,
      verdict: 'Moderate Protection',
      verdictType: 'squeezed',
      descriptions: {
        dimensionality: 'Senior partners juggle client management, trial strategy, business development, and mentoring — a complex, intertwined bundle.',
        focusEffect: 'Already delegating routine work to juniors. AI doesn\'t dramatically change how partners spend their time.',
        demandElasticity: 'Some clients will bring more disputes to lawyers they trust if costs drop. But the mid-market is price-sensitive enough that savings get passed through.',
        selfServiceResistance: 'For complex disputes, clients still need experienced trial counsel. Self-service risk is low at the senior level.',
        decisionMakerAlignment: 'Client relationships provide some protection, but the firm itself faces structural pressure that threatens the institution.',
      },
    },
  },

  'plaintiffs-mass-tort': {
    id: 'plaintiffs-mass-tort',
    name: 'Plaintiffs\' Mass Tort',
    category: 'Litigation > Civil',
    firmType: 'Mid-Market',
    junior: {
      dimensionality: 2,
      focusEffect: 3,
      demandElasticity: 4,
      selfServiceResistance: 4,
      decisionMakerAlignment: 4,
      verdict: 'Growth',
      verdictType: 'growth',
      descriptions: {
        dimensionality: 'Junior roles center on intake screening, case management, and document processing — important but relatively narrow task sets.',
        focusEffect: 'AI-powered intake frees time to work on case development and client communication. Real upward reallocation.',
        demandElasticity: 'Contingency economics mean every efficiency dollar goes to profit. AI lets firms screen more cases and identify meritorious claims that were previously missed.',
        selfServiceResistance: 'Plaintiffs are injured individuals. Nobody prosecutes their own pharmaceutical litigation.',
        decisionMakerAlignment: 'Partners are entrepreneurs who capture the full upside of efficiency gains. No client is demanding fee reductions — fees are contingent on recovery.',
      },
    },
    senior: {
      dimensionality: 4,
      focusEffect: 2,
      demandElasticity: 4,
      selfServiceResistance: 4,
      decisionMakerAlignment: 4,
      verdict: 'Strong Growth',
      verdictType: 'growth',
      descriptions: {
        dimensionality: 'Lead partners develop case strategy, manage expert witnesses, try bellwether cases, and manage massive case inventories across multiple MDLs.',
        focusEffect: 'Already focused on high-value work through team leverage. AI expands capacity more than it frees partner time.',
        demandElasticity: 'Cheaper plaintiff-side work could significantly increase total litigation volume. The Jevons paradox is most plausible here.',
        selfServiceResistance: 'Zero self-service path. Complex, adversarial, high-stakes litigation requiring deep expertise.',
        decisionMakerAlignment: 'The partner controls everything. Their incentive is growth — more cases, bigger inventories, higher recoveries.',
      },
    },
  },

  'solo-pi': {
    id: 'solo-pi',
    name: 'Solo/Small Personal Injury',
    category: 'Litigation > Civil',
    firmType: 'Solo',
    junior: {
      dimensionality: 4,
      focusEffect: 4,
      demandElasticity: 2,
      selfServiceResistance: 3,
      decisionMakerAlignment: 4,
      verdict: 'Force Multiplier',
      verdictType: 'multiplier',
      descriptions: {
        dimensionality: 'A solo PI lawyer does everything — intake, investigation, medical records, demand letters, negotiation, trial. Deeply intertwined tasks.',
        focusEffect: 'Currently drowning in paperwork. AI handling medical record summaries, demand letter drafts, and case research frees enormous time for client work and negotiation.',
        demandElasticity: 'PI demand is driven by accidents, not legal costs. But lawyers who handle more cases profitably may advertise more aggressively and capture new clients.',
        selfServiceResistance: 'Injured individuals won\'t negotiate with insurance companies using ChatGPT. The power asymmetry is too great and stakes too personal.',
        decisionMakerAlignment: 'You are the decision-maker. No one is cutting your headcount. The only question is whether you adopt AI before your competitor does.',
      },
    },
    senior: {
      dimensionality: 4,
      focusEffect: 3,
      demandElasticity: 2,
      selfServiceResistance: 3,
      decisionMakerAlignment: 4,
      verdict: 'Force Multiplier',
      verdictType: 'multiplier',
      descriptions: {
        dimensionality: 'An experienced PI practitioner adds mentoring, firm management, and complex case selection to an already high-dimensional role.',
        focusEffect: 'Already efficient through experience, but AI still frees meaningful time — especially for case evaluation and settlement negotiation prep.',
        demandElasticity: 'At the margin, a more productive practice can take on cases that were previously not worth the time investment.',
        selfServiceResistance: 'Experienced PI lawyers handle higher-stakes cases where self-service is even less viable.',
        decisionMakerAlignment: 'Full autonomy. You decide your own technology adoption, practice size, and case mix.',
      },
    },
  },

  'insurance-defense': {
    id: 'insurance-defense',
    name: 'Insurance Defense',
    category: 'Litigation > Civil',
    firmType: 'Mid-Market',
    junior: {
      dimensionality: 2,
      focusEffect: 1,
      demandElasticity: 1,
      selfServiceResistance: 1,
      decisionMakerAlignment: 1,
      verdict: 'Vulnerable',
      verdictType: 'vulnerable',
      descriptions: {
        dimensionality: 'Routine motions, coverage opinions, discovery management, and standard summary judgment briefs. Highly standardizable, narrow task set.',
        focusEffect: 'The routine tasks ARE the job. Automating them doesn\'t free you for higher work — it eliminates the reason to have you.',
        demandElasticity: 'Insurance companies are sophisticated repeat players who set the terms. They won\'t buy more defense work just because it\'s cheaper — they\'ll pocket the savings.',
        selfServiceResistance: 'Carriers already use billing guidelines and rate caps aggressively. They are exactly the client that will build AI capability in-house or demand massive fee cuts.',
        decisionMakerAlignment: 'The insurance company\'s incentive is to minimize what it pays law firms, full stop. AI gives them powerful tools to do so — or bring work in-house entirely.',
      },
    },
    senior: {
      dimensionality: 3,
      focusEffect: 2,
      demandElasticity: 1,
      selfServiceResistance: 2,
      decisionMakerAlignment: 1,
      verdict: 'Squeezed',
      verdictType: 'squeezed',
      descriptions: {
        dimensionality: 'Senior insurance defense lawyers add trial capability, carrier relationship management, and complex coverage analysis — more dimensions but still constrained.',
        focusEffect: 'Some freed time for complex matters, but carrier billing pressure means efficiency savings go to the client, not the lawyer.',
        demandElasticity: 'Defense volume is determined by claims volume and carrier strategy. Lower legal costs don\'t create more claims.',
        selfServiceResistance: 'For complex trials, carriers still need outside counsel. But the threshold for "complex enough to need a lawyer" keeps rising.',
        decisionMakerAlignment: 'Carriers are actively hostile to outside counsel costs. Rate pressure has been increasing for a decade and AI accelerates it.',
      },
    },
  },

  // ═══════════════════════════════════════
  // LITIGATION — CRIMINAL
  // ═══════════════════════════════════════

  'public-defender': {
    id: 'public-defender',
    name: 'Public Defender',
    category: 'Litigation > Criminal',
    firmType: 'Government',
    junior: {
      dimensionality: 4,
      focusEffect: 4,
      demandElasticity: 4,
      selfServiceResistance: 4,
      decisionMakerAlignment: 1,
      verdict: 'Political Variable',
      verdictType: 'political',
      descriptions: {
        dimensionality: 'Investigation, legal research, motion practice, plea negotiation, client counseling with vulnerable populations, jury selection, trial advocacy — all from day one.',
        focusEffect: 'Transformative. Public defenders are overwhelmed with caseloads. AI handling research and brief drafting would free enormous time for client interaction and trial prep.',
        demandElasticity: 'The unmet demand for adequate public defense is essentially infinite. AI could let each defender provide dramatically better representation.',
        selfServiceResistance: 'Constitutional right to counsel. Clients cannot afford private counsel — that\'s why they\'re in the system. Zero self-service path.',
        decisionMakerAlignment: 'State legislators and county commissioners are often hostile to public defense funding. AI provides political cover for budget cuts that were ideologically motivated before AI existed.',
      },
    },
    senior: {
      dimensionality: 4,
      focusEffect: 3,
      demandElasticity: 4,
      selfServiceResistance: 4,
      decisionMakerAlignment: 1,
      verdict: 'Political Variable',
      verdictType: 'political',
      descriptions: {
        dimensionality: 'Senior public defenders add supervisory, training, appellate, and policy advocacy responsibilities to an already complex role.',
        focusEffect: 'Already somewhat focused through experience, but still personally handling heavy caseloads. AI frees real time.',
        demandElasticity: 'Latent demand remains infinite at every level. Quality of representation could improve dramatically with AI assistance.',
        selfServiceResistance: 'No change from junior — constitutional mandate and vulnerable population make self-service impossible.',
        decisionMakerAlignment: 'Same political dynamics. Senior defenders may have more political capital to resist cuts, but funding remains legislatively determined.',
      },
    },
  },

  'prosecution': {
    id: 'prosecution',
    name: 'Prosecution',
    category: 'Litigation > Criminal',
    firmType: 'Government',
    junior: {
      dimensionality: 4,
      focusEffect: 3,
      demandElasticity: 3,
      selfServiceResistance: 4,
      decisionMakerAlignment: 3,
      verdict: 'Political Variable',
      verdictType: 'political',
      descriptions: {
        dimensionality: 'Case evaluation, grand jury work, plea negotiation, trial preparation, victim coordination, and courtroom advocacy — high-dimensional from the start.',
        focusEffect: 'AI handles case research and brief drafting. Meaningful reallocation to case evaluation, victim services, and courtroom preparation.',
        demandElasticity: 'Criminal caseloads are backlogged in most jurisdictions. AI could help clear backlogs and prosecute cases that currently get declined.',
        selfServiceResistance: 'The state has a monopoly on prosecution. No self-service concept applies.',
        decisionMakerAlignment: 'Prosecution has broad political support. Legislators are more willing to fund prosecutors than defenders. But budget pressure still exists.',
      },
    },
    senior: {
      dimensionality: 4,
      focusEffect: 2,
      demandElasticity: 3,
      selfServiceResistance: 4,
      decisionMakerAlignment: 3,
      verdict: 'Political Variable',
      verdictType: 'political',
      descriptions: {
        dimensionality: 'Senior prosecutors add supervisory authority, policy-setting, complex case management, and inter-agency coordination.',
        focusEffect: 'Already focused on high-profile and complex cases. AI doesn\'t dramatically change senior prosecutor workflow.',
        demandElasticity: 'Same backlog dynamics, but senior prosecutors are less affected by volume changes — they handle the most serious cases.',
        selfServiceResistance: 'Absolute. The state prosecutes; no one else can.',
        decisionMakerAlignment: 'Elected DAs and politically appointed AGs have complex incentives, but prosecution budgets are generally more politically durable than defense.',
      },
    },
  },

  'private-criminal-defense': {
    id: 'private-criminal-defense',
    name: 'Private Criminal Defense',
    category: 'Litigation > Criminal',
    firmType: 'Small Firm',
    junior: {
      dimensionality: 4,
      focusEffect: 3,
      demandElasticity: 1,
      selfServiceResistance: 4,
      decisionMakerAlignment: 4,
      verdict: 'Well Protected',
      verdictType: 'protected',
      descriptions: {
        dimensionality: 'Investigation, legal research, motion practice, plea negotiation, client counseling, jury selection, trial advocacy. Missing any one task can mean conviction vs. acquittal.',
        focusEffect: 'AI handles research and brief drafting; lawyers shift time to strategy, client interaction, and courtroom work. Meaningful reallocation.',
        demandElasticity: 'Criminal charges are not price-sensitive. You don\'t hire a defense lawyer because it\'s cheap — you hire one because you\'re charged with a crime.',
        selfServiceResistance: 'Constitutional rights, catastrophic consequences of error, and the power asymmetry between individual and state all prevent self-service.',
        decisionMakerAlignment: 'Clients choose their own lawyer and are fully invested in the outcome. The lawyer-client alignment is as strong as it gets.',
      },
    },
    senior: {
      dimensionality: 4,
      focusEffect: 2,
      demandElasticity: 1,
      selfServiceResistance: 4,
      decisionMakerAlignment: 4,
      verdict: 'Well Protected',
      verdictType: 'protected',
      descriptions: {
        dimensionality: 'Experienced trial lawyers add complex case strategy, appellate work, white-collar specialization, and mentoring to an already high-dimensional role.',
        focusEffect: 'Already focused through experience. AI is helpful but doesn\'t transform the senior criminal defense workflow.',
        demandElasticity: 'Same inelastic dynamics. Criminal defense demand is driven by criminal charges, not legal costs.',
        selfServiceResistance: 'Even more protected at the senior level — complex cases with higher stakes demand experienced human counsel.',
        decisionMakerAlignment: 'Clients with the resources for private defense are highly aligned with their lawyer\'s success.',
      },
    },
  },

  // ═══════════════════════════════════════
  // CORPORATE & TRANSACTIONAL
  // ═══════════════════════════════════════

  'biglaw-ma': {
    id: 'biglaw-ma',
    name: 'BigLaw M&A / Capital Markets',
    category: 'Corporate & Transactional',
    firmType: 'BigLaw',
    junior: {
      dimensionality: 2,
      focusEffect: 2,
      demandElasticity: 1,
      selfServiceResistance: 4,
      decisionMakerAlignment: 3,
      verdict: 'Squeezed',
      verdictType: 'squeezed',
      descriptions: {
        dimensionality: 'Junior transactional work centers on due diligence, first-draft document preparation, and data room analysis — important but narrow.',
        focusEffect: 'Some freed time, but the firm may hire fewer juniors rather than give juniors more interesting work. The "class of 40 becomes a class of 25."',
        demandElasticity: 'Deal volume is driven by interest rates, valuations, and strategic logic — not legal costs. Cheaper lawyers don\'t create more mergers.',
        selfServiceResistance: 'No CFO runs a $10B acquisition through ChatGPT. Complex deal execution requires deep expertise across multiple practice areas.',
        decisionMakerAlignment: 'Partners want to maintain revenue. But clients want efficiency, and both sides see reducing junior headcount as a path to lower costs without sacrificing quality.',
      },
    },
    senior: {
      dimensionality: 4,
      focusEffect: 2,
      demandElasticity: 1,
      selfServiceResistance: 4,
      decisionMakerAlignment: 4,
      verdict: 'Well Protected',
      verdictType: 'protected',
      descriptions: {
        dimensionality: 'Lead M&A partner juggles deal structuring, negotiation, regulatory analysis, C-suite counseling, multi-party coordination, and cross-practice integration.',
        focusEffect: 'Already achieved focus through human leverage. AI makes existing leverage cheaper but doesn\'t give partners a new focus effect.',
        demandElasticity: 'Same inelastic dynamics. M&A volume depends on business conditions, not legal fees.',
        selfServiceResistance: 'Complex deals require the orchestration of multiple specialized teams. No realistic self-service path.',
        decisionMakerAlignment: 'At the partner level, the lawyer IS the franchise. Clients depend on the relationship.',
      },
    },
  },

  'midmarket-business': {
    id: 'midmarket-business',
    name: 'Mid-Market Business Counsel',
    category: 'Corporate & Transactional',
    firmType: 'Mid-Market',
    junior: {
      dimensionality: 3,
      focusEffect: 3,
      demandElasticity: 2,
      selfServiceResistance: 2,
      decisionMakerAlignment: 2,
      verdict: 'Squeezed',
      verdictType: 'squeezed',
      descriptions: {
        dimensionality: 'Mid-market juniors handle broader work than BigLaw peers — contract drafting, entity management, basic employment issues — which is protective.',
        focusEffect: 'Currently doing routine tasks personally that AI could handle. Real opportunity to shift to higher-value advisory work.',
        demandElasticity: 'At smaller deal sizes ($10-500M), legal costs are a meaningful percentage. Lower fees could unlock marginal transactions.',
        selfServiceResistance: 'Companies doing smaller deals are increasingly using AI-assisted platforms for contract review, cap table management, and basic governance.',
        decisionMakerAlignment: 'Facing pressure from BigLaw (better AI capabilities, brand premium) and boutiques (lower overhead, more nimble). Must differentiate or decline.',
      },
    },
    senior: {
      dimensionality: 4,
      focusEffect: 2,
      demandElasticity: 2,
      selfServiceResistance: 3,
      decisionMakerAlignment: 3,
      verdict: 'Moderate Protection',
      verdictType: 'squeezed',
      descriptions: {
        dimensionality: 'Senior mid-market lawyers combine deep client relationships, industry expertise, deal structuring, and broad advisory roles.',
        focusEffect: 'Already focused through experience and delegation. AI efficiency mostly flows to the firm, not the individual.',
        demandElasticity: 'Client relationships and industry knowledge create some pricing power, but fee pressure is real.',
        selfServiceResistance: 'For complex transactions, clients still need trusted outside counsel. Self-service risk drops at higher complexity.',
        decisionMakerAlignment: 'Client loyalty and deep relationships provide moderate protection. But the firm\'s institutional viability is the real question.',
      },
    },
  },

  'solo-general-business': {
    id: 'solo-general-business',
    name: 'Solo/Small General Business',
    category: 'Corporate & Transactional',
    firmType: 'Solo',
    junior: {
      dimensionality: 4,
      focusEffect: 4,
      demandElasticity: 2,
      selfServiceResistance: 1,
      decisionMakerAlignment: 4,
      verdict: 'Force Multiplier',
      verdictType: 'multiplier',
      descriptions: {
        dimensionality: 'Solo business lawyers draft contracts, advise on entity formation, handle employment issues, manage compliance, and counsel on everything from leases to partnership disputes.',
        focusEffect: 'Transformative. Currently spending most time on routine tasks AI could handle — contract drafting, basic filings, standard compliance reviews.',
        demandElasticity: 'Small business clients are price-sensitive but need legal help they currently can\'t afford. Some expansion at lower price points.',
        selfServiceResistance: 'Small business clients are the most likely to self-serve using LegalZoom, ChatGPT, and similar tools. They already are. Routine work is being automated away.',
        decisionMakerAlignment: 'You control your own practice. The risk is market competition, not a boss cutting your job.',
      },
    },
    senior: {
      dimensionality: 4,
      focusEffect: 3,
      demandElasticity: 2,
      selfServiceResistance: 2,
      decisionMakerAlignment: 4,
      verdict: 'Force Multiplier',
      verdictType: 'multiplier',
      descriptions: {
        dimensionality: 'Experienced solo practitioners add complex transaction work, dispute resolution, and strategic advisory to their already broad skillset.',
        focusEffect: 'Already efficient through experience, but AI still meaningfully frees time for higher-value advisory and complex work.',
        demandElasticity: 'Long-standing client relationships create stable demand. Some expansion possible as lower costs attract new small business clients.',
        selfServiceResistance: 'Experienced practitioners handle work complex enough that self-service is less viable. But the bottom of the market keeps eroding.',
        decisionMakerAlignment: 'Full autonomy over practice direction and technology adoption.',
      },
    },
  },

  'inhouse-large': {
    id: 'inhouse-large',
    name: 'In-House (Large Corporation)',
    category: 'Corporate & Transactional',
    firmType: 'In-House',
    junior: {
      dimensionality: 2,
      focusEffect: 1,
      demandElasticity: 1,
      selfServiceResistance: 2,
      decisionMakerAlignment: 1,
      verdict: 'Vulnerable',
      verdictType: 'vulnerable',
      descriptions: {
        dimensionality: 'Junior in-house lawyers who review contracts all day have a narrow, low-dimensional role. The work is important but repetitive.',
        focusEffect: 'The routine work IS the job. Automating contract review doesn\'t free you for strategy — it eliminates the need for you. The employer captures 100% of the savings.',
        demandElasticity: 'Legal departments are cost centers, not profit centers. The CFO doesn\'t want to consume more legal services — they want to cut the budget.',
        selfServiceResistance: 'Business teams are already self-serving: sales using AI contract review, HR using AI policy drafting, procurement using automated vendor processing.',
        decisionMakerAlignment: 'The CFO\'s incentive is to minimize the legal department\'s budget. AI gives them the tools to do it. No Jevons paradox for in-house.',
      },
    },
    senior: {
      dimensionality: 4,
      focusEffect: 2,
      demandElasticity: 1,
      selfServiceResistance: 3,
      decisionMakerAlignment: 3,
      verdict: 'Well Protected',
      verdictType: 'protected',
      descriptions: {
        dimensionality: 'Senior in-house counsel advises the CEO on strategy, manages outside counsel relationships, navigates board-level governance, and coordinates cross-functional risk.',
        focusEffect: 'Already focused on strategic work through department structure. AI handles more junior-level tasks, not senior advisory work.',
        demandElasticity: 'Same inelastic cost-center dynamics, but senior strategic counsel is seen as essential rather than discretionary.',
        selfServiceResistance: 'Strategic legal advice requires deep knowledge of the company\'s business and relationships. Not self-servable by business units.',
        decisionMakerAlignment: 'The GC who advises the CEO has strong alignment. The CFO respects strategic legal counsel even while cutting the department.',
      },
    },
  },

  'inhouse-startup': {
    id: 'inhouse-startup',
    name: 'In-House (Startup / Small Company)',
    category: 'Corporate & Transactional',
    firmType: 'In-House',
    junior: {
      dimensionality: 3,
      focusEffect: 3,
      demandElasticity: 1,
      selfServiceResistance: 2,
      decisionMakerAlignment: 2,
      verdict: 'Squeezed',
      verdictType: 'squeezed',
      descriptions: {
        dimensionality: 'Startup lawyers wear many hats — contracts, employment, IP, fundraising, compliance. Broader than large-corp in-house but shallower.',
        focusEffect: 'AI handling routine contracts and compliance frees real time for strategic work on fundraising, partnerships, and product launches.',
        demandElasticity: 'Startups want to minimize legal spend. AI lets the founder\'s cousin with a JD handle more, or skip outside counsel entirely.',
        selfServiceResistance: 'Startups are exactly the companies using AI tools for contracts, terms of service, and basic compliance instead of hiring a lawyer.',
        decisionMakerAlignment: 'The CEO/founder is watching every dollar. AI that reduces the need for a full-time lawyer is very attractive.',
      },
    },
    senior: {
      dimensionality: 4,
      focusEffect: 2,
      demandElasticity: 1,
      selfServiceResistance: 3,
      decisionMakerAlignment: 3,
      verdict: 'Moderate Protection',
      verdictType: 'squeezed',
      descriptions: {
        dimensionality: 'A senior startup GC combines legal strategy, fundraising support, board management, regulatory navigation, and operational leadership.',
        focusEffect: 'Already focused on strategic work. AI mostly helps the small team handle more volume.',
        demandElasticity: 'Strategic legal counsel at a growing company is seen as essential — not something you cut just because AI exists.',
        selfServiceResistance: 'Complex fundraising, M&A, and regulatory work requires experienced counsel the founder can\'t replace with ChatGPT.',
        decisionMakerAlignment: 'At later stages, the CEO values a trusted GC. At early stages, the role may not exist — AI handles basics until the company grows.',
      },
    },
  },

  // ═══════════════════════════════════════
  // INTELLECTUAL PROPERTY
  // ═══════════════════════════════════════

  'patent-prosecution': {
    id: 'patent-prosecution',
    name: 'Patent Prosecution',
    category: 'Intellectual Property',
    firmType: 'Mid-Market',
    junior: {
      dimensionality: 3,
      focusEffect: 3,
      demandElasticity: 4,
      selfServiceResistance: 3,
      decisionMakerAlignment: 3,
      verdict: 'Growth',
      verdictType: 'growth',
      descriptions: {
        dimensionality: 'Combines technical analysis, claim drafting, prior art searching, and Patent Office interaction. Each step builds on the others.',
        focusEffect: 'AI handles prior art searches and initial drafts. Meaningful reallocation to claim strategy and prosecution argument development.',
        demandElasticity: 'Patent protection is heavily cost-suppressed. Many startups and inventors skip patents because they\'re expensive. Cheaper filing could unlock massive latent demand.',
        selfServiceResistance: 'Patent prosecution requires technical expertise and PTO procedure knowledge. But AI tools are improving at prior art searching and initial claim drafting.',
        decisionMakerAlignment: 'Clients want patents. Firms want to file patents. Incentives are aligned toward more, not less, patent work.',
      },
    },
    senior: {
      dimensionality: 4,
      focusEffect: 2,
      demandElasticity: 4,
      selfServiceResistance: 3,
      decisionMakerAlignment: 3,
      verdict: 'Growth',
      verdictType: 'growth',
      descriptions: {
        dimensionality: 'Senior patent practitioners add portfolio strategy, client counseling on IP positioning, and complex prosecution cases to their skillset.',
        focusEffect: 'Already focused on high-value prosecution work. AI expands capacity more than it frees time.',
        demandElasticity: 'If AI makes patents affordable for small innovators, total filing volume could expand substantially. Closest sector to a genuine Jevons paradox.',
        selfServiceResistance: 'Complex prosecution and portfolio strategy require deep expertise that self-service tools can\'t replicate.',
        decisionMakerAlignment: 'Client and practitioner incentives both favor patent volume growth.',
      },
    },
  },

  'ip-litigation': {
    id: 'ip-litigation',
    name: 'IP Litigation',
    category: 'Intellectual Property',
    firmType: 'BigLaw',
    junior: {
      dimensionality: 3,
      focusEffect: 2,
      demandElasticity: 2,
      selfServiceResistance: 4,
      decisionMakerAlignment: 3,
      verdict: 'Well Protected',
      verdictType: 'protected',
      descriptions: {
        dimensionality: 'Complex litigation with specialized technical knowledge requirements. Even juniors engage with technical subject matter deeply.',
        focusEffect: 'Some routine tasks automated, but the specialized nature of the work means juniors still add significant value on technical analysis.',
        demandElasticity: 'IP litigation volume is driven by patent disputes and competitive dynamics. More upstream patents may mean more disputes.',
        selfServiceResistance: 'No one self-serves on patent infringement litigation. Stakes too high, technical expertise too specialized.',
        decisionMakerAlignment: 'Similar to BigLaw defense — partners want revenue, clients want to win. Moderate alignment.',
      },
    },
    senior: {
      dimensionality: 4,
      focusEffect: 2,
      demandElasticity: 2,
      selfServiceResistance: 4,
      decisionMakerAlignment: 4,
      verdict: 'Well Protected',
      verdictType: 'protected',
      descriptions: {
        dimensionality: 'Senior IP litigators combine legal strategy, technical mastery, courtroom advocacy, and client counseling — one of the highest-dimensional roles.',
        focusEffect: 'Already focused through specialization and leverage. AI doesn\'t dramatically change senior workflow.',
        demandElasticity: 'May benefit from upstream growth in patent prosecution volume — more patents filed means more disputes.',
        selfServiceResistance: 'Absolutely no self-service path for complex IP disputes.',
        decisionMakerAlignment: 'Strong client alignment. Companies facing IP threats or enforcing IP rights are fully invested in their counsel.',
      },
    },
  },

  'trademark-copyright': {
    id: 'trademark-copyright',
    name: 'Trademark / Copyright',
    category: 'Intellectual Property',
    firmType: 'Small Firm',
    junior: {
      dimensionality: 1,
      focusEffect: 1,
      demandElasticity: 4,
      selfServiceResistance: 1,
      decisionMakerAlignment: 2,
      verdict: 'Vulnerable',
      verdictType: 'vulnerable',
      descriptions: {
        dimensionality: 'Relatively procedural: search, application, registration. One of the lowest-dimensional legal roles.',
        focusEffect: 'The routine filing tasks ARE the job. Automating them eliminates the position, not frees the person.',
        demandElasticity: 'Massive latent demand from small businesses — cost-suppressed, huge potential volume. But the growth flows to platforms, not law firms.',
        selfServiceResistance: 'Already heavily platform-automated. LegalZoom, Trademarkia, and similar services handle routine filings at a fraction of attorney costs.',
        decisionMakerAlignment: 'Clients are price-sensitive small businesses who have already shown willingness to use platforms instead of lawyers.',
      },
    },
    senior: {
      dimensionality: 3,
      focusEffect: 2,
      demandElasticity: 3,
      selfServiceResistance: 2,
      decisionMakerAlignment: 3,
      verdict: 'Moderate Protection',
      verdictType: 'squeezed',
      descriptions: {
        dimensionality: 'Senior practitioners handle brand strategy, enforcement, portfolio management, and complex disputes — much higher dimensional than filing.',
        focusEffect: 'Freed from routine filings, senior practitioners focus on strategy and enforcement — meaningful but moderate reallocation.',
        demandElasticity: 'Brand enforcement and strategic IP work have moderate elasticity. Complex trademark disputes are less price-sensitive.',
        selfServiceResistance: 'Complex trademark disputes and brand strategy require expertise self-service tools can\'t provide. But competition from platforms persists.',
        decisionMakerAlignment: 'Clients with valuable brands are aligned with protecting them. The relationship strengthens at higher stakes.',
      },
    },
  },

  // ═══════════════════════════════════════
  // REGULATORY & COMPLIANCE
  // ═══════════════════════════════════════

  'regulatory-private': {
    id: 'regulatory-private',
    name: 'Private Practice (BigLaw / Mid-Market)',
    category: 'Regulatory & Compliance',
    firmType: 'BigLaw',
    junior: {
      dimensionality: 3,
      focusEffect: 3,
      demandElasticity: 4,
      selfServiceResistance: 3,
      decisionMakerAlignment: 3,
      verdict: 'Growth',
      verdictType: 'growth',
      descriptions: {
        dimensionality: 'Requires understanding client operations, mapping regulatory frameworks, monitoring changes, advising on implementation, and managing regulatory relationships.',
        focusEffect: 'AI handles regulatory monitoring and standard compliance checklists. Meaningful reallocation to client-specific advisory and novel regulatory questions.',
        demandElasticity: 'Regulatory complexity is growing independently of AI. Every new privacy law, AI governance framework, and ESG requirement creates demand. Cheaper services could bring SMEs into the market.',
        selfServiceResistance: 'For basic compliance (posting notices, standard policies), AI tools can serve clients directly. For substantive strategy, self-service risk is low.',
        decisionMakerAlignment: 'Both firms and clients benefit from compliance. Non-compliance consequences (fines, enforcement) create natural demand.',
      },
    },
    senior: {
      dimensionality: 4,
      focusEffect: 2,
      demandElasticity: 4,
      selfServiceResistance: 4,
      decisionMakerAlignment: 4,
      verdict: 'Strong Growth',
      verdictType: 'growth',
      descriptions: {
        dimensionality: 'Senior regulatory lawyers combine deep regulatory expertise, client industry knowledge, government relationships, and cross-jurisdictional strategy.',
        focusEffect: 'Already focused on complex advisory. AI expands capacity more than it frees time.',
        demandElasticity: 'Structural demand growth from expanding regulation. One of the safest bets in legal practice for sustained demand expansion.',
        selfServiceResistance: 'Interpreting novel regulations, designing compliance programs, and responding to enforcement actions require judgment AI tools can\'t replicate.',
        decisionMakerAlignment: 'Fully aligned. Clients need compliance, firms profit from it, and regulatory growth is legislatively driven.',
      },
    },
  },

  'government-agency': {
    id: 'government-agency',
    name: 'Government Agency Counsel',
    category: 'Regulatory & Compliance',
    firmType: 'Government',
    junior: {
      dimensionality: 3,
      focusEffect: 3,
      demandElasticity: 3,
      selfServiceResistance: 4,
      decisionMakerAlignment: 2,
      verdict: 'Political Variable',
      verdictType: 'political',
      descriptions: {
        dimensionality: 'Agency lawyers draft regulations, review enforcement actions, provide advisory opinions, and coordinate with other agencies — varied, complementary tasks.',
        focusEffect: 'AI handles regulatory drafting and research. Meaningful reallocation to policy analysis and enforcement strategy.',
        demandElasticity: 'Regulatory workload grows with the regulatory state. Backlogged agencies could process more with AI assistance.',
        selfServiceResistance: 'Government has a monopoly on regulation. No self-service concept applies — the agency IS the authority.',
        decisionMakerAlignment: 'Budgets are set by political appropriation. Agencies with broad political support are safer. Those with contested missions face AI-as-budget-cut-cover.',
      },
    },
    senior: {
      dimensionality: 4,
      focusEffect: 2,
      demandElasticity: 3,
      selfServiceResistance: 4,
      decisionMakerAlignment: 2,
      verdict: 'Political Variable',
      verdictType: 'political',
      descriptions: {
        dimensionality: 'Senior agency counsel add policy leadership, inter-agency coordination, congressional testimony preparation, and complex enforcement decisions.',
        focusEffect: 'Already focused on high-level policy and enforcement work. AI mostly helps the junior team.',
        demandElasticity: 'Same dynamics as junior — regulatory workload grows with complexity of the economy.',
        selfServiceResistance: 'Absolute. Government authority cannot be self-served.',
        decisionMakerAlignment: 'Same political dynamics. Senior positions may have slightly more budget protection but are still legislatively determined.',
      },
    },
  },

  'inhouse-compliance': {
    id: 'inhouse-compliance',
    name: 'In-House Compliance',
    category: 'Regulatory & Compliance',
    firmType: 'In-House',
    junior: {
      dimensionality: 3,
      focusEffect: 3,
      demandElasticity: 3,
      selfServiceResistance: 2,
      decisionMakerAlignment: 2,
      verdict: 'Moderate Protection',
      verdictType: 'squeezed',
      descriptions: {
        dimensionality: 'Monitoring regulations, maintaining policies, training employees, managing compliance calendars, and coordinating with outside counsel.',
        focusEffect: 'AI handles compliance monitoring and standard policy updates. Meaningful shift to risk assessment and proactive advisory.',
        demandElasticity: 'Regulatory complexity grows constantly. But the CFO treats compliance as a cost center — more regulation doesn\'t mean more headcount.',
        selfServiceResistance: 'Business teams are increasingly using AI-powered compliance tools directly, reducing the need for dedicated compliance staff.',
        decisionMakerAlignment: 'The CFO sees compliance as a cost to minimize. Just enough to avoid fines, not a penny more.',
      },
    },
    senior: {
      dimensionality: 4,
      focusEffect: 2,
      demandElasticity: 3,
      selfServiceResistance: 3,
      decisionMakerAlignment: 3,
      verdict: 'Well Protected',
      verdictType: 'protected',
      descriptions: {
        dimensionality: 'Senior compliance officers combine regulatory strategy, board reporting, risk management, enforcement response, and cross-functional leadership.',
        focusEffect: 'Already focused on strategic work. AI helps the compliance team handle more with less, which protects the senior leader\'s position.',
        demandElasticity: 'Growing regulatory burden means companies need strategic compliance leadership more, not less.',
        selfServiceResistance: 'Strategic compliance leadership — interpreting novel regulations, managing enforcement risk — cannot be self-served by business units.',
        decisionMakerAlignment: 'Boards and executives increasingly see compliance leadership as essential. Senior compliance roles have growing organizational influence.',
      },
    },
  },

  // ═══════════════════════════════════════
  // FAMILY LAW
  // ═══════════════════════════════════════

  'family-private': {
    id: 'family-private',
    name: 'Family Law — Private Practice',
    category: 'Family Law',
    firmType: 'Small Firm',
    junior: {
      dimensionality: 3,
      focusEffect: 3,
      demandElasticity: 2,
      selfServiceResistance: 3,
      decisionMakerAlignment: 4,
      verdict: 'Moderate Protection',
      verdictType: 'protected',
      descriptions: {
        dimensionality: 'Client counseling, negotiation, mediation, court appearances, financial analysis, and coordination with experts. Emotional and interpersonal work deeply complementary with technical.',
        focusEffect: 'AI handles financial calculations, document drafting, and case law research. Meaningful reallocation to client management, negotiation, and courtroom work.',
        demandElasticity: 'Divorces happen when marriages fail, not when lawyers get cheaper. Some expansion as cost reductions bring contested matters that currently settle badly.',
        selfServiceResistance: 'For contested matters with children and significant assets, people want a human advocate. Uncontested matters are already platform-dominated.',
        decisionMakerAlignment: 'Clients in family disputes are fully invested in their lawyer. Direct client relationship with strong alignment.',
      },
    },
    senior: {
      dimensionality: 4,
      focusEffect: 2,
      demandElasticity: 2,
      selfServiceResistance: 3,
      decisionMakerAlignment: 4,
      verdict: 'Well Protected',
      verdictType: 'protected',
      descriptions: {
        dimensionality: 'Senior family lawyers add complex asset division expertise, high-conflict negotiation skills, and deep court relationships.',
        focusEffect: 'Already focused on high-value work through experience. AI helps but doesn\'t transform the senior workflow.',
        demandElasticity: 'Same dynamics — family law demand is driven by life events, not legal costs.',
        selfServiceResistance: 'Complex family matters — contested custody, high-net-worth divorce — require experienced human counsel.',
        decisionMakerAlignment: 'Direct, strong client-lawyer relationship. Clients in crisis are deeply aligned with their advocate.',
      },
    },
  },

  'family-legal-aid': {
    id: 'family-legal-aid',
    name: 'Family Law — Legal Aid',
    category: 'Family Law',
    firmType: 'Legal Aid',
    junior: {
      dimensionality: 3,
      focusEffect: 4,
      demandElasticity: 4,
      selfServiceResistance: 4,
      decisionMakerAlignment: 1,
      verdict: 'Political Variable',
      verdictType: 'political',
      descriptions: {
        dimensionality: 'Housing, benefits, family law, and consumer protection for clients with complex intersecting needs. Cultural competency and trauma-informed practice required.',
        focusEffect: 'Transformative. Legal aid attorneys are overwhelmed with caseloads. AI handling research and drafting would free enormous time for direct client service.',
        demandElasticity: 'The unmet demand for civil legal aid is vast. Most low-income Americans facing legal problems receive no professional assistance.',
        selfServiceResistance: 'Legal aid clients typically lack the sophistication, language skills, or technical access to self-serve. Many are in crisis.',
        decisionMakerAlignment: 'Legal aid funding has been under political attack since the 1980s. AI provides cover for cuts that were ideologically motivated before AI existed.',
      },
    },
    senior: {
      dimensionality: 4,
      focusEffect: 3,
      demandElasticity: 4,
      selfServiceResistance: 4,
      decisionMakerAlignment: 1,
      verdict: 'Political Variable',
      verdictType: 'political',
      descriptions: {
        dimensionality: 'Senior legal aid lawyers add supervisory roles, impact litigation, policy advocacy, and organizational leadership to direct service work.',
        focusEffect: 'Still personally handling heavy caseloads alongside management. AI frees real time for both client service and organizational leadership.',
        demandElasticity: 'Same infinite unmet demand. Quality of service could improve dramatically with AI assistance.',
        selfServiceResistance: 'Same vulnerable population dynamics. Self-service is not a realistic path for legal aid clients.',
        decisionMakerAlignment: 'Political hostility to legal aid funding persists. Senior leaders may have more advocacy capacity but face the same structural funding challenges.',
      },
    },
  },

  // ═══════════════════════════════════════
  // IMMIGRATION
  // ═══════════════════════════════════════

  'immigration-private': {
    id: 'immigration-private',
    name: 'Immigration — Private Practice',
    category: 'Immigration',
    firmType: 'Small Firm',
    junior: {
      dimensionality: 3,
      focusEffect: 3,
      demandElasticity: 3,
      selfServiceResistance: 3,
      decisionMakerAlignment: 4,
      verdict: 'Moderate Protection',
      verdictType: 'protected',
      descriptions: {
        dimensionality: 'Legal judgment, client counseling with vulnerable populations, form preparation, case strategy, and courtroom advocacy (for removal defense).',
        focusEffect: 'AI handles form preparation and case research. Meaningful reallocation to client counseling, strategy, and court preparation.',
        demandElasticity: 'Many immigrants who need representation cannot currently afford it. Lower costs could expand the market meaningfully.',
        selfServiceResistance: 'For complex cases (asylum, deportation defense), stakes are too high and the system too opaque. Routine H-1B filings face more self-service risk.',
        decisionMakerAlignment: 'Clients choose and pay for their own lawyer. Strong alignment. The risk is market competition, not hostile decision-makers.',
      },
    },
    senior: {
      dimensionality: 4,
      focusEffect: 2,
      demandElasticity: 3,
      selfServiceResistance: 3,
      decisionMakerAlignment: 4,
      verdict: 'Well Protected',
      verdictType: 'protected',
      descriptions: {
        dimensionality: 'Senior immigration lawyers add complex case strategy, agency relationship management, policy advocacy, and specialization in complex visa categories.',
        focusEffect: 'Already focused on complex cases through experience. AI mostly helps with volume and routine case components.',
        demandElasticity: 'Same latent demand dynamics. Senior practitioners can serve more clients at lower cost.',
        selfServiceResistance: 'Complex immigration work — asylum, EB petitions with RFEs, deportation defense — requires deep expertise.',
        decisionMakerAlignment: 'Strong client alignment. Immigrants facing high-stakes proceedings are deeply invested in their counsel.',
      },
    },
  },

  'immigration-nonprofit': {
    id: 'immigration-nonprofit',
    name: 'Immigration — Nonprofit / Legal Aid',
    category: 'Immigration',
    firmType: 'Legal Aid',
    junior: {
      dimensionality: 3,
      focusEffect: 4,
      demandElasticity: 4,
      selfServiceResistance: 4,
      decisionMakerAlignment: 1,
      verdict: 'Political Variable',
      verdictType: 'political',
      descriptions: {
        dimensionality: 'Case preparation, client intake, form filing, legal research, and direct client counseling. Working with vulnerable populations in crisis situations.',
        focusEffect: 'Transformative. Nonprofit immigration lawyers carry crushing caseloads. AI handling form preparation and research would free enormous time for client service.',
        demandElasticity: 'The unmet need for immigration legal services is vast, especially for asylum seekers and those in removal proceedings.',
        selfServiceResistance: 'Clients are often in crisis, may not speak English, and face deportation. No realistic self-service path.',
        decisionMakerAlignment: 'Immigration nonprofit funding is highly politically contested. AI provides cover for cuts in hostile jurisdictions. In supportive jurisdictions, AI expands capacity.',
      },
    },
    senior: {
      dimensionality: 4,
      focusEffect: 3,
      demandElasticity: 4,
      selfServiceResistance: 4,
      decisionMakerAlignment: 1,
      verdict: 'Political Variable',
      verdictType: 'political',
      descriptions: {
        dimensionality: 'Senior nonprofit immigration lawyers add impact litigation, policy advocacy, organizational leadership, and training.',
        focusEffect: 'Still handling direct cases alongside leadership. AI frees real time for both.',
        demandElasticity: 'Same vast unmet demand. Capacity constraints, not demand, limit service.',
        selfServiceResistance: 'Same vulnerable population dynamics as junior level.',
        decisionMakerAlignment: 'Same political dynamics. Leadership positions may provide slightly more funding advocacy capacity.',
      },
    },
  },

  // ═══════════════════════════════════════
  // ESTATE PLANNING
  // ═══════════════════════════════════════

  'estate-hnw': {
    id: 'estate-hnw',
    name: 'Estate Planning (High-Net-Worth)',
    category: 'Estate Planning',
    firmType: 'Mid-Market',
    junior: {
      dimensionality: 3,
      focusEffect: 3,
      demandElasticity: 2,
      selfServiceResistance: 3,
      decisionMakerAlignment: 4,
      verdict: 'Well Protected',
      verdictType: 'protected',
      descriptions: {
        dimensionality: 'Multi-generational trust design, cross-jurisdictional tax planning, business succession structuring, and family governance counseling.',
        focusEffect: 'AI handles document drafting and tax calculations. Meaningful reallocation to client counseling and complex planning strategy.',
        demandElasticity: 'HNW estate planning demand is driven by wealth, not legal costs. Some modest expansion as practitioners serve moderately wealthy clients.',
        selfServiceResistance: 'Clients with $10M+ estates are not using LegalZoom. The complexity and stakes demand professional counsel.',
        decisionMakerAlignment: 'Clients choose and pay for their own estate planning. Strong alignment — they want their wealth protected.',
      },
    },
    senior: {
      dimensionality: 4,
      focusEffect: 2,
      demandElasticity: 2,
      selfServiceResistance: 4,
      decisionMakerAlignment: 4,
      verdict: 'Well Protected',
      verdictType: 'protected',
      descriptions: {
        dimensionality: 'Senior practitioners combine multi-generational planning, business succession, philanthropic structuring, and deep family relationship management.',
        focusEffect: 'Already focused on high-value planning through experience. AI helps with drafting but doesn\'t change the advisory relationship.',
        demandElasticity: 'Same wealth-driven dynamics. May expand client base modestly downward with AI-assisted efficiency.',
        selfServiceResistance: 'Complex estate planning for wealthy families is deeply relationship-based and stakes are very high.',
        decisionMakerAlignment: 'Full client alignment. Families with significant wealth are deeply invested in their estate planning counsel.',
      },
    },
  },

  'estate-general': {
    id: 'estate-general',
    name: 'Estate Planning (General Practice)',
    category: 'Estate Planning',
    firmType: 'Solo',
    junior: {
      dimensionality: 1,
      focusEffect: 1,
      demandElasticity: 4,
      selfServiceResistance: 1,
      decisionMakerAlignment: 4,
      verdict: 'Vulnerable',
      verdictType: 'vulnerable',
      descriptions: {
        dimensionality: 'Simple wills and trusts involve relatively formulaic information-gathering and document generation. Low-dimensional by nature.',
        focusEffect: 'The routine document generation IS the job. Automating it doesn\'t free time — it eliminates the need.',
        demandElasticity: 'Massive latent demand — most Americans don\'t have a will. But demand unlocked at lower costs flows to platforms, not lawyers. LegalZoom had 1.92M subscribers in early 2025.',
        selfServiceResistance: 'Very high self-service risk. The primary barriers were cost and inconvenience — exactly what platforms solve.',
        decisionMakerAlignment: 'You control your own practice, but the market is moving to platforms. Self-determination without market protection.',
      },
    },
    senior: {
      dimensionality: 2,
      focusEffect: 2,
      demandElasticity: 3,
      selfServiceResistance: 2,
      decisionMakerAlignment: 4,
      verdict: 'Squeezed',
      verdictType: 'squeezed',
      descriptions: {
        dimensionality: 'Experienced general practice estate planners handle moderately complex estates, probate, and trust administration — more dimensional than basic wills.',
        focusEffect: 'Some freed time for complex matters, but the routine base that funded the practice is eroding to platforms.',
        demandElasticity: 'Complex estate work has moderate demand growth. But the simple work that paid the bills is disappearing.',
        selfServiceResistance: 'Moderate complexity estates still benefit from professional counsel, but the threshold keeps rising.',
        decisionMakerAlignment: 'Practice autonomy, but facing a structural market shift toward platforms for the bread-and-butter work.',
      },
    },
  },

  // ═══════════════════════════════════════
  // EMPLOYMENT & LABOR
  // ═══════════════════════════════════════

  'employment-management': {
    id: 'employment-management',
    name: 'Management-Side (Firm)',
    category: 'Employment & Labor',
    firmType: 'Mid-Market',
    junior: {
      dimensionality: 3,
      focusEffect: 3,
      demandElasticity: 3,
      selfServiceResistance: 2,
      decisionMakerAlignment: 2,
      verdict: 'Squeezed',
      verdictType: 'squeezed',
      descriptions: {
        dimensionality: 'Advising on hiring, termination, wage/hour compliance, discrimination claims, and policy drafting. Moderate variety with complementary tasks.',
        focusEffect: 'AI handles policy drafting and compliance checklists. Meaningful shift to strategic counseling and complex claim defense.',
        demandElasticity: 'Employment law demand grows with regulatory complexity and litigation trends. Lower costs could bring more SME clients.',
        selfServiceResistance: 'HR departments are already using AI-powered compliance tools, policy generators, and employee handbook builders. Routine advisory is self-servable.',
        decisionMakerAlignment: 'Corporate clients view employment law as a cost to manage. They\'ll bring routine work in-house and only send complex matters to outside counsel.',
      },
    },
    senior: {
      dimensionality: 4,
      focusEffect: 2,
      demandElasticity: 3,
      selfServiceResistance: 3,
      decisionMakerAlignment: 3,
      verdict: 'Moderate Protection',
      verdictType: 'squeezed',
      descriptions: {
        dimensionality: 'Senior employment lawyers add complex litigation defense, class action strategy, executive negotiation, and regulatory counseling.',
        focusEffect: 'Already focused on complex matters. AI mostly impacts the junior team.',
        demandElasticity: 'Complex employment disputes and class actions provide stable demand for senior practitioners.',
        selfServiceResistance: 'Complex employment matters — class actions, executive disputes, agency investigations — require experienced counsel.',
        decisionMakerAlignment: 'Clients facing serious employment matters are aligned with their counsel. Routine advisory may migrate in-house.',
      },
    },
  },

  'employment-plaintiff': {
    id: 'employment-plaintiff',
    name: 'Plaintiff-Side (Firm)',
    category: 'Employment & Labor',
    firmType: 'Small Firm',
    junior: {
      dimensionality: 3,
      focusEffect: 3,
      demandElasticity: 3,
      selfServiceResistance: 3,
      decisionMakerAlignment: 4,
      verdict: 'Growth',
      verdictType: 'growth',
      descriptions: {
        dimensionality: 'Intake, case evaluation, discovery, deposition preparation, and trial prep. Similar to mass tort but with individual employment claims.',
        focusEffect: 'AI handles case research and document drafting. Reallocation to client interaction and case development.',
        demandElasticity: 'Many employees who experience discrimination or wage theft don\'t pursue claims because it\'s too expensive or intimidating. Lower costs expand access.',
        selfServiceResistance: 'Employees facing workplace disputes need professional advocacy against employers with more resources. Power asymmetry prevents self-service.',
        decisionMakerAlignment: 'Contingency model means partners capture efficiency gains directly. No fee pressure from sophisticated clients — individual employees are aligned.',
      },
    },
    senior: {
      dimensionality: 4,
      focusEffect: 2,
      demandElasticity: 3,
      selfServiceResistance: 4,
      decisionMakerAlignment: 4,
      verdict: 'Growth',
      verdictType: 'growth',
      descriptions: {
        dimensionality: 'Senior plaintiff-side lawyers add class/collective action leadership, complex litigation strategy, and firm management.',
        focusEffect: 'Already focused on high-value litigation work. AI helps the team handle more cases.',
        demandElasticity: 'Same latent demand dynamics. Lower costs enable more workers to pursue legitimate claims.',
        selfServiceResistance: 'Complex employment litigation requires experienced trial counsel. No self-service path.',
        decisionMakerAlignment: 'Contingency alignment is strongest here — the firm profits when workers win.',
      },
    },
  },

  'employment-inhouse-gov': {
    id: 'employment-inhouse-gov',
    name: 'In-House / Government (Employment)',
    category: 'Employment & Labor',
    firmType: 'In-House',
    junior: {
      dimensionality: 3,
      focusEffect: 2,
      demandElasticity: 1,
      selfServiceResistance: 2,
      decisionMakerAlignment: 2,
      verdict: 'Squeezed',
      verdictType: 'squeezed',
      descriptions: {
        dimensionality: 'Handling investigations, policy drafting, training, and compliance across the organization. Moderate variety.',
        focusEffect: 'Some freed time from AI-assisted policy work, but the role is already somewhat focused on internal advisory.',
        demandElasticity: 'In-house employment work is determined by company operations, not legal costs. No expansion when costs fall.',
        selfServiceResistance: 'HR departments increasingly self-serve on routine employment matters using AI-powered tools.',
        decisionMakerAlignment: 'The company treats in-house employment counsel as a cost to minimize. Budget pressure is constant.',
      },
    },
    senior: {
      dimensionality: 4,
      focusEffect: 2,
      demandElasticity: 1,
      selfServiceResistance: 3,
      decisionMakerAlignment: 3,
      verdict: 'Moderate Protection',
      verdictType: 'squeezed',
      descriptions: {
        dimensionality: 'Senior in-house employment leaders combine strategy, executive counseling, litigation management, regulatory compliance, and organizational culture.',
        focusEffect: 'Already focused on strategic work. AI mostly benefits the junior team.',
        demandElasticity: 'Same inelastic cost-center dynamics.',
        selfServiceResistance: 'Complex employment matters — executive exits, class actions, investigations — require experienced in-house leadership.',
        decisionMakerAlignment: 'Senior employment counsel is increasingly valued by boards and executives concerned about workforce risk.',
      },
    },
  },
};

// ═══════════════════════════════════════
// HIERARCHY TREES
// ═══════════════════════════════════════

/**
 * Each node has: label, children (array of subnodes or profile IDs).
 * Leaf nodes are profile ID strings. Branch nodes have { label, children }.
 */
export const PRACTICE_TREE = [
  {
    label: 'Litigation',
    children: [
      {
        label: 'Civil',
        children: [
          'biglaw-lit-defense',
          'midmarket-commercial-lit',
          'plaintiffs-mass-tort',
          'solo-pi',
          'insurance-defense',
        ],
      },
      {
        label: 'Criminal',
        children: [
          'public-defender',
          'prosecution',
          'private-criminal-defense',
        ],
      },
    ],
  },
  {
    label: 'Corporate & Transactional',
    children: [
      'biglaw-ma',
      'midmarket-business',
      'solo-general-business',
      'inhouse-large',
      'inhouse-startup',
    ],
  },
  {
    label: 'Intellectual Property',
    children: [
      'patent-prosecution',
      'ip-litigation',
      'trademark-copyright',
    ],
  },
  {
    label: 'Regulatory & Compliance',
    children: [
      'regulatory-private',
      'government-agency',
      'inhouse-compliance',
    ],
  },
  {
    label: 'Family Law',
    children: [
      'family-private',
      'family-legal-aid',
    ],
  },
  {
    label: 'Immigration',
    children: [
      'immigration-private',
      'immigration-nonprofit',
    ],
  },
  {
    label: 'Estate Planning',
    children: [
      'estate-hnw',
      'estate-general',
    ],
  },
  {
    label: 'Employment & Labor',
    children: [
      'employment-management',
      'employment-plaintiff',
      'employment-inhouse-gov',
    ],
  },
];

export const FIRM_TREE = [
  {
    label: 'BigLaw (Am Law 50)',
    children: [
      'biglaw-lit-defense',
      'biglaw-ma',
      'ip-litigation',
      'regulatory-private',
    ],
  },
  {
    label: 'Mid-Market (Am Law 100-200, Regional)',
    children: [
      'midmarket-commercial-lit',
      'midmarket-business',
      'patent-prosecution',
      'estate-hnw',
      'employment-management',
    ],
  },
  {
    label: 'Small Firm (2-20 attorneys)',
    children: [
      'insurance-defense',
      'private-criminal-defense',
      'trademark-copyright',
      'family-private',
      'immigration-private',
      'employment-plaintiff',
    ],
  },
  {
    label: 'Solo Practice',
    children: [
      'solo-pi',
      'solo-general-business',
      'estate-general',
    ],
  },
  {
    label: 'Government',
    children: [
      'prosecution',
      'public-defender',
      'government-agency',
    ],
  },
  {
    label: 'In-House',
    children: [
      'inhouse-large',
      'inhouse-startup',
      'inhouse-compliance',
      'employment-inhouse-gov',
    ],
  },
  {
    label: 'Legal Aid / Nonprofit',
    children: [
      'family-legal-aid',
      'immigration-nonprofit',
    ],
  },
];

/**
 * Resolve a tree path (e.g., "Litigation/Civil") to the children at that level.
 * Returns { label, children, breadcrumbs } where children are either subnodes or profile IDs.
 */
export function resolveTreePath(tree, pathSegments) {
  let current = tree;
  const breadcrumbs = [];

  for (const segment of pathSegments) {
    const decoded = decodeURIComponent(segment);
    const node = current.find(n => typeof n === 'object' && n.label === decoded);
    if (!node) return null;
    breadcrumbs.push(node.label);
    current = node.children;
  }

  return { children: current, breadcrumbs };
}

/**
 * Collect all leaf profile IDs from a tree node's children.
 */
export function collectProfileIds(children) {
  const ids = [];
  for (const child of children) {
    if (typeof child === 'string') {
      ids.push(child);
    } else {
      ids.push(...collectProfileIds(child.children));
    }
  }
  return ids;
}
```

- [ ] **Step 2: Verify data integrity**

Open the browser console and run:
```js
import('./js/data.js').then(m => {
  const ids = Object.keys(m.PROFILES);
  console.log(`${ids.length} profiles loaded`);
  // Check every ID referenced in trees exists in PROFILES
  const check = (tree) => tree.forEach(n => {
    if (typeof n === 'string') { if (!m.PROFILES[n]) console.error('Missing:', n); }
    else check(n.children);
  });
  check(m.PRACTICE_TREE);
  check(m.FIRM_TREE);
  console.log('Tree integrity check complete');
});
```

Expected: 27 profiles loaded, no "Missing" errors.

- [ ] **Step 3: Commit**

```bash
git add js/data.js
git commit -m "feat: add profile data with 27 profiles and two hierarchy trees"
```

---

## Task 3: SVG Radar Chart Engine

**Files:**
- Create: `js/radar.js`

The radar chart is the centerpiece of the app. This module handles all SVG rendering: grid, axes, profile shapes, highlighting, and the senior overlay.

- [ ] **Step 1: Create `js/radar.js`**

```js
import { VARIABLES, PROFILE_COLORS } from './data.js';

const TAU = Math.PI * 2;
const AXES = 5;
const ANGLE_OFFSET = -Math.PI / 2; // Start from top (12 o'clock)
const MAX_RATING = 4;
const GRID_LEVELS = 4;

/**
 * Create a radar chart SVG element.
 * @param {Object} options
 * @param {number} options.size - SVG width/height in px
 * @returns {{ svg: SVGElement, update: Function, highlight: Function, clearHighlight: Function }}
 */
export function createRadarChart({ size = 480 } = {}) {
  const margin = 60;
  const center = size / 2;
  const maxRadius = (size / 2) - margin;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
  svg.setAttribute('width', '100%');
  svg.style.maxWidth = `${size}px`;

  // Layer groups (back to front)
  const gridGroup = createGroup(svg, 'grid');
  const axisGroup = createGroup(svg, 'axes');
  const shapesGroup = createGroup(svg, 'shapes');
  const labelsGroup = createGroup(svg, 'labels');

  // Draw grid
  for (let level = 1; level <= GRID_LEVELS; level++) {
    const r = (level / GRID_LEVELS) * maxRadius;
    const points = axisPoints(AXES, r, center);
    const polygon = createPolygon(points, {
      fill: 'none',
      stroke: level === GRID_LEVELS ? '#ddd' : '#f0f0f0',
      'stroke-width': '0.5',
    });
    gridGroup.appendChild(polygon);
  }

  // Draw axis lines
  for (let i = 0; i < AXES; i++) {
    const angle = (TAU / AXES) * i + ANGLE_OFFSET;
    const x = center + maxRadius * Math.sin(angle + Math.PI / 2 + Math.PI);
    const y = center - maxRadius * Math.cos(angle + Math.PI / 2 + Math.PI);
    // Recalculate correctly
    const ax = center + maxRadius * Math.cos(angle);
    const ay = center + maxRadius * Math.sin(angle);
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', center);
    line.setAttribute('y1', center);
    line.setAttribute('x2', ax);
    line.setAttribute('y2', ay);
    line.setAttribute('stroke', '#eaeaea');
    line.setAttribute('stroke-width', '0.5');
    axisGroup.appendChild(line);
  }

  // Draw axis labels
  for (let i = 0; i < AXES; i++) {
    const angle = (TAU / AXES) * i + ANGLE_OFFSET;
    const labelR = maxRadius + 24;
    const lx = center + labelR * Math.cos(angle);
    const ly = center + labelR * Math.sin(angle);

    const variable = VARIABLES[i];

    // Main label
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', lx);
    text.setAttribute('y', ly);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('font-size', '11');
    text.setAttribute('font-weight', '600');
    text.setAttribute('fill', '#444');
    text.textContent = variable.label;
    labelsGroup.appendChild(text);

    // Sublabel
    const sub = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    sub.setAttribute('x', lx);
    sub.setAttribute('y', ly + 14);
    sub.setAttribute('text-anchor', 'middle');
    sub.setAttribute('dominant-baseline', 'middle');
    sub.setAttribute('font-size', '9.5');
    sub.setAttribute('fill', '#aaa');
    sub.textContent = variable.sublabel;
    labelsGroup.appendChild(sub);
  }

  // Track active shapes for highlight/dim
  let activeShapes = {};

  /**
   * Update the chart with a set of profiles.
   * @param {Array<{ id: string, ratings: number[], color: string, seniorRatings?: number[] }>} profiles
   */
  function update(profiles) {
    shapesGroup.innerHTML = '';
    activeShapes = {};

    profiles.forEach(({ id, ratings, color, seniorRatings }) => {
      // Main shape
      const points = ratings.map((r, i) => {
        const angle = (TAU / AXES) * i + ANGLE_OFFSET;
        const radius = (r / MAX_RATING) * maxRadius;
        return [
          center + radius * Math.cos(angle),
          center + radius * Math.sin(angle),
        ];
      });

      const shape = createPolygon(points, {
        fill: color,
        'fill-opacity': '0.18',
        stroke: color,
        'stroke-width': '1.5',
      });
      shape.dataset.profileId = id;
      shapesGroup.appendChild(shape);

      // Senior overlay (dashed)
      let seniorShape = null;
      if (seniorRatings) {
        const seniorPoints = seniorRatings.map((r, i) => {
          const angle = (TAU / AXES) * i + ANGLE_OFFSET;
          const radius = (r / MAX_RATING) * maxRadius;
          return [
            center + radius * Math.cos(angle),
            center + radius * Math.sin(angle),
          ];
        });

        seniorShape = createPolygon(seniorPoints, {
          fill: 'none',
          stroke: color,
          'stroke-width': '1.5',
          'stroke-dasharray': '6 4',
          opacity: '0.5',
        });
        seniorShape.dataset.profileId = id;
        seniorShape.dataset.senior = 'true';
        shapesGroup.appendChild(seniorShape);
      }

      activeShapes[id] = { main: shape, senior: seniorShape };
    });
  }

  /**
   * Highlight one profile, dim others.
   * @param {string|null} profileId - ID to highlight, or null to clear
   */
  function highlight(profileId) {
    Object.entries(activeShapes).forEach(([id, { main, senior }]) => {
      if (profileId && id !== profileId) {
        main.style.opacity = '0.2';
        if (senior) senior.style.opacity = '0.1';
      } else {
        main.style.opacity = '1';
        if (senior) senior.style.opacity = '0.5';
      }
    });
  }

  function clearHighlight() {
    Object.values(activeShapes).forEach(({ main, senior }) => {
      main.style.opacity = '1';
      if (senior) senior.style.opacity = '0.5';
    });
  }

  return { svg, update, highlight, clearHighlight };
}

// ── SVG Helpers ──

function createGroup(parent, className) {
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.setAttribute('class', className);
  parent.appendChild(g);
  return g;
}

function createPolygon(points, attrs) {
  const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  polygon.setAttribute('points', points.map(p => p.join(',')).join(' '));
  Object.entries(attrs).forEach(([k, v]) => polygon.setAttribute(k, v));
  return polygon;
}

function axisPoints(n, radius, center) {
  return Array.from({ length: n }, (_, i) => {
    const angle = (TAU / n) * i + ANGLE_OFFSET;
    return [
      center + radius * Math.cos(angle),
      center + radius * Math.sin(angle),
    ];
  });
}

/**
 * Render a standalone legend below the chart.
 * @param {HTMLElement} container
 * @param {Array<{ id: string, name: string, color: string }>} items
 * @param {Function} onClickItem - callback(id) when legend item clicked
 */
export function renderLegend(container, items, onClickItem) {
  const legend = document.createElement('div');
  legend.className = 'radar-legend';

  items.forEach(({ id, name, color }) => {
    const item = document.createElement('button');
    item.className = 'legend-item';
    item.innerHTML = `<span class="legend-swatch" style="background:${color}"></span>${name}`;
    item.onclick = () => onClickItem(id);
    legend.appendChild(item);
  });

  container.appendChild(legend);
  return legend;
}
```

- [ ] **Step 2: Add radar chart styles to `css/styles.css`**

Append to `css/styles.css`:

```css
/* ── Radar Chart ── */

.radar-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
  justify-content: center;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  color: var(--text-secondary);
  transition: background 0.15s;
}

.legend-item:hover {
  background: var(--bg-hover);
}

.legend-swatch {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}
```

- [ ] **Step 3: Quick visual test**

Temporarily add to the end of `js/views/entry.js`:

```js
import { createRadarChart, renderLegend } from '../radar.js';
import { PROFILES, PROFILE_COLORS, VARIABLES } from '../data.js';

export function renderEntry(container) {
  container.innerHTML = '<h1>Radar Chart Test</h1>';

  const { svg, update, highlight, clearHighlight } = createRadarChart({ size: 480 });
  container.appendChild(svg);

  const testProfiles = ['biglaw-lit-defense', 'insurance-defense', 'solo-pi'];
  const chartData = testProfiles.map((id, i) => {
    const p = PROFILES[id];
    const ratings = VARIABLES.map(v => p.junior[v.key]);
    return { id, ratings, color: PROFILE_COLORS[i] };
  });

  update(chartData);

  const legendContainer = document.createElement('div');
  container.appendChild(legendContainer);
  renderLegend(legendContainer, testProfiles.map((id, i) => ({
    id, name: PROFILES[id].name, color: PROFILE_COLORS[i],
  })), (id) => {
    highlight(id);
    // Click again to clear
    setTimeout(() => clearHighlight(), 2000);
  });
}
```

Open in browser. You should see:
- Pentagon grid with 4 concentric rings
- 5 axis labels (Dimensionality at top, others at 72deg intervals)
- 3 overlapping colored pentagon shapes (blue, amber, red)
- Legend below with clickable items
- Clicking a legend item highlights that shape and dims others

- [ ] **Step 4: Revert the entry.js test and restore the placeholder**

Replace the test code in `js/views/entry.js` back to:

```js
export function renderEntry(container) {
  container.innerHTML = '<h1>Career Landscape Explorer</h1><p>Entry screen placeholder</p>';
}
```

- [ ] **Step 5: Commit**

```bash
git add js/radar.js css/styles.css
git commit -m "feat: SVG pentagon radar chart with grid, labels, shapes, and highlight"
```

---

## Task 4: State Management + localStorage

**Files:**
- Modify: `js/state.js`

Replace the stub with full state management: starred profiles, custom profiles, active comparison state, and localStorage persistence.

- [ ] **Step 1: Replace `js/state.js` with full implementation**

```js
const STORAGE_KEY = 'career-landscape-state';

let state = {
  starred: [],           // Array of profile IDs (string)
  customProfiles: {},    // Object keyed by custom ID: { id, name, junior: { ...ratings }, senior: null }
  lastView: '#/',        // Last hash for resume
};

export function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      state = { ...state, ...parsed };
    }
  } catch (e) {
    console.warn('Failed to load state:', e);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save state:', e);
  }
}

// ── Starred ──

export function getStarredCount() {
  return state.starred.length;
}

export function getStarredIds() {
  return [...state.starred];
}

export function isStarred(profileId) {
  return state.starred.includes(profileId);
}

export function toggleStar(profileId) {
  const idx = state.starred.indexOf(profileId);
  if (idx >= 0) {
    state.starred.splice(idx, 1);
  } else {
    state.starred.push(profileId);
  }
  saveState();
  updateStarredNav();
}

export function removeStar(profileId) {
  const idx = state.starred.indexOf(profileId);
  if (idx >= 0) {
    state.starred.splice(idx, 1);
    saveState();
    updateStarredNav();
  }
}

// ── Custom Profiles ──

export function getCustomProfiles() {
  return { ...state.customProfiles };
}

export function getCustomProfile(id) {
  return state.customProfiles[id] || null;
}

export function saveCustomProfile(profile) {
  state.customProfiles[profile.id] = profile;
  // Auto-star custom profiles
  if (!state.starred.includes(profile.id)) {
    state.starred.push(profile.id);
  }
  saveState();
  updateStarredNav();
}

export function deleteCustomProfile(id) {
  delete state.customProfiles[id];
  removeStar(id);
}

// ── Last View ──

export function setLastView(hash) {
  state.lastView = hash;
  saveState();
}

export function getLastView() {
  return state.lastView;
}

// ── Bulk operations (for shareable links) ──

export function setStarredIds(ids) {
  state.starred = [...ids];
  saveState();
  updateStarredNav();
}

export function setCustomProfiles(profiles) {
  state.customProfiles = { ...profiles };
  saveState();
}

// ── Nav update helper ──

function updateStarredNav() {
  const btn = document.getElementById('starred-nav-btn');
  if (!btn) return;
  const count = getStarredCount();
  btn.style.display = count > 0 ? 'block' : 'none';
  const countEl = document.getElementById('starred-count');
  if (countEl) countEl.textContent = count;
}

export function getState() { return state; }
```

- [ ] **Step 2: Verify localStorage works**

Open browser console:
```js
import('./js/state.js').then(m => {
  m.loadState();
  m.toggleStar('biglaw-lit-defense');
  m.toggleStar('solo-pi');
  console.log('Starred:', m.getStarredIds()); // ['biglaw-lit-defense', 'solo-pi']
  console.log('Count:', m.getStarredCount()); // 2
  console.log(localStorage.getItem('career-landscape-state')); // JSON with starred array
});
```

Clear localStorage after testing: `localStorage.clear()`

- [ ] **Step 3: Commit**

```bash
git add js/state.js
git commit -m "feat: state management with localStorage persistence for stars and custom profiles"
```

---

## Task 5: Entry Screen

**Files:**
- Modify: `js/views/entry.js`
- Modify: `css/styles.css`

- [ ] **Step 1: Implement `js/views/entry.js`**

```js
export function renderEntry(container) {
  container.innerHTML = `
    <div class="entry-screen">
      <div class="entry-header">
        <h1 class="entry-title">How will AI reshape your future practice?</h1>
        <p class="entry-subtitle">
          Explore how AI's economic impact varies across legal practice areas, firm types, and seniority levels 
          using a five-variable framework adapted from the O-Ring model.
        </p>
      </div>

      <div class="entry-cards">
        <a href="#/practice" class="entry-card">
          <div class="entry-card-icon">&#9878;</div>
          <h2 class="entry-card-title">Browse by Practice Area</h2>
          <p class="entry-card-desc">
            Litigation, Corporate, IP, Regulatory, Family, Immigration, Estate, Employment
          </p>
          <span class="entry-card-example">e.g., Litigation &rarr; Civil &rarr; BigLaw Defense</span>
        </a>

        <a href="#/firm" class="entry-card">
          <div class="entry-card-icon">&#127970;</div>
          <h2 class="entry-card-title">Browse by Firm Type</h2>
          <p class="entry-card-desc">
            BigLaw, Mid-Market, Small Firm, Solo, Government, In-House, Legal Aid
          </p>
          <span class="entry-card-example">e.g., BigLaw &rarr; M&A / Capital Markets</span>
        </a>
      </div>

      <a href="#/builder" class="entry-custom-btn">
        + Build a Custom Profile
      </a>
    </div>
  `;
}
```

- [ ] **Step 2: Add entry screen styles to `css/styles.css`**

Append:

```css
/* ── Entry Screen ── */

.entry-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 16px;
  max-width: 720px;
  margin: 0 auto;
}

.entry-header {
  text-align: center;
  margin-bottom: 48px;
}

.entry-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 12px;
  line-height: 1.3;
}

.entry-subtitle {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 560px;
  margin: 0 auto;
}

.entry-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 100%;
  margin-bottom: 32px;
}

.entry-card {
  display: flex;
  flex-direction: column;
  padding: 28px 24px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  text-decoration: none;
  color: var(--text);
  transition: border-color 0.15s, box-shadow 0.15s;
}

.entry-card:hover {
  border-color: var(--purple);
  box-shadow: 0 2px 12px rgba(124, 58, 237, 0.08);
}

.entry-card-icon {
  font-size: 28px;
  margin-bottom: 12px;
}

.entry-card-title {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 8px;
}

.entry-card-desc {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 12px;
  line-height: 1.5;
}

.entry-card-example {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: auto;
}

.entry-custom-btn {
  display: inline-block;
  padding: 12px 28px;
  border: 2px dashed var(--border);
  border-radius: var(--radius);
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: border-color 0.15s, color 0.15s;
}

.entry-custom-btn:hover {
  border-color: var(--purple);
  color: var(--purple);
}
```

- [ ] **Step 3: Verify in browser**

Navigate to `#/`. You should see:
- "How will AI reshape your future practice?" heading centered
- Subtitle paragraph
- Two side-by-side cards: "Browse by Practice Area" and "Browse by Firm Type"
- Dashed "Build a Custom Profile" button below
- Hover effects on cards (purple border, subtle shadow) and custom button

- [ ] **Step 4: Commit**

```bash
git add js/views/entry.js css/styles.css
git commit -m "feat: entry screen with practice area, firm type, and custom profile entry paths"
```

---

## Task 6: Browse / Category Screens + Breadcrumbs

**Files:**
- Modify: `js/views/browse.js`
- Modify: `css/styles.css`

- [ ] **Step 1: Implement `js/views/browse.js`**

```js
import { PRACTICE_TREE, FIRM_TREE, PROFILES, collectProfileIds, VERDICT_STYLES } from '../data.js';

export function renderBrowse(container, params) {
  const { mode, segments } = params;
  const tree = mode === 'practice' ? PRACTICE_TREE : FIRM_TREE;
  const modeLabel = mode === 'practice' ? 'Practice Area' : 'Firm Type';
  const basePath = `#/${mode}`;

  // Parse path segments
  const pathSegments = segments?.[0] ? segments[0].split('/') : [];

  // Navigate the tree
  let current = tree;
  const breadcrumbs = [{ label: 'Explorer', href: '#/' }, { label: modeLabel, href: basePath }];

  for (let i = 0; i < pathSegments.length; i++) {
    const decoded = decodeURIComponent(pathSegments[i]);
    const node = current.find(n => typeof n === 'object' && n.label === decoded);
    if (!node) {
      container.innerHTML = '<p>Category not found.</p>';
      return;
    }
    const pathSoFar = pathSegments.slice(0, i + 1).map(encodeURIComponent).join('/');
    breadcrumbs.push({ label: node.label, href: `${basePath}/${pathSoFar}` });
    current = node.children;
  }

  // Determine if children are all leaf profiles (strings) or subcategories (objects)
  const hasSubcategories = current.some(c => typeof c === 'object');
  const isLeafLevel = current.every(c => typeof c === 'string');
  // Mixed: some subcategories, some leaf profiles — shouldn't happen in our tree but handle it

  // If all children are profile IDs, redirect to compare view
  if (isLeafLevel) {
    const compareSlug = pathSegments.map(encodeURIComponent).join('/');
    window.location.hash = `#/compare/${mode}/${compareSlug}`;
    return;
  }

  // Render breadcrumbs + category list
  container.innerHTML = '';

  // Breadcrumbs
  const nav = document.createElement('nav');
  nav.className = 'breadcrumbs';
  nav.innerHTML = breadcrumbs.map((b, i) => {
    if (i === breadcrumbs.length - 1) return `<span class="breadcrumb-current">${b.label}</span>`;
    return `<a href="${b.href}" class="breadcrumb-link">${b.label}</a>`;
  }).join('<span class="breadcrumb-sep"> › </span>');
  container.appendChild(nav);

  // Title
  const title = document.createElement('h1');
  title.className = 'browse-title';
  title.textContent = breadcrumbs[breadcrumbs.length - 1].label;
  container.appendChild(title);

  // Category list
  const list = document.createElement('div');
  list.className = 'browse-list';

  current.forEach(child => {
    if (typeof child === 'object') {
      // Subcategory
      const profileCount = collectProfileIds(child.children).length;
      const childPath = [...pathSegments, encodeURIComponent(child.label)].join('/');

      // Check if clicking this would go to a leaf level (all children are strings)
      const allLeaf = child.children.every(c => typeof c === 'string');
      const href = allLeaf
        ? `#/compare/${mode}/${childPath}`
        : `${basePath}/${childPath}`;

      const row = document.createElement('a');
      row.href = href;
      row.className = 'browse-row';
      row.innerHTML = `
        <div class="browse-row-info">
          <span class="browse-row-name">${child.label}</span>
          <span class="browse-row-count">${profileCount} profile${profileCount !== 1 ? 's' : ''}</span>
        </div>
        <span class="browse-row-arrow">&rarr;</span>
      `;
      list.appendChild(row);
    } else {
      // Leaf profile (shouldn't happen in mixed mode, but just in case)
      const profile = PROFILES[child];
      if (!profile) return;
      const verdict = VERDICT_STYLES[profile.junior.verdictType];
      const row = document.createElement('a');
      row.href = `#/compare/${mode}/${pathSegments.map(encodeURIComponent).join('/')}`;
      row.className = 'browse-row';
      row.innerHTML = `
        <div class="browse-row-info">
          <span class="browse-row-name">${profile.name}</span>
          <span class="verdict-badge" style="background:${verdict.bg};color:${verdict.color}">${profile.junior.verdict}</span>
        </div>
        <span class="browse-row-arrow">&rarr;</span>
      `;
      list.appendChild(row);
    }
  });

  container.appendChild(list);
}
```

- [ ] **Step 2: Add browse styles to `css/styles.css`**

Append:

```css
/* ── Breadcrumbs ── */

.breadcrumbs {
  font-size: 13px;
  margin-bottom: 24px;
  color: var(--text-muted);
}

.breadcrumb-link {
  color: var(--purple);
  text-decoration: none;
}

.breadcrumb-link:hover {
  text-decoration: underline;
}

.breadcrumb-current {
  color: var(--text-secondary);
}

.breadcrumb-sep {
  margin: 0 2px;
  color: var(--text-dim);
}

/* ── Browse List ── */

.browse-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
}

.browse-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.browse-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border: 1px solid var(--border);
  border-radius: 8px;
  text-decoration: none;
  color: var(--text);
  transition: background 0.12s, border-color 0.12s;
}

.browse-row:hover {
  background: var(--bg-hover);
  border-color: var(--purple);
}

.browse-row-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.browse-row-name {
  font-size: 15px;
  font-weight: 500;
}

.browse-row-count {
  font-size: 12px;
  color: var(--text-muted);
}

.browse-row-arrow {
  color: var(--text-dim);
  font-size: 16px;
}

/* ── Verdict Badge ── */

.verdict-badge {
  display: inline-block;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 3px 10px;
  border-radius: 12px;
}
```

- [ ] **Step 3: Update router to handle nested browse paths**

In `js/router.js`, the existing route patterns need to handle the `compare` route with mode prefix. Update the routes array:

```js
const routes = [
  { pattern: /^#\/$|^$|^#$/,                          view: renderEntry },
  { pattern: /^#\/practice$/,                          view: renderBrowse, params: { mode: 'practice' } },
  { pattern: /^#\/firm$/,                              view: renderBrowse, params: { mode: 'firm' } },
  { pattern: /^#\/practice\/(.+)$/,                    view: renderBrowse, params: { mode: 'practice' } },
  { pattern: /^#\/firm\/(.+)$/,                        view: renderBrowse, params: { mode: 'firm' } },
  { pattern: /^#\/compare\/(.+)$/,                     view: renderCompare },
  { pattern: /^#\/builder$/,                           view: renderBuilder },
  { pattern: /^#\/builder\/(.+)$/,                     view: renderBuilder },
  { pattern: /^#\/starred$/,                           view: renderStarred },
];
```

Note: the browse view handles its own tree navigation internally using the segments. The compare route receives the full path after `/compare/` and parses mode + path from it.

- [ ] **Step 4: Verify in browser**

- Navigate to `#/practice`: see list of 8 practice areas (Litigation, Corporate & Transactional, etc.) with profile counts and arrows
- Click "Litigation": see intermediate screen with "Civil" (5 profiles) and "Criminal" (3 profiles)
- Breadcrumbs show: Explorer > Practice Area > Litigation
- Click "Civil": redirects to compare view (currently placeholder)
- Navigate to `#/firm`: see 7 firm types
- Clicking "BigLaw (Am Law 50)" should go straight to compare (all children are leaf profiles)

- [ ] **Step 5: Commit**

```bash
git add js/views/browse.js js/router.js css/styles.css
git commit -m "feat: browse screens with category navigation, breadcrumbs, and drill-down"
```

---

## Task 7: Comparison View — Chip Bar + Radar Chart

**Files:**
- Modify: `js/views/compare.js`
- Modify: `css/styles.css`

This is the main screen where students spend most of their time. This task builds the chip bar and radar chart. Task 8 adds detail cards.

- [ ] **Step 1: Implement `js/views/compare.js`**

```js
import { PROFILES, VARIABLES, PROFILE_COLORS, VERDICT_STYLES, PRACTICE_TREE, FIRM_TREE, collectProfileIds } from '../data.js';
import { createRadarChart, renderLegend } from '../radar.js';
import { isStarred, toggleStar, getStarredCount, getCustomProfile, getCustomProfiles } from '../state.js';

export function renderCompare(container, params) {
  // Parse route: compare/{mode}/{path...}
  const fullPath = params.segments?.[0] || '';
  const parts = fullPath.split('/');
  const mode = parts[0]; // 'practice' or 'firm'
  const pathSegments = parts.slice(1).map(decodeURIComponent);

  // Resolve which profiles to show
  const tree = mode === 'practice' ? PRACTICE_TREE : FIRM_TREE;
  const modeLabel = mode === 'practice' ? 'Practice Area' : 'Firm Type';
  let profileIds = [];
  let sectionLabel = modeLabel;

  // Walk the tree to find the leaf profiles
  let current = tree;
  const breadcrumbs = [{ label: 'Explorer', href: '#/' }, { label: modeLabel, href: `#/${mode}` }];

  for (let i = 0; i < pathSegments.length; i++) {
    const node = current.find(n => typeof n === 'object' && n.label === pathSegments[i]);
    if (!node) break;
    const pathSoFar = pathSegments.slice(0, i + 1).map(encodeURIComponent).join('/');
    breadcrumbs.push({ label: node.label, href: `#/${mode}/${pathSoFar}` });
    sectionLabel = node.label;
    current = node.children;
  }

  // Collect leaf IDs
  profileIds = current.filter(c => typeof c === 'string');
  if (profileIds.length === 0) {
    profileIds = collectProfileIds(current);
  }

  // State for this view
  const activeProfiles = new Set(profileIds.slice(0, 3)); // Start with first 3 visible
  const seniorOverlays = new Set();
  let highlightedId = null;
  let colorAssignment = {};

  // Build the view
  container.innerHTML = '';

  // Breadcrumbs
  const nav = document.createElement('nav');
  nav.className = 'breadcrumbs';
  nav.innerHTML = breadcrumbs.map((b, i) => {
    if (i === breadcrumbs.length - 1) return `<span class="breadcrumb-current">${b.label}</span>`;
    return `<a href="${b.href}" class="breadcrumb-link">${b.label}</a>`;
  }).join('<span class="breadcrumb-sep"> › </span>');
  container.appendChild(nav);

  // Title
  const title = document.createElement('h1');
  title.className = 'compare-title';
  title.textContent = sectionLabel;
  container.appendChild(title);

  // Chip bar
  const chipBar = document.createElement('div');
  chipBar.className = 'chip-bar';
  container.appendChild(chipBar);

  // Tip for 4+ profiles
  const tip = document.createElement('div');
  tip.className = 'compare-tip';
  tip.textContent = 'Tip: Compare 2-3 profiles at a time for clarity.';
  tip.style.display = 'none';
  container.appendChild(tip);

  // Main layout: radar (left) + cards (right)
  const layout = document.createElement('div');
  layout.className = 'compare-layout';
  container.appendChild(layout);

  const radarColumn = document.createElement('div');
  radarColumn.className = 'compare-radar-col';
  layout.appendChild(radarColumn);

  const cardsColumn = document.createElement('div');
  cardsColumn.className = 'compare-cards-col';
  layout.appendChild(cardsColumn);

  // Create radar chart
  const chart = createRadarChart({ size: 480 });
  radarColumn.appendChild(chart.svg);

  // "Larger shape = more protected" note
  const note = document.createElement('div');
  note.className = 'radar-note';
  note.textContent = 'Larger shape = more protected from AI displacement';
  radarColumn.appendChild(note);

  // Legend container
  const legendContainer = document.createElement('div');
  radarColumn.appendChild(legendContainer);

  // ── Render functions ──

  function assignColors() {
    colorAssignment = {};
    let slot = 0;
    profileIds.forEach(id => {
      if (activeProfiles.has(id)) {
        // Custom profiles get green
        if (id.startsWith('custom-')) {
          colorAssignment[id] = '#059669';
        } else {
          colorAssignment[id] = PROFILE_COLORS[slot % PROFILE_COLORS.length];
          slot++;
        }
      }
    });
  }

  function renderChips() {
    chipBar.innerHTML = '';
    profileIds.forEach(id => {
      const profile = PROFILES[id] || getCustomProfile(id);
      if (!profile) return;
      const isActive = activeProfiles.has(id);
      const chip = document.createElement('button');
      chip.className = `chip ${isActive ? 'chip-active' : ''}`;
      if (isActive && colorAssignment[id]) {
        chip.style.borderColor = colorAssignment[id];
        chip.style.background = colorAssignment[id] + '15';
        chip.style.color = colorAssignment[id];
      }
      chip.textContent = profile.name;
      chip.onclick = () => {
        if (isActive) activeProfiles.delete(id);
        else activeProfiles.add(id);
        refresh();
      };
      chipBar.appendChild(chip);
    });

    // "+ Custom" chip
    const customChip = document.createElement('button');
    customChip.className = 'chip chip-custom';
    customChip.textContent = '+ Custom';
    customChip.onclick = () => {
      // Pass current compare path so builder can return here
      window.location.hash = `#/builder/${encodeURIComponent(fullPath)}`;
    };
    chipBar.appendChild(customChip);
  }

  function renderChart() {
    const chartData = [];
    [...activeProfiles].forEach(id => {
      const profile = PROFILES[id] || getCustomProfile(id);
      if (!profile) return;
      const ratings = VARIABLES.map(v => profile.junior[v.key]);
      const entry = { id, ratings, color: colorAssignment[id] || '#888' };
      if (seniorOverlays.has(id) && profile.senior) {
        entry.seniorRatings = VARIABLES.map(v => profile.senior[v.key]);
      }
      chartData.push(entry);
    });
    chart.update(chartData);
    if (highlightedId) chart.highlight(highlightedId);

    // Legend
    legendContainer.innerHTML = '';
    const items = chartData.map(d => {
      const p = PROFILES[d.id] || getCustomProfile(d.id);
      return { id: d.id, name: p?.name || d.id, color: d.color };
    });
    renderLegend(legendContainer, items, (id) => {
      if (highlightedId === id) {
        highlightedId = null;
        chart.clearHighlight();
      } else {
        highlightedId = id;
        chart.highlight(id);
      }
      renderCards();
    });

    // Tip
    tip.style.display = activeProfiles.size >= 4 ? 'block' : 'none';
  }

  function renderCards() {
    cardsColumn.innerHTML = '';
    [...activeProfiles].forEach(id => {
      const profile = PROFILES[id] || getCustomProfile(id);
      if (!profile) return;
      const color = colorAssignment[id] || '#888';
      const isHighlighted = highlightedId === id;
      const data = profile.junior;
      const verdict = VERDICT_STYLES[data.verdictType];

      const card = document.createElement('div');
      card.className = `detail-card ${isHighlighted ? 'detail-card-highlighted' : ''}`;
      card.style.borderLeftColor = color;

      // Collapsed header
      const header = document.createElement('div');
      header.className = 'detail-card-header';
      header.innerHTML = `
        <div class="detail-card-header-info">
          <span class="detail-card-name">${profile.name}</span>
          <span class="detail-card-seniority">Junior</span>
          <span class="verdict-badge" style="background:${verdict.bg};color:${verdict.color}">${data.verdict}</span>
        </div>
        <span class="detail-card-toggle">&#9660;</span>
      `;

      // Expanded body
      const body = document.createElement('div');
      body.className = 'detail-card-body';
      body.style.display = 'none';

      // Variable ratings
      const varsHtml = VARIABLES.map(v => {
        const val = data[v.key];
        const pct = (val / 4) * 100;
        const desc = data.descriptions?.[v.key] || '';
        return `
          <div class="detail-var">
            <div class="detail-var-header">
              <span class="detail-var-label">${v.label}</span>
              <span class="detail-var-rating">${ratingWord(val)} (${val}/4)</span>
            </div>
            <div class="detail-var-bar-bg"><div class="detail-var-bar" style="width:${pct}%;background:${color}"></div></div>
            <p class="detail-var-desc">${desc}</p>
          </div>
        `;
      }).join('');

      // Star button
      const starred = isStarred(id);
      const starBtn = `<button class="star-btn ${starred ? 'star-btn-active' : ''}" data-id="${id}">
        ${starred ? '★ Saved' : '☆ Save to My Comparison'}
      </button>`;

      // Seniority toggle
      const hasSenior = !!profile.senior;
      const seniorToggle = hasSenior ? `
        <label class="seniority-toggle">
          <input type="checkbox" ${seniorOverlays.has(id) ? 'checked' : ''} data-id="${id}" class="seniority-checkbox">
          <span class="seniority-toggle-label">Overlay senior trajectory</span>
        </label>
      ` : '';

      body.innerHTML = `
        <div class="detail-card-actions">
          ${starBtn}
          ${seniorToggle}
        </div>
        ${varsHtml}
      `;

      card.appendChild(header);
      card.appendChild(body);

      // Click header to expand/collapse + highlight
      header.onclick = () => {
        const isExpanded = body.style.display !== 'none';
        if (isExpanded) {
          body.style.display = 'none';
          header.querySelector('.detail-card-toggle').innerHTML = '&#9660;';
          if (highlightedId === id) {
            highlightedId = null;
            chart.clearHighlight();
          }
        } else {
          body.style.display = 'block';
          header.querySelector('.detail-card-toggle').innerHTML = '&#9650;';
          highlightedId = id;
          chart.highlight(id);
        }
        // Update all cards' visual state
        updateCardHighlights();
      };

      cardsColumn.appendChild(card);

      // Wire up star button
      body.querySelector('.star-btn')?.addEventListener('click', (e) => {
        toggleStar(id);
        const btn = e.currentTarget;
        const nowStarred = isStarred(id);
        btn.className = `star-btn ${nowStarred ? 'star-btn-active' : ''}`;
        btn.textContent = nowStarred ? '★ Saved' : '☆ Save to My Comparison';
      });

      // Wire up seniority toggle
      body.querySelector('.seniority-checkbox')?.addEventListener('change', (e) => {
        if (e.target.checked) seniorOverlays.add(id);
        else seniorOverlays.delete(id);
        renderChart();
      });
    });
  }

  function updateCardHighlights() {
    cardsColumn.querySelectorAll('.detail-card').forEach(card => {
      const id = card.querySelector('.star-btn')?.dataset.id;
      if (highlightedId && id !== highlightedId) {
        card.classList.remove('detail-card-highlighted');
      } else if (id === highlightedId) {
        card.classList.add('detail-card-highlighted');
      }
    });
  }

  function refresh() {
    assignColors();
    renderChips();
    renderChart();
    renderCards();
  }

  // Initial render
  refresh();
}

function ratingWord(val) {
  return ['Low', 'Moderate', 'High', 'Very High'][val - 1] || '';
}
```

- [ ] **Step 2: Add comparison view styles to `css/styles.css`**

Append:

```css
/* ── Comparison View ── */

.compare-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
}

.chip-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.chip {
  padding: 6px 14px;
  border: 1.5px solid var(--border);
  border-radius: 20px;
  background: none;
  font-size: 13px;
  cursor: pointer;
  color: var(--text-secondary);
  transition: all 0.12s;
}

.chip:hover {
  border-color: var(--purple);
}

.chip-active {
  font-weight: 500;
}

.chip-custom {
  border-style: dashed;
  color: var(--text-muted);
}

.chip-custom:hover {
  border-color: var(--purple);
  color: var(--purple);
}

.compare-tip {
  font-size: 12px;
  color: var(--text-muted);
  background: #fef3c7;
  padding: 8px 14px;
  border-radius: 6px;
  margin-bottom: 16px;
}

.compare-layout {
  display: flex;
  gap: 32px;
  align-items: flex-start;
}

.compare-radar-col {
  flex: 0 0 60%;
  max-width: 60%;
}

.compare-cards-col {
  flex: 1;
  min-width: 0;
}

.radar-note {
  text-align: center;
  font-size: 11px;
  color: var(--text-dim);
  margin: 8px 0 4px;
}

/* ── Detail Cards ── */

.detail-card {
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  border-left: 4px solid var(--border);
  margin-bottom: 8px;
  background: var(--bg);
  transition: box-shadow 0.12s;
}

.detail-card-highlighted {
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.detail-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
}

.detail-card-header:hover {
  background: var(--bg-hover);
}

.detail-card-header-info {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.detail-card-name {
  font-size: 14px;
  font-weight: 600;
}

.detail-card-seniority {
  font-size: 11px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-card-toggle {
  font-size: 10px;
  color: var(--text-dim);
}

.detail-card-body {
  padding: 0 16px 16px;
}

.detail-card-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.star-btn {
  padding: 6px 14px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: none;
  font-size: 13px;
  cursor: pointer;
  color: var(--text-secondary);
  transition: all 0.12s;
}

.star-btn:hover {
  border-color: var(--purple);
  color: var(--purple);
}

.star-btn-active {
  background: #fef3c7;
  border-color: #d97706;
  color: #92400e;
}

.seniority-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-secondary);
  cursor: pointer;
}

.seniority-checkbox {
  accent-color: var(--purple);
}

.detail-var {
  margin-bottom: 14px;
}

.detail-var-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 4px;
}

.detail-var-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text);
}

.detail-var-rating {
  font-size: 11px;
  color: var(--text-muted);
}

.detail-var-bar-bg {
  height: 4px;
  background: #eee;
  border-radius: 2px;
  margin-bottom: 4px;
}

.detail-var-bar {
  height: 100%;
  border-radius: 2px;
  transition: width 0.2s;
}

.detail-var-desc {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.5;
}
```

- [ ] **Step 3: Verify in browser**

- Navigate to `#/practice`, click Litigation > Civil
- Should redirect to `#/compare/practice/Litigation/Civil`
- See chip bar with 5 profiles (first 3 active by default)
- Pentagon radar chart with 3 colored shapes
- Detail cards on the right, collapsed by default
- Click a card header: expands to show 5 variables with bars + descriptions, star button, seniority toggle
- Click "Overlay senior trajectory": dashed shape appears on chart
- Click "Save to My Comparison": button changes to "Saved", starred count in nav updates
- Legend items are clickable (highlight/dim profiles)
- "+ Custom" chip present at end of chip bar

- [ ] **Step 4: Commit**

```bash
git add js/views/compare.js css/styles.css
git commit -m "feat: comparison view with chip bar, radar chart, detail cards, starring, and seniority overlay"
```

---

## Task 8: Custom Profile Builder

**Files:**
- Modify: `js/views/builder.js`
- Modify: `css/styles.css`

- [ ] **Step 1: Implement `js/views/builder.js`**

```js
import { VARIABLES } from '../data.js';
import { saveCustomProfile } from '../state.js';

const THINKING_PROMPTS = {
  dimensionality: 'Think about a typical matter in this role. How many distinct, complementary tasks does the lawyer handle personally? Could you automate one task without affecting the others, or are they tightly linked?',
  focusEffect: 'If AI handled the routine parts of this role tomorrow, would you spend that freed-up time on higher-value work you\'re already qualified to do? Or would the routine work being gone mean there\'s less reason to have you?',
  demandElasticity: 'If legal services in this area became 40% cheaper, would clients buy significantly more? Or is demand fixed — people only need a lawyer when they need a lawyer, regardless of price?',
  selfServiceResistance: 'Could your clients handle this work themselves using AI tools? Consider: Can they evaluate the quality of legal output? How bad is it if they get it wrong? Are there regulatory gates that prevent DIY?',
  decisionMakerAlignment: 'Who decides whether to hire, keep, or replace lawyers in this role? A partner protecting revenue? A CFO cutting costs? A legislature setting appropriations? Do their incentives favor keeping you — or replacing you?',
};

const RATING_ANCHORS = {
  dimensionality: [
    '1-2 core tasks. The job is basically one thing done repeatedly.',
    '3-4 tasks. Some variety, but tasks are somewhat independent.',
    '5-6 linked tasks. Doing one well requires doing the others well.',
    '7+ deeply intertwined tasks. The role is a complex bundle.',
  ],
  focusEffect: [
    'The routine tasks ARE the job. Automating them eliminates the need for me.',
    'Some freed time, but I\'d mostly just do the same work faster.',
    'Meaningful reallocation. I\'d shift to higher-value work I currently can\'t get to.',
    'Transformative. I currently spend most of my time on tasks AI could handle.',
  ],
  demandElasticity: [
    'Fixed demand. People don\'t buy more legal work just because it\'s cheaper.',
    'Some expansion. Price drops would unlock marginal clients or matters.',
    'Significant latent demand. Many people need this but can\'t currently afford it.',
    'Massive unmet need. Cheaper services would open a flood of new clients.',
  ],
  selfServiceResistance: [
    'Clients are sophisticated, stakes manageable, tools already exist for this.',
    'Some clients could self-serve for routine matters, but not complex ones.',
    'Most clients need a lawyer. Stakes, complexity, or emotions too high for DIY.',
    'No realistic self-service path. Regulatory, adversarial, or existential stakes.',
  ],
  decisionMakerAlignment: [
    'Decision-maker actively wants to reduce outside counsel or headcount.',
    'Mixed incentives. Would keep me if cheap enough, but cost is the priority.',
    'Generally aligned. Keeping lawyers serves the decision-maker\'s interests.',
    'Fully aligned. The decision-maker depends on me and benefits from my success.',
  ],
};

export function renderBuilder(container, params) {
  const returnPath = params.segments?.[0] ? decodeURIComponent(params.segments[0]) : null;

  const selections = {};

  container.innerHTML = `
    <div class="builder-screen">
      <nav class="breadcrumbs">
        <a href="#/" class="breadcrumb-link">Explorer</a>
        <span class="breadcrumb-sep"> › </span>
        <span class="breadcrumb-current">Build a Custom Profile</span>
      </nav>

      <h1 class="builder-title">Build a Custom Profile</h1>
      <p class="builder-subtitle">Challenge the ratings. Name a role, commit to a number on each variable, and defend it.</p>

      <div class="builder-form">
        <div class="builder-field">
          <label class="builder-label" for="profile-name">Name your profile</label>
          <input type="text" id="profile-name" class="builder-input" placeholder="e.g., Immigration Solo Practice">
        </div>

        <div id="builder-variables"></div>

        <div class="builder-actions">
          <button id="builder-submit" class="builder-submit" disabled>Add to Comparison &rarr;</button>
          <button id="builder-cancel" class="builder-cancel">Cancel</button>
        </div>
      </div>
    </div>
  `;

  const varsContainer = document.getElementById('builder-variables');
  const submitBtn = document.getElementById('builder-submit');
  const nameInput = document.getElementById('profile-name');

  // Render variable sections
  VARIABLES.forEach(v => {
    const section = document.createElement('div');
    section.className = 'builder-variable';

    const anchors = RATING_ANCHORS[v.key];
    const prompt = THINKING_PROMPTS[v.key];

    section.innerHTML = `
      <h3 class="builder-var-name">${v.label}</h3>
      <p class="builder-var-prompt">${prompt}</p>
      <div class="builder-options" data-key="${v.key}">
        ${anchors.map((anchor, i) => `
          <button class="builder-option" data-key="${v.key}" data-value="${i + 1}">
            <span class="builder-option-num">${i + 1}</span>
            <span class="builder-option-text">${anchor}</span>
          </button>
        `).join('')}
      </div>
    `;
    varsContainer.appendChild(section);
  });

  // Selection handling
  varsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.builder-option');
    if (!btn) return;
    const key = btn.dataset.key;
    const value = parseInt(btn.dataset.value);

    selections[key] = value;

    // Update visual state for this variable group
    const group = btn.closest('.builder-options');
    group.querySelectorAll('.builder-option').forEach(b => {
      b.classList.toggle('builder-option-selected', b.dataset.value == value);
    });

    checkCanSubmit();
  });

  function checkCanSubmit() {
    const hasName = nameInput.value.trim().length > 0;
    const allRated = VARIABLES.every(v => selections[v.key] !== undefined);
    submitBtn.disabled = !(hasName && allRated);
  }

  nameInput.addEventListener('input', checkCanSubmit);

  // Submit
  submitBtn.onclick = () => {
    const name = nameInput.value.trim();
    const id = 'custom-' + Date.now();

    const profile = {
      id,
      name,
      category: 'Custom',
      firmType: 'Custom',
      junior: {
        ...Object.fromEntries(VARIABLES.map(v => [v.key, selections[v.key]])),
        verdict: 'Custom Profile',
        verdictType: 'protected', // neutral default
        descriptions: Object.fromEntries(VARIABLES.map(v => [v.key, ''])),
      },
      senior: null,
    };

    saveCustomProfile(profile);

    // Navigate back to compare view or starred view
    if (returnPath) {
      window.location.hash = `#/compare/${returnPath}`;
    } else {
      window.location.hash = '#/starred';
    }
  };

  // Cancel
  document.getElementById('builder-cancel').onclick = () => {
    if (returnPath) {
      window.location.hash = `#/compare/${returnPath}`;
    } else {
      window.location.hash = '#/';
    }
  };
}
```

- [ ] **Step 2: Add builder styles to `css/styles.css`**

Append:

```css
/* ── Custom Profile Builder ── */

.builder-screen {
  max-width: 680px;
  margin: 0 auto;
}

.builder-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
}

.builder-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 32px;
}

.builder-field {
  margin-bottom: 32px;
}

.builder-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
}

.builder-input {
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid var(--border);
  border-radius: 8px;
  font-size: 15px;
  font-family: var(--font);
  outline: none;
  transition: border-color 0.15s;
}

.builder-input:focus {
  border-color: var(--purple);
}

.builder-variable {
  margin-bottom: 36px;
}

.builder-var-name {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 6px;
}

.builder-var-prompt {
  font-size: 13px;
  color: var(--text-secondary);
  font-style: italic;
  line-height: 1.5;
  margin-bottom: 14px;
}

.builder-options {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.builder-option {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px;
  border: 1.5px solid var(--border);
  border-radius: 8px;
  background: var(--bg);
  cursor: pointer;
  text-align: left;
  font-family: var(--font);
  transition: border-color 0.12s, background 0.12s;
}

.builder-option:hover {
  border-color: var(--purple);
  background: var(--purple-light);
}

.builder-option-selected {
  border-color: var(--purple);
  background: var(--purple-light);
}

.builder-option-num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--border);
  font-size: 14px;
  font-weight: 700;
  color: var(--text-secondary);
  flex-shrink: 0;
}

.builder-option-selected .builder-option-num {
  background: var(--purple);
  color: white;
}

.builder-option-text {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.4;
  padding-top: 4px;
}

.builder-actions {
  display: flex;
  gap: 12px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
}

.builder-submit {
  padding: 10px 24px;
  background: var(--purple);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: var(--font);
  transition: opacity 0.12s;
}

.builder-submit:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.builder-submit:not(:disabled):hover {
  opacity: 0.9;
}

.builder-cancel {
  padding: 10px 24px;
  background: none;
  color: var(--text-secondary);
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  font-family: var(--font);
}

.builder-cancel:hover {
  background: var(--bg-hover);
}
```

- [ ] **Step 3: Verify in browser**

- Navigate to `#/builder`
- See form with name input, 5 variable sections with thinking prompts and 4 tappable options each
- Submit button disabled until name entered + all 5 variables selected
- Select options: purple highlight, number badge fills purple
- Submit: redirects to starred view, profile is starred
- Navigate to a comparison view, click "+ Custom": builder opens with return path
- Submit: returns to comparison view (custom profile should appear in chip bar if `compare.js` is wired to include custom profiles)

- [ ] **Step 4: Commit**

```bash
git add js/views/builder.js css/styles.css
git commit -m "feat: custom profile builder with thinking prompts and 4-option rating cards"
```

---

## Task 9: Starred Comparison View

**Files:**
- Modify: `js/views/starred.js`
- Modify: `css/styles.css`

- [ ] **Step 1: Implement `js/views/starred.js`**

```js
import { PROFILES, VARIABLES, PROFILE_COLORS, VERDICT_STYLES } from '../data.js';
import { createRadarChart, renderLegend } from '../radar.js';
import { getStarredIds, removeStar, getCustomProfile } from '../state.js';

export function renderStarred(container) {
  const starredIds = getStarredIds();

  container.innerHTML = '';

  // Breadcrumbs
  const nav = document.createElement('nav');
  nav.className = 'breadcrumbs';
  nav.innerHTML = `
    <a href="#/" class="breadcrumb-link">Explorer</a>
    <span class="breadcrumb-sep"> › </span>
    <span class="breadcrumb-current">Starred Profiles</span>
  `;
  container.appendChild(nav);

  const title = document.createElement('h1');
  title.className = 'browse-title';
  title.textContent = 'My Comparison';
  container.appendChild(title);

  if (starredIds.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'starred-empty';
    empty.innerHTML = `
      <p>No profiles starred yet.</p>
      <p>Browse profiles and click "Save to My Comparison" to add them here.</p>
      <a href="#/" class="builder-cancel" style="display:inline-block;margin-top:16px;text-decoration:none">Start Exploring</a>
    `;
    container.appendChild(empty);
    return;
  }

  // Assign colors
  const colorMap = {};
  starredIds.forEach((id, i) => {
    if (id.startsWith('custom-')) colorMap[id] = '#059669';
    else colorMap[id] = PROFILE_COLORS[i % PROFILE_COLORS.length];
  });

  // Chip bar with remove buttons
  const chipBar = document.createElement('div');
  chipBar.className = 'chip-bar';
  container.appendChild(chipBar);

  function renderChips() {
    chipBar.innerHTML = '';
    getStarredIds().forEach(id => {
      const profile = PROFILES[id] || getCustomProfile(id);
      if (!profile) return;
      const chip = document.createElement('span');
      chip.className = 'chip chip-active starred-chip';
      chip.style.borderColor = colorMap[id];
      chip.style.background = colorMap[id] + '15';
      chip.style.color = colorMap[id];

      const label = document.createElement('span');
      label.textContent = profile.name;
      chip.appendChild(label);

      const removeBtn = document.createElement('button');
      removeBtn.className = 'chip-remove';
      removeBtn.textContent = '×';
      removeBtn.onclick = (e) => {
        e.stopPropagation();
        removeStar(id);
        renderStarred(container); // Re-render
      };
      chip.appendChild(removeBtn);

      chipBar.appendChild(chip);
    });
  }

  // Radar chart
  const radarContainer = document.createElement('div');
  radarContainer.className = 'starred-radar';
  container.appendChild(radarContainer);

  const chart = createRadarChart({ size: 480 });
  radarContainer.appendChild(chart.svg);

  // Note
  const note = document.createElement('div');
  note.className = 'radar-note';
  note.textContent = 'Larger shape = more protected from AI displacement';
  radarContainer.appendChild(note);

  // Legend
  const legendContainer = document.createElement('div');
  radarContainer.appendChild(legendContainer);

  let highlightedId = null;

  function renderChart() {
    const currentIds = getStarredIds();
    const chartData = currentIds.map(id => {
      const profile = PROFILES[id] || getCustomProfile(id);
      if (!profile) return null;
      const ratings = VARIABLES.map(v => profile.junior[v.key]);
      return { id, ratings, color: colorMap[id] || '#888' };
    }).filter(Boolean);

    chart.update(chartData);

    legendContainer.innerHTML = '';
    renderLegend(legendContainer, chartData.map(d => {
      const p = PROFILES[d.id] || getCustomProfile(d.id);
      return { id: d.id, name: p?.name || d.id, color: d.color };
    }), (id) => {
      if (highlightedId === id) {
        highlightedId = null;
        chart.clearHighlight();
      } else {
        highlightedId = id;
        chart.highlight(id);
      }
    });
  }

  // Summary table
  const tableContainer = document.createElement('div');
  tableContainer.className = 'starred-table-wrap';
  container.appendChild(tableContainer);

  function renderTable() {
    const currentIds = getStarredIds();
    const headers = VARIABLES.map(v => `<th title="${v.label}">${v.shortLabel}</th>`).join('');

    const rows = currentIds.map(id => {
      const profile = PROFILES[id] || getCustomProfile(id);
      if (!profile) return '';
      const data = profile.junior;
      const verdict = VERDICT_STYLES[data.verdictType];
      const cells = VARIABLES.map(v => `<td>${data[v.key]}</td>`).join('');
      return `
        <tr>
          <td class="table-profile-name">
            <span class="legend-swatch" style="background:${colorMap[id]}"></span>
            ${profile.name}
          </td>
          ${cells}
          <td><span class="verdict-badge" style="background:${verdict.bg};color:${verdict.color}">${data.verdict}</span></td>
        </tr>
      `;
    }).join('');

    tableContainer.innerHTML = `
      <table class="starred-table">
        <thead>
          <tr>
            <th>Profile</th>
            ${headers}
            <th>Verdict</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
        <tfoot>
          <tr class="table-legend-row">
            <td colspan="${VARIABLES.length + 2}">
              ${VARIABLES.map(v => `<span class="table-legend-item"><strong>${v.shortLabel}</strong> = ${v.label}</span>`).join(' · ')}
            </td>
          </tr>
        </tfoot>
      </table>
    `;
  }

  // Export bar
  const exportBar = document.createElement('div');
  exportBar.className = 'export-bar';
  exportBar.innerHTML = `
    <button id="export-png" class="export-btn">Download Chart as PNG</button>
    <button id="export-link" class="export-btn export-btn-secondary">Copy Shareable Link</button>
  `;
  container.appendChild(exportBar);

  // Wire up export buttons (implementations in Task 10)
  document.getElementById('export-png').onclick = async () => {
    const { exportPNG } = await import('../export.js');
    exportPNG(radarContainer);
  };

  document.getElementById('export-link').onclick = async () => {
    const { copyShareableLink } = await import('../export.js');
    const btn = document.getElementById('export-link');
    copyShareableLink();
    btn.textContent = 'Link Copied!';
    setTimeout(() => { btn.textContent = 'Copy Shareable Link'; }, 2000);
  };

  // Render everything
  renderChips();
  renderChart();
  renderTable();
}
```

- [ ] **Step 2: Add starred view styles to `css/styles.css`**

Append:

```css
/* ── Starred View ── */

.starred-empty {
  text-align: center;
  padding: 48px 16px;
  color: var(--text-secondary);
  font-size: 15px;
}

.starred-empty p {
  margin-bottom: 8px;
}

.starred-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.chip-remove {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: inherit;
  opacity: 0.5;
  padding: 0 2px;
  line-height: 1;
}

.chip-remove:hover {
  opacity: 1;
}

.starred-radar {
  max-width: 520px;
  margin: 24px auto;
}

/* ── Summary Table ── */

.starred-table-wrap {
  margin: 24px 0;
  overflow-x: auto;
}

.starred-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.starred-table th {
  text-align: left;
  padding: 8px 12px;
  border-bottom: 2px solid var(--border);
  font-weight: 600;
  color: var(--text-secondary);
  font-size: 12px;
}

.starred-table td {
  padding: 8px 12px;
  border-bottom: 1px solid var(--border);
}

.table-profile-name {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  white-space: nowrap;
}

.table-legend-row td {
  font-size: 11px;
  color: var(--text-dim);
  border-bottom: none;
  padding-top: 12px;
}

.table-legend-item {
  margin-right: 4px;
}

/* ── Export Bar ── */

.export-bar {
  display: flex;
  gap: 12px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
}

.export-btn {
  padding: 10px 20px;
  background: var(--purple);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  font-family: var(--font);
  transition: opacity 0.12s;
}

.export-btn:hover {
  opacity: 0.9;
}

.export-btn-secondary {
  background: none;
  color: var(--text-secondary);
  border: 1px solid var(--border);
}

.export-btn-secondary:hover {
  background: var(--bg-hover);
  opacity: 1;
}
```

- [ ] **Step 3: Verify in browser**

- Star a few profiles from the comparison view, then navigate to `#/starred`
- See chips with × remove buttons, radar chart with all starred profiles, summary table
- Table shows D/F/E/R/A columns with numeric ratings and verdict badges
- Clicking × on a chip removes it and re-renders
- Legend highlighting works
- Export buttons present (will wire up next task)
- Empty state shows helpful message when no profiles starred

- [ ] **Step 4: Commit**

```bash
git add js/views/starred.js css/styles.css
git commit -m "feat: starred comparison view with radar chart, summary table, and export bar"
```

---

## Task 10: PNG Export + Shareable Links

**Files:**
- Modify: `js/export.js`
- Modify: `index.html` (add html2canvas CDN)
- Modify: `js/router.js` (handle URL params on load)

- [ ] **Step 1: Add html2canvas to `index.html`**

Add before the module script tag:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
```

- [ ] **Step 2: Implement `js/export.js`**

```js
import { getStarredIds, getCustomProfile, setStarredIds, saveCustomProfile } from './state.js';
import { PROFILES, VARIABLES } from './data.js';

/**
 * Export the radar chart container as a PNG download.
 */
export async function exportPNG(chartContainer) {
  if (typeof html2canvas === 'undefined') {
    alert('Export library not loaded. Please check your internet connection.');
    return;
  }

  try {
    const canvas = await html2canvas(chartContainer, {
      backgroundColor: '#ffffff',
      scale: 2, // Retina quality
    });

    const link = document.createElement('a');
    link.download = 'career-landscape-comparison.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (e) {
    console.error('Export failed:', e);
    alert('Failed to export chart. Try taking a screenshot instead.');
  }
}

/**
 * Copy a shareable link to the clipboard encoding current starred profiles.
 * Format: ?starred=id1,id2,custom-1&custom-1=Name,D,F,E,R,A
 */
export function copyShareableLink() {
  const starredIds = getStarredIds();
  if (starredIds.length === 0) return;

  const url = new URL(window.location.href.split('#')[0]);
  url.searchParams.set('starred', starredIds.join(','));

  // Encode custom profile data
  starredIds.forEach(id => {
    if (id.startsWith('custom-')) {
      const profile = getCustomProfile(id);
      if (profile) {
        const ratings = VARIABLES.map(v => profile.junior[v.key]);
        url.searchParams.set(id, [profile.name, ...ratings].join(','));
      }
    }
  });

  // Remove hash from URL, add starred hash
  const shareUrl = url.toString();

  navigator.clipboard.writeText(shareUrl).catch(() => {
    // Fallback for older browsers
    const input = document.createElement('input');
    input.value = shareUrl;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  });
}

/**
 * Load state from URL query parameters (called by router on first load).
 */
export function loadFromURL(params) {
  const starredParam = params.get('starred');
  if (!starredParam) return;

  const ids = starredParam.split(',').filter(Boolean);

  // Decode custom profiles from URL
  ids.forEach(id => {
    if (id.startsWith('custom-') && params.has(id)) {
      const parts = params.get(id).split(',');
      const name = parts[0];
      const ratings = parts.slice(1).map(Number);

      if (name && ratings.length === 5 && ratings.every(r => r >= 1 && r <= 4)) {
        const profile = {
          id,
          name,
          category: 'Custom',
          firmType: 'Custom',
          junior: {
            ...Object.fromEntries(VARIABLES.map((v, i) => [v.key, ratings[i]])),
            verdict: 'Custom Profile',
            verdictType: 'protected',
            descriptions: Object.fromEntries(VARIABLES.map(v => [v.key, ''])),
          },
          senior: null,
        };
        saveCustomProfile(profile);
      }
    }
  });

  // Only star IDs that exist (either in PROFILES or just saved as custom)
  const validIds = ids.filter(id => PROFILES[id] || id.startsWith('custom-'));
  setStarredIds(validIds);

  // Clean URL params
  const cleanUrl = window.location.href.split('?')[0];
  window.history.replaceState({}, '', cleanUrl);
}
```

- [ ] **Step 3: Verify in browser**

- Star some profiles, go to `#/starred`
- Click "Copy Shareable Link": check clipboard contains URL like `?starred=biglaw-lit-defense,solo-pi`
- Click "Download Chart as PNG": downloads a PNG file of the radar chart
- Open the shareable link in a new incognito window: should load directly to starred view with those profiles
- Test with a custom profile: create one, star it, copy link, open in new window — custom profile data should decode from URL

- [ ] **Step 4: Commit**

```bash
git add js/export.js index.html
git commit -m "feat: PNG export and shareable link encoding/decoding"
```

---

## Task 11: Wire Up Custom Profiles in Comparison View

**Files:**
- Modify: `js/views/compare.js`

Custom profiles saved via the builder need to appear in the comparison view when the user returns from the builder with a `returnPath`.

- [ ] **Step 1: Update `renderCompare` to include custom profiles in the chip bar**

At the end of the `profileIds` resolution logic (after `profileIds = current.filter(...)` or `collectProfileIds()`), add custom profiles:

```js
  // Add any custom profiles to the comparison
  const customProfiles = getCustomProfiles();
  Object.keys(customProfiles).forEach(id => {
    if (!profileIds.includes(id)) {
      profileIds.push(id);
      activeProfiles.add(id); // Auto-activate custom profiles
    }
  });
```

Add this import at the top of compare.js if not already present:
```js
import { getCustomProfiles } from '../state.js';
```

- [ ] **Step 2: Verify**

- Go to a comparison view, click "+ Custom"
- Fill out the builder, submit
- Return to comparison view — custom profile appears as a chip (active, green) and its shape is on the radar chart
- The profile is also auto-starred

- [ ] **Step 3: Commit**

```bash
git add js/views/compare.js
git commit -m "feat: custom profiles appear in comparison view chip bar"
```

---

## Task 12: Last-View Persistence + Router Cleanup

**Files:**
- Modify: `js/router.js`

- [ ] **Step 1: Save last view on navigation and restore on return**

Update the `navigate` function in `js/router.js`:

```js
import { setLastView, getLastView } from './state.js';

// Inside navigate():
function navigate() {
  const hash = window.location.hash || '#/';
  
  // Check for shareable link params on first load
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('starred')) {
    loadFromURL(urlParams);
    window.location.replace('#/starred');
    return;
  }

  // Save last view (except for root, so returning to app goes to last real screen)
  if (hash !== '#/' && hash !== '#') {
    setLastView(hash);
  }

  for (const route of routes) {
    const match = hash.match(route.pattern);
    if (match) {
      app.innerHTML = '';
      const params = { ...(route.params || {}), segments: match.slice(1) };
      route.view(app, params);
      updateStarredNav();
      return;
    }
  }
  window.location.hash = '#/';
}
```

- [ ] **Step 2: Verify**

- Navigate to a comparison view, close the tab
- Reopen: `getLastView()` in console returns the last comparison hash
- (The entry screen could optionally show a "Resume" link, but this is sufficient for the spec requirement)

- [ ] **Step 3: Commit**

```bash
git add js/router.js
git commit -m "feat: persist last-viewed screen to localStorage"
```

---

## Task 13: Responsive Layout + Polish

**Files:**
- Modify: `css/styles.css`

- [ ] **Step 1: Add responsive breakpoints for tablet/narrow screens**

Append to `css/styles.css`:

```css
/* ── Responsive ── */

@media (max-width: 900px) {
  .compare-layout {
    flex-direction: column;
  }

  .compare-radar-col {
    flex: none;
    max-width: 100%;
  }

  .compare-cards-col {
    width: 100%;
  }

  .entry-cards {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  #app {
    padding: 16px;
  }

  #top-nav {
    padding: 12px 16px;
  }

  .entry-title {
    font-size: 22px;
  }

  .compare-title, .browse-title, .builder-title {
    font-size: 20px;
  }

  .starred-table {
    font-size: 11px;
  }

  .starred-table th, .starred-table td {
    padding: 6px 8px;
  }
}
```

- [ ] **Step 2: Verify responsive behavior**

- Resize browser to ~800px width: comparison layout stacks vertically (chart above cards)
- Entry screen cards stack to single column
- Table remains scrollable on narrow screens

- [ ] **Step 3: Commit**

```bash
git add css/styles.css
git commit -m "feat: responsive layout for tablet and narrow screens"
```

---

## Task 14: Final Integration Test

- [ ] **Step 1: Full user flow walkthrough**

Test the complete flow end-to-end in browser:

1. **Entry screen** (`#/`): three entry paths visible, clean layout
2. **Browse by Practice Area** (`#/practice`): 8 categories listed with profile counts
3. **Drill down** Litigation > Civil: 5 profiles shown in comparison view
4. **Chip toggling**: click chips on/off, shapes appear/disappear on radar
5. **Detail card expand**: click card header, see 5 variables with ratings, bars, descriptions
6. **Star a profile**: click "Save to My Comparison", button changes to "Saved", nav count updates
7. **Seniority toggle**: check "Overlay senior trajectory", dashed shape appears
8. **Legend highlight**: click legend item, one shape highlighted, others dimmed
9. **Custom profile**: click "+ Custom", fill out builder, submit, return to comparison with custom profile visible
10. **Browse by Firm Type** (`#/firm`): 7 firm types, drill down works
11. **Starred view** (`#/starred`): all starred profiles shown with radar + table
12. **Remove from starred**: click × on chip, profile removed
13. **Export PNG**: click button, PNG downloads
14. **Copy shareable link**: click button, URL copied to clipboard
15. **Open shareable link** in new incognito window: loads starred comparison
16. **localStorage persistence**: close tab, reopen, starred profiles preserved

- [ ] **Step 2: Fix any issues found during testing**

Address any bugs, visual glitches, or missing interactions discovered in the walkthrough.

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat: Career Landscape Explorer complete — integration tested"
```

---

## Task 15: Deploy to Render

- [ ] **Step 1: Initialize git remote and push**

```bash
git remote add origin <your-render-git-url>
git push -u origin main
```

Or connect the GitHub repo to Render as a static site:
- Build command: `echo "Static site, no build needed"`
- Publish directory: `.`
- The `render.yaml` already configures the rewrite rule for SPA routing

- [ ] **Step 2: Verify deployed site**

Open the Render URL. Complete the same user flow walkthrough from Task 14. Verify:
- All navigation works
- Radar charts render correctly
- localStorage persists between page reloads
- PNG export works
- Shareable links work (copy, open in new tab)

- [ ] **Step 3: Commit deploy config if any changes needed**

```bash
git add render.yaml
git commit -m "chore: finalize Render deployment config"
```
