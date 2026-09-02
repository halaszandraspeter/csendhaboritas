'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCallback, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/src/lib/utils'

const navItems = [
  { href: '/#program', label: 'Program' },
  { href: '/helyszin', label: 'Helyszín' },
  { href: '/#fellepok', label: 'Fellépők' },
  { href: '/hazirend', label: 'Házirend' },
  { href: '/kapcsolat', label: 'Kapcsolat' },
  { href: '/tamogatok', label: 'Támogatók' },
]

/**
 * Responsive header with hamburger menu below 1024px.
 */
export function Header({ mainLogoUrl = '/logo-main.webp' }: { mainLogoUrl?: string }) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [closeButtonColor, setCloseButtonColor] = useState<'green' | 'purple'>('green')

  // Randomize close button color when menu opens
  const handleMenuToggle = () => {
    if (!isMenuOpen) {
      setCloseButtonColor(Math.random() > 0.5 ? 'green' : 'purple')
    }
    setIsMenuOpen(!isMenuOpen)
  }

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

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
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden lg:block border-b border-muted sticky top-0 z-40 bg-bg/95 backdrop-blur-sm">
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
          <Link href="/" className="shrink-0 mx-8">
            <Image
              src={mainLogoUrl}
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

      {/* Mobile Hamburger Button - Sticky */}
      <button
        onClick={handleMenuToggle}
        className={cn(
          'lg:hidden fixed top-4 right-4 z-50 p-3 rounded-full bg-bg/95 backdrop-blur-sm border border-muted shadow-lg transition-all duration-200',
          isMenuOpen && closeButtonColor === 'green' && 'bg-day1 border-day1',
          isMenuOpen && closeButtonColor === 'purple' && 'bg-day2 border-day2'
        )}
        aria-label={isMenuOpen ? 'Menü bezárása' : 'Menü megnyitása'}
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? (
          <X size={24} className="text-bg" />
        ) : (
          <Menu size={24} className="text-fg" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'lg:hidden fixed inset-0 z-40 bg-bg/98 backdrop-blur-md transition-all duration-300',
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-4 px-8">
          {/* Logo at top of menu */}
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="mb-6">
            <Image
              src={mainLogoUrl}
              alt="Miskolci Csendháborítás"
              width={252}
              height={84}
              priority
            />
          </Link>

          {/* Nav items with sticker styling */}
          {navItems.map((item, index) => {
            const stickerSrc = index % 2 === 0 ? '/sticker-purple.webp' : '/sticker-green.webp'
            // Slight rotation angles for organic sticker feel
            const rotations = [-2, 1.5, -1, 2.5, -1.5, 1]
            const rotation = rotations[index % rotations.length]
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleHashClick(e, item.href)}
                className={cn(
                  'relative group transition-transform hover:scale-105 hover:rotate-0 active:scale-95',
                  'transform transition-all duration-300',
                  isMenuOpen
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-4 opacity-0'
                )}
                style={{ 
                  transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms',
                  transform: isMenuOpen ? `rotate(${rotation}deg)` : undefined,
                }}
              >
                <div className="relative h-14">
                  <Image
                    src={stickerSrc}
                    alt=""
                    width={280}
                    height={56}
                    className="h-full w-auto object-contain"
                  />
                  <span className="absolute inset-0 flex items-center justify-center font-display text-[1.75rem] tracking-widest text-bg font-bold uppercase">
                    {item.label}
                  </span>
                </div>
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
}
