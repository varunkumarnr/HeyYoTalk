import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Footer.css";
export const Footer = () => {
  return (
    <div className='footer-container'>
      <div className='footer'>
        <div id='left-footer'>
          <h2>Ready to try HeyYoTalk? It's free!</h2>
          <p>Join over a community of 10 gamers.</p>
        </div>
        <div id='right-footer'>
          <Link to='/signup'>
            <button>Sign Up Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
