import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { ContextLogin } from '../index';
import { useContext } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { initCurrentUser } from '../store/authSlice';

export default function SubmitButton() {
  const SubmitButton = styled.button`
    background: #3751ff;
    color: white;
    width: 100%;
    font-weight: 600;
    font-size: 14px;
    padding: 13px 0 15px;
    border-radius: 8px;
    border: none;
    box-shadow: 0px 4px 12px rgba(55, 81, 255, 0.24);
    margin-top: 24px;
  `;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useContext(ContextLogin);
  const click = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    const UserObj = JSON.parse(JSON.stringify(user));
    dispatch(initCurrentUser(UserObj));
    localStorage.setItem('currentUser', UserObj);
    navigate('dashboard');
  };

  return <SubmitButton onClick={click}>Login with Google</SubmitButton>;
}
