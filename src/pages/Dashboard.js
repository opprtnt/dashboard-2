import { Outlet } from 'react-router-dom';
import HeaderAccount from '../components/HeaderAccount';
import NavPanel from '../components/NavPanel';
import TableDashboard from '../components/Table';

export default function Dashboard() {
  return (
    <div>
      <NavPanel></NavPanel>
      <HeaderAccount></HeaderAccount>
      <TableDashboard></TableDashboard>
      <Outlet></Outlet>
    </div>
  );
}
