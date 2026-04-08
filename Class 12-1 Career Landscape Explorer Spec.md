# Career Landscape Explorer — Design Spec

**Date:** April 8, 2026
**Class:** 12-1, Business of Law & Technology Economics
**Purpose:** Interactive web tool that lets students compare how AI's economic impact varies across legal practice areas, firm types, and seniority levels using a five-variable framework adapted from the O-Ring model of automation.

---

## 1. Overview

The Career Landscape Explorer is a single-page web application (HTML/CSS/JS, no backend) that students access via a shared URL during or after class. Students browse a curated library of ~20 practice-area profiles, each rated on five variables that predict how AI will affect that role. Profiles are displayed as overlaid pentagon radar charts with accompanying detail cards. Students can challenge any rating by building custom profiles, save ("star") profiles from across their exploration, and export a comparison for use in class discussion or assignments.

**Pedagogical goal:** Force students to move beyond "AI will disrupt law" generalities and commit to specific, defensible claims about *which* roles, *how*, and *why*. The framework comes from the O-Ring model (Gans & Goldfarb 2025, extending Kremer 1993), adapted for legal practice in the course's sector analysis document. The tool surfaces the productive tension between the Narayanan thesis (AI won't automatically make law cheaper) and the Sequoia thesis (AI autopilots will absorb $60B of legal work) by showing students where each argument holds and where it breaks.

**Key pedagogical constraint:** Students must commit to a number and defend it. "AI will bring in more work" is easy to say; "Demand elasticity is a 3 out of 4 because there are 32 million underserved SMBs" is a claim you have to justify. The custom profile builder is designed around this principle.

---

## 2. The Five-Variable Framework

Each profile is rated 1-4 on five axes. All axes are oriented so that higher = more protected from AI displacement, making "larger radar shape = more protected" intuitive.

### 2.1 Dimensionality (1-4)
How many complementary tasks make up the role. When tasks are multiplicatively linked (O-Ring production function), automating some tasks frees the worker to concentrate on the rest. When a job has only one or two core tasks, automating them eliminates the position.

| Rating | Description |
|--------|-------------|
| 1 | 1-2 core tasks. The job is basically one thing done repeatedly. |
| 2 | 3-4 tasks. Some variety, but tasks are somewhat independent. |
| 3 | 5-6 linked tasks. Doing one well requires doing the others well. |
| 4 | 7+ deeply intertwined tasks. The role is a complex bundle. |

### 2.2 Focus Effect Potential (1-4)
How much the specific person benefits when routine tasks are automated. Distinct from dimensionality: a BigLaw partner has high dimensionality but moderate focus effect (already achieved focus through human leverage). A mid-market business lawyer has moderate dimensionality but high focus effect (currently does routine tasks personally, so automation frees real time for higher-value work).

| Rating | Description |
|--------|-------------|
| 1 | The routine tasks ARE the job. Automating them eliminates the need for me. |
| 2 | Some freed time, but I'd mostly just do the same work faster. |
| 3 | Meaningful reallocation. I'd shift to higher-value work I currently can't get to. |
| 4 | Transformative. I currently spend most of my time on tasks AI could handle. |

### 2.3 Demand Elasticity (1-4)
Whether cheaper legal services unlock more demand. If clients buy substantially more legal work when prices fall, productivity gains can translate into *more* hiring even as each lawyer becomes more efficient (Jevons paradox). If demand is fixed, the same output gets produced with fewer people.

| Rating | Description |
|--------|-------------|
| 1 | Fixed demand. People don't buy more legal work just because it's cheaper. |
| 2 | Some expansion. Price drops would unlock marginal clients or matters. |
| 3 | Significant latent demand. Many people need this but can't currently afford it. |
| 4 | Massive unmet need. Cheaper services would open a flood of new clients. |

### 2.4 Self-Service Resistance (1-4)
Whether clients can bypass lawyers entirely using generally available AI tools. Inverted from the underlying variable (client self-service *risk*) so that higher = more protected. This risk is highest where the client is sophisticated enough to evaluate legal output themselves and the cost of error is manageable.

