# Miskolci Csendháborítás — Website Plan

> Shared understanding document. Confirmed: 2026-08-30.

---

## Stack

| | |
|---|---|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS · shadcn/ui · tailwindcss-animate · clsx + tailwind-merge + CVA |
| CMS | Sanity |
| Carousel | embla-carousel-react |
| Analytics | @vercel/analytics + @vercel/speed-insights |
| Fonts | Bebas Neue (display) + Inter (body) — referenced in `src/config/fonts.ts` |
| Deploy | Vercel |

---

## Design tokens

Defined in `src/config/colors.ts` and `tailwind.config.ts`.

| Token | Value | Used for |
|---|---|---|
| `bg` | `#000000` | Base background |
| `fg` | `#FFFFFF` | Body text, logo |
| `day1` | `~#AADD00` lime green | Day 1 (Október 9.) — all accents |
| `day2` | `~#F050E0` hot pink | Day 2 (Október 10.) — all accents |

---

## Pages & routing

```
/                    → Kezdőlap
/program             → Program
/helyszin            → Helyszín
/zenekarok           → Zenekarok (band grid)
/zenekarok/[slug]    → Individual band page
```

---

## Navigation

- **Desktop**: Symmetrical header bar — `Kezdőlap · Program · Helyszín · Zenekarok`
- **Mobile**: Bottom tab bar — 4 icons + labels, same order

---

## Home page (Kezdőlap) — scroll order

1. **Hero** — full-bleed B&W concert photo, logo centered, "Október 9–10 · Grizzly Music Pub, Miskolc", Facebook + Instagram + TikTok icons, Miskolc skyline at bottom edge
2. **Program snippet** — two-day teaser with green/pink date labels, CTA → `/program`
3. **Helyszín snippet** — venue name + address, CTA → `/helyszin`
4. **Band grid** — all 12 bands as dark photo cards, grouped: Day 1 (green header) / Day 2 (pink header)

---

## Program page

Two-column split:

- **Left — Day 1, Október 9.** (green): TISZTAKOSZ · YÜREI · RISINGS · ÉGITESTEK · LITTLE MISS · TELTHÁZ
- **Right — Day 2, Október 10.** (pink): LIES · BLISS · DAY OUT · PUB VATIS · DEMPY · LIBERTÉ

Each entry shows band name + set time. Mobile: Day 1 stacks above Day 2.

---

## Helyszín page

- Grizzly Music Pub — name, address
- Google Maps embed
- Venue description
- Transport / parking info
- Venue photos

---

## Zenekarok page (band grid)

12 dark photo cards: rectangular crop + dark overlay + band name + day color badge.
Clicking a card navigates to `/zenekarok/[slug]`.

---

## Band page (`/zenekarok/[slug]`)

### Desktop layout
| Zone | Content |
|---|---|
| Left ~60% | Pre-cut transparent PNG (concert photo), logo top-left, band name badge (day color), Miskolc skyline at bottom |
| Center | Vertical "CSENDHABORÍTÁS" divider (`writing-mode: vertical-rl`) |
| Right ~40% | Band logo image (redesigned, day-color underlay) · Member portrait grid (optional) · Bio · Social links + music embed · Set time bar pinned at bottom |

### Mobile layout (stacked, top → bottom)
1. Concert photo (full width)
2. Band logo image
3. Member grid — 2×2 (if provided)
4. Bio
5. Social links + music player
6. Set time bar

### Day color rule
Driven entirely by the `day` field in Sanity (`1` → lime green, `2` → hot pink). No manual override per band.

---

## Footer (every page)

```
[Miskolc skyline motif — top divider]
MISKOLCI CSENDHÁBORÍTÁS
Kezdőlap · Program · Helyszín · Zenekarok
[Facebook]  [Instagram]  [TikTok]
[Sponsor logos row]
© 2026 Miskolci Csendháborítás
```

---

## Sanity schemas

### `event` (singleton)
| Field | Type |
|---|---|
| `dates` | `{ day1: date, day2: date }` |
| `venue` | string |
| `address` | string |
| `mapEmbedUrl` | url |
| `venueDescription` | text |
| `venuePhotos` | image[] |
| `socialLinks` | `{ facebook: url, instagram: url, tiktok: url }` |
| `sponsors` | `[{ name: string, logo: image, url: url }]` |

### `band`
| Field | Type | Required |
|---|---|---|
| `name` | string | ✅ |
| `slug` | slug | ✅ |
| `day` | number (1 or 2) | ✅ |
| `bandLogoImage` | image | ✅ |
| `bandPhotoImage` | image (cut-out PNG) | ✅ |
| `cardThumbnailImage` | image (rectangular crop) | ✅ |
| `genre` | string | ✅ |
| `bio` | rich text | ✅ |
| `setTime` | string (e.g. "22:30") | ✅ |
| `members` | `[{ name: string, photo: image }]` | ⬜ optional |
| `socialLinks` | `{ spotify?, soundcloud?, appleMusic?, instagram?, facebook?, youtube? }` | ⬜ optional |
| `musicEmbedUrl` | url | ⬜ optional |

---

## Confirmed band lineup

| Day 1 — Október 9. | Day 2 — Október 10. |
|---|---|
| TISZTAKOSZ | LIES |
| YÜREI | BLISS |
| RISINGS | DAY OUT |
| ÉGITESTEK | PUB VATIS |
| LITTLE MISS | DEMPY |
| TELTHÁZ | LIBERTÉ |

---

## Assets to be provided by design team

- [ ] Pre-cut transparent PNG per band (concert/live photo with organic cut-out edges)
- [ ] Redesigned band logo per band (with day-color underlay)
- [ ] Card thumbnail image per band (rectangular crop)
- [ ] Member photos per band (optional, where available)
- [ ] Venue photos
- [ ] Sponsor logos

---

## Key implementation notes

- All font references go through `src/config/fonts.ts` — swap without touching components
- Color tokens defined once in `tailwind.config.ts` — `day1` and `day2` used everywhere via Tailwind classes
- Sanity drives all content; no data is hardcoded in components
- No authentication / authorization in scope for v1
- Language: Hungarian only (no i18n layer needed)
- Animations: Tailwind transitions + tailwindcss-animate only — no Framer Motion
- shadcn/ui for all base UI primitives (cards, badges, dialogs, etc.)
- `@vercel/analytics` + `@vercel/speed-insights` added from day one
