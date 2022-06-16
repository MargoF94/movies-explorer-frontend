import React from "react";
import { Link } from "react-router-dom";
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import moviecard01 from '../../images/moviecard01.svg';
import moviecard02 from '../../images/moviecard02.svg';
import moviecard03 from '../../images/moviecard03.svg';
import moviecard04 from '../../images/moviecard04.svg';
import moviecard05 from '../../images/moviecard05.svg';
import moviecard06 from '../../images/moviecard06.svg';
import moviecard07 from '../../images/moviecard07.svg';
import moviecard08 from '../../images/moviecard08.svg';
import moviecard09 from '../../images/moviecard09.svg';
import moviecard10 from '../../images/moviecard10.svg';
import moviecard11 from '../../images/moviecard11.svg';
import moviecard12 from '../../images/moviecard12.svg';

function MoviesList() {

  return (
    <div className="movies-list">
      <div className="movies-list__container">
        <MoviesCard
          name="В погоне за Бенкси"
          duration="27 минут"
          image={moviecard01}
          trailerLink="https://www.kinopoisk.ru/film/1390163/video/type/0/"
          isSaved={true} />

        <MoviesCard
          name="В погоне за Бенкси"
          duration="27 минут"
          image={moviecard02}
          trailerLink="https://www.kinopoisk.ru/film/1390163/video/type/0/"
          isSaved={true} />

        <MoviesCard
          name="В погоне за Бенкси"
          duration="27 минут"
          image={moviecard03}
          trailerLink="https://www.kinopoisk.ru/film/1390163/video/type/0/"
          isSaved={false} />

        <MoviesCard
          name="В погоне за Бенкси"
          duration="27 минут"
          image={moviecard04}
          trailerLink="https://www.kinopoisk.ru/film/1390163/video/type/0/"
          isSaved={false} />

        <MoviesCard
          name="В погоне за Бенкси"
          duration="27 минут"
          image={moviecard05}
          trailerLink="https://www.kinopoisk.ru/film/1390163/video/type/0/"
          isSaved={true} />

        <MoviesCard
          name="В погоне за Бенкси"
          duration="27 минут"
          image={moviecard06}
          trailerLink="https://www.kinopoisk.ru/film/1390163/video/type/0/"
          isSaved={false} />

        <MoviesCard
          name="В погоне за Бенкси"
          duration="27 минут"
          image={moviecard07}
          trailerLink="https://www.kinopoisk.ru/film/1390163/video/type/0/"
          isSaved={true} />

        <MoviesCard
          name="В погоне за Бенкси"
          duration="27 минут"
          image={moviecard08}
          trailerLink="https://www.kinopoisk.ru/film/1390163/video/type/0/"
          isSaved={true} />

        <MoviesCard
          name="В погоне за Бенкси"
          duration="27 минут"
          image={moviecard09}
          trailerLink="https://www.kinopoisk.ru/film/1390163/video/type/0/"
          isSaved={false} />

        <MoviesCard
          name="В погоне за Бенкси"
          duration="27 минут"
          image={moviecard10}
          trailerLink="https://www.kinopoisk.ru/film/1390163/video/type/0/"
          isSaved={false} />

        <MoviesCard
          name="В погоне за Бенкси"
          duration="27 минут"
          image={moviecard11}
          trailerLink="https://www.kinopoisk.ru/film/1390163/video/type/0/"
          isSaved={false} />

        <MoviesCard
          name="В погоне за Бенкси"
          duration="27 минут"
          image={moviecard12}
          trailerLink="https://www.kinopoisk.ru/film/1390163/video/type/0/"
          isSaved={false} />
      </div>

      <button 
        className="movies-list__button-more">
        Ещё
      </button>
    </div>
    
  )
}

export default MoviesList;