'use client'

import Link from 'next/link'
import { useCallback } from 'react'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/#program', label: 'Program' },
  { href: '/#helyszin', label: 'Helyszín' },
  { href: '/#fellepok', label: 'Fellépők' },
  { href: '/hazirend', label: 'Házirend' },
  { href: '/kapcsolat', label: 'Kapcsolat' },
  { href: '/tamogatok', label: 'Támogatók' },
]

export function FooterNav() {
  const pathname = usePathname()

  const handleHashClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only handle hash navigation if we're already on the homepage
    if (href.startsWith('/#') && pathname === '/') {
      const hash = href.slice(1)
      const el = document.querySelector(hash)
      if (el) {
        e.preventDefault()
        el.scrollIntoView({ behavior: 'smooth' })
        window.history.pushState(null, '', href)
      }
    }
  }, [pathname])

  return (
    <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={(e) => handleHashClick(e, item.href)}
          className="font-display text-sm tracking-widest text-muted-fg hover:text-fg transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
