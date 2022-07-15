import React, { useContext, useState, useEffect } from "react";
import Header from '../Header/Header';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import './Profile.css';

function Profile({ onSubmit, onLogOut, isLoggedIn }) {

  const currentUser = useContext(CurrentUserContext);
  console.log(`Profile current user: ${currentUser}`);

  const [name, setName] = useState('')
  const [email, setEmail] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]); 

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleSubmit (e) {
    onSubmit(e);
      e.preventDefault();
      onSubmit(name, email)
  }

  return (
    <div className="profile">
      <Header isLoggedIn={isLoggedIn} />

      <form className="profile__form">

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
            type="text"
            onChange={handleNameChange}
            value={name || ""}
            required />
          <span
            id="profile__form-name-error"
            className="profile__input-error" />
        </div>

        <div className="profile__email-container">
          <label 
            className="profile__label"
            htmlFor="profile__form-email">
            E-mail
          </label>
          <input
            className="profile__input"
            id="profile__form-email"
            type="email"
            onChange={handleEmailChange}
            value={email || ""}
            required />
          <span
            id="profile__form-email-error"
            className="profile__input-error" />
        </div>

        <button
          className="profile_edit-button"
          type="submit"
          onClick={handleSubmit}>
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