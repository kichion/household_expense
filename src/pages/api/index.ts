import { PostgrestError } from '@supabase/supabase-js'

export type response = {
  status: 200 | 401
  data: any
}

export const createResponse = (
  data: any[] | null,
  error: PostgrestError | null,
): response => {
  if (error) return { status: 401, data: { error: error.message } }

  return { status: 200, data }
}

export async function fetcher(url: string): Promise<any | null> {
  const response = await fetch(url)
  return response.json()
}
