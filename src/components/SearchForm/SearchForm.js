import React, { useState } from "react";
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm({ movies, onSearch, handleCheckboxToggle }) {

  const [searchWord, setSearchWord] = useState(localStorage.getItem('searchWord'));

  function handleSearch(e) {
    e.preventDefault();

    localStorage.setItem('searchWord', searchWord);
    console.log(`In searchForm: word: ${localStorage.getItem('searchWord', searchWord)}`);
    onSearch(searchWord);
  }

  function handleChange(e) {
    setSearchWord(e.target.value);
  }

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
        handleCheckboxToggle={handleCheckboxToggle} />
    </div>
  )
}

export default SearchForm;