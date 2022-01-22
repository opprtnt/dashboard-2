import { useForm, Controller } from 'react-hook-form';
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import React, { FC } from 'react';
import { collection, doc, getFirestore, increment, serverTimestamp, updateDoc } from 'firebase/firestore';
import { addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useAppSelector } from '../store';
import { Button } from '../style/style';
import styled from 'styled-components';

const TicketForm: FC = () => {
  let navigate = useNavigate();
  const db = getFirestore();
  const user = useAppSelector((state) => state.user.userData);
  const docCount = doc(db, 'count', 'count');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const sendTicket = async (data: { title: string, description: string, priority: number }) => {
    const docRef = await addDoc(collection(db, 'tickets'), {
      user: {
        uid: user.uid,
        displayName: user.displayName,
        photo: user.photoURL,
      },
      title: data.title,
      ticket: data.description || '',
      priority: data.priority,
      date: serverTimestamp(),
      completed: false,
    });
    await updateDoc(docCount, {
      count: increment(1),
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
          defaultValue={''}
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
          defaultValue={''}
          render={({ field }) => {
            return (
              <FormControl>
                <InputLabel error={errors?.priority?.type === 'required'}>
                  {errors?.priority?.type === 'required' ? 'Обязательное поле!' : 'Select priority *'}
                </InputLabel>
                <Select
                  error={errors?.priority?.type === 'required'}
                  label={errors?.priority?.type === 'required' ? 'Обязательное поле!' : 'Select priority *'}
                  sx={{ width: '344px' }}
                  {...field}
                >
                  <MenuItem value="">
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
          name="description"
          defaultValue={''}
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

        <ButtonTicketForm className="btn-primary primary" type="submit">
          Save Details
        </ButtonTicketForm>
      </form>
      <Toaster position="top-right" reverseOrder={true} />
    </div>
  );
};

const ButtonTicketForm = styled(Button)`
  margin-top: 32px;
  margin-left: 0;
`;

export default TicketForm;
