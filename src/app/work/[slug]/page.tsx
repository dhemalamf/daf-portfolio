import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCaseStudies, getCaseStudyBySlug } from '@/content/caseStudies'
import CaseStudyContent from '@/components/CaseStudyContent'
import ContentUnavailable from '@/components/ContentUnavailable'
import JsonLd from '@/components/JsonLd'
import { siteUrl } from '@/lib/config'

interface PageProps {
    params: Promise<{ slug: string }>
}

// The webhook is the fast path; this is the floor if it is not configured.
export const revalidate = 3600

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params
    const lookup = await getCaseStudyBySlug(slug)

    if (lookup.status !== 'ok') {
        return { title: 'Not Found' }
    }

    const caseStudy = lookup.caseStudy

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
    const studies = await getCaseStudies()
    return studies.map((caseStudy) => ({
        slug: caseStudy.slug,
    }))
}

export default async function CaseStudyPage({ params }: PageProps) {
    const { slug } = await params
    const lookup = await getCaseStudyBySlug(slug)

    // The slug is confirmed absent: a real 404.
    if (lookup.status === 'not-found') {
        notFound()
    }

    // The CMS failed and the study is not in the static fallback. The page may
    // exist, so say so instead of pretending it does not.
    if (lookup.status === 'unavailable') {
        return <ContentUnavailable />
    }

    const caseStudy = lookup.caseStudy
    const allStudies = await getCaseStudies()
    const relatedStudies = allStudies
        .filter((study) => study.slug !== caseStudy.slug)
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
