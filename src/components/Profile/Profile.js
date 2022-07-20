import React, { useContext, useState, useEffect } from "react";
import Header from '../Header/Header';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { FormValidation } from '../../utils/validation.js';
import './Profile.css';

function Profile({ onSubmit, onLogOut, isLoggedIn }) {

  const currentUser = useContext(CurrentUserContext);
  console.log(`Profile current user: ${currentUser}`);

  const { values, handleChange, errors, isValid, setValues } = FormValidation();

  // const [name, setName] = useState('')
  // const [email, setEmail] = useState('');

  // useEffect(() => {
  //   setName(currentUser.name);
  //   setEmail(currentUser.email);
  // }, [currentUser]); 

  // function handleNameChange(e) {
  //   setName(e.target.value);
  // }

  // function handleEmailChange(e) {
  //   setEmail(e.target.value);
  // }

  function handleSubmit (e) {
    e.preventDefault();
    onSubmit(values.name, values.email);
  }

  useEffect(() => {
    setValues(currentUser)
  }, [])

  return (
    <div className="profile">
      <Header isLoggedIn={isLoggedIn} />

      <form 
        className="profile__form"
        onSubmit={handleSubmit}>

        <h1 className="profile__title">
          {`Привет, ${currentUser.name}!`}
        </h1>

        <div className="profile__name-container">
          <label 
            className="profile__label"
            htmlFor="profile__form-name">
            Имя
          </label>
          <input
            className="profile__input"
            id="profile__form-name"
            name="name"
            type="text"
            minLength="2"
            maxLength="30"
            onChange={handleChange}
            value={values.name || ''}
            required />
        </div>

        <span
            id="profile__form-name-error"
            className={`profile__error ${errors.name ? 'profile__error_active' : ''}`} >
            {errors.name}
          </span>

        <div className="profile__email-container">
          <label 
            className="profile__label"
            htmlFor="profile__form-email">
            E-mail
          </label>
          <input
            className="profile__input"
            id="profile__form-email"
            name="email"
            type="email"
            onChange={handleChange}
            value={values.email || ''}
            required />
        </div>

        <span
            id="profile__form-email-error"
            className={`profile__error ${errors.email ? 'profile__error_active' : ''}`} >
            {errors.email}
          </span>

        <button
          className={`profile_edit-button ${!isValid ? 'profile_edit-button_disabled' : ''}`}
          type="submit"
          disabled={!isValid} >
          Редактировать
        </button>
        <button
          className="profile_logout-button"
          type="submit"
          onClick={onLogOut}>
          Выйти из аккаунта
        </button>

      </form>
    </div>
  )
}

export default Profile;