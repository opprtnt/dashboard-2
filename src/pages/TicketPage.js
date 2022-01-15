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
import InputLabel from '@mui/material/InputLabel';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setTitlePage } from '../store/authSlice';
import styled from 'styled-components';

function TicketPage() {
  const { id } = useParams();
  let navigate = useNavigate();
  const db = getFirestore();
  const docRef = doc(db, 'tickets', id);
  const [data, setData] = useState({ title: '' });
  const [isUser, setIsUser] = useState(false);
  const [status, setStatus] = useState();
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  dispatch(setTitlePage(data.title));

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
  const Button = styled.button`
    margin-top: 32px;
    background: ${(props) => (props.yellow ? '#F2C94C' : props.red ? '#EB5757' : '#2f80ed')};
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

  useEffect(() => {
    if (user && data.title) {
      setIsUser(user.uid == data.user.uid);
      setStatus(data.completed);
    }
  }, [setIsUser, data.title, setStatus]);

  useEffect(async () => {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      setData(docSnap.data());
    } else {
      console.log('No such document!');
    }
  }, [setData]);

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
    toast.success('Saved successfully');
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
                      value={data.priority}
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
                  <Button className="primary" type="submit">
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
      {/* <p>{user1.uid}</p> */}
    </div>
  );
}
export { TicketPage };
