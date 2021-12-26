import {
  FieldValues,
  FormState,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form'

export type FormBaseProps = {
  handleSubmit: UseFormHandleSubmit<FieldValues>
  isSubmitting: FormState<FieldValues>['isSubmitting']
  errors: FormState<FieldValues>['errors']
  register: UseFormRegister<FieldValues>
}
