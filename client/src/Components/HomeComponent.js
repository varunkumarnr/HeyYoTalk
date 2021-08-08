import React from "react";
import HomeScreen from "../images/homescreen.png";
import "../Styles/Home.css";
import { Navbar } from "./Navbar";
import { Link } from "react-router-dom";
import { Footer } from "./Footer";
export const HomeComponent = () => {
  return (
    <div>
      <div className='HomePage-container'>
        <Navbar />
        <div className='HomePage-content'>
          <h1>Are you afraid of Microsoft buying out Discord?!</h1>
          <p>
            Presenting All-in-One voice, text-chat for gamers and nerds, its
            free, its secure, it works(sometimes), and its open source. Time to
            say bye to corporate companies, simplify your life with
            <span> HeyYoTalk</span>
          </p>
          <div id='content-buttons'>
            <a href='https://github.com/varunkumarnr/HeyYoTalk'>
              <button>Open HeyYoTalk on Github</button>
            </a>
            <Link to='/register'>
              <button>Register</button>
            </Link>
          </div>
        </div>
        <div className='HomePage-Image-container'>
          <img className='Home-image' src={HomeScreen} alt='home screen' />
        </div>
        <Footer />
      </div>
    </div>
  );
};
