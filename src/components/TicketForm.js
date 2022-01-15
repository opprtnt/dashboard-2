import { useForm, Controller } from 'react-hook-form';
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useEffect, useState } from 'react';
import { collection, getFirestore, serverTimestamp } from 'firebase/firestore';
import { addDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useContext } from 'react';
import { ContextLogin } from '../index';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import styled from 'styled-components';

function TicketForm() {
  const [priority, setPriority] = useState();
  let navigate = useNavigate();
  const db = getFirestore();
  const { auth } = useContext(ContextLogin);
  const [user] = useAuthState(auth);

  const Button = styled.button`
    margin-top: 32px;
  `;

  const handleChange = (event) => {
    setPriority(event.target.value);
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const sendTicket = async (data) => {
    const docRef = await addDoc(collection(db, 'tickets'), {
      user: {
        uid: user.uid,
        displayName: user.displayName,
        photo: user.photoURL,
      },
      title: data.title,
      ticket: data.description,
      priority: data.priority,
      date: serverTimestamp(),
      completed: false,
    });
    toast.success('Created successfully');
    navigate(`/tickets/${docRef.id}`);
  };
  const onError = () => toast.error('Validations error!');

  return (
    <div>
      <form onSubmit={handleSubmit(sendTicket, onError)}>
        <Controller
          control={control}
          rules={{ required: 'Обязательное поле!', maxLength: 50 }}
          name="title"
          render={({ field }) => {
            return (
              <TextField
                error={errors?.title?.type === 'required'}
                label={errors?.title?.type === 'required' ? 'Обязательное поле!' : 'Ticket Title *'}
                {...field}
                margin="normal"
                sx={{ width: '344px', margin: '0 16px 0 0' }}
              />
            );
          }}
        />
        <Controller
          control={control}
          name="priority"
          rules={{ required: 'Обязательное поле!' }}
          render={({ field }) => {
            return (
              <FormControl>
                <InputLabel error={errors?.priority?.type === 'required'}>
                  {errors?.priority?.type === 'required' ? 'Обязательное поле!' : 'Select priority *'}
                </InputLabel>
                <Select
                  value={priority || '5'}
                  error={errors?.priority?.type === 'required'}
                  label={errors?.priority?.type === 'required' ? 'Обязательное поле!' : 'Select priority *'}
                  onChange={handleChange}
                  sx={{ width: '344px' }}
                  {...field}
                >
                  <MenuItem value="5">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={0}>Low</MenuItem>
                  <MenuItem value={1}>Normal</MenuItem>
                  <MenuItem value={2}>Hight</MenuItem>
                </Select>
              </FormControl>
            );
          }}
        />
        <Controller
          control={control}
          rules={{ required: 'Обязательное поле!', maxLength: 100 }}
          name="description"
          render={({ field }) => {
            return (
              <TextField
                label={'Description'}
                {...field}
                margin="normal"
                sx={{ width: '704px', margin: '32px 0 0 0' }}
              />
            );
          }}
        />

        <Button className="btn-primary primary" type="submit">
          Save Details
        </Button>
      </form>
      <Toaster position="top-right" reverseOrder={true} />
    </div>
  );
}
TicketForm.propTypes = {};

export default TicketForm;
