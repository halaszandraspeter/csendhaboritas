import Link from 'next/link'
import Image from 'next/image'

const navItems = [
  { href: '/', label: 'Kezdőlap' },
  { href: '/program', label: 'Program' },
  { href: '/helyszin', label: 'Helyszín' },
  { href: '/zenekarok', label: 'Zenekarok' },
]

/**
 * Desktop-only symmetrical header.
 * Hidden on mobile — BottomTabBar handles mobile navigation.
 */
export function Header() {
  return (
    <header className="hidden md:flex items-center justify-between px-8 py-4 border-b border-muted sticky top-0 z-40 bg-bg/95 backdrop-blur-sm">
      {/* Left nav items */}
      <nav className="flex gap-8">
        {navItems.slice(0, 2).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="font-display text-lg tracking-widest text-fg/70 hover:text-fg transition-colors duration-200 uppercase"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Centre logo */}
      <Link href="/" className="flex-shrink-0 mx-8">
        <Image
          src="/logo.png"
          alt="Miskolci Csendháborítás"
          width={180}
          height={60}
          className="invert"
          priority
        />
      </Link>

      {/* Right nav items */}
      <nav className="flex gap-8">
        {navItems.slice(2).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="font-display text-lg tracking-widest text-fg/70 hover:text-fg transition-colors duration-200 uppercase"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
