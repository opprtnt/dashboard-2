import Stack from '@mui/material/Stack';
import TicketCard from './TicketCard';
import { useDispatch } from 'react-redux';
import React, { FC, useEffect } from 'react';
import { setOrderBy, setSortTable } from '../store/appSlice';
import { ITableView } from '../interface';

const TableGridView: FC<ITableView> = ({ data }) => {
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
