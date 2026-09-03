import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

type RevalidateBody = {
  _type: string
  slug?: { current: string }
}

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET
    let body: RevalidateBody | null = null
    let isValid = false

    // Check for simple Authorization header (from Sanity Functions)
    const authHeader = req.headers.get('authorization')
    if (authHeader === `Bearer ${secret}`) {
      body = await req.json()
      isValid = true
    } else {
      // Fall back to Sanity webhook signature validation
      const result = await parseBody<RevalidateBody>(req, secret)
      body = result.body
      isValid = result.isValidSignature ?? false
    }

    if (!isValid) {
      return NextResponse.json(
        { message: 'Invalid signature', revalidated: false },
        { status: 401 }
      )
    }

    if (!body?._type) {
      return NextResponse.json(
        { message: 'No document type in body', revalidated: false },
        { status: 400 }
      )
    }

    // Revalidate based on document type
    switch (body._type) {
      case 'event':
        // Event affects multiple pages
        revalidatePath('/', 'layout')
        revalidatePath('/hazirend')
        revalidatePath('/helyszin')
        revalidatePath('/tamogatok')
        break
      case 'band':
        revalidatePath('/', 'layout')
        revalidatePath('/program')
        if (body.slug?.current) {
          revalidatePath(`/zenekarok/${body.slug.current}`)
        }
        // Revalidate all band pages in case order changed
        revalidatePath('/zenekarok', 'layout')
        break
      case 'activity':
        revalidatePath('/program')
        break
      default:
        // Unknown type - revalidate everything
        revalidatePath('/', 'layout')
    }

    return NextResponse.json({
      revalidated: true,
      message: `Revalidated ${body._type}`,
      now: Date.now(),
    })
  } catch (err) {
    console.error('Revalidation error:', err)
    return NextResponse.json(
      { message: 'Error revalidating', revalidated: false },
      { status: 500 }
    )
  }
}
