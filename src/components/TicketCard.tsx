import styled, { useTheme } from 'styled-components';
import { convertDate, convertTime, getLastUpdate } from '../functions';
import { Avatar, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteTicketButton from './DeleteTicketButton';
import React, { FC } from 'react';
import { TicketCardProps, ICard } from '../interface';

const TicketCard: FC<TicketCardProps> = ({ ticketData }) => {
  let navigate = useNavigate();
  let theme = useTheme();
  const navigateToTicket = (id: string) => {
    navigate(`/tickets/${id}`);
  };

  return (
    <Card theme={theme} completed={ticketData.completed} onClick={() => navigateToTicket(ticketData.id)}>
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
            backgroundColor:
              ticketData.priority === 0
                ? theme.colors.low
                : ticketData.priority === 1
                ? theme.colors.normal
                : ticketData.priority === 2
                ? theme.colors.high
                : theme.colors.lightGray1,
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
    </Card>
  );
};

const Card =
  styled.div <
  ICard >
  `
  box-shadow: ${({ theme }) => theme.colors.shadow} ;
  border-radius: 4px;
  cursor: pointer;
  margin: 0px 10px 10px 0;
  width: 24.2%;
  padding: 16px 22px;
  background-color: ${({ completed }) =>
    completed ? ({ theme }) => theme.colors.completed : ({ theme }) => theme.colors.cardBg};

  &:nth-of-type(4n) {
    margin-right: 0;
  }

  @media (${({ theme }) => theme.media.extraLarge}) {
    width: 32.5%;
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

export default TicketCard;
