import React from "react";
import './Promo.css';
import landinglogo from '../../images/landing-logo.svg';

// компонент с вёрсткой баннера страницы «О проекте»

function Promo() {
  return (
    <div className="promo">
      <div className="promo__wrapper">
        <div className="promo__content">
          <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
          <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        </div>
        <img src={landinglogo} alt="logo" className="promo__landing-logo" />
      </div>
      <button className="promo__learn-more-button">Узнать больше</button>
    </div>
  )
};

export default Promo;