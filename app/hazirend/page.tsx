import type { Metadata } from 'next'
import { getEvent } from '@/src/lib/sanity/queries'
import { footerOverlapPaddingClass } from '@/src/config/layout'

export const metadata: Metadata = {
  title: 'Házirend',
  description: 'A Miskolci Csendháborítás házirendje.',
}

const paperEdgeVariants = [
  'polygon(2% 0%, 8% 3%, 15% 0%, 22% 2%, 30% 0%, 38% 3%, 45% 1%, 52% 0%, 60% 2%, 68% 0%, 75% 3%, 82% 1%, 90% 0%, 95% 2%, 100% 0%, 98% 8%, 100% 15%, 98% 22%, 100% 30%, 98% 38%, 100% 45%, 98% 52%, 100% 60%, 98% 68%, 100% 75%, 98% 82%, 100% 90%, 98% 95%, 100% 100%, 95% 98%, 90% 100%, 82% 98%, 75% 100%, 68% 98%, 60% 100%, 52% 98%, 45% 100%, 38% 98%, 30% 100%, 22% 98%, 15% 100%, 8% 98%, 2% 100%, 0% 100%, 2% 90%, 0% 82%, 2% 75%, 0% 68%, 2% 60%, 0% 52%, 2% 45%, 0% 38%, 2% 30%, 0% 22%, 2% 15%, 0% 8%, 2% 2%, 0% 0%)',
  'polygon(0% 2%, 7% 0%, 14% 2%, 21% 0%, 29% 3%, 37% 1%, 46% 3%, 55% 0%, 64% 2%, 73% 0%, 81% 3%, 90% 1%, 98% 3%, 100% 0%, 98% 10%, 100% 19%, 97% 28%, 100% 37%, 98% 47%, 100% 56%, 97% 66%, 100% 76%, 98% 86%, 100% 98%, 92% 100%, 84% 97%, 75% 100%, 66% 98%, 57% 100%, 48% 97%, 39% 100%, 30% 98%, 21% 100%, 12% 97%, 2% 100%, 0% 91%, 3% 82%, 0% 73%, 2% 64%, 0% 54%, 3% 45%, 0% 35%, 2% 25%, 0% 14%, 3% 7%, 0% 2%)',
  'polygon(3% 1%, 11% 3%, 19% 0%, 27% 2%, 35% 1%, 43% 4%, 51% 1%, 59% 3%, 67% 0%, 76% 2%, 85% 1%, 93% 3%, 100% 1%, 97% 9%, 100% 18%, 98% 27%, 100% 36%, 97% 45%, 100% 55%, 98% 64%, 100% 73%, 97% 83%, 100% 92%, 98% 100%, 89% 97%, 80% 100%, 71% 98%, 62% 100%, 53% 97%, 44% 100%, 35% 98%, 26% 100%, 17% 97%, 8% 100%, 0% 98%, 3% 89%, 0% 80%, 2% 71%, 0% 62%, 3% 53%, 0% 44%, 2% 35%, 0% 26%, 3% 17%, 0% 8%, 3% 1%)',
]

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
                <section
                  key={rule._key}
                  className={`${idx % 2 === 0 ? 'bg-neutral-300 -rotate-2 text-neutral-900' : 'bg-neutral-500 rotate-2 text-neutral-100'} p-8 pt-12 md:p-10 md:pt-14 shadow-lg transform ${idx % 2 === 0 ? 'text-left' : 'text-right'}`}
                  style={{
                    clipPath:
                      paperEdgeVariants[idx % paperEdgeVariants.length],
                  }}
                >
                  <h2 className="font-display text-3xl md:text-4xl tracking-widest mb-3 text-center">
                    <span
                      className={`${idx % 2 === 0 ? 'bg-day1' : 'bg-day2'} text-black px-2 py-1 box-decoration-clone`}
                    >
                      {rule.title}
                    </span>
                  </h2>
                  <div
                    className={`font-body text-lg font-medium leading-[1.7] text-center ${idx % 2 === 0 ? 'text-neutral-600' : 'text-neutral-200'}`}
                  >
                    {lines.map((line, i) => (
                      <div key={i}>
                        <span className="uppercase">{line}</span>
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
