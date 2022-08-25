import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm({ onSearch, onSavedSearch, handleCheckboxToggle, isShortMovieChecked }) {

  const route = useLocation().pathname;
  const [searchWord, setSearchWord] = useState('');
  const filterState = route === '/movies' ? 
    JSON.parse(localStorage.getItem('filterState')) : 
    JSON.parse(localStorage.getItem('filterStateInSaved'));

  function handleSearch(e) {
    e.preventDefault();

    if (route === '/movies') {
      localStorage.setItem('searchWord', searchWord);
      console.log(`In searchForm: word: ${searchWord}`);
      onSearch(searchWord, filterState);
    } else if (route === '/saved-movies') {
      localStorage.setItem('searchWordInSaved', searchWord);
      onSavedSearch(searchWord, filterState);
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

    return () => {
      localStorage.setItem('searchWordInSaved', '');
    }
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