import styled from 'styled-components';
import { convertDate, convertTime, getLastUpdate } from '../functions';
import { Avatar, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteTicketButton from './DeleteTicketButton';
import { useAppSelector } from '../store';
import React, { FC } from 'react';
import { TicketCardProps, ICard } from '../interface';

const Card =
  styled.div <
  ICard >
  `
  box-shadow: ${({ themeI }) => (themeI ? '0px 0px 10px #4d5254' : '0px 0px 10px #616473')};
  border-radius: 4px;
  cursor: pointer;
  margin: 0px 10px 10px 0;
  width: 19.9%;
  padding: 16px 22px;
  background-color: ${({ completed }) => (completed ? ({ themeI }) => (themeI ? '#6D838D' : '#EBFFE5') : 'white')};

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

const TicketCard: FC<TicketCardProps> = ({ ticketData }) => {
  const theme = useAppSelector((state) => state.user.themeDark);
  let navigate = useNavigate();
  const navigateToTicket = (id: string) => {
    navigate(`/tickets/${id}`);
  };

  return (
    <Card
      themeI={theme}
      completed={ticketData.completed}
      onClick={() => navigateToTicket(ticketData.id)}
      className="ticket-card"
    >
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
    </Card>
  );
};

export default TicketCard;
