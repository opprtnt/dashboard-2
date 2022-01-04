import './scss/App.scss';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import Dashboard from './pages/Dashboard';
import Auth from './hoc/Auth';
import TicketsPage from './pages/TicketsPage';
import NewTicketPage from './pages/NewTicketPage';

const firebaseConfig = {
  apiKey: 'AIzaSyB5wRSoNDFoW6OGPm-90m-9_yrJDShFLWw',
  authDomain: 'login-dashboard-47d11.firebaseapp.com',
  projectId: 'login-dashboard-47d11',
  storageBucket: 'login-dashboard-47d11.appspot.com',
  messagingSenderId: '159694511820',
  appId: '1:159694511820:web:ad2f61045357ebae39ec69',
  measurementId: 'G-SZPPS63QSG',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="dashboard"
          element={
            <Auth>
              <Dashboard />
            </Auth>
          }
        />
        <Route
          path="tickets"
          element={
            <Auth>
              <TicketsPage />
            </Auth>
          }
        />
        <Route path="tickets/new" element={<NewTicketPage />} />
      </Routes>
    </div>
  );
}

export default App;
