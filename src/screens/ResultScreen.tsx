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
      <div className="relative col-start-2 row-start-2 grid grid-rows-[auto_auto_1fr_auto] place-items-center gap-md  rounded-[2rem] border-2 border-solid border-text  bg-gradient-to-r from-bg2 to-bg3 shadow-lg">
        <h1 className="  flex justify-center text-xl font-bold">Results</h1>
        <h2 className=" text-center font-serif text-lg font-bold ">
          Thank you for completing this quiz. Here are your results
        </h2>

        <div className="[&>*]:shadow-l grid h-full grid-cols-[1fr_3fr] grid-rows-2 gap-x-2xs text-center text-sm text-text [&>*]:row-span-2 [&>*]:grid [&>*]:grid-rows-subgrid [&>*]:place-items-center [&>*]:rounded-[2rem] [&>*]:p-xs [&>*]:uppercase [&>*]:shadow-lg">
          <div className="border-2 border-solid border-text bg-bg3  ">
            <h2 className="">Time</h2>
            <h3 className=" text-md">{formatTime(timeSpent)}</h3>
          </div>

          <div className="bg-text text-bg3">
            <h2 className="">Correct Answers</h2>
            <div className="flex place-items-center gap-2xs ">
              <h3 className="text-nowrap rounded-[2rem]  bg-bg3 p-2xs font-btn text-xl text-text">
                {correctAnswers} / {numberOfQuestions}
              </h3>
              <h3 className=" text-md">
                {calculatePercentage(correctAnswers, numberOfQuestions)}%
              </h3>
            </div>
          </div>
        </div>

        <ul className="place-self-start pb-[calc(theme(spacing.lg)+theme(spacing.xs))] min-[400px]:pb-0 [&>li>span]:font-btn [&>li]:ml-sm [&>li]:pt-3xs">
          <h3 className="text-lg">Quiz Settings</h3>
          <li className="">
            Category:{' '}
            <span>{currentQuizSettings.category ? currentQuizSettings.category.text : 'Any'}</span>
          </li>
          <li>
            Difficulty:{' '}
            <span>
              {currentQuizSettings.difficulty ? currentQuizSettings.difficulty.text : 'Any'}
            </span>
          </li>
          <li>
            Type: <span>{currentQuizSettings.type ? currentQuizSettings.type.text : 'Any'}</span>
          </li>
          <li>
            Time: <span>{currentQuizSettings.time.value} min</span>
          </li>
        </ul>

        <div className="absolute bottom-xs  right-md flex h-full flex-col items-end justify-end gap-2xs">
          <Button
            format="sm border"
            onClick={handleRestart}
            className={`${showLoading ? 'hover:bg-transparent hover:text-text' : ''}`}>
            <div className="relative grid auto-cols-max grid-flow-col place-items-center gap-3xs">
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
