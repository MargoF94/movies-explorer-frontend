import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Login.css';
import logo from '../../images/logo-big.svg';

function Login({ handleLogin }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  };

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  };

  function onLogin(e) {
    e.preventDefault();
    console.log('Login: prevented default on submit!');
    console.log(`Login: current email: ${email} and passord:${password}`);

    handleLogin(email, password);
  }

  return (
    <div className="login">
      <img
        src={logo}
        alt="Лого страницы"
        className="login__logo" />
      <h2 className='login__title'>Рады видеть!</h2>
      <form 
        className='form login__form'
        name='login'
        onSubmit={onLogin}>

        <label
          htmlFor="form__login-email"
          className="login__label">
            E-mail
        </label>
        <input
          className="login__input"
          type="text"
          id="form__login-email"
          name="login-email"
          onChange={handleEmailChange}
          value={email || ''}
          required />
        <span
          id="form__login-email-error"
          className="form__input-error">
        </span>

        <label
          htmlFor="form__login-password"
          className="login__label">
            Пароль
        </label>
        <input
          className="login__input"
          type="password"
          id="form__login-password"
          name="password"
          onChange={handlePasswordChange}
          value={password || ''}
          required />
        <span
          id="form__profile-description-error"
          className="form__input-error">
        </span>

        <button
          type="submit"
          className="login__button">
            Войти
        </button>

      </form>
      <span className="login__text">Ещё не зарегистрированы?  <Link className="login__link" to="/signup">Регистрация</Link></span>
    </div>
  )
}

export default Login;