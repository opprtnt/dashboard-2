import { configureStore } from '@reduxjs/toolkit';
import authReducer from './appSlice';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
export const store = configureStore({
  reducer: {
    user: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
