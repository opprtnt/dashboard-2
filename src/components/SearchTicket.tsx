import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { setFilter } from '../store/appSlice';
import React, { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { useDispatch } from 'react-redux';

const SearchTicket: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useAppSelector((state) => state.user.themeDark);

  let handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchItem = e.target.value;
    dispatch(setFilter(searchItem));
  };

  //handleChange = debounce(handleChange, 400);
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
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};
export default SearchTicket;
