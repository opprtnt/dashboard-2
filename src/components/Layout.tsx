import { Outlet } from 'react-router-dom';
import NavPanel from './NavPanel';
import HeaderAccount from './HeaderAccount';
import React from 'react';

export default function Layout() {
  return (
    <>
      <NavPanel />
      <HeaderAccount />
      <Outlet />
    </>
  );
}
