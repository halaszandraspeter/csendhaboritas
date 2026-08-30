'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Calendar, MapPin, Music } from 'lucide-react'
import { cn } from '@/src/lib/utils'

const tabs = [
  { href: '/', label: 'Kezdőlap', Icon: Home },
  { href: '/program', label: 'Program', Icon: Calendar },
  { href: '/helyszin', label: 'Helyszín', Icon: MapPin },
  { href: '/zenekarok', label: 'Zenekarok', Icon: Music },
]

/**
 * Mobile-only persistent bottom tab bar.
 * Hidden on md+ screens where the Header handles navigation.
 */
export function BottomTabBar() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Navigáció"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-muted bg-bg/95 backdrop-blur-sm"
    >
      <ul className="flex items-stretch h-16">
        {tabs.map(({ href, label, Icon }) => {
          const isActive =
            href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
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
