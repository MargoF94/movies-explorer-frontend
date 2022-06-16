import React from "react";
import { Link } from "react-router-dom";
import './Login.css';
import logo from '../../images/logo-big.svg';

function Login() {
  return (
    <div className="login">
      <img
        src={logo}
        alt="Лого страницы"
        className="login__logo" />
      <h2 className='login__title'>Рады видеть!</h2>
      <form 
        className='form login__form'
        name='login'>

        <label
          for="form__login-email"
          className="login__label">
            E-mail
        </label>
        <input
          className="login__input"
          type="text"
          id="form__login-email"
          name="login-email"
          required />
        <span
          id="form__login-email-error"
          className="form__input-error">
        </span>

        <label
          for="form__login-password"
          className="login__label">
            Пароль
        </label>
        <input
          className="login__input"
          type="password"
          id="form__login-password"
          name="password"
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
      <span className="login__text">Ещё не зарегистрированы?  <Link className="login__link" to="signup">Регистрация</Link></span>
    </div>
  )
}

export default Login;