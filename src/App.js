import './scss/App.scss';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

import Dashboard from './pages/Dashboard';
import Auth from './hoc/Auth';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <Auth>
              <Dashboard />
            </Auth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
