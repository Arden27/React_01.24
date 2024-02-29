import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ROUTES } from '@/navigation/router'
import menuOptions from '@/data/menuOptions'
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import { SetQuantityGroup } from '@/components/SetQuantityGroup'
import mockQuestions from '@/data/mockQuestions'
import { PayloadType } from '@/components/Dropdown'
import {
  setCategory,
  setDifficulty,
  setType,
  setTime,
  setNumberOfQuestions
} from '@/redux/slices/settings'
import { setQuestions } from '@/redux/slices/game'
import { RootState } from '@/redux/store'
import { QuizSettings } from '@/redux/types'
import { useLazyFetchQuestionsQuery, useFetchCategoriesQuery } from '@/redux/api/questionsApi'
import { Dropdown } from '@/components/Dropdown'

interface Category {
  id: string
  name: string
}

export function CreateQuizScreen() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const quizSettings = useSelector((state: RootState) => state.settings as QuizSettings)
  const [categories, setCategories] = useState<Category[]>([])
  const [modalMessage, setModalMessage] = useState('Server is not responding')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data } = useFetchCategoriesQuery()

  useEffect(() => {
    data && setCategories(data)
  }, [data])

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev)
  }

  const mockStart = () => {
    dispatch(setQuestions(mockQuestions))
    navigate(ROUTES.play)
  }

  const menuOptionsWithCategories = [
    categories && {
      label: 'category',
      items: categories.map((category) => {
        return {
          option: category.name,
          id: category.id
        }
      })
    },
    ...menuOptions
  ]

  const handleSetQuantity = (quantity: number) => {
    dispatch(setNumberOfQuestions(quantity))
  }

  const [showLoading, setShowLoading] = useState(false)
  const [fetchQuestions] = useLazyFetchQuestionsQuery()

  const handleStartQuiz = async () => {
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

      const data = await fetchQuestions(quizSettings).unwrap()

      responseReceived = true
      clearTimeout(timer)

      if (data.results) {
        dispatch(setQuestions(data.results))
        navigate(ROUTES.play)
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

  const handleSelect = (index: number, payload: PayloadType) => {
    switch (payload.label) {
      case 'category': {
        dispatch(setCategory(payload.items[index]))
        break
      }
      case 'difficulty': {
        dispatch(setDifficulty(payload.items[index]))
        break
      }
      case 'type': {
        dispatch(setType(payload.items[index]))
        break
      }
      case 'time': {
        dispatch(setTime(payload.items[index].id))
        break
      }
      default:
        break
    }
  }

  return (
    <>
      <div className="relative m-lg flex max-w-xl flex-col items-center justify-center gap-xs rounded-[2rem] border-2 border-solid border-text bg-gradient-to-r from-bg2 to-bg3 p-lg shadow-lg">
        <h1 className="text-2xl font-bold">Create Quiz</h1>

        <div className="flex items-center space-x-2">
          <h3 className="text-lg">with</h3>
          <SetQuantityGroup
            min={5}
            max={15}
            value={quizSettings.numberOfQuestions}
            onChange={handleSetQuantity}
            className="rounded-[2rem] border-2 border-text bg-bg3"
            classNameButtons="text-md"
            classNameInput="text-lg"
          />
          <h3 className="text-lg">questions</h3>
        </div>

        {menuOptionsWithCategories.map((menuOption, index) => (
          <Dropdown
            key={`dropdown-${index}`}
            payload={menuOption}
            placeholder={`Choose ${menuOption.label}`}
            onSelect={handleSelect}></Dropdown>
        ))}

        <Button format="border fill lg" className="" onClick={handleStartQuiz}>
          {showLoading ? 'loading...' : 'Start Quiz'}
        </Button>

        <Button format="sm border" onClick={() => navigate(ROUTES.statistics)}>
          See my statistics
        </Button>
      </div>

      <Modal
        isOpen={isModalOpen}
        toggleDialog={toggleModal}
        confirmAction={mockStart}
        message={modalMessage}
        additionalMessage="Use mock questions?"
        confirmButtonMessage="Yes, Mock Me!"
        cancelButtonMessage="No, Thanks"
      />
    </>
  )
}
