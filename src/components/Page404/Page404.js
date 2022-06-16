import React from "react";
import { useHistory } from "react-router-dom";
import './Page404.css';

function Page404() {

  const history = useHistory();

  function handleBackClick() {
    history.goBack();
  }

  return (
    <div className="page404">
      <div className="page404__title-container">
        <h1 className="page404__title">
          404
        </h1>
        <p className="page404__text">
        Страница не найдена
        </p>
      </div>

      <button
        className="page404__button"
        onClick={handleBackClick}>
        Назад
      </button>
    </div>
  )
}

export default Page404;