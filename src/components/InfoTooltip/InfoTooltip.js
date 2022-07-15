import React from "react";
import './InfoTooltip.css';

function InfoTooltip({ isOpen, onClose, info }) {
  return (
    <div className={`popup ${ isOpen ? 'popup_opened' : '' }`}>
      <div className="popup__container">
        <button 
          type="button" 
          className="button popup__button-close"
          onClick={onClose} />
        <img
          className='popup__image'
          src={ info.image }
          alt="Иконка статуса" />
        <h2 className="popup__title popup__title_tooltip ">{ info.message }</h2>
      </div>
    </div>
  )
}

export default InfoTooltip;