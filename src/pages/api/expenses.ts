import type { NextApiRequest, NextApiResponse } from 'next'
import type { Expense } from 'src/features/expenses'
import type { New } from 'src/types/feature'

import { supabase } from 'src/lib/supabase-client'

import { createResponse } from '.'

const table = 'expenses'

const getExpenses = async (
  _: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const queryResult = await supabase.from(table).select()
  const { status, data } = createResponse(queryResult.data, queryResult.error)
  return res.status(status).json(data)
}

export const createExpense = async (expense: New<Expense>) => {
  return await supabase.from(table).insert(expense)
}

export const updateExpense = async (expense: Expense) => {
  return await supabase.from(table).update(expense).match({ id: expense.id })
}

export const deleteExpense = async (id: Expense['id']) => {
  return await supabase.from(table).delete().match({ id })
}

export default getExpenses
