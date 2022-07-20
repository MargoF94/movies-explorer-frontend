import React from "react";
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import './SavedMovies.css';

function SavedMovies({ 
  moviesToRender,
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
        moviesToRender={moviesToRender}
        onSearch={onSearch}
        handleCheckboxToggle={handleCheckboxToggle}
        isShortMovieChecked={isShortMovieChecked} />
      <MoviesCardList
          moviesToRender={moviesToRender}
          onDislike={handleRemoveLike}
          setRender={setRender}
          isLoggedIn={isLoggedIn} />
      <Footer />
    </div>
  )
}

export default SavedMovies;