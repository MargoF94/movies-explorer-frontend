import React from "react";
import './InfoTooltip.css';
import statusLogo from '../../images/popup-success.svg';

function InfoTooltip({ onClose, isOpen, image, message }) {
  return (
    <div className={`popup ${ isOpen ? 'popup_opened' : '' }`}>
      <div className="popup__container">
        <button type="button" className="button popup__button-close"></button>
        <img
          className='popup__image'
          // src={ image }
          src={ statusLogo }
          alt="Иконка статуса" />
        <h2 className="popup__title popup__title_tooltip ">{ message } Вы успешно зарегистрировались!</h2>
      </div>
    </div>
  )
}

export default InfoTooltip;