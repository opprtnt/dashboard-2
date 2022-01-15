import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import TicketForm from '../components/TicketForm';
import { setTitlePage } from '../store/authSlice';

export default function NewTicketPage() {
  const dispatch = useDispatch();
  dispatch(setTitlePage('Create new ticket'));
  const NewTicketForm = styled.div`
    padding: 32px;
    border-radius: 8px;
    h3 {
      margin-bottom: 36px;
    }
  `;

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
