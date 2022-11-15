import Axios from 'axios'

export const BASE_URL =
  'https://petersopko.api.stdlib.com/unstable-diffusion@dev/' // TODO: @petersopko

const api = Axios.create({
  baseURL: BASE_URL,
})

export type ReplicateResponse = {
  generatedImages: string[]
}

export const promptReplicate = async (prompt: string) => {
  const { status, data } = await api.post<ReplicateResponse>('post', { prompt })
  console.log('[REPLICATE::askREPLICATE]', status)
  return data
}
