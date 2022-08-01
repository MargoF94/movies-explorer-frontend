import React, { useContext, useEffect, useState } from "react";
import './MoviesCard.css';
import saved from '../../images/icon_saved.svg';
import unsaved from '../../images/unsave-icon.svg';
// import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useLocation } from "react-router";

function MoviesCard({ movie, movies, savedMovies, handleSetLike, handleRemoveLike }) {

  // const currentUser = useContext(CurrentUserContext);
  const route = useLocation().pathname;
  let isSaved;

  function getIsSaved () {
    if (route === '/movies') {

      // если id данной карточки соответствует id одной из сохраненных карточек
      // задать значение isSaved - true
      // если нет - false

      // console.log(savedMovies);
      const isMovieSaved = savedMovies.filter(item => item.movieId === movie.id);
      // console.log(isMovieSaved);
      isSaved = isMovieSaved.length > 0 ? true : false;
      // console.log(isSaved)
    } else if (route === '/saved-movies') {
      isSaved = true;
      }
    }

    getIsSaved();
  // const [isSaved, setIsSaved] = useState(() => {
  //   getIsSaved();
  // });

  // console.log(movie.image.url, isSaved);
  // console.log(movie.image, isSaved);

  
  // const isSaved = movie.owner ? true :  false;

  // function getIsSaved() {
  //   return movie.owner === currentUser._id ? true :  false;
  // }

    // Если id хотя бя какого-либо фильма совпадает с сохраненным фильмом
    // устанавливаем isSaved на true для отображения нужного состояния иконки лайка
    // if(location === 'movies') {
    //   const isSaved = savedMovies.filter((item) => item.movieId === (movie.movieId || movie.id) ).length > 0 ?
    //   true : false;
    // } else {
    //   const isSaved = savedMovies.filter((item) => item.movieId === (movie.movieId || movie.id) ).length > 0 ?
    //   true : false;
    // }
  
    // const isSaved = movies.filter((item) => item.movieId === (movie.movieId || movie.id) ).length > 0 ?
    // true : false;

  // const isSaved = movie.id ? false : true;

  // useEffect(() => {
  //   getIsSaved();
  // }, [savedMovies]);

  // const isSaved = movie.
  // console.log(`Is this movie saved? ${isSaved}`);
  

  const onLike = () => {
    // if (route === movies) {
    //   han
    // }
    console.log('A movie has been liked!');
    console.log(movie);
    handleSetLike(movie);
    // setIsSaved(true)
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
    
    // setIsSaved(false)
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

  // console.log(`saved movie image: ${JSON.stringify(movie.image)}`);
  // console.log(`movie image: ${movie.image.url}`);

  // const image = isSaved ? movie.image : `https://api.nomoreparties.co${movie.image.url}`;

  const transformDuration = () => {
    const duration = movie.duration;
    const hours = Math.floor(duration / 60); // часы
    const mins = duration - hours * 60; // оставшиеся минуты
    return`${hours > 0 ? hours + 'ч ' : ''}${mins > 0 ? mins + 'м' : ''}`;
  }

  // const image = location === ''

  // useEffect(() => {
  //   getIsSaved();
  // });

  return (
    <div className="card">
      <div className="card__info">
        <h3 className="card__title">{ movie.nameRU }</h3>
        <span className="card__duration">{ transformDuration() }</span>
      </div>
      <a
        className="card__image-link"
        href={ movie.trailerLink }
        target="_blank"
        rel="noreferrer">
        <img
          className="card__image"
          src={ route === '/movies' ? `https://api.nomoreparties.co${movie.image.url}` : movie.image }
          alt={ movie.nameRU } />
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