import type { NextPage } from 'next'
import type { Expense } from 'src/features/expenses'
import type { Subject } from 'src/features/subjects'
import type { New } from 'src/types/feature'
import type { ExpenseFormValues } from 'src/features/expenses/components/form'

import { useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { useForm } from 'react-hook-form'

import { Box } from '@chakra-ui/react'

import { useRedirectAuth } from 'src/hooks/auth'
import { useModal } from 'src/hooks/modal'
import { ExpenseForm } from 'src/features/expenses/components/form'
import { Alert } from 'src/components/alert'
import { Breadcrumbs } from 'src/components/breadcrumbs'
import { BasicModal } from 'src/components/modal'
import { createExpense } from 'src/pages/api/expenses'
import { subjectFinder } from 'src/pages/api/subjects'
import { formatDate } from 'src/utils/date'

const NewExpense: NextPage = () => {
  const { push } = useRouter()
  const { done } = useRedirectAuth()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ExpenseFormValues>({
    defaultValues: {
      date: formatDate(new Date()),
      subjectId: 1,
    },
  })
  const successModal = useModal()
  const { data, error } = useSWR<Subject[]>('/api/subjects', subjectFinder)
  const [creteError, setCreateError] = useState<
    { message: string } | undefined
  >()
  // TODO: path parameterからID取得
  const householdExpenseId = 1

  const formProps = {
    subjects: data,
    handleSubmit,
    register,
    errors,
    isSubmitting,
    onSubmit: async (expense: New<Expense>) => {
      const { error } = await createExpense({
        ...expense,
        householdExpenseId,
      })
      if (error) {
        setCreateError(error)
        return
      }
      successModal.show()
    },
  }

  return (
    <Box
      m="auto"
      maxW={900}
      borderRadius="md"
      borderWidth="1px"
      padding="2.5"
      marginY="5"
    >
      <Breadcrumbs
        linkList={[
          { href: '/expenses', name: '項目' },
          { href: '/expenses/new', name: '項目追加' },
        ]}
      />
      {error && <Alert title="data fetch error" error={error} />}
      {creteError && (
        <Alert title="data create error" error={creteError.message} />
      )}
      {!error && done && <ExpenseForm {...formProps} />}
      <BasicModal
        title="作成完了"
        onClose={() => push('/expenses')}
        isOpen={successModal.isShow}
      >
        項目の作成が完了しました
      </BasicModal>
    </Box>
  )
}

export default NewExpense
