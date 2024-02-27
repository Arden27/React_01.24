import { createSlice } from '@reduxjs/toolkit';
import { Stats } from '../types';

const initialState: Stats = {
  answeredCategories: {},
};

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    addAnsweredCategories: (state, action) => {
      const category = action.payload;
      if (state.answeredCategories[category]) {
        state.answeredCategories[category] += 1;
      } else {
        state.answeredCategories[category] = 1;
      }
    },
  },
});

export const { addAnsweredCategories } = statsSlice.actions;
export const statsReducer = statsSlice.reducer;
