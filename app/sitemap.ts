import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/src/config/site'
import { getAllBandSlugs } from '@/src/lib/sanity/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllBandSlugs()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/program`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/helyszin`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/hazirend`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/kapcsolat`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/tamogatok`, changeFrequency: 'monthly', priority: 0.5 },
  ]

  const bandRoutes: MetadataRoute.Sitemap = slugs
    .filter(Boolean)
    .map((slug) => ({
      url: `${SITE_URL}/fellepok/${slug}`,
      changeFrequency: 'weekly',
      priority: 0.8,
    }))

  return [...staticRoutes, ...bandRoutes]
}
