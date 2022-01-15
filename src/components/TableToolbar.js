import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import ViewAgendaRoundedIcon from '@mui/icons-material/ViewAgendaRounded';
import { useDispatch } from 'react-redux';
import { changeViewTable } from '../store/authSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function ToolbarS() {
  const dispatch = useDispatch();
  const viewTable = useSelector((state) => state.user.viewTable);

  const onChangeViewTable = (v) => {
    dispatch(changeViewTable(v));
  };

  const Button = styled.button`
    margin-left: 20px;
  `;

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
            <GridViewRoundedIcon sx={{ color: viewTable ? '#BDBDBD' : '#27AE60' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Column view">
          <IconButton onClick={() => onChangeViewTable(true)}>
            <ViewAgendaRoundedIcon sx={{ color: viewTable ? '#27AE60' : '#BDBDBD' }} />
          </IconButton>
        </Tooltip>
      </div>
    </Toolbar>
  );
}
