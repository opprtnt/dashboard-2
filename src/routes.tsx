import LoginPage from './pages/LoginPage';
import Auth from './hoc/Auth';
import NewTicketPage from './pages/NewTicketPage';
import { TicketPage } from './pages/TicketPage';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import TicketsPage from './pages/TicketsPage';
import React from 'react';

export const routes = {
  homepage: {
    path: '/',
    element: (
      <Auth>
        <LoginPage />
      </Auth>
    ),
  },
  elementLayout: <Layout />,
  dashboard: {
    path: 'dashboard',
    element: (
      <Auth>
        <Dashboard />
      </Auth>
    ),
  },
  tickets: { path: 'tickets', element: <TicketsPage /> },
  new: {
    path: 'new',
    element: (
      <Auth>
        <NewTicketPage />
      </Auth>
    ),
  },
  ticketId: {
    path: ':id',
    element: (
      <Auth>
        <TicketPage />
      </Auth>
    ),
  },
};
