import type { CaseStudy } from './types'

export type { CaseStudy, CaseStudyVisual } from './types'

export const caseStudies: CaseStudy[] = [
    {
        id: "1",
        slug: "ai-lms-platform",
        title: "AI-Powered Learning Management System",
        company: "Zero One Group (Client under NDA)",
        industry: "EdTech / GovTech / AI",
        period: "2025",
        summary:
            "Delivered a web-based AI-powered Learning Management System for a public-sector client, enabling intelligent content exploration, AI-assisted assessments, and conversational learning experiences.",
        challenge:
            "The client required a modern LMS capable of supporting administrators, teachers, and students while leveraging AI to enhance learning engagement, automate assessment workflows, and enable conversational learning, capabilities not supported by traditional LMS platforms.",
        process: [
            "Defined system roles and access models for administrators, teachers, and students",
            "Designed end-to-end learning flows including content consumption, AI-assisted Q&A, and assessment",
            "Integrated OpenAI-based capabilities for conversational learning, quiz generation, and automated scoring",
            "Designed AI-driven audio learning experience enabling real-time, voice-based interaction",
            "Collaborated with product, engineering, and stakeholder teams to deliver a secure, web-based application"
        ],
        solution:
            "Built a web-based AI-powered LMS featuring chat-based learning, voice-enabled conversational study, AI-generated quizzes, and automated quiz scoring. The platform supports structured learning from existing materials while enabling interactive, AI-assisted study experiences for students and teachers.",
        tradeOffs:
            "The client wanted a broad AI learning platform on a public-sector timeline. We traded breadth for a smaller set of AI capabilities that could ship safely: conversational Q&A, generated quizzes, and automated scoring, while keeping the LMS structure familiar to administrators. The voice experience stayed a focused pilot rather than a full replacement for text-based study.",
        technicalHurdles:
            "The hard part was not calling a model; it was making model output usable inside a school workflow. Role-based access had to separate admin, teacher, and student capabilities while the model worked across shared content. Quiz generation and scoring needed guardrails for malformed output, and the audio experience added latency and state-management problems that a chat-only prototype hides.",
        retrospective:
            "I would define evaluation criteria for AI output before the build, not after. We could describe what good looked like, but we had no shared rubric for wrong answers, hallucinated citations, or scoring drift. A small evaluation set per role would have made the trade-offs easier to defend and the pilot easier to extend.",
        visual: "flow",
        outcomes: [
            {
                metric: "AI-Enabled Learning",
                description: "Conversational chat and audio-based learning powered by AI"
            },
            {
                metric: "Educator Productivity",
                description: "AI-assisted quiz creation and automated assessment scoring"
            },
            {
                metric: "Role-Based Platform",
                description: "Clear separation of admin, teacher, and student capabilities"
            }
        ],
        tags: [
            "AI",
            "Edtech - LMS",
            "Web Application"
        ],
        featured: true,
        order: 1,
        publishDate: "2025-06-01"
    },
    {
        id: "2",
        slug: "transfez-mobile-app",
        title: "Transfez Consumer Remittance Platform",
        company: "Transfez",
        industry: "Fintech / Cross-Border Payments",
        period: "2024",
        summary:
            "Contributed as an Associate Product Manager to the development and growth of Transfez’s consumer remittance platform, focusing on onboarding, verification, transaction experience, and growth initiatives across mobile and web.",
        challenge:
            "Transfez aimed to scale its consumer remittance product while improving user verification rates, transaction completion, and trust in cross-border payments. The platform needed to balance growth experimentation with strict compliance and regulatory requirements.",
        process: [
            "Worked with cross-functional teams to deliver consumer-side remittance features across onboarding, transaction flow, and growth initiatives",
            "Led day-to-day product execution with a squad of frontend, backend, QA, and UI/UX team members",
            "Revamped the user verification (KYC) flow to reduce friction while maintaining compliance standards",
            "Designed and executed A/B tests to optimize the user journey from registration to transaction completion",
            "Conducted competitive analysis and user research to inform feature prioritization and product differentiation",
            "Produced and maintained product documentation including PRDs, user stories, and product roadmaps"
        ],
        solution:
            "Delivered continuous improvements to the Transfez consumer remittance experience, including a redesigned verification flow, voucher engine for growth campaigns, and optimizations across onboarding and transaction journeys to support scalable user and transaction growth.",
        tradeOffs:
            "Growth and compliance pulled in opposite directions. We wanted a shorter KYC flow, but every removed field carried a regulatory or fraud-risk cost. We kept the compliance-critical steps, moved the friction into progressive disclosure, and tested the rest as experiments instead of shipping a blanket redesign.",
        technicalHurdles:
            "KYC touches identity data, third-party verification, and the transaction flow, so a small UI change can ripple into compliance and support. We had to coordinate frontend, backend, QA, and design on a shared flow while keeping the old path available for users mid-verification. The voucher engine also had to fit existing transaction states without creating double-spend edge cases.",
        retrospective:
            "I would instrument the verification funnel earlier and at a finer grain. We could see the aggregate lift in verified users and NPU, but not always which step caused it. Better event coverage would have shortened the experiment loop and made it easier to separate onboarding friction from campaign-driven growth.",
        visual: "state-machine",
        outcomes: [
            {
                metric: "Revenue & Transaction Impact",
                description: "Supported the platform in generating over 2 trillion rupiah in GTV across more than 114,000 remittance transactions"
            },
            {
                metric: "User Growth & Conversion",
                description: "Improved verification flow contributed to significant growth in verified users and new paying users within months"
            },
            {
                metric: "Growth Enablement",
                description: "Implemented a voucher engine and referral-related initiatives to drive transaction adoption and repeat usage"
            }
        ],
        tags: [
            "Fintech",
            "Product Management",
            "Mobile Application",
            "Growth Experimentation",
            "KYC & Compliance",
            "Cross-Border Payments"
        ],
        featured: true,
        order: 4,
        publishDate: "2024-09-01"
    },
    {
        id: "3",
        slug: "sampoerna-myhero-decoupling",
        title: "HM Sampoerna – My Hero Decoupling",
        company: "HM Sampoerna",
        industry: "Enterprise / FMCG",
        period: "2025",
        summary:
            "Contributed to a technical due diligence and pre-decoupling initiative for HM Sampoerna, focusing on separating the 'My Hero' module from the AYO ecosystem through system analysis and C4 architectural modeling.",
        challenge:
            "HM Sampoerna planned to decouple the 'My Hero' module from their AYO environment to improve modularity and long-term scalability. The complexity stemmed from tightly coupled components across two backoffice systems (AYO Backoffice and My Hero Backoffice) and a shared iPad application used in the field.",
        process: [
            "Conducted joint technical assessment with Nusantara Beta Studio (NBS) as part of a tag-team consulting engagement with Zero One Group",
            "Analyzed existing system landscape including AYO Backoffice, My Hero Backoffice, and iPad application",
            "Identified functional boundaries, shared services, and data dependencies across systems",
            "Produced C4 diagrams (Context, Container, and Component levels) to visualize current-state architecture",
            "Performed pre-analysis of decoupling scenarios, risks, and architectural constraints"
        ],
        solution:
            "Delivered structured specifications, current-state C4 diagrams, and a pre-analysis outlining feasible decoupling strategies for the My Hero module, providing HM Sampoerna with a clearer architectural baseline prior to execution.",
        tradeOffs:
            "The safest decoupling path was not the fastest one. We could have proposed a clean-slate rebuild, but the field iPad app and two backoffice systems carried live operational dependencies. We chose a pre-decoupling analysis that mapped boundaries first, accepting a slower start in exchange for a plan the client could execute without breaking daily operations.",
        technicalHurdles:
            "The complexity was in the seams: shared services, duplicate data ownership, and a field application serving both domains. C4 modeling forced those dependencies into view, but the real difficulty was deciding which couplings were accidental and which encoded business rules. That distinction could not be settled from diagrams alone.",
        retrospective:
            "I would have pushed for access to the engineering teams earlier and validated the container diagram against the running system before presenting recommendations. A short working session with the maintainers would have caught assumptions that took longer to surface through documentation.",
        visual: "c4",
        outcomes: [
            {
                metric: "Architecture Clarity",
                description: "Documented existing system interactions and dependencies using C4 modeling"
            },
            {
                metric: "Readiness",
                description: "Established a technical baseline to support future decoupling decisions"
            },
            {
                metric: "Collaboration",
                description: "Effective joint consulting delivery between Zero One Group and NBS"
            }
        ],
        tags: ["Enterprise Architecture", "Decoupling", "Consulting"],
        featured: true,
        order: 0,
        publishDate: "2025-12-01"
    },
    {
        id: "4",
        slug: "revamping-dana-indonesia",
        title: "Product Journey: Revamping DANA Indonesia",
        company: "Binar Academy (Final Bootcamp Project)",
        industry: "Fintech / Digital Wallet",
        period: "2021",
        summary: "Led a product design and research initiative to revamp key user flows of the DANA digital wallet as part of a Binar Academy final project, focusing on improving onboarding, login, premium upgrade, and customer support experience.",
        challenge: "Users of the DANA app reported major pain points in login friction, difficulty upgrading to premium, and poor support access. Benchmarking against competitors revealed inefficient flows and overly complex processes that reduced user satisfaction and conversion rates.",
        process: [
            "Conducted user research including analysis of one-star reviews and user interviews to identify primary pain points",
            "Created user persona and mapped key user problems for login, premium upgrade, and customer service",
            "Benchmarked against competitors (OVO, LinkAja) to identify opportunities for simplification",
            "Redesigned core flows such as onboarding, login, premium upgrade via home page, and customer support adjacency",
            "Prototyped and iterated designs based on usability testing feedback to validate improvements"
        ],
        solution: "Delivered a set of revamped UI/UX flows that reduced unnecessary steps, introduced fingerprint login and home-page upgrade entry, improved feedback clarity (e.g., blurry photo guidance), and integrated direct access to customer service, improving the overall user experience.",
        outcomes: [
            {
                metric: "Improved User Flows",
                description: "Simplified onboarding and premium upgrade process"
            },
            {
                metric: "Enhanced Accessibility",
                description: "Added fingerprint login and in-app customer support pathways"
            },
            {
                metric: "User-Centered Design",
                description: "Redesigned UI based on competitor benchmarks and user pain points"
            }
        ],
        tags: ["Fintech", "Product Design", "UX Research", "DANA", "Digital Wallet"],
        featured: true,
        articleUrl: "https://dhemalamf.medium.com/product-journey-revamping-dana-indonesia-4ae1ba26428c",
        order: 6,
        publishDate: "2021-12-01"
    },
    {
        id: "5",
        slug: "apiary-academy-learning-platform",
        title: "Apiary Product Design Challenge – Personalized Learning Platform Concept",
        company: "Apiary Academy",
        industry: "EdTech / Product Design",
        period: "2023",
        summary:
            "Designed a personalized learning platform concept for Apiary Academy focused on helping young professionals discover relevant courses, clearly understand skill outcomes, and manage learning progress through goal-driven curation.",
        challenge:
            "Learners faced difficulty understanding what skills they would gain after completing courses, discovering materials aligned with their interests, and organizing courses they wanted to take. Existing learning platforms emphasized content volume over clarity, personalization, and long-term learning direction.",
        process: [
            "Translated problem exploration into structured How Might We (HMW) questions around skill visibility, personalization, discovery, and course saving",
            "Conducted competitor analysis across major learning platforms to identify gaps in personalization and outcome transparency",
            "Defined a primary user persona representing young professionals with career-oriented learning goals and limited time availability",
            "Mapped an end-to-end user journey to uncover emotional states, friction points, and unmet needs across the learning lifecycle",
            "Designed a complete user flow from onboarding to learning completion, emphasizing goal-setting and curated discovery",
            "Produced wireframes, high-fidelity UI designs, and an interactive prototype, followed by qualitative usability validation"
        ],
        solution:
            "Proposed a goal-based personalized learning experience where users define their current or desired career during onboarding. The platform curates relevant courses on the home page, clearly communicates expected skill outcomes on course detail pages, allows users to save courses for later, and supports ongoing learning through progress visibility and offline access.",
        outcomes: [
            {
                metric: "Winning the Most Liked Design",
                description: "The design concept received the strongest positive reception among challenge submissions for its clarity and relevance"
            },
            {
                metric: "Clarity of Learning Outcomes",
                description: "Users were able to easily understand what skills they would gain before committing to a course"
            },
            {
                metric: "Improved Content Relevance",
                description: "Curated course recommendations helped users quickly find learning materials aligned with their goals"
            }
        ],
        tags: [
            "Product Design",
            "UX Research",
            "User Journey Mapping",
            "EdTech",
            "Personalized Learning",
            "UI/UX"
        ],
        featured: true,
        articleUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7043913213268160514/",
        order: 5,
        publishDate: "2023-03-01"
    },
    {
        id: "6",
        slug: "ai-sales-forecasting-dashboard",
        title: "AI-Powered Sales Forecasting Dashboard",
        company: "Zero One Group (Client under NDA)",
        industry: "Web Dashboard / AI Analytics",
        period: "2025",
        summary: "Built an AI-powered dashboard enabling business users to forecast sales and explore performance insights through a conversational analytics interface.",
        challenge: "The client needed a way to move beyond static reporting and predefined dashboards. Business users struggled to manually analyze complex sales data to identify top performers or forecast trends, leading to delayed decision-making and missed opportunities.",
        process: [
            "Analyzed business requirements for sales forecasting and performance tracking",
            "Designed a conversational UI (ChatGPT-like) to enable natural language data querying",
            "Developed an AI engine to translate natural language questions into SQL/data queries",
            "Implemented dynamic charting capabilities that adapt visualizations based on the data context",
            "Integrated predictive modeling for future sales forecasting"
        ],
        solution: "Delivered a Generative AI-powered dashboard where users can ask broad questions about their business conditions (e.g., 'Top 5 outlets'). The system provides instant answers, generates relevant interactive charts, and offers AI-driven recommendations for improving sales performance.",
        tradeOffs:
            "Natural-language analytics is impressive in a demo and fragile in production. We traded open-ended querying for a constrained set of business questions that mapped to reliable data paths, keeping free-form exploration as a secondary path. That narrowed the promise but made the answers trustworthy.",
        technicalHurdles:
            "The model had to translate intent into SQL against a schema it did not control, then choose a visualization that matched the result. We needed to handle ambiguous questions, empty result sets, and charts that looked plausible but told the wrong story. Forecasts added a second layer: a confident-looking line can hide weak historical data.",
        retrospective:
            "I would define a failure taxonomy for the assistant on day one: ambiguous question, missing data, wrong aggregation, unsupported chart. We tested happy paths more thoroughly than failure states, and that is where user trust is won or lost.",
        visual: "dashboard",
        outcomes: [
            {
                metric: "Conversational Analytics",
                description: "Democratized data access with natural language querying"
            },
            {
                metric: "Predictive Insights",
                description: "Automated sales forecasting and trend analysis"
            },
            {
                metric: "Dynamic Visualization",
                description: "Charts generated on-the-fly based on user intent"
            }
        ],
        tags: ["AI/ML", "Dashboard", "Data Visualization", "Conversational UI", "B2B"],
        featured: true,
        order: 3,
        publishDate: "2025-04-01"
    },
    {
        id: "7",
        slug: "ai-talent-matching-dashboard",
        title: "AI-Powered Talent Matching Dashboard",
        company: "Zero One Group (Client under NDA)",
        industry: "Web Application / AI Matching System",
        period: "2025",
        summary: "Developed an AI-powered dashboard enabling organizations to optimize internal talent mobility by matching employees to open roles through a conversational interface.",
        challenge: "Organizations struggled to efficiently identify suitable internal candidates for open roles, leading to unnecessary external hiring and poor talent utilization. Existing systems lacked the intelligence to match qualitative skills and experience with job requirements.",
        process: [
            "Analyzed requirements for internal talent mobility and skill matching",
            "Designed bidirectional matching logic for Job-to-Employee and Employee-to-Job scenarios",
            "Developed a conversational AI interface for querying talent pools using natural language",
            "Implemented insight-driven recommendations to explain match quality",
            "Built a dashboard for visualizing talent alignment and workforce planning"
        ],
        solution: "Delivered an AI-driven talent matching platform where stakeholders can use natural language to find the best internal candidates. The system provides bidirectional recommendations, explains match reasoning, and facilitates data-driven workforce planning.",
        outcomes: [
            {
                metric: "Internal Mobility",
                description: "Optimized utilization of existing talent pools"
            },
            {
                metric: "Hiring Efficiency",
                description: "Reduced reliance on external recruitment for fillable roles"
            },
            {
                metric: "AI Precision",
                description: "Accelerated decision-making with explainable AI recommendations"
            }
        ],
        tags: ["AI/ML", "HR Tech", "Talent Matching", "Conversational UI", "B2B"],
        featured: true,
        order: 2,
        publishDate: "2025-06-01"
    }
]

export const getFeaturedCaseStudies = () => {
    return caseStudies
        .filter(cs => cs.featured)
        .sort((a, b) => a.order - b.order)
}

export const getCaseStudyBySlug = (slug: string) => caseStudies.find(cs => cs.slug === slug)
