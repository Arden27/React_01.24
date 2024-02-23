// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit'

export interface QuizState {
  numberOfQuestions: number
  category: {name: string, id: number} | null
  difficulty: {name: string, id: string} | null
  type: {name: string, id: string} | null
  time: number
  timeSpent: number
  questions: any[]
  correctAnswers: number
}

const initialState: QuizState = {
  numberOfQuestions: 5,
  category: null,
  difficulty: null,
  type: null,
  time: 1,
  timeSpent: 0,
  questions: [],
  correctAnswers: 0
}

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setNumberOfQuestions: (state, action) => {
      state.numberOfQuestions = action.payload
    },
    setCategory: (state, action) => {
      state.category = action.payload
    },
    setDifficulty: (state, action) => {
      state.difficulty = action.payload
    },
    setType: (state, action) => {
      state.type = action.payload
    },
    setTime: (state, action) => {
      state.time = action.payload
    },
    setQuestions: (state, action) => {
      state.questions = action.payload
    },
    setTimeSpent: (state, action) => {
      state.timeSpent = action.payload
    },
    addCorrectAnswer: (state) => {
      state.correctAnswers++
    },
    resetCorrectAnswers: (state) => {
      state.correctAnswers = 0
    },
    resetSettings: () => initialState
  }
})

export const { setNumberOfQuestions, setCategory, setDifficulty, setType, setTime, setQuestions, setTimeSpent, addCorrectAnswer, resetCorrectAnswers, resetSettings } =
  quizSlice.actions

const store = configureStore({
  reducer: {
    quiz: quizSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export default store
