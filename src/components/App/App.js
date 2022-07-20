import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Page404 from '../Page404/Page404';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import * as tooltip from '../../utils/tooltip';
import * as MainApi from '../../utils/MainApi';
import * as MoviesApi from '../../utils/MoviesApi';
import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {

  const history = useHistory();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [infoToolTipInfo, setInfoToolTipInfo] = useState({});
  const [movies, setMovies] = useState([]); // Фильмы, полученные от Api
  const [savedMovies, setSavedMovies] = useState([]); // Фильмы, сохраненные пользователем
  const [moviesToRender, setMoviesToRender] = useState([]);
  const [movieSearchResult, setMovieSearchResult] = useState([]);
  const [isShortMovieChecked, setIsShortMovieChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ЛОКАЛЬНОЕ ХРАНИЛИЩЕ

  // Фильмы, полученные после фильтрации
  // const searchResultLocalStorage = JSON.parse(localStorage.getItem('searchResults'));
  // Текст запроса
  const searchWordLocalStorage = localStorage.getItem('searchWord');
  // Состояние переключателя
  const filterStateLocatStorage = localStorage.getItem('filterState');

  // Обработка регистрации

  function handleRegister (name, email, password) {
    MainApi.register(email, password, name)
      .then((res) => {
        if (res.ok) {
          history.push('/signin');
          setInfoToolTipInfo({
            mesage: tooltip.registrationSuccess,
            image: tooltip.successIcon
          });
        } else {
          setInfoToolTipInfo({
            message: tooltip.registrationFail,
            image: tooltip.successIcon
          })
        }
      })
      .catch((err) => {
        console.log(err);
        setInfoToolTipInfo({
          message: tooltip.registrationFail,
          image: tooltip.failIcon
        });
      })
      .finally(() => {
        setIsInfoToolTipOpen(true);
      })
  }
  
  // Обработка логина

  function handleLogin (email, password) {
    if (!email || !password) {
      console.log('No email or password on login; aborting.');
      console.log(`Email: ${email}`);
      console.log(`Password: ${password}`);
      return;
    }
    
    MainApi.login(email, password)
      .then((data) => {
        if(!data.jwt) {
          throw new Error('Произошла ошибка (авторизации на фронте)');
        }
        localStorage.setItem('jwt', data.jwt);
        localStorage.setItem('searchResults', []);
        localStorage.setItem('filterState', false);
        localStorage.setItem('searchWord', '');
        return data._id;
      })
      .then((id) => {
        tokenCheck();
        setCurrentUser({
          _id: id,
        });
        setIsLoggedIn(true);
        history.push('/movies');
        setInfoToolTipInfo({
          message: tooltip.loginSuccess,
          image: tooltip.successIcon
        })
      })
      .catch((err) => {
        console.log(err);
        setInfoToolTipInfo({
          message: tooltip.loginFail,
          image: tooltip.failIcon
        });
      })
      .finally(() => {
        console.log(`Before Popup open: ${isLoggedIn}`)
        setIsInfoToolTipOpen(true);
      });
  }

  // Обработка обновления профиля

  function handleEditProfileSubmit (name, email) {
    MainApi.editProfile(name, email)
      .then((data) => {
        setCurrentUser(data);
        setInfoToolTipInfo({
          message: tooltip.updateSuccess,
          image: tooltip.successIcon
        })
      })
      .catch((err) => {
        console.log(err);
        setInfoToolTipInfo({
          message: tooltip.updateFail,
          image: tooltip.failIcon
        })
      })
      .finally(() => {
        setIsInfoToolTipOpen(true)
      });
  }

  function handleLogOut () {
    localStorage.removeItem('jwt');
    localStorage.removeItem('searcResults');
    localStorage.removeItem('searchWord');
    localStorage.removeItem('filterState');
    setIsLoggedIn(false);
    history.push('/signin');
  }

  function closePopups () {
    setIsInfoToolTipOpen(false);
  }

  // Добавить фильм в библиотеку сохраненных фильмов
  // или оповестить юзера об ошибке

  function handleSetLike(movie) {

    console.log(`In HandleSetLike: jwt: ${localStorage.getItem('jwt')}`);
    console.log(`In HandleSetLike: movie: ${movie}`);

    MainApi.createLocalCard(movie)
      .then((createdMovie) => {
        console.log(`Saved movie in handleSetLike: ${createdMovie}`);
        setSavedMovies([createdMovie, ...savedMovies])
      })
      .catch((err) => {
        console.log(err);
        setInfoToolTipInfo({
          message: tooltip.saveFail,
          image: tooltip.failIcon
        });
        setIsInfoToolTipOpen(true);
      })
  }

  function handleRemoveLike (movie) {
    MainApi.deleteLocalMovie(movie.movieId)
      .then(() => {
        MainApi.getSavedMovies
          .then((movies) => {
            setSavedMovies(movies);
          })
          .catch((err) => {
            console.log(err);
          })
      })
      .catch((err) => {
        console.log(err);
        setInfoToolTipInfo({
          message: tooltip.removeFail,
          image: tooltip.failIcon
        });
        setIsInfoToolTipOpen(true);
      })
  }

  // Переключатель состояния фильтра короткометражек
  function toggleCheckBox() {
    setIsShortMovieChecked(!isShortMovieChecked);
  }

  // Извлекает и записывает данные с локального хранилища в переменную состояния
  function getSearchResults() {
    const searchResults = JSON.parse(localStorage.getItem('searchResuts'));
    setMovieSearchResult(searchResults === null ? [] : searchResults );
  }

  // Функция по фильтрации массивов с фильмами по ключевому слову
  // и длительности

  function filterBySearchWord(list, word, isShortOn) {
    if (list.length > 0) {
      if (isShortOn) {
        return list.filter((movie) => movie.nameRU.toLowerCase().includes(word.toLowerCase()) && movie.duration < 40);
      } else {
        return list.filter((movie) => movie.nameRU.toLowerCase().includes(word.toLowerCase()));
      }
    } else {
      return [];
    }
  }

  function setRender() {
    const searchResultLocalStorage = localStorage.getItem('searchResults');
    if (location.pathname === '/movies') {
      if(searchResultLocalStorage.length === 0 || searchResultLocalStorage === null) {
        setMoviesToRender([]);
      } else {
        setMoviesToRender(JSON.parse(localStorage.getItem('searchResults')))
      }
    } else if (location.pathname === '/saved-movies') {
      if (savedMovies.length === 0 || savedMovies === null) {
        setMoviesToRender([]);
      } else {
        setMoviesToRender(savedMovies);
      }
    }
  }

  // При отображении фильмов в блоке результатов
  // фильмы, ранее сохраненные пользователем берутся с сервера
  // (так как только на них будет ярлык сохраненных));

  function handleSearchRequest(word) {
    // Проверяем все фильмы
    // Проверяем сохраненные фильмы

    const allFilteredMovies = filterBySearchWord(movies, word, isShortMovieChecked);
    const allSavedMovies = filterBySearchWord(savedMovies, word, isShortMovieChecked);

    // Сравниваем два массива,
    // повторяющиеся фильмы берем с серверной стороны
    const movieList = allFilteredMovies.map((movie) => {
      const savedMovie = allSavedMovies.find((savedM) => savedM.movieId === movie.id);
      return savedMovie ?? movie;
    })

    // Если результатов нет - записываем в переменную пустой массив
    if(movieList !== null && movieList.length !== 0) {
      localStorage.setItem('searchResults', JSON.stringify(movieList));
      getSearchResults();
      console.log(`handleSearchRequest: local storage is not empty!`);
    } else {
      localStorage.setItem('searchResults', []);
      getSearchResults();
    }
    setRender();
  }

  // Проверяем наличие токена в локальном хранилище
  // если токен присутствует - 
  // меняем состояние логина и
  // забираем данные о юзере с сервера и сохранем в переменную состояния. 

  function tokenCheck () {
    const jwt = localStorage.getItem('jwt');
    const savedMoviesFromStorage = (localStorage.getItem('searchResults') !== null && isLoggedIn) ?
      JSON.parse(localStorage.getItem('searchResults')) :
      [];

    console.log(`Token in tokenCheck: ${jwt}`);
    console.log(`Token in tokenCheck: idLoggedIn ${isLoggedIn}`);
    console.log(`22222 In getSearchResults: ${movieSearchResult}`);

    if (jwt) {
      MainApi.getContent(jwt)
        .then((user) => {
          if (user) {
            setIsLoggedIn(true);
            setCurrentUser(user);
            setMovieSearchResult(savedMoviesFromStorage);
            location.pathname === '/signin' ? 
              history.push('/movies') :
              history.push(location.pathname);
            console.log(`Token in tokenCheck: idLoggedIn ${isLoggedIn}`);

            console.log(`In tokenCheck: getContent currentUSer: ${currentUser}`);
            console.log(`In tokenCheck: getContent response: ${JSON.stringify(user)}`);
          } else {
            localStorage.removeItem('jwt');
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem('jwt');
        })
    }
  }

  // Если пользователь залогинен
  // получаем все фильмы с API и сохраненные юзером фильмы

  useEffect(() => {
    console.log(`Fetching movies...`);

    if(isLoggedIn) {
      Promise.all([
        MoviesApi.getMovies(),
        MainApi.getSavedMovies()
      ])
      .then(([allMovies, savedMovies]) => {
        console.log(`In MainApi.getSavedMovies: savedMovies: ${savedMovies}`);
        console.log(`In MainApi.getSavedMovies: savedMovies: ${Array.isArray(savedMovies)}`);
        setMovies(allMovies);
        if (savedMovies) {
          setSavedMovies(savedMovies);
        } else {
          setSavedMovies([]);
        }
      })
      .catch((err) => {
        console.log(err);
      })
    }    
  }, [isLoggedIn])

  // Проверяем токен при передвижению по сайту
  // Перезаписываем отфильтрованные фильмы в переменную состояния
  // из локального хранилища
  useEffect(() => {
    tokenCheck();
  }, [history]);

  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Main
              isLoggedIn={isLoggedIn} />
          </Route>

          <ProtectedRoute
            path="/movies"
            component={Movies}
            movies={movies}
            moviesToRender={moviesToRender}
            searchWord={searchWordLocalStorage}
            handleSetLike={handleSetLike}
            handleRemoveLike={handleRemoveLike}
            onSearch={handleSearchRequest}
            handleCheckboxToggle={toggleCheckBox}
            setRender={setRender}
            isLoggedIn={isLoggedIn}
            isShortMovieChecked={isShortMovieChecked} />

          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            moviesToRender={moviesToRender}
            handleRemoveLike={handleRemoveLike}
            onSearch={handleSearchRequest}
            handleCheckboxToggle={toggleCheckBox}
            setRender={setRender}
            isLoggedIn={isLoggedIn}
            isShortMovieChecked={isShortMovieChecked} />

          <ProtectedRoute
            path="/profile"
            component={Profile}
            onSubmit={handleEditProfileSubmit}
            onLogOut={handleLogOut}
            isLoggedIn={isLoggedIn} />

          <Route path="/signin">
            <Login
              handleLogin={handleLogin} />
          </Route>

          <Route path="/signup">
            <Register
              handleRegister={handleRegister} />
          </Route>

          <Route path="*">
            <Page404 />
          </Route>
        </Switch>

        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          onClose={closePopups}
          info={infoToolTipInfo} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;