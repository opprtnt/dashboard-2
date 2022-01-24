import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import { IconButton } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { toggleThemeDark } from '../store/appSlice';

const ThemeButtons: React.FC = () => {
  const dispatch = useDispatch();

  const toggleTheme = (theme: boolean) => {
    dispatch(toggleThemeDark(theme));
  };

  return (
    <ThemeButton className="theme-btn">
      <IconButton onClick={() => toggleTheme(false)}>
        <Brightness5Icon sx={{ color: '#4F4F4F' }} />
      </IconButton>
      <IconButton onClick={() => toggleTheme(true)}>
        <Brightness4Icon sx={{ color: '#BDBDBD' }} />
      </IconButton>
    </ThemeButton>
  );
};
const ThemeButton = styled.div`
  display: flex;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0 32px;
`;

export default ThemeButtons;
