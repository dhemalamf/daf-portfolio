import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { caseStudies, getCaseStudyBySlug } from '@/data/caseStudies'
import CaseStudyContent from '@/components/CaseStudyContent'
import JsonLd from '@/components/JsonLd'
import { siteUrl } from '@/lib/config'

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
        title: caseStudy.title,
        description: caseStudy.summary,
        alternates: { canonical: `/work/${caseStudy.slug}` },
        openGraph: {
            title: caseStudy.title,
            description: caseStudy.summary,
            type: 'article',
            url: `/work/${caseStudy.slug}`,
        },
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

    const url = `${siteUrl}/work/${caseStudy.slug}`

    return (
        <>
            <JsonLd
                data={[
                    {
                        '@context': 'https://schema.org',
                        '@type': 'Article',
                        headline: caseStudy.title,
                        description: caseStudy.summary,
                        datePublished: caseStudy.publishDate,
                        author: {
                            '@type': 'Person',
                            name: "Dhema'alam Fajrianto",
                            url: siteUrl,
                        },
                        image: `${siteUrl}/og-image.png`,
                        mainEntityOfPage: url,
                        about: caseStudy.industry,
                        keywords: caseStudy.tags.join(', '),
                    },
                    {
                        '@context': 'https://schema.org',
                        '@type': 'BreadcrumbList',
                        itemListElement: [
                            { '@type': 'ListItem', position: 1, name: 'Work', item: `${siteUrl}/work` },
                            { '@type': 'ListItem', position: 2, name: caseStudy.title, item: url },
                        ],
                    },
                ]}
            />
            <CaseStudyContent caseStudy={caseStudy} relatedStudies={relatedStudies} />
        </>
    )
}
