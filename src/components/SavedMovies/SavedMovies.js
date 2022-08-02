import React, { useEffect } from "react";
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import './SavedMovies.css';

function SavedMovies({ 
  movies,
  savedMovies,
  savedMovieSearchResult,
  setSavedMovieSearchResult,
  areSavedMoviesFiltered,
  handleRemoveLike,
  onSearch,
  onSavedSearch,
  handleCheckboxToggle,
  setRender,
  isLoggedIn,
  isShortMovieChecked,
  isNoResults,
  resetAreSavedMoviesFiltered }) {

  return (
    <div className="movies">
      <Header isLoggedIn={isLoggedIn} />
      <SearchForm
        onSearch={onSearch}
        onSavedSearch={onSavedSearch}
        handleCheckboxToggle={handleCheckboxToggle}
        isShortMovieChecked={isShortMovieChecked} />
      <MoviesCardList
          movies={movies}
          savedMovies={savedMovies}
          savedMovieSearchResult={savedMovieSearchResult}
          areSavedMoviesFiltered={areSavedMoviesFiltered}
          handleRemoveLike={handleRemoveLike}
          setRender={setRender}
          isLoggedIn={isLoggedIn}
          isNoResults={isNoResults}
          resetAreSavedMoviesFiltered={resetAreSavedMoviesFiltered} />
      <Footer />
    </div>
  )
}

export default SavedMovies;