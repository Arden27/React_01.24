import { Dispatch } from 'redux'
import { setQuestions } from '@/redux/slices/game'
import { QuizSettings } from '@/redux/types'

export const fetchQuestions = async (quizSettings: QuizSettings, dispatch: Dispatch) => {
  console.log('fetching')
  try {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=${quizSettings.numberOfQuestions}${quizSettings.category ? `&category=${quizSettings.category.id}` : ''}${quizSettings.difficulty && quizSettings.difficulty.id !== 'any' ? `&difficulty=${quizSettings.difficulty.id}` : ''}${quizSettings.type && quizSettings.type.id !== 'any' ? `&type=${quizSettings.type.id}` : ''}`
    )
    const data = await response.json()
    console.log('data')
    console.log('=========')
    console.log(data)
    dispatch(setQuestions(data.results))
    return true
  } catch (error) {
    console.error('Error fetching questions:', error)
    return false
  }
}
