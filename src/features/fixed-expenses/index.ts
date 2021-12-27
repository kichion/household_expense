import type { ExpenseBase } from 'src/features/expenses'

type FixedExpenseBase = ExpenseBase & {
  note: string
}

export type FixedExpenseDate = FixedExpenseBase & {
  id: number
  date: Date
}

export type FixedExpenseYearly = FixedExpenseBase & {
  id: number
  startDate: Date
  month: number
  day: number
}

export type FixedExpenseMonthly = FixedExpenseBase & {
  id: number
  startDate: Date
  day: number
}
