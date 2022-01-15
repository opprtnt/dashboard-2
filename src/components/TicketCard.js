import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { convertDate, convertTime, getLastUpdate } from '../functions';
import { Avatar, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteTicketButton from './DeleteTicketButton';
import PropTypes from 'prop-types';

function TicketCard({ ticketData }) {
  const theme = useSelector((state) => state.user.themeDark);
  const TicketCard = styled.div`
    box-shadow: ${theme ? '0px 0px 10px #616473' : '0px 0px 10px rgba(192, 197, 233, 0.6)'};
    border-radius: 4px;
    cursor: pointer;
    margin: 0px 10px 10px 0;
    width: 19.9%;
    padding: 16px 22px;

    &:nth-of-type(4n) {
      margin-right: 0;
    }

    @media (max-width: 1440px) {
      width: 28%;
      &:nth-of-type(3n) {
        margin-right: 0;
      }
      &:nth-of-type(4n) {
        margin-right: 10px;
      }
    }
    .ticket-card__row {
      display: flex;
      justify-content: space-between;
    }

    button {
      width: 25px;
      height: 25px;
    }
    svg {
      width: 20px;
      height: 20px;
    }
    .table__subtext-cell {
      margin-bottom: 16px;
    }
  `;

  let navigate = useNavigate();
  const navigateToTicket = (id) => {
    console.log(id);
    navigate(`/tickets/${id}`);
  };

  return (
    <TicketCard onClick={() => navigateToTicket(ticketData.id)} className="ticket-card">
      <div className="ticket-card__row">
        <div className="ticket-card__date">
          <p className="table__text-cell">{convertDate(ticketData.date.seconds)}</p>
          <p className="table__subtext-cell">{convertTime(ticketData.date.seconds)}</p>
        </div>
        <Chip
          sx={{
            textTransform: 'uppercase',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '11px',
            height: '24px',
          }}
          label={
            ticketData.priority === 0
              ? 'Low'
              : ticketData.priority === 1
              ? 'Normal'
              : ticketData.priority === 2
              ? 'Hight'
              : 'None'
          }
          color={
            ticketData.priority === 0
              ? 'primary'
              : ticketData.priority === 1
              ? 'success'
              : ticketData.priority === 2
              ? 'error'
              : 'default'
          }
        />
        <DeleteTicketButton rowUserUid={ticketData.user.uid} id={ticketData.id} completed={ticketData.completed} />
      </div>
      <p className="table__text-cell">{ticketData.title}</p>
      <p className="table__subtext-cell">{getLastUpdate(Date.now() / 1000 - ticketData.date.seconds)}</p>
      <div className="row">
        <Avatar
          sx={{
            marginRight: '24px',
          }}
          src={ticketData.user.photo}
        ></Avatar>
        <span className="table__text-cell">{ticketData.user.displayName}</span>
      </div>
    </TicketCard>
  );
}

TicketCard.propTypes = {
  ticketData: PropTypes.object,
};

export default TicketCard;
