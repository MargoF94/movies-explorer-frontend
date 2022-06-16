import React from "react";
import { Link } from "react-router-dom";
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import './Movies.css';

function Movies() {
  return (
    <div className="movies">
      <Header isLoggedIn={true} />
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </div>
  )
}

export default Movies;