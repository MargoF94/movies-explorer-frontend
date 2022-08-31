import React from "react";
import './MoviesCard.css';
import saved from '../../images/icon_saved.svg';
import unsaved from '../../images/unsave-icon.svg';
import { useLocation } from "react-router";

function MoviesCard({ movie, savedMovies, handleSetLike, handleRemoveLike }) {

  const route = useLocation().pathname;
  let isSaved;

  function getIsSaved () {
    if (route === '/movies') {

      // если id данной карточки соответствует id одной из сохраненных карточек
      // задать значение isSaved - true
      // если нет - false

      const isMovieSaved = savedMovies.filter(item => item.movieId === movie.id);
      isSaved = isMovieSaved.length > 0 ? true : false;
    } else if (route === '/saved-movies') {
      isSaved = true;
      }
    }

    getIsSaved();

  const onLike = () => {

    console.log('A movie has been liked!');
    console.log(movie);
    handleSetLike(movie);
  };

  const onDislike = () => {
    console.log('A movie has been disliked!');
    if (route === '/movies') {
      const movieToDelete = savedMovies.find(m => m.movieId === movie.id);
      console.log(movieToDelete);
      console.log(movieToDelete.movieId);
      handleRemoveLike(movieToDelete);
    } else {
      handleRemoveLike(movie);
    }
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

  const formatMovieDuration = () => {
    const duration = movie.duration;
    const hours = Math.floor(duration / 60); // часы
    const mins = duration - hours * 60; // оставшиеся минуты
    return`${hours > 0 ? hours + 'ч ' : ''}${mins > 0 ? mins + 'м' : ''}`;
  }

  return (
    <div className="card">
      <div className="card__info">
        <h3 className="card__title">{ movie.nameEN }</h3>
        <span className="card__duration">{ formatMovieDuration() }</span>
      </div>
      <a
        className="card__image-link"
        href={ movie.trailerLink }
        target="_blank"
        rel="noreferrer">
        <img
          className="card__image"
          src={ route === '/movies' ? `https://api.nomoreparties.co${movie.image.url}` : movie.image }
          alt={ movie.nameEN } />
      </a>
      <button
        className={ className }
        onClick={isSaved === true ? onDislike : onLike}>
        { buttonSymbol() }
      </button>
    </div>
  )
}

export default MoviesCard;