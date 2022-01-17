import { configureStore } from '@reduxjs/toolkit';
import authReducer from './appSlice';

export default configureStore({
  reducer: {
    user: authReducer,
  },
});
