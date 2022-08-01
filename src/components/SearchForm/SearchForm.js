import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm({ onSearch, onSavedSearch, handleCheckboxToggle, isShortMovieChecked }) {

  const [searchWord, setSearchWord] = useState('');

  const route = useLocation().pathname;

  function handleSearch(e) {
    e.preventDefault();

    if (route === '/movies') {
      localStorage.setItem('searchWord', searchWord);
      console.log(`In searchForm: word: ${searchWord}`);
      onSearch(searchWord);
    } else if (route === '/saved-movies') {
      // При монтировании возвращении на страницу сохраненных фильмов
      // список отфильтрованных фильмов возвращается к пустому массиву.
      // А если массив отфильтрованных фильмов пустой - 
      // отображаем все сохраненные фильмы
      onSavedSearch(searchWord);
    }
    
  }

  function handleChange(e) {
    setSearchWord(e.target.value);
  }

  // При монтировании компонента
  // Если пользователь на странице фильмов
  // достаем поисковое слово из хранилища
  // если на странице сохраненных фильмов - 
  // оставляет поле воода пустым

  useEffect(() => {
    route === '/movies' ? 
      setSearchWord(localStorage.getItem('searchWord')) :
      setSearchWord('');
  }, []);

  return (
    <div className="search-form">
      <form
        className="search-form__container"
        autoComplete='off'
        onSubmit={handleSearch}>
        <input
          className="search-form__input"
          type="text"
          value={searchWord || ''}
          onChange={handleChange}
          placeholder='Фильм'
          required />
        <button 
          className="search-form__button"
          type="submit">
          <span className="search-form__search-icon" />
        </button>
      </form>
      <FilterCheckbox
        isShortMovieChecked={isShortMovieChecked}
        onSearch={onSearch}
        onSavedSearch={onSavedSearch}
        handleCheckboxToggle={handleCheckboxToggle}/>
    </div>
  )
}

export default SearchForm;