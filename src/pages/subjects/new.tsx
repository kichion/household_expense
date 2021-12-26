import type { NextPage } from 'next'
import type { Subject } from 'src/features/subjects'

import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { Box } from '@chakra-ui/react'
import { useRedirectAuth } from 'src/hooks/auth'

import { SubjectForm } from 'src/features/subjects/components/form'
import { Breadcrumbs } from 'src/components/breadcrumbs'
import { BasicModal } from 'src/components/modal'
import { useModal } from 'src/hooks/modal'
import { createSubject } from 'src/pages/api/subjects'
import { New } from 'src/types/feature'

const NewSubject: NextPage = () => {
  const { push } = useRouter()
  const done = useRedirectAuth()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()
  const { show, isShow } = useModal()

  const formProps = {
    handleSubmit,
    register,
    errors,
    isSubmitting,
    onSubmit: async (subject: New<Subject>) => {
      await createSubject(subject)
      show()
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
          { href: '/subjects', name: '科目' },
          { href: '/subjects/new', name: '科目追加' },
        ]}
      />
      {done && <SubjectForm {...formProps} />}
      <BasicModal
        title="作成完了"
        onClose={() => push('/subjects')}
        isOpen={isShow}
      >
        科目の作成が完了しました
      </BasicModal>
    </Box>
  )
}

export default NewSubject
