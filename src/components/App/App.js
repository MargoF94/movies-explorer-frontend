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
  const [isShortMovieChecked, setIsShortMovieChecked] = useState( );
  const [isLoading, setIsLoading] = useState(false);
  const [isNoResults, setIsNoResuls] = useState(false);

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
        // setIsLoggedIn(true);
        // history.push('/movies');
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

    console.log(`IN SRT LIKE: movie: ${movie}`);

    const isSaved = savedMovies.find((savedMovie) => savedMovie.movieId  === movie.movieId);

    console.log(`IN SET LIKE ISSAVED: ${isSaved}`);

    if(isSaved === undefined) {
      MainApi.createLocalCard(movie)
      .then((data) => {
        console.log(data);
        const createdMovie = data.movie;

        setInfoToolTipInfo({
          message: tooltip.saveSuccess,
          image: tooltip.successIcon
        });
        setSavedMovies([createdMovie, ...savedMovies])
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
    console.log(`In App handleRemoveLike movie: ${JSON.stringify(movie.movieId)}`);
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
    setIsShortMovieChecked(!isShortMovieChecked);
    // const filter = localStorage.getItem('filterState');
    localStorage.setItem('filterState', isShortMovieChecked);
    // console.log(`FILTER STATE ON TOGGLE IS ${localStorage.getItem('filterState')}`);
  }

  // Функция по фильтрации массивов с фильмами по ключевому слову
  // и длительности

  function filterBySearchWord(list, word, isShortOn) {
    if (list.length > 0) {
      if (!isShortOn) {
        return list.filter((movie) => movie.nameRU.toLowerCase().includes(word.toLowerCase()) && movie.duration < 40);
      } else {
        return list.filter((movie) => movie.nameRU.toLowerCase().includes(word.toLowerCase()));
      }
    } else {
      return [];
    }
  }

  // Достает результаты поиска из локального хранилища и записывает
  // в переменную состояния

  function setRender() {

    console.log('ACTION 4 (retriving movies from local storage)');
    console.log(`isLoggedIn ${isLoggedIn}`)
    // Проверяем, пусто ли хранилище.
    // Если нет - достаем из него массив и записываем в переменную;
    // если да - записываем пустой массив
    const searchResultLocalStorage = localStorage.getItem('searchResults').length > 0 ?
      JSON.parse(localStorage.getItem('searchResults')) :
      [];

    if (location.pathname === '/movies') {
      if(searchResultLocalStorage.length === 0 || searchResultLocalStorage === null) {
        setMoviesToRender([]);
        setIsNoResuls(true);
      } else {
        setMoviesToRender(searchResultLocalStorage);
        setIsNoResuls(false);
      }
    } else if (location.pathname === '/saved-movies') {
      if (savedMovies.length === 0 || savedMovies === null) {
        setMoviesToRender([]);
        setIsNoResuls(true);
      } else {
        setMoviesToRender(savedMovies);
        setIsNoResuls(false);
      }
    }

    // Обновляем значение фильтра короткометражек на локальном хранилище
    localStorage.setItem('filterState', isShortMovieChecked);
  }

  // При отображении фильмов в блоке результатов
  // фильмы, ранее сохраненные пользователем берутся с сервера
  // (так как только на них будет ярлык сохраненных));

  // function handleSearchRequest(word) {
  //   setIsLoading(true);

  //   console.log(`IN SEARCH: MOVIES ${movies}`)
  //   console.log(`IN SEARCH: SAVED MOVIES ${savedMovies}`);
  //   console.log(`isShortMovieChecked: ${isShortMovieChecked}`);

  //   setTimeout(() => {
  //     // Достаем состояние переключателя из локального хранилища
  //     // Проверяем все фильмы
  //     // Проверяем сохраненные фильмы
  //     // const isFilterOn = localStorage.getItem('filterState');
  //     // console.log(`FILTER STATE ON SEARCH IS ${isFilterOn}`);

  //     const allFilteredMovies = filterBySearchWord(movies, word, isShortMovieChecked);
  //     const allSavedMovies = filterBySearchWord(savedMovies, word, isShortMovieChecked);

  //     // Сравниваем два массива,
  //     // повторяющиеся фильмы берем с серверной стороны
  //     const movieList = allFilteredMovies.map((movie) => {
  //       const savedMovie = allSavedMovies.find((savedM) => savedM.movieId === movie.id);
  //       return savedMovie ?? movie;
  //     })

  //     // Если результатов нет - записываем в переменную пустой массив
  //     if(movieList !== null && movieList.length !== 0) {
  //       console.log(`SAVING SEARCH RESULTS IN LOCAL STORAGE: ${movieList}`)
  //       localStorage.setItem('searchResults', JSON.stringify(movieList));
  //       setIsNoResuls(false);
  //     } else {
  //       localStorage.setItem('searchResults', []);
  //       setIsNoResuls(true);
  //     }

  //     setMovieSearchResult(movieList);
  //     // setRender();
  //     setIsLoading(false);
  //   }, 1000);
  // }

  function handleSearchRequest(word) {
    setIsLoading(true);

    console.log(`IN SEARCH: MOVIES ${movies}`)
    console.log(`IN SEARCH: SAVED MOVIES ${savedMovies}`);
    console.log(`isShortMovieChecked: ${isShortMovieChecked}`);

    setTimeout(() => {
      // Достаем состояние переключателя из локального хранилища
      // Проверяем все фильмы
      // Проверяем сохраненные фильмы
      // const isFilterOn = localStorage.getItem('filterState');
      // console.log(`FILTER STATE ON SEARCH IS ${isFilterOn}`);
      const moviesToFilter = location.pathname === '/movies' ? movies : savedMovies;

      const movieList = filterBySearchWord(moviesToFilter, word, isShortMovieChecked);
  

      // Сравниваем два массива,
      // повторяющиеся фильмы берем с серверной стороны
      // const movieList = allFilteredMovies.map((movie) => {
      //   const savedMovie = allSavedMovies.find((savedM) => savedM.movieId === movie.id);
      //   return savedMovie ?? movie;
      // })

      // Если результатов нет - записываем в переменную пустой массив
      if(movieList !== null && movieList.length !== 0) {
        console.log(`SAVING SEARCH RESULTS IN LOCAL STORAGE: ${movieList}`)
        localStorage.setItem('searchResults', JSON.stringify(movieList));
        setIsNoResuls(false);
      } else {
        localStorage.setItem('searchResults', []);
        setIsNoResuls(true);
      }

      setMovieSearchResult(movieList);
      // setRender();
      setIsLoading(false);
    }, 1000);
  }

  // Проверяем наличие токена в локальном хранилище
  // если токен присутствует - 
  // меняем состояние логина и
  // забираем данные о юзере с сервера и сохранем в переменную состояния. 

  function tokenCheck () {
    const jwt = localStorage.getItem('jwt');
    // const filter = localStorage.getItem('filterState');
    // console.log(filter);
    // const savedMoviesFromStorage = (localStorage.getItem('searchResults') !== null && isLoggedIn) ?
    //   JSON.parse(localStorage.getItem('searchResults')) :
    //   [];
    console.log('ACTION 1 (tokenCheck)');
    console.log(`Token in tokenCheck: ${jwt}`);
    console.log(`777777777 Token in tokenCheck: idLoggedIn ${isLoggedIn}`);
    console.log(`22222 In getSearchResults: ${movieSearchResult}`);

    if (jwt) {
      MainApi.getContent(jwt)
        .then((user) => {
          if (user) {
            setCurrentUser(user);
            setIsLoggedIn(true);
            setMovieSearchResult(getSearchResults);
            setIsShortMovieChecked(JSON.parse(localStorage.getItem('filterState')));
            console.log(`isShortMovieChecked ${isShortMovieChecked}`)
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
        console.log('ACTION 3 (about to set movies and savedMovies)');
        console.log(`In MainApi.getSavedMovies: allMovies: ${allMovies}`);
        console.log(`In MainApi.getSavedMovies: allMovies: ${JSON.stringify(allMovies)}`);
        console.log(`In MainApi.getSavedMovies: allMovies: ${Array.isArray(allMovies)}`);
        console.log(`In MainApi.getSavedMovies: savedMovies: ${userSavedMovies}`);
        console.log(`In MainApi.getSavedMovies: savedMovies: ${JSON.stringify(userSavedMovies)}`);
        console.log(`In MainApi.getSavedMovies: savedMovies: ${Array.isArray(userSavedMovies)}`);
        setMovies(allMovies);
        if (userSavedMovies) {
          setSavedMovies(userSavedMovies);
          console.log(`In MainApi.getSavedMovies: savedMovies: ${savedMovies}`);
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
    console.log(`8888888888 isLoggedIn ${isLoggedIn}`);
    tokenCheck();
  }, []);

  // useEffect(() => {
  //   setRender();
  // }, [isLoggedIn, savedMovies]);

  
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
            setRender={setRender}
            isLoggedIn={isLoggedIn}
            isShortMovieChecked={isShortMovieChecked}
            isNoResults={isNoResults}
            isLoading={isLoading} />

          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            movies={savedMovies}
            moviesToRender={moviesToRender}
            handleRemoveLike={handleRemoveLike}
            onSearch={handleSearchRequest}
            handleCheckboxToggle={toggleCheckBox}
            setRender={setRender}
            isLoggedIn={isLoggedIn}
            isShortMovieChecked={isShortMovieChecked}
            isNoResults={isNoResults} />

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