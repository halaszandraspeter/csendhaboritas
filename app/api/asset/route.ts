import { type NextRequest, NextResponse } from 'next/server'

// Same-origin proxy for Sanity CDN assets so they can be used as CSS mask-image
// (mask-image requires CORS-clean resources; the Sanity CDN sends no CORS headers).
export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url')
  if (!url) {
    return new NextResponse('Missing url', { status: 400 })
  }

  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return new NextResponse('Invalid url', { status: 400 })
  }

  // Restrict to the Sanity CDN to prevent this route being an open proxy (SSRF).
  if (parsed.protocol !== 'https:' || parsed.hostname !== 'cdn.sanity.io') {
    return new NextResponse('Forbidden host', { status: 403 })
  }

  const upstream = await fetch(parsed.toString())
  if (!upstream.ok) {
    return new NextResponse('Upstream error', { status: 502 })
  }

  return new NextResponse(upstream.body, {
    status: 200,
    headers: {
      'Content-Type': upstream.headers.get('Content-Type') ?? 'application/octet-stream',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
