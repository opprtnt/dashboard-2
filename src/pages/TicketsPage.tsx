import TableTickets from '../components/TableTickets';
import { useDispatch } from 'react-redux';
import { setTitlePage } from '../store/appSlice';
import React, { useEffect, FC } from 'react';
import { Toaster } from 'react-hot-toast';

const TicketsPage: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitlePage('Tickets'));
  });

  return (
    <div className="container">
      <div className="container__content">
        {' '}
        <TableTickets />
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </div>
  );
};
export default TicketsPage;
