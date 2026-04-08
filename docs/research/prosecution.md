# Prosecution — AI Impact Research

## Current Profile Summary

| | Junior | Senior |
|---|---|---|
| Dimensionality | 4 | 4 |
| Focus Effect | 3 | 2 |
| Demand Elasticity | 2 | 3 |
| Self-Service Resistance | 4 | 4 |
| Decision-Maker Alignment | 3 | 3 |
| Verdict | Political Variable | Political Variable |

**Junior descriptions:**
- Dimensionality: "Case evaluation, grand jury work, plea negotiation, trial preparation, victim coordination, and courtroom advocacy — high-dimensional from the start."
- Focus Effect: "Most offices assign cases end-to-end — the ADA who evaluated the evidence negotiates the plea and tries the case. Tasks are genuinely complementary. AI frees time from research and drafting to concentrate on the linked bundle. But the focus effect translates to clearing backlogs, not necessarily better resourced offices."
- Demand Elasticity: "Criminal caseloads are driven by crime rates, not by legal costs. Making prosecution cheaper doesn't create more cases — though backlogged offices could process more."
- Self-Service Resistance: "The state has a monopoly on prosecution. No self-service concept applies."
- Decision-Maker Alignment: "Prosecution has broad political support. Legislators are more willing to fund prosecutors than defenders. But budget pressure still exists."

**Senior descriptions:**
- Dimensionality: "Senior prosecutors add supervisory authority, policy-setting, complex case management, and inter-agency coordination."
- Focus Effect: "Already focused on high-profile and complex cases. AI doesn't dramatically change senior prosecutor workflow."
- Demand Elasticity: "Same backlog dynamics, but senior prosecutors are less affected by volume changes — they handle the most serious cases."
- Self-Service Resistance: "Absolute. The state prosecutes; no one else can."
- Decision-Maker Alignment: "Elected DAs and politically appointed AGs have complex incentives, but prosecution budgets are generally more politically durable than defense."

## Standard Research Findings

### What do junior/senior attorneys actually do?

**Junior prosecutors (0-4 years):** Junior ADAs handle a genuinely high-dimensional task set from day one: case intake and screening, witness interviews, grand jury presentations, preliminary hearings, motion practice, plea negotiation, trial preparation, victim coordination, and courtroom advocacy. In many offices, cases are assigned end-to-end: the same ADA who evaluates the police report negotiates the plea and tries the case. This is the O-Ring bundle in action — each task genuinely complements the others.

The workload is heavy. King County (WA) prosecutors manage 50+ homicide cases per desk. Prince George's County (MD) handles approximately 30,000 criminal cases annually across the office. A 2024 National Prosecutor Retention Survey of 4,500 prosecutors found 46% cite heavy caseloads as motivation to leave (37% nationally). The staffing crisis mirrors — and in some offices rivals — public defenders: vacancy rates range from 15% in Houston and Los Angeles, to 20% in Detroit, 25% in Alameda County, and 33% in Miami. Starting pay for Wisconsin ADAs is under $57,000 — less than half the average for private-practice new graduates ($140,000).

A growing dimension of the role is digital evidence management. Prosecutors must now process body-camera footage, social media data, cell phone extractions, surveillance video, and digital forensics across dozens of law enforcement agencies. Prince George's County prosecutors receive evidence from over two dozen law enforcement agencies in different formats, with staff spending "entire workdays downloading and uploading evidence across various systems." This evidence management burden is new and growing fast.

**Senior prosecutors (5+ years):** Add supervisory authority over junior ADAs, office-wide policy-setting, complex case management (homicides, organized crime, public corruption), inter-agency coordination with federal prosecutors and law enforcement, and legislative advocacy. Elected DAs and appointed AGs add political dimensions: media relations, electoral positioning, and decisions about what classes of crime to prioritize. The Montgomery County (TX) DA's office exemplifies the senior role's breadth — overseeing AI deployment for search warrant drafting, Snapchat data analysis, jail call transcription, and image age regression for investigations simultaneously.

