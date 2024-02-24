import { createSlice } from '@reduxjs/toolkit'
import { Game } from '../types'

const initialState: Game = {
  questions: [],
  correctAnswers: 0,
  timeSpent: 0
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
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
    }
  }
})

export const { setQuestions, setTimeSpent, addCorrectAnswer, resetCorrectAnswers } =
  gameSlice.actions

export const gameReducer = gameSlice.reducer
