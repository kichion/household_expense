import type { NextApiRequest, NextApiResponse } from 'next'
import type { FixedExpenseDate } from 'src/features/fixed-expenses'
import type { New } from 'src/types/feature'

import { get, create, update, remove, fetcher } from '.'

const table = 'fixed_expense_dates'

export const fixedExpenseDateFinder = (url: string) => fetcher<FixedExpenseDate[]>(url)

const getFixedExpenseDates = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  return await get(table, res, req)
}

export const createFixedExpenseDate = async (
  fixedExpenseDate: New<FixedExpenseDate>,
) => {
  return await create(table, fixedExpenseDate)
}

export const updateFixedExpenseDate = async (
  fixedExpenseDate: FixedExpenseDate,
) => {
  return await update(table, fixedExpenseDate)
}

export const deleteFixedExpenseDate = async (id: FixedExpenseDate['id']) => {
  return await remove(table, id)
}

export default getFixedExpenseDates
