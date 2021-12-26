import { FC, ReactNode } from 'react'

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Flex,
  Text,
} from '@chakra-ui/react'

export type FormRowProps = {
  id: string
  label: string
  required?: boolean
  error?: any
  help?: string
  children: ReactNode
}

export const FormRow: FC<FormRowProps> = ({
  id,
  label,
  required,
  help,
  error,
  children,
}) => {
  return (
    <FormControl isInvalid={error}>
      <FormLabel htmlFor={id}>
        <Flex>
          {label} {required && <Text color="red">*</Text>}
        </Flex>
      </FormLabel>
      <FormErrorMessage>{error && error.message}</FormErrorMessage>
      {children}
      <FormHelperText>{help}</FormHelperText>
    </FormControl>
  )
}
