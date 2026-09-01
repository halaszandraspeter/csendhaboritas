'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Calendar, MapPin, Music, FileText } from 'lucide-react'
import { cn } from '@/src/lib/utils'
import { useCallback } from 'react'

const tabs = [
  { href: '/#program', label: 'Program', Icon: Calendar },
  { href: '/#helyszin', label: 'Helyszín', Icon: MapPin },
  { href: '/#fellepok', label: 'Fellépők', Icon: Music },
  { href: '/hazirend', label: 'Házirend', Icon: FileText },
]

/**
 * Mobile-only persistent bottom tab bar.
 * Hidden on md+ screens where the Header handles navigation.
 */
export function BottomTabBar() {
  const pathname = usePathname()

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
    <nav
      aria-label="Navigáció"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-muted bg-bg/95 backdrop-blur-sm"
    >
      <ul className="flex items-stretch h-16">
        {tabs.map(({ href, label, Icon }) => {
          // Handle hash links - check path without hash
          const hrefPath = href.split('#')[0] || '/'
          const isActive =
            hrefPath === '/' ? pathname === '/' : pathname.startsWith(hrefPath)
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                onClick={(e) => handleHashClick(e, href)}
                className={cn(
                  'flex flex-col items-center justify-center gap-0.5 h-full transition-colors duration-150',
                  isActive ? 'text-day1' : 'text-muted-fg hover:text-fg'
                )}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
                <span className="text-[10px] font-body font-medium tracking-wide">
                  {label}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
