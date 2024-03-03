import { createSlice } from '@reduxjs/toolkit'
import { QuizSettings } from '../types'

const initialState: QuizSettings = {
  numberOfQuestions: 5,
  category: null,
  difficulty: null,
  type: null,
  time: { text: '1m', value: '1' }
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
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

export const { resetSettings, setSettings } = settingsSlice.actions

export const settingsReducer = settingsSlice.reducer