**Assessment:** The current dimensionality rating of 4 for both junior and senior is well-supported. The junior role is genuinely high-dimensional from day one. The addition of digital evidence management as a new dimension — one that did not exist a decade ago — further justifies the rating.

### What AI tools exist for this sector?

**Digital evidence management (the most mature and widely adopted category):**
- **NiCE Justice (NICE Evidencentral):** AI-powered digital evidence management with automated transcription, translation, object detection, OCR, and evidence connection analysis. Adopted by at least six prosecutor offices including Alameda County DA (CA), Monterey County DA (CA), Prince George's County State's Attorney (MD), Dauphin County DA (PA), McHenry County State's Attorney (IL), and Calcasieu Parish DA (LA). Monterey County is the fourth California office alone to adopt. Announced March 2025 for Prince George's County.
- **Cellebrite:** AI-powered digital forensics for mobile device extraction and analysis. Used broadly by both law enforcement and prosecutors. A 2025 survey of 2,000+ law enforcement professionals found 72% value AI content classification/prioritization, 67% value automated extraction and lead identification. GenAI features became generally available in early 2025, enabling investigators to assemble operational intelligence briefings "in minutes" that previously took weeks.

**Evidence analysis and case preparation:**
- **TimePilot (Tranquility AI):** AI evidence analysis generating investigative leads, building timelines, and surfacing critical connections. Used by Orleans Parish DA (New Orleans), Cassia County Prosecutor (Idaho, via grant), Chester County Sheriff (SC), and at least a dozen other agencies. In a multi-jurisdiction pilot, prosecutors analyzed over 1.4 million files, with jail call review compressed from days/weeks to minutes. The company claims equivalence to "10 investigators earning $60,000/year" and prosecution timelines compressed from "30 days to three" for plea negotiations. Partnered with Karpel Solutions (case management) in February 2026.
- **Truleo Analyst:** Automated body-camera reports and witness canvassing at $200/month per user. Adopted by hundreds of police departments since June 2025 launch.
- **Allometric AirJustice:** Piloted by seven jurisdictions including one public defender's office.

**Investigation and surveillance tools feeding prosecution:**
- **Axon Draft One:** AI-generated police reports from body-camera audio. Axon's fastest-growing product. Reduces report writing from 45 minutes to ~13 (nearly 70% reduction). Over 100,000 reports generated. Utah SB 180 and California SB 524 now require AI-report disclosure and draft retention. King County (WA) prosecutors announced they would not accept AI-drafted reports, citing reliability concerns.
- **Voyager Labs:** AI-driven social media and open-source intelligence analysis. NYPD signed a nearly $9 million deal. Used for fraud, narcotics, human trafficking, and gang investigations. Meta sued over 38,000+ fake accounts used to scrape data from 600,000+ Facebook users.
- **Clearview AI:** Facial recognition with 50+ billion image database. ICE signed $9.2M contract (2025); CBP signed $225K contract (2026). Settlement of $51.75M for BIPA violations. Recently launched JusticeClearview for public defenders — notably, the prosecution-side tool existed years before the defense-side equivalent.
- **ShotSpotter/SoundThinking:** Acoustic gunshot detection. Massachusetts SJC backed Daubert hearings on the technology (May 2025). NYC audit found 82% of alerts could not be confirmed as gunfire.

**General-purpose AI tools:**
- **Montgomery County (TX) DA:** Uses AI for preliminary pleadings, charge language drafting, arrest report summarization, search warrant refinement, Snapchat data analysis, email sentiment analysis, image age regression, and jail call transcription — one of the most comprehensive documented deployments.
- **Los Angeles County DA:** Developed a custom AI system for formatting and extracting information from reports — replacing the work of approximately 50 administrative positions at $4,000/month.

