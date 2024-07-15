import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Wallet from "./pages/wallet/wallet";
import Currency from './pages/currency/currency';

import './assets/themes/styles.scss';
import Login from './pages/login/login';
import Register from './pages/register/register';

const AuthGuard: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const isAuthenticated = Boolean(localStorage.getItem('auth'));
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Header />}> */}
        <Route path="/currency" element={<AuthGuard><Currency /></AuthGuard>} />
        <Route path="/wallet" element={<AuthGuard><Wallet /></AuthGuard>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/currency" />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>

}

export default App
