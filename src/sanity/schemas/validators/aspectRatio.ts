import { getImageDimensions } from '@sanity/asset-utils'

interface CropRect {
  top: number
  bottom: number
  left: number
  right: number
}

interface ImageFieldValue {
  asset?: { _ref: string }
  crop?: CropRect
}

const TOLERANCE = 0.02 // 2% wiggle room for rounding

/**
 * Blocks publishing unless the image's applied crop (or full image, if uncropped)
 * matches the required aspect ratio within a small tolerance.
 * Dimensions are parsed synchronously from the asset ID — no client fetch needed.
 */
export function aspectRatioValidator(targetRatio: number, label: string) {
  return (value: ImageFieldValue | undefined) => {
    if (!value?.asset?._ref) return true

    const { width, height } = getImageDimensions(value.asset._ref)
    if (!width || !height) return true

    const crop = value.crop
    const croppedWidth = crop ? width * (1 - crop.left - crop.right) : width
    const croppedHeight = crop ? height * (1 - crop.top - crop.bottom) : height

    const actualRatio = croppedWidth / croppedHeight
    const relativeDiff = Math.abs(actualRatio - targetRatio) / targetRatio

    if (relativeDiff > TOLERANCE) {
      return `A kép kivágott aránya nem ${label}. Nyisd meg az "Edit crop and hotspot" eszközt, és igazítsd a kivágást a ${label} előnézeti kerethez.`
    }

    return true
  }
}
