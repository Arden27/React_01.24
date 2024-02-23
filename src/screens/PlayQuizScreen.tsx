import he from 'he'
import { useEffect, useRef, useState } from 'react'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/navigation/router'
import { Button } from '@/components/Button'
import { CountdownTimer } from '@/components/CountdownTimer'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

export function PlayQuizScreen() {
  const navigate = useNavigate()
  const modalRef = useRef(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const questions = useSelector((state: RootState) => state.quiz.questions)
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([])

  const numberOfQuestions = questions.length
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const dispatch = useDispatch()

  useEffect(() => {
    if (questions.length > 0 && currentQuestion < questions.length) {
      const currentAnswers = [
        ...questions[currentQuestion].incorrect_answers,
        questions[currentQuestion].correct_answer
      ]
      setShuffledAnswers(shuffleArray(currentAnswers))
    }
  }, [questions, currentQuestion])

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

  if (questions.length === 0) {
    return null // TODO add some fallback UI
  }

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
            <h3>
              Question {currentQuestion + 1} of {numberOfQuestions}
            </h3>
          </div>
          <h2 className="text-center">{he.decode(questions[currentQuestion].question)}</h2>

          <div
            className="flex flex-col gap-2"
            onClick={() => {
              if (currentQuestion === numberOfQuestions - 1) {
                navigate(ROUTES.result, { replace: true })
              } else {
                setCurrentQuestion((prev) => prev + 1)
              }
            }}>
            {shuffledAnswers.length === 2 && (
              <div className="flex flex-row gap-2">
                {shuffledAnswers.map((answer, index) => (
                  <Button key={index} format="lg border" className="bg-bg">
                    {answer}
                  </Button>
                ))}
              </div>
            )}

            {shuffledAnswers.length === 4 && (
              <>
                <div className="flex flex-row gap-2">
                  {shuffledAnswers.slice(0, 2).map((answer, index) => (
                    <Button key={index} format="lg border" className="bg-bg">
                      {answer}
                    </Button>
                  ))}
                </div>
                <div className="flex flex-row gap-2">
                  {shuffledAnswers.slice(2, 4).map((answer, index) => (
                    <Button key={index} format="lg border" className="bg-bg">
                      {answer}
                    </Button>
                  ))}
                </div>
              </>
            )}
          </div>
          
          <Button format="sm border" className="opacity-80 hover:opacity-100" onClick={showDialog}>
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
