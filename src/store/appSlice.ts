import { createSlice } from '@reduxjs/toolkit';
import { OrderByDirection } from 'firebase/firestore';
import { IDataTable } from '../interface';

export interface RootState {}
const authSlice = createSlice({
  name: 'user',
  initialState: {
    userData: { uid: '', displayName: '', photoURL: '' },
    data: [] as IDataTable[],
    viewTable: true,
    titlePage: 'Title',
    themeDark: false,
    sortTable: 'desc' as OrderByDirection,
    orderBy: 'date',
    filter: '',
    stateTable: false
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
    updateTable(state, action) {
      state.stateTable = action.payload;
    },
  },
});
export const {
  initCurrentUser,
  setData,
  changeViewTable,
  setTitlePage,
  toggleThemeDark,
  setSortTable,
  setOrderBy,
  setFilter,
  updateTable
} = authSlice.actions;

export default authSlice.reducer;
