import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Header.css';
import logo from '../../images/logo.svg';
import { useLocation } from "react-router-dom";

function Header({isLoggedIn}) {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  console.log(location.pathname);  

  function handleMenuOpen() {
    setIsMenuOpen(true);
  }

  function handleMenuClose() {
    setIsMenuOpen(false);
  }

  const narrowMenuVisibility = (
    isMenuOpen ? 
    'header__nav_state_visible' : 
    'header__nav_state_invisible'
  )

  return (
    <header className={`header ${isLoggedIn ? 'header_color_black' : 'header_color_blue'}`}>
      <Link 
        to='/'
        className="header__logo">
        <img
          src={logo}
          alt='лого' />
      </Link>
      { isLoggedIn ? 
        <>
        <div className="header__nav_wide">
          <ul className="header__nav_movies">
            <li className="header__nav_item">
              <Link
                to="/movies"
                className={`header__link ${ location.pathname === '/movies' ? 'header_active_bold' : '' }`}>
                Movies
              </Link>
            </li>
            <li className="header__nav_item">
              <Link
                to="/saved-movies"
                className={`header__link ${ location.pathname === '/saved-movies' ? '.header_active_bold' : '' }`}>
                Saved movies
              </Link>
            </li>
          </ul>
          <Link
            to="/profile"
            className="header__link_profile">
            <span className="header__profile-icon"></span>
            <span className="header__profile-text">Profile</span>
          </Link>
        </div>

        <div className="header__nav_narrow">
          <button 
            className="header__nav-icon"
            onClick={handleMenuOpen} />
          <div className={narrowMenuVisibility}>
            <button 
              className="header__narrow_close-button"
              onClick={handleMenuClose} />
            <nav className="header__narrow_nav-container">
              <ul className="header__narrow-movie-nav">
                <li className="header__narrow-movie-item">
                  <Link
                    to="/"
                    className={`header__link_narrow ${ location.pathname === '/' ? 'header_active_underline' : '' }`}>
                    Главная
                  </Link>
                </li>
                <li className="header__narrow-movie-item">
                  <Link
                    to="/movies"
                    className={`header__link_narrow ${ location.pathname === '/movies' ? 'header_active_underline' : '' }`}>
                    Movies
                  </Link>
                </li>
                <li className="header__narrow-movie-item">
                  <Link
                    to="/saved-movies"
                    className={`header__link_narrow ${ location.pathname === '/saved-movies' ? 'header_active_underline' : '' }`}>
                    Saved movies
                  </Link>
                </li>
              </ul>
              <ul className="header__narrow-profile-nav">
                <Link
                  to="/profile"
                  className="header__narrow_link_profile">
                  <span className="header__profile-icon"></span>
                  <span className="header__profile-text">Profile</span>
                </Link>
              </ul>
            </nav>

          </div>
        </div>
          </>

      : 
        <ul className="header__nav">
          <li className="header__nav_item">
            <Link
              to="/signup"
              className="header__link_signup">
              Sign up
            </Link>
          </li>
          <li className="header__nav_item">
            <Link
              to="/signin"
              className="header__link_login">
              Sign in
            </Link>
          </li>
        </ul>
      }
    </header>
  )
}

export default Header;