import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { createContext } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/index';
import { firebaseConfig } from './firebaseConfig';

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export const ContextLogin = createContext({ auth: auth, app: app });

ReactDOM.render(
  <ContextLogin.Provider
    value={{
      app: app,
      auth: auth,
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
