import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Register.css';
import logo from '../../images/logo-big.svg';

function Register({ handleRegister }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function onRegister(e) {
    e.preventDefaul();

    handleRegister(name, email, password);
  }

  return (
    <div className="register">
      <img
        src={logo} alt="Лого" className="register__logo" />
      <h2 className='register__title'>Добро пожаловать!</h2>
      <form 
        className='form register__form'
        name='register'
        onSubmit={onRegister}>
        <label
          htmlFor="form__register-name"
          className="register__label">
            Имя
        </label>
        <input
          className="register__input"
          type="text"
          id="form__register-name"
          name="register-name"
          minLength="2"
          maxLength="30"
          onChange={handleNameChange}
          value={name || ''}
          required />
        <span id="form__register-name-error" className="form__input-error"></span>

        <label
          htmlFor="form__register-email"
          className="register__label">
            E-mail
        </label>
        <input
          className="register__input"
          type="email"
          id="form__register-email"
          name="register-email"
          onChange={handleEmailChange}
          value={email || ''}
          required />
        <span id="form__register-email-error" className="form__input-error"></span>

        <label
          htmlFor="form__register-password"
          className="register__label">
            Пароль
        </label>
        <input
          className="register__input"
          type="password"
          id="form__register-password"
          name="password"
          onChange={handlePasswordChange}
          value={password || ''}
          required />
        <span id="form__profile-description-error" className="form__input-error"></span>

        <span className="form__error_onregister"></span>
        <button
          type="submit"
          className="button register__button">
          Зарегистрироваться
        </button>

        <span className="register__text">Уже зарегистрированы?  <Link className="register__link" to="signin">Войти</Link></span>

      </form>
    </div>
  )
}

export default Register;