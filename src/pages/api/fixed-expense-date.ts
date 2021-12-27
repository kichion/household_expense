import type { NextApiRequest, NextApiResponse } from 'next'
import type { FixedExpenseDate } from 'src/features/fixed-expenses'
import type { New } from 'src/types/feature'

import { supabase } from 'src/lib/supabase-client'

import { createResponse } from '.'

const table = 'fixed_expense_dates'

const getFixedExpenseDates = async (
  _: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const queryResult = await supabase.from(table).select()
  const { status, data } = createResponse(queryResult.data, queryResult.error)
  return res.status(status).json(data)
}

export const createFixedExpenseDate = async (
  fixedExpenseDate: New<FixedExpenseDate>,
) => {
  return await supabase.from(table).insert(fixedExpenseDate)
}

export const updateFixedExpenseDate = async (
  fixedExpenseDate: FixedExpenseDate,
) => {
  return await supabase
    .from(table)
    .update(fixedExpenseDate)
    .match({ id: fixedExpenseDate.id })
}

export const deleteFixedExpenseDate = async (id: FixedExpenseDate['id']) => {
  return await supabase.from(table).delete().match({ id })
}

export default getFixedExpenseDates
