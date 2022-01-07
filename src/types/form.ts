import {
  FieldValues,
  FormState,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form'

export type FormBaseProps<T extends FieldValues> = {
  handleSubmit: UseFormHandleSubmit<T>
  isSubmitting: FormState<T>['isSubmitting']
  errors: FormState<T>['errors']
  register: UseFormRegister<T>
}
