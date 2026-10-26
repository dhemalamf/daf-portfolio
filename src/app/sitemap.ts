import type { MetadataRoute } from 'next'
import { caseStudies } from '@/data/caseStudies'
import { getPosts } from '@/sanity/queries'
import { siteUrl } from '@/lib/config'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: `${siteUrl}/`, changeFrequency: 'monthly', priority: 1 },
        { url: `${siteUrl}/about`, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${siteUrl}/work`, changeFrequency: 'monthly', priority: 0.9 },
        { url: `${siteUrl}/blog`, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${siteUrl}/contact`, changeFrequency: 'yearly', priority: 0.6 },
    ]

    const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((study) => ({
        url: `${siteUrl}/work/${study.slug}`,
        lastModified: new Date(study.publishDate),
        changeFrequency: 'yearly',
        priority: 0.7,
    }))

    // A CMS outage must not break the sitemap: fall back to the static routes.
    const blog = await getPosts()
    const postRoutes: MetadataRoute.Sitemap = blog.ok
        ? blog.data.map((post) => ({
              url: `${siteUrl}/blog/${post.slug.current}`,
              lastModified: new Date(post.publishedAt),
              changeFrequency: 'yearly',
              priority: 0.6,
          }))
        : []

    return [...staticRoutes, ...caseStudyRoutes, ...postRoutes]
}
