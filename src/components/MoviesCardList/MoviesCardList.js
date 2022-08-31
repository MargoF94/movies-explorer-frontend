import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesList({
  movies,
  savedMovies,
  savedMovieSearchResult,
  areSavedMoviesFiltered,
  handleSetLike,
  handleRemoveLike,
  isNoResults,
  resetAreSavedMoviesFiltered
  }) {

    console.log(movies);
  
  // const [moviesList, setMoviesList] = useState(movies); 

  // function getMoviesToRender () {
  //   if (route === '/movies') return movies;
  //   else if (route === 'saved-movies') return areSavedMoviesFiltered ? savedMovieSearchResult : movies;
  // }

  const getNumberOfMoviesToRender = () => {
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
  const [count, setCount] = useState(getNumberOfMoviesToRender);
  // const [moviesToRender, setMoviesToRender] = useState([]);
  const route = useLocation().pathname;

  const addMoreMoviesOnClick = () => {
    const windowWidth = window.innerWidth;

    if (windowWidth < 1280) {
      setCount(count + 2)
    } else {
      setCount(count + 3)
    }
  };

  const moviesToRender = movies.slice(0, count);

  useEffect(() => {
    window.addEventListener('resize', getNumberOfMoviesToRender);
    console.log(movies);
    console.log('MOUNTED');

    return () => {
      route === '/saved-movies' && resetAreSavedMoviesFiltered();
      localStorage.setItem('filterStateInSaved', false);
    }
  }, []);

  return (
    <div className="movies-list">
      { isNoResults && <p className="movies-list__not-found">Nothing found</p> }
      <div className="movies-list__container">
        {
          moviesToRender.length > 0 &&
          moviesToRender.map((movie) => {
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
        className={`movies-list__button-more ${count >= movies.length && 'movies-list__button-more_disabled'} ${route === '/saved-movies' && 'movies-list__button-more_invisible'} ${ moviesToRender.length === 0 && 'movies-list__button-more_invisible'} ${count >= movies.length && 'movies-list__button-more_invisible'}`}
        onClick={addMoreMoviesOnClick}>
        More
      </button>
    </div>
    
  )
}

export default MoviesList;