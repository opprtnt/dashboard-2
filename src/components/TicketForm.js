import { useForm, Controller } from 'react-hook-form';
import { TextField, Select, MenuItem } from '@mui/material';
import { useState } from 'react';
//import { useCollectionData } from 'react-firebase-hooks';
import { collection, getFirestore } from 'firebase/firestore';
import { doc, addDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useContext } from 'react';
import { ContextLogin } from '../index';

export default function TicketForm() {
  const [priority, setPriority] = useState('');
  //const [tickets, loading] = useCollectionData();
  const db = getFirestore();
  const { auth } = useContext(ContextLogin);
  const [user] = useAuthState(auth);

  const handleChange = (event) => {
    setPriority(event.target.value);
  };
  const { control, handleSubmit } = useForm();
  const sendTicket = (data) => {
    console.log(data, db);
    // const postListRef = doc(db, 'tickets');
    //const newPostRef = push(postListRef);
    addDoc(collection(db, 'tickets'), {
      user: 'lol',
      ticket: 'kek',
      priority: 'Low',
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(sendTicket)}>
        <Controller
          control={control}
          rules={{ required: 'Обязательное поле!', maxLength: 100 }}
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
        <input type="submit" />
        <p>{user.displayName}</p>
      </form>
    </div>
  );
}
