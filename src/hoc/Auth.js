import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useContext } from 'react';
import { ContextLogin } from '../index';

export default function Auth({ children }) {
  const { auth } = useContext(ContextLogin);
  const [user] = useAuthState(auth);

  return children;
}
