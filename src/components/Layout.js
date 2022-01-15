import { Outlet } from 'react-router-dom';
import NavPanel from '../components/NavPanel';
import HeaderAccount from './HeaderAccount';

export default function Layout() {
  return (
    <>
      <NavPanel />
      <HeaderAccount />
      <Outlet />
    </>
  );
}
