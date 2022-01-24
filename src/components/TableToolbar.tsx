import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import ViewAgendaRoundedIcon from '@mui/icons-material/ViewAgendaRounded';
import { useDispatch } from 'react-redux';
import { changeViewTable } from '../store/appSlice';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../store';
import React from 'react';
import styled, { useTheme } from 'styled-components';

export default function ToolbarS() {
  const dispatch = useDispatch();
  const viewTable = useAppSelector((state) => state.user.viewTable);
  const theme = useTheme();

  const onChangeViewTable = (v: boolean) => {
    dispatch(changeViewTable(v));
  };

  return (
    <Toolbar sx={{ justifyContent: 'space-between' }}>
      <div className="row">
        <h3>All tickets</h3>
        <Button className="btn-primary primary">
          <Link to={'new'}>New ticket</Link>
        </Button>
      </div>
      <div>
        <Tooltip title="Grid view">
          <IconButton onClick={() => onChangeViewTable(false)}>
            <GridViewRoundedIcon sx={{ color: viewTable ? theme.colors.lightGray4 : theme.colors.green }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Column view">
          <IconButton onClick={() => onChangeViewTable(true)}>
            <ViewAgendaRoundedIcon sx={{ color: viewTable ? theme.colors.green : theme.colors.lightGray4 }} />
          </IconButton>
        </Tooltip>
      </div>
    </Toolbar>
  );
}

 const Button = styled.button`
  margin-left: 32px;
`;
