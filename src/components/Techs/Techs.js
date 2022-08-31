import React from "react";
import './Techs.css';

function Techs() {
  return (
    <div className="techs">
      <h2 className="techs__title">Technologies used</h2>
      <div className="techs__container">
        <h3 className="techs__subtitle">7 technologies</h3>
        <p className="techs__description">This oriject was sreated using following technologies</p>
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