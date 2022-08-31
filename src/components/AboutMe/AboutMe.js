import React from "react";
import './AboutMe.css';
import Portfolio from '../Portfolio/Portfolio';
import photo from '../../images/profile.jpg';

function AboutMe() {
  return (
    <div className="about-me">
      <h2 className="about-me__title">Student</h2>
      <div className="about-me__container">
        <div className="about-me__info">
        <div className="about-me__text-info">
          <h3 className="about-me__subtitle">Margarita</h3>
          <p className="about-me__description">Frontend developer, 28 y.o.</p>
          <p className="about-me__text">I was born and raised in the city of Chelyabinsk, Russia where I graduated Chelyabinsk State University. Currently I live and work in Tokyo, Japan. In my free time I enjoy reading books, watching TV-Shows and smoking Shisha. I was interested in computers since high school and about a year ago I decided to try myself in web developing. I enrolled in Yandex.Practicum Wed development training course and graduated in August 2022.</p>
        </div>
        <div className="about-me__links-info">
          <a
            href="https://vk.com/localmoyashi"
            className="link about-me__link"
            target="_blank"
            rel="noreferrer">VK.com</a>
          <a 
            href="https://github.com/MargoF94"
            className="link about-me__link"
            target="_blank"
            rel="noreferrer">Github</a>
        </div>
        </div>
        <div className="about-me__photo-container">
          <img 
            className="about-me__profile-photo"
            src={photo}
            alt="Моё фото" />
        </div>
      </div>
      <Portfolio />
    </div>
  )
}

export default AboutMe;