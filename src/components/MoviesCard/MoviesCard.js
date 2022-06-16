import React from "react";
import './MoviesCard.css';
import saved from '../../images/icon_saved.svg';
import unsave from '../../images/unsave-icon.svg';

function MoviesCard({ name, duration, image, trailerLink, isSaved, isSavedPage = false }) {

  const className = (
    `card__button ${ (isSaved && !isSavedPage) && 'card__button-saved' } ${ isSavedPage && 'card__button-unsave' } ${!isSaved && 'card__button-nonsaved'}`
  )

  const buttonSymbol = (
    isSavedPage ? <img src={unsave} alt="крестик" /> : <img src={saved} alt="галочка" />
  )

  const buttonText = (
    isSaved ? buttonSymbol : 'Сохранить'
  )

  return (
    <div className="card">
      <div className="card__info">
        <h3 className="card__title">{ name }</h3>
        <span className="card__duration">{ duration }</span>
      </div>
      <a
        className="card__image-link"
        href={ trailerLink }
        target="_blank"
        rel="noreferrer">
        <img
          className="card__image"
          src={ image }
          alt={ name } />
      </a>
      <button
        className={ className }>
        { buttonText }
      </button>
    </div>
  )
}

export default MoviesCard;