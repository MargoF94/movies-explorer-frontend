import React from "react";
import './Promo.css';
import landinglogo from '../../images/landing-logo.svg';

// компонент с вёрсткой баннера страницы «О проекте»

function Promo() {
  return (
    <div className="promo">
      <div className="promo__wrapper">
        <div className="promo__content">
          <h1 className="promo__title">My web development graduation project</h1>
          <p className="promo__subtitle">Scroll down to find out more about the project.</p>
        </div>
        <img src={landinglogo} alt="logo" className="promo__landing-logo" />
      </div>
      <button className="promo__learn-more-button">Learn more</button>
    </div>
  )
};

export default Promo;