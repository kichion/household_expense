import { FC } from 'react'

import { Input, Button } from '@chakra-ui/react'

import type { Subject } from 'src/features/subjects'
import type { FormBaseProps } from 'src/types/form'
import type { New } from 'src/types/feature'

import { FormRow } from 'src/components/form/row'

export type SubjectFormProps = FormBaseProps & {
  onSubmit: (values: New<Subject> | Subject) => Promise<void>
}

export const SubjectForm: FC<SubjectFormProps> = ({
  register,
  handleSubmit,
  onSubmit,
  isSubmitting,
  errors,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        id="name"
        label="科目名"
        required
        error={errors.name}
        help="科目名を指定します"
      >
        <Input
          id="name"
          placeholder="例) 食費, 光熱費, 娯楽費"
          required
          {...register('name', {
            required: '必須項目です',
            minLength: { value: 2, message: '2文字以上で入力してください' },
            maxLength: { value: 20, message: '20文字以内で入力してください' },
          })}
        />
      </FormRow>
      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        作成
      </Button>
    </form>
  )
}
