import React, { useEffect, useState } from "react";
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesList({ 
  moviesToRender,
  handleSetLike,
  handleRemoveLike,
  setRender
  }) {

  useEffect(() => {
    setRender();
  }, [])

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