import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createContext } from 'react';
import { Provider } from 'react-redux';
import store from './store/index';

const firebaseConfig = {
  apiKey: 'AIzaSyB5wRSoNDFoW6OGPm-90m-9_yrJDShFLWw',
  authDomain: 'login-dashboard-47d11.firebaseapp.com',
  projectId: 'login-dashboard-47d11',
  storageBucket: 'login-dashboard-47d11.appspot.com',
  messagingSenderId: '159694511820',
  appId: '1:159694511820:web:ad2f61045357ebae39ec69',
  measurementId: 'G-SZPPS63QSG',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export const ContextLogin = createContext(null);

ReactDOM.render(
  <ContextLogin.Provider
    value={{
      app,
      auth,
    }}
  >
    <Provider store={store}>
      <React.StrictMode>
        <BrowserRouter>
          {' '}
          <App />
        </BrowserRouter>
      </React.StrictMode>{' '}
    </Provider>
  </ContextLogin.Provider>,
  document.getElementById('root')
);
