import { configureStore } from '@reduxjs/toolkit'
import { settingsReducer } from './slices/settings'
import { gameReducer } from './slices/game'
import { statsReducer } from './slices/stats'
import { questionsApi } from './api/questionsApi'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'

const statsPersistConfig = {
  key: 'stats',
  storage
}

// Apply persistReducer to statsReducer
const persistedStatsReducer = persistReducer(statsPersistConfig, statsReducer)

const store = configureStore({
  reducer: {
    settings: settingsReducer,
    game: gameReducer,
    stats: persistedStatsReducer,
    [questionsApi.reducerPath]: questionsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(questionsApi.middleware)
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export default store
