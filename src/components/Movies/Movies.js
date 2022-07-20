import React from "react";
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import './Movies.css';

function Movies({ 
  movies,
  moviesToRender,
  handleSetLike,
  handleRemoveLike,
  onSearch,
  handleCheckboxToggle,
  setRender,
  isLoggedIn,
  isShortMovieChecked }) {
  
  return (
    <div className="movies">
      <Header isLoggedIn={isLoggedIn} />
      <SearchForm
        movies={movies}
        onSearch={onSearch}
        handleCheckboxToggle={handleCheckboxToggle}
        isShortMovieChecked={isShortMovieChecked} />
        <MoviesCardList
          moviesToRender={moviesToRender}
          handleSetLike={handleSetLike}
          onDislike={handleRemoveLike}
          setRender={setRender} />
      <Footer />
    </div>
  )
}

export default Movies;