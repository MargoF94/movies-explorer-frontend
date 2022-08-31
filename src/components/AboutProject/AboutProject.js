import React from "react";
import './AboutProject.css';

//компонент с описанием дипломного проекта

function AboutProject() {
  return (
    <div className="about-project">
      <h2 className="about-project__title">About this project</h2>
      <div className="about-project__content">
        <div className="about-project__column">
          <h3 className="about-project__subtitle">
            This project was done in five stages
          </h3>
          <p className="about-project__text">
            Planning, setting up beckend, marking up, creating an interface with React and finishing touches.
          </p>
        </div>
        <div className="about-project__column">
          <h3 className="about-project__subtitle">
            This project was done in five weeks.
          </h3>
          <p className="about-project__text">
            Each stage had soft and hard deadlines.
          </p>
        </div>
      </div>
      <div className="about-project__scale about-project__grid">
        <p className="about-project__scale-item about-project__scale-item_color_green">
          1 week
        </p>
        <p className="about-project__scale-item about-project__scale-item_color_gray">
          4 weeks
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