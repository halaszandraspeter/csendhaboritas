import { cache } from 'react'
import { defineQuery } from 'next-sanity'
import { client } from './client'
import type { Activity, Band, EventData } from '@/src/types'

const isSanityConfigured =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'placeholder'

// ---------------------------------------------------------------------------
// Query definitions — TypeGen reads these to generate per-query result types.
// Return types below use src/types until TypeGen regenerates sanity.types.ts.
// ---------------------------------------------------------------------------

const ALL_BANDS_QUERY = defineQuery(`
  *[_type == "band" && event._ref == *[_type == "event" && isActive == true][0]._id] | order(day asc, setTime asc) {
    _id, _type, name, slug, day, genre, setTime,
    bandLogoImage, bandPhotoImage, cardThumbnailImage,
    members[]{ _key, name, photo },
    socialLinks, musicEmbedUrl
  }
`)

const BAND_BY_SLUG_QUERY = defineQuery(`
  *[_type == "band" && slug.current == $slug && event._ref == *[_type == "event" && isActive == true][0]._id][0] {
    _id, _type, name, slug, day, genre, bio, setTime,
    bandLogoImage, bandPhotoImage, cardThumbnailImage, logoShadowEffect,
    members[]{ _key, name, photo },
    socialLinks, musicEmbedUrl
  }
`)

const ALL_BAND_SLUGS_QUERY = defineQuery(`
  *[_type == "band" && event._ref == *[_type == "event" && isActive == true][0]._id]{ slug }
`)

const ALL_ACTIVITIES_QUERY = defineQuery(`
  *[_type == "activity" && event._ref == *[_type == "event" && isActive == true][0]._id] | order(day asc, setTime asc) {
    _id, _type, name, day, setTime, image, description
  }
`)

const EVENT_QUERY = defineQuery(`
  *[_type == "event" && isActive == true][0] {
    _id, _type, name, days, year, city, heroDescription, venue, address,
    mapEmbedUrl, venueDescription, venuePhotos,
    transportInfo, socialLinks, ogImage, mainLogo, lightLogo,
    sponsors[]{ _key, name, logo, url, isMain },
    rules[]{ _key, title, description },
    organizers[]{ _key, name, role, email, mobile }
  }
`)

// ---------------------------------------------------------------------------
// Cached fetchers — React.cache() deduplicates calls within one request tree
// ---------------------------------------------------------------------------

/**
 * Fetch all bands, ordered by day then set time.
 */
export const getAllBands = cache(async (): Promise<Band[]> => {
  if (!isSanityConfigured) return []
  return client.fetch(ALL_BANDS_QUERY) as Promise<Band[]>
})

/**
 * Fetch a single band by slug.
 * Cached per-slug so generateMetadata and the page component share one call.
 */
export const getBandBySlug = cache(async (slug: string): Promise<Band | null> => {
  if (!isSanityConfigured) return null
  return client.fetch(BAND_BY_SLUG_QUERY, { slug }) as Promise<Band | null>
})

/**
 * Fetch all program activities, ordered by day then time.
 */
export const getAllActivities = cache(async (): Promise<Activity[]> => {
  if (!isSanityConfigured) return []
  return client.fetch(ALL_ACTIVITIES_QUERY) as Promise<Activity[]>
})

/** Fetch all band slugs for static param generation. */
export const getAllBandSlugs = cache(async (): Promise<string[]> => {
  if (!isSanityConfigured) return []
  const results = await client.fetch(ALL_BAND_SLUGS_QUERY)
  return results.map((r: { slug?: { current?: string } }) => r.slug?.current ?? '')
})

/**
 * Fetch the singleton event document.
 * Cached so FooterWrapper + helyszin page share one call per request.
 */
export const getEvent = cache(async (): Promise<EventData | null> => {
  if (!isSanityConfigured) return null
  return client.fetch(EVENT_QUERY) as Promise<EventData | null>
})
