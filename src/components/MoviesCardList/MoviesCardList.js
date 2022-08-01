import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesList({
  movies,
  savedMovies,
  handleSetLike,
  handleRemoveLike,
  isNoResults,
  }) {

  const getMoviesToDisplay = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth > 1279) {
      return 12;
    } else if (windowWidth >= 768) {
      return 8;
    } else {
      return 4;
    }
  };

  // Кол-во отрендереных фильмов по умолчанию
  const [count, setCount] = useState(getMoviesToDisplay);
  const route = useLocation().pathname;
  console.log(route);

  const addMoreMovies = () => {
    const windowWidth = window.innerWidth;

    if (windowWidth < 1280) {
      setCount(count + 2)
    } else {
      setCount(count + 3)
    }
  };

  const displayedMovies = movies.slice(0, count);

  useEffect(() => {
    window.addEventListener('resize', getMoviesToDisplay);
    console.log(movies); 
  }, []);

  return (
    <div className="movies-list">
      { isNoResults && <p className="movies-list__not-found">Ничего не найдено</p> }
      <div className="movies-list__container">
        {
          displayedMovies.length > 0 &&
          displayedMovies.map((movie) => {
            return <MoviesCard
              key={movie.movieId || movie.id || movie._id}
              movie={movie}
              movies={movies}
              savedMovies={savedMovies}
              handleSetLike={handleSetLike}
              handleRemoveLike={handleRemoveLike} />
          })
        }
      </div>

      <button 
        className={`movies-list__button-more ${count >= movies.length && 'movies-list__button-more_disabled'} ${route === '/saved-movies' && 'movies-list__button-more_invisible'}`}
        onClick={addMoreMovies}
        disabled={count >= movies.length}>
        Ещё
      </button>
    </div>
    
  )
}

export default MoviesList;