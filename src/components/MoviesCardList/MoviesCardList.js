import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesList({ movieSearchResult, savedMovies, handleSetLike, handleRemoveLike, isLoggedIn }) {
  
  const [moviesToRender, setMoviesToRender] = useState('');

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/movies') {
      const searchResultLocalStorage = localStorage.getItem('searchResults');
      if(searchResultLocalStorage.length === 0 || searchResultLocalStorage === null) {
        setMoviesToRender([]);
      } else {
        setMoviesToRender(JSON.parse(localStorage.getItem('searchResults')))
      }
    } else if (location.pathname === '/saved-movies') {
      if (savedMovies.length === 0 || savedMovies === null) {
        setMoviesToRender([]);
      } else {
        setMoviesToRender(savedMovies);
      }
    }
  }, []);

  return (
    <div className="movies-list">
      <div className="movies-list__container">
        {
          moviesToRender.length > 0 &&
          moviesToRender.map((movie) => {
            return <MoviesCard
              key={movie.movieId || movie._id}
              movie={movie}
              handleSetLike={handleSetLike}
              handleRemoveLike={handleRemoveLike} />
          })
        }
      </div>

      <button 
        className="movies-list__button-more">
        Ещё
      </button>
    </div>
    
  )
}

export default MoviesList;