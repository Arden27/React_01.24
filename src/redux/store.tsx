// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit'

export interface QuizState {
  numberOfQuestions: number;
  category: string | null;
  difficulty: string | null;
  type: string | null;
  time: string | null;
}

const initialState: QuizState = {
  numberOfQuestions: 5,
  category: null,
  difficulty: null,
  type: null,
  time: null
};

// Create a slice for quiz settings
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
    }
  }
})

// Export actions
export const { setNumberOfQuestions, setCategory, setDifficulty, setType, setTime } =
  quizSlice.actions

// Configure the Redux store
const store = configureStore({
  reducer: {
    quiz: quizSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export default store
