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
      dimensionality: 2,
      focusEffect: 2,
      demandElasticity: 1,
      selfServiceResistance: 4,
      decisionMakerAlignment: 2,
      verdict: 'Well Protected',
      verdictType: 'protected',
      descriptions: {
        dimensionality: 'Your work centers on research, drafting, discovery management, and document review. Important tasks, but relatively narrow and separable on large matters with big teams.',
        focusEffect: 'Some routine tasks get automated, but the firm may need fewer juniors rather than the same juniors doing higher work. Mixed benefit.',
        demandElasticity: 'When a company faces a $2B lawsuit, it doesn\'t shop for a discount. Among the most inelastic segments of the legal market.',
        selfServiceResistance: 'No GC is defending a bet-the-company case with ChatGPT. Stakes too high, work too complex, adversarial dynamics require human judgment.',
        decisionMakerAlignment: 'Partners want revenue, clients want to win — but neither needs as many juniors when AI handles research and doc review. Both may thin the junior layer.',
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
        dimensionality: 'You handle a broader range of tasks than BigLaw juniors — less specialization, smaller teams mean you touch research, drafting, client communication, and case strategy earlier.',
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
      demandElasticity: 2,
      selfServiceResistance: 4,
      decisionMakerAlignment: 3,
      verdict: 'Political Variable',
      verdictType: 'political',
      descriptions: {
        dimensionality: 'Case evaluation, grand jury work, plea negotiation, trial preparation, victim coordination, and courtroom advocacy — high-dimensional from the start.',
        focusEffect: 'AI handles case research and brief drafting. Meaningful reallocation to case evaluation, victim services, and courtroom preparation.',
        demandElasticity: 'Criminal caseloads are driven by crime rates, not by legal costs. Making prosecution cheaper doesn\'t create more cases — though backlogged offices could process more.',
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
      decisionMakerAlignment: 2,
      verdict: 'Squeezed',
      verdictType: 'squeezed',
      descriptions: {
        dimensionality: 'Junior transactional work centers on due diligence, first-draft document preparation, and data room analysis — important but narrow.',
        focusEffect: 'Some freed time, but the firm may hire fewer juniors rather than give juniors more interesting work. The "class of 40 becomes a class of 25."',
        demandElasticity: 'Deal volume is driven by interest rates, valuations, and strategic logic — not legal costs. Cheaper lawyers don\'t create more mergers.',
        selfServiceResistance: 'No CFO runs a $10B acquisition through ChatGPT. Complex deal execution requires deep expertise across multiple practice areas.',
        decisionMakerAlignment: 'Partners want to maintain revenue, but clients want efficiency. Both sides see reducing junior headcount as a path to lower costs. The "class of 40 becomes a class of 25."',
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
      demandElasticity: 2,
      selfServiceResistance: 2,
      decisionMakerAlignment: 2,
      verdict: 'Squeezed',
      verdictType: 'squeezed',
      descriptions: {
        dimensionality: 'Startup lawyers wear many hats — contracts, employment, IP, fundraising, compliance. Broader than large-corp in-house but shallower.',
        focusEffect: 'AI handling routine contracts and compliance frees real time for strategic work on fundraising, partnerships, and product launches.',
        demandElasticity: 'Startups currently skip legal work because it\'s expensive. Cheaper services would unlock some demand — but founders are also the most likely to self-serve instead of hiring.',
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
        decisionMakerAlignment: 'Partners want revenue from IP disputes, clients want to protect or enforce patents. But junior headcount pressure exists here too — fewer associates needed per case.',
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
      selfServiceResistance: 4,
      decisionMakerAlignment: 4,
      verdict: 'Well Protected',
      verdictType: 'protected',
      descriptions: {
        dimensionality: 'Multi-generational trust design, cross-jurisdictional tax planning, business succession structuring, and family governance counseling.',
        focusEffect: 'AI handles document drafting and tax calculations. Meaningful reallocation to client counseling and complex planning strategy.',
        demandElasticity: 'HNW estate planning demand is driven by wealth, not legal costs. Some modest expansion as practitioners serve moderately wealthy clients.',
        selfServiceResistance: 'Clients with $10M+ estates are not using LegalZoom. The complexity, tax consequences, and family dynamics demand professional counsel.',
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
      'plaintiffs-mass-tort',
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
