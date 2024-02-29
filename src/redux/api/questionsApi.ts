import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { QuizSettings } from '../types'

interface Question {
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

interface QuizApiResponse {
  response_code: number
  results: Question[]
}

interface Category {
  id: number
  name: string
}

export const questionsApi = createApi({
  reducerPath: 'questionsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://opentdb.com/' }),
  endpoints: (builder) => ({
    fetchQuestions: builder.query<QuizApiResponse, QuizSettings>({
      query: (settings) => {
        const query = new URLSearchParams({ amount: settings.numberOfQuestions.toString() })
        if (settings.category) query.set('category', settings.category.id.toString())
        if (settings.difficulty && settings.difficulty.id !== 'any')
          query.set('difficulty', settings.difficulty.id)
        if (settings.type && settings.type.id !== 'any') query.set('type', settings.type.id)

        return `api.php?${query.toString()}`
      }
    }),
    fetchCategories: builder.query<Category[], void>({
      query: () => 'api_category.php',
      transformResponse: (response: { trivia_categories: Category[] }) => response.trivia_categories
    })
  })
})

export const { useLazyFetchQuestionsQuery, useFetchCategoriesQuery } = questionsApi
