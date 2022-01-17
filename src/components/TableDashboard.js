import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { useState, useEffect } from 'react';
import Loader from './Loader';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ToolbarS from './TableToolbar';
import TableColView from './TableColView';
import TableGridView from './TableGridView';
import { useDispatch, useSelector } from 'react-redux';
import {
  collection,
  endBefore,
  getDocs,
  getFirestore,
  limit,
  limitToLast,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import { setData } from '../store/appSlice';

const theme = createTheme({
  palette: {
    primary: { main: '#F2C94C ' },
    success: { main: '#29CC97' },
    error: { main: '#F12B2C' },
  },
});

export default function TableDashboard() {
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0);
  const viewTable = useSelector((state) => state.user.viewTable);
  const db = getFirestore();
  const [lastVisible, setLastVisible] = useState();
  const [lastVisiblePrev, setLastVisiblePrev] = useState();
  const [lastVisibleSearch, setLastVisibleSearch] = useState();
  const [lastVisiblePrevSearch, setLastVisiblePrevSearch] = useState();
  const data = useSelector((state) => state.user.data);
  const [lastPage, setLastPage] = useState(0);
  const [dataLength, setDataLength] = useState(0);
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.user.sortTable);
  const sortOrderBy = useSelector((state) => state.user.orderBy);
  const searchItem = useSelector((state) => state.user.filter);
  useEffect(() => {
    async function createFirstTablePage() {
      if (!searchItem) {
        setPage(0);
        const first = query(collection(db, 'tickets'), orderBy(sortOrderBy, sort), limit(rowsPerPage));
        const documentSnapshots = await getDocs(first);
        setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
        let arr = [];
        documentSnapshots.forEach((doc) => {
          arr.push(Object.assign(JSON.parse(JSON.stringify(doc.data())), { id: doc.id }));
        });
        dispatch(setData(arr));
      }
    }
    createFirstTablePage();
  }, [rowsPerPage, sort, sortOrderBy, db, searchItem, dispatch]);

  //set size collection
  useEffect(() => {
    if (!searchItem) {
      async function setSizeTable() {
        const q = query(collection(db, 'count'));
        const documentSnapshots = await getDocs(q);
        documentSnapshots.forEach((v) => setDataLength(v.data().count));
      }
      setSizeTable();
    }
  }, [dataLength, searchItem, db]);
  //query for table data
  useEffect(() => {
    async function getTableData() {
      if (searchItem) return;
      if (page > lastPage) {
        if (lastVisible && page) {
          const queryNextPage = query(
            collection(db, 'tickets'),
            orderBy(sortOrderBy, sort),
            startAfter(lastVisible),
            limit(rowsPerPage)
          );
          const documentSnapshots = await getDocs(queryNextPage);
          setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
          setLastVisiblePrev(documentSnapshots.docs[0]);
          let arr = [];
          documentSnapshots.forEach((doc) => {
            arr.push(Object.assign(JSON.parse(JSON.stringify(doc.data())), { id: doc.id }));
          });
          dispatch(setData(arr));
          setLastPage(page);
        }
      } else {
        if (lastVisiblePrev) {
          const queryNextPage = query(
            collection(db, 'tickets'),
            orderBy(sortOrderBy, sort),
            endBefore(lastVisiblePrev),
            limitToLast(rowsPerPage)
          );
          const documentSnapshots = await getDocs(queryNextPage);
          setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
          setLastVisiblePrev(documentSnapshots.docs[0]);
          let arr = [];
          documentSnapshots.forEach((doc) => {
            arr.push(Object.assign(JSON.parse(JSON.stringify(doc.data())), { id: doc.id }));
          });
          dispatch(setData(arr));

          setLastPage(page);
        }
      }
    }
    getTableData();
  }, [page]);

  useEffect(() => {
    async function filterSearch() {
      let q;
      if (searchItem) {
        const qLength = query(
          collection(db, 'tickets'),
          where('title', '>=', searchItem),
          where('title', '<=', searchItem + 'я')
        );
        const documentSnapshots1 = await getDocs(qLength);
        setDataLength(documentSnapshots1.docs.length);
        if (!lastVisiblePrevSearch || page === lastPage) {
          setPage(0);
          q = query(
            collection(db, 'tickets'),
            where('title', '>=', searchItem),
            where('title', '<=', searchItem + 'я'),
            limit(rowsPerPage)
          );
          setLastPage(0);
        }
        if (lastVisibleSearch && page > lastPage) {
          q = query(
            collection(db, 'tickets'),
            where('title', '>=', searchItem),
            where('title', '<=', searchItem + 'я'),
            startAfter(lastVisibleSearch),
            limit(rowsPerPage)
          );
          setLastPage(page);
        }
        if (lastVisibleSearch && page < lastPage) {
          q = query(
            collection(db, 'tickets'),
            where('title', '>=', searchItem),
            where('title', '<=', searchItem + 'я'),
            endBefore(lastVisiblePrevSearch),
            limit(rowsPerPage)
          );
          setLastPage(page);
        }
        const documentSnapshots = await getDocs(q);
        let arr = [];
        setLastVisibleSearch(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
        setLastVisiblePrevSearch(documentSnapshots.docs[0]);
        documentSnapshots.forEach((doc) => {
          arr.push(Object.assign(JSON.parse(JSON.stringify(doc.data())), { id: doc.id }));
        });
        dispatch(setData(arr));
      }
    }
    filterSearch();
  }, [searchItem, page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (!data) return <Loader />;
  return (
    <ThemeProvider theme={theme}>
      <TableContainer
        className="white"
        sx={{ maxWidth: '1122px', padding: '27px 0', minHeight: '60vh', borderRadius: '8px' }}
      >
        <ToolbarS />
        {viewTable && <TableColView data={data} />}
        {!viewTable && <TableGridView data={data} />}
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[8, 16, 50]}
        component="div"
        count={dataLength}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className="text-color"
      />
    </ThemeProvider>
  );
}
