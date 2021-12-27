import type { NextApiRequest, NextApiResponse } from 'next'
import type { FixedExpenseYearly } from 'src/features/fixed-expenses'
import type { New } from 'src/types/feature'

import { supabase } from 'src/lib/supabase-client'

import { createResponse } from '.'

const table = 'fixed_expense_yearlies'

const getFixedExpenseYearlies = async (
  _: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const queryResult = await supabase.from(table).select()
  const { status, data } = createResponse(queryResult.data, queryResult.error)
  return res.status(status).json(data)
}

export const createFixedExpenseYearly = async (
  fixedExpenseYearly: New<FixedExpenseYearly>,
) => {
  return await supabase.from(table).insert(fixedExpenseYearly)
}

export const updateFixedExpenseYearly = async (
  fixedExpenseYearly: FixedExpenseYearly,
) => {
  return await supabase
    .from(table)
    .update(fixedExpenseYearly)
    .match({ id: fixedExpenseYearly.id })
}

export const deleteFixedExpenseYearly = async (
  id: FixedExpenseYearly['id'],
) => {
  return await supabase.from(table).delete().match({ id })
}

export default getFixedExpenseYearlies
