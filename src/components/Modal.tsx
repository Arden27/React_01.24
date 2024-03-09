import { Button } from './Button'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import { useRef } from 'react'

interface ModalProps {
  isOpen: boolean
  toggleDialog: () => void
  confirmAction: () => void
  message?: string
  additionalMessage?: string
  confirmButtonMessage?: string
  cancelButtonMessage?: string
}

export function Modal({
  isOpen,
  toggleDialog,
  confirmAction,
  message = 'Sure?',
  additionalMessage = 'Are you?',
  confirmButtonMessage = 'OK',
  cancelButtonMessage = 'Cancel'
}: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null)

  const handleConfirm = () => {
    confirmAction()
    if (isOpen) {
      toggleDialog()
    }
  }
  useOutsideClick([modalRef], () => {
    if (isOpen) {
      toggleDialog()
    }
  })

  return (
    <dialog
      open={isOpen}
      ref={modalRef}
      className="inset-x-0 inset-y-0 mx-auto my-auto items-center justify-center bg-transparent transition">
      <div className="grid place-items-center justify-center gap-md rounded-[2rem] border-2 border-solid border-text bg-gradient-to-r from-bg3 to-bg2 p-md shadow-2xl">
        <h2>{message}</h2>
        <h3>{additionalMessage}</h3>

        <div className="flex items-center justify-around gap-xs">
          <Button format="lg fill" onClick={toggleDialog}>
            {cancelButtonMessage}
          </Button>
          <Button format="sm " onClick={handleConfirm}>
            {confirmButtonMessage}
          </Button>
        </div>
      </div>
    </dialog>
  )
}
