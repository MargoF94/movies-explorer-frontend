import React from "react";
import './Portfolio.css';

function Portfolio() {
  return (
    <div className="portfolio">
      <h3 className="portfolio__title">Portfolio</h3>
      <ul className="portfolio__container">
        <li className="portfolio__link-container">
          <a
            className="portfolio__link"
            href="https://margof94.github.io/russian-travel/"
            target="_blank"
            rel="noreferrer">
            <span className="portfolio__link-description">Static website</span>
            <span className="portfolio__link-icon" />
          </a>
        </li>
        
        <li className="portfolio__link-container">
          <a
            className="portfolio__link" 
            href="https://margof94.github.io/russian-travel/"
            target="_blank"
            rel="noreferrer">
            <span className="portfolio__link-description">Adaptive website</span>
            <span className="portfolio__link-icon" />
          </a>
        </li>

        <li className="portfolio__link-container">
          <a
            className="portfolio__link"
            href="https://local-mesto.nomoredomains.xyz/"
            target="_blank"
            rel="noreferrer">
            <span className="portfolio__link-description">One-page application</span>
            <span className="portfolio__link-icon" />
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Portfolio;