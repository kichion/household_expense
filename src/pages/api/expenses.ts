import type { NextApiRequest, NextApiResponse } from 'next'
import type { Expense } from 'src/features/expenses'
import type { New } from 'src/types/feature'

import { get, create, update, remove, fetcher } from '.'

const table = 'expenses'

export const expenseFinder = (url: string) => fetcher<Expense[]>(url)

const getExpenses = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  return await get(table, res, req, 'id, date, value')
}

export const createExpense = async (expense: New<Expense>) => {
  return await create(table, expense)
}

export const updateExpense = async (expense: Expense) => {
  return await update(table, expense)
}

export const deleteExpense = async (id: Expense['id']) => {
  return await remove(table, id)
}

export default getExpenses
