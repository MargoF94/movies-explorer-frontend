import React from "react";
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import './SavedMovies.css';

function SavedMovies({ 
  movies,
  moviesToRender,
  handleRemoveLike,
  onSearch,
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
        moviesToRender={moviesToRender}
        onSearch={onSearch}
        handleCheckboxToggle={handleCheckboxToggle}
        isShortMovieChecked={isShortMovieChecked} />
      <MoviesCardList
          movies={movies}
          moviesToRender={moviesToRender}
          onDislike={handleRemoveLike}
          setRender={setRender}
          isLoggedIn={isLoggedIn}
          isNoResults={isNoResults} />
      <Footer />
    </div>
  )
}

export default SavedMovies;