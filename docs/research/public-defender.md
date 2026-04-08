# Public Defender — AI Impact Research

## Current Profile Summary

| | Junior | Senior |
|---|---|---|
| Dimensionality | 4 | 4 |
| Focus Effect | 4 | 3 |
| Demand Elasticity | 4 | 4 |
| Self-Service Resistance | 4 | 4 |
| Decision-Maker Alignment | 1 | 1 |
| Verdict | Political Variable | Political Variable |

**Junior descriptions:**
- Dimensionality: "Investigation, legal research, motion practice, plea negotiation, client counseling with vulnerable populations, jury selection, trial advocacy — all from day one."
- Focus Effect: "The task complementarity is identical to private defense — but the 400-700+ caseloads (vs. ABA-recommended 150) mean defenders can't actually do the full O-Ring bundle. AI could let them concentrate on each case the way the model predicts. But the focus effect gets captured by the political system: legislators use AI to justify flat budgets, not better representation."
- Demand Elasticity: "The unmet demand for adequate public defense is essentially infinite. AI could let each defender provide dramatically better representation."
- Self-Service Resistance: "Constitutional right to counsel. Clients cannot afford private counsel — that's why they're in the system. Zero self-service path."
- Decision-Maker Alignment: "State legislators and county commissioners are often hostile to public defense funding. AI provides political cover for budget cuts that were ideologically motivated before AI existed."

**Senior descriptions:**
- Dimensionality: "Senior public defenders add supervisory, training, appellate, and policy advocacy responsibilities to an already complex role."
- Focus Effect: "Already somewhat focused through experience, but still personally handling heavy caseloads. AI frees real time."
- Demand Elasticity: "Latent demand remains infinite at every level. Quality of representation could improve dramatically with AI assistance."
- Self-Service Resistance: "No change from junior — constitutional mandate and vulnerable population make self-service impossible."
- Decision-Maker Alignment: "Same political dynamics. Senior defenders may have more political capital to resist cuts, but funding remains legislatively determined."

## Standard Research Findings

### What do junior/senior attorneys actually do?

**Junior public defenders (0-4 years):** From day one, junior PDs handle an extraordinarily wide task set: client intake and counseling (often with vulnerable, incarcerated populations), investigation coordination, legal research, motion drafting, plea negotiation, preliminary hearings, bail arguments, jury selection, and trial advocacy. Unlike private-sector juniors who ramp gradually, PD juniors are in court immediately, often handling arraignments within weeks of starting. The breadth is genuine — but the depth per case is constrained by volume.

The caseload reality is severe. The 2023 RAND National Public Defense Workload Study found that adequate representation of a single felony requires an average of 35 hours — meaning a full-time attorney can properly handle roughly 59 felonies per year. Felony murder cases require 248 hours on average. Yet defenders routinely carry 150+ felonies under the outdated 1973 NAC standards, and actual caseloads far exceed even those: Utah defenders handle up to 525 misdemeanor cases; some Louisiana offices report ~1,000 clients per attorney. San Francisco saw active cases rise 47% between 2019 and 2025 (5,039 to 7,421), with felonies up 40% and misdemeanors up 56%.

A massive and growing component of the workload is digital evidence review. Cook County, Illinois receives 60,000 hours of body-camera footage annually. A Virginia survey found 93% of public defenders reported audiovisual discovery demands were overwhelming. This evidence review burden is new (driven by body-camera mandates) and is precisely where AI tools have the most immediate impact.

**Senior public defenders (5+ years):** Add supervisory responsibilities, training of junior attorneys, appellate work, policy advocacy, and complex trial practice. Many senior defenders also carry personal caseloads, though typically focused on more serious charges (homicides, sexual assaults, complex multi-defendant cases). Senior PDs manage relationships with courts, negotiate systemic issues with prosecutors, and often serve as de facto office leaders. In many offices, senior defenders are also responsible for technology adoption decisions and office-wide workflow design.

**Assessment:** The current dimensionality rating of 4 for both junior and senior is well-supported. The junior role is genuinely high-dimensional from day one — more so than most private litigation roles, where associates ramp gradually. The constraint is that crushing caseloads prevent defenders from executing the full O-Ring bundle on any single case.

### What AI tools exist for this sector?

