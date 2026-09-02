import type { Metadata } from 'next'
import { getEvent } from '@/src/lib/sanity/queries'
import { footerOverlapPaddingClass } from '@/src/config/layout'

export const metadata: Metadata = {
  title: 'Házirend',
  description: 'A Miskolci Csendháborítás házirendje.',
}

export default async function HazirendPage() {
  const event = await getEvent()
  const rules = event?.rules ?? []

  return (
    <main className={`px-6 py-16 max-w-3xl mx-auto ${footerOverlapPaddingClass}`}>
      <h1 className="font-display text-4xl md:text-5xl tracking-widest text-fg text-center mb-12">
        HÁZIREND
      </h1>

      {rules.length > 0 ? (
        <>
          <div className="space-y-10">
            {rules.map((rule, idx) => {
              const lines = rule.description.split('\n').filter((line) => line.trim())
              return (
                <section key={rule._key} className="text-center">
                  <h2 className="font-display text-2xl md:text-3xl tracking-widest mb-3">
                    <span
                      className={`${idx % 2 === 0 ? 'bg-day1' : 'bg-day2'} text-black px-2 py-1 box-decoration-clone`}
                    >
                      {rule.title}
                    </span>
                  </h2>
                  <div className="font-body text-base leading-[1.7]">
                    {lines.map((line, i) => (
                      <div key={i}>
                        <span className="text-[#e5e5e5] uppercase">
                          {line}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )
            })}
          </div>

          {/* Closing */}
          <div className="mt-16 text-center">
            <p className="font-display text-lg tracking-widest text-fg/60">
              JÓ BULIZÁST KÍVÁN
            </p>
            <p className="font-display text-2xl tracking-widest text-fg mt-2">
              A SZERVEZŐK
            </p>
          </div>
        </>
      ) : (
        <div className="font-body text-base leading-relaxed text-fg/80 text-center">
          <p>Hamarosan...</p>
        </div>
      )}
    </main>
  )
}
