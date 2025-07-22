import { configureStore } from '@reduxjs/toolkit';
import pocReducer from '../features/pocs/pocSlice';

export const store = configureStore({
  reducer: {
    pocs: pocReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
