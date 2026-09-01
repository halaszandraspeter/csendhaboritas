import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Támogatók',
  description: 'A Miskolci Csendháborítás támogatói.',
}

export default function TamogatokPage() {
  return (
    <main className="px-6 py-16 max-w-3xl mx-auto">
      <h1 className="font-display text-4xl md:text-5xl tracking-widest text-fg text-center mb-12">
        TÁMOGATÓK
      </h1>
      <div className="font-body text-base leading-relaxed text-fg/80 space-y-4">
        <p>Hamarosan...</p>
      </div>
    </main>
  )
}
