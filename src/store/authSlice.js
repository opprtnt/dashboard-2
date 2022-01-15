import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

export const setUserAuth = createAsyncThunk('/user', function () {
  const auth = getAuth();
  //const [user] = useAuthState(auth);
  //console.log(user);
  return JSON.parse(JSON.stringify(auth));
});

const authSlice = createSlice({
  name: 'user',
  initialState: {
    auth: null,
    userData: null,
    data: null,
    viewTable: true,
    filter: [],
    titlePage: 'Title',
    themeDark: false,
  },
  reducers: {
    initCurrentUser(state, action) {
      state.userData = action.payload;
    },
    setData(state, action) {
      console.log(action.payload);
      state.data = action.payload;
    },
    changeViewTable(state, action) {
      state.viewTable = action.payload;
    },
    changeFilter(state, action) {
      state.filter = action.payload;
    },
    initAuth(state, action) {
      state.auth = action.payload;
    },
    setTitlePage(state, action) {
      state.titlePage = action.payload;
    },
    toggleThemeDark(state, action) {
      state.themeDark = action.payload;
    },
  },
  extraReducers: {
    [setUserAuth.pending]: (state) => {
      state.status = 'loading';
    },
    [setUserAuth.fulfilled]: (state, action) => {
      state.auth = action.payload;
    },
    [setUserAuth.rejected]: (state, action) => {},
  },
});
export const { initCurrentUser, setData, changeViewTable, changeFilter, initAuth, setTitlePage, toggleThemeDark } =
  authSlice.actions;

export default authSlice.reducer;
