import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getBandBySlug, getAllBandSlugs, getEvent } from '@/src/lib/sanity/queries'
import { sanityImageUrl } from '@/src/lib/sanity/image'
import { DayBadge } from '@/src/components/ui/DayBadge'
import { SocialLinks } from '@/src/components/ui/SocialLinks'
import { MusicEmbed } from '@/src/components/ui/MusicEmbed'
import { DuotoneLogo } from '@/src/components/ui/DuotoneLogo'
import { dayTextClass, dayBorderClass, dayBgClass, colors } from '@/src/config/colors'
import Link from 'next/link'

export async function generateStaticParams() {
  const slugs = await getAllBandSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const band = await getBandBySlug(slug)
  if (!band) return {}
  return {
    title: band.name,
    description: band.bio
      ? band.bio.slice(0, 160)
      : `${band.name} a Miskolci Csendháborítás 2026 fellépői között.`,
  }
}

export default async function BandPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const band = await getBandBySlug(slug)

  if (!band) notFound()

  const event = await getEvent()
  const lightLogoUrl = event?.lightLogo
    ? sanityImageUrl(event.lightLogo).width(560).url()
    : '/logo-band.webp'

  const bandPhotoUrl = band.bandPhotoImage
    ? sanityImageUrl(band.bandPhotoImage).width(960).height(1200).url()
    : null

  const bandLogoUrl = band.bandLogoImage
    ? sanityImageUrl(band.bandLogoImage).width(600).url()
    : null

  const dayAccent = dayTextClass(band.day)
  const dayBorder = dayBorderClass(band.day)
  const dayBg = dayBgClass(band.day)
  const dayColor = band.day === 1 ? colors.day1 : colors.day2
  const useLogoEffect = band.logoShadowEffect !== false

  return (
    <article className="min-h-dvh bg-[#e5e5e5]">
      {/* ── DESKTOP LAYOUT ── */}
      <div className="hidden md:flex flex-col min-h-dvh relative">
        <div className="flex flex-1 relative pt-16 px-[3vw] xl:px-16 gap-[6vw] xl:gap-32">

          {/* Left — concert photo */}
          <div className="relative w-1/2 overflow-visible bg-black flex flex-col z-10">
            {/* Image wrapper — sticker is positioned relative to this */}
            <div className="relative pt-16">
              {/* Top gradient — fade from black into image */}
              <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
              {bandPhotoUrl ? (
                <Image
                  src={bandPhotoUrl}
                  alt={`${band.name} koncert fotó`}
                  width={960}
                  height={1200}
                  className="w-full h-auto grayscale"
                  priority
                  sizes="50vw"
                />
              ) : (
                <div className="aspect-4/5 bg-surface" />
              )}
              {/* Gradient toward the divider */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-bg/80 pointer-events-none" />
              {/* Event info sticker — opposite color to band's day */}
              <div className="absolute top-[80%] left-1/2 -translate-x-1/2 z-20 w-[min(480px,90%)]">
                <div className="relative">
                  <Image
                    src={band.day === 1 ? '/sticker-purple.webp' : '/sticker-green.webp'}
                    alt=""
                    width={480}
                    height={120}
                    className="w-full h-auto"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-black">
                    <span className="font-display text-sm lg:text-base xl:text-lg tracking-widest uppercase">
                      Grizzly Music Pub · Csendháborítás
                    </span>
                    <span className="font-display text-lg lg:text-xl xl:text-2xl tracking-widest font-bold">
                      {band.setTime ?? '--:--'} okt. {band.day === 1 ? '9' : '10'}. · Miskolc
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Music embed — below image */}
            {band.musicEmbedUrl && (
              <div className="relative z-20 px-4">
                <MusicEmbed url={band.musicEmbedUrl} />
              </div>
            )}
            {/* Logo top-left — sticks out of the picture */}
            <div className="absolute -top-10 -left-6 z-20 w-[clamp(280px,28vw,560px)]">
              <Link href="/" className="block">
                <Image
                  src={lightLogoUrl}
                  alt="Miskolci Csendháborítás"
                  width={560}
                  height={192}
                  className="w-full h-auto"
                />
              </Link>
              <div className={`${dayBg} inline-block mt-2 px-2 lg:px-3 py-1 lg:py-2`}>
                <span className="font-display text-lg lg:text-2xl xl:text-3xl font-bold tracking-widest text-black uppercase">
                  {band.name}
                </span>
              </div>
            </div>
          </div>

          {/* Centre — vertical decorative text */}
          <div
            className="absolute inset-y-0 left-[calc(50%-1.4rem)] -translate-x-1/2 flex items-center justify-center z-0 pointer-events-none"
          >
            <span
              className={`font-display text-[144px] font-black tracking-[0.05em] leading-none ${dayAccent} select-none opacity-90`}
              style={{ writingMode: 'vertical-rl' }}
            >
              CSENDHÁBORÍTÁS
            </span>
          </div>

          {/* Right — band info */}
          <div className="w-1/2 flex flex-col justify-between p-8 overflow-y-auto relative bg-black">
            {/* Background image */}
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src="/hero-bg.webp"
                alt=""
                width={900}
                height={1200}
                className="w-full h-auto"
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-bg/80" />
              <div className="absolute inset-0 bg-bg/60" />
            </div>
            {/* Band logo / name */}
            <div className="relative flex justify-center">
              {bandLogoUrl ? (
                useLogoEffect ? (
                  <DuotoneLogo
                    src={bandLogoUrl}
                    alt={`${band.name} logo`}
                    width={400}
                    height={150}
                    color="#e5e5e5"
                    shadowColor={dayColor}
                    imgClassName="max-w-[280px] object-contain"
                    className="mb-4"
                  />
                ) : (
                  <Image
                    src={bandLogoUrl}
                    alt={`${band.name} logo`}
                    width={400}
                    height={150}
                    className="max-w-[280px] object-contain mb-4"
                  />
                )
              ) : (
                <h1
                  className={`font-display text-5xl tracking-widest mb-4 ${useLogoEffect ? '' : dayAccent}`}
                  style={useLogoEffect ? { color: '#e5e5e5', textShadow: `4px 4px 0 ${dayColor}` } : undefined}
                >
                  {band.name}
                </h1>
              )}
            </div>

            {/* Members */}
            {band.members && band.members.length > 0 && (() => {
              const count = band.members.length
              // 5,6,9 → 3 cols | 7,8 → 4 cols | otherwise min(count, 4)
              const xlCols = [5, 6, 9].includes(count) ? 3 : [7, 8].includes(count) ? 4 : Math.min(count, 4)
              // Static class lookup for Tailwind to detect
              const xlColsClass = { 1: 'xl:grid-cols-1', 2: 'xl:grid-cols-2', 3: 'xl:grid-cols-3', 4: 'xl:grid-cols-4' }[xlCols] || 'xl:grid-cols-4'
              return (
                <div className={`relative grid grid-cols-2 ${xlColsClass} gap-2 xl:gap-4 mb-6`}>
                  {band.members.map((member) => {
                    const memberPhotoUrl = member.photo
                      ? sanityImageUrl(member.photo).width(300).height(300).url()
                      : null
                    const nameAlign = member.nameAlignment === 'right' ? 'right-0' : 'left-0'
                    return (
                      <div key={member._key} className="flex flex-col items-center">
                        <div className={`relative aspect-square w-full overflow-hidden border-2 ${dayBorder} bg-surface`}>
                          {memberPhotoUrl ? (
                            <Image
                              src={memberPhotoUrl}
                              alt={member.name}
                              width={150}
                              height={150}
                              className="object-cover grayscale w-full h-full"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted" />
                          )}
                          <span className={`absolute bottom-0 ${nameAlign} px-1 py-0.5 text-xs font-display tracking-widest uppercase text-black ${dayBg}`}>
                            {member.name}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })()}

            {/* Bio */}
            {band.bio && (
              <div className="relative mb-6 mt-10 text-right">
                <h2 className="font-display text-2xl tracking-widest mb-3">
                  <span className={`${dayBg} text-black px-2 py-1 box-decoration-clone`}>
                    MI VAGYUNK A {band.name.toUpperCase()}
                  </span>
                </h2>
                <div className="font-body text-base leading-[1.7]">
                  {band.bio.split('\n').map((line, i) => (
                    line.trim() === '' ? (
                      <div key={i} className="h-4" />
                    ) : (
                      <div key={i}>
                        <span className="bg-[#e5e5e5] text-black px-1 py-[0.15em] box-decoration-clone uppercase">
                          {line}
                        </span>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Social links */}
            <div className="relative space-y-4 flex flex-col items-end pb-32 lg:pb-28 xl:pb-24">
              {band.socialLinks && (
                <SocialLinks links={band.socialLinks} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE LAYOUT ── */}
      <div className="md:hidden bg-black">
        {/* Concert photo */}
        <div className="relative w-full aspect-4/5">
          <div className="absolute inset-0 overflow-hidden">
            {bandPhotoUrl ? (
              <Image
                src={bandPhotoUrl}
                alt={`${band.name} koncert fotó`}
                fill
                className="object-cover object-top grayscale"
                priority
                sizes="100vw"
              />
            ) : (
              <div className="absolute inset-0 bg-surface" />
            )}
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/90" />
          </div>
          {/* Band logo - top left overlay */}
          <div className="absolute top-3 left-3 z-20">
            {bandLogoUrl ? (
              useLogoEffect ? (
                <DuotoneLogo
                  src={bandLogoUrl}
                  alt={`${band.name} logo`}
                  width={100}
                  height={33}
                  color="#e5e5e5"
                  shadowColor={dayColor}
                  offset={2}
                  imgClassName="max-w-20 object-contain"
                />
              ) : (
                <Image
                  src={bandLogoUrl}
                  alt={`${band.name} logo`}
                  width={100}
                  height={33}
                  className="max-w-20 object-contain"
                />
              )
            ) : (
              <h1
                className={`font-display text-lg tracking-widest ${useLogoEffect ? '' : dayAccent}`}
                style={useLogoEffect ? { color: '#e5e5e5', textShadow: `2px 2px 0 ${dayColor}` } : undefined}
              >
                {band.name}
              </h1>
            )}
          </div>
          {/* Event info sticker */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-30 w-[min(360px,90%)]">
            <div className="relative">
              <Image
                src={band.day === 1 ? '/sticker-purple.webp' : '/sticker-green.webp'}
                alt=""
                width={360}
                height={90}
                className="w-full h-auto"
                aria-hidden="true"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-black">
                <span className="font-display text-lg tracking-widest uppercase">
                  Grizzly Music Pub · Csendháborítás
                </span>
                <span className="font-display text-[1.6rem] tracking-widest font-bold">
                  {band.setTime ?? '--:--'} okt. {band.day === 1 ? '9' : '10'}. · Miskolc
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 pb-24 pt-12">
          {/* Bio */}
          {band.bio && (
            <div className="mb-6">
              <h2 className="font-display text-xl tracking-widest mb-3">
                <span className={`${dayBg} text-black px-2 py-1 box-decoration-clone`}>
                  MI VAGYUNK A {band.name.toUpperCase()}
                </span>
              </h2>
              <div className="font-body text-base leading-[1.7]">
                {band.bio.split('\n').map((line, i) => (
                  line.trim() === '' ? (
                    <div key={i} className="h-4" />
                  ) : (
                    <div key={i}>
                      <span className="bg-[#e5e5e5] text-black px-1 py-[0.15em] box-decoration-clone uppercase">
                        {line}
                      </span>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {/* Members 2-col grid */}
          {band.members && band.members.length > 0 && (
            <div className="grid grid-cols-2 gap-3 mb-6 mt-8">
              {band.members.map((member) => {
                const memberPhotoUrl = member.photo
                  ? sanityImageUrl(member.photo).width(200).height(200).url()
                  : null
                const nameAlign = member.nameAlignment === 'right' ? 'right-0' : 'left-0'
                return (
                  <div key={member._key} className="flex flex-col items-center">
                    <div className={`relative aspect-square w-full overflow-hidden border-2 ${dayBorder} bg-surface`}>
                      {memberPhotoUrl ? (
                        <Image
                          src={memberPhotoUrl}
                          alt={member.name}
                          width={100}
                          height={100}
                          className="object-cover grayscale w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted" />
                      )}
                      <span className={`absolute bottom-0 ${nameAlign} px-1 py-0.5 text-[11px] font-display tracking-widest uppercase text-black ${dayBg}`}>
                        {member.name}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Social + embed */}
          <div className="space-y-4">
            {band.socialLinks && <SocialLinks links={band.socialLinks} />}
            {band.musicEmbedUrl && <MusicEmbed url={band.musicEmbedUrl} />}
          </div>
        </div>
      </div>
    </article>
  )
}
