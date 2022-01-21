import TableDashboard from '../components/TableDashboard';
import { useDispatch } from 'react-redux';
import { setTitlePage } from '../store/appSlice';
import React, { useEffect, FC } from 'react';

const TicketsPage: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitlePage('Tickets'));
  });

  return (
    <div className="container">
      <div className="container__content">
        {' '}
        <TableDashboard />
      </div>
    </div>
  );
};
export default TicketsPage;
