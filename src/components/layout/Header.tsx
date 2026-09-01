'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCallback } from 'react'

const navItems = [
  { href: '/#program', label: 'Program' },
  { href: '/#helyszin', label: 'Helyszín' },
  { href: '/#fellepok', label: 'Fellépők' },
  { href: '/hazirend', label: 'Házirend' },
  { href: '/kapcsolat', label: 'Kapcsolat' },
  { href: '/tamogatok', label: 'Támogatók' },
]

/**
 * Desktop-only symmetrical header.
 * Hidden on mobile — BottomTabBar handles mobile navigation.
 */
export function Header() {
  const handleHashClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      const hash = href.slice(1)
      const el = document.querySelector(hash)
      if (el) {
        e.preventDefault()
        el.scrollIntoView({ behavior: 'smooth' })
        window.history.pushState(null, '', href)
      }
    }
  }, [])

  return (
    <header className="hidden md:block border-b border-muted sticky top-0 z-40 bg-bg/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left nav items */}
        <nav className="flex gap-8">
          {navItems.slice(0, 3).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => handleHashClick(e, item.href)}
              className="font-display text-2xl tracking-widest text-fg hover:text-fg/70 transition-colors duration-200 uppercase"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Centre logo */}
        <Link href="/" className="flex-shrink-0 mx-8">
          <Image
            src="/logo-main.webp"
            alt="Miskolci Csendháborítás"
            width={180}
            height={60}
            priority
          />
        </Link>

        {/* Right nav items */}
        <nav className="flex gap-8">
          {navItems.slice(3).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => handleHashClick(e, item.href)}
              className="font-display text-2xl tracking-widest text-fg hover:text-fg/70 transition-colors duration-200 uppercase"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
