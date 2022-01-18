import { createSlice } from '@reduxjs/toolkit';

export interface RootState {}
const authSlice = createSlice({
  name: 'user',
  initialState: {
    auth: null,
    userData: { uid: '', displayName: '', photoURL: '' },
    data: null,
    viewTable: true,
    titlePage: 'Title',
    themeDark: false,
    sortTable: 'desc',
    orderBy: 'date',
    filter: '',
  },
  reducers: {
    initCurrentUser(state, action) {
      state.userData = action.payload;
    },
    setData(state, action) {
      state.data = action.payload;
    },
    changeViewTable(state, action) {
      state.viewTable = action.payload;
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
    setSortTable(state, action) {
      state.sortTable = action.payload;
    },
    setOrderBy(state, action) {
      state.orderBy = action.payload;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});
export const {
  initCurrentUser,
  setData,
  changeViewTable,
  initAuth,
  setTitlePage,
  toggleThemeDark,
  setSortTable,
  setOrderBy,
  setFilter,
} = authSlice.actions;

export default authSlice.reducer;
