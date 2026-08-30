import { createImageUrlBuilder } from '@sanity/image-url'
import { client } from './client'

const builder = createImageUrlBuilder(client)

export function sanityImageUrl(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source)
}
