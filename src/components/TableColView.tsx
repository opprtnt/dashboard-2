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
import { useDispatch } from 'react-redux';
import { convertDate, convertTime, getLastUpdate } from '../functions';
import DeleteTicketButton from './DeleteTicketButton';
import { setSortTable, setOrderBy } from '../store/appSlice';
import { FC } from 'react';
import { ITableView } from '../interface';
import React from 'react';
import styled, { useTheme } from 'styled-components';

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

const TableColView: FC<ITableView> = ({ data }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const navigateToTicket = (id: string) => {
    navigate(`/tickets/${id}`);
  };

  const sortDate = () => {
    let sort = headCells[0].sort;
    if (sort === 'asc') {
      dispatch(setSortTable('desc'));
      headCells[0].sort = 'desc';
    } else {
      dispatch(setSortTable('asc'));
      headCells[0].sort = 'asc';
    }
    dispatch(setOrderBy('date'));
  };
  const sortPriority = () => {
    let sort = headCells[1].sort;
    if (sort === 'asc') {
      dispatch(setSortTable('desc'));
      headCells[1].sort = 'desc';
    } else {
      dispatch(setSortTable('asc'));
      headCells[1].sort = 'asc';
    }
    dispatch(setOrderBy('priority'));
  };

  return (
    <Table sx={{ maxWidth: '1122px', fontWeight: '600' }}>
      <TableHead>
        <TableRow>
          <TableCell sx={{ color: theme.colors.headColor, width: '440px' }}>Ticket Details</TableCell>
          <TableCell sx={{ color: theme.colors.headColor, width: '208px' }}>Owner Name</TableCell>
          <TableCell sx={{ color: theme.colors.headColor, width: '140px' }}>
            <TableSortLabel
              active={'asc' === headCells[0].sort}
              direction={headCells[0].sort === 'asc' ? 'desc' : 'asc'}
              onClick={sortDate}
            >
              {headCells[0].label}
            </TableSortLabel>
          </TableCell>
          <TableCell sx={{ color: theme.colors.headColor, width: '104px' }}>
            <TableSortLabel
              active={'asc' === headCells[1].sort}
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
              backgroundColor: row.completed ? theme.colors.completed : theme.colors.contentBg,
              cursor: 'pointer',
            }}
            onClick={() => navigateToTicket(row.id)}
          >
            <TableCell sx={{ width: '440px' }} component="th" scope="row">
              <Stack direction="row">
                {' '}
                <Avatar sx={{ marginRight: '24px' }} alt={row.user.displayName} src={row.user.photo} />
                <div>
                  <TableCellTitle className="text-color">{row.title}</TableCellTitle>
                  <TableCellSubtitle className="gray">
                    {getLastUpdate(Date.now() / 1000 - row.date.seconds)}
                  </TableCellSubtitle>
                </div>
              </Stack>
            </TableCell>
            <TableCell className="text-color" sx={{ width: '208px' }}>
              <TableCellTitle className="table__text-cell text-color">{row.user.displayName}</TableCellTitle>
            </TableCell>
            <TableCell className="text-color" sx={{ width: '140px' }}>
              <TableCellTitle className="text-color">{convertDate(row.date.seconds)}</TableCellTitle>
              <TableCellSubtitle>{convertTime(row.date.seconds)}</TableCellSubtitle>
            </TableCell>
            <TableCell sx={{ width: '104px' }}>
              <Chip
                sx={{
                  textTransform: 'uppercase',
                  color: 'white',
                  fontWeight: 'bold',
                  backgroundColor:
                    row.priority === 0
                      ? theme.colors.low
                      : row.priority === 1
                      ? theme.colors.normal
                      : row.priority === 2
                      ? theme.colors.high
                      : theme.colors.lightGray1,
                }}
                label={
                  row.priority === 0 ? 'Low' : row.priority === 1 ? 'Normal' : row.priority === 2 ? 'Hight' : 'None'
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
};

const TableCellTitle = styled.p`
  font-weight: 600;
`;
const TableCellSubtitle = styled.p`
  color: ${({theme})=>theme.colors.lightGray3};
  margin-top: 4px;
  font-size: 12px;
`;

export default TableColView;
