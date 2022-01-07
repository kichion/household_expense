import type { NextApiRequest, NextApiResponse } from 'next'
import type { New } from 'src/types/feature'

import { PostgrestError } from '@supabase/supabase-js'
import camelcaseKeys from 'camelcase-keys'
import snakecaseKeys from 'snakecase-keys'

import { supabase } from 'src/lib/supabase-client'

export type response = {
  status: 200 | 401 | 404
  data: any
}

// HACK: using access token what supabase Command Query in server side
// refs: https://github.com/supabase/supabase/issues/1735
const setAuthToken = async (token: string): Promise<string | null> => {
  if (typeof token !== 'string') {
    return 'Missing auth token.'
  }
  const { data: user, error } = await supabase.auth.api.getUser(token)
  if (error) {
    return error.message
  }
  if (!user?.id?.length || user.id.length < 1) {
    return 'Unknown user.'
  }
  supabase.auth.setAuth(token)
  return null
}

export const get = async <T extends Record<'id', number>>(
  table: string,
  res: NextApiResponse,
  req: NextApiRequest,
  select: string = '*',
) => {
  await setAuthToken(req.cookies['sb:token'])
  const queryResult = await supabase.from<T>(table).select(select)
  const { status, data } = createResponse(queryResult.data, queryResult.error)
  return res.status(status).json(data)
}

// TODO: CRUD全てにaccess tokenを混ぜる

export const create = async <T extends Record<'id', number>>(
  table: string,
  obj: New<T>,
) => {
  return await supabase.from(table).insert(snakecaseKeys(obj))
}

export const update = async <T extends Record<'id', number>>(
  table: string,
  obj: T,
) => {
  return await supabase
    .from(table)
    .update(snakecaseKeys(obj))
    .match({ id: obj.id })
}

export const remove = async (table: string, id: number | string) => {
  await supabase.from(table).delete().match({ id })
}

export const createResponse = <T>(
  data: T[] | null,
  error: PostgrestError | null,
): response => {
  if (error) return { status: 401, data: { error: error.message } }
  if (!data) return { status: 404, data: null }

  return { status: 200, data: camelcaseKeys(data) }
}

export const fetcher = async <T>(url: string): Promise<T> => {
  const response = await fetch(url)
  return response.json()
}
