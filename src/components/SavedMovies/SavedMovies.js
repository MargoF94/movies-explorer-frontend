import React from "react";
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import './SavedMovies.css';

function SavedMovies({ 
  movies,
  savedMovieSearchResult,
  areSavedMoviesFiltered,
  handleRemoveLike,
  onSearch,
  onSavedSearch,
  handleCheckboxToggle,
  setRender,
  isLoggedIn,
  isShortMovieChecked,
  isNoResults }) {
  
    console.log(`In '/saved-movies' savedMovies: ${movies}`);

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
          savedMovieSearchResult={savedMovieSearchResult}
          areSavedMoviesFiltered={areSavedMoviesFiltered}
          handleRemoveLike={handleRemoveLike}
          setRender={setRender}
          isLoggedIn={isLoggedIn}
          isNoResults={isNoResults} />
      <Footer />
    </div>
  )
}

export default SavedMovies;