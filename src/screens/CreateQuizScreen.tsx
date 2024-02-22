import { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ROUTES } from '@/navigation/router'
import menuOptions from '@/data/menuOptions'
import { Button } from '@/components/Button'
import { DropdownMenu } from '@/components/DropdownMenu'
import { SetQuantityGroup } from '@/components/SetQuantityGroup'
import { setCategory, setDifficulty, setType, setTime, setNumberOfQuestions, setQuestions } from '@/redux/store'
import { RootState, QuizState } from '@/redux/store'

interface Category {
  id: number
  name: string
}

export function CreateQuizScreen() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const quizSettings = useSelector((state: RootState) => state.quiz as QuizState)
  const [categories, setCategories] = useState<Category[]>([])
  const initialLoad = useRef(true)

  const questions = useSelector((state: RootState) => state.quiz.questions)

  // const [questions, setQuestions] = useState('test')

  const getQuestions = () => {
    console.log('fetching')
    fetch(
      `https://opentdb.com/api.php?amount=${quizSettings.numberOfQuestions}${quizSettings.category ? `&category=${quizSettings.category.id}` : ''}${quizSettings.difficulty && quizSettings.difficulty.id !== 'any' ? `&difficulty=${quizSettings.difficulty.id}` : ''}${quizSettings.type && quizSettings.type.id !== 'any' ? `&type=${quizSettings.type.id}` : ''}`
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(setQuestions(data.results))
      })
  }

  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false
      fetch('https://opentdb.com/api_category.php')
        .then((response) => response.json())
        .then((data) => {
          setCategories(data.trivia_categories)
        })
    }
  }, [])

  // temporary workaround function to find according to the selected option id for API call, TODO - upgrade DropdownMenu function to be able to return additional data
  const findID = (category: string, name: string) => {
    for (const optionsObject of menuOptionsWithCategories) {
      if (optionsObject.label === category) {
        for (const item of optionsObject.items) {
          if (item.name === name) {
            return item.id
          }
        }
      }
    }
  }

  const handleSelect = (label: string, selectedItem: string) => {
    switch (label) {
      case 'category':
        dispatch(setCategory({ name: selectedItem, id: findID(label, selectedItem) }))
        break
      case 'difficulty':
        dispatch(setDifficulty({ name: selectedItem, id: findID(label, selectedItem) }))
        break
      case 'type':
        dispatch(setType({ name: selectedItem, id: findID(label, selectedItem) }))
        break
      case 'time':
        dispatch(setTime(parseInt(selectedItem)))
        break
      default:
        break
    }
  }

  const handleSetQuantity = (quantity: number) => {
    dispatch(setNumberOfQuestions(quantity))
  }

  const menuOptionsWithCategories = [
    categories && {
      label: 'category',
      items: categories.map((category) => {
        return {
          name: category.name,
          id: category.id
        }
      })
    },
    ...menuOptions
  ]

  return (
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

      {menuOptionsWithCategories.map(
        (option, index) =>
          option && (
            <DropdownMenu
              onSelect={(selectedItem) => handleSelect(option.label, selectedItem)}
              key={`dropdown-${index}`}
              selected={quizSettings[option.label as keyof QuizState] as string}>
              <DropdownMenu.Placeholder>Choose {option.label}</DropdownMenu.Placeholder>
              <DropdownMenu.List className="absolute -right-2xs z-50 mt-3xs flex max-h-64 flex-col gap-3xs overflow-y-auto whitespace-nowrap rounded-[2rem] bg-bar p-xs text-end font-btn text-sm shadow">
                {option.items.map((item, itemIndex) => (
                  <DropdownMenu.Item
                    key={`${option.label}-${item}-${itemIndex}`}
                    className="w-full justify-end border-transparent hover:text-bar">
                    {item.name}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.List>
            </DropdownMenu>
          )
      )}

      <Button format="lg border fill" className="" onClick={() => navigate(ROUTES.play)}>
        Start quiz
      </Button>
      <Button format="sm border" onClick={() => navigate(ROUTES.statistics)}>
        See my statistics
      </Button>
      {/* <div>{JSON.stringify(quizSettings)}</div>
      <p>{`https://opentdb.com/api.php?amount=${quizSettings.numberOfQuestions}${quizSettings.category ? `&category=${quizSettings.category.id}` : ''}${quizSettings.difficulty && quizSettings.difficulty.id !== 'any' ? `&difficulty=${quizSettings.difficulty.id}` : ''}${quizSettings.type && quizSettings.type.id !== 'any' ? `&type=${quizSettings.type.id}` : ''}`}</p> */}
      <Button onClick={getQuestions} format="sm fill border">Get questions</Button>
      <div className='w-4/5'>
        {JSON.stringify(questions)}
      </div>
    </div>
  )
}