| Rating | Description |
|--------|-------------|
| 1 | Clients are sophisticated, stakes manageable, tools already exist for this. |
| 2 | Some clients could self-serve for routine matters, but not complex ones. |
| 3 | Most clients need a lawyer. Stakes, complexity, or emotions too high for DIY. |
| 4 | No realistic self-service path. Regulatory, adversarial, or existential stakes. |

### 2.5 Decision-Maker Alignment (1-4)
Who decides whether to hire, automate, or cut? In a law firm, partners weigh revenue against cost. In a corporation, the CFO weighs the legal department against the budget. In government, legislators weigh appropriations against ideology. The same AI capability produces different outcomes depending on who controls headcount. Inverted from the underlying variable (decision-maker *hostility*) so that higher = more protected.

| Rating | Description |
|--------|-------------|
| 1 | Decision-maker actively wants to reduce outside counsel or headcount. |
| 2 | Mixed incentives. Would keep me if cheap enough, but cost is the priority. |
| 3 | Generally aligned. Keeping lawyers serves the decision-maker's interests. |
| 4 | Fully aligned. The decision-maker depends on me and benefits from my success. |

---

## 3. Profile Library

### 3.1 Hierarchy Structure

Profiles are organized in a multi-level tree accessible via two entry paths. Both paths lead to the same leaf profiles — the structure just offers different starting points based on what a student knows about their future.

**Entry Path A — By Practice Area:**
```
Litigation
├── Civil
│   ├── BigLaw Defense (Am Law 50)
│   ├── Mid-Market Commercial
│   ├── Plaintiffs' Mass Tort
│   ├── Solo/Small PI
│   └── Insurance Defense
└── Criminal
    ├── Public Defender
    ├── Prosecution
    └── Private Criminal Defense

Corporate & Transactional
├── BigLaw M&A / Capital Markets
├── Mid-Market Business Counsel
├── Solo/Small General Business
├── In-House (Large Corporation)
└── In-House (Startup / Small Company)

Intellectual Property
├── Patent Prosecution
├── IP Litigation
└── Trademark / Copyright

Regulatory & Compliance
├── Private Practice (BigLaw / Mid-Market)
├── Government Agency Counsel
└── In-House Compliance

Family Law
├── Private Practice
└── Legal Aid

Immigration
├── Private Practice
└── Nonprofit / Legal Aid

Estate Planning
├── Private Practice (High-Net-Worth)
└── Solo/Small General Practice

Employment & Labor
├── Management-Side (Firm)
├── Plaintiff-Side (Firm)
└── In-House / Government
```

**Entry Path B — By Firm Type:**
```
BigLaw (Am Law 50)
├── Litigation Defense
├── M&A / Capital Markets
├── IP
└── Regulatory

Mid-Market (Am Law 100-200, Regional)
├── Commercial Litigation
├── Business Counsel
└── General Practice

Small Firm (2-20 attorneys)
├── PI / Insurance Defense
├── General Business
└── Family / Estate

Solo Practice
├── PI
├── General Business
├── Criminal Defense
└── Immigration

Government
├── Prosecution
├── Public Defender
├── Agency Counsel
└── Military JAG

In-House
├── Large Corporation
├── Startup / Small Company
└── Nonprofit

Legal Aid / Nonprofit
├── Civil Legal Aid
├── Immigration Nonprofit
└── Public Interest Litigation
```

Some profiles appear in both trees (same data, different navigation path). Total unique leaf profiles: approximately 25-30.

### 3.2 Profile Data Structure

Each profile includes:

