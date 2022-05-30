import { IGif } from '@giphy/js-types'

export const getGifHeight = ({ images }: IGif, gifWidth: number) => {
  const { downsized_still } = images
  if (downsized_still) {
    const { width, height } = downsized_still
    const aspectRatio = width / height
    return Math.round(gifWidth / aspectRatio)
  }
  return 0
}