**Evidence review and transcription (the most mature category):**
- **JusticeText:** AI-powered body-camera and audio evidence transcription and analysis. Used by ~65 public defender offices including statewide systems in Massachusetts and Kentucky, plus Harris County (TX), the Public Defender Service for DC, Santa Cruz County (CA), and Stanislaus County (CA). Automatically flags key moments (Miranda warnings, arrest, request for lawyer). As of December 2025, expanding beyond body cameras to multimodal evidence review.
- **Reduct.Video:** AI transcription with human-in-the-loop option for high-accuracy work. Deployed by the Colorado State Public Defender for body-cam and interrogation footage.
- **Relativity (Justice for Change program):** E-discovery platform for managing text, email, chat, and multimedia evidence. Used by the San Francisco Public Defender's Office.

**Legal research and case preparation:**
- **CoCounsel (Thomson Reuters/Casetext):** The Miami-Dade Public Defender's Office deployed 100 CoCounsel seats in early 2024, becoming the first PD office to adopt AI for research and case prep at scale. Internal tracking showed research time per motion dropped from 5 hours to 1. The office won Thomson Reuters' public-sector Legal Innovator of the Year Award in November 2025.
- **Bearister AI:** Legal research, document analysis, motion drafting for criminal defense.
- **MateyAI:** AI for criminal defense e-discovery organization and analysis.

**Case management and analytics:**
- **LegalServer AI Suite:** Case management with document automation, OCR scanning, and legal analytics across multiple PD offices.
- **SentencingStats:** Federal sentencing data analysis for mitigation advocacy, used by federal defenders.

**General tools:** Lexis+ AI and Westlaw Edge for legal research, though premium pricing limits access. A 2025 arxiv study found 71% of public defenders surveyed had not used AI professionally, with cost, office policies, confidentiality concerns, and output quality as the four primary barriers.

**Assessment:** Real AI deployments exist and are growing — this is not theoretical. But adoption is uneven and constrained by funding. The contrast with law enforcement is stark: Axon's Draft One (AI police report writing) has produced over 100,000 incident reports across departments nationwide, while the AI in law enforcement market is projected to grow from $3.5B (2024) to $6.6B (2033). Public defender AI investment is orders of magnitude smaller.

### What are clients/counterparties doing with AI?

This is where the prosecution-defense asymmetry becomes critical. Public defenders' "counterparties" are prosecutors and law enforcement, who are investing heavily in AI:

**Police AI tools (creating new evidence defenders must analyze):**
- **Axon Draft One:** AI-generated police reports from body-camera transcripts. Over 100,000 reports generated. Reduces report writing from 45 minutes to 10. Defense attorneys must now scrutinize AI-drafted reports for accuracy — a new burden. Utah and California have passed laws requiring AI-report disclosure.
- **Facial recognition:** Despite documented error rates (Black individuals account for at least 8 of 10 wrongful arrests from faulty matches; darker-skinned individuals face 40x higher error rates), facial recognition remains in widespread use. At least 8 Americans have been wrongfully arrested based on misidentifications.
- **ShotSpotter/SoundThinking:** Acoustic gunshot detection used as evidence. NYC's 2024 audit found 82% of alerts could not be confirmed as gunfire. Massachusetts's Supreme Judicial Court backed Daubert hearings on the technology's reliability. A SoundThinking manager admitted analysts manually modify data, making adjustments subjective.
- **Predictive policing:** Place-based hotspot models and person-based risk tools, creating asymmetric surveillance where "exposure to policing, rather than actual conduct, becomes the basis for algorithmic judgment."
- **Automated license plate recognition:** Collecting "billions of records annually" per DOJ reporting.

**Prosecutor AI tools:**
- **NiCE Justice:** Cloud-based digital evidence management with automated transcription and analytics. Adopted by Alameda County DA.
- **TimePilot:** AI evidence analysis generating investigative leads. Used by prosecutors including in rural Cassia County, Idaho (via grant funding).
- Los Angeles County DA developed a custom AI system for formatting and extracting information from reports.

**The asymmetry in numbers:** The AI in law enforcement market alone is $3.5B and growing at double-digit rates. Public defender offices typically cannot purchase software without county approval — a slow, uncertain process. One defender in the arxiv study noted: "I don't have a Westlaw subscription just because I can't afford it."

**Assessment:** The counterparty picture is materially different from most legal sectors. In insurance defense, the client (carrier) is deploying AI against the firm. In public defense, the opposing side (police/prosecutors) is deploying AI that creates both new evidence to analyze AND new reliability challenges to litigate. This adds work rather than reducing it — deepening the resource asymmetry.

### Industry commentary on AI impact

