import type { NextApiRequest, NextApiResponse } from 'next'
import type { Subject } from 'src/features/subjects'
import type { New } from 'src/types/feature'

import { fetcher, get, create, update, remove } from '.'

const table = 'subjects'

export const subjectFinder = (url: string) => fetcher<Subject[]>(url)

const getSubjects = async (
  _: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  return get(table, res)
}

export const createSubject = async (subject: New<Subject>) => {
  return await create(table, subject)
}

export const updateSubject = async (subject: Subject) => {
  return await update(table, subject)
}

export const deleteSubject = async (id: Subject['id']) => {
  return await remove(table, id)
}

export default getSubjects
