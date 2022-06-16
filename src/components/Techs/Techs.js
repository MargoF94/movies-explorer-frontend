import React from "react";
import { Link, useLocation } from "react-router-dom";
import './Techs.css';

function Techs() {
  return (
    <div className="techs">
      <h2 className="techs__title">Технологии</h2>
      <div className="techs__container">
        <h3 className="techs__subtitle">7 технологий</h3>
        <p className="techs__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className="techs__tools">
          <li className="techs__tools-item">HTML</li>
          <li className="techs__tools-item">CSS</li>
          <li className="techs__tools-item">JS</li>
          <li className="techs__tools-item">React</li>
          <li className="techs__tools-item">Git</li>
          <li className="techs__tools-item">Express.js</li>
          <li className="techs__tools-item">mongoDB</li>
        </ul>
      </div>
    </div>
  )
}

export default Techs;