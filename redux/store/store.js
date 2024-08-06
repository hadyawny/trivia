import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import scoreReducer from '../store/slices/scoreSlice.jsx';

const makeStore = () => configureStore({
  reducer: {
    score: scoreReducer,
  },
});

export const wrapper = createWrapper(makeStore);
