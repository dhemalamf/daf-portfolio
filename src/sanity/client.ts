import { createClient } from 'next-sanity'

// Hardcoded as fallback since these are public values
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'js6xvhgj'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = '2024-01-01'

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false, // Disable CDN for fresh content (unpublish works immediately)
})
