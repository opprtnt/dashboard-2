import TableDashboard from '../components/TableDashboard';
import { useDispatch } from 'react-redux';
import { setTitlePage } from '../store/appSlice';
import { useEffect } from 'react';

export default function TicketsPage() {
  const dispatch = useDispatch();

  useEffect(() => dispatch(setTitlePage('Tickets')));

  return (
    <div className="container">
      <div className="container__content">
        {' '}
        <TableDashboard />
      </div>
    </div>
  );
}
