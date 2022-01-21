import './scss/App.scss';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { FC, useContext, useEffect } from 'react';
import { initCurrentUser } from './store/appSlice';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ContextLogin } from './index';
import { routes } from './routes';
import { useAppSelector } from './store';
import Loader from './components/Loader';

const App: FC = () => {
  const theme = useAppSelector((state) => state.user.themeDark);
  const dispatch = useDispatch();
  const { auth } = useContext(ContextLogin);
  const [user] = useAuthState(auth);
  const themeDark = createTheme({
    palette: {
      mode: theme ? 'dark' : 'light',
    },
    typography: {
      allVariants: {
        fontFamily: 'Inter',
      },
    },
  });
  const AppComponent = styled.div`
    color: ${theme ? 'white' : '#252733'};
    background-color: ${theme ? '#252733' : '#f7f8fc'};
    min-height: 100vh;
    .gray {
      color: ${theme ? 'white' : '#9FA2B4'};
    }
    .white {
      background-color: ${theme ? '#7A7E99' : 'white'};
      border: 1px solid ${theme ? '#0C0F21' : '#DFE0EB'};
    }
    text {
      fill: ${theme ? 'white' : '#9FA2B4'};
    }

    .primary {
      background-color: ${theme ? '#8AB7F6' : '#2F80ED'};
    }
    .text-color {
      color: ${theme ? 'white' : '#252733'};
    }
    .ticket-card {
      background-color: ${theme ? '#9598ad' : false};
    }
  `;

  useEffect(() => {
    if (user) dispatch(initCurrentUser(JSON.parse(JSON.stringify(user))));
  }, [user, dispatch]);

  if (!user) return <Loader />;

  return (
    <ThemeProvider theme={themeDark}>
      <AppComponent className="App">
        <Routes>
          <Route path={routes.homepage.path} element={routes.homepage.element} />
          <Route path={routes.dashboard.path} element={routes.elementLayout}>
            <Route index element={routes.dashboard.element} />
          </Route>
          <Route path={routes.tickets.path} element={routes.elementLayout}>
            <Route index element={routes.tickets.element} />

            <Route path={routes.new.path} element={routes.new.element} />
            <Route path={routes.ticketId.path} element={routes.ticketId.element} />
          </Route>
        </Routes>
      </AppComponent>
    </ThemeProvider>
  );
};

export default App;
