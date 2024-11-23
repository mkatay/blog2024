import React from 'react';
import {ReactTyped} from "react-typed";
import './Home.css';
import { NavLink } from 'react-router-dom';
import { ParallaxBanner } from 'react-scroll-parallax';

export const Home = () => {
  return (
    <div className='home'>
    
    <div className="hero">
      <div className="hero-content">
        <h1>Fedezd fel a Világot...</h1>
        <h6>
          <ReactTyped
            strings={[
              "Oszd meg gondolataidat, és fedezd fel mások történeteit.",
              "Találd meg az inspirációt!"
            ]}
            typeSpeed={40}
          />
        </h6>
 </div>
    </div>

        <div className="cards-container">
          <div className="card" style={{ backgroundImage: `url('tech.jpg')` }}>
           <NavLink className="card-title" to='/detail'>
              Technológia
            </NavLink>
          </div>
          <div className="card" style={{ backgroundImage: `url('life.jpg')` }}>
            <a href="#about" className="card-title">Életmód</a>
          </div>
          <div className="card" style={{ backgroundImage: `url('szorakozas.jpg')` }}>
            <a href="#latest" className="card-title">Szórakozás</a>
          </div>
          <div className="card" style={{ backgroundImage: `url('konyha.jpg')` }}>
            <a href="#about" className="card-title">Konyha</a>
          </div>
        </div>
     <div className="footer">
      footer ... about me...
     </div>
    </div>
  );
};
