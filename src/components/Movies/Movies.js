import React from "react";
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from "../Preloader/Preloader";
import './Movies.css';

function Movies({ 
  movies,
  savedMovies,
  handleSetLike,
  handleRemoveLike,
  onSearch,
  handleCheckboxToggle,
  setRender,
  isLoggedIn,
  isShortMovieChecked,
  isNoResults,
  isLoading }) {
  
  return (
    <div className="movies">
      <Header isLoggedIn={isLoggedIn} />
      <SearchForm
        onSearch={onSearch}
        handleCheckboxToggle={handleCheckboxToggle}
        isShortMovieChecked={isShortMovieChecked} />
      <Preloader 
        isLoading={isLoading}
      />
      <MoviesCardList
        movies={movies}
        savedMovies={savedMovies}
        handleSetLike={handleSetLike}
        handleRemoveLike={handleRemoveLike}
        setRender={setRender}
        isNoResults={isNoResults}
        isLoggedIn={isLoggedIn} />
      <Footer />
    </div>
  )
}

export default Movies;