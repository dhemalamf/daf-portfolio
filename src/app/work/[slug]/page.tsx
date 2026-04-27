import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { caseStudies, getCaseStudyBySlug } from '@/data/caseStudies'
import CaseStudyContent from '@/components/CaseStudyContent'

interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params
    const caseStudy = getCaseStudyBySlug(slug)

    if (!caseStudy) {
        return { title: 'Not Found' }
    }

    return {
        title: `${caseStudy.title} | Dhema'alam Fajrianto`,
        description: caseStudy.summary,
    }
}

export async function generateStaticParams() {
    return caseStudies.map((cs) => ({
        slug: cs.slug,
    }))
}

export default async function CaseStudyPage({ params }: PageProps) {
    const { slug } = await params
    const caseStudy = getCaseStudyBySlug(slug)

    if (!caseStudy) {
        notFound()
    }

    const relatedStudies = caseStudies
        .filter(cs => cs.slug !== caseStudy.slug)
        .slice(0, 3)

    return <CaseStudyContent caseStudy={caseStudy} relatedStudies={relatedStudies} />
}
