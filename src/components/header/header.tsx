import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoMenu } from "react-icons/io5";

import './header.scss'
import { useState } from 'react';

export function Header() {
  const { t } = useTranslation("global");
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

  return <div id='header'>
    <div className='wrapper'>
      <div className='logo' onClick={() => handleClick("")}>
        <img src='src/assets/images/logo.svg' title={t("home")}></img>
      </div>
      <nav id='menu'>
        <ul>
          <li onClick={() => handleClick("")} className={`${location.pathname === "/" ? "active" : ""}`}>{t("home")}</li>
          <li onClick={() => handleClick("about")} className={`${location.pathname === "/about" ? "active" : ""}`}>{t("about")}</li>
          <li onClick={() => handleClick("products")} className={`${location.pathname === "/products" ? "active" : ""}`}>{t("products")}</li>
          <li onClick={() => handleClick("information")} className={`${location.pathname === "/information" ? "active" : ""}`}>{t("information")}</li>
        </ul>
        <div onClick={() => handleClick("contact")} className={`contact ${location.pathname === "/contact" ? "active" : ""}`}>{t("contact")}</div>
        <div className='hamburger-icon' onClick={() => toggleUserOpt()}><IoMenu /></div>
      </nav>
    </div>
    <div className={`hamburger-content ${userOptVisible}`}>
      <div className='hamburger-wrapper'>
        <div onClick={() => handleClick("")} className={`${location.pathname === "/" ? "active" : ""}`}>{t("home")}</div>
        <div onClick={() => handleClick("about")} className={`${location.pathname === "/about" ? "active" : ""}`}>{t("about")}</div>
        <div onClick={() => handleClick("products")} className={`${location.pathname === "/products" ? "active" : ""}`}>{t("products")}</div>
        <div onClick={() => handleClick("information")} className={`${location.pathname === "/information" ? "active" : ""}`}>{t("information")}</div>
      </div>
    </div>
  </div>
}
