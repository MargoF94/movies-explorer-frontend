import React, { useState } from "react";
import './FilterCheckbox.css';

function FilterCheckbox({ handleCheckboxToggle, isShortMovieChecked }) {


  const classNameCircle = (
    isShortMovieChecked ? 
      'checkbox__circle_checked' : 
      'checkbox__circle_unchecked'
  )

  const classNameBG = (
    isShortMovieChecked ? '' : 'checkbox__new-check_unchecked'
  )

  function onToggle() {
    console.log('CheckBox is being tickled');
    handleCheckboxToggle();
    localStorage.setItem('filterState', isShortMovieChecked)
  }

  return (
    <label className="checkbox">
      <input className="checkbox__input" type="checkbox" />
      <span className={`checkbox__new-check ${classNameBG}`} onClick={onToggle}>
        <span className={`checkbox__circle ${classNameCircle}`} />
      </span>
      <span className="checkbox__description">Короткометражки</span>
    </label>
  )
}

export default FilterCheckbox;