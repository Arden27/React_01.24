import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import RestartIcon from '@/assets/svg/restart.svg?react'
import { ROUTES } from '@/navigation/router'
import { useSelector, useDispatch } from 'react-redux'
import { setQuestions, resetCorrectAnswers } from '@/redux/slices/game'
import { resetSettings } from '@/redux/slices/settings'
import { RootState } from '@/redux/store'
import { useLazyFetchQuestionsQuery } from '@/redux/api/questionsApi'
import mockQuestions from '@/data/mockQuestions'
import { formatTime } from '@/utils/formatTime'
import { calculatePercentage } from '@/utils/calculatePercentage'

export function ResultScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentQuizSettings = useSelector((state: RootState) => state.settings)
  const timeSpent = useSelector((state: RootState) => state.game.timeSpent)
  const correctAnswers = useSelector((state: RootState) => state.game.correctAnswers)
  const numberOfQuestions = useSelector((state: RootState) => state.settings.numberOfQuestions)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState('Server is not responding')

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev)
  }

  const mockRestart = () => {
    dispatch(resetCorrectAnswers())
    dispatch(setQuestions(mockQuestions))
    navigate(ROUTES.play)
  }

  const [showLoading, setShowLoading] = useState(false)
  const [fetchQuestions] = useLazyFetchQuestionsQuery()

  const handleRestart = async () => {
    if (!navigator.onLine) {
      setModalMessage('No Internet Connection')
      toggleModal()
      return
    }

    setShowLoading(true)
    try {
      let responseReceived = false
      const timer = setTimeout(() => {
        if (!responseReceived) {
          toggleModal()
        }
      }, 2000)

      const data = await fetchQuestions(currentQuizSettings).unwrap()

      responseReceived = true
      clearTimeout(timer)

      if (data.results) {
        dispatch(setQuestions(data.results))
        navigate(ROUTES.play)
        dispatch(resetCorrectAnswers())
      }
    } catch (error) {
      // Handle any errors here
      console.error('Failed to fetch questions:', error)
      setModalMessage('Error fetching questions')
      toggleModal()
    } finally {
      setShowLoading(false)
    }
  }

  return (
    <>
      <div className="relative m-lg flex max-w-xl flex-col items-center justify-center gap-md rounded-[2rem] border-2 border-solid border-text bg-gradient-to-r from-bg2 to-bg3 p-lg shadow-lg">
        <h1>Results</h1>
        <h2 className="text-center">Thank you for completing this quiz. Here are your results</h2>
        <div className="flex flex-row gap-sm">
          <div
            className="relative flex flex-col items-center justify-center rounded-[2rem] border-2 border-solid border-text bg-bg3 p-sm font-btn text-sm uppercase
      text-text ">
            <h2>Time</h2>
            <h3>{formatTime(timeSpent)}</h3>
          </div>
          <div
            className="relative flex flex-col items-center justify-center gap-xs rounded-[2rem] border-2 border-solid border-text bg-text p-md text-center font-btn text-sm uppercase
       text-bg3 shadow-lg">
            <h2>Correct Answers</h2>
            <div className="flex flex-row items-center">
              <h3
                className="relative flex items-center justify-center rounded-[2rem] border-2 border-solid border-text bg-bg3 p-xs font-btn text-xl uppercase
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
                Category:{' '}
                <span>
                  {currentQuizSettings.category ? currentQuizSettings.category.text : 'Any'}
                </span>
              </li>
              <li>
                Difficulty:{' '}
                <span>
                  {currentQuizSettings.difficulty ? currentQuizSettings.difficulty.text : 'Any'}
                </span>
              </li>
              <li>
                Type:{' '}
                <span>{currentQuizSettings.type ? currentQuizSettings.type.text : 'Any'}</span>
              </li>
              <li>
                Time: <span>{currentQuizSettings.time.value} min</span>
              </li>
            </ul>
          </div>

          <div className="flex h-full flex-col items-end justify-end gap-xs">
            <Button format="sm border" onClick={handleRestart} className="relative ">
              <div className="relative flex h-full w-full flex-row items-center justify-center gap-3xs">
                <RestartIcon className="h-md w-md" />
                {showLoading ? '' : 'Restart'}
              </div>
            </Button>
            <Button
              format="lg border"
              className="bg-bg"
              onClick={() => {
                dispatch(resetSettings())
                navigate(ROUTES.root)
              }}>
              Choose another quiz
            </Button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        toggleDialog={toggleModal}
        confirmAction={mockRestart}
        message={modalMessage}
        additionalMessage="Use mock questions?"
        confirmButtonMessage="Yes, Mock Me!"
        cancelButtonMessage="No, Thanks"
      />
    </>
  )
}