```
{
  id: "biglaw-lit-defense",
  name: "BigLaw Defense (Am Law 50)",
  category: "Litigation > Civil",
  firmType: "BigLaw",
  defaultSeniority: "junior",

  // Junior attorney ratings (default view)
  junior: {
    dimensionality: 3,
    focusEffect: 2,
    demandElasticity: 1,
    selfServiceResistance: 4,
    decisionMakerAlignment: 3,
    verdict: "Well Protected",
    verdictType: "protected",  // protected | growth | multiplier | squeezed | vulnerable | political
    descriptions: {
      dimensionality: "Even juniors touch research, drafting, discovery management, and case preparation across multiple workstreams on large matters.",
      focusEffect: "Some routine tasks get automated, but the firm may need fewer juniors rather than the same juniors doing higher work. Mixed benefit.",
      demandElasticity: "When a company faces a $2B lawsuit, it doesn't shop for a discount. Among the most inelastic segments of the legal market.",
      selfServiceResistance: "No GC is defending a bet-the-company case with ChatGPT. Stakes too high, work too complex, adversarial dynamics require human judgment.",
      decisionMakerAlignment: "Partners want revenue, clients want to win. Neither has incentive to displace senior lawyers. But both may thin the junior layer."
    }
  },

  // Senior trajectory (overlay toggle)
  senior: {
    dimensionality: 4,
    focusEffect: 2,
    demandElasticity: 1,
    selfServiceResistance: 4,
    decisionMakerAlignment: 4,
    verdict: "Very Well Protected",
    verdictType: "protected",
    descriptions: {
      dimensionality: "Lead partner combines strategy, expert management, client counseling at board level, courtroom advocacy, settlement negotiation, and team leadership.",
      focusEffect: "Already achieved focus through human leverage — associates handle routine work. AI replacing associate work doesn't free up much partner time.",
      // ... etc
    }
  }
}
```

### 3.3 Verdict Categories

Each profile gets a verdict badge based on its overall shape. These are assigned by the professor, not computed algorithmically — the categories reflect qualitative judgment, not a formula.

| Verdict | Color | Meaning |
|---------|-------|---------|
| Well Protected | Blue | High on most axes. AI augments, doesn't threaten. |
| Growth | Purple | AI enables handling more work, expanding the market. |
| Force Multiplier | Amber/Gold | Solo/small practitioners who become much more productive. |
| Squeezed | Orange | Pressure from both sides — above and below. |
| Vulnerable | Red | Low on most axes. Structural displacement risk. |
| Political Variable | Gray/Teal | Outcome depends on political context, not economics (government, legal aid). |

### 3.4 Content Source

Profile ratings and descriptions are adapted from the course's sector analysis document (`Class Prep/AI and the Business of Law - Sector Analysis.md`). All copy should be written from the **junior attorney perspective** by default — this is what students care about and identify with. The senior overlay shows how the same role changes over a career.

---

## 4. User Interface

### 4.1 Entry Screen

Clean, minimal landing page with the question "How will AI reshape your future practice?" and three options:

1. **Browse by Practice Area** — card with example drill-down path
2. **Browse by Firm Type** — card with example drill-down path
3. **Build a Custom Profile** — dashed-border button at bottom

