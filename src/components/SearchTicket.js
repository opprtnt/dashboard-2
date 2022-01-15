import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { changeFilter } from '../store/authSlice';
import { debounce } from '../functions';

export default function SearchTicket() {
  const data = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.user.themeDark);
  let handleChange = (e) => {
    const searchItem = e.target.value;
    let ticketList = data.filter((ticket) => ticket.title.includes(searchItem.toLowerCase()));
    dispatch(changeFilter(ticketList));
  };

  handleChange = debounce(handleChange, 400);
  return (
    <TextField
      sx={{
        position: 'relative',
        m: 1,
        width: '500px',
      }}
      onChange={handleChange}
      label="Search tickets"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: theme ? '#bdbdbd' : false }} />
          </InputAdornment>
        ),
      }}
    />
  );
}
