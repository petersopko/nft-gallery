import { AuthReplicate, BASE_URL, MODEL_VERSION } from '@/utils/auth'
import axios from 'axios'

export type ReplicateResponse = {
  id: string
  version: string
  urls: {
    get: string
    cancel: string
  }
  created_at: string
  completed_at: string
  status: string
  input: {
    text: string
  }
  output: null
  error: null
  logs: null
  metrics: Record<string, unknown>
}

export const createPrediction = async (prompt: string) => {
  const data = {
    version: MODEL_VERSION,
    input: prompt,
  }
  try {
    await axios.post(BASE_URL, data, {
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Access-Control-Allow-Methods': 'GET,HEAD,POST',
        'Access-Control-Max-Age': '86400',
        Authorization: `Token ${AuthReplicate}`,
        'Content-Type': 'application/json',
      },
    })
    console.log('[PINATA] Generate Key', status)
    //
    // if (status < 400) {
    //   return {
    //     statusCode: status,
    //     body: JSON.stringify(data),
    //   }
    // }
  } catch (e: any) {
    console.log('Error', e.message)
    return {
      statusCode: 500,
      body: e.message,
    }
  }
}
