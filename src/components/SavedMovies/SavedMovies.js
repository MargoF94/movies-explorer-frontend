import React from "react";
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCard from '../MoviesCard/MoviesCard';
import Footer from '../Footer/Footer';
import './SavedMovies.css';
import moviecard01 from '../../images/moviecard01.svg';
import moviecard02 from '../../images/moviecard02.svg';
import moviecard05 from '../../images/moviecard05.svg';
import moviecard07 from '../../images/moviecard07.svg';
import moviecard08 from '../../images/moviecard08.svg';

function SavedMovies() {
  return (
    <div className="movies">
      <Header isLoggedIn={true} />
      <SearchForm />
      <div className="saved-movies">
        <MoviesCard
          name="В погоне за Бенкси"
          duration="27мин"
          image={moviecard01}
          trailerLink="https://www.kinopoisk.ru/film/1390163/video/type/0/"
          isSaved={true}
          isSavedPage={true} />

        <MoviesCard
          name="В погоне за Бенкси"
          duration="27мин"
          image={moviecard02}
          trailerLink="https://www.kinopoisk.ru/film/1390163/video/type/0/"
          isSaved={true}
          isSavedPage={true} />

        <MoviesCard
          name="В погоне за Бенкси"
          duration="27мин"
          image={moviecard05}
          trailerLink="https://www.kinopoisk.ru/film/1390163/video/type/0/"
          isSaved={true}
          isSavedPage={true} />

        <MoviesCard
          name="В погоне за Бенкси"
          duration="27мин"
          image={moviecard07}
          trailerLink="https://www.kinopoisk.ru/film/1390163/video/type/0/"
          isSaved={true}
          isSavedPage={true} />

        <MoviesCard
          name="В погоне за Бенкси"
          duration="27мин"
          image={moviecard08}
          trailerLink="https://www.kinopoisk.ru/film/1390163/video/type/0/"
          isSaved={true}
          isSavedPage={true} />
      </div>
      <Footer />
    </div>
  )
}

export default SavedMovies;