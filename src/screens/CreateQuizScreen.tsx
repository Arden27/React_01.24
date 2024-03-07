import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ROUTES } from '@/navigation/router'
import menuOptions from '@/data/menuOptions'
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import { SetQuantityGroup } from '@/components/SetQuantityGroup'
import mockQuestions from '@/data/mockQuestions'
import { PayloadType } from '@/components/Dropdown'
import { setSettings } from '@/redux/slices/settings'
import { setQuestions } from '@/redux/slices/game'
import { QuizSettings } from '@/redux/types'
import { useLazyFetchQuestionsQuery, useFetchCategoriesQuery } from '@/redux/api/questionsApi'
import { Dropdown } from '@/components/Dropdown'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

interface Category {
  id: string
  name: string
}

export function CreateQuizScreen() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [categories, setCategories] = useState<Category[]>([])
  const [modalMessage, setModalMessage] = useState('Server is not responding')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data: fetchedCategories } = useFetchCategoriesQuery()
  const totalAnswered = useSelector((state: RootState) => state.stats.totalAnswered)

  const settingsRef = useRef<QuizSettings>({
    numberOfQuestions: 5,
    category: null,
    difficulty: null,
    type: null,
    time: { text: '', value: '1' }
  })

  useEffect(() => {
    fetchedCategories && setCategories(fetchedCategories)
  }, [fetchedCategories])

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
          text: category.name,
          value: category.id
        }
      })
    },
    ...menuOptions
  ]

  const handleSetQuantity = (quantity: number) => {
    settingsRef.current.numberOfQuestions = quantity
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

      dispatch(setSettings(settingsRef.current))
      const data = await fetchQuestions(settingsRef.current).unwrap()

      responseReceived = true
      clearTimeout(timer)

      if (data.results) {
        dispatch(setQuestions(data.results))
        navigate(ROUTES.play)
      }
    } catch (error) {
      console.error('Failed to fetch questions:', error)
      setModalMessage('Error fetching questions')
      toggleModal()
    } finally {
      setShowLoading(false)
    }
  }

  const handleSelect = (index: number, payload: PayloadType) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const settings = settingsRef.current as any
    settings[payload.label] = payload.items[index]
  }

  return (
    <>
      <div className="relative col-start-2 row-start-2 grid grid-rows-[auto__auto_1fr_auto] place-items-center gap-md  rounded-[2rem] border-2 border-solid border-text bg-gradient-to-r from-bg2 to-bg3 shadow-lg">
        <h1 className="flex justify-center text-xl font-bold">Create Quiz</h1>
        <div className="flex h-xl items-center gap-2xs">
          <h2 className="text-lg ">with</h2>
          <SetQuantityGroup
            min={5}
            max={15}
            onChange={handleSetQuantity}
            className="rounded-[2rem] border-2 border-text bg-bg3"
            classNameButtons="text-md"
            classNameInput="text-lg"
          />
          <h2 className="text-lg">questions</h2>
        </div>

        <div className="grid h-full place-items-center gap-sm text-center">
          {menuOptionsWithCategories.map((menuOption, index) => (
            <Dropdown
              key={`dropdown-${index}`}
              payload={menuOption}
              placeholder={`Choose ${menuOption.label}`}
              onSelect={handleSelect}></Dropdown>
          ))}
        </div>

        <div className=" grid grid-cols-2 gap-2xs items-center">
          <Button format="border fill lg" className="" onClick={handleStartQuiz}>
            {showLoading ? 'loading...' : 'Start Quiz'}
          </Button>
          <Button
            format="sm border"
            disabled={!totalAnswered}
            className={`${totalAnswered ? '' : ''}`}
            onClick={() => navigate(ROUTES.statistics)}>
            See my statistics
          </Button>
        </div>
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
