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
        focusEffect: 'You\'re genuinely stretched across routine and substantive work, and the tasks reinforce each other — the junior who handled discovery writes the better brief. AI lets you concentrate on the linked tasks where quality compounds. But whether YOU benefit or the firm just needs fewer of you depends on institutional survival.',
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
    references: [
      { title: 'How TorHoerman Law Won a $495M NEC Verdict with Supio AI', url: 'https://www.supio.com/customers/how-torhoerman-law-secured-a-495m-verdict-against-abbott-labs-with-supio-ai', source: 'Supio' },
      { title: 'Justpoint Law Becomes First AI-Native Mass Tort Firm', url: 'https://www.prnewswire.com/news-releases/justpoint-law-becomes-first-ai-native-mass-tort-law-firm-approved-under-arizonas-abs-302683247.html', source: 'PR Newswire' },
      { title: 'Deep Learning Meets Deep Pockets: AI\'s Impact on Litigation Financing', url: 'https://www.winston.com/en/blogs-and-podcasts/product-liability-and-mass-torts-digest/deep-learning-meets-deep-pockets-artificial-intelligences-impact-on-litigation-financing', source: 'Winston & Strawn' },
      { title: 'Mass Torts, Minimal Merit: Why MDL Reform Matters', url: 'https://instituteforlegalreform.com/blog/mass-torts-minimal-merit-why-mdl-reform-matters/', source: 'Institute for Legal Reform' },
      { title: 'Supio Raises $60M Series B to Accelerate Legal AI Adoption', url: 'https://www.supio.com/press/supio-announces-60m-series-b-to-accelerate-adoption-of-legal-ai-in-plaintiff-law', source: 'Supio' },
    ],
    junior: {
      dimensionality: 2,
      focusEffect: 2,
      demandElasticity: 4,
      selfServiceResistance: 4,
      decisionMakerAlignment: 4,
      verdict: 'Growth',
      verdictType: 'growth',
      descriptions: {
        dimensionality: 'Intake screening, Plaintiff Fact Sheet completion, medical chronology assembly, and document management across massive case inventories. Important pipeline work, but juniors rarely take depositions, coordinate experts, or touch bellwether trial prep — those stay with seniors.',
        focusEffect: 'Firms call it "case development," but junior work is primarily intake qualification — screening claimants against exposure and diagnosis criteria, assembling medical chronologies, completing Plaintiff Fact Sheets. Substantive litigation (depositions, expert coordination, bellwether prep) stays with senior attorneys. AI tools like Supio (85%+ reduction in document review time) and Pattern Data (10x faster case screening) automate exactly these junior tasks rather than freeing juniors for complementary higher-value work they don\'t yet touch.',
        demandElasticity: 'AI is expanding the addressable market through multiple mechanisms: Darrow ($91M funded) identifies mass torts before they\'re widely known, Justpoint processes 1,000+ claims daily and detected Oxbryta dangers 21 months before FDA withdrawal, and Supio customers report 62% increases in case volume. More cases still require human oversight at each stage — the Jevons paradox in action.',
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
        dimensionality: 'Lead partners compete for Plaintiff Steering Committee positions (controlling litigation strategy for entire MDLs), try bellwether cases that set settlement benchmarks, manage expert witnesses through Daubert hearings, negotiate global settlements across thousands of plaintiffs, and make strategic decisions about which torts to invest in and how many cases to acquire.',
        focusEffect: 'Senior attorneys already focus on high-value work — PSC leadership, bellwether trials, settlement negotiation — through team leverage. AI amplifies this by expanding the number of cases each partner can oversee, growing inventory capacity more than it frees time.',
        demandElasticity: 'AI-powered case origination (Darrow, Justpoint) and cheaper intake processing are expanding total mass tort claim volume. Litigation finance ($19.3B market in 2025, projected $53.2B by 2035) makes previously marginal cases financeable. Judicial quality controls (e.g., Depo-Provera MDL pleading standards, May 2025) may constrain unlimited growth, but the expansion trend is strong.',
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
        focusEffect: 'You ARE the firm, so you capture 100% of the focus effect. Your tasks are tightly O-Ring — the lawyer who reviewed the medical records writes the better demand letter and negotiates from a stronger position. AI handles the paperwork; you concentrate on the linked bundle of negotiation, client work, and trial prep where quality compounds.',
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
    references: [
      { title: 'Carrier Litigation Management Platform', url: 'https://caseglide.com/', source: 'CaseGlide' },
      { title: 'How Allstate\'s CIO Is Leaning on Gen AI', url: 'https://fortune.com/2025/01/08/how-allstates-cio-is-leaning-on-gen-ai-to-make-insurance-policy-coverage-and-claims-requests-more-effective-and-empathetic/', source: 'Fortune' },
      { title: 'AI Reduces Client Use of Law Firms by 13%', url: 'https://www.artificiallawyer.com/2025/07/08/ai-reduces-client-use-of-law-firms-by-13-study/', source: 'Artificial Lawyer' },
      { title: 'Can AI Transform Insurance Defense and Carrier Relationships?', url: 'https://www.techlawcrossroads.com/2024/09/unlocking-potential-can-ai-and-gen-ai-can-transform-insurance-defense-and-carrier-relationships/', source: 'TechLaw Crossroads' },
      { title: 'Insurance Defense Firms Have a Problem', url: 'https://www.insurancethoughtleadership.com/operational-efficiency/insurance-defense-firms-have-problem', source: 'Insurance Thought Leadership' },
    ],
    junior: {
      dimensionality: 2,
      focusEffect: 1,
      demandElasticity: 1,
      selfServiceResistance: 1,
      decisionMakerAlignment: 1,
      verdict: 'Vulnerable',
      verdictType: 'vulnerable',
      descriptions: {
        dimensionality: 'Routine motions, discovery, medical record review, and extensive carrier reporting under strict Outside Counsel Guidelines. Juniors take depositions by year 2-3, but even these tasks are more templated than in other litigation contexts.',
        focusEffect: 'The routine tasks ARE the job. Automating them doesn\'t free you for higher work — it eliminates the reason to have you.',
        demandElasticity: 'Carrier AI is resolving claims faster (75% reduction in resolution time at AI-adopting carriers), meaning fewer disputes escalate to litigation. The demand pipeline is shrinking at the source, not just being redistributed.',
        selfServiceResistance: 'Carriers already use billing guidelines, rate caps, and AI-powered litigation management tools (like CaseGlide, which oversees $7.5B+ in legal spend). More critically, carrier AI is resolving claims before they become litigation — shrinking the pipeline of work that reaches outside counsel.',
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
        selfServiceResistance: 'Complex trials still require outside counsel, but the threshold keeps rising. Carriers are deploying AI claims triage that resolves matters pre-litigation, and AI-powered billing oversight tools that squeeze the work that remains.',
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
    references: [
      { title: 'National Public Defense Workload Study', url: 'https://www.rand.org/pubs/research_reports/RRA2559-1.html', source: 'RAND Corporation' },
      { title: 'How Can AI Augment Access to Justice? Public Defenders\' Perspectives', url: 'https://arxiv.org/html/2510.22933v1', source: 'arxiv' },
      { title: 'Legal Aid Organizations Embrace AI at Twice the Rate of Other Lawyers', url: 'https://www.lawnext.com/2025/09/legal-aid-organizations-embrace-ai-at-twice-the-rate-of-other-lawyers-new-study-reveals.html', source: 'LawSites' },
      { title: 'Existing AI Tools for Criminal Defense', url: 'https://www.law.berkeley.edu/research/criminal-law-and-justice-center/our-work/ai-for-public-defenders/existing-ai-tools/', source: 'UC Berkeley Law' },
      { title: 'Washington Supreme Court Slashes Public Defender Caseload Limits', url: 'https://washingtonstatestandard.com/2025/06/09/washingtons-supreme-court-slashes-public-defender-caseload-limits/', source: 'Washington State Standard' },
      { title: 'Miami-Dade Public Defender Pioneers AI Integration', url: 'https://www.floridabar.org/the-florida-bar-news/miami-dade-public-defender-is-using-artificial-intelligence-for-research-and-for-case-preparation/', source: 'The Florida Bar' },
    ],
    junior: {
      dimensionality: 4,
      focusEffect: 4,
      demandElasticity: 4,
      selfServiceResistance: 4,
      decisionMakerAlignment: 1,
      verdict: 'Political Variable',
      verdictType: 'political',
      descriptions: {
        dimensionality: 'Investigation, legal research, motion practice, plea negotiation, client counseling with vulnerable populations, jury selection, trial advocacy — plus a growing digital evidence burden (Cook County receives 60,000 hours of body-cam footage annually). And increasingly, defenders must understand and challenge AI-generated evidence: algorithmically drafted police reports, facial recognition IDs, acoustic gunshot detection. All from day one.',
        focusEffect: 'The task complementarity is identical to private defense — but the RAND-standard 59-felony maximum (35 hours/case) collides with actual caseloads of 150-525+ cases per attorney. Miami-Dade\'s CoCounsel deployment cut research time per motion from 5 hours to 1 — proving AI can restore the O-Ring bundle. But the focus effect gets captured by the political system: law enforcement gets $3.5B+ in AI investment while defender offices fight for basic staffing, and legislators have no incentive to let AI savings flow into better representation rather than flat budgets.',
        demandElasticity: 'Only 21% of state PD offices have enough attorneys to meet caseload standards. The RAND study says a felony needs 35 hours; defenders often get a fraction of that. AI could let each attorney provide dramatically better representation — and 90% of legal aid professionals say AI at full potential would enable serving more clients — but the demand gap is structural, not merely technological.',
        selfServiceResistance: 'Constitutional right to counsel. Clients cannot afford private counsel — that\'s why they\'re in the system. Zero self-service path.',
        decisionMakerAlignment: 'San Francisco\'s PD budget ($54.6M) is 60% of the DA\'s ($84.1M) despite representing 75-80% of people charged. Police departments get AI tools (Axon Draft One, facial recognition, ShotSpotter) through their own budgets; defenders must fight county procurement for basic software. The risk isn\'t that legislators cite AI to cut budgets — it\'s that they invest in prosecution-side AI while starving the defense side, widening an asymmetry that existed long before AI.',
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
        focusEffect: 'Senior defenders who adopt AI tools report dramatic time savings — Miami-Dade attorneys saved up to 15 hours weekly on research and evidence review, redirecting time to client contact, trial prep, and training junior staff. But with 24% annual turnover (Kentucky, 2025) and 40% attrition over four years (Minnesota), the freed time often goes to covering for departed colleagues rather than deepening representation.',
        demandElasticity: 'Latent demand remains infinite at every level. Quality of representation could improve dramatically with AI assistance.',
        selfServiceResistance: 'No change from junior — constitutional mandate and vulnerable population make self-service impossible.',
        decisionMakerAlignment: 'Washington\'s Supreme Court slashed caseload limits from 150 felonies to 47 in June 2025 — and counties immediately said the standards are "unattainable with current funding." Senior defenders may have political capital to push for reform through courts rather than legislatures, but funding remains the bottleneck. AI investment decisions are made by the same officials who chronically underfund the offices.',
      },
    },
  },

  'prosecution': {
    id: 'prosecution',
    name: 'Prosecution',
    category: 'Litigation > Criminal',
    firmType: 'Government',
    references: [
      { title: 'Integrating AI: Guidance and Policies for Prosecutors', url: 'https://pceinc.org/wp-content/uploads/2025/01/20250125-Integrating-AI-A-Guide-for-Prosecutors.pdf', source: 'Prosecutors\' Center for Excellence' },
      { title: 'AI Police Reports: Year in Review', url: 'https://www.eff.org/deeplinks/2025/12/ai-police-reports-year-review', source: 'EFF' },
      { title: 'Law Enforcement AI Evidence Synthesis', url: 'https://therecord.media/law-enforcement-ai-platforms-synthesize-evidence-criminal-cases', source: 'The Record' },
      { title: 'No Rest for the Prosecution', url: 'https://wabarnews.org/2025/02/11/no-rest-for-the-prosecution/', source: 'Washington State Bar News' },
      { title: 'California Prosecution vs. Defense Investment Disparity', url: 'https://www.ospd.ca.gov/wp-content/uploads/2025/05/Unequal-Scales_Californias-Investment-Disparity-between-Prosecution-and-Public-Defense.pdf', source: 'CA Office of the State Public Defender' },
    ],
    junior: {
      dimensionality: 4,
      focusEffect: 3,
      demandElasticity: 3,
      selfServiceResistance: 4,
      decisionMakerAlignment: 3,
      verdict: 'Political Variable',
      verdictType: 'political',
      descriptions: {
        dimensionality: 'Case evaluation, grand jury work, plea negotiation, trial preparation, victim coordination, courtroom advocacy — and increasingly, navigating AI-generated evidence. Prosecutors must now evaluate AI-drafted police reports (Axon Draft One), disclose facial recognition use under Brady, and defend AI evidence reliability under Daubert. A Maryland appellate court reversed a conviction in 2025 for late disclosure of facial recognition use. These AI-related obligations are new and growing.',
        focusEffect: 'Most offices assign cases end-to-end, and AI tools are accelerating the linked bundle: TimePilot compresses case timelines from 30 days to 3; NiCE Justice replaces daylong evidence downloads with automated ingestion from 20+ law enforcement agencies. But AI simultaneously adds work — disclosure of AI police reports, authentication of digital evidence, Daubert challenges to tools like ShotSpotter. The net time savings flow to clearing backlogs, not to better-resourced offices: Miami has 33% prosecutor vacancy despite political support.',
        demandElasticity: 'Only 22 of every 1,000 robberies result in felony convictions; only 7 of 1,000 rapes do. Most attrition happens between arrest and charges — exactly where AI evidence analysis can help. TimePilot claims to clear 50 backlogged cases annually; Cellebrite cuts digital forensic assembly from weeks to minutes. AI can\'t change crime rates, but it can change prosecution rates for cases currently declined due to resource constraints.',
        selfServiceResistance: 'The state has a monopoly on prosecution. No self-service concept applies.',
        decisionMakerAlignment: 'NYC raised DA budgets to $633M (23% increase); California spends $2.2B on prosecution vs. $1.2B on defense annually. Prosecution enjoys broader political support than defense — the bipartisan HIRRE Act targets prosecutor retention specifically. But 70% of prosecutors surveyed are considering leaving, and starting ADA pay ($57K in Wisconsin) is less than half private-sector entry. Political support exists in the aggregate but fails to translate into competitive compensation at the office level.',
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
        focusEffect: 'Senior prosecutors focus on complex, high-profile cases where AI has modest direct impact on workflow. But they bear responsibility for office-wide AI policy: which tools to adopt, how to comply with emerging disclosure requirements, and how to train junior ADAs on AI evidence authentication. PCE and Microsoft co-hosted a 2-day AI policy integration event for prosecutors in June 2025 — the audience was senior leadership.',
        demandElasticity: 'Same dynamics, but senior prosecutors handle the most serious cases — homicides, organized crime, public corruption — which are rarely declined for resource reasons alone. AI\'s volume effects are concentrated at the junior level.',
        selfServiceResistance: 'Absolute. The state prosecutes; no one else can.',
        decisionMakerAlignment: 'Elected DAs face intense political volatility — Gascón and Price lost in 2024, but Krasner won a third term by 50 points in 2025. Prosecution budgets are politically durable in the aggregate but individual DAs are subject to recall and defeat. The staffing crisis (15-33% vacancy rates) persists despite political goodwill because government pay cannot match private-sector competition.',
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
        focusEffect: 'The most tightly O-Ring role in the set. The person in court needs to have done the research — trial advocacy requires real-time application of case knowledge. Client counseling requires knowing the legal strategy. AI handles research and drafting; you concentrate on the linked bundle where everything compounds.',
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
        focusEffect: 'Understanding the client\'s business makes the contract drafting better, and vice versa — moderate O-Ring complementarity. AI frees you from routine drafting to concentrate on advisory work. But the freed time may not save your job if clients self-serve on platforms or the firm captures the efficiency.',
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
        focusEffect: 'You capture 100% of the focus effect as a solo. Currently spending most time on routine tasks AI could handle. The remaining advisory and counseling work is genuinely O-Ring — understanding the client\'s business makes every piece of advice better. But self-service risk (rating 1) means some clients won\'t need you at all.',
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
    references: [
      { title: 'ACC/Everlaw GenAI Survey 2025', url: 'https://www.everlaw.com/press/release/acc-report-2025/', source: 'Everlaw' },
      { title: 'How Generative AI Is Changing Legal Department Functions', url: 'https://www.deloitte.com/global/en/services/legal/perspectives/how-generative-ai-is-changing-legal-department-functions.html', source: 'Deloitte' },
      { title: 'How In-House Legal Teams Build the Case for AI Adoption', url: 'https://www.harvey.ai/blog/how-in-house-legal-teams-build-the-case-for-ai-adoption', source: 'Harvey AI' },
      { title: '66% of CEOs Are Freezing Hiring While Betting Billions on AI', url: 'https://fortune.com/2026/03/18/corporate-america-ai-hiring-freeze-workforce-architecture/', source: 'Fortune' },
    ],
    junior: {
      dimensionality: 2,
      focusEffect: 1,
      demandElasticity: 1,
      selfServiceResistance: 2,
      decisionMakerAlignment: 1,
      verdict: 'Vulnerable',
      verdictType: 'vulnerable',
      descriptions: {
        dimensionality: 'Junior in-house counsel handle contracts, regulatory compliance monitoring, corporate governance filings, and routine business advisory. The task set is broader than pure contract review, but every piece of it — compliance checklists, entity management, policy templates, invoice review — is highly automatable.',
        focusEffect: 'The routine work IS the job. Automating contract review doesn\'t free you for strategy — it eliminates the need for you. The employer captures 100% of the savings.',
        demandElasticity: 'Legal departments are cost centers, not profit centers. The CFO doesn\'t want to consume more legal services — they want to cut the budget.',
        selfServiceResistance: 'Business teams are increasingly self-serving: Docusign\'s 2026 AI Contract Review Assistant is built for sales, procurement, and HR to review contracts against company playbooks without legal involvement. Ironclad and Lexion enable self-service contract workflows. The ACC/Everlaw 2025 survey found 52% of legal departments actively using GenAI, with 78% planning to insource drafting.',
        decisionMakerAlignment: 'The CFO\'s incentive is to minimize legal department costs. Rather than mass layoffs, the pattern is hiring freezes and attrition: Deloitte\'s CLO survey found ~50% of departments expect to maintain size but shift to higher average seniority as junior tasks are automated. Fortune reports a 30% drop in entry-level job listings since 2022.',
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
        decisionMakerAlignment: 'The GC who advises the CEO and board on AI risk, regulatory strategy, and M&A has strong alignment. But budget pressure is real: 96% of in-house teams faced budget cuts in 2024 (Axiom), and 66% of CEOs are freezing hiring through 2026. The GC is protected; the layers below GC face compression.',
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
        focusEffect: 'The tasks are moderately complementary — understanding the fundraising shapes how you draft the IP assignment, and vice versa. AI frees you from routine contracts to concentrate on strategic work. But the startup captures the efficiency: if one lawyer plus AI can do what two lawyers did, the startup won\'t hire a second.',
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
        focusEffect: 'Claim drafting, prior art, and PTO interaction are a genuinely complementary chain — the person who understood the invention writes better office action responses. Context transfer cost is high because the technical understanding is tacit. AI handles searches and initial drafts; you concentrate where tacit knowledge compounds.',
        demandElasticity: 'A utility patent costs $10,000-$25,000 through issuance. Roughly 24% of startups with patentable inventions don\'t file due to cost. Cheaper AI-assisted filing could unlock massive latent demand.',
        selfServiceResistance: 'Patent prosecution requires technical expertise and PTO procedure knowledge. But tools like PatSnap, IPRally, and Specifio are improving at prior art searching and initial claim drafting.',
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
    references: [
      { title: '5 Workflows for IP and Patent Litigation', url: 'https://www.harvey.ai/blog/5-workflows-ip-patent-litigation', source: 'Harvey AI' },
      { title: '2025 Patent Litigation Report: 22% Surge in Filings', url: 'https://www.lexisnexis.com/community/insights/legal/lex-machina/b/lex-machina/posts/lex-machina-2025-patent-litigation-report-shows-22-surge-in-filings-and-record-4-3b-in-damages', source: 'Lex Machina' },
      { title: 'AI Intellectual Property Disputes: The Year in Review', url: 'https://www.debevoise.com/insights/publications/2025/12/ai-intellectual-property-disputes-the-year-in', source: 'Debevoise' },
      { title: 'Patent Trolls Contributing to 20% Uptick in Patent Litigation', url: 'https://www.jdsupra.com/legalnews/seven-steps-to-stop-them-and-how-they-1089650/', source: 'JD Supra' },
      { title: 'BigLaw\'s AI Reckoning May Be Coming for Lawyer Headcount', url: 'https://abovethelaw.com/2026/03/biglaws-ai-reckoning-may-be-coming-for-lawyer-headcount/', source: 'Above the Law' },
    ],
    junior: {
      dimensionality: 3,
      focusEffect: 1,
      demandElasticity: 3,
      selfServiceResistance: 4,
      decisionMakerAlignment: 3,
      verdict: 'Squeezed',
      verdictType: 'squeezed',
      descriptions: {
        dimensionality: 'Patent litigation requires technical literacy (80%+ of IP litigators hold STEM degrees), but junior work centers on claim chart preparation, prior art searching, discovery, and document review. The technical dimension is real — understanding accused products and patent claims requires genuine STEM knowledge — but the day-to-day task set is narrower than the practice area\'s reputation suggests.',
        focusEffect: 'AI tools now automate the core junior tasks: Harvey\'s claim chart workflow produces partner-ready output with citations, Patlytics delivers 80% time savings on prior art and invalidity analysis. The specialized technical knowledge that juniors bring is being embedded in tools, compressing billable hours on the work that defines the junior role.',
        demandElasticity: 'Patent litigation filings surged 22% in 2024 with record $4.3B in damages. AI-related IP disputes are an entirely new case category — 70+ federal cases pending, up from ~30 in 2024. NPE activity grew 15-20% in 2025. But rising demand may not mean proportional junior hiring: AI-driven efficiency means fewer junior hours per case even as case volume grows.',
        selfServiceResistance: 'No one self-serves on patent infringement litigation. Stakes too high, technical expertise too specialized.',
        decisionMakerAlignment: 'Partners want revenue from IP disputes, and rising case volume delivers. But AI tools that compress junior hours create a leverage problem: partners can staff fewer juniors per case while maintaining margins. Clients increasingly expect AI-driven efficiency and will resist paying junior rates for claim charts AI tools can draft.',
      },
    },
    senior: {
      dimensionality: 4,
      focusEffect: 2,
      demandElasticity: 3,
      selfServiceResistance: 4,
      decisionMakerAlignment: 4,
      verdict: 'Well Protected',
      verdictType: 'protected',
      descriptions: {
        dimensionality: 'Senior IP litigators combine legal strategy, technical mastery, courtroom advocacy, and client counseling — one of the highest-dimensional roles.',
        focusEffect: 'AI tools enhance senior workflow rather than threatening it — litigation analytics (Lex Machina), prior art verification, and claim chart review become faster. Seniors spend freed time on claim construction strategy, expert management, and trial preparation. The efficiency gains accrue to the senior, not against them.',
        demandElasticity: 'AI-as-subject-matter litigation is a genuine growth category: 70+ pending AI IP cases, $1.5B Anthropic settlement, Disney/Universal suing Midjourney, $3.1B Concord Music claim. NPE filings grew 15-20% in 2025. ITC complaints rose 56% YoY. This is one of the few litigation sectors with a strong, evidence-based demand growth story.',
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
        focusEffect: 'Monitoring and advisory are tightly linked — you can\'t flag what matters without knowing the client\'s operations, and you can\'t advise without knowing the regulatory landscape. AI handles monitoring and standard checklists; you concentrate on the novel questions where both kinds of knowledge intersect.',
        demandElasticity: 'U.S. agencies publish 3,000-4,000 final rules per year. GDPR fines have exceeded EUR 4.2B cumulatively. The EU AI Act, SEC climate rules, and state AI governance laws are all creating new compliance demand. Cheaper services could bring SMEs into the market.',
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

  'federal-agency': {
    id: 'federal-agency',
    name: 'Federal Agency Counsel',
    category: 'Regulatory & Compliance',
    firmType: 'Government',
    references: [
      { title: 'Federal Lawyer Exodus Reshapes U.S. Legal Workforce', url: 'https://www.jdjournal.com/2026/01/29/federal-lawyer-exodus-reshapes-u-s-legal-workforce/', source: 'JD Journal' },
      { title: 'DOJ Ramps Up AI for Legal Work, Crime Predictions, Surveillance', url: 'https://fedscoop.com/justice-department-artificial-intelligence-ai-surveillance-inventory-predictive-technology-algorithm-bias/', source: 'FedScoop' },
      { title: 'SEC Enforcement: 2025 Year in Review', url: 'https://corpgov.law.harvard.edu/2026/01/21/sec-enforcement-2025-year-in-review/', source: 'Harvard Law Forum' },
      { title: 'Securities Enforcement 2025 Year-End Update', url: 'https://www.gibsondunn.com/securities-enforcement-2025-year-end-update/', source: 'Gibson Dunn' },
    ],
    junior: {
      dimensionality: 3,
      focusEffect: 3,
      demandElasticity: 3,
      selfServiceResistance: 4,
      decisionMakerAlignment: 1,
      verdict: 'Political Variable',
      verdictType: 'political',
      descriptions: {
        dimensionality: 'Agency lawyers draft regulations, review enforcement actions, provide advisory opinions, and coordinate with other agencies — varied, complementary tasks.',
        focusEffect: 'AI handles regulatory research and first-draft rulemaking well. The DOJ logged 315 AI use cases in 2025, including Palantir-powered case analysis. Meaningful reallocation to enforcement strategy and policy analysis is possible — but actual deployment lags behind capability due to disrupted federal AI governance infrastructure.',
        demandElasticity: 'Regulatory complexity grows with the economy regardless of political environment. Backlogged agencies (immigration courts, EPA enforcement) have years of deferred work. But demand is politically mediated: the current administration has deliberately reduced enforcement volume (SEC actions down 27% in FY 2025), suppressing effective demand even as underlying regulatory need grows.',
        selfServiceResistance: 'Government holds an absolute monopoly on regulatory authority — no self-service concept applies. But a growing asymmetry matters: regulated entities deploying AI-augmented legal teams now outgun under-resourced agency counsel in enforcement proceedings.',
        decisionMakerAlignment: 'Budgets are set by political appropriation, and the current environment is actively hostile. DOGE-era cuts eliminated 6,500+ federal attorneys in 2025 alone. The CFPB lost 86% of staff; the SEC\'s enforcement division shrank 17%; the DOJ dissolved its Consumer Protection Branch. AI is cited as justification but rarely deployed as replacement — positions are simply eliminated.',
      },
    },
    senior: {
      dimensionality: 4,
      focusEffect: 2,
      demandElasticity: 3,
      selfServiceResistance: 4,
      decisionMakerAlignment: 1,
      verdict: 'Political Variable',
      verdictType: 'political',
      descriptions: {
        dimensionality: 'Senior agency counsel add policy leadership, inter-agency coordination, congressional testimony preparation, and complex enforcement decisions.',
        focusEffect: 'Senior counsel already focus on policy leadership, enforcement strategy, and inter-agency coordination — tasks AI cannot replace. AI primarily benefits the junior team\'s research and drafting throughput, with limited direct impact on senior work.',
        demandElasticity: 'Same structural demand growth, same political suppression. Senior expertise in complex regulatory domains (securities, environmental, antitrust) takes years to build and is being lost faster than it can be replaced.',
        selfServiceResistance: 'Absolute. Government regulatory authority cannot be self-served or outsourced. The monopoly is constitutional and structural, unaffected by AI.',
        decisionMakerAlignment: 'Same hostile dynamics, amplified at the senior level. SES and GS-15 positions are visible targets for workforce reduction. However, senior expertise in complex regulatory domains is harder to replace and may recover faster when political winds shift — if the institutions survive the current cycle.',
      },
    },
  },

  'state-agency': {
    id: 'state-agency',
    name: 'State Agency Counsel',
    category: 'Regulatory & Compliance',
    firmType: 'Government',
    references: [
      { title: '85 Predictions for AI and the Law in 2026', url: 'https://natlawreview.com/article/85-predictions-ai-and-law-2026', source: 'National Law Review' },
      { title: 'Federal Lawyer Exodus Reshapes U.S. Legal Workforce', url: 'https://www.jdjournal.com/2026/01/29/federal-lawyer-exodus-reshapes-u-s-legal-workforce/', source: 'JD Journal' },
    ],
    junior: {
      dimensionality: 3,
      focusEffect: 3,
      demandElasticity: 4,
      selfServiceResistance: 4,
      decisionMakerAlignment: 2,
      verdict: 'Political Variable',
      verdictType: 'political',
      descriptions: {
        dimensionality: 'State agency lawyers draft regulations, review enforcement actions, provide advisory opinions, and handle litigation — similar task breadth to federal counterparts but often with broader jurisdiction per attorney.',
        focusEffect: 'Same AI potential as federal: research, drafting, and regulatory monitoring are all automatable. State offices generally lag federal in AI tool deployment, but face fewer procurement barriers than the disrupted federal infrastructure.',
        demandElasticity: 'State regulatory workload is actively growing. Eleven new state privacy laws took effect in 2025-2026. State AGs are becoming primary AI enforcers as federal enforcement retreats. Colorado, Illinois, and Texas are implementing AI governance frameworks with state AG enforcement authority. A bipartisan task force of state AGs launched in 2025 to coordinate AI policy.',
        selfServiceResistance: 'Same absolute monopoly as federal — government regulatory authority cannot be self-served.',
        decisionMakerAlignment: 'Varies enormously by state and administration. Some states (NY, CA, TX) are actively hiring and expanding AG offices. Others face the same austerity pressures as any government employer. State budgets are set by legislatures and governors, making them less susceptible to DOGE-style executive-branch cuts but still politically determined. This rating is an average of a wide distribution.',
      },
    },
    senior: {
      dimensionality: 4,
      focusEffect: 2,
      demandElasticity: 4,
      selfServiceResistance: 4,
      decisionMakerAlignment: 2,
      verdict: 'Political Variable',
      verdictType: 'political',
      descriptions: {
        dimensionality: 'Senior state counsel add policy leadership, multi-agency coordination, legislative testimony, and complex enforcement strategy. In AG offices, senior attorneys often lead investigations that cross county and state lines.',
        focusEffect: 'Already focused on complex enforcement and policy work. AI primarily benefits the junior team\'s research and drafting throughput.',
        demandElasticity: 'Same growing regulatory workload. Senior state counsel are particularly in demand as states step into the enforcement vacuum left by federal retreat — experienced regulatory lawyers who left federal service are being recruited by state AGs.',
        selfServiceResistance: 'Absolute. State regulatory authority cannot be self-served or outsourced.',
        decisionMakerAlignment: 'Same per-state variance as junior level. Senior positions may have more stability (harder to replace domain expertise) but are still subject to administration changes and budget cycles.',
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
        focusEffect: 'The emotional and technical work are multiplicatively linked — understanding the financial picture shapes how you counsel the client, and knowing the client\'s emotional state shapes what you fight over. AI handles calculations and drafting; you concentrate where human judgment compounds across both dimensions.',
        demandElasticity: 'Divorces happen when marriages fail, not when lawyers get cheaper. Some expansion as cost reductions bring contested matters that currently settle badly.',
        selfServiceResistance: 'Approximately 72% of family law cases involve at least one self-represented party (over 80% in California). But that\'s mostly uncontested matters — for contested custody and high-asset divorce, people want a human advocate.',
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
        dimensionality: 'Family law legal aid blends custody advocacy, domestic violence protection orders, financial analysis, and coordination with social services. Clients have complex intersecting needs requiring cultural competency and trauma-informed practice.',
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
        focusEffect: 'The practice bifurcates. For complex cases (asylum, deportation), understanding the client\'s story and the legal strategy are genuinely O-Ring linked — the focus effect is real. For routine filings (H-1B, green cards), the tasks are low-dimensional and separable. Juniors currently spend 60-70% of time on forms. AI frees you for the complex work where quality compounds.',
        demandElasticity: 'Roughly 67% of immigrants in removal proceedings lack representation (86% of detained immigrants). Immigrants with counsel are 5x more likely to win. Lower costs could meaningfully expand who gets a lawyer.',
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
        dimensionality: 'Researching motions, drafting EEOC position statements, reviewing personnel files, preparing discovery, and drafting handbooks and separation agreements. Each matter blends litigation with counseling.',
        focusEffect: 'Defending termination cases and advising on terminations reinforce each other — moderate O-Ring complementarity. But the tasks are more separable than criminal defense; you could split handbook drafting from litigation without catastrophic quality loss. AI handles position statements and handbooks; the strategic advisory work benefits, but HR platforms are eroding the routine side independently.',
        demandElasticity: 'Proactive counseling (handbook audits, manager training, compliance assessments) is significantly cost-suppressed. Companies skip it because it\'s expensive, not because they don\'t need it.',
        selfServiceResistance: 'HR platforms like Mineral, Rippling, and Gusto already provide AI-assisted handbook generation and compliance alerts. Routine policy work is migrating to platforms. Litigation defense still requires counsel.',
        decisionMakerAlignment: 'The CHRO or GC engages outside counsel reactively (EEOC charge arrives) and selectively for proactive work. Employment defense is necessary but tightly budget-managed — not discretionary, but not strategic either.',
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
      demandElasticity: 4,
      selfServiceResistance: 3,
      decisionMakerAlignment: 4,
      verdict: 'Growth',
      verdictType: 'growth',
      descriptions: {
        dimensionality: 'Screening potential cases at intake, drafting EEOC charges, researching statutes and deadlines, preparing demand letters, and managing smaller individual cases through mediation.',
        focusEffect: 'Screening and litigation are moderately complementary — the person who screens cases develops judgment about which claims are strong. AI handles intake and drafting; you concentrate on case development and negotiation. On contingency, the firm captures the focus effect as profit (more cases at lower cost per case), not as higher individual wages.',
        demandElasticity: 'An estimated 60-90% of workers experiencing discrimination or wage theft never file a formal charge. Workers lose ~$50B/year to wage theft; the DOL recovers ~$300M. Massive unmet need.',
        selfServiceResistance: 'Employees can file EEOC charges pro se (and many do), but outcomes are significantly better with representation. Tools like DoNotPay have tried automating demand letters with mixed results.',
        decisionMakerAlignment: 'Contingency fees (33-40%) mean AI that reduces hours per case doesn\'t reduce revenue — it increases profit margin. The firm decides its own tech investment with no client pushback.',
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
        dimensionality: 'Advising HR on hiring/firing decisions, drafting policies, managing outside counsel for litigation, overseeing workplace investigations, and handling accommodation and leave requests.',
        focusEffect: 'Policy drafting and investigations inform each other, but the tasks are less tightly linked than at firms — you could separate them across a small team without severe quality loss. AI makes the department leaner. The CFO captures the efficiency, not you — in-house is a cost center, so the focus effect translates to fewer headcount, not more valuable individuals.',
        demandElasticity: 'In-house employment work is a cost center — the company doesn\'t want more employment law services, it wants fewer employment law problems. Nearly perfectly inelastic.',
        selfServiceResistance: 'HR platforms like Workday, ADP, and BambooHR embed compliance features. Managers use AI to draft PIPs and termination documentation. Routine consultations are eroding.',
        decisionMakerAlignment: 'The CFO and GC jointly determine headcount. Employment counsel is viewed as operationally necessary but not strategic — vulnerable to headcount cuts when AI improves productivity.',
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
      'federal-agency',
      'state-agency',
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
      'federal-agency',
      'state-agency',
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
