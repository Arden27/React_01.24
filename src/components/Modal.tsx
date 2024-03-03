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
      className="fixed inset-x-0 inset-y-0 mx-auto my-auto items-center justify-center bg-transparent transition">
      <div className="flex max-w-lg flex-col items-center justify-center gap-4 rounded-[2rem] border-2 border-solid border-text bg-gradient-to-r from-bg3 to-bg2 p-lg shadow-2xl">
        <div className="flex flex-col gap-2 text-center">
          <h2>{message}</h2>
          <h3>{additionalMessage}</h3>
        </div>
        <div className="flex w-full flex-row items-center justify-around gap-4">
          <Button format="lg fill" onClick={handleConfirm}>
            {confirmButtonMessage}
          </Button>
          <Button format="sm " onClick={toggleDialog}>
            {cancelButtonMessage}
          </Button>
        </div>
      </div>
    </dialog>
  )
}
