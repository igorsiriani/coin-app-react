import { useLocation, useNavigate } from 'react-router-dom';
import './header.scss'
import { useState } from 'react';
import { IoMenu } from 'react-icons/io5';


export function Header() {
  const navigate = useNavigate();
  let location = useLocation(); 

  const [show, setShow] = useState<boolean>(false);

  const userOptVisible = show ? "show" : "hidden";

  const toggleUserOpt = () => {
    setShow((prevState) => !prevState);
  };

  function handleClick(route: string) {
    navigate("/" + route);
  }

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/login');
  };

  return <div id='header'>
    <div className='wrapper'>
      <div className='logo' onClick={() => handleClick("")}>
        <img src='/logo.png' title="Câmbio"></img>
      </div>
      <nav id='menu'>
        <ul>
          <li onClick={() => handleClick("currency")} className={`${location.pathname === "/currency" ? "active" : ""}`}>Câmbio</li>
          <li onClick={() => handleClick("wallet")} className={`${location.pathname === "/wallet" ? "active" : ""}`}>Carteira</li>
        </ul>
        <div onClick={handleLogout} className="logout">Logout</div>
        <div className='hamburger-icon' onClick={() => toggleUserOpt()}><IoMenu /></div>
      </nav>
    </div>
    <div className={`hamburger-content ${userOptVisible}`}>
      <div className='hamburger-wrapper'>
        <div onClick={() => handleClick("currency")} className={`${location.pathname === "/currency" ? "active" : ""}`}>Câmbio</div>
        <div onClick={() => handleClick("wallet")} className={`${location.pathname === "/wallet" ? "active" : ""}`}>Carteira</div>
      </div>
    </div>
  </div>
}
