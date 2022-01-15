import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { useState } from 'react';
import Loader from './Loader';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ToolbarS from './TableToolbar';
import TableColView from './TableColView';
import TableGridView from './TableGridView';
import { useSelector } from 'react-redux';

const theme = createTheme({
  palette: {
    primary: { main: '#F2C94C ' },
    success: { main: '#29CC97' },
    error: { main: '#F12B2C' },
  },
});

export default function TableDashboard() {
  const data = useSelector((state) => state.user.data);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0);
  const viewTable = useSelector((state) => state.user.viewTable);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (!data) return <Loader />;
  return (
    <ThemeProvider theme={theme}>
      <TableContainer
        className="white"
        sx={{ maxWidth: '1122px', padding: '27px 0', minHeight: '60vh', borderRadius: '8px' }}
      >
        <ToolbarS />
        {viewTable && <TableColView page={page} rowsPerPage={rowsPerPage} />}
        {!viewTable && <TableGridView page={page} rowsPerPage={rowsPerPage} />}
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[8, 16, 50]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className="text-color"
      />
    </ThemeProvider>
  );
}
