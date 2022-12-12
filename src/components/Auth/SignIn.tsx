import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authSignIn } from "../../features/applicationSlice";
import styles from "../Auth/auth.module.css";
import { useAppDispatch } from "../../hooks";

const SignIn = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleSetName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLogin(e.target.value);
  };

  const handleSetPass = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleSignIn = (e: any) => {
    e.preventDefault();
    dispatch(authSignIn({ login, password }));
    setLogin("");
    setPassword("");
    navigate("/");
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginScreen}>
        <div className={styles.appTitle}>
          <h1>Вход в аккаунт</h1>
        </div>
        <div className={styles.loginForm}>
          <div className={styles.controlGroup}>
            <form onSubmit={handleSignIn}>
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
              <button
                className={styles.btn}
                type="submit"
                onClick={handleSignIn}
              >
                Войти
              </button>
              <a className={styles.loginLink} href="#">
                Забыли свой пароль?
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
