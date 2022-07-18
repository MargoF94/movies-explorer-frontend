import React, { useState } from "react";
import './FilterCheckbox.css';

function FilterCheckbox({ handleCheckboxToggle }) {

  const [isChecked, setIsChecked] = useState();
  
  const classNameCircle = (
    isChecked ? 
      'checkbox__circle_checked' : 
      'checkbox__circle_unchecked'
  )

  const classNameBG = (
    isChecked ? '' : 'checkbox__new-check_unchecked'
  )

  function handleToggle() {
    setIsChecked(!localStorage.getItem('filterState'))
  }

  return (
    <label className="checkbox">
      <input className="checkbox__input" type="checkbox" />
      <span className={`checkbox__new-check ${classNameBG}`} onClick={handleCheckboxToggle}>
        <span className={`checkbox__circle ${classNameCircle}`} />
      </span>
      <span className="checkbox__description">Короткометражки</span>
    </label>
  )
}

export default FilterCheckbox;