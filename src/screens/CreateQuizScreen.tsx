import { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ROUTES } from '@/navigation/router'
import menuOptions from '@/data/menuOptions'
import { Button } from '@/components/Button'
import { DropdownMenu } from '@/components/DropdownMenu'
import { SetQuantityGroup } from '@/components/SetQuantityGroup'
import { setCategory, setDifficulty, setType, setTime, setNumberOfQuestions } from '@/redux/store'
import { RootState, QuizState } from '@/redux/store'

interface Category {
  id: number
  name: string
}

export function CreateQuizScreen() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const quizSettings = useSelector((state: RootState) => state.quiz) // Specify RootState type
  const [categories, setCategories] = useState<Category[]>([])
  const initialLoad = useRef(true)

  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false
      fetch('https://opentdb.com/api_category.php')
        .then((response) => response.json())
        .then((data) => {
          setCategories(data.trivia_categories)
          console.log('loaded')
        })
    } else {
      console.log('another load')
    }
  }, [])

  const handleSelect = (label: string, selectedItem: string) => {
    switch (label.toLowerCase()) {
      case 'category':
        dispatch(setCategory(selectedItem))
        break
      case 'difficulty':
        dispatch(setDifficulty(selectedItem))
        break
      case 'type':
        dispatch(setType(selectedItem))
        break
      case 'time':
        dispatch(setTime(selectedItem))
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
      label: 'Category',
      items: categories.map((category) => category.name)
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
              selected={quizSettings[option.label.toLowerCase() as keyof QuizState] as string}>
              <DropdownMenu.Placeholder>Choose {option.label}</DropdownMenu.Placeholder>
              <DropdownMenu.List className="absolute -right-2xs z-50 mt-3xs flex max-h-64 flex-col gap-3xs overflow-y-auto whitespace-nowrap rounded-[2rem] bg-bar p-xs text-end font-btn text-sm shadow">
                {option.items.map((item, itemIndex) => (
                  <DropdownMenu.Item
                    key={`${option.label}-${item}-${itemIndex}`}
                    className="w-full justify-end border-transparent hover:text-bar">
                    {item}
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
      <div>{JSON.stringify(quizSettings)}</div>
    </div>
  )
}
