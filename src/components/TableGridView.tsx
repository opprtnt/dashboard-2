import Stack from '@mui/material/Stack';
import TicketCard from './TicketCard';
import { useDispatch } from 'react-redux';
import React, { FC, useEffect } from 'react';
import { setOrderBy, setSortTable } from '../store/appSlice';

interface ITableGridView {
  data: [
    {
      user: { uid: string, photo: string, displayName: string },
      title: string,
      completed: boolean,
      id: string,
      date: {
        seconds: number,
      },
      priority: number,
    }
  ];
}

const TableGridView: FC<ITableGridView> = ({ data }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOrderBy('date'));
    dispatch(setSortTable('desc'));
  }, [dispatch]);

  return (
    <Stack direction="row" sx={{ flexWrap: 'wrap', margin: '40px 24px 32px' }}>
      {data.map((ticket) => (
        <TicketCard key={ticket.id} ticketData={ticket} />
      ))}
    </Stack>
  );
};

export default TableGridView;
