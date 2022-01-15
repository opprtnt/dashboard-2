import { Navigate } from 'react-router-dom';

export default function Auth({ children }) {
  const user = localStorage.getItem('currentUser');

  if (!user) {
    return <Navigate to="/"></Navigate>;
  }

  return children;
}
