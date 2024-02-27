import { createSlice } from '@reduxjs/toolkit'
import { Stats } from '../types'

const initialState: Stats = {
  answeredCategories: {}
}

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    addAnsweredCategories: (state, action) => {
      const category = action.payload
      if (state.answeredCategories[category]) {
        state.answeredCategories[category] += 1
      } else {
        state.answeredCategories[category] = 1
      }
    },
    resetStats: () => {
      return initialState
    }
  }
})

export const { addAnsweredCategories, resetStats } = statsSlice.actions
export const statsReducer = statsSlice.reducer
