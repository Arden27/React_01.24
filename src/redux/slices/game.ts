import { createSlice } from '@reduxjs/toolkit'
import { Game } from '../types'
import { resetSettings } from './settings'

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
  },
  extraReducers: (builder) => {
    builder.addCase(resetSettings, () => initialState)
  }
})

export const { setQuestions, setTimeSpent, addCorrectAnswer, resetCorrectAnswers } =
  gameSlice.actions

export const gameReducer = gameSlice.reducer
