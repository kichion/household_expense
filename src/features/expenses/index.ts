import type { HouseholdExpense } from 'src/features/household-expenses'
import type { Subject } from 'src/features/subjects'
import type { User } from 'src/features/users'

export type ExpenseBase = {
  value: number
  subjectId: number
  householdExpenseId: number
  authorId: string

  /* foreign */
  subject?: Subject
  // CRUD dependence
  householdExpense?: HouseholdExpense
  author?: User
}

export type Expense = ExpenseBase & {
  id: number
  date: Date
}