- **Legal aid organizations adopt AI at 2x the rate of other lawyers** (74% vs. 37%), per a 2025 Everlaw/NLADA survey of 112 professionals. 88% believe AI can help address the access-to-justice gap. 90% said AI at full potential could enable serving more clients.
- **UC Berkeley Criminal Law & Justice Center** maintains a dedicated "AI for Public Defenders" research initiative cataloging tools and deployment patterns.
- **Stanford Justice Innovation Lab** runs an AI & Access to Justice Initiative, including the Legal Help Commons — shared infrastructure so legal aid organizations can adopt proven AI workflows rather than building from scratch.
- **ABA 2023 RAND Study** establishes that the caseload crisis is a constitutional crisis: only 21% of state-based and 27% of county-based PD offices have enough attorneys to meet workload standards.
- **Washington State Supreme Court (June 2025):** Unanimously slashed caseload limits from 150 felonies to 47 and 400 misdemeanors to 120, with a 10-year phase-in. The Washington Association of Counties said the new standards are "unattainable with the level of funding now available."
- **Turnover crisis compounds everything:** Kentucky's DPA saw 24% attorney turnover in 2025 (up from 17% in 2022). Minnesota lost nearly 40% of defenders between 2017-2021. Maryland is understaffed by ~925 attorneys. Applications for PD positions have dropped 50-75% in many jurisdictions.

## Sector-Specific Findings

### Is the "Political Variable" verdict accurate? Is there evidence of legislators using AI to justify PD budget cuts?

**The "Political Variable" verdict is correct, but the specific mechanism described needs updating.**

The current description states legislators "use AI to justify flat budgets, not better representation" and that AI provides "political cover for budget cuts that were ideologically motivated before AI existed." This is directionally right but currently **speculative rather than evidence-based**. My research found:

- **No documented cases** of legislators explicitly citing AI as justification for public defender budget cuts. The budget cuts that are happening (Idaho cutting PD funding for FY2027, Indianapolis reducing the PD Agency budget by $81K for 2026, federal defender workforce cuts of 9%+) are driven by general fiscal austerity and political hostility to criminal defense, not by AI-specific arguments.
- **The real political dynamic is subtler:** legislators are not investing in AI *for* defender offices while simultaneously cutting budgets. The asymmetry is that law enforcement gets AI investment (Axon, facial recognition, predictive policing) through police budgets, while defender offices must fight for basic staffing. The San Francisco PD office budget ($54.6M) is 60% of the DA's budget ($84.1M) despite representing 75-80% of people charged.
- **Counter-examples exist:** Some AI funding is flowing *to* defender offices. Kentucky DPA adopted JusticeText statewide. Miami-Dade invested in 100 CoCounsel seats. The Legal Services Corporation and philanthropic organizations (Arnold Ventures, which funded the RAND study) are directing resources toward defender technology.
- **The Washington state example is instructive:** The Supreme Court mandated dramatically lower caseloads, but counties say they cannot fund compliance. Whether AI is part of the compliance strategy or an excuse to delay hiring remains to be seen — this is genuinely politically variable.

**Assessment:** The Decision-Maker Alignment rating of 1 is justified — the political environment is hostile to adequate funding regardless of AI. But the descriptions should be rewritten to distinguish between documented dynamics (chronic underfunding, prosecution/defense budget asymmetry) and speculative ones (AI as explicit justification for cuts). The real risk is not that legislators will cut budgets *because of* AI, but that they will fail to invest in AI *for* defenders while the prosecution side pulls further ahead.

### How real is the caseload crisis? Is the 400-700+ figure current and well-sourced?

**The crisis is real and worse than the current profile suggests. The "400-700+" figure understates the problem.**

The 2023 RAND study establishes that adequate representation requires far more time per case than previously understood:
- A felony requires 35 hours on average (meaning max ~59 cases/year for full caseload)
- A misdemeanor requires 22.3 hours
- A felony murder requires 248 hours

Against these standards, the reality is dire:
- The old NAC standard of 150 felonies/400 misdemeanors was already considered excessive
- Utah defenders carry up to 525 misdemeanor cases
- Some Louisiana offices report ~1,000 clients per attorney
- San Francisco arraignments rose 57% from 2021-2024 (5,002 to 7,841)
- Only 21% of state-based PD offices have enough attorneys for current caseloads

Washington state's new standards (47 felonies, 120 misdemeanors) represent the most evidence-based attempt at reform — and counties say they are unattainable with current funding.

