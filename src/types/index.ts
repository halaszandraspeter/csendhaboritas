export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export interface BandMember {
  _key: string
  name: string
  photo?: SanityImage
}

export interface BandSocialLinks {
  spotify?: string
  soundcloud?: string
  appleMusic?: string
  instagram?: string
  facebook?: string
  youtube?: string
}

export interface Band {
  _id: string
  _type: 'band'
  name: string
  slug: { current: string }
  /** 1 = Október 9., 2 = Október 10. */
  day: 1 | 2
  /** Redesigned band logo image with event colour underlay */
  bandLogoImage?: SanityImage
  /** Pre-cut transparent PNG concert/live photo */
  bandPhotoImage?: SanityImage
  /** Rectangular crop used for grid cards */
  cardThumbnailImage?: SanityImage
  genre?: string
  bio?: string
  setTime?: string
  members?: BandMember[]
  socialLinks?: BandSocialLinks
  musicEmbedUrl?: string
}

export interface Sponsor {
  _key: string
  name: string
  logo?: SanityImage
  url?: string
}

export interface EventSocialLinks {
  facebook?: string
  instagram?: string
  tiktok?: string
}

export interface EventData {
  _id: string
  _type: 'event'
  name: string
  day1: string
  day2: string
  venue: string
  address: string
  mapEmbedUrl?: string
  venueDescription?: string
  venuePhotos?: SanityImage[]
  socialLinks?: EventSocialLinks
  sponsors?: Sponsor[]
}
