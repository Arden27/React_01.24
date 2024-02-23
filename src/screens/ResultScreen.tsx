import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import RestartIcon from '@/assets/svg/restart.svg?react'
import { ROUTES } from '@/navigation/router'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, setQuestions, resetCorrectAnswers, resetSettings } from '@/redux/store'
import { fetchQuestions } from '@/utils/fetchQuestions'
import mockQuestions from '@/data/mockQuestions'

export function ResultScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentQuizSettings = useSelector((state: RootState) => state.quiz)
  const correctAnswers = useSelector((state: RootState) => state.quiz.correctAnswers)
  const numberOfQuestions = useSelector((state: RootState) => state.quiz.numberOfQuestions)

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const toggleModal = () => {
    setIsDialogOpen((prev) => !prev)
  }

  const mockRestart = () => {
    dispatch(resetCorrectAnswers())
    dispatch(setQuestions(mockQuestions))
    navigate(ROUTES.play)
  }

  const handleRestart = async () => {
    // Check for network connectivity
    if (!navigator.onLine) {
      toggleModal() // Show dialog immediately if offline
      return
    }

    let responseReceived = false

    // Start a timer for 2 seconds
    const timer = setTimeout(() => {
      if (!responseReceived) {
        toggleModal()
      }
    }, 2000)

    const success = await fetchQuestions(currentQuizSettings, dispatch)
    responseReceived = true

    // Clear the timer as we received the response
    clearTimeout(timer)

    dispatch(resetCorrectAnswers())

    if (success) {
      navigate(ROUTES.play)
    }
  }

  const calculatePercentage = (correctAnswers: number, totalQuestions: number) => {
    if (totalQuestions === 0) {
      return 0 // Return 0% if there are no questions
    }
    return Math.round((correctAnswers / totalQuestions) * 100)
  }

  return (
    <>
      <div className="relative m-lg flex max-w-xl flex-col items-center justify-center gap-md rounded-[2rem] border-2 border-solid border-text bg-gradient-to-r from-bg2 to-bg3 p-lg shadow-lg">
        <h1>Results</h1>
        <h2 className="text-center">Thank you for completing this quiz. Here are your results</h2>
        <div className="flex flex-row gap-sm">
          <div
            className="!hover:text-header relative flex flex-col items-center justify-center rounded-[2rem] border-2 border-solid border-text bg-bg3 p-sm font-btn text-sm uppercase
      text-text ">
            <h2>Time</h2>
            <h3>00:42</h3>
          </div>
          <div
            className="relative flex flex-col items-center justify-center gap-xs rounded-[2rem] border-2 border-solid border-text bg-text p-md text-center font-btn text-sm uppercase
       text-bg3 shadow-lg">
            <h2>Correct Answers</h2>
            <div className="flex flex-row items-center">
              <h3
                className="!hover:text-header  relative flex items-center justify-center rounded-[2rem] border-2 border-solid border-text bg-bg3 p-xs font-btn text-xl uppercase
      text-text">
                {correctAnswers} / {numberOfQuestions}
              </h3>
              <div className="p-xs text-md">
                {calculatePercentage(correctAnswers, numberOfQuestions)}%
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-row justify-between">
          <div className="self-start text-start">
            <h3 className="text-lg">Quiz Settings</h3>
            <ul className="ml-sm [&>*>span]:font-btn [&>*]:p-3xs">
              <li>
                Category: <span>Any</span>
              </li>
              <li>
                Difficulty: <span>Hard</span>
              </li>
              <li>
                Type: <span>Multiple Choice</span>
              </li>
              <li>
                Time: <span>2M</span>
              </li>
            </ul>
          </div>

          <div className="flex h-full flex-col items-end justify-end gap-xs">
            <Button format="sm border" onClick={handleRestart} className="relative ">
              <div className="relative flex h-full w-full flex-row items-center justify-center gap-3xs">
                <RestartIcon className="h-md w-md" />
                Restart
              </div>
            </Button>
            <Button format="lg border" className="bg-bg" onClick={() => {
              dispatch(resetSettings())
              navigate(ROUTES.root)
              }}>
              Choose another quiz
            </Button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isDialogOpen}
        toggleDialog={toggleModal}
        confirmAction={mockRestart}
        message="Server is down"
        additionalMessage="Use mock questions?"
        confirmButtonMessage="Yes, Mock Me!"
        cancelButtonMessage="No, Thanks"
      />
    </>
  )
}
