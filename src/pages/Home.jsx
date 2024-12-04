import React from "react";
import {ReactTyped} from "react-typed";
import { NavLink } from "react-router-dom";
import { ParallaxProvider, ParallaxBanner } from "react-scroll-parallax";
import "./Home.css";
import { useContext } from "react";
import { CategContext } from "../context/CategContext";
import { RingLoader } from "react-spinners";
import { Footer } from "../components/Footer";


export const Home = () => {
  const {categories} =useContext(CategContext)
  console.log(categories);
  
  return (
    <ParallaxProvider>
      <div className="home">
        <ParallaxBanner
          layers={[
            {
              image: "hero.jpg",
              speed: -30, // Parallax sebesség
            },
          ]}
          className="hero"
        >
          <div className="hero-content">
            <h1>Fedezd fel a Világot...</h1>
            <h6>
              <ReactTyped
                strings={[
                  "Oszd meg gondolataidat, és fedezd fel mások történeteit.",
                  "Találd meg az inspirációt!",
                ]}
                typeSpeed={40}
              />
            </h6>
          </div>
        </ParallaxBanner>

        <div className="cards-container">
          {categories ? categories.map(obj=>
            <div key={obj.name} className="mycard"style={{ backgroundImage: `url(${obj.photo})` }}>
              <NavLink className="mycard-title"     to={"/posts?sel="+obj.name}>
                {obj.name}
              </NavLink>
            </div>

          )
        : <div style={{height:'300px',width:'100%',display:'flex',justifyContent:'center'}}><RingLoader size='250px'/></div>
        }
        </div>

        <Footer/>
      </div>
    </ParallaxProvider>
  );
};
