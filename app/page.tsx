import { getAllBands, getEvent } from '@/src/lib/sanity/queries'
import { HeroSection } from '@/src/components/sections/HeroSection'
import { ProgramSnippet } from '@/src/components/sections/ProgramSnippet'
import { HelyszinSnippet } from '@/src/components/sections/HelyszinSnippet'
import { BandGridSection } from '@/src/components/sections/BandGridSection'
import { footerOverlapPaddingClass } from '@/src/config/layout'

export default async function Kezdolap() {
  const [bands, event] = await Promise.all([getAllBands(), getEvent()])

  const day1Bands = bands.filter((b) => b.day === 1)
  const day2Bands = bands.filter((b) => b.day === 2)

  return (
    <div className={footerOverlapPaddingClass}>
      <HeroSection event={event} />
      <ProgramSnippet day1Bands={day1Bands} day2Bands={day2Bands} event={event} />
      <HelyszinSnippet event={event} />
      <BandGridSection day1Bands={day1Bands} day2Bands={day2Bands} event={event} />
    </div>
  )
}
