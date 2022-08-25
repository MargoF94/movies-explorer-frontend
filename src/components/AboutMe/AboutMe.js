import React from "react";
import './AboutMe.css';
import Portfolio from '../Portfolio/Portfolio';
import photo from '../../images/profile.jpg';

function AboutMe() {
  return (
    <div className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__info">
        <div className="about-me__text-info">
          <h3 className="about-me__subtitle">Маргарита</h3>
          <p className="about-me__description">Фронтенд-разработчик, 28 лет</p>
          <p className="about-me__text">Родилась и выросла в Челябинске, закончила факультет регионоведения по направлению Япония в Челябинском Государственном университете. Сейчас живу и работаю в Токио. В свободное время люблю читать книги, смтореть что-нибудь приключенческое и баловаться кальяном. С детства интересовалась компьютерами и всемирной сетью. В один момент решила попробовать себя в веб-дизайне, что и привело меня на кусы Яндекс.Практикум.</p>
        </div>
        <div className="about-me__links-info">
          <a
            href="https://vk.com/localmoyashi"
            className="link about-me__link"
            target="_blank"
            rel="noreferrer">VK.com</a>
          <a 
            href="https://github.com/MargoF94"
            className="link about-me__link"
            target="_blank"
            rel="noreferrer">Github</a>
        </div>
        </div>
        <div className="about-me__photo-container">
          <img 
            className="about-me__profile-photo"
            src={photo}
            alt="Моё фото" />
        </div>
      </div>
      <Portfolio />
    </div>
  )
}

export default AboutMe;