import { useLocation, useNavigate } from 'react-router-dom';
import './header.scss'


export function Header() {
  const navigate = useNavigate();
  let location = useLocation(); 

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
        {/* <div className='hamburger-icon' onClick={() => toggleUserOpt()}><IoMenu /></div> */}
      </nav>
    </div>
    {/* <div className={`hamburger-content ${userOptVisible}`}>
      <div className='hamburger-wrapper'>
        <div onClick={() => handleClick("")} className={`${location.pathname === "/" ? "active" : ""}`}>{t("home")}</div>
        <div onClick={() => handleClick("about")} className={`${location.pathname === "/about" ? "active" : ""}`}>{t("about")}</div>
        <div onClick={() => handleClick("products")} className={`${location.pathname === "/products" ? "active" : ""}`}>{t("products")}</div>
        <div onClick={() => handleClick("information")} className={`${location.pathname === "/information" ? "active" : ""}`}>{t("information")}</div>
      </div>
    </div> */}
  </div>
}
