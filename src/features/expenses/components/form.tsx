import { FC } from 'react'

import { Input, Select, Button } from '@chakra-ui/react'

import type { Expense } from 'src/features/expenses'
import type { Subject } from 'src/features/subjects'
import type { FormBaseProps } from 'src/types/form'
import type { New } from 'src/types/feature'

import { FormRow } from 'src/components/form/row'

export type ExpenseFormValues = {
  date: string
  value: number
  subjectId: number
}

export type ExpenseFormProps = FormBaseProps<ExpenseFormValues> & {
  subjects: Subject[] | undefined
  onSubmit: (values: New<Expense> | Expense) => Promise<void>
}

export const ExpenseForm: FC<ExpenseFormProps> = ({
  subjects,
  register,
  handleSubmit,
  onSubmit,
  isSubmitting,
  errors,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        id="date"
        label="計上日"
        required
        error={errors.date}
        help="計上日を指定します"
      >
        <Input
          id="date"
          type="date"
          required
          {...register('date', { required: '必須項目です' })}
        />
      </FormRow>
      <FormRow
        id="subjectId"
        label="科目"
        required
        error={errors.subjectId}
        help="科目を指定します"
      >
        <Select
          id="subjectId"
          variant="outline"
          required
          {...register('subjectId', {
            required: '必須項目です',
          })}
        >
          {subjects?.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </Select>
      </FormRow>
      <FormRow
        id="value"
        label="金額"
        required
        error={errors.value}
        help="金額を指定します"
      >
        <Input
          id="value"
          type="number"
          required
          {...register('value', {
            required: '必須項目です',
            min: { value: 1, message: '1円以上で入力してください' },
          })}
        />
      </FormRow>
      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        作成
      </Button>
    </form>
  )
}