Aesthetic: white background, generous whitespace, purple (#7c3aed) accent color. Inspired by the Claude web interface.

### 4.2 Category / Subcategory Screens

List view showing practice areas (or firm types) as clickable rows. Each row shows the name and a count of sub-items or profiles. Categories that have subcategories (e.g., Litigation → Civil / Criminal) show an intermediate screen before reaching the comparison view.

Breadcrumb navigation at the top: Explorer › Practice Area › Litigation › Civil. Each segment is a clickable link back to that level.

### 4.3 Comparison View (Main Screen)

This is where students spend most of their time. Layout:

**Top:** Chip bar for toggling profiles on/off. Clicking a chip's label toggles its visibility on the chart. Chips are color-coded when active. A "+ Custom" chip at the end opens the custom builder.

**Left (60%):** Pentagon radar chart.
- 5 axes, all oriented outward = more protected
- Thin strokes (1.5px) with semi-transparent fills (15-20% opacity)
- Grid lines very subtle (0.5px, light gray)
- Axis labels at each point with sublabels where needed
- "Larger shape = more protected" note below
- Color-coded legend below chart; clicking a legend item highlights that profile and dims others to ~20% opacity
- When 4+ profiles are active, show a tip suggesting comparing 2-3 at a time for clarity
- Max recommended overlays: 3 for readability; technically unlimited but warn user

**Right (40%):** Detail card stack.
- One card per active profile, color-coded with left border
- Collapsed by default: shows name, seniority label, and verdict badge
- Click to expand: shows all 5 variables with rating (e.g., "High (3/4)"), a horizontal bar, and 2-3 sentence explanation
- Clicking a card highlights the corresponding shape on the radar chart and dims others
- Click again to deselect (show all)

**Inside each expanded card:**
- **Save button:** "★ Save to My Comparison" — adds this profile to the starred collection. When saved, button changes to "★ Saved" with filled gold star. Clear, deliberate action placed where the student has already engaged with the content.
- **Seniority toggle:** "Overlay senior trajectory" with a toggle switch. When on, a dashed-outline version of the same profile appears on the radar chart showing the senior ratings. Toggle text updates to show which seniority levels are displayed.

### 4.4 Custom Profile Builder

Accessed from the entry screen or from the "+ Custom" chip in the comparison view. Single scrollable page:

1. **Name field:** Text input ("Name your profile — e.g., Immigration Solo Practice")
2. **Five variable sections**, each containing:
   - Variable name as heading
   - Italic thinking prompt (1-2 sentences that guide the student's reasoning without requiring a written response)
   - 4-option scale (1-4), each option as a tappable card showing the number and a descriptive anchor sentence
   - Only one option can be selected per variable
3. **Actions:** "Add to Comparison →" (primary) and "Cancel" (secondary)

Custom profiles appear in the comparison view with a green color and "Custom" label. They are also automatically added to the starred collection.

**Thinking prompts for each variable:**

| Variable | Prompt |
|----------|--------|
| Dimensionality | "Think about a typical matter in this role. How many distinct, complementary tasks does the lawyer handle personally? Could you automate one task without affecting the others, or are they tightly linked?" |
| Focus Effect Potential | "If AI handled the routine parts of this role tomorrow, would you spend that freed-up time on higher-value work you're already qualified to do? Or would the routine work being gone mean there's less reason to have you?" |
| Demand Elasticity | "If legal services in this area became 40% cheaper, would clients buy significantly more? Or is demand fixed — people only need a lawyer when they need a lawyer, regardless of price?" |
| Self-Service Resistance | "Could your clients handle this work themselves using AI tools? Consider: Can they evaluate the quality of legal output? How bad is it if they get it wrong? Are there regulatory gates that prevent DIY?" |
| Decision-Maker Alignment | "Who decides whether to hire, keep, or replace lawyers in this role? A partner protecting revenue? A CFO cutting costs? A legislature setting appropriations? Do their incentives favor keeping you — or replacing you?" |

### 4.5 Starred Comparison View

Accessed via the "★ N Starred Profiles" button in the top navigation bar (always visible). Shows:

1. **All starred profiles** as colored chips with × to remove
2. **Pentagon radar chart** with all starred profiles overlaid (same rendering as comparison view)
3. **Summary comparison table:** compact grid showing profile name, all 5 ratings as numbers, and verdict badge. Column headers abbreviated (D, F, E, R, A) with a legend row below.
4. **Export bar:**
   - "Download Chart as PNG" — renders the radar chart + legend as a downloadable image
   - "Copy Shareable Link" — encodes starred profile IDs and custom profile data in URL parameters so the comparison can be shared or reopened later

Students can star profiles from different parts of the hierarchy and see them all together here. A student might star BigLaw Defense from Litigation > Civil, In-House (Large Corp) from Corporate, and their own custom Immigration Solo profile — then compare all three in the starred view.

---

## 5. Interaction Design

### 5.1 Radar Chart Behavior

| Action | Result |
|--------|--------|
| Click legend item | Highlight that profile (others dim to ~20%). Click again to deselect. |
| Click detail card | Expand card AND highlight corresponding shape. Click again to collapse and deselect. |
| Toggle chip on | Shape appears on chart, detail card appears in stack. |
| Toggle chip off | Shape disappears, card disappears. |
| Toggle seniority (in card) | Dashed-outline shape appears/disappears overlaying the solid shape. |
| 4+ profiles active | Show tip recommending 2-3 at a time. |

### 5.2 Star/Save Behavior

| Action | Result |
|--------|--------|
| Click "★ Save to My Comparison" in expanded detail card | Profile added to starred collection. Button changes to "★ Saved" (filled gold star). Star count in nav updates. |
| Click "★ Saved" | Profile removed from starred collection. Button reverts. |
| Create custom profile | Automatically starred. |
| Click starred nav button | Navigate to starred comparison view. |

### 5.3 Persistence

All state saved to `localStorage`:
- Which profiles are starred
- Custom profile definitions (name + 5 ratings)
- Last-viewed screen (so students can return to where they left off)

No user accounts, no server. Everything is browser-local.

### 5.4 Shareable Link

The "Copy Shareable Link" button encodes the current starred comparison in URL query parameters:

```
?starred=biglaw-lit-defense,insurance-defense,custom-1
&custom-1=Immigration+Solo,3,3,4,3,2
```

When a student opens a shared link, the app loads directly to the starred comparison view with those profiles displayed. Custom profiles are decoded from the URL.

---

## 6. Visual Design

### 6.1 General Aesthetic
- White background, minimal borders, generous whitespace
- Inspired by Claude web interface
- Purple accent (#7c3aed) for interactive elements and branding
- System font stack (-apple-system, BlinkMacSystemFont, Segoe UI)

### 6.2 Color Palette for Profiles
Up to 6 simultaneously distinguishable colors, chosen for accessibility:

| Slot | Color | Hex | Use |
|------|-------|-----|-----|
| 1 | Blue | #2563eb | First profile in any comparison |
| 2 | Amber | #d97706 | Second profile |
| 3 | Red | #dc2626 | Third profile |
| 4 | Green | #059669 | Fourth profile / custom profiles |
| 5 | Purple | #7c3aed | Fifth profile |
| 6 | Teal | #0891b2 | Sixth profile (if needed) |

Colors are assigned in order of activation. Custom profiles default to green.

### 6.3 Radar Chart Specifications
- Pentagon shape (5 axes)
- 4 concentric grid rings at 25%, 50%, 75%, 100%
- Grid lines: 0.5px, #f0f0f0 (inner) to #ddd (outer)
- Axis lines: 0.5px, #eaeaea
- Profile shapes: 1.5px stroke, 15-20% fill opacity
- Senior overlay: 1.5px dashed stroke, no fill, 50% opacity
- Highlighted profile: full opacity. Dimmed profiles: ~20% opacity.
- Axis labels: 11px semibold (#444) with 9.5px sublabels (#aaa) where needed

### 6.4 Detail Cards
- White background, 1.5px border, 10px border-radius
- 4px colored left border matching profile color
- Verdict badge: 10px uppercase, colored background, rounded pill shape
- Variable bars: 4px height, rounded, colored fill on #eee background
- Explanation text: 12px, #888, 1.5 line-height

---

## 7. Technical Requirements

### 7.1 Stack
- **Frontend only.** Single HTML file or small bundle (HTML + CSS + JS).
- No backend, no API keys, no database.
- Host on Render, Replit, or similar static hosting (same as other course tools).
- Should work on laptops and tablets. Phone support is nice-to-have but not required (students will use this in class on laptops).

### 7.2 Data
- All profile data stored as a JS object/JSON in the source code.
- Custom profiles and starred state stored in localStorage.
- Shareable links encode state in URL parameters.

### 7.3 Radar Chart Rendering
- SVG-based rendering (no canvas). Allows clean scaling, printing, and screenshot export.
- Pentagon geometry computed from 5 ratings × 4 scale levels.
- Each axis at 72° intervals starting from top (12 o'clock position).
- Points computed as: `x = r * sin(angle)`, `y = -r * cos(angle)` where `r = rating/4 * maxRadius`.

### 7.4 PNG Export
- Use `html2canvas` or similar library to capture the radar chart SVG + legend as a PNG.
- Alternatively, use SVG serialization → canvas → download.

### 7.5 Performance
- No heavy dependencies. Vanilla JS or lightweight framework (Preact, Alpine.js).
- All interactions should feel instant (<50ms response).

---

## 8. Content Authoring Notes

### 8.1 Writing Profile Descriptions
- Default copy for all profiles should be written from the **junior attorney perspective**. This is who the students are and will be. Senior trajectory is the overlay, not the default.
- Each variable description should be 2-3 sentences max. Conversational but precise.
- Where possible, ground descriptions in specific, defensible claims from the readings: "Insurance companies already use billing guidelines and rate caps aggressively" (from sector analysis), not vague assertions.
- Descriptions should be provocative enough to spark disagreement. The custom builder exists for students who want to challenge a rating.

### 8.2 Populating the Full Library
The sector analysis document (`Class Prep/AI and the Business of Law - Sector Analysis.md`) covers approximately 15 practice-area profiles in detail. The remaining ~10-15 profiles in the hierarchy will need to be authored. Priority order:
1. Profiles covered in the sector analysis (most detailed, adapt directly)
2. Profiles relevant to the student population (~25% BigLaw, ~25% govt/public interest, ~50% small/medium)
3. Remaining profiles (fill in with reasonable ratings; students can always override via custom builder)

### 8.3 Verdict Assignment
Verdicts are assigned qualitatively by the professor, not computed from ratings. The same total score could be "Force Multiplier" (solo practitioner who thrives) or "Squeezed" (mid-market firm under pressure from both sides) depending on the narrative.

---

## 9. Relationship to Course Materials

### 9.1 Readings Connection
The five variables map directly to concepts in the assigned readings:
- **Dimensionality + Focus Effect** → O-Ring model (Imas & Shukla / Gans & Goldfarb, discussed in lecture)
- **Demand Elasticity** → Jevons paradox (Rapoport & Tiano Part III)
- **Self-Service Resistance** → Sequoia copilot/autopilot framework (Bek, "Services: The New Software")
- **Decision-Maker Alignment** → Structural bottlenecks (Curl, Kapoor & Narayanan, "AI Won't Automatically Make Legal Services Cheaper")

### 9.2 In-Class Use
- **During class:** Professor screenshares the tool. Walk through 2-3 profiles together as a class, discussing the ratings. Then release the URL for students to explore independently.
- **Discussion prompt:** "Find the profile closest to where you're headed. Do you agree with the ratings? If not, build a custom profile and be prepared to defend your numbers."
- **Connects to 13-2:** The "Build Your Own Analysis" exercise in the sector analysis (Part VIII) can use the tool as the interface. Students star their target profile, adjust it if needed, and export their comparison for the final class.

### 9.3 Non-BigLaw Relevance
The tool is specifically designed for the student population mix (~25% BigLaw, ~25% govt/public interest, ~50% small/medium). The hierarchy includes legal aid, government, solo, and small-firm profiles alongside BigLaw. The "Political Variable" verdict category exists specifically because government and legal aid outcomes depend on political context, not economic logic — a key insight from the sector analysis.

---

## 10. Open Questions

1. **Dimensionality vs. Focus Effect distinction:** Professor notes these are still a bit confusing. May need to refine the descriptions or add a tooltip/explainer distinguishing them. Core distinction: dimensionality is a structural property of the role; focus effect is about how much *you specifically* benefit from automation.

2. **Number of profiles:** The hierarchy lists ~25-30. Is this the right scope, or should we trim to ~20 to keep authoring manageable? Students can always create custom profiles for anything missing.

3. **Small multiples view:** Best practice research suggests that with 4+ overlapping radar shapes, a "small multiples" layout (mini charts side by side) is more readable than one dense overlay. Worth building as an alternative view, or is the highlight-one-at-a-time interaction sufficient?

4. **Mobile support:** The comparison view with side-by-side radar + detail cards doesn't work well on phones. Stack vertically on narrow screens? Or explicitly tell students to use a laptop?

---

## 11. Mockups

Interactive mockups from the brainstorming session are saved at:
`.superpowers/brainstorm/7724-1775619603/content/`

Key files:
- `full-flow-v2.html` — most current: entry, drill-down, comparison with working highlight/seniority toggle, redesigned stars
- `spider-v3.html` — earlier version with pentagon chart + Claude-web aesthetic
- `spider-comparison.html` — initial mockup comparing spider chart vs. cards layout

Professor's Claude web prototype screenshot: `Scratch/Screenshot 2026-04-07 235346.png`
