import { configureStore } from '@reduxjs/toolkit'
import { settingsReducer } from './slices/settings'
import { gameReducer } from './slices/game'

const store = configureStore({
  reducer: {
    settings: settingsReducer,
    game: gameReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export default store