**Assessment:** The "400-700+" figure in the focus effect description should be updated. The RAND study provides much more precise and authoritative data. The description should reference the RAND 59-felony standard vs. actual caseloads of 150+ felonies, which more powerfully illustrates the gap.

### Is prosecution-side AI creating a new asymmetry?

**Yes, and it operates on three distinct fronts:**

1. **AI-generated evidence that defenders must analyze and challenge:** Axon Draft One police reports, facial recognition identifications, ShotSpotter alerts, probabilistic DNA genotyping. Each of these creates new work for defenders: reviewing AI outputs for accuracy, challenging reliability in court, understanding technical systems well enough to cross-examine. Defenders are not getting equivalent tools to analyze this evidence — though JusticeText is a notable exception for body-cam footage.

2. **AI-assisted prosecution preparation:** Prosecutors are getting tools like NiCE Justice and TimePilot that help them organize and analyze evidence faster. When prosecutors can process evidence more efficiently, defenders face better-prepared opponents while their own caseloads remain crushing.

3. **AI-powered surveillance that generates more cases:** Predictive policing, automated license plate readers, and other AI surveillance tools can increase arrest and charging rates — feeding more cases into a system where defenders are already overwhelmed. New York City's ShotSpotter deployment generated 940 alerts in a single month (June 2023), of which 82% could not be confirmed as gunfire — but each alert can trigger police responses that generate cases.

**Assessment:** The current profile does not mention the prosecution-side AI asymmetry at all. This is a significant gap. The asymmetry doesn't change the ratings (they're already at the right levels), but it should be reflected in the descriptions — particularly in the focus effect and decision-maker alignment descriptions.

### Are there actual AI deployments in PD offices, or is this all theoretical?

**Real deployments exist and are growing, though unevenly distributed.**

Confirmed deployments with named offices:
- **JusticeText:** ~65 PD offices, including statewide in Massachusetts and Kentucky
- **CoCounsel (Miami-Dade):** 100 attorney seats, research time per motion from 5 hours to 1
- **Reduct.Video (Colorado State PD):** Body-cam and interrogation transcription
- **Relativity (San Francisco PD):** E-discovery management

The Everlaw/NLADA 2025 survey found 74% of legal aid organizations are using AI (vs. 37% across the legal profession), with 40% using it at least weekly. However, the arxiv study specifically surveying public defenders found 71% had *not* used AI professionally — suggesting legal aid (which includes civil legal aid) may be ahead of criminal public defense specifically.

**Assessment:** This is no longer theoretical. Named offices with measurable results exist. The profile descriptions can and should reference specific deployments rather than speaking entirely in hypotheticals.

## Recommended Changes

### Ratings

**No rating changes recommended.** All current ratings are well-supported by the evidence:

