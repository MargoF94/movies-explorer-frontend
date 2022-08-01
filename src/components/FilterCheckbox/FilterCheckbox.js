import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './FilterCheckbox.css';

function FilterCheckbox({ isShortMovieChecked, onSearch, onSavedSearch, handleCheckboxToggle }) {
  
  const [filterState, setFilterState] = useState(false);

  const route = useLocation().pathname;

  // const filterState= localStorage.getItem('filterState');
  console.log(`FILTER STATE ON MOUNTING IS ${filterState}`);

  const classNameCircle = (
    filterState ? 
      'checkbox__circle_checked' : 
      'checkbox__circle_unchecked'
  )

  const classNameBG = (
    filterState ? '' : 'checkbox__new-check_unchecked'
  )

  // function onToggle() {
  //   console.log('CheckBox is being tickled');
  //   handleCheckboxToggle();
  //   localStorage.setItem('filterState', isShortMovieChecked);
  // }

  function onToggle() {
    const searchWord = route === '/movies' ?
      localStorage.getItem('searchWord'): 
      localStorage.getItem('searchWordInSaved');
    // handleCheckboxToggle();
    // localStorage.setItem('filterState', true ? false : true);
    console.log(`SEARCH WORD IN TOGGLE ${localStorage.getItem('searchWord')}`);
    setFilterState(!filterState);
    handleCheckboxToggle();
    // setFilterState(!filterState);
    // console.log(`FILTER STATE ON TOGGLE IS ${localStorage.getItem('filterState')}`);
    route === '/movies' ?
      onSearch(searchWord) :
      onSavedSearch(searchWord);
  }

  // useEffect(() => {
  //   onSearch(searchWord)
  // }, [isShortMovieChecked])

  useEffect(() => {
    setFilterState(JSON.parse(localStorage.getItem('filterState')));
  }, []);

  return (
    <label className="checkbox">
      <input 
        className="checkbox__input" 
        type="checkbox" 
        value={filterState} />
      <span className={`checkbox__new-check ${classNameBG}`} onClick={onToggle}>
        <span className={`checkbox__circle ${classNameCircle}`} />
      </span>
      <span className="checkbox__description">Короткометражки</span>
    </label>
  )
}

export default FilterCheckbox;