**Institutional support:**
- The **Prosecutors' Center for Excellence (PCE)** published "Integrating AI: Guidance and Policies for Prosecutors" in January 2025, and co-hosted a 2-day AI integration event with Microsoft in June 2025.
- The **NDAA** maintains a curated "Tech and AI in Prosecution" resource list, hosts CLE webinars on AI, and partnered with Axon on prosecutor-specific guidance. The 2026 Annual Conference features AI-assisted casework prominently.

**Assessment:** Prosecutor AI adoption is broader and more specific than the current profile suggests. Evidence management platforms (NiCE Justice), evidence analysis tools (TimePilot), and investigation tools (Cellebrite, Voyager Labs) are deployed across named offices with measurable results. The institutional infrastructure (PCE, NDAA, Microsoft partnerships) suggests accelerating adoption. However, a key observation from industry commentary: some AI companies are "philosophically averse to using their work to aid law enforcement," creating supply-side friction that does not exist for civil legal AI tools.

### What are clients/counterparties doing with AI?

Prosecution's "counterparties" are defense attorneys (both private and public defenders) and, upstream, law enforcement agencies that feed cases.

**Defense-side AI adoption (prosecution's opposing counsel):**
- Public defender AI adoption is growing but uneven. JusticeText serves ~65 offices; Miami-Dade deployed 100 CoCounsel seats. But a 2025 study found 71% of public defenders have not used AI professionally. Private criminal defense firms are adopting general legal AI tools (CoCounsel, Lexis+ AI) faster than PD offices.
- The defense bar is developing new challenges to AI-generated evidence — Daubert motions against ShotSpotter, Brady challenges for facial recognition non-disclosure, Sixth Amendment confrontation clause arguments against algorithmic "witnesses."

**Law enforcement (upstream evidence providers):**
- Police departments are rapidly adopting AI tools that generate evidence prosecutors must rely on and disclose: Axon Draft One reports, facial recognition identifications, ShotSpotter alerts, predictive policing outputs, automated license plate reader data.
- This creates a two-sided problem for prosecutors: AI-generated evidence may help build cases faster, but it also creates new disclosure obligations and reliability challenges (discussed below in sector-specific findings).

**Assessment:** Unlike most legal sectors where the counterparty dynamic is straightforward, prosecution sits in a uniquely complex position. Law enforcement AI creates both opportunities (faster case building) and liabilities (disclosure obligations, reliability challenges). Defense-side AI adoption creates better-prepared adversaries who can mount more sophisticated challenges. The net effect on prosecutor workload is ambiguous — AI may accelerate case preparation while simultaneously increasing the complexity of litigating evidence reliability.

### Industry commentary on AI impact

- **PCE (January 2025):** "Every prosecutor office is facing questions about rapidly emerging generative AI technology and how to use it appropriately. AI is being integrated into applications and programs used by prosecutors and law enforcement at a rapid rate." The guide emphasizes confidentiality, security, and the need for prosecutors to maintain decision-making authority.
- **NDAA ethics guidance:** "Important decisions should be made by prosecutors themselves, not artificial assistants, in order to ensure accurate, efficient, and ethical decision-making." ABA Rules 1.1 (competence — including technological competence), 1.3 (diligence), and 3.3 (candor toward the tribunal) all apply.
- **Andrew Guthrie Ferguson (Northwestern Law Review, 2025):** AI "shifts primary responsibility from a democratically-authorized and licensed lawyer to an undemocratic and unlicensed algorithm." This cuts both ways — against prosecution reliance on AI evidence and against AI decision-making in charging.
- **Tom Bowman (Center for Democracy & Technology):** "You're creating risks that the AI is going to omit context, mislabel events, even overlook exculpatory evidence."
- **Jumana Musa (NACDL):** Outsourcing case development "to somebody's black box AI tool" threatens fundamental protections when "life and liberty" are at stake.
- **Staffing crisis context:** The HIRRE Prosecutors Act of 2025 (bipartisan, Senators Coons and Murkowski) aims to address the nationwide prosecutor recruitment and retention crisis. 70% of prosecutors surveyed are considering leaving. Throughout the federal government, more than 9,000 attorneys left in 2025 alone. This staffing crisis makes AI adoption both more urgent and more politically supportable.

## Sector-Specific Findings

### Is Decision-Maker Alignment really a 3? Is the political picture more complex?

**A rating of 3 is defensible but should be understood as an average of volatile extremes, not a stable middle ground.**

On the positive side, prosecution enjoys substantially stronger political support than defense:
- **NYC Mayor Adams raised DA budgets to $633 million (23% increase)** in August 2025, including $17M+ in new investments for additional ADAs, cybercrime units, and forensic analysis.
- **California allocates $1 billion+ to prosecution vs. $150 million to indigent defense** over a six-year period (2019-2025). At the county level, prosecution receives ~$2.2 billion vs. ~$1.2 billion for defense annually.
- The bipartisan HIRRE Prosecutors Act of 2025 demonstrates that prosecutor staffing is a politically salable issue across party lines.
- Prosecution budgets are "generally more politically durable than defense" — the current description is correct on this point.

On the volatile side:
- **Progressive DA recalls and defeats** (Boudin in SF 2022, Gascón and Price in 2024) show that individual prosecutors face intense political pressure. All 14 Alameda County law enforcement associations endorsed the Price recall; police/prison guard associations gave $2M+ to support Hochman over Gascón.
- **But progressive prosecutors also won in 2025:** Krasner won a third term in Philadelphia by 50 points. The political environment is genuinely volatile, not one-directional.
- The 33% vacancy rate in Miami and 15-25% rates elsewhere demonstrate that even with political support, actual budgets often fail to match rhetoric.
- **Federal prosecution faces unique turbulence:** The U.S. Attorney's Office in DC reported a deficit of ~90 prosecutors, and 9,000+ federal attorneys left in 2025 — driven by administration changes, not AI.

**Assessment:** The rating of 3 is correct. Prosecution has more political support than defense (which gets a 1), but significantly less stability than sectors where market forces rather than political will determine budgets. The key nuance the descriptions should capture: prosecution budgets are politically durable in the aggregate but volatile for individual elected DAs, and the staffing crisis persists despite political goodwill because budgets have not kept pace with private-sector competition.

### Does AI change the prosecution-defense asymmetry? What are the constitutional implications?

**Yes, and the implications are substantial and being actively litigated.**

The asymmetry operates on multiple fronts:

1. **Evidence generation asymmetry:** Law enforcement AI (Axon Draft One, facial recognition, ShotSpotter, predictive policing, Cellebrite) generates evidence that prosecutors use and defenders must challenge. The AI-in-law-enforcement market is $3.5B+ and growing. Public defender AI investment is orders of magnitude smaller. Clearview AI existed for prosecution for years before launching JusticeClearview for defenders.

2. **New disclosure obligations for prosecutors:** Courts are requiring prosecutors to disclose AI use:
   - **Maryland appellate court (2025):** Reversed a conviction because the State's late disclosure of facial recognition use deprived the defendant of meaningful opportunity to challenge the AI identification.
   - **New Jersey v. Arteaga (2023):** Defendants must be notified of police use of facial recognition.
   - **Policing Project model statute:** Requires police to disclose AI use in reports so prosecutors can meet Brady obligations.
   - **Proposed Federal Rule of Evidence 707 (June 2025):** Would require machine-generated evidence to satisfy Daubert/Rule 702 reliability standards even without expert testimony. Public comment period open through Feb. 2026. Critics warn this "could create an uneven playing field for under-resourced litigants."

3. **Sixth Amendment confrontation clause challenges:** When the key "witness" is an algorithm, whom does the defendant confront? Courts are grappling with whether AI outputs are "testimonial" under Crawford v. Washington. As Ferguson notes, "even with audits, defendants cannot probe the reasoning behind a specific output."

**Assessment:** This is a genuine and growing legal issue that the current profile does not address at all. For prosecutors specifically, AI creates a dual burden: it provides tools that accelerate case preparation, but it also creates new Brady disclosure obligations, Daubert challenges, and confrontation clause litigation. This adds complexity to the prosecutor role — a factor relevant to dimensionality and focus effect descriptions.

### Is demand elasticity really only 2? Could AI let prosecutors pursue cases they currently decline?

**The current rating of 2 for junior demand elasticity understates the potential. A rating of 3 is warranted.**

The current profile says "making prosecution cheaper doesn't create more cases." This is only half right. The crime-to-conviction funnel reveals enormous attrition:
- Out of 1,000 robberies: 167 arrests, 37 referred to prosecutors, 22 felony convictions.
- Out of 1,000 rapes: 57 arrests, 11 referred to prosecutors, 7 felony convictions.
- Out of 1,000 assaults: 255 arrests, 105 referred to prosecutors, 41 felony convictions.
- National homicide clearance rate: 61% (2024), down from 72% in 1980.
- 16-50% of federal cases are declined for prosecution.

AI cannot change crime rates, but it can change the prosecution rate:
- **Evidence analysis acceleration:** TimePilot claims to compress prosecution timelines from "30 days to three" and clear 50 backlogged cases annually per office. If real, this directly converts declined or backlogged cases into filed cases.
- **Digital forensics speed:** Cellebrite's AI reduces case assembly from weeks to minutes for digital evidence. When evidence extraction is faster, more cases become viable within resource constraints.
- **Report and disclosure automation:** If AI cuts research and drafting time (Montgomery County TX uses AI for pleadings, warrants, and charge language), prosecutors can handle more cases with the same staff.

The constraint is that caseload increases require corresponding defense resources (a constitutional obligation) and court capacity (judicial bottleneck). So AI-enabled prosecution efficiency is necessary but not sufficient for increased case throughput.

**Assessment:** Junior demand elasticity should be raised from 2 to 3. Unlike the current profile's framing, making prosecution more efficient does not merely clear existing backlogs — it can enable prosecution of cases that are currently declined due to resource constraints. The senior rating of 3 is already appropriate, as senior prosecutors handle cases that are resource-intensive but rarely declined for purely resource reasons.

### What new AI-related obligations are prosecutors facing?

**AI is adding genuine new work for prosecutors, not just accelerating existing work.**

1. **Brady disclosure of AI evidence:** Prosecutors must now disclose when AI tools were used in investigations — facial recognition, AI-drafted police reports, ShotSpotter alerts, predictive policing outputs. The Maryland appellate reversal demonstrates that failure to disclose AI use can result in overturned convictions. This is a new, ongoing obligation that did not exist five years ago.

2. **Daubert/reliability challenges:** Proposed FRE 707 would require prosecutors to demonstrate that AI-generated evidence satisfies Rule 702 reliability standards. This means prosecutors may need expert witnesses to authenticate AI outputs — ShotSpotter accuracy, facial recognition methodology, Axon Draft One report integrity. This is expensive and time-consuming.

3. **AI-drafted police report scrutiny:** When officers use Axon Draft One, prosecutors must evaluate whether the AI accurately captured events. The EFF documented that Draft One erases initial drafts after export, eliminating evidence of AI vs. officer contributions. California SB 524 requires agencies to retain first drafts. Prosecutors must navigate this evidentiary minefield.

4. **Deepfake and AI-generated evidence authentication:** As AI makes it easier to fabricate evidence, prosecutors face both the risk that their own evidence is challenged as AI-fabricated and the need to authenticate genuine evidence against deepfake accusations. A Washington state court rejected AI-"enhanced" video evidence in March 2024 due to non-reproducibility.

5. **Ethical obligations around AI decision-making:** ABA Rules require technological competence (1.1), and prosecutors have heightened obligations as "ministers of justice" (ABA Model Rule 3.8). Using AI for charging decisions, plea recommendations, or sentencing arguments raises questions about whether the prosecutor has exercised independent professional judgment.

**Assessment:** This new-obligations dimension is absent from the current profile. It adds work — and therefore adds to dimensionality — for both junior and senior prosecutors. It also affects the focus effect: AI simultaneously frees time (through evidence analysis) and consumes time (through disclosure, authentication, and reliability litigation). The net effect on prosecutor time is more ambiguous than the current profile suggests.

## Recommended Changes

### Ratings

| | Junior Current | Junior Proposed | Senior Current | Senior Proposed |
|---|---|---|---|---|
| Dimensionality | 4 | **4** (no change) | 4 | **4** (no change) |
| Focus Effect | 3 | **3** (no change) | 2 | **2** (no change) |
| Demand Elasticity | 2 | **3** (change) | 3 | **3** (no change) |
| Self-Service Resistance | 4 | **4** (no change) | 4 | **4** (no change) |
| Decision-Maker Alignment | 3 | **3** (no change) | 3 | **3** (no change) |

**One rating change recommended:**

- **Junior Demand Elasticity: 2 → 3.** The current profile's premise — "making prosecution cheaper doesn't create more cases" — is incomplete. The crime-to-conviction funnel shows massive attrition: only 22 of every 1,000 robberies result in felony convictions; only 7 of 1,000 rapes do. AI-powered evidence analysis (TimePilot compressing prosecution timelines from 30 days to 3) and digital forensics (Cellebrite reducing case assembly from weeks to minutes) could enable prosecution of cases currently declined due to resource constraints. The backlog is real and measurable — Miami has 33% prosecutor vacancy, LA has 15% — and AI efficiency gains directly affect the volume of cases that can be filed.

### Description Updates

**Junior Dimensionality** — Add the new AI-evidence obligations dimension:
> "Case evaluation, grand jury work, plea negotiation, trial preparation, victim coordination, courtroom advocacy — and increasingly, navigating AI-generated evidence. Prosecutors must now evaluate AI-drafted police reports (Axon Draft One), disclose facial recognition use under Brady, and defend AI evidence reliability under Daubert. A Maryland appellate court reversed a conviction in 2025 for late disclosure of facial recognition use. These AI-related obligations are new and growing."

**Junior Focus Effect** — Sharpen with specific tools and the dual-edged nature of AI:
> "Most offices assign cases end-to-end, and AI tools are accelerating the linked bundle: TimePilot compresses case timelines from 30 days to 3; NiCE Justice replaces daylong evidence downloads with automated ingestion from 20+ law enforcement agencies. But AI simultaneously adds work — disclosure of AI police reports, authentication of digital evidence, Daubert challenges to tools like ShotSpotter. The net time savings flow to clearing backlogs, not to better-resourced offices: Miami has 33% prosecutor vacancy despite political support."

**Junior Demand Elasticity** — Rewrite to reflect the prosecution funnel:
> "Only 22 of every 1,000 robberies result in felony convictions; only 7 of 1,000 rapes do. Most attrition happens between arrest and charges — exactly where AI evidence analysis can help. TimePilot claims to clear 50 backlogged cases annually; Cellebrite cuts digital forensic assembly from weeks to minutes. AI can't change crime rates, but it can change prosecution rates for cases currently declined due to resource constraints."

**Junior Decision-Maker Alignment** — Ground in documented budget data and political volatility:
> "NYC raised DA budgets to $633M (23% increase); California spends $2.2B on prosecution vs. $1.2B on defense annually. Prosecution enjoys broader political support than defense — the bipartisan HIRRE Act targets prosecutor retention specifically. But 70% of prosecutors surveyed are considering leaving, and starting ADA pay ($57K in Wisconsin) is less than half private-sector entry. Political support exists in the aggregate but fails to translate into competitive compensation at the office level."

**Senior Focus Effect** — Retain the current assessment but add AI-obligation nuance:
> "Senior prosecutors focus on complex, high-profile cases where AI has modest direct impact on workflow. But they bear responsibility for office-wide AI policy: which tools to adopt, how to comply with emerging disclosure requirements, and how to train junior ADAs on AI evidence authentication. PCE and Microsoft co-hosted a 2-day AI policy integration event for prosecutors in June 2025 — the audience was senior leadership."

**Senior Demand Elasticity** — Keep current framing:
> "Same dynamics, but senior prosecutors handle the most serious cases — homicides, organized crime, public corruption — which are rarely declined for resource reasons alone. AI's volume effects are concentrated at the junior level."

**Senior Decision-Maker Alignment** — Add the recall/election volatility:
> "Elected DAs face intense political volatility — Gascón and Price lost in 2024, but Krasner won a third term by 50 points in 2025. Prosecution budgets are politically durable in the aggregate but individual DAs are subject to recall and defeat. The staffing crisis (15-33% vacancy rates) persists despite political goodwill because government pay cannot match private-sector competition."

## References

1. [Integrating AI: Guidance and Policies for Prosecutors](https://pceinc.org/wp-content/uploads/2025/01/20250125-Integrating-AI-A-Guide-for-Prosecutors.pdf) — Prosecutors' Center for Excellence, January 2025. Comprehensive guidance for prosecutor offices on AI adoption, covering confidentiality, security, disclosure obligations, and policy development.
2. [AI Police Reports: Year in Review](https://www.eff.org/deeplinks/2025/12/ai-police-reports-year-review) — Electronic Frontier Foundation, December 2025. Documents Axon Draft One adoption, transparency concerns (erasure of initial drafts), and state regulatory responses (Utah SB 180, California SB 524).
3. [Law enforcement is using AI to synthesize evidence. Is the justice system ready for it?](https://therecord.media/law-enforcement-ai-platforms-synthesize-evidence-criminal-cases) — The Record (Recorded Future News). Detailed reporting on TimePilot, Truleo, and Allometric deployments across prosecutor offices, including efficiency claims and constitutional concerns raised by CDT and NACDL.
4. [No Rest for the Prosecution](https://wabarnews.org/2025/02/11/no-rest-for-the-prosecution/) — Washington State Bar News, February 2025. Documents prosecutor staffing crisis: 15-33% vacancy rates, 70% considering leaving, King County managing 50+ homicide cases per desk, and salary disparities.
5. [Unequal Scales: California's Investment Disparity Between Prosecution and Public Defense](https://www.ospd.ca.gov/wp-content/uploads/2025/05/Unequal-Scales_Californias-Investment-Disparity-between-Prosecution-and-Public-Defense.pdf) — California Office of the State Public Defender, May 2025. Documents $1B+ prosecution investment vs. $150M for defense, and ~$860M annual county-level prosecution advantage.
6. [An AI Primer for Prosecutors on Its Peril and Potential](https://www.tdcaa.com/journal/an-ai-primer-for-prosecutors-on-its-peril-and-potential/) — Texas District & County Attorneys Association. Detailed account of Montgomery County DA's AI deployment (pleadings, warrants, Snapchat analysis, jail calls) and LA County's AI system replacing 50 administrative positions.
7. [Proposed Federal Rule of Evidence 707](https://www.rumberger.com/insights/new-ai-rule-old-standard-proposed-federal-rule-of-evidence-707-aims-to-apply-daubert-standard-to-ai-generated-evidence/) — RumbergerKirk analysis. New rule approved June 2025 applying Daubert reliability standards to machine-generated evidence; public comment through February 2026.
8. [Failing to disclose use of facial recognition technology deprives defendants of a fair trial](https://www.publicjustice.org/en/news/failing-to-disclose-use-of-facial-recognition-technology-in-criminal-cases-deprives-defendants-of-a-fair-trial-appellate-court-of-maryland-rules/) — Public Justice. Maryland appellate court reversed conviction over late disclosure of facial recognition, establishing precedent for AI-evidence Brady obligations.
