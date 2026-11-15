import type { CaseStudy } from './types'

export type { CaseStudy, CaseStudyVisual } from './types'

/**
 * Four flagships carry the homepage, one per archetype: enterprise
 * architecture, payout infrastructure, consumer growth, and applied AI.
 * Everything else stays in the /work archive and is not featured.
 *
 * Claims here are drawn from the experience data in profile.ts. Anything that
 * cannot be traced to a real number is stated qualitatively rather than
 * invented.
 */
export const caseStudies: CaseStudy[] = [
    {
        id: "1",
        slug: "sampoerna-myhero-decoupling",
        title: "My Hero Decoupling",
        company: "HM Sampoerna",
        industry: "Enterprise / FMCG",
        period: "2025",
        summary:
            "Technical due diligence and pre-decoupling analysis for HM Sampoerna, separating the My Hero module from the AYO ecosystem using C4 architectural modeling before any build work started.",
        challenge:
            "HM Sampoerna planned to decouple the My Hero module from the AYO environment to improve modularity and long-term scalability. The complexity sat in the seams: two backoffice systems (AYO and My Hero) with overlapping ownership, and a shared iPad application used in the field by both domains.",
        process: [
            "Ran a joint technical assessment with Nusantara Beta Studio (NBS) as part of a tag-team engagement with Zero One Group",
            "Analyzed the existing landscape across the AYO backoffice, the My Hero backoffice, and the field iPad application",
            "Identified functional boundaries, shared services, and data dependencies across the three systems",
            "Produced C4 diagrams at Context, Container, and Component level to make the current state legible",
            "Wrote a pre-analysis of decoupling scenarios, risks, and architectural constraints",
        ],
        solution:
            "Delivered structured specifications, current-state C4 models, and a pre-analysis of feasible decoupling strategies, giving the client an architectural baseline it could execute against without guessing at the boundary line.",
        tradeOffs:
            "The safest decoupling path was not the fastest one. We could have proposed a clean-slate rebuild, but the field iPad app and two backoffice systems carried live operational dependencies. We chose pre-decoupling analysis that mapped boundaries first, accepting a slower start in exchange for a plan the client could run without breaking daily operations.",
        technicalHurdles:
            "The hard part was deciding which couplings were accidental and which encoded business rules. C4 modeling forced the dependencies into view, but diagrams alone could not settle which duplicate data ownership was load-bearing, and that distinction could not be resolved without the maintainers in the room.",
        retrospective:
            "I would have pushed for access to the engineering teams earlier and validated the container diagram against the running system before presenting recommendations. A short working session with the maintainers would have caught assumptions that took longer to surface through documentation.",
        visual: "c4",
        outcomes: [
            {
                metric: "C4 baseline",
                description:
                    "Context, Container, and Component models documenting how the AYO ecosystem actually fits together.",
            },
            {
                metric: "Boundary map",
                description:
                    "Shared services and duplicate data ownership separated from the accidental coupling around the field iPad app.",
            },
            {
                metric: "Decoupling pre-analysis",
                description:
                    "Scenarios, risks, and constraints documented before execution, delivered jointly by Zero One Group and NBS.",
            },
        ],
        tags: ["Enterprise Architecture", "Decoupling", "Consulting", "FMCG"],
        featured: true,
        order: 0,
        publishDate: "2025-12-01",
    },
    {
        id: "2",
        slug: "doitpay-payout-infrastructure",
        title: "Resilient Payout Infrastructure",
        company: "Doitpay",
        industry: "Fintech / Payout Infrastructure",
        period: "2026",
        summary:
            "Owned the payout side of Doitpay's platform: multi-provider routing, automated liquidity failover, and the back-office controls that keep high-value disbursements auditable.",
        challenge:
            "Payouts fan out to several banking partners, each with its own rate limits and float position. When an upstream bank ran short of float, transactions stalled and operations staff triaged by hand for 15 to 30 minutes. High-value manual adjustments had no enforced second pair of eyes, so the audit trail depended on memory and a shared inbox.",
        process: [
            "Mapped disbursement states, provider contracts, and reconciliation hooks before the first build ticket",
            "Designed weighted round-robin routing across payout providers, balancing partner rate limits against float depletion",
            "Specified automated liquidity circuit breakers with sub-second failover once a provider's float ran out",
            "Designed a maker-checker engine for high-value manual adjustments and dispute handling, backed by an immutable audit log",
            "Modeled the back-office flow for a new B2C application, covering compliance monitoring and automated reconciliation",
        ],
        solution:
            "Payouts route across providers on a weighted schedule, with circuit breakers that move traffic the moment a provider's float is exhausted. High-value adjustments and disputes pass through maker-checker authorization, and every action lands in an immutable audit trail. Operations now handles exceptions instead of triaging every payout by hand.",
        tradeOffs:
            "Failover speed and provider choice pull against each other. A strict breaker moves traffic before a partner has genuinely failed, which costs rate and routing quality. We set thresholds around observed float-depletion patterns and kept a manual override for operations, accepting that the override is itself an audited, two-person action.",
        technicalHurdles:
            "The hard part was state truth. A payout's status lives in our ledger and in the partner's system, and the two disagree during failover. Routing had to be idempotent so a retried transaction never paid twice, and the breaker had to tell a provider outage apart from a slow response. Maker-checker added a second constraint: the approval state machine had to survive partial failures without leaving an adjustment half-authorized.",
        retrospective:
            "I would have instrumented float depletion earlier. The breakers were tuned against incident timelines reconstructed after the fact; a live float-velocity signal would have let us set thresholds with data instead of estimates and caught slow drains before they became outages.",
        visual: "flow",
        outcomes: [
            {
                metric: "IDR 1B+ daily",
                description:
                    "Payout volume monitored across automated multi-bank rails, with thousands of live disbursements a day.",
            },
            {
                metric: "Sub-second failover",
                description:
                    "Automated circuit breakers replaced a 15 to 30 minute manual triage window when bank float ran out.",
            },
            {
                metric: "Maker-checker controls",
                description:
                    "Dual authorization on high-value adjustments and disputes, with an immutable audit trail on every action.",
            },
        ],
        tags: ["Fintech", "Payout Infrastructure", "Routing", "Risk Controls"],
        featured: true,
        order: 1,
        publishDate: "2026-02-01",
    },
    {
        id: "3",
        slug: "transfez-mobile-app",
        title: "Consumer Remittance and Growth",
        company: "Transfez",
        industry: "Fintech / Cross-Border Payments",
        period: "2023 – 2024",
        summary:
            "Associate Product Manager on Transfez's consumer remittance platform, running a squad of nine on onboarding, verification, the transaction experience, and growth experiments across mobile and web.",
        challenge:
            "Transfez aimed to scale its consumer remittance product while improving verification rates, transaction completion, and trust in cross-border payments. Growth experimentation had to coexist with strict compliance and regulatory requirements, on a platform already processing IDR 2T+ in volume.",
        process: [
            "Worked with cross-functional teams to deliver consumer remittance features across onboarding, transaction flow, and growth initiatives",
            "Led day-to-day product execution with a squad of frontend, backend, QA, and UI/UX specialists",
            "Revamped the verification (KYC) flow to reduce friction while holding the compliance standard",
            "Designed and ran A/B tests across the journey from registration to transaction completion",
            "Launched 15+ new remittance corridors and a voucher engine for growth campaigns",
            "Produced and maintained PRDs, user stories, and product roadmaps",
        ],
        solution:
            "Delivered a redesigned verification flow, a voucher engine for growth campaigns, and a steady cadence of onboarding and transaction improvements, supporting verified user growth and IDR 480B in campaign-driven transaction volume.",
        tradeOffs:
            "Growth and compliance pulled in opposite directions. We wanted a shorter KYC flow, but every removed field carried a regulatory or fraud-risk cost. We kept the compliance-critical steps, moved the friction into progressive disclosure, and tested the rest as experiments instead of shipping a blanket redesign.",
        technicalHurdles:
            "KYC touches identity data, third-party verification, and the transaction flow, so a small UI change ripples into compliance and support. We had to coordinate frontend, backend, QA, and design on a shared flow while keeping the old path available for users mid-verification. The voucher engine also had to fit existing transaction states without creating double-spend edge cases.",
        retrospective:
            "I would have instrumented the verification funnel earlier and at a finer grain. We could see the aggregate lift in verified users and paying users, but not always which step caused it. Better event coverage would have shortened the experiment loop and separated onboarding friction from campaign-driven growth.",
        visual: "state-machine",
        outcomes: [
            {
                metric: "IDR 2T+ GTV",
                description: "Platform volume across 114,000+ remittance transactions.",
            },
            {
                metric: "15+ corridors",
                description:
                    "New international payout corridors launched since April 2023.",
            },
            {
                metric: "IDR 480B",
                description:
                    "Transaction volume driven by the voucher engine built for growth campaigns.",
            },
            {
                metric: "+55% verified",
                description:
                    "Verified users up 55% and paying users up 20% in three months after the KYC revamp.",
            },
        ],
        tags: [
            "Fintech",
            "Cross-Border Payments",
            "Growth Experimentation",
            "KYC & Compliance",
        ],
        featured: true,
        order: 2,
        publishDate: "2024-09-01",
    },
    {
        id: "4",
        slug: "ai-sales-forecasting-dashboard",
        title: "Conversational Sales Analytics",
        company: "Zero One Group (Client under NDA)",
        industry: "Applied AI / Decision Support",
        period: "2025",
        summary:
            "An AI dashboard that lets business users query sales data in plain language, get answers with a chart that fits the result, and see a forecast instead of reading a static report.",
        challenge:
            "The client had moved past static reporting but not past the analyst bottleneck: business users could not ask a follow-up question without filing a request. Predefined dashboards answered yesterday's questions, so forecasting and performance review ran weeks behind the decisions they were meant to inform.",
        process: [
            "Analyzed the business requirements for sales forecasting and performance tracking",
            "Designed a conversational interface for natural-language data querying",
            "Built the translation layer from intent to SQL against the client's schema",
            "Implemented chart selection that adapts to the shape of the returned data",
            "Integrated predictive modeling for forward-looking sales forecasts",
        ],
        solution:
            "Delivered a generative-AI dashboard where users ask questions such as the top five outlets and get an answer, an appropriate interactive chart, and a recommendation, without waiting on an analyst queue.",
        tradeOffs:
            "Natural-language analytics is impressive in a demo and fragile in production. We traded open-ended querying for a constrained set of business questions mapped to reliable data paths, keeping free-form exploration as a secondary route. That narrowed the promise but made the answers trustworthy.",
        technicalHurdles:
            "The model had to translate intent into SQL against a schema it did not control, then pick a visualization that matched the result. We needed to handle ambiguous questions, empty result sets, and charts that looked plausible but told the wrong story. Forecasts added a second layer: a confident-looking line can hide weak historical data.",
        retrospective:
            "I would have defined a failure taxonomy for the assistant on day one: ambiguous question, missing data, wrong aggregation, unsupported chart. We tested happy paths more thoroughly than failure states, and that is where user trust is won or lost.",
        visual: "dashboard",
        outcomes: [
            {
                metric: "Conversational analytics",
                description:
                    "Natural-language querying over structured sales data, without an analyst in the loop.",
            },
            {
                metric: "Assistant-generated charts",
                description:
                    "Visualizations selected from the shape of the result rather than configured in advance.",
            },
            {
                metric: "Forecast on demand",
                description:
                    "Predictive sales forecasting surfaced inside the same conversational flow.",
            },
        ],
        tags: ["Applied AI", "Decision Support", "Data Visualization", "B2B"],
        featured: true,
        order: 3,
        publishDate: "2025-04-01",
    },
    {
        id: "5",
        slug: "ai-lms-platform",
        title: "AI-Assisted Learning Management System",
        company: "Zero One Group (Client under NDA)",
        industry: "EdTech / GovTech / AI",
        period: "2025",
        summary:
            "A web-based learning management system for a public-sector client, adding conversational study, generated quizzes, and automated scoring to a familiar LMS structure.",
        challenge:
            "The client needed an LMS that supported administrators, teachers, and students while using AI to lift engagement and automate assessment. Traditional platforms covered neither the conversational study experience nor the assessment workload, and the public-sector timeline ruled out a broad rebuild.",
        process: [
            "Defined system roles and access models for administrators, teachers, and students",
            "Designed end-to-end learning flows covering content consumption, AI-assisted Q&A, and assessment",
            "Integrated model-backed capabilities for conversational learning, quiz generation, and automated scoring",
            "Designed an audio learning experience for real-time, voice-based interaction",
            "Worked with product, engineering, and stakeholders to ship a secure web application",
        ],
        solution:
            "Delivered an AI-assisted LMS with chat-based learning, voice-enabled study, generated quizzes, and automated scoring, built on top of existing course material so administrators kept a structure they already understood.",
        tradeOffs:
            "The client wanted a broad AI learning platform on a public-sector timeline. We traded breadth for a smaller set of capabilities that could ship safely: conversational Q&A, generated quizzes, and automated scoring, while keeping the LMS structure familiar. The voice experience stayed a focused pilot rather than a replacement for text-based study.",
        technicalHurdles:
            "The hard part was not calling a model; it was making model output usable inside a school workflow. Role-based access had to separate admin, teacher, and student capabilities while the model worked across shared content. Quiz generation and scoring needed guardrails for malformed output, and the audio experience added latency and state-management problems that a chat-only prototype hides.",
        retrospective:
            "I would define evaluation criteria for model output before the build, not after. We could describe what good looked like, but we had no shared rubric for wrong answers, invented citations, or scoring drift. A small evaluation set per role would have made the trade-offs easier to defend and the pilot easier to extend.",
        visual: "flow",
        outcomes: [
            {
                metric: "Conversational learning",
                description: "Chat and audio-based study powered by a language model.",
            },
            {
                metric: "Educator productivity",
                description:
                    "Generated quiz content and automated assessment scoring reduced the marking load.",
            },
            {
                metric: "Role-based platform",
                description:
                    "Separate admin, teacher, and student capabilities on shared course content.",
            },
        ],
        tags: ["Applied AI", "EdTech", "LMS", "Public Sector"],
        featured: false,
        order: 4,
        publishDate: "2025-06-01",
    },
    {
        id: "6",
        slug: "ai-talent-matching-dashboard",
        title: "AI Talent Mobility Dashboard",
        company: "Zero One Group (Client under NDA)",
        industry: "Applied AI / HR Tech",
        period: "2025",
        summary:
            "An internal mobility tool that matches employees to open roles in both directions and explains why a match is worth a conversation.",
        challenge:
            "Internal candidates were being missed because existing systems could not connect qualitative skills and experience to job requirements. The result was unnecessary external hiring on one side and underused people on the other.",
        process: [
            "Analyzed requirements for internal talent mobility and skill matching",
            "Designed bidirectional matching for job-to-employee and employee-to-job queries",
            "Built a conversational interface for querying the talent pool in plain language",
            "Implemented recommendations that explain match quality rather than only ranking it",
            "Built a dashboard for visualizing talent alignment and workforce planning",
        ],
        solution:
            "Delivered a matching platform where stakeholders describe the role they need and get candidates, explanations, and a workforce view, with the same engine working from an employee's side outward.",
        tradeOffs:
            "Explainability against ranking precision. A model can produce a sharper shortlist by weighing signals it will not explain, but hiring managers do not act on a score they cannot interrogate. We surfaced the reasoning and accepted slightly less confident rankings in exchange for recommendations people would actually trust.",
        technicalHurdles:
            "Skills overlap is fuzzy and often lives in free text, so the matching layer had to work from messy employee records without hallucinating qualifications. Bidirectional matching doubled the surface: the same person is a candidate in one query and a profile in the other, and the explanations had to stay consistent in both directions.",
        retrospective:
            "I would have validated the matching logic against a set of roles the client had already filled internally. Without that ground truth, quality was argued from examples instead of measured against outcomes the organization already trusted.",
        visual: "dashboard",
        outcomes: [
            {
                metric: "Internal mobility",
                description:
                    "Open roles surfaced against existing employees before external search.",
            },
            {
                metric: "Explainable matches",
                description:
                    "Each recommendation carries its reasoning, in both job and employee directions.",
            },
            {
                metric: "Workforce view",
                description:
                    "Talent alignment and planning visualized for the people who own headcount.",
            },
        ],
        tags: ["Applied AI", "HR Tech", "Talent Matching", "B2B"],
        featured: false,
        order: 5,
        publishDate: "2025-08-01",
    },
    {
        id: "7",
        slug: "revamping-dana-indonesia",
        title: "Revamping DANA Indonesia",
        company: "Binar Academy (Final Bootcamp Project)",
        industry: "Fintech / Digital Wallet",
        period: "2021",
        summary:
            "A product research and design project on the DANA digital wallet, rebuilding onboarding, login, premium upgrade, and customer support flows around what users actually complained about.",
        challenge:
            "Users reported friction in login, difficulty finding the premium upgrade, and poor access to support. Benchmarking against OVO and LinkAja showed the flows were doing more work than the job required, and one-star reviews pointed at the same few steps.",
        process: [
            "Analyzed one-star reviews and ran user interviews to isolate the primary pain points",
            "Built personas and mapped the problems in login, premium upgrade, and customer service",
            "Benchmarked against OVO and LinkAja to find simplification opportunities",
            "Redesigned onboarding, login, premium upgrade, and the support entry point",
            "Prototyped and iterated against usability testing feedback",
        ],
        solution:
            "Delivered revamped flows with fewer steps, fingerprint login, an upgrade entry on the home page, clearer feedback on rejected documents, and direct access to support.",
        visual: "state-machine",
        outcomes: [
            {
                metric: "Simpler flows",
                description:
                    "Onboarding and premium upgrade reduced to the steps the job required.",
            },
            {
                metric: "Better accessibility",
                description:
                    "Fingerprint login and in-app support added as first-class routes.",
            },
            {
                metric: "Research-led design",
                description:
                    "Redesign driven by review analysis, interviews, and competitor benchmarking.",
            },
        ],
        tags: ["Fintech", "Product Design", "UX Research", "Digital Wallet"],
        featured: false,
        order: 6,
        publishDate: "2021-12-01",
        articleUrl:
            "https://dhemalamf.medium.com/product-journey-revamping-dana-indonesia-4ae1ba26428c",
    },
    {
        id: "8",
        slug: "apiary-academy-learning-platform",
        title: "Personalized Learning Platform Concept",
        company: "Apiary Academy",
        industry: "EdTech / Product Design",
        period: "2023",
        summary:
            "A goal-driven learning platform concept that makes skill outcomes visible before a learner commits, and keeps the courses they meant to take findable afterwards.",
        challenge:
            "Learners could not tell what they would gain from a course, could not find material aligned with their goals, and had no way to hold onto courses they wanted to take later. Existing platforms optimized for content volume over direction.",
        process: [
            "Translated the problem into How Might We questions around skill visibility, personalization, discovery, and saving",
            "Ran competitor analysis to find gaps in personalization and outcome transparency",
            "Defined a persona for time-poor young professionals with career-oriented goals",
            "Mapped the end-to-end journey, including emotional states and unmet needs",
            "Designed the flow from onboarding through completion, built around a stated goal",
            "Produced wireframes, high-fidelity UI, and an interactive prototype, then validated it qualitatively",
        ],
        solution:
            "Proposed a goal-based experience where learners state a current or target role during onboarding, the home page curates against it, course pages state the skill outcome up front, and saved courses stay reachable alongside progress and offline access.",
        visual: "flow",
        outcomes: [
            {
                metric: "Strongest reception",
                description:
                    "The concept drew the most positive response of the challenge submissions.",
            },
            {
                metric: "Visible outcomes",
                description:
                    "Learners could see what a course would give them before committing to it.",
            },
            {
                metric: "Relevant discovery",
                description:
                    "Curated recommendations replaced browsing a catalogue of unclear scope.",
            },
        ],
        tags: ["Product Design", "UX Research", "EdTech", "Personalized Learning"],
        featured: false,
        order: 7,
        publishDate: "2023-03-01",
        articleUrl:
            "https://www.linkedin.com/feed/update/urn:li:activity:7043913213268160514/",
    },
]

export const getFeaturedCaseStudies = () => {
    return caseStudies
        .filter(cs => cs.featured)
        .sort((a, b) => a.order - b.order)
}

export const getCaseStudyBySlug = (slug: string) => caseStudies.find(cs => cs.slug === slug)
