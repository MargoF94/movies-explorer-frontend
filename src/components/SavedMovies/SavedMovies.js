import React from "react";
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import './SavedMovies.css';

function SavedMovies({ savedMovies, handleRemoveLike, onSearch, isLoggedIn }) {
  
  return (
    <div className="movies">
      <Header isLoggedIn={isLoggedIn} />
      <SearchForm
        savedMovies={savedMovies}
        movies={savedMovies}
        onSearch={onSearch} />
      <MoviesCardList
          savedMovies={savedMovies}
          onDislike={handleRemoveLike}
          isLoggedIn={isLoggedIn} />
      <Footer />
    </div>
  )
}

export default SavedMovies;