import Axios from 'axios'

export const BASE_URL = 'https://lexica.art/api/v1'

const api = Axios.create({
  baseURL: BASE_URL,
})

export type LexicaResponse = {
  images: LexicaImage[]
}

export type LexicaImage = {
  id: string
  gallery: string
  src: string
  srcSmall: string
  prompt: string
  width: number
  height: number
  seed: string
  grid: boolean
  model: string
  promptid: string
  nsfw: boolean
}

export const getLexicaArt = async (prompt: string) => {
  const { status, data } = await api.get<LexicaResponse>(`/search?q=${prompt}`)
  console.log('[LEXICA::getLEXICA]', status)
  return data.images
}
