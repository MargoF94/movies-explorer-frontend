import React from "react";
import { Link } from "react-router-dom";
import Header from '../Header/Header';
import './Profile.css';

function Profile() {
  return (
    <div className="profile">
      <Header isLoggedIn={true} />

      <form className="profile__form">

        <h1 className="profile__title">
          Привет, Маргарита!
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
            placeholder="Маргарита"
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
            placeholder="pochta@yandex.ru"
            required />
          <span
            id="profile__form-email-error"
            className="profile__input-error" />
        </div>

        <button
          className="profile_edit-button"
          type="submit">
          Редактировать
        </button>
        <button
          className="profile_logout-button"
          type="submit">
          Выйти из аккаунта
        </button>

      </form>
    </div>
  )
}

export default Profile;