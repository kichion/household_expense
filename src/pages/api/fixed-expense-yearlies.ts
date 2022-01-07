import type { NextApiRequest, NextApiResponse } from 'next'
import type { FixedExpenseYearly } from 'src/features/fixed-expenses'
import type { New } from 'src/types/feature'

import { get, create, update, remove, fetcher } from '.'

const table = 'fixed_expense_yearlies'

export const fixedExpenseYearlyFinder = (url: string) =>
  fetcher<FixedExpenseYearly[]>(url)

const getFixedExpenseYearlies = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  return await get(table, res, req)
}

export const createFixedExpenseYearly = async (
  fixedExpenseYearly: New<FixedExpenseYearly>,
) => {
  return await create(table, fixedExpenseYearly)
}

export const updateFixedExpenseYearly = async (
  fixedExpenseYearly: FixedExpenseYearly,
) => {
  return await update(table, fixedExpenseYearly)
}

export const deleteFixedExpenseYearly = async (
  id: FixedExpenseYearly['id'],
) => {
  return await remove(table, id)
}

export default getFixedExpenseYearlies
