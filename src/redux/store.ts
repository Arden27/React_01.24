import { configureStore } from '@reduxjs/toolkit'
import { settingsReducer } from './slices/settings'
import { gameReducer } from './slices/game'
import { questionsApi } from './api/questionsApi'

const combinedReducers = {
  settings: settingsReducer,
  game: gameReducer,
  [questionsApi.reducerPath]: questionsApi.reducer
}

const store = configureStore({
  reducer: combinedReducers,
  middleware: (gDM) => gDM().concat(questionsApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export default store
