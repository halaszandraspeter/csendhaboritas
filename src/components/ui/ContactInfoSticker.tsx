'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ContactInfoStickerProps {
  value: string
  variant: 'purple' | 'green'
}

export function ContactInfoSticker({ value, variant }: ContactInfoStickerProps) {
  const [copied, setCopied] = useState(false)

  const stickerSrc = variant === 'purple' ? '/sticker-purple.webp' : '/sticker-green.webp'

  // Split email at @ for wrapping
  const isEmail = value.includes('@')
  const [emailUser, emailDomain] = isEmail ? value.split('@') : [value, '']

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = value
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="relative group cursor-pointer transition-transform hover:scale-105 active:scale-95"
      title="Kattints a másoláshoz"
    >
      <div className="relative h-[4.5rem] md:h-[5.25rem]">
        <Image
          src={stickerSrc}
          alt=""
          width={450}
          height={84}
          className="h-full w-auto object-contain"
        />
        <span className="absolute inset-0 flex items-center justify-center font-display tracking-widest text-sm md:text-base text-bg font-bold text-center leading-tight px-2">
          {copied ? (
            '✓ MÁSOLVA!'
          ) : isEmail ? (
            <span className="flex flex-col items-center">
              <span>{emailUser}</span>
              <span>@{emailDomain}</span>
            </span>
          ) : (
            value
          )}
        </span>
      </div>
    </button>
  )
}
