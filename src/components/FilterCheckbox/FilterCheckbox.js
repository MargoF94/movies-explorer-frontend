import React, { useState } from "react";
import './FilterCheckbox.css';

function FilterCheckbox() {

  const [isChecked, setIsChecked] = useState(true);

  const classNameCircle = (
    isChecked ? 
      'checkbox__circle_checked' : 
      'checkbox__circle_unchecked'
  )

  const classNameBG = (
    isChecked ? '' : 'checkbox__new-check_unchecked'
  )

  function handleClick() {
    if (isChecked === true) {
      setIsChecked(false)
    } else {
      setIsChecked(true)
    }
  }

  return (
    <label className="checkbox">
      <input className="checkbox__input" type="checkbox" />
      <span className={`checkbox__new-check ${classNameBG}`} onClick={handleClick}>
        <span className={`checkbox__circle ${classNameCircle}`} />
      </span>
      <span className="checkbox__description">Короткометражки</span>
    </label>
  )
}

export default FilterCheckbox;