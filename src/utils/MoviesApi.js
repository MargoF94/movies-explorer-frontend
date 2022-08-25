const moviesApiUrl = 'https://api.nomoreparties.co/beatfilm-movies'

export const getMovies = () => {
  return fetch(moviesApiUrl, {
    method: 'GET',
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  })
}

