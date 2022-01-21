import React from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
  children: React.ReactElement,
};

const Auth = ({ children }: Props) => {
  const user = localStorage.getItem('currentUser');

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};
export default Auth;
