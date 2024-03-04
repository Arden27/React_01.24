import he from 'he'
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/navigation/router'
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import { CountdownTimer } from '@/components/CountdownTimer'
import { useDispatch, useSelector } from 'react-redux'
import { addCorrectAnswer } from '@/redux/slices/game'
import { updateStats } from '@/redux/slices/stats'
import { RootState } from '@/redux/store'
import { twMerge } from 'tailwind-merge'
import { shuffleArray } from '@/utils/shuffleArray'

export function PlayQuizScreen() {
  const navigate = useNavigate()
  const questions = useSelector((state: RootState) => state.game.questions)
  const time = useSelector((state: RootState) => state.settings.time)
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const numberOfQuestions = questions.length
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const currentCorrectAnswer =
    questions.length > 0 && he.decode(questions[currentQuestion].correct_answer)

  const dispatch = useDispatch()

  const maxWidthRef = useRef('100px')

  const getTextWidth = (text: string, font: string) => {
    // Create a canvas element
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (!context) {
      return 0
    }
    context.font = font
    return context.measureText(text).width
  }

  useEffect(() => {
    if (questions.length > 0 && currentQuestion < questions.length) {
      const currentAnswers = [...questions[currentQuestion].incorrect_answers, currentCorrectAnswer]
      const shuffled = shuffleArray(currentAnswers)

      // Calculate width for answers buttons based on the longest answer
      const maxWidth = shuffled.reduce((max, answer) => {
        const decodedAnswer = he.decode(answer)
        const width = getTextWidth(decodedAnswer, 'bold 16px Satoshi')
        return Math.max(max, width)
      }, 0)

      maxWidthRef.current = `${maxWidth}px`
      setShuffledAnswers(shuffled)
    }
  }, [questions, currentQuestion, currentCorrectAnswer])

  useEffect(() => {
    if (questions.length === 0) {
      navigate(ROUTES.root, { replace: true })
    }
  }, [questions, navigate])

  const handleAnswerClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement
    if (target.tagName === 'BUTTON') {
      const answer = target.textContent || ''
      const decodedAnswer = he.decode(answer)

      if (decodedAnswer === currentCorrectAnswer) {
        dispatch(addCorrectAnswer())
      }

      setSelectedAnswer(decodedAnswer)

      setTimeout(() => {
        setSelectedAnswer(null)
        if (currentQuestion === numberOfQuestions - 1) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          dispatch(updateStats() as any) // TODO fix any
          navigate(ROUTES.result, { replace: true })
        } else {
          setCurrentQuestion((prev) => prev + 1)
        }
      }, 500)
    }
  }

  const getAnswerButtonClass = (answer: string): string => {
    const decodedAnswer = he.decode(answer)
    if (selectedAnswer && decodedAnswer === currentCorrectAnswer) {
      return 'bg-green-300 hover:bg-green-300 text-text hover:text-text'
    } else if (selectedAnswer === decodedAnswer && decodedAnswer !== currentCorrectAnswer) {
      return 'bg-red-300 hover:bg-red-300 text-text hover:text-text'
    } else {
      return 'bg-bg'
    }
  }

  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleDialog = () => {
    setIsModalOpen((prev) => !prev)
  }

  const confirmEndQuiz = () => {
    navigate(ROUTES.root, { replace: true })
  }

  if (questions.length === 0) {
    return null
  }

  return (
    <>
      <div
        className={`z-0 flex h-screen w-screen items-center justify-center ${isModalOpen ? 'pointer-events-none opacity-50' : ''}`}>
        <div
          className={`relative m-lg grid max-w-xl grid-cols-1 items-center justify-items-center gap-md rounded-[2rem] border-2 border-solid border-text bg-gradient-to-r from-bg3 to-bg2 p-lg shadow-2xl`}>
          <CountdownTimer
            className="slide-in-bottom absolute -top-lg right-xl -z-10 flex rounded-tl-[1rem] rounded-tr-[1rem] border-2 border-solid border-text bg-gradient-to-b from-bg2 to-bg p-xs pt-3xs text-lg shadow-2xl"
            initialTime={Number(time.value) * 60}
          />
          <div className="grid gap-3xs text-center">
            <h3>
              Question {currentQuestion + 1} of {numberOfQuestions}
            </h3>
            <h4>{questions[currentQuestion].category}</h4>
          </div>

          <h2 className="text-center">{he.decode(questions[currentQuestion].question)}</h2>

          <div className="grid gap-2" onClick={handleAnswerClick}>
            <div className="grid grid-cols-2 gap-2">
              {shuffledAnswers.map((answer, index) => (
                <Button
                  key={answer}
                  format="lg border"
                  // className={`${getAnswerButtonClass(he.decode(answer))} w-[${maxColumnWidth}] ${index % 2 === 0 ? 'justify-self-end' : 'justify-self-start'}`}
                  className={twMerge(
                    getAnswerButtonClass(he.decode(answer)),
                    index % 2 === 0 ? 'justify-self-end' : 'justify-self-start'
                  )}
                  style={{ width: maxWidthRef.current }}>
                  {he.decode(answer)}
                </Button>
              ))}
            </div>
          </div>

          <Button
            format="sm border"
            className="opacity-80 hover:opacity-100"
            onClick={toggleDialog}>
            End Quiz
          </Button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        toggleDialog={toggleDialog}
        confirmAction={confirmEndQuiz}
        message="Are you sure?"
        additionalMessage="Progress will be lost..."
        confirmButtonMessage="Yes, End Quiz"
        cancelButtonMessage="No, Continue"
      />
    </>
  )
}
