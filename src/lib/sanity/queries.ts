import { cache } from 'react'
import { client } from './client'
import type { Band, EventData } from '@/src/types'

const isSanityConfigured =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'placeholder'

/**
 * Fetch all bands, ordered by day then set time.
 * Wrapped with React.cache() so multiple server components in the same
 * request tree share a single Sanity API call.
 */
export const getAllBands = cache(async (): Promise<Band[]> => {
  if (!isSanityConfigured) return []
  return client.fetch<Band[]>(
    `*[_type == "band"] | order(day asc, setTime asc) {
      _id, _type, name, slug, day, genre, setTime,
      bandLogoImage, bandPhotoImage, cardThumbnailImage,
      members[]{ _key, name, photo },
      socialLinks, musicEmbedUrl
    }`
  )
})

/**
 * Fetch a single band by slug.
 * Cached per slug value for deduplication between generateMetadata and the page component.
 */
export const getBandBySlug = cache(async (slug: string): Promise<Band | null> => {
  if (!isSanityConfigured) return null
  return client.fetch<Band | null>(
    `*[_type == "band" && slug.current == $slug][0] {
      _id, _type, name, slug, day, genre, bio, setTime,
      bandLogoImage, bandPhotoImage, cardThumbnailImage,
      members[]{ _key, name, photo },
      socialLinks, musicEmbedUrl
    }`,
    { slug }
  )
})

/** Fetch all band slugs for static param generation. */
export const getAllBandSlugs = cache(async (): Promise<string[]> => {
  if (!isSanityConfigured) return []
  const results = await client.fetch<{ slug: { current: string } }[]>(
    `*[_type == "band"]{ slug }`
  )
  return results.map((r) => r.slug.current)
})

/**
 * Fetch the singleton event document.
 * Cached so FooterWrapper + page components share one call per request.
 */
export const getEvent = cache(async (): Promise<EventData | null> => {
  if (!isSanityConfigured) return null
  return client.fetch<EventData | null>(
    `*[_type == "event"][0] {
      _id, _type, name, day1, day2, venue, address,
      mapEmbedUrl, venueDescription, venuePhotos,
      transportInfo, socialLinks,
      sponsors[]{ _key, name, logo, url }
    }`
  )
})
