import type { NextApiRequest, NextApiResponse } from 'next'
import type { FixedExpenseMonthly } from 'src/features/fixed-expenses'
import type { New } from 'src/types/feature'

import { supabase } from 'src/lib/supabase-client'

import { createResponse } from '.'

const table = 'fixed_expense_monthlies'

const getFixedExpenseMonthlies = async (
  _: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const queryResult = await supabase.from(table).select()
  const { status, data } = createResponse(queryResult.data, queryResult.error)
  return res.status(status).json(data)
}

export const createFixedExpenseMonthly = async (
  fixedExpenseMonthly: New<FixedExpenseMonthly>,
) => {
  return await supabase.from(table).insert(fixedExpenseMonthly)
}

export const updateFixedExpenseMonthly = async (
  fixedExpenseMonthly: FixedExpenseMonthly,
) => {
  return await supabase
    .from(table)
    .update(fixedExpenseMonthly)
    .match({ id: fixedExpenseMonthly.id })
}

export const deleteFixedExpenseMonthly = async (
  id: FixedExpenseMonthly['id'],
) => {
  return await supabase.from(table).delete().match({ id })
}

export default getFixedExpenseMonthlies
