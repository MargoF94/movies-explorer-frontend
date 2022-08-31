import React from "react";
import './Footer.css';

function Footer() {
  return (
    <div className="footer">
      <p className="footer__text">
        Yandex.Practicum х BeatFilm.
      </p>
      <div className="footer__container">
        <p className="footer__year">
          &copy; 2022
        </p>
        <ul className="footer__links">
          <a
            href="https://practicum.yandex.ru/"
            className="footer__link"
            target="_blank"
            rel="noreferrer">Yandex.Practicum</a>
          <a
            href="https://github.com/MargoF94"
            className="footer__link"
            target="_blank"
            rel="noreferrer">Github</a>
          <a
            href="https://vk.com/localmoyashi"
            className="footer__link"
            target="_blank"
            rel="noreferrer">VK.com</a>  
        </ul>
      </div>
    </div>
  )
}

export default Footer;