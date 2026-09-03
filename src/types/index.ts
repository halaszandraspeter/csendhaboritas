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
  nameAlignment?: 'left' | 'right'
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
  /** When true (default), the logo/name renders white with a day-colour offset shadow */
  logoShadowEffect?: boolean
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

export interface Activity {
  _id: string
  _type: 'activity'
  name: string
  /** 1 = Október 9., 2 = Október 10. */
  day: 1 | 2
  setTime?: string
  image?: SanityImage
  description?: string
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

export interface EventRule {
  _key: string
  title: string
  description: string
}

export interface Organizer {
  _key: string
  name: string
  role?: string
  email?: string
  mobile?: string
}

export interface EventData {
  _id: string
  _type: 'event'
  name: string
  isActive?: boolean
  /** Event days as ISO 'YYYY-MM-DD' strings; order defines day 1, day 2… */
  days?: string[]
  year?: string
  city?: string
  heroDescription?: string
  venue: string
  address: string
  mapEmbedUrl?: string
  venueDescription?: string
  venuePhotos?: SanityImage[]
  transportInfo?: string
  socialLinks?: EventSocialLinks
  sponsors?: Sponsor[]
  rules?: EventRule[]
  organizers?: Organizer[]
  ogImage?: SanityImage
  mainLogo?: SanityImage
  lightLogo?: SanityImage
}
