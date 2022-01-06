import { useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Select, MenuItem, FormControl } from '@mui/material';
import { useEffect, useState } from 'react';
import { collection, getFirestore, serverTimestamp } from 'firebase/firestore';
import { updateDoc, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useContext } from 'react';
import { ContextLogin } from '../index';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { ErrorMessage } from '@hookform/error-message';
import InputLabel from '@mui/material/InputLabel';
import { display } from '@mui/system';

function TicketPage() {
  const { id } = useParams();
  const [priority, setPriority] = useState('');
  let navigate = useNavigate();
  const db = getFirestore();
  const docRef = doc(db, 'tickets', id);
  const { auth } = useContext(ContextLogin);
  const [user] = useAuthState(auth);
  const [data, setData] = useState({ title: '' });
  const [isUser, setIsUser] = useState(true);
  // const isUser = true;

  useEffect(() => {
    if (user) {
      setIsUser(user.uid == data.user.uid);
    }
  }, [setIsUser, isUser]);

  useEffect(async () => {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      setData(docSnap.data());
    } else {
      console.log('No such document!');
    }
  }, [setData]);

  const handleChange = (event) => {
    setPriority(event.target.value);
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: 'all',
  });
  const sendTicket = async (data) => {
    await updateDoc(doc(db, 'tickets', id), {
      title: data.title,
      ticket: data.description,
      priority: data.priority,
      date: serverTimestamp(),
    });

    // navigate(`/tickets/${docRef.id}`);
  };

  const completeTicket = async () => {
    await updateDoc(docRef, {
      completed: true,
    });
  };

  const deleteTicket = async () => {
    await deleteDoc(docRef);
    navigate('/tickets');
  };
  if (!data.title) return <Loader></Loader>;
  return (
    <div>
      <form onSubmit={handleSubmit(sendTicket)}>
        <Controller
          control={control}
          rules={{ required: 'Обязательное поле!', maxLength: 50 }}
          name="title"
          defaultValue={data.title}
          render={({ field }) => {
            return (
              <TextField
                inputProps={{ readOnly: !isUser }}
                {...field}
                margin="normal"
                error={errors?.title?.type === 'required'}
                fullWidth
                label={errors?.title?.type === 'required' ? 'Обязательное поле!' : 'Ticket Title *'}
              />
            );
          }}
        />
        <Controller
          control={control}
          name="priority"
          rules={{ required: 'Обязательное поле!' }}
          defaultValue={data.priority}
          render={({ field }) => {
            return (
              <FormControl fullWidth>
                <InputLabel error={errors?.priority?.type === 'required'}>
                  {errors?.priority?.type === 'required' ? 'Обязательное поле!' : 'Select priority *'}
                </InputLabel>
                <Select
                  inputProps={{ readOnly: !isUser }}
                  value={data.priority}
                  onChange={handleChange}
                  autoWidth
                  {...field}
                  error={errors?.priority?.type === 'required'}
                  fullWidth
                  label={errors?.priority?.type === 'required' ? 'Обязательное поле!' : 'Select priority *'}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'Low'}>Low</MenuItem>
                  <MenuItem value={'Hight'}>Hight</MenuItem>
                  <MenuItem value={'Normal'}>Normal</MenuItem>
                </Select>
              </FormControl>
            );
          }}
        />
        <Controller
          control={control}
          rules={{ maxLength: 100 }}
          name="description"
          defaultValue={data.ticket}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                margin="normal"
                fullWidth
                label={'Description'}
                inputProps={{ readOnly: !isUser }}
              />
            );
          }}
        />
        {isUser && <button type="submit">Save Details</button>}
        {isUser && <button onClick={completeTicket}>Complete</button>}
        {isUser && <button onClick={deleteTicket}>Delete</button>}
        <p>
          {user.uid}//
          {data.user.uid}
        </p>
      </form>
    </div>
  );
}
export { TicketPage };
