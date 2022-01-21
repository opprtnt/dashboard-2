import React, { useEffect, FC } from 'react';
import { useDispatch } from 'react-redux';
import TicketForm from '../components/TicketForm';
import { setTitlePage } from '../store/appSlice';
import { NewTicketForm } from '../style/style';

const NewTicketPage: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitlePage('Create new ticket'));
  });

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
};
export default NewTicketPage;
