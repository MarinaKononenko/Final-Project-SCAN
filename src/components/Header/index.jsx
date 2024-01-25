import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import store from "../../store/store.js";
import styles from "./Header.module.css";
import BurgerMenu from "../../components/BurgerMenu/BurgerMenu.jsx";
import Logo from "../../assets/images/Logo-image.svg";
import LogoInverted from "../../assets/images/Logo-image-inverted.svg";
import Photo from "../../assets/images/Avatar4.jpg";
import Loader from "../../components/Loader/Loader.jsx";
import { accountInfo } from "../../api/authService";
import { authControl } from "../../utils/authControl.js";
import { authReset } from "../../utils/authReset.js";

function Header({ isAuth, setIsAuth }) {
  const [userData, setUserData] = useState({
    companiesUsed: localStorage.getItem("CompaniesUsed"),
    companiesLimit: localStorage.getItem("CompaniesLimit"),
    userName: localStorage.getItem("User"),
    userAvatar: Photo,
  });

  const [menuStatus, setMenuStatus] = useState(store.getState().menuStatus);
  const [token, setToken] = useState(localStorage.getItem("TOKEN"));
  const logoRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem("TOKEN"));
    authControl(
      localStorage.getItem("TOKEN"),
      localStorage.getItem("EXPIRE"),
      setIsAuth
    );
    if (isAuth) {
      getInfoData(token);
    }
  }, [isAuth, location]);

  async function getInfoData() {
    try {
      const res = await accountInfo(token);
      setUserData({
        ...userData,
        companiesUsed: res.usedCompanyCount,
        companiesLimit: res.companyLimit,
      });
      localStorage.setItem("CompaniesUsed", res.usedCompanyCount);
      localStorage.setItem("CompaniesLimit", res.companyLimit);
    } catch (e) {
      console.log("Impossible to receive account data:", e);
    }
  }

  function handleAccountExit() {
    authReset(setIsAuth, navigate);
  }

  function redirectMain() {
    navigate("/");
  }

  store.subscribe(() => {
    setMenuStatus(store.getState().menuStatus);
  });

  return (
    <header className={menuStatus ? styles.headerInverted : styles.header}>
      <Link to={"/"} className={styles.logo}>
        <img
          ref={logoRef}
          className={styles.imgLogo}
          src={menuStatus ? LogoInverted : Logo}
          alt="Logo"
        />
      </Link>
      <div>
        <nav className={styles.nav}>
          <button onClick={redirectMain} className={styles.link}>
            Главная
          </button>
          <button className={styles.link}>Тарифы</button>
          <button className={styles.link}>FAQ</button>
        </nav>
      </div>
      <div className={styles.authData}>
        {isAuth ? (
          userData.companiesLimit ? (
            <div
              className={
                menuStatus ? styles.requestsInfoHidden : styles.requestsInfo
              }
            >
              <div className={styles.info}>Использовано компаний </div>
              <div className={styles.data}>{userData.companiesUsed}</div>
              <div className={styles.info}>Лимит по компаниям</div>
              <div className={styles.data}>{userData.companiesLimit}</div>
            </div>
          ) : (
            <div className={styles.loaderContainer}>
              <Loader />
            </div>
          )
        ) : (
          <>
            <div className={styles.auth}>
              <Link className={styles.register} to={"#"}>
                Зарегистрироваться
              </Link>
              <div className={styles.separator}></div>
              <Link className={styles.enter} to={"/auth"}>
                Войти
              </Link>
            </div>
            <div className={styles.burger}>
              <BurgerMenu />
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
