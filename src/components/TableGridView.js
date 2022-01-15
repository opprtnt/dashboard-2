import Stack from '@mui/material/Stack';
import TicketCard from './TicketCard';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function TableGridView({ rowsPerPage, page }) {
  const filter = useSelector((state) => state.user.filter);

  return (
    <Stack direction="row" sx={{ flexWrap: 'wrap', margin: '40px 24px 32px' }}>
      {filter.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((ticket) => (
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
