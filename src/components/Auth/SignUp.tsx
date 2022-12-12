import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authSignUp } from "../../features/applicationSlice";
import styles from "../Auth/auth.module.css";
import { useAppDispatch } from "../../hooks";

const SignUp = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleSetName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLogin(e.target.value);
  };

  const handleSetPass = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleSignUp = (e: any): void => {
    e.preventDefault();
    dispatch(authSignUp({ login, password }));
    setLogin("");
    setPassword("");
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginScreen}>
        <div className={styles.appTitle}>
          <h1>Создать аккаунт</h1>
        </div>
        <div className={styles.loginForm}>
          <div className={styles.controlGroup}>
            <form onSubmit={handleSignUp}>
              <input
                id="login-name"
                className={styles.loginField}
                type="text"
                value={login}
                placeholder="логин"
                onChange={handleSetName}
              />
            </form>
          </div>
          <br />
          <div className={styles.controlGroup}>
            <form>
              <input
                id="login-pass"
                className={styles.loginField}
                type="password"
                value={password}
                placeholder="пароль"
                onChange={handleSetPass}
              />
              <br />
              <button className={styles.btn} type="submit" onClick={handleSignUp}>
                Зарегистрироваться
              </button>
              <a className={styles.loginLink} href="#">
                У вас есть аккаунт?
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
