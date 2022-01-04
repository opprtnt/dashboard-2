import { Outlet } from 'react-router-dom';
import HeaderAccount from '../components/HeaderAccount';
import NavPanel from '../components/NavPanel';

export default function Dashboard() {
  return (
    <div>
      <NavPanel></NavPanel>
      <HeaderAccount></HeaderAccount>
      <Outlet></Outlet>
    </div>
  );
}
