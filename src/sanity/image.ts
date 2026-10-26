import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from './client'

const builder = imageUrlBuilder(client)

/** Build a CDN URL for a Sanity image reference. */
export function urlFor(source: SanityImageSource) {
    return builder.image(source)
}
