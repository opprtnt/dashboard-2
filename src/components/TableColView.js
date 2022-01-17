import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import { Avatar } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { convertDate, convertTime, getLastUpdate } from '../functions';
import DeleteTicketButton from './DeleteTicketButton';
import '../scss/TicketsPage.scss';
import PropTypes from 'prop-types';
import { setSortTable, setOrderBy } from '../store/appSlice';

const headCells = [
  {
    label: 'Date',
    sort: 'desc',
  },
  {
    sort: 'desc',
    label: 'Priority',
  },
];

function TableColView({ data }) {
  let navigate = useNavigate();
  const theme = useSelector((state) => state.user.themeDark);
  const dispatch = useDispatch();

  const navigateToTicket = (e, id) => {
    navigate(`/tickets/${id}`);
  };

  const sortDate = () => {
    let sort = headCells[0].sort;
    if (sort === 'asc') {
      dispatch(setSortTable('desc'));
      headCells[0].sort = 'desc';
    } else {
      dispatch(setSortTable('asc'), (headCells[0].sort = 'asc'));
    }
    dispatch(setOrderBy('date'));
  };
  const sortPriority = () => {
    let sort = headCells[1].sort;
    if (sort === 'asc') {
      dispatch(setSortTable('desc'));
      headCells[1].sort = 'desc';
    } else {
      dispatch(setSortTable('asc'), (headCells[1].sort = 'asc'));
    }
    dispatch(setOrderBy('priority'));
  };

  return (
    <Table sx={{ maxWidth: '1122px', fontWeight: '600' }}>
      <TableHead>
        <TableRow>
          <TableCell sx={{ color: theme ? '#bdbdbd' : '#9FA2B4', width: '440px' }} key={headCells[0].id}>
            Ticket Details
          </TableCell>
          <TableCell sx={{ color: '#9FA2B4', width: '208px' }}>Owner Name</TableCell>
          <TableCell sx={{ color: '#9FA2B4', width: '140px' }}>
            <TableSortLabel
              //active={orderB === headCells[0].id}
              direction={headCells[0].sort === 'asc' ? 'desc' : 'asc'}
              onClick={sortDate}
            >
              {headCells[0].label}
            </TableSortLabel>
          </TableCell>
          <TableCell sx={{ color: '#9FA2B4', width: '104px' }}>
            <TableSortLabel
              //active={orderB === headCells[1].id}
              direction={headCells[1].sort === 'asc' ? 'desc' : 'asc'}
              onClick={sortPriority}
            >
              {headCells[1].label}
            </TableSortLabel>
          </TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <TableRow
            key={row.id}
            sx={{
              '&:last-child td, &:last-child th': { border: 0 },
              backgroundColor: row.completed && (theme ? '#6D838D' : '#EBFFE5'),
              cursor: 'pointer',
            }}
            onClick={(e) => navigateToTicket(e, row.id)}
          >
            <TableCell sx={{ width: '440px' }} component="th" scope="row">
              <Stack direction="row">
                {' '}
                <Avatar sx={{ marginRight: '24px' }} alt={row.user.displayName} src={row.user.photo} />
                <div>
                  <p className="table__text-cell text-color">{row.title}</p>
                  <p className="table__subtext-cell gray">{getLastUpdate(Date.now() / 1000 - row.date.seconds)}</p>
                </div>
              </Stack>
            </TableCell>
            <TableCell className="text-color" sx={{ width: '208px' }}>
              <p className="table__text-cell text-color">{row.user.displayName}</p>
            </TableCell>
            <TableCell className="text-color" sx={{ width: '140px' }}>
              <p className="table__text-cell text-color">{convertDate(row.date.seconds)}</p>
              <p className="table__subtext-cell">{convertTime(row.date.seconds)}</p>
            </TableCell>
            <TableCell sx={{ width: '104px' }}>
              <Chip
                sx={{
                  textTransform: 'uppercase',
                  color: 'white',
                  fontWeight: 'bold',
                }}
                label={
                  row.priority === 0 ? 'Low' : row.priority === 1 ? 'Normal' : row.priority === 2 ? 'Hight' : 'None'
                }
                color={
                  row.priority === 0
                    ? 'primary'
                    : row.priority === 1
                    ? 'success'
                    : row.priority === 2
                    ? 'error'
                    : 'default'
                }
              />
            </TableCell>
            <TableCell align="center" sx={{ width: '130px' }}>
              <DeleteTicketButton rowUserUid={row.user.uid} id={row.id} completed={row.completed} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

TableColView.propTypes = {
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};

export default TableColView;
