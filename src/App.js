import './scss/App.scss';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Auth from './hoc/Auth';
import TicketsPage from './pages/TicketsPage';
import NewTicketPage from './pages/NewTicketPage';
import { TicketPage } from './pages/TicketPage';
import Layout from './components/Layout';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { collection, getDocs, getFirestore, limit, orderBy, query } from 'firebase/firestore';
import { useContext, useEffect } from 'react';
import { changeFilter, initAuth, initCurrentUser, setData, setUserAuth } from './store/authSlice';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ContextLogin } from './index';

function App() {
  const theme = useSelector((state) => state.user.themeDark);
  const dispatch = useDispatch();
  const db = getFirestore();
  const docRef = collection(db, 'tickets');
  const q = query(docRef, orderBy('date', 'desc'), limit(100));
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
  const App = styled.div`
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
      .Mui-disabled,
      .MuiSelect-icon {
        color: ${theme ? '#bdbdbd' : false};
      }
    }
    .ticket-card {
      background-color: ${theme ? '#9598ad' : false};
    }
  `;

  useEffect(async () => {
    let arr = [];
    const docSnap = await getDocs(q);
    docSnap.forEach((doc) => {
      doc.data().date = doc.data().date.seconds;
      arr.push(Object.assign(JSON.parse(JSON.stringify(doc.data())), { id: doc.id }));
    });
    dispatch(setData(arr));
    dispatch(changeFilter(arr));
  }, [user, dispatch]);

  useEffect(() => {
    if (user) dispatch(initCurrentUser(JSON.parse(JSON.stringify(user))));
    console.log(user);
  }, [user]);

  //if (user === null) return <Loader />;

  return (
    <ThemeProvider theme={themeDark}>
      <App className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="dashboard" element={<Layout />}>
            <Route
              index
              element={
                <Auth>
                  <Dashboard />
                </Auth>
              }
            />
          </Route>
          <Route path="tickets" element={<Layout />}>
            <Route
              index
              element={
                <Auth>
                  <TicketsPage />
                </Auth>
              }
            />

            <Route
              path="new"
              element={
                <Auth>
                  <NewTicketPage />
                </Auth>
              }
            />
            <Route
              path=":id"
              element={
                <Auth>
                  <TicketPage />
                </Auth>
              }
            />
          </Route>
        </Routes>
      </App>
    </ThemeProvider>
  );
}

export default App;
