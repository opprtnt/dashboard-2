import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import { Avatar, IconButton } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux';
import { ContextLogin } from '../index';
import { useAuthState } from 'react-firebase-hooks/auth';
import { convertDate, convertTime, getLastUpdate } from '../functions';
import DeleteTicketButton from './DeleteTicketButton';
import { getFirestore } from 'firebase/firestore';
import '../scss/TicketsPage.scss';
import PropTypes from 'prop-types';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  console.log(stabilizedThis);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
const headCells = [
  {
    id: 'date',
    numeric: true,
    disablePadding: true,
    label: 'Date',
  },
  {
    id: 'priority',
    numeric: false,
    disablePadding: true,
    label: 'Priority',
  },
];

function TableColView({ page, rowsPerPage }) {
  const [order, setOrder] = useState('asc');
  const [orderB, setOrderBy] = useState('');
  const filter = useSelector((state) => state.user.filter);
  let navigate = useNavigate();
  const { auth } = useContext(ContextLogin);
  const [user] = useAuthState(auth);
  const db = getFirestore();
  const theme = useSelector((state) => state.user.themeDark);

  const navigateToTicket = (e, id) => {
    navigate(`/tickets/${id}`);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderB === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <Table sx={{ maxWidth: '1122px', fontWeight: '600' }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell sx={{ color: theme ? '#bdbdbd' : '#9FA2B4', width: '440px' }} key={headCells[0].id}>
            Ticket Details
          </TableCell>
          <TableCell sx={{ color: '#9FA2B4', width: '208px' }}>Owner Name</TableCell>
          <TableCell
            sx={{ color: '#9FA2B4', width: '140px' }}
            sortDirection={orderB === headCells[0].id ? order : false}
          >
            <TableSortLabel
              active={orderB === headCells[0].id}
              direction={orderB === headCells[0].id ? order : 'asc'}
              onClick={createSortHandler(headCells[0].id)}
            >
              {headCells[0].label}
            </TableSortLabel>
          </TableCell>
          <TableCell
            sx={{ color: '#9FA2B4', width: '104px' }}
            sortDirection={orderB === headCells[1].id ? order : false}
          >
            <TableSortLabel
              active={orderB === headCells[1].id}
              direction={orderB === headCells[1].id ? order : 'asc'}
              onClick={createSortHandler(headCells[1].id)}
            >
              {headCells[1].label}
            </TableSortLabel>
          </TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {stableSort(filter, getComparator(order, orderB))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row) => (
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
