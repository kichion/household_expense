import { useState } from 'react'

export type ModalAction = {
  isShow: boolean
  show: () => void
  hide: () => void
}

export const useModal = (initShow = false): ModalAction => {
  const [isShow, setShow] = useState(initShow)

  return {
    isShow,
    show: () => setShow(true),
    hide: () => setShow(false),
  }
}
