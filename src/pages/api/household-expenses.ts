import type { NextApiRequest, NextApiResponse } from 'next'
import type { HouseholdExpense } from 'src/features/household-expenses'
import type { User } from 'src/features/users'
import type { New } from 'src/types/feature'

import { supabase } from 'src/lib/supabase-client'

import { createResponse } from '.'

const table = 'household_expenses'
const relationTable = 'manage_household_expenses'

const getHouseholdExpenses = async (
  _: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const queryResult = await supabase.from(table).select()
  const { status, data } = createResponse(queryResult.data, queryResult.error)
  return res.status(status).json(data)
}

export const createHouseholdExpense = async (
  householdExpense: New<HouseholdExpense>,
  userId: User['id'],
) => {
  const { data, error } = await supabase.from(table).insert(householdExpense)
  if (!data)
    throw new Error(
      `householdExpense insert is failed when before relation insert. ${JSON.stringify(
        error,
      )}`,
    )
  return await supabase
    .from(relationTable)
    .insert({ householdExpenseId: data[0].id, userId })
}

export const updateHouseholdExpense = async (
  householdExpense: HouseholdExpense,
) => {
  return await supabase
    .from(table)
    .update(householdExpense)
    .match({ id: householdExpense.id })
}

export const deleteHouseholdExpense = async (id: HouseholdExpense['id']) => {
  return await supabase.from(table).delete().match({ id })
}

export default getHouseholdExpenses
