import type { NextApiRequest, NextApiResponse } from 'next'
import type { FixedExpenseMonthly } from 'src/features/fixed-expenses'
import type { New } from 'src/types/feature'

import { get, create, update, remove, fetcher } from '.'

const table = 'fixed_expense_monthlies'

export const fixedExpenseMonthlyFinder = (url: string) =>
  fetcher<FixedExpenseMonthly[]>(url)

const getFixedExpenseMonthlies = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  return await get(table, res, req)
}

export const createFixedExpenseMonthly = async (
  fixedExpenseMonthly: New<FixedExpenseMonthly>,
) => {
  return await create(table, fixedExpenseMonthly)
}

export const updateFixedExpenseMonthly = async (
  fixedExpenseMonthly: FixedExpenseMonthly,
) => {
  return await update(table, fixedExpenseMonthly)
}

export const deleteFixedExpenseMonthly = async (
  id: FixedExpenseMonthly['id'],
) => {
  return await remove(table, id)
}

export default getFixedExpenseMonthlies
