import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import React, { useState, useEffect, FC, ChangeEvent, MouseEvent, useContext } from 'react';
import Loader from './Loader';
import ToolbarS from './TableToolbar';
import TableColView from './TableColView';
import TableGridView from './TableGridView';
import { useDispatch } from 'react-redux';
import {
  collection,
  DocumentSnapshot,
  endBefore,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import { setData } from '../store/appSlice';
import { useAppSelector } from '../store';
import { ContextLogin } from '..';
import { useTheme } from 'styled-components';

const TableTickets: FC = () => {
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0);
  const viewTable = useAppSelector((state) => state.user.viewTable);
  const {db} = useContext(ContextLogin)
  const [lastVisible, setLastVisible] = useState<DocumentSnapshot>();
  const [lastVisiblePrev, setLastVisiblePrev] = useState<DocumentSnapshot>();
  const data = useAppSelector((state) => state.user.data);
  const [lastPage, setLastPage] = useState(0);
  const [dataLength, setDataLength] = useState(0);
  const dispatch = useDispatch();
  const sort = useAppSelector<any>((state) => state.user.sortTable);
  const sortOrderBy = useAppSelector((state) => state.user.orderBy);
  const searchItem = useAppSelector((state) => state.user.filter);
  const theme = useTheme();
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
      let q = query(collection(db, 'tickets'));
      if (searchItem){
        if ( page === lastPage) {
          setPage(0);
          q = query(
            collection(db, 'tickets'),
            where('title', '>=', searchItem),
            where('title', '<=', searchItem + 'я'),
            orderBy('title', 'desc'),
            limit(rowsPerPage)
          );
          setLastPage(0);
        }
        else  {
          q = query(
            collection(db, 'tickets'),
            where('title', '>=', searchItem),
            where('title', '<=', searchItem + 'я'),
            orderBy('title', 'desc'),
            ((page > lastPage) ? startAfter(lastVisible) : endBefore(lastVisiblePrev)),
            (page > lastPage) ? limit(rowsPerPage) : limitToLast(rowsPerPage)
          );
          setLastPage(page);
        }
      }
      else if (page === lastPage) {
        setPage(0)
        q = query(
          collection(db, 'tickets'),
          orderBy(sortOrderBy, sort),
          limit(rowsPerPage)
        );
        setLastPage(0);
      }
        else {
          q = query(
            collection(db, 'tickets'),
            orderBy(sortOrderBy, sort),
            ((page > lastPage) ? startAfter(lastVisible) : endBefore(lastVisiblePrev)),
            (page > lastPage) ? limit(rowsPerPage): limitToLast(rowsPerPage)
          );
        }
          const documentSnapshots = await getDocs(q);
          setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
          setLastVisiblePrev(documentSnapshots.docs[0]);
          let arr:{}[] = [];
          documentSnapshots.forEach((doc) => {
            arr.push(Object.assign(JSON.parse(JSON.stringify(doc.data())), { id: doc.id }));
          });
          dispatch(setData(arr))
          setLastPage(page);
        } 
          getTableData();
        }
  , [page,rowsPerPage, sort, db, searchItem, dispatch, sortOrderBy]);

  useEffect(() => {
    async function filterSearch() {
      if (!searchItem) return;
      // get length search collection
        let qLength = query(
          collection(db, 'tickets'),
          where('title', '>=', searchItem),
          where('title', '<=', searchItem + 'я')
        );
        const documentSnapshots = await getDocs(qLength);
        setDataLength(documentSnapshots.docs.length);
      }
      filterSearch();
    }
    
  , [searchItem, db]);

  const handleChangePage = (event:MouseEvent<HTMLButtonElement, globalThis.MouseEvent> | null, newPage:number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event:ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setLastPage(0);
  };

  if (!data) return <Loader />;
  return (
      <TableContainer
        className="white"
        sx={{ maxWidth: theme.sizes.container, padding: '27px 0', minHeight: '60vh', borderRadius: '8px' }}
      >
        <ToolbarS />
        {viewTable && <TableColView data={data} />}
        {!viewTable && <TableGridView data={data} />}<TablePagination
        rowsPerPageOptions={[8, 16, 50]}
        component="div"
        count={dataLength}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className="text-color"
      />
      </TableContainer>

  );
};

export default TableTickets;
