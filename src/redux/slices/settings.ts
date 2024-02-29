import { createSlice } from '@reduxjs/toolkit'
import { QuizSettings } from '../types'

const initialState: QuizSettings = {
  numberOfQuestions: 5,
  category: null,
  difficulty: null,
  type: null,
  time: { text: '', value: '1' }
}

const settingsSlice = createSlice({
  name: 'settings',
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
    setSettings: (state, action) => {
      state.numberOfQuestions = action.payload.numberOfQuestions
      state.category = action.payload.category
      state.difficulty = action.payload.difficulty
      state.type = action.payload.type
      state.time = action.payload.time
    },
    resetSettings: () => initialState
  }
})

export const {
  setNumberOfQuestions,
  setCategory,
  setDifficulty,
  setType,
  setTime,
  resetSettings,
  setSettings
} = settingsSlice.actions

export const settingsReducer = settingsSlice.reducer
