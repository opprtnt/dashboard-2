import Stack from '@mui/material/Stack';
import TicketCard from './TicketCard';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { setOrderBy, setSortTable } from '../store/appSlice';

function TableGridView({ data }) {
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
}

TableGridView.propTypes = {
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};

export default TableGridView;
