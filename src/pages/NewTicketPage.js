import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import TicketForm from '../components/TicketForm';
import { setTitlePage } from '../store/appSlice';

export default function NewTicketPage() {
  const dispatch = useDispatch();

  const NewTicketForm = styled.div`
    padding: 32px;
    border-radius: 8px;
    h3 {
      margin-bottom: 36px;
    }
  `;

  useEffect(() => dispatch(setTitlePage('Create new ticket')));

  return (
    <div className="container">
      <div className="container__content">
        <NewTicketForm className="white">
          <h3>Create</h3>
          <TicketForm />
        </NewTicketForm>
      </div>
    </div>
  );
}
