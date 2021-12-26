import type { NextApiRequest, NextApiResponse } from 'next'
import type { Subject } from 'src/features/subjects'
import type { New } from 'src/types/feature'

import { supabase } from 'src/lib/supabase-client'

import { createResponse } from '.'

const table = 'subjects'

const getSubjects = async (
  _: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const queryResult = await supabase.from(table).select()
  const { status, data } = createResponse(queryResult.data, queryResult.error)
  return res.status(status).json(data)
}

export const createSubject = async (subject: New<Subject>) => {
  await supabase.from(table).insert(subject)
}

export default getSubjects
