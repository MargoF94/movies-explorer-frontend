import React, { useContext } from "react";
import './MoviesCard.css';
import saved from '../../images/icon_saved.svg';
import unsaved from '../../images/unsave-icon.svg';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useLocation } from "react-router";

function MoviesCard({ movie, handleSetLike, handleRemoveLike }) {

  const currentUser = useContext(CurrentUserContext);
  const isSaved = movie.owner === currentUser._id;
  const route = useLocation().pathname;

  const onLike = () => {
    handleSetLike(movie);
  };

  const onDislike = () => {
    handleRemoveLike(movie);
  }

  const className = (
    `card__button ${ (isSaved && route === '/movies') && 'card__button-saved' } ${ route === '/saved-movies' && 'card__button-unsave' } ${!isSaved && 'card__button-nonsaved'}`
  )
  
  const buttonSymbol = () => {
    if (isSaved && route === '/movies') {
      return (<img src={saved} alt="галочка" />);
    } else if (route === '/saved-movies') {
      return (<img src={unsaved} alt="крестик" />);
    } else {
      return ('Сохранить');
    }
  }

  const thumbnail = route === '/movies' ? 
    `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}` :
    `https://api.nomoreparties.co${movie.thumbnail}`;

  const transformDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const mins = duration - hours * 60;
    return`${hours > 0 ? hours + 'ч ' : ''}${!mins === 0 ? mins + 'м' : ''}`;
  }

  return (
    <div className="card">
      <div className="card__info">
        <h3 className="card__title">{ movie.nameRU }</h3>
        <span className="card__duration">{ transformDuration(movie.duration) }</span>
      </div>
      <a
        className="card__image-link"
        href={ movie.trailerLink }
        target="_blank"
        rel="noreferrer">
        <img
          className="card__image"
          src={ thumbnail }
          alt={ movie.nameRU } />
      </a>
      <button
        className={ className }
        onClick={isSaved ? onDislike : onLike}>
        { buttonSymbol() }
      </button>
    </div>
  )
}

export default MoviesCard;