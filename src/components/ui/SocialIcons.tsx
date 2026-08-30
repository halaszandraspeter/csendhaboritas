/**
 * Brand social icons not available in lucide-react.
 * Simple inline SVG components — swap for your own assets if needed.
 */

interface IconProps {
  size?: number
  className?: string
}

export function FacebookIcon({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

export function InstagramIcon({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function TikTokIcon({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.77 1.52V6.77a4.85 4.85 0 0 1-1-.08z" />
    </svg>
  )
}

export function SpotifyIcon({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  )
}

export function SoundCloudIcon({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M1.175 12.225c-.015-.065-.025-.131-.025-.198 0-.402.324-.729.724-.729.316 0 .585.203.685.484l.49 1.732-.49 1.666c-.1.278-.37.478-.685.478-.4 0-.724-.327-.724-.73 0-.067.01-.134.025-.198L1.175 12.225zm2.025 3.6c.023.09.035.183.035.277 0 .574-.465 1.039-1.039 1.039-.457 0-.844-.295-.981-.703L.727 14.95l.488-2.488c.137-.41.524-.705.981-.705.574 0 1.039.465 1.039 1.039 0 .094-.012.187-.035.277L2.725 14.95l.475 1.875zm2.025 1.35c.027.106.042.215.042.328 0 .682-.553 1.234-1.234 1.234-.543 0-1.002-.35-1.169-.837L2.375 14.95l.489-3.319c.168-.487.626-.836 1.169-.836.681 0 1.234.553 1.234 1.234 0 .113-.015.222-.042.328L4.75 14.95l.475 2.225zm2.025 1.125c.031.122.047.248.047.377 0 .789-.64 1.43-1.43 1.43-.627 0-1.158-.404-1.352-.967L4.025 14.95l.49-3.862c.194-.563.725-.967 1.352-.967.79 0 1.43.641 1.43 1.43 0 .129-.016.255-.047.377L6.775 14.95l.475 3.35zM24 11.25c0-2.625-2.125-4.75-4.75-4.75-1.025 0-1.975.325-2.75.875-.125-3.5-3-6.375-6.5-6.375-1.875 0-3.575.8-4.775 2.075V17.25c0 1.25 1 2.25 2.25 2.25H19.25c2.625 0 4.75-2.125 4.75-4.75v-3.5z" />
    </svg>
  )
}

export function AppleMusicIcon({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M23.994 6.124a9.23 9.23 0 0 0-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 0 0-1.877-.726 10.496 10.496 0 0 0-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208A4.95 4.95 0 0 0 .09 4.819C.013 5.199 0 5.589 0 5.97v12.06c.01.163.018.327.028.49.07.875.233 1.72.627 2.508.63 1.29 1.63 2.17 2.98 2.69.65.244 1.33.364 2.02.4.24.013.48.017.72.017H18.63c.24 0 .48-.004.72-.017.69-.036 1.37-.156 2.02-.4 1.35-.52 2.35-1.4 2.98-2.69.394-.788.557-1.633.627-2.508.01-.163.018-.327.028-.49V6.124h-.01zM12 18.928a6.927 6.927 0 1 1 0-13.855 6.927 6.927 0 0 1 0 13.855zm7.22-12.5a1.62 1.62 0 1 1 0-3.24 1.62 1.62 0 0 1 0 3.24zM12 7.573a4.427 4.427 0 1 0 0 8.854 4.427 4.427 0 0 0 0-8.854z" />
    </svg>
  )
}

export function YouTubeIcon({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}
