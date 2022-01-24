import { useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Select, MenuItem, FormControl } from '@mui/material';
import React, { useEffect, useRef, useState, FC } from 'react';
import { getFirestore, increment, serverTimestamp } from 'firebase/firestore';
import { updateDoc, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import InputLabel from '@mui/material/InputLabel';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setTitlePage } from '../store/appSlice';
import styled from 'styled-components';
import { useAppSelector } from '../store';

const TicketPage: FC = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const db = getFirestore();
  const docRef = doc(db, 'tickets', id!);
  const docCount = doc(db, 'count', 'count');
  const [data, setData] = useState({ title: '', user: { uid: '' }, completed: false, priority:0, ticket:'' });
  const [isUser, setIsUser] = useState(false);
  const [status, setStatus] = useState(false);
  const user = useAppSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const componentMounted = useRef(true);
  
  useEffect(() => {
    dispatch(setTitlePage(data.title));
  }, [dispatch, data.title]);

  useEffect(() => {
    if (user && data.title) {
      setIsUser(user.uid === data.user.uid);
      setStatus(data.completed);
    }
  }, [setIsUser, data.title, setStatus, data.completed, user,data.user.uid]);

  useEffect(() => {
    async function getTicket() {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(JSON.parse(JSON.stringify(docSnap.data())));
      } else {
        console.log('No such document!');
      }
    }
    if (componentMounted.current) {
      getTicket();
    }
    return () => {
      componentMounted.current = false;
    };
  }, [setData, docRef]);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: 'all',
  });
  const sendTicket = async (data:{ title: string, description: string, priority: number }) => {
    await updateDoc(doc(db, 'tickets', id!), {
      title: data.title,
      ticket: data.description,
      priority: data.priority,
      date: serverTimestamp(),
    });
    toast.success('Saved successfully');
  };

  const completeTicket = async () => {
    await updateDoc(docRef, {
      completed: true,
    });
  };

  const deleteTicket = async () => {
    await deleteDoc(docRef);
    await updateDoc(docCount, {
      count: increment(-1),
    });
    navigate('/tickets');
  };

  const onError = () => toast.error('Validations error!');

  if (!data.title) return <Loader />;
  return (
    <div className="container">
      <div className="container__content">
        <TicketForm className="white">
          <h3>Editing</h3>
          <form className="form" onSubmit={handleSubmit(sendTicket, onError)}>
            <Controller
              control={control}
              rules={{ required: 'Обязательное поле!', maxLength: 50 }}
              name="title"
              defaultValue={data.title}
              render={({ field }) => {
                return (
                  <TextField
                    inputProps={{ readOnly: !isUser || status }}
                    {...field}
                    margin="normal"
                    error={errors?.title?.type === 'required'}
                    sx={{ width: '344px', margin: '0 16px 0 0' }}
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
                  <FormControl>
                    <InputLabel error={errors?.priority?.type === 'required'}>
                      {errors?.priority?.type === 'required' ? 'Обязательное поле!' : 'Select priority *'}
                    </InputLabel>
                    <Select
                      inputProps={{ readOnly: !isUser || status }}
                      {...field}
                      error={errors?.priority?.type === 'required'}
                      sx={{ width: '344px' }}
                      label={errors?.priority?.type === 'required' ? 'Обязательное поле!' : 'Select priority *'}
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
                    sx={{ width: '704px', margin: '32px 0 0 0' }}
                    inputProps={{ readOnly: !isUser || status }}
                  />
                );
              }}
            />
            <div className="row">
              <div className="row">
                {isUser && !status && (
                  <Button type="submit">
                    Save Details
                  </Button>
                )}
                {isUser && !status && (
                  <Button yellow onClick={completeTicket}>
                    Complete
                  </Button>
                )}
                {status && <p className="form__comleted-block">Comleted</p>}
              </div>
              {isUser && !status && (
                <Button red onClick={deleteTicket}>
                  Delete
                </Button>
              )}
            </div>
          </form>
          <Toaster position="top-right" reverseOrder={true}></Toaster>
        </TicketForm>
      </div>
    </div>
  );
};
export { TicketPage };

const Button = styled.button<{yellow?:boolean, red?:boolean}>`
  margin-top: 32px;
  background: ${({yellow, red}) => (yellow ? ({ theme }) => theme.colors.low : red ? ({ theme }) => theme.colors.high : ({ theme }) => theme.colors.primary)};
  color: white;
  font-weight: 600;
  font-size: 14px;
  padding: 8px 20px;
  line-height: 24px;
  border-radius: 8px;
  border: none;
  display: block;
  cursor: pointer;
  & + & {
    margin-left: 30px;
  }
`;
const TicketForm = styled.div`
  padding: 32px;
  border-radius: 8px;
  h3 {
    margin-bottom: 36px;
  }
  .row {
    justify-content: space-between;
  }
  .form {
    max-width: 704px;
    &__comleted-block {
      margin-top: 32px;
      font-size: 1.5rem;
    }
  }
`;
