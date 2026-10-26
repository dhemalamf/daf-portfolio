import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from './config'

export { apiVersion, dataset, projectId }

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    // Read through the API (not the CDN) so unpublishing is immediate. Blog
    // routes use ISR, so this costs one request per revalidation window.
    useCdn: false,
    // Never let a Sanity outage hang a request for the default timeout.
    timeout: 8000,
})
