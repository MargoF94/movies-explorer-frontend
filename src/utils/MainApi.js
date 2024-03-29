// export const mainApiUrl = 'http://localhost:3000';
export const mainApiUrl = 'https://localmovieexplorer.nomoredomains.xyz';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Erroe ${res.status}`);
}

//// ПОЛЬЗОВАТЕЛЬСКОЕ ////

// Логинl

export const login = (email, password) => {
  return fetch(`${mainApiUrl}/api/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then((data) => {
    if (data) {
      localStorage.setItem('jwt', data.jwt);
      return data.json();
    }
  })
}

// Регистрация

export const register = ( email, password, name ) => {
  return fetch(`${mainApiUrl}/api/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password, name})
  })
}

  // Проверка токена
  // Получение информации о пользователе

export const getContent = (jwt) => {
  return fetch(`${mainApiUrl}/api/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${jwt}`,
    },
  })
  .then((res) => {
    return res.json();
  })
}


// Изменение информации о пользователе

export const editProfile = ( name, email ) => {
  return fetch(`${mainApiUrl}/api/users/me`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${localStorage.getItem('jwt')}`
    },
    body: JSON.stringify({
      name: name,
      email: email
    })
  })
  .then(checkResponse)
}


//// КАРТОЧКИ ////

// Создание фильма
// Сохраняем пришедший с API фильм локально

export const createLocalCard = (movie) => {
  return fetch(`${mainApiUrl}/api/movies`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${localStorage.getItem('jwt')}`
    }, 
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `https://api.nomoreparties.co${movie.image.url}`,
      trailerLink: movie.trailerLink || '',
      thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
      nameRU: movie.nameRU || '',
      nameEN: movie.nameEN || '',
    })
  })
  .then(checkResponse)
}

// Снятие лайка

export const deleteLocalMovie = (movieId) => {
  return fetch(`${mainApiUrl}/api/movies/${movieId}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${localStorage.getItem('jwt')}`
    }
  })
  .then(checkResponse)
}

// Получение сохраненных карточек

export const getSavedMovies = () => {
  return fetch(`${mainApiUrl}/api/movies`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${localStorage.getItem('jwt')}`
    }
  })
  .then(checkResponse)
}