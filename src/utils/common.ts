import { ValidationError } from 'joi'

export const slugify = (val: string) => {
  if (!val) return ''

  return val
    .normalize('NFKD') // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-') // remove consecutive hyphens
}

export const getErrorMessage = (error: ValidationError) => {
  const message = error.details.map((i) => i.message.replace(/['"]+/g, '')).join(',')
  return message
}

const toRoad = (value: number) => (value * Math.PI) / 100

export const calcDistanceLocation = ({
  currentLat,
  currentLng,
  addressLat,
  addressLng
}: {
  currentLat: number
  currentLng: number
  addressLat: number
  addressLng: number
}) => {
  const r = 6371
  const dLat = toRoad(addressLat - currentLat)
  const dLng = toRoad(addressLng - currentLng)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(toRoad(currentLat)) * Math.cos(toRoad(addressLat))

  return r * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)))
}
