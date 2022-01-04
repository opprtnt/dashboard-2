import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import ErrorMessage from '@hookform/error-message';
import Password from '../components/Password';
import SubmitButton from '../components/SubmitButton';
import { useContext } from 'react';
import { ContextLogin } from '../index';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { initCurrentUser } from '../store/authSlice';
import { useSelector } from 'react-redux';
import '../scss/LoginPage.scss';

export default function LoginPage() {
  const dispatch = useDispatch();
  const kek = useSelector((state) => state.user.name);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: 'all',
  });
  const { auth } = useContext(ContextLogin);

  const login = async (e) => {
    console.log(55);
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);

    dispatch(initCurrentUser(user.displayName));
  };

  const click = async (e) => {
    console.log(55);
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    const UserObj = JSON.parse(JSON.stringify(user));
    dispatch(initCurrentUser(UserObj));
  };

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="login">
      <div className="login__header">
        <div className="login__logo">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="24" fill="#3751FF" />
            <path
              d="M16.5 14.5C16.5 13.9477 16.9477 13.5 17.5 13.5H23.9857C27.319 13.5 29.9 14.4143 31.7286 16.243C33.5762 18.0716 34.5 20.6475 34.5 23.9705C34.5 27.3132 33.5762 29.9087 31.7286 31.757C29.9 33.5857 27.319 34.5 23.9857 34.5H17.5C16.9477 34.5 16.5 34.0523 16.5 33.5V14.5Z"
              fill="url(#paint0_linear_4856_189)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_4856_189"
                x1="16.5"
                y1="13.5"
                x2="34.5"
                y2="34.5"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="white" stop-opacity="0.7" />
                <stop offset="1" stop-color="white" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span className="login__logo-title">Dashboard Kit</span>
      </div>
      <div className="login__title-block">
        <p className="login__title">Log In to Dashboard Kit</p>
        <p className="login__subtitle">Enter your email and password below</p>
      </div>
      <form className="form">
        <label>Email</label>
        <Controller
          control={control}
          rules={{ required: 'Обязательное поле!', maxLength: 100 }}
          name="login"
          defaultValue={null}
          render={({ field }) => {
            return <TextField margin="normal" fullWidth required id="outlined-required" placeholder="Email address" />;
          }}
        />
        <label>Password</label>
        <Controller
          control={control}
          rules={{ required: 'Обязательное поле!', maxLength: 100 }}
          name="pass"
          defaultValue={null}
          render={({ field }) => {
            return <Password></Password>;
          }}
        />
        <SubmitButton onClick={login}></SubmitButton>

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
      <button onClick={click}>click me</button>
    </div>
  );
}
