import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { ThemeProvider as ThemeProviderMui, createTheme } from '@mui/material/styles';
import React, { FC, useContext, useEffect } from 'react';
import { initCurrentUser } from './store/appSlice';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ContextLogin } from './index';
import { routes } from './routes';
import { useAppSelector } from './store';
import Loader from './components/Loader';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './style/theme';
import GlobalStyles from './style/global';

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

  useEffect(() => {
    if (user) dispatch(initCurrentUser(JSON.parse(JSON.stringify(user))));
  }, [user, dispatch]);

  if (!user) return <Loader />;

  return (
    <ThemeProviderMui theme={themeDark}>
      <ThemeProvider theme={theme ? darkTheme : lightTheme}>
        <AppComponent>
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
          <GlobalStyles />
        </AppComponent>
      </ThemeProvider>
    </ThemeProviderMui>
  );
};
const AppComponent = styled.div`
  color: ${({ theme }) => theme.colors.font};
  background-color: ${({ theme }) => theme.colors.bg};
  min-height: 100vh;
  .gray {
    color: ${({ theme }) => theme.colors.headColor};
  }
  .white {
    background-color: ${({ theme }) => theme.colors.contentBg};
    border: ${({ theme }) => theme.colors.border};
  }
  text {
    fill: ${({ theme }) => theme.colors.headColor};
  }

  .primary {
    background-color: ${({ theme }) => theme.colors.primaryBtn};
  }
  .text-color {
    color: ${({ theme }) => theme.colors.font};
  }
`;

export default App;
