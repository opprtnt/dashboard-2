import { useForm, Controller } from 'react-hook-form';
import { TextField, Select, MenuItem } from '@mui/material';
import { useState } from 'react';
import { collection, getFirestore, serverTimestamp } from 'firebase/firestore';
import { addDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useContext } from 'react';
import { ContextLogin } from '../index';
import { useNavigate } from 'react-router-dom';

function TicketForm() {
  const [priority, setPriority] = useState('');
  let navigate = useNavigate();
  const db = getFirestore();
  const { auth } = useContext(ContextLogin);
  const [user] = useAuthState(auth);

  const handleChange = (event) => {
    setPriority(event.target.value);
  };
  const { control, handleSubmit } = useForm();
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

    navigate(`/tickets/${docRef.id}`);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(sendTicket)}>
        <Controller
          control={control}
          rules={{ required: 'Обязательное поле!', maxLength: 50 }}
          name="title"
          render={({ field }) => {
            return <TextField {...field} margin="normal" fullWidth />;
          }}
        />
        <Controller
          control={control}
          name="priority"
          render={({ field }) => {
            return (
              <Select value={priority} onChange={handleChange} autoWidth {...field}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={'Low'}>Low</MenuItem>
                <MenuItem value={'Hight'}>Hight</MenuItem>
                <MenuItem value={'Normal'}>Normal</MenuItem>
              </Select>
            );
          }}
        />
        <Controller
          control={control}
          rules={{ required: 'Обязательное поле!', maxLength: 100 }}
          name="description"
          render={({ field }) => {
            return <TextField {...field} margin="normal" fullWidth />;
          }}
        />
        <button type="submit">Save</button>
        <p>{user.displayName}</p>
      </form>
    </div>
  );
}
TicketForm.propTypes = {};

export default TicketForm;
