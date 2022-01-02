import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import ErrorMessage from '@hookform/error-message';
import Password from '../components/Password';
import SubmitButton from '../components/SubmitButton';
import { useContext } from 'react';
import { ContextLogin } from '../index';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: 'all',
  });
  const { auth } = useContext(ContextLogin);

  const login = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    console.log(user);
  };

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="login">
      <div className="login__header">
        <img src="../img/logo.svg" alt="" className="login__logo" />
        <span className="login__logo-title">Dashboard Kit</span>
      </div>
      <div className="login__title-block">
        <p className="login__title">Log In to Dashboard Kit</p>
        <p className="login__subtitle">Enter your email and password below</p>
      </div>
      <form onSubmit={login} className="form">
        <Controller
          control={control}
          rules={{ required: 'Обязательное поле!', maxLength: 100 }}
          name="login"
          defaultValue={null}
          render={({ field }) => {
            return <TextField required id="outlined-required" placeholder="Email address" />;
          }}
        />
        <Controller
          control={control}
          rules={{ required: 'Обязательное поле!', maxLength: 100 }}
          name="login"
          defaultValue={null}
          render={({ field }) => {
            return <Password></Password>;
          }}
        />
        <SubmitButton>
          
        </SubmitButton>

        {/* <ErrorMessage
          errors={errors}
          name="login"
          render={({ messages }) => {
            return messages
              ? Object.entries(messages).map(([type, message]) => (
                  <p className="form__error-block" key={type}>
                    {message}
                  </p>
                ))
              : null;
          }} */}
        {/* /> */}
      </form>
    </div>
  );
}
