import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Házirend',
  description: 'A Miskolci Csendháborítás házirendje.',
}

type RuleSection = {
  header: string
  lines: string[]
}

const rules: RuleSection[] = [
  {
    header: 'BELÉPÉS = BELEEGYEZÉS',
    lines: [
      'A Miskolci Csendháborítás területére (Grizzly Music Pub, Városház tér 3.) belépve elfogadod a házirendet.',
      'Ez vonatkozik rád és az általad felügyelt kiskorúakra is.',
      'A rendezők ellenőrizhetik a betartását.',
    ],
  },
  {
    header: 'LEFOTÓZUNK, ÉS EZZEL HÍRESSÉ TESZÜNK',
    lines: [
      'A rendezvény területén kép-, hang- és filmfelvételek készülhetnek.',
      'Belépéssel hozzájárulsz, hogy ezeket promóciós célokra felhasználjuk.',
      'Megnevezni csak a beleegyezéseddel fogunk.',
    ],
  },
  {
    header: 'A KARSZALAG A KULCS',
    lines: [
      'A papír karszalagod a belépőd.',
      'Karszalag nélkül nincs belépés, nincs visszaengedés.',
      'Őrizd meg, ne veszítsd el, ne tépd le!',
    ],
  },
  {
    header: 'FEGYVERT ITT NEM HORDUNK',
    lines: [
      'A mások testi épségét veszélyeztető tárgyakat tilos behozni.',
      'A biztonsági személyzet elveheti, amit nem kellene nálad látnunk.',
      'Jogszabályba ütköző tárgyakat a hatóságoknak adjuk át.',
    ],
  },
  {
    header: 'ÉRTÉKEIDRE TE VIGYÁZZ',
    lines: [
      'A cuccaidért te felelsz.',
      'Pénz, telefon, táska – a te dolgod.',
      'Nem vállalunk felelősséget elveszett vagy ellopott értékekért.',
    ],
  },
  {
    header: 'ITT JÓZANNAK LENNI NEM KÖTELEZŐ, DE HÜLYÉNEK LENNI TILOS',
    lines: [
      'Ha nem tudsz viselkedni, a biztonsági személyzet kikísérhet.',
      'Erősen ittas vagy bódult állapotban a belépést megtagadhatjuk.',
      'Lehetsz részeg, de legyél jó fej!',
    ],
  },
  {
    header: 'AZ ERKÉLY A ZENÉSZEKÉ',
    lines: [
      'A második épület tetején lévő erkély csak a zenészeknek van fenntartva.',
      'Ide a közönség nem mehet fel.',
    ],
  },
  {
    header: 'A SZÍNPAD NEM MÁSZÓKA',
    lines: [
      'A színpadokra, dekorációkra és installációkra felmászni tilos.',
      'Ha leesnél, az a te bajod – és a miénk is.',
    ],
  },
  {
    header: 'DOHÁNYOZZ KINT',
    lines: [
      'Dohányozni csak a szabadtéri területeken szabad.',
      'Bent ne gyújts rá!',
    ],
  },
  {
    header: 'NE TÖRJ, NE RONGÁLJ',
    lines: [
      'Szándékos rongálásnak következményei vannak.',
      'Tiszteld a helyszínt, ahogy a zenét is tiszteled.',
    ],
  },
  {
    header: 'FOTÓZZ BÁTRAN, DE POSZTOLÁSHOZ KÉRJ ENGEDÉLYT',
    lines: [
      'Fotókat és videókat készíthetsz magadnak.',
      'A koncertfelvételek publikálásához a fellépők írásos engedélye kell.',
    ],
  },
  {
    header: 'A FÖLD NEM SZEMETESKUKA',
    lines: [
      'Ne szemetelj!',
      'Használd a kukákat.',
      'A Föld nem a tied, csak kölcsönkaptad.',
    ],
  },
]

export default function HazirendPage() {
  return (
    <main className="px-6 py-16 max-w-3xl mx-auto">
      <h1 className="font-display text-4xl md:text-5xl tracking-widest text-fg text-center mb-12">
        HÁZIREND
      </h1>

      <div className="space-y-10">
        {rules.map((section, idx) => (
          <section key={idx} className="text-center">
            <h2 className="font-display text-xl md:text-2xl tracking-widest mb-3">
              <span className={`${idx % 2 === 0 ? 'bg-day1' : 'bg-day2'} text-black px-2 py-1 box-decoration-clone`}>
                {section.header}
              </span>
            </h2>
            <div className="font-body text-base leading-[1.7]">
              {section.lines.map((line, i) => (
                <div key={i}>
                  <span className="bg-[#e5e5e5] text-black px-1 py-[0.15em] box-decoration-clone uppercase">
                    {line}
                  </span>
                </div>
              ))}
            </div>
          </section>
        ))}
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
    </main>
  )
}
