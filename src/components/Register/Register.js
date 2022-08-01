import React from "react";
import { Link } from "react-router-dom";
import './Register.css';
import { FormValidation } from '../../utils/validation.js';
import logo from '../../images/logo-big.svg';

function Register({ handleRegister }) {

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [name, setName] = useState('');

  // function handleEmailChange(e) {
  //   setEmail(e.target.value);
  // }

  // function handlePasswordChange(e) {
  //   setPassword(e.target.value);
  // }

  // function handleNameChange(e) {
  //   setName(e.target.value);
  // }

  // function onRegister(e) {
  //   e.preventDefaul();

  //   handleRegister(name, email, password);
  // }

  const { values, handleChange, errors, isValid } = FormValidation();

  function onRegister(e) {
  e.preventDefault();

  handleRegister(values.email, values.password, values.name);
  }

  console.info(`In Register ${JSON.stringify(errors)}`);
  console.info(`In Register ${JSON.stringify(values)}`);

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
          className={`register__input ${errors.name ? 'register__input_error' : ''}`}
          type="text"
          id="form__register-name"
          name="name"
          minLength="2"
          maxLength="30"
          onChange={handleChange}
          value={values.name || ''}
          required />
        <span 
          id="form__register-name-error"
          className={`register__error ${errors.name ? 'register__error_active' : ''}`}>
            {errors.name}
          </span>

        <label
          htmlFor="form__register-email"
          className="register__label">
            E-mail
        </label>
        <input
          className={`register__input ${errors.email ? 'register__input_error' : ''}`}
          type="email"
          id="form__register-email"
          name="email"
          onChange={handleChange}
          value={values.email || ''}
          required />
        <span
          id="form__register-email-error" 
          className={`register__error ${errors.email ? 'register__error_active' : ''}`}>
            {errors.email}
          </span>

        <label
          htmlFor="form__register-password"
          className="register__label">
            Пароль
        </label>
        <input
          className={`register__input ${errors.password ? 'register__input_error' : ''}`}
          type="password"
          id="form__register-password"
          name="password"
          minLength="2"
          maxLength="30"
          onChange={handleChange}
          value={values.password || ''}
          required />
        <span
          id="form__profile-description-error"
          className={`register__error ${errors.password ? 'register__error_active' : ''}`}>
            {errors.password}
          </span>

        <span className="form__error_onregister"></span>
        <button
          type="submit"
          className={`register__button ${!isValid ? 'register__button_disabled' : ''}`}
          disabled={!isValid}>
          Зарегистрироваться
        </button>

        <span className="register__text">Уже зарегистрированы?  <Link className="register__link" to="signin">Войти</Link></span>

      </form>
    </div>
  )
}

export default Register;