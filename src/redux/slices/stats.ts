import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { Stats } from '../types'

// Unified thunk for updating stats
export const updateStats = createAsyncThunk('stats/updateStats', async (_, { getState }) => {
  const state = getState() as RootState
  const questions = state.game.questions
  const correctAnswers = state.game.correctAnswers
  const numberOfQuestions = questions.length

  const categories: Record<string, number> = {}
  const difficulties: Record<string, number> = {}
  const types: Record<string, number> = {}

  for (const question of questions) {
    const { category, difficulty, type } = question
    categories[category] = (categories[category] || 0) + 1
    difficulties[difficulty] = (difficulties[difficulty] || 0) + 1
    types[type] = (types[type] || 0) + 1
  }

  return { categories, difficulties, types, numberOfQuestions, correctAnswers }
})

const initialState: Stats = {
  totalAnsweredCategories: {},
  totalAnsweredDifficulties: {},
  totalAnsweredTypes: {},
  totalAnswered: 0,
  totalCorrectAnswers: 0
}

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    resetStats: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(updateStats.fulfilled, (state, action) => {
      const { categories, difficulties, types, numberOfQuestions, correctAnswers } = action.payload

      // Update categories
      for (const category in categories) {
        if (state.totalAnsweredCategories.hasOwnProperty(category)) {
          state.totalAnsweredCategories[category] += categories[category]
        } else {
          state.totalAnsweredCategories[category] = categories[category]
        }
      }

      // Update difficulties
      for (const difficulty in difficulties) {
        if (state.totalAnsweredDifficulties.hasOwnProperty(difficulty)) {
          state.totalAnsweredDifficulties[difficulty] += difficulties[difficulty]
        } else {
          state.totalAnsweredDifficulties[difficulty] = difficulties[difficulty]
        }
      }

      // Update types
      for (const type in types) {
        if (state.totalAnsweredTypes.hasOwnProperty(type)) {
          state.totalAnsweredTypes[type] += types[type]
        } else {
          state.totalAnsweredTypes[type] = types[type]
        }
      }

      state.totalAnswered += numberOfQuestions
      state.totalCorrectAnswers += correctAnswers
    })
  }
})

export const { resetStats } = statsSlice.actions
export const statsReducer = statsSlice.reducer
