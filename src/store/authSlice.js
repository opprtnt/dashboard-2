import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'user',
  initialState: {
    name: null,
  },
  reducers: {
    initCurrentUser(state, action) {
      console.log(state);
      console.log(action);
      state.name = action.payload;
    },
  },
});
export const { initCurrentUser } = authSlice.actions;

export default authSlice.reducer;
