import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './FilterCheckbox.css';

function FilterCheckbox({ onSearch, onSavedSearch, handleCheckboxToggle }) {
  
  const route = useLocation().pathname;
  // const [filterState, setFilterState] = useState(route === '/movies' ? JSON.parse(localStorage.getItem('filterState')) : JSON.parse(localStorage.getItem('filterStateInSaved')));
  // const [filterStateinSaved, setFilterStateInSaved] = useState(route === '/saved-movies' && JSON.parse(localStorage.getItem('filterStateInSaved')));

  const filterState = route === '/movies' ? 
    JSON.parse(localStorage.getItem('filterState')) : 
    JSON.parse(localStorage.getItem('filterStateInSaved'));


  // const filterState= localStorage.getItem('filterState');
  console.log(`FILTER STATE ON MOUNTING IS ${filterState}`);

  const classNameCircle = (
    filterState ?
      'checkbox__circle_checked' : 
      'checkbox__circle_unchecked'
  );

  const classNameBG = (
    filterState ? '' : 'checkbox__new-check_unchecked'
  );

  // function handleStateChange () {
  //   route === '/movies' && localStorage.setItem('filterState', !filterState);
  //   route === '/saved-movies' && localStorage.setItem('filterStateInSaved', !filterState);
  //   setFilterState(!filterState);
  //   console.log(`IN HANDLINF STATE CHANGE: ${filterState}`);
  // }

    function handleStateChange () {
    route === '/movies' && localStorage.setItem('filterState', true ? false : true);
    route === '/saved-movies' && localStorage.setItem('filterStateInSaved', true ? false : true);
  }

  function onToggle() {
    const searchWord = route === '/movies' ?
      localStorage.getItem('searchWord'): 
      localStorage.getItem('searchWordInSaved');

    // Меняет состояние фильтра короткометражек
    // для каждого рута отдельно

    // route === '/movies' && handleCheckboxToggle();
    // route === '/movies' && handleCheckboxToggle();
    // route === '/saved-movies' && localStorage.setItem('filterStateInSaved', !filterState);
    // route === '/saved-movies' && setFilterStateInSaved(!filterStateinSaved);

    // handleStateChange();

    console.log(`SEARCH WORD IN TOGGLE ${searchWord}`);
    // console.log(`FILTER STATE IN TOGGLE ${filterState}`);

    route === '/movies' ?
      onSearch(searchWord, !filterState) :
      onSavedSearch(searchWord, !filterState);

    handleStateChange();
  }

  console.log(JSON.parse(localStorage.getItem('filterStateInSaved')));
  console.log(JSON.parse(localStorage.getItem('filterState')));

  // useEffect(() => {
  //   // route === '/movies' ?
  //   //   setFilterState(JSON.parse(localStorage.getItem('filterState'))) :
  //   //   setFilterState(JSON.parse(localStorage.getItem('filterStateInSaved')));
  //   return () => {
  //     route === '/saved-movies' && localStorage.setItem('filterStateInSaved', false);
  //   }
  // }, []);

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