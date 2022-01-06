import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import { Avatar } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableHead from '@mui/material/TableHead';
import { query, orderBy, limit, doc, getFirestore, collection, getDocs } from 'firebase/firestore';
import Loader from './Loader';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#F2C94C ' },
    success: { main: '#29CC97' },
    error: { main: '#F12B2C' },
  },
});

const mounthList = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const convertDate = (sec) => {
  const date = new Date(sec * 1000);
  const formatDate = mounthList[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
  return formatDate;
};

export default function TableDashboard() {
  const db = getFirestore();
  const docRef = collection(db, 'tickets');
  const q = query(docRef, orderBy('date', 'desc'), limit(5));
  const [data, setData] = useState([]);

  useEffect(async () => {
    let arr = [];
    const docSnap = await getDocs(q);
    await getDocs(docRef);
    docSnap.forEach((doc) => arr.push(Object.assign(doc.data(), { id: doc.id })));
    setData(arr);
  }, [setData]);

  if (!data) return <Loader></Loader>;
  return (
    <ThemeProvider theme={theme}>
      <TableContainer sx={{ marginLeft: 35 }} component={Paper}>
        <Table sx={{ maxWidth: 1200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Ticket details</TableCell>
              <TableCell align="right">Owner Name</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Priority</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <Avatar alt={row.user.displayName} src={row.user.photo} />
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.user.displayName}</TableCell>
                <TableCell align="right">{convertDate(row.date.seconds)}</TableCell>
                <TableCell align="right">
                  <Chip
                    sx={{
                      textTransform: 'uppercase',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                    label={row.priority}
                    color={(row.priority = 'Low') ? 'primary' : (row.priority = 'Normal') ? 'success' : 'error'}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <p onClick={() => console.log(data)}>Click</p>
      </TableContainer>
    </ThemeProvider>
  );
}
