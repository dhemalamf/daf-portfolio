export interface CaseStudy {
    id: string
    slug: string
    title: string
    company: string
    industry: string
    period: string
    summary: string
    challenge: string
    process: string[]
    solution: string
    outcomes: {
        metric: string
        description: string
    }[]
    tags: string[]
    featured: boolean
    articleUrl?: string
    publishDate: string // YYYY-MM-DD
}

export const caseStudies: CaseStudy[] = [
    {
        id: "3",
        slug: "sampoerna-due-diligence",
        title: "HM Sampoerna Technical Due Diligence",
        company: "HM Sampoerna",
        industry: "Enterprise / FMCG",
        period: "2025",
        summary: "Led technical product assessment for HM Sampoerna's system decoupling initiative, providing strategic recommendations for technology modernization.",
        challenge: "HM Sampoerna required an independent technical assessment of their existing systems to inform a major decoupling initiative. The goal was to identify dependencies, risks, and opportunities for modernization.",
        process: [
            "Assembled and led cross-functional technical assessment team",
            "Conducted comprehensive system architecture review",
            "Interviewed key stakeholders across technology and business units",
            "Mapped system dependencies and integration points",
            "Developed risk assessment framework and mitigation strategies",
        ],
        solution: "Delivered comprehensive due diligence report with actionable recommendations for system decoupling, including phased migration strategy, risk mitigation plans, and technology stack recommendations.",
        outcomes: [
            {
                metric: "Strategic",
                description: "Comprehensive technical assessment",
            },
            {
                metric: "Actionable",
                description: "Clear decoupling roadmap",
            },
            {
                metric: "Risk-Aware",
                description: "Detailed mitigation strategies",
            },
        ],
        tags: ["Enterprise", "Due Diligence", "System Architecture", "Consulting"],
        featured: true,
        publishDate: "2025-01-01"
    },
    {
        id: "1",
        slug: "ai-lms-platform",
        title: "AI-Powered Learning Management System",
        company: "Zero One Group (Client under NDA)",
        industry: "Edtech / AI",
        period: "2023",
        summary: "Led the development of a comprehensive AI-enabled learning platform that personalizes educational content and automates assessment processes.",
        challenge: "The client needed a modern LMS that could scale to thousands of users while providing personalized learning paths. Traditional LMS solutions lacked the intelligence to adapt to individual learner needs, resulting in poor completion rates and engagement.",
        process: [
            "Conducted extensive user research with educators and learners to map pain points",
            "Defined product vision and roadmap aligned with business objectives",
            "Collaborated with AI/ML team to design recommendation and assessment algorithms",
            "Led agile sprints with cross-functional team of designers and engineers",
            "Implemented data-driven iteration based on user feedback and analytics",
        ],
        solution: "Developed an AI-powered LMS featuring personalized learning paths, automated content recommendations, intelligent assessment generation, and real-time progress analytics. The platform adapts to each learner's pace and style.",
        outcomes: [
            {
                metric: "AI-Powered",
                description: "Personalized learning recommendations",
            },
            {
                metric: "Comprehensive",
                description: "End-to-end learning experience",
            },
            {
                metric: "Scalable",
                description: "Architecture supporting thousands of concurrent users",
            },
        ],
        tags: ["AI/ML", "Edtech", "Product Strategy", "User Research"],
        featured: true,
        publishDate: "2023-06-01"
    },
    {
        id: "5",
        slug: "apiary-academy-learning-platform",
        title: "Personalized Learning Platform – Apiary Academy",
        company: "Apiary Academy (Product Design Challenge)",
        industry: "Competition",
        period: "2023",
        summary: "Designed a personalized learning platform concept focused on helping young professionals discover relevant courses, understand learning outcomes, and track acquired skills through curated recommendations and goal-based learning flows.",
        challenge: "Learners struggled to find relevant learning materials, understand what skills they would gain after completing courses, and manage courses of interest. Existing platforms lacked clear skill visibility, personalization, and efficient discovery mechanisms.",
        process: [
            "Defined problem statements using HMW questions around skill visibility, personalization, discovery, and saving courses",
            "Conducted competitor analysis of platforms such as Coursera, Udemy, and LinkedIn Learning to identify feature gaps",
            "Developed a primary user persona (young professional aged 21–25) with clear goals, behaviors, and constraints",
            "Mapped an end-to-end user journey from discovery to learning completion to identify friction points",
            "Designed proposed user flows covering onboarding, exploration, purchase, and learning stages",
            "Created wireframes, high-fidelity UI, and interactive prototypes, followed by usability validation with respondents"
        ],
        solution: "Proposed a personalized learning experience where users define career goals during onboarding, receive curated course recommendations, clearly see expected skill outcomes on course detail pages, save courses to favorites, and track ongoing learning progress within a streamlined home experience.",
        outcomes: [
            {
                metric: "8.5 / 10",
                description: "Average UI design rating from usability testing respondents"
            },
            {
                metric: "8.9 / 10",
                description: "Average UX flow rating from usability testing respondents"
            },
            {
                metric: "100%",
                description: "Respondents understood course outcomes and found curated courses helpful"
            }
        ],
        tags: ["Product Design", "UX Research", "Edtech", "Learning Platform", "UI/UX"],
        featured: true,
        articleUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7043913213268160514/",
        publishDate: "2023-03-01"
    },
    {
        id: "2",
        slug: "transfez-mobile-app",
        title: "Transfez Mobile App",
        company: "Transfez",
        industry: "Fintech / Payments",
        period: "2023",
        summary: "Spearheaded the mobile app development for Indonesia's leading cross-border payment platform, driving significant growth in user acquisition and transaction volume.",
        challenge: "Transfez needed to expand beyond web to mobile to capture a larger market share. The challenge was creating a seamless, trustworthy experience for international money transfers while navigating complex regulatory requirements.",
        process: [
            "Analyzed competitor landscape and identified differentiation opportunities",
            "Led user research to understand pain points in cross-border payments",
            "Defined mobile-first product strategy and feature prioritization",
            "Worked closely with compliance team to ensure regulatory adherence",
            "Orchestrated phased rollout with continuous user feedback loops",
        ],
        solution: "Launched a feature-rich mobile app with streamlined onboarding, real-time exchange rates, transparent fee structure, and robust KYC processes. Focused on building trust through clear communication and reliable service.",
        outcomes: [
            {
                metric: "Rp 2 Trillion+",
                description: "Total transfer volume processed",
            },
            {
                metric: "55% Increase",
                description: "Growth in verified user base",
            },
            {
                metric: "Mobile-First",
                description: "Native experience for iOS and Android",
            },
        ],
        tags: ["Fintech", "Mobile", "User Growth", "Compliance"],
        featured: true,
        publishDate: "2022-01-01"
    },
    {
        id: "4",
        slug: "revamping-dana-indonesia",
        title: "Product Journey: Revamping DANA Indonesia",
        company: "DANA Indonesia (Academic Project)",
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
        publishDate: "2021-12-01"
    }
]

export const getFeaturedCaseStudies = () => {
    return caseStudies
        .filter(cs => cs.featured)
        .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
}

export const getCaseStudyBySlug = (slug: string) => caseStudies.find(cs => cs.slug === slug)
