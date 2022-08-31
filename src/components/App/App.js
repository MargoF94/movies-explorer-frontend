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
  const [movieSearchResult, setMovieSearchResult] = useState([]);
  const [savedMovieSearchResult, setSavedMovieSearchResult] = useState([]);
  const [isShortMovieChecked, setIsShortMovieChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isNoResults, setIsNoResuls] = useState(false);
  const [areSavedMoviesFiltered, setAreSavedMoviesFiltered] = useState(false);

  // ЛОКАЛЬНОЕ ХРАНИЛИЩЕ

  // Текст запроса
  const searchWordLocalStorage = localStorage.getItem('searchWord');

  // Обработка регистрации

  function handleRegister (email, password, name) {
    MainApi.register(email, password, name)
      .then((res) => {
        if (res.ok) {
          // history.push('/movies');
          setInfoToolTipInfo({
            message: tooltip.registrationSuccess,
            image: tooltip.successIcon
          });
          handleLogin(email, password);
        } else {
          setInfoToolTipInfo({
            message: tooltip.registrationFail,
            image: tooltip.successIcon
          })
        }
      })
      // .then(() => {
      //   handleLogin(email, password);
      // })
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
        setIsLoggedIn(true);
        localStorage.setItem('jwt', data.jwt);
        localStorage.setItem('searchResults', []);
        localStorage.setItem('filterState', false);
        localStorage.setItem('filterStateInSaved', false);
        localStorage.setItem('searchWord', '');
        localStorage.setItem('searchWordInSaved', '');
        return data._id;
      })
      .then((id) => {
        tokenCheck();
        setCurrentUser({
          _id: id,
        });
        setInfoToolTipInfo({
          message: tooltip.loginSuccess,
          image: tooltip.successIcon
        });
        history.push('/movies');
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
    if (name === currentUser.name && email === currentUser.email) {
      setInfoToolTipInfo({
        message: tooltip.updateFailRepeat,
        image: tooltip.failIcon
      });
      setIsInfoToolTipOpen(true);
      return;
      // throw new Error('Данные не изменены');
    }
    MainApi.editProfile(name, email)
      .then((data) => {
        setCurrentUser(data);
        setInfoToolTipInfo({
          message: tooltip.updateSuccess,
          image: tooltip.successIcon
        })
        // setIsInfoToolTipOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setInfoToolTipInfo({
          message: tooltip.updateFail,
          image: tooltip.failIcon
        });
      })
      .finally(() => {
        setIsInfoToolTipOpen(true);
      });
  }

  function handleLogOut () {
    localStorage.removeItem('jwt');
    localStorage.removeItem('searcResults');
    localStorage.removeItem('searchWord');
    localStorage.removeItem('searchWordInSaved');
    localStorage.removeItem('filterState');
    localStorage.removeItem('filterStateInSaved');
    setIsLoggedIn(false);
    setCurrentUser({});
    setMovies([]);
    setSavedMovies([]);
    history.push('/');
  }

  function closePopups () {
    setIsInfoToolTipOpen(false);
  }

  // Добавить фильм в библиотеку сохраненных фильмов
  // или оповестить юзера об ошибке

  function handleSetLike(movie) {

    const isSaved = savedMovies.find((savedMovie) => savedMovie.movieId  === movie.movieId);

    if(isSaved === undefined) {
      MainApi.createLocalCard(movie)
      .then((data) => {
        console.log(data);
        const createdMovie = data.movie;

        setInfoToolTipInfo({
          message: tooltip.saveSuccess,
          image: tooltip.successIcon
        });
        setSavedMovies([createdMovie, ...savedMovies]);
      })
      .catch((err) => {
        setInfoToolTipInfo({
          message: tooltip.saveFail,
          image: tooltip.failIcon
        });
        setIsInfoToolTipOpen(true);
      })
      .finally(() => {
        setIsInfoToolTipOpen(true);
      })
    } else {
      setInfoToolTipInfo({
        message: tooltip.saveFailRepeat,
        image: tooltip.failIcon
      });
      setIsInfoToolTipOpen(true);
    } 
  }

  function handleRemoveLike (movie) {
    // console.log(`In App handleRemoveLike movie: id: ${movie.movieId}`);
    MainApi.deleteLocalMovie(movie.movieId)
      .then(() => {
        setSavedMovies((savedMovies) => savedMovies.filter((m) => m.movieId !== movie.movieId));
        setInfoToolTipInfo({
          message: tooltip.removeSuccess,
          image: tooltip.successIcon
        });
      })
      .catch((err) => {
        console.log(err);
        setInfoToolTipInfo({
          message: tooltip.removeFail,
          image: tooltip.failIcon
        });
      })
      .finally(() => {
        setIsInfoToolTipOpen(true);
      });
  }

  // Переключатель состояния фильтра короткометражек
  // Переписывает значение фильтра на локальном диске и 
  // переменной состояния

  function toggleCheckBox() {
    const filter = JSON.parse(localStorage.getItem('filterState'));
    localStorage.setItem('filterState', !filter);
    setIsShortMovieChecked(!filter);
    // console.log(`FILTER STATE (LOCAL) ON TOGGLE IS ${localStorage.getItem('filterState')}`);
    // console.log(`FILTER STATE (STATE) ON TOGGLE IS ${isShortMovieChecked}`);
  }

  // Функция по фильтрации массивов с фильмами по ключевому слову
  // и длительности

  function filterBySearchWord(list, word, isShortOn) {
    if (list.length > 0) {
      if (isShortOn === true) {
        return list.filter((movie) => movie.nameEN !== 'null' && movie.nameEN.toLowerCase().includes(word.toLowerCase()) && movie.duration < 40);
      } else {
        return list.filter((movie) => movie.nameEN !== 'null' && movie.nameEN.toLowerCase().includes(word.toLowerCase()));
      }
    } else {
      return [];
    }
  }


  function handleSearchRequest(word, filterState) {
    setIsLoading(true);

    // console.log(`IN SEARCH HANDLER: ${JSON.parse(localStorage.getItem('filterState'))}`);

    setTimeout(() => {

      const movieList = filterBySearchWord(movies, word, filterState);

      if(movieList !== null && movieList.length !== 0) {
        localStorage.setItem('searchResults', JSON.stringify(movieList));
        setIsNoResuls(false);
      } else {
        localStorage.setItem('searchResults', []);
        setIsNoResuls(true);
      }

      localStorage.setItem('filterState', filterState);
      localStorage.setItem('searchWord', word);
      setMovieSearchResult(movieList);
      setIsLoading(false);
    }, 1000);
  }

  function handleSearchRequestInSaved(word, filterState) {
    setIsLoading(true);

    setTimeout(() => {
      console.log(`In filterinf saved movies: ${filterState}`);
      const movieList = filterBySearchWord(savedMovies, word, filterState);

      if(movieList !== null && movieList.length !== 0) {
        setIsNoResuls(false);
      } else {
        setIsNoResuls(true);
      }

      localStorage.setItem('filterStateInSaved', filterState);
      setSavedMovieSearchResult(movieList);
      setAreSavedMoviesFiltered(true);
      setIsLoading(false);
    }, 1000);
  }

  function resetAreSavedMoviesFiltered () {
    setAreSavedMoviesFiltered(false);
  }

  // Проверяем наличие токена в локальном хранилище
  // если токен присутствует - 
  // меняем состояние логина и
  // забираем данные о юзере с сервера и сохранем в переменную состояния. 

  function tokenCheck () {
    const jwt = localStorage.getItem('jwt');

    // console.log('ACTION 1 (tokenCheck)');
    // console.log(`Token in tokenCheck: ${jwt}`);
    // console.log(`777777777 Token in tokenCheck: idLoggedIn ${isLoggedIn}`);
    // console.log(`22222 In getSearchResults: ${movieSearchResult}`);

    if (jwt) {
      MainApi.getContent(jwt)
        .then((user) => {
          if (user) {
            setCurrentUser(user);
            setIsLoggedIn(true);
            setMovieSearchResult(getSearchResults);
            setIsShortMovieChecked(JSON.parse(localStorage.getItem('filterState')));
            // console.log(`isShortMovieChecked ${isShortMovieChecked}`)
            if (location.pathname === '/signin') {
              history.push('/movies');
            } else if (location.pathname === '/signup') {
              history.push('/movies');
            } else {
              history.push(location.pathname);
            }            
            // console.log(`Token in tokenCheck: idLoggedIn ${isLoggedIn}`);

            // console.log(`In tokenCheck: getContent currentUSer: ${currentUser}`);
            // console.log(`In tokenCheck: getContent response: ${JSON.stringify(user)}`);
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

  // Извлекает и записывает данные с локального хранилища в переменную состояния

  function getSearchResults() {
    return localStorage.getItem('searchResults').length > 0 ?
      JSON.parse(localStorage.getItem('searchResults')) :
      [];
  }

  // Если пользователь залогинен
  // получаем все фильмы с API и сохраненные юзером фильмы

  useEffect(() => {
    if(isLoggedIn) {
      console.log(`Fetching movies...`);
      console.log('ACTION 2 (about to fetch movies)');

      Promise.all([
        MoviesApi.getMovies(),
        MainApi.getSavedMovies()
      ])
      .then(([allMovies, userSavedMovies]) => {
        // console.log('ACTION 3 (about to set movies and savedMovies)');
        // console.log(`In MainApi.getSavedMovies: allMovies: ${allMovies.length}`);
        // console.log(`In MainApi.getSavedMovies: allMovies: ${JSON.stringify(allMovies)}`);
        // console.log(`In MainApi.getSavedMovies: allMovies: ${Array.isArray(allMovies)}`);
        // console.log(`In MainApi.getSavedMovies: savedMovies: ${userSavedMovies.length}`);
        // console.log(`In MainApi.getSavedMovies: savedMovies: ${JSON.stringify(userSavedMovies)}`);
        // console.log(`In MainApi.getSavedMovies: savedMovies: ${Array.isArray(userSavedMovies)}`);
        setMovies(allMovies);
        console.log(allMovies);
        if (userSavedMovies) {
          const filteredMovies = userSavedMovies.filter((m) => m.owner === currentUser._id);
          setSavedMovies(filteredMovies !== undefined ? filteredMovies : []);
          // console.log(`In MainApi.getSavedMovies: savedMovies: ${savedMovies}`);
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
  }, []);
  
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
            movies={movieSearchResult}
            savedMovies={savedMovies}
            searchWord={searchWordLocalStorage}
            handleSetLike={handleSetLike}
            handleRemoveLike={handleRemoveLike}
            onSearch={handleSearchRequest}
            handleCheckboxToggle={toggleCheckBox}
            isLoggedIn={isLoggedIn}
            isShortMovieChecked={isShortMovieChecked}
            isNoResults={isNoResults}
            isLoading={isLoading} />

          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            movies={areSavedMoviesFiltered ? savedMovieSearchResult : savedMovies}
            savedMovies={savedMovies}
            savedMovieSearchResult={savedMovieSearchResult}
            areSavedMoviesFiltered={areSavedMoviesFiltered}
            handleRemoveLike={handleRemoveLike}
            onSearch={handleSearchRequest}
            onSavedSearch={handleSearchRequestInSaved}
            handleCheckboxToggle={toggleCheckBox}
            isLoggedIn={isLoggedIn}
            isShortMovieChecked={isShortMovieChecked}
            isNoResults={isNoResults}
            resetAreSavedMoviesFiltered={resetAreSavedMoviesFiltered} />

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