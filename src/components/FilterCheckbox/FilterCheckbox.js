import React, { useEffect, useState } from "react";
import './FilterCheckbox.css';

function FilterCheckbox({ isShortMovieChecked, onSearch, handleCheckboxToggle }) {
  
  // const [filterState, setFilterState] = useState(localStorage.getItem('filterState'))

  const searchWord = localStorage.getItem('searchWord');
  // const filterState= localStorage.getItem('filterState');
  console.log(`FILTER STATE ON MOUNTING IS ${isShortMovieChecked}`);

  const classNameCircle = (
    isShortMovieChecked ? 
      'checkbox__circle_checked' : 
      'checkbox__circle_unchecked'
  )

  const classNameBG = (
    isShortMovieChecked ? '' : 'checkbox__new-check_unchecked'
  )

  // function onToggle() {
  //   console.log('CheckBox is being tickled');
  //   handleCheckboxToggle();
  //   localStorage.setItem('filterState', isShortMovieChecked);
  // }

  function onToggle() {
    // handleCheckboxToggle();
    // localStorage.setItem('filterState', true ? false : true);
    handleCheckboxToggle(searchWord)
    // setFilterState(!filterState);
    // console.log(`FILTER STATE ON TOGGLE IS ${localStorage.getItem('filterState')}`);
    onSearch(searchWord);
  }

  // useEffect(() => {
  //   onSearch(searchWord)
  // }, [isShortMovieChecked])

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