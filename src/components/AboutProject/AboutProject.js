import React from "react";
import './AboutProject.css';

//компонент с описанием дипломного проекта

function AboutProject() {
  return (
    <div className="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__content">
        <div className="about-project__column">
          <h3 className="about-project__subtitle">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__column">
          <h3 className="about-project__subtitle">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__scale about-project__grid">
        <p className="about-project__scale-item about-project__scale-item_color_green">
          1 неделя
        </p>
        <p className="about-project__scale-item about-project__scale-item_color_gray">
          4 недели
        </p>
      </div>
      <div className="about-project__scale-specifics about-project__grid">
        <span className="about-project__scale_text">Back-end</span>
        <span className="about-project__scale_text">Front-end</span>
      </div>
  </div>
  )
}

export default AboutProject;