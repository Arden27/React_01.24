import { useRef, useState } from 'react'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/navigation/router'
import { Button } from '@/components/Button'
import { CountdownTimer } from '@/components/CountdownTimer'

export function PlayQuizScreen() {
  const navigate = useNavigate()
  const modalRef = useRef(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const showDialog = () => {
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
  }

  const confirmEndQuiz = () => {
    navigate(ROUTES.root, { replace: true })
  }

  useOutsideClick([modalRef], () => {
    setIsDialogOpen(false)
  })

  return (
    <>
      <div
        className={` flex h-screen w-screen items-center justify-center ${isDialogOpen ? 'pointer-events-none opacity-50' : ''}`}>
        <div
          className={`relative m-lg flex max-w-xl flex-col items-center justify-center gap-md rounded-[2rem] border-2 border-solid border-text bg-gradient-to-r from-bg3 to-bg2 p-lg shadow-2xl
    `}>
          <CountdownTimer
            className="slide-in-bottom absolute -top-lg right-xl -z-20 flex rounded-tl-[1rem] rounded-tr-[1rem] border-2 border-solid border-text bg-gradient-to-b from-bg2 to-bg p-xs pt-3xs text-lg shadow-2xl"
            initialTime={42}
          />
          <div className="flex flex-col gap-2xs text-center">
            <h3>Question 3 of 15</h3>
          </div>
          <h2 className="text-center">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi consequatur
            perferendis minus eligendi fugit doloribus velit ad! Error quam quae earum, itaque nisi
            velit laborum quis sapiente odit ducimus aliquam.
          </h2>
          <div
            className="flex flex-col gap-2"
            onClick={() => {
              navigate(ROUTES.result, { replace: true })
            }}>
            <div className="flex flex-row gap-2">
              <Button format="lg border" className="bg-bg">
                Answer 1
              </Button>
              <Button format="lg border" className="bg-bg">
                Answer 2
              </Button>
            </div>
            <div className="flex flex-row gap-2">
              <Button format="lg border" className="bg-bg">
                Answer 3
              </Button>
              <Button format="lg border" className="bg-bg">
                Answer 4
              </Button>
            </div>
          </div>
          <Button
            format="sm border"
            className="opacity-80 hover:opacity-100"
            onClick={showDialog}>
            End Quiz
          </Button>
        </div>
      </div>

      <dialog
        open={isDialogOpen}
        ref={modalRef}
        className="fixed inset-x-0 inset-y-0 mx-auto my-auto items-center justify-center bg-transparent transition">
        <div className="flex max-w-lg flex-col items-center justify-center gap-4 rounded-[2rem] border-2 border-solid border-text bg-gradient-to-r from-bg3 to-bg2 p-lg shadow-2xl">
          <div className="flex flex-col gap-2 text-center">
            <h2>Are you sure?</h2>
            <h3>Progress will be lost...</h3>
          </div>
          <div className="flex w-full flex-row items-center justify-around gap-4">
            <Button format="lg fill" onClick={confirmEndQuiz}>
              Yes, End Quiz
            </Button>
            <Button format="sm " onClick={closeDialog}>
              No, Continue
            </Button>
          </div>
        </div>
      </dialog>
    </>
  )
}
