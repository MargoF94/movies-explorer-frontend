import React from "react";
import { Link } from "react-router-dom";
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {
  return (
    <div className="search-form">
      <form
        className="search-form__container"
        autoComplete='off'>
        <input
          className="search-form__input"
          type="text"
          // value={}
          placeholder='Фильм'
          required />
        <button className="search-form__button" type="submit"><span className="search-form__search-icon"></span></button>
      </form>
      <FilterCheckbox />
    </div>
  )
}

export default SearchForm;