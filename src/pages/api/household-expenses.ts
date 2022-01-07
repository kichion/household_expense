import type { NextApiRequest, NextApiResponse } from 'next'
import type { HouseholdExpense } from 'src/features/household-expenses'
import type { User } from 'src/features/users'
import type { New } from 'src/types/feature'

import { get, create, update, remove, fetcher } from '.'

const table = 'household_expenses'
const relationTable = 'manage_household_expenses'

export const householdExpenseFinder = (url: string) =>
  fetcher<HouseholdExpense[]>(url)

const getHouseholdExpenses = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  return await get(table, res, req)
}

export const createHouseholdExpense = async (
  householdExpense: New<HouseholdExpense>,
  userId: User['id'],
) => {
  const { data, error } = await create(table, householdExpense)
  if (!data)
    throw new Error(
      `householdExpense insert is failed when before relation insert. ${JSON.stringify(
        error,
      )}`,
    )
  return await create(relationTable, { householdExpenseId: data[0].id, userId })
}

export const updateHouseholdExpense = async (
  householdExpense: HouseholdExpense,
) => {
  return await update(table, householdExpense)
}

export const deleteHouseholdExpense = async (id: HouseholdExpense['id']) => {
  return await remove(table, id)
}

export default getHouseholdExpenses
