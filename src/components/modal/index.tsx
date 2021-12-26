import type { ModalProps } from '@chakra-ui/react'

import { FC, ReactNode } from 'react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

export type BasicModalProps = {
  isOpen: ModalProps['isOpen']
  onClose: ModalProps['onClose']
  title: string
  children: ReactNode
  footer?: ReactNode
}

export const BasicModal: FC<BasicModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>{footer}</ModalFooter>
      </ModalContent>
    </Modal>
  )
}