- **Dimensionality (4/4):** Confirmed — junior PDs handle an unusually wide task set from day one, and seniors add genuine additional dimensions.
- **Focus Effect (4/3):** Confirmed — AI tools demonstrably free meaningful time (Miami-Dade's 5-to-1 hour research improvement), but the political capture dynamic is real.
- **Demand Elasticity (4/4):** Confirmed — unmet demand is massive and well-documented (only 21% of PD offices adequately staffed per RAND).
- **Self-Service Resistance (4/4):** Confirmed — constitutional right to counsel, incarcerated/indigent population, zero self-service path.
- **Decision-Maker Alignment (1/1):** Confirmed — chronic underfunding, prosecution/defense budget asymmetry (SF: PD budget is 60% of DA budget), and hostile legislative dynamics are well-documented.
- **Verdict (Political Variable):** Confirmed — the outcome depends entirely on whether AI productivity gains are captured by defenders or by budget-cutters.

### Description Updates

**Junior Focus Effect** — Replace speculative "legislators use AI to justify flat budgets" with documented dynamics, and update caseload figures:
> "The task complementarity is identical to private defense — but the RAND-standard 59-felony maximum (35 hours/case) collides with actual caseloads of 150-525+ cases per attorney. Miami-Dade's CoCounsel deployment cut research time per motion from 5 hours to 1 — proving AI can restore the O-Ring bundle. But the focus effect gets captured by the political system: law enforcement gets $3.5B+ in AI investment while defender offices fight for basic staffing, and legislators have no incentive to let AI savings flow into better representation rather than flat budgets."

**Junior Decision-Maker Alignment** — Ground in documented funding asymmetry rather than speculative AI-as-political-cover:
> "San Francisco's PD budget ($54.6M) is 60% of the DA's ($84.1M) despite representing 75-80% of people charged. Police departments get AI tools (Axon Draft One, facial recognition, ShotSpotter) through their own budgets; defenders must fight county procurement for basic software. The risk isn't that legislators cite AI to cut budgets — it's that they invest in prosecution-side AI while starving the defense side, widening an asymmetry that existed long before AI."

**Senior Focus Effect** — Add specificity about what AI actually frees time for:
> "Senior defenders who adopt AI tools report dramatic time savings — Miami-Dade attorneys saved up to 15 hours weekly on research and evidence review, redirecting time to client contact, trial prep, and training junior staff. But with 24% annual turnover (Kentucky, 2025) and 40% attrition over four years (Minnesota), the freed time often goes to covering for departed colleagues rather than deepening representation."

**Senior Decision-Maker Alignment** — Strengthen with the new caseload-reform context:
> "Washington's Supreme Court slashed caseload limits from 150 felonies to 47 in June 2025 — and counties immediately said the standards are 'unattainable with current funding.' Senior defenders may have political capital to push for reform through courts rather than legislatures, but funding remains the bottleneck. AI investment decisions are made by the same officials who chronically underfund the offices."

**Junior Demand Elasticity** — Add the RAND specificity:
> "Only 21% of state PD offices have enough attorneys to meet caseload standards. The RAND study says a felony needs 35 hours; defenders often get a fraction of that. AI could let each attorney provide dramatically better representation — and 90% of legal aid professionals say AI at full potential would enable serving more clients — but the demand gap is structural, not merely technological."

**Junior Dimensionality** — Add the digital evidence dimension that is new and growing:
> "Investigation, legal research, motion practice, plea negotiation, client counseling with vulnerable populations, jury selection, trial advocacy — plus a growing digital evidence burden (Cook County receives 60,000 hours of body-cam footage annually). And increasingly, defenders must understand and challenge AI-generated evidence: algorithmically drafted police reports, facial recognition IDs, acoustic gunshot detection. All from day one."

## References

1. [National Public Defense Workload Study](https://www.rand.org/pubs/research_reports/RRA2559-1.html) — RAND Corporation, 2023. Establishes that a felony requires 35 hours of adequate representation (59 cases/year max), far below actual caseloads. Funded by Arnold Ventures.
2. [How Can AI Augment Access to Justice? Public Defenders' Perspectives on AI Adoption](https://arxiv.org/html/2510.22933v1) — arxiv, 2025. Interview study of 14 public defenders finding 71% have not used AI professionally; identifies cost, office norms, confidentiality, and output quality as primary barriers.
3. [Legal Aid Organizations Embrace AI at Twice the Rate of Other Lawyers](https://www.lawnext.com/2025/09/legal-aid-organizations-embrace-ai-at-twice-the-rate-of-other-lawyers-new-study-reveals.html) — LawSites, Sep 2025. Everlaw/NLADA survey of 112 legal aid professionals: 74% use AI (vs. 37% across legal profession), 88% believe AI can help close the justice gap.
4. [Existing AI Tools for Criminal Defense](https://www.law.berkeley.edu/research/criminal-law-and-justice-center/our-work/ai-for-public-defenders/existing-ai-tools/) — UC Berkeley Law Criminal Justice Center. Catalog of AI tools available to public defenders, including JusticeText, Reduct.Video, CoCounsel, and others with deployment details.
5. [Washington's Supreme Court Slashes Public Defender Caseload Limits](https://washingtonstatestandard.com/2025/06/09/washingtons-supreme-court-slashes-public-defender-caseload-limits/) — Washington State Standard, Jun 2025. New limits of 47 felonies/120 misdemeanors (down from 150/400), with 10-year phase-in. Counties call standards "unattainable with current funding."
6. [Miami-Dade Public Defender's Office Pioneers AI Integration](https://www.floridabar.org/the-florida-bar-news/miami-dade-public-defender-is-using-artificial-intelligence-for-research-and-for-case-preparation/) — The Florida Bar. First PD office to deploy CoCounsel at scale (100 seats), cutting research time per motion from 5 hours to 1. Won Thomson Reuters Legal Innovator of the Year (2025).
7. [San Francisco Public Defender Caseload Crisis](https://davisvanguard.org/2025/10/da-funding-defense-disparity/) — Davis Vanguard, Oct 2025. PD budget ($54.6M) is 60% of DA budget ($84.1M) despite representing 75-80% of those charged; arraignments up 57% since 2021.
