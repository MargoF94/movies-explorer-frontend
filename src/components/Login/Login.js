import React from "react";
import { Link } from "react-router-dom";
import './Login.css';
import { FormValidation } from '../../utils/validation.js';
import logo from '../../images/logo-big.svg';

function Login({ handleLogin }) {

  const { values, handleChange, errors, isValid } = FormValidation();

  function onLogin(e) {
    e.preventDefault();

    handleLogin(values.email, values.password);
  }

  console.info(`In Login ${JSON.stringify(values)}`);

  return (
    <div className="login">
      <Link
        to="/"
        className="login__logo-link" >
        <img
          src={logo}
          alt="Лого страницы"
          className="login__logo" />
      </Link>
      <h2 className='login__title'>Hey there!</h2>
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
          className={`login__input ${errors.email ? 'login__input_error' : ''}`}
          type="email"
          id="form__login-email"
          name="email"
          pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-z]{2,})\b"
          onChange={handleChange}
          value={values.email || ""}
          required />
        <span
          id="form__login-email-error"
          className={`login__error ${errors.email ? 'login__error_active' : ''}`}>
          {errors.email}
        </span>

        <label
          htmlFor="form__login-password"
          className="login__label">
            Password
        </label>
        <input
          className={`login__input ${errors.password ? 'login__input_error' : ''}`}
          type="password"
          id="form__login-password"
          name="password"
          onChange={handleChange}
          value={values.password || ''}
          required />
        <span
          id="form__profile-description-error"
          className={`login__error ${errors.password ? 'login__error_active' : ''}`}>
          {errors.password || ''}
        </span>

        <button
          type="submit"
          className={`login__button ${!isValid ? 'login__button_disabled' : ''}`}
          disabled={!isValid}>
            Sigh in
        </button>

      </form>
      <span className="login__text">Don&#39;t have an account yet?  <Link className="login__link" to="/signup">Sign up</Link></span>
    </div>
  )
}

export default Login;