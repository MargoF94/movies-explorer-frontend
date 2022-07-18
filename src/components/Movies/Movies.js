import React from "react";
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import './Movies.css';

function Movies({ movies, movieSearchResult, searchWord, handleSetLike, handleRemoveLike, onSearch, handleCheckboxToggle, isLoggedIn }) {
  
  return (
    <div className="movies">
      <Header isLoggedIn={isLoggedIn} />
      <SearchForm
        movies={movies}
        onSearch={onSearch}
        handleCheckboxToggle={handleCheckboxToggle} />
        <MoviesCardList
          movieSearchResult={movieSearchResult}
          handleSetLike={handleSetLike}
          onDislike={handleRemoveLike}
          isLoggedIn={isLoggedIn} />
      <Footer />
    </div>
  )
}

export default Movies;