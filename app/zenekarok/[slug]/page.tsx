import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getBandBySlug, getAllBandSlugs } from '@/src/lib/sanity/queries'
import { sanityImageUrl } from '@/src/lib/sanity/image'
import { DayBadge } from '@/src/components/ui/DayBadge'
import { SocialLinks } from '@/src/components/ui/SocialLinks'
import { MusicEmbed } from '@/src/components/ui/MusicEmbed'
import { SkylineDivider } from '@/src/components/ui/SkylineDivider'
import { dayTextClass, dayBorderClass, dayBgClass } from '@/src/config/colors'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

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

  const bandPhotoUrl = band.bandPhotoImage
    ? sanityImageUrl(band.bandPhotoImage).width(900).url()
    : null

  const bandLogoUrl = band.bandLogoImage
    ? sanityImageUrl(band.bandLogoImage).width(600).url()
    : null

  const dayAccent = dayTextClass(band.day)
  const dayBorder = dayBorderClass(band.day)
  const dayBg = dayBgClass(band.day)

  return (
    <article className="min-h-dvh bg-bg">
      {/* ── DESKTOP LAYOUT ── */}
      <div className="hidden md:flex min-h-dvh relative">

        {/* Left — concert photo */}
        <div className="relative w-[60%] overflow-hidden">
          {bandPhotoUrl ? (
            <Image
              src={bandPhotoUrl}
              alt={`${band.name} koncert fotó`}
              fill
              className="object-cover object-top grayscale"
              priority
              sizes="60vw"
            />
          ) : (
            <div className="absolute inset-0 bg-surface" />
          )}
          {/* Gradient toward the divider */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-bg/80" />
          {/* Logo top-left */}
          <div className="absolute top-6 left-6">
            <Link href="/" className="block">
              <Image
                src="/logo.png"
                alt="Miskolci Csendháborítás"
                width={140}
                height={48}
                className="invert opacity-80"
              />
            </Link>
            <DayBadge day={band.day} className="mt-2" />
          </div>
        </div>

        {/* Centre — vertical decorative text */}
        <div
          className="flex-shrink-0 w-20 flex items-center justify-center bg-bg overflow-hidden"
        >
          <span
            className={`font-display text-7xl font-black tracking-[-0.02em] ${dayAccent} select-none opacity-90`}
            style={{ writingMode: 'vertical-rl' }}
          >
            CSENDHABORÍTÁS
          </span>
        </div>

        {/* Right — band info */}
        <div className="flex-1 flex flex-col justify-between p-8 overflow-y-auto">
          {/* Band logo / name */}
          <div className="flex justify-center">
            {bandLogoUrl ? (
              <Image
                src={bandLogoUrl}
                alt={`${band.name} logo`}
                width={400}
                height={150}
                className="max-w-[280px] object-contain mb-4"
              />
            ) : (
              <h1 className={`font-display text-5xl tracking-widest ${dayAccent} mb-4`}>
                {band.name}
              </h1>
            )}
          </div>

          {/* Members */}
          {band.members && band.members.length > 0 && (() => {
            const count = band.members.length
            // 5,6,9 → 3 cols | 7,8 → 4 cols | otherwise min(count, 4)
            const cols = [5, 6, 9].includes(count) ? 3 : [7, 8].includes(count) ? 4 : Math.min(count, 4)
            return (
              <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
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
            <div className="mb-6 mt-10 text-right">
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

          {/* Social links + music embed */}
          <div className="space-y-4 flex flex-col items-end mb-8">
            {band.socialLinks && (
              <SocialLinks links={band.socialLinks} />
            )}
            {band.musicEmbedUrl && (
              <MusicEmbed url={band.musicEmbedUrl} />
            )}
          </div>

          {/* Set time bar */}
          <div className={`mt-auto pt-6 border-t ${dayBorder} flex items-center justify-between`}>
            <div>
              <p className="text-xs text-muted-fg font-body uppercase tracking-wider">
                Grizzly Music Pub · Csendháborítás
              </p>
              <p className={`font-display text-lg tracking-widest ${dayAccent}`}>
                {band.setTime ? `${band.setTime} ` : ''}
                <DayBadge day={band.day} />
                <span className="text-muted-fg ml-2">· Miskolc</span>
              </p>
            </div>
            <Link
              href="/program"
              className="text-xs font-display tracking-widest text-muted-fg hover:text-fg transition-colors flex items-center gap-1"
            >
              <ArrowLeft size={12} />
              PROGRAM
            </Link>
          </div>
        </div>
      </div>

      {/* ── MOBILE LAYOUT ── */}
      <div className="md:hidden">
        {/* Concert photo */}
        <div className="relative w-full aspect-[4/3] overflow-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg/90" />
          {/* Back link */}
          <Link
            href="/zenekarok"
            className="absolute top-4 left-4 flex items-center gap-2 text-fg/70 text-xs font-display tracking-widest"
          >
            <ArrowLeft size={14} /> ZENEKAROK
          </Link>
        </div>

        <div className="px-5 pb-24">
          {/* Band logo */}
          <div className="py-6">
            {bandLogoUrl ? (
              <Image
                src={bandLogoUrl}
                alt={`${band.name} logo`}
                width={300}
                height={100}
                className="max-w-[240px] object-contain"
              />
            ) : (
              <h1 className={`font-display text-4xl tracking-widest ${dayAccent}`}>
                {band.name}
              </h1>
            )}
            <DayBadge day={band.day} className="mt-2" />
          </div>

          {/* Members 2-col grid */}
          {band.members && band.members.length > 0 && (
            <div className="grid grid-cols-2 gap-3 mb-6">
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

          {/* Bio */}
          {band.bio && (
            <div className="mb-6 mt-8">
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

          {/* Social + embed */}
          <div className="space-y-4 mb-8">
            {band.socialLinks && <SocialLinks links={band.socialLinks} />}
            {band.musicEmbedUrl && <MusicEmbed url={band.musicEmbedUrl} />}
          </div>

          {/* Set time bar */}
          <div className={`border-t ${dayBorder} pt-4 mt-4`}>
            <p className="text-xs text-muted-fg font-body uppercase tracking-wider">
              Grizzly Music Pub · Csendháborítás · Miskolc
            </p>
            <p className={`font-display text-lg tracking-widest ${dayAccent} mt-1`}>
              {band.setTime && `${band.setTime} · `}
              <DayBadge day={band.day} />
            </p>
          </div>
        </div>

        {/* Skyline at bottom */}
        <SkylineDivider />
      </div>
    </article>
  )
}
