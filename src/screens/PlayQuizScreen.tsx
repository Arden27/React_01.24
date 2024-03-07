import he from 'he'
import { useEffect, useState } from 'react'
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
import { motion, AnimatePresence } from 'framer-motion'

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

  // animation
  const [isAnswersVisible, setIsAnswersVisible] = useState(true)

  const toggleAnimation = () => {
    setIsAnswersVisible(false)
    setTimeout(() => {
      setIsAnswersVisible(true)
    }, 100)
  }

  useEffect(() => {
    setIsAnswersVisible(true)
  }, [])

  const containerVariants = {
    visible: {
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    },
    hidden: {}
  }

  const itemVariants = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0 }
  }

  useEffect(() => {
    if (questions.length > 0 && currentQuestion < questions.length) {
      const currentAnswers = [...questions[currentQuestion].incorrect_answers, currentCorrectAnswer]
      const shuffled = shuffleArray(currentAnswers)
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
        className={`relative col-start-2 row-start-2 grid grid-rows-[auto_auto_1fr_auto] place-items-center gap-sm  rounded-[2rem] border-2 border-solid border-text bg-gradient-to-r from-bg2 to-bg3 shadow-lg ${isModalOpen ? 'pointer-events-none ' : ''}`}>
        <CountdownTimer
          className="slide-in-bottom absolute -top-lg right-xl -z-10 flex rounded-tl-[1rem] rounded-tr-[1rem] border-2 border-solid border-text bg-gradient-to-b from-bg2 to-bg p-xs pt-3xs text-lg shadow-2xl"
          initialTime={Number(time.value) * 60}
        />

        <h1 className="flex text-xl font-bold">
          Question&nbsp;
          <span className="relative -top-3xs text-2xl">{currentQuestion + 1}</span>
          &nbsp;of&nbsp;
          <span className="relative -top-3xs  text-2xl">{numberOfQuestions}</span>
        </h1>
        <h2 className=" flex  items-center justify-center text-center text-md italic">
          {he.decode(questions[currentQuestion].category)}
        </h2>

        <p className="text-center text-lg font-bold">
          {he.decode(questions[currentQuestion].question)}
        </p>
        <AnimatePresence>
          {isAnswersVisible && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid w-full grid-cols-1 place-items-center gap-sm overflow-hidden sm:grid-cols-2"
              variants={containerVariants}
              onClick={handleAnswerClick}>
              {shuffledAnswers.map((answer, index) => {
                const decodedAnswer = he.decode(answer)
                return (
                  <motion.div className="w-full" key={answer} variants={itemVariants}>
                    <Button
                      key={answer}
                      format="lg border"
                      className={twMerge(
                        getAnswerButtonClass(decodedAnswer),
                        index % 2 === 0 ? 'justify-self-end' : 'justify-self-start',
                        'w-full '
                      )}>
                      {decodedAnswer}
                    </Button>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <Button format="sm border" className="opacity-80 hover:opacity-100" onClick={toggleDialog}>
          End Quiz
        </Button>
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
