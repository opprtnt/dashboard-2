import TableDashboard from '../components/Table';
import { query, orderBy, limit, getFirestore, collection, getDocs } from 'firebase/firestore';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeFilter, setData, setTitlePage } from '../store/authSlice';

export default function TicketsPage() {
  const dispatch = useDispatch();
  dispatch(setTitlePage('Tickets'));

  return (
    <div className="container">
      <div className="container__content">
        {' '}
        <TableDashboard />
      </div>
    </div>
  );
}
