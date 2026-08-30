import { client } from './client'
import type { Band, EventData } from '@/src/types'

const isSanityConfigured =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'placeholder'

/** Fetch all bands, ordered by day then set time */
export async function getAllBands(): Promise<Band[]> {
  if (!isSanityConfigured) return []
  return client.fetch<Band[]>(
    `*[_type == "band"] | order(day asc, setTime asc) {
      _id, _type, name, slug, day, genre, setTime,
      bandLogoImage, bandPhotoImage, cardThumbnailImage,
      members[]{ _key, name, photo },
      socialLinks, musicEmbedUrl
    }`
  )
}

/** Fetch a single band by slug */
export async function getBandBySlug(slug: string): Promise<Band | null> {
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
}

/** Fetch all band slugs for static param generation */
export async function getAllBandSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return []
  const results = await client.fetch<{ slug: { current: string } }[]>(
    `*[_type == "band"]{ slug }`
  )
  return results.map((r) => r.slug.current)
}

/** Fetch the singleton event document */
export async function getEvent(): Promise<EventData | null> {
  if (!isSanityConfigured) return null
  return client.fetch<EventData | null>(
    `*[_type == "event"][0] {
      _id, _type, name, day1, day2, venue, address,
      mapEmbedUrl, venueDescription, venuePhotos,
      transportInfo, socialLinks,
      sponsors[]{ _key, name, logo, url }
    }`
  )
}
