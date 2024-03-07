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

  const [isAnswersVisible, setIsAnswersVisible] = useState(true)
  const [value, setValue] = useState(0)

  const toggleAnimation = () => {
    setIsAnswersVisible(false)
    setTimeout(() => {
      setValue((prev) => prev + 1)
      setIsAnswersVisible(true)
    }, 100)
  }

  useEffect(() => {
    setIsAnswersVisible(true)
  }, [])

  const containerVariants = {
    visible: {
      transition: { staggerChildren: 0.2, delayChildren: 0.2 }
    },
    hidden: {}
  }

  const itemVariants = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0 }
  }

  useEffect(() => {
    if (questions.length > 0 && currentQuestion < questions.length) {
      toggleAnimation()
      const currentAnswers = [...questions[currentQuestion].incorrect_answers, currentCorrectAnswer]
      setShuffledAnswers(shuffleArray(currentAnswers))
    }
  }, [questions, currentQuestion, currentCorrectAnswer])

  useEffect(() => {
    if (questions.length === 0) {
      navigate(ROUTES.root, { replace: true })
    }
  }, [questions, navigate])

  const shuffleArray = (array: string[]): string[] => {
    let currentIndex = array.length
    let temporaryValue
    let randomIndex

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      // And swap it with the current element.
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }

    return array
  }

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
          className={`relative m-lg flex max-w-xl flex-col items-center justify-center gap-md rounded-[2rem] border-2 border-solid border-text bg-gradient-to-r from-bg3 to-bg2 p-lg shadow-2xl`}>
          <CountdownTimer
            className="slide-in-bottom absolute -top-lg right-xl -z-10 flex rounded-tl-[1rem] rounded-tr-[1rem] border-2 border-solid border-text bg-gradient-to-b from-bg2 to-bg p-xs pt-3xs text-lg shadow-2xl"
            initialTime={Number(time.value) * 60}
          />
          <div className="flex flex-col gap-3xs text-center">
            <h3>
              Question {currentQuestion + 1} of {numberOfQuestions}
            </h3>
            <h4>{questions[currentQuestion].category}</h4>
          </div>

          <h2 className="text-center">{he.decode(questions[currentQuestion].question)}</h2>

          <div className="grid grid-cols-2" onClick={handleAnswerClick}>
            {isAnswersVisible && (
              <motion.div
                //key={value} // Key changes on every button click
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid grid-cols-2 place-items-center"
                variants={containerVariants}>
                {shuffledAnswers.map((answer, index) => {
                  answer = he.decode(answer)
                  return (
                    <motion.div key={answer} variants={itemVariants}>
                      <Button
                        key={index}
                        format="lg border"
                        className={getAnswerButtonClass(answer)}>
                        {answer}
                      </Button>
                    </motion.div>
                  )
                })}
              </motion.div>
            )}
            {/* <AnimatePresence>
              {isAnswersVisible && (
                <motion.div
                  key={value} // Key changes on every button click
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="grid grid-cols-2"
                  variants={containerVariants}>
                  {[...Array(4)].map((_, i) => (
                    <motion.div key={i} variants={itemVariants}>
                      Div {value}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence> */}
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
