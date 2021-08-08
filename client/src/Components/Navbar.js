import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import "../Styles/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faTwitter,
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";
export const Navbar = () => {
  return (
    <div>
      <div className='navbar'>
        <div className='nav-left'>
          <div className='logo-wrapper'>
            <img src={logo} alt='logo' />
            <div className='logo-text-wrapper'>
              <h1>
                <span className='appTitle1'>Hey</span>
                <span className='appTitle2'>Yo</span>
                <span className='appTitle3'>Talk</span>
              </h1>
            </div>
          </div>
        </div>
        <div className='nav-right'>
          <ul>
            <li className='navbar-socials'>
              <a href='https://twitter.com/varuncodes'>
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
            <li className='navbar-socials'>
              <a href='https://github.com/varunkumarnr'>
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </li>
            <li className='navbar-socials'>
              <a href='https://www.linkedin.com/in/varunkumarnr/'>
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </li>
            <li className='login-link-container'>
              <Link to='/login' className='login-link'>
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
