import React, { useState } from 'react';
import "./MainWeb.css"; 
import VioletEvergarden from "../assets/VioletEvergarden.jpg"; // นำเข้ารูปภาพ
import yourname from "../assets/yourname.jpg"
import aot1 from "../assets/Aot1.jpg"
import aot2 from "../assets/Aot2.jpg"
import aot3 from "../assets/Aot3.jpg"
import rezero from "../assets/rezero.jpg"
import Cm5 from "../assets/Cm5persec.jpg"
import evangelion from "../assets/evangelion.jpg"
import haikyuu from "../assets/Haikyuu.jpg"
import kimestu from "../assets/kimestuNoYaiba.jpg"
import dragonball from "../assets/dragonball.jpg"
import deatnote from "../assets/deatnote.jpg"
import naruto from "../assets/Naruto.jpg"
import jojo from "../assets/JOJO.jpg"
import fullmetal from "../assets/Fullmetal.jpg"
import steinsgate from "../assets/SteinsGate.jpeg"
import lovemelovenot from "../assets/Movie/lovemelovenot.jpg"
import TheMatrix from "../assets/Movie/TheMatrix.jpg"

import yournameBig from "../assets/Anime/yournamePosterBig3.png";
import ourBeLove from "../assets/Movie/ourBeLoveSummer.png";
import { useNavigate } from 'react-router-dom';
/*❤️💁🏻‍♀️🎞️✨*/

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isPosterVisible, setIsPosterVisible] = useState(false);  // เพิ่ม state สำหรับ Poster

  const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
      setIsPosterVisible(isSidebarOpen);  // แสดง Poster เมื่อ Sidebar ถูกซ่อน
  };

  const navigate = useNavigate();

  const subscription = () => {
      navigate('/subscription');
  };

  return (
      <div className="app">
          <aside className={`sidebar ${isSidebarOpen ? '' : 'hidden'}`}>
              <div className="toggle-button" onClick={toggleSidebar}>
                  {isSidebarOpen ? '⬅️' : '➡️'}
              </div>
              {isSidebarOpen && (
                  <>
                      <div className="logo">NetFlim</div>
                      <nav>
                          <ul>
                              <li className="sizeMenu">🎞️ Movie</li>

                              <a href='./Collection'>
                                <li className="sizeMenu">❤️ Collection</li>
                              </a>
                              <li className="sizeMenu">💁🏻‍♀️ About Me</li>
                              
                              <a href="/EditInformation" >
                                <li className="sizeMenu">👔 Information</li>
                              </a>
                              <a href="/History" >
                                <li className="sizeMenu">👜 History</li>
                              </a>
                              <a href="/Admin" >
                                <li className="sizeMenu">💻 Admin</li>
                              </a>
                              <button onClick={subscription} className="button-85" >✨Subscribe✨</button>
                              <a href="/" className="signup-link">🔙</a>
                          </ul>
                      </nav>
                  </>
              )}
          </aside>

          <main className={`main-content ${isSidebarOpen ? '' : 'expanded'}`}>
              <header>
                  <input type="text" placeholder="Search for movie" className="search-bar" />
                  <button className="search-button">🔍</button>
              </header>
              
              <section className="movies">
                  {isPosterVisible && (  // แสดง PosterBIG เมื่อ isPosterVisible เป็น true
                      <div className='PosterBIG'>
                        <div className='image-container'>
                          <img src={yournameBig} alt="yournameBig" />
                          <div className="text-overlay">Your Name</div>
                        </div>
                      </div>
                  )}
                  <h1 className='titile'>ANIME</h1>
                  <div className="movie-grid">
                      {/* Repeat this block for each movie */}
                      <div className="movie-card">
                        <a href='/WatchMovie'>
                          <img src={VioletEvergarden} alt="Violet Evergarden" />
                        </a>
                      </div>
                      <div className="movie-card">
                        <img src={yourname} alt="yourname" />
                      </div>
                      <div className="movie-card">
                        <img src={aot1} alt="aot1" />
                      </div>
                      <div className="movie-card">
                        <img src={aot2} alt="aot2" />
                      </div>
                      <div className="movie-card">
                        <img src={aot3} alt="aot3" />
                      </div>
                      <div className="movie-card">
                        <img src={rezero} alt="rezero" />
                      </div>
                      <div className="movie-card">
                        <img src={Cm5} alt="Cm5" />
                      </div>
                      <div className="movie-card">
                        <img src={evangelion} alt="evangelion" />
                      </div>
                      <div className="movie-card">
                        <img src={haikyuu} alt="haikyuu" />
                      </div>
                      <div className="movie-card">
                        <img src={kimestu} alt="kimestu" />
                      </div>
                      {/* Add more movie cards as needed */}
                      <div className="movie-card">
                        <img src={dragonball} alt="dragonball" />
                      </div>
                      <div className="movie-card">
                        <img src={deatnote} alt="deatnote" />
                      </div>
                      <div className="movie-card">
                        <img src={naruto} alt="naruto" />
                      </div>
                      <div className="movie-card">
                        <img src={jojo} alt="jojo" />
                      </div>
                      <div className="movie-card">
                        <img src={fullmetal} alt="fullmetal" />
                      </div>
                      <div className="movie-card">
                        <img src={steinsgate} alt="steinsgate" />
                      </div>
                  </div>
                  

                  {isPosterVisible && (  // แสดง PosterBIG เมื่อ isPosterVisible เป็น true
                      <div className='PosterBIG'>
                        <div className='image-container'>
                          <img src={ourBeLove} alt="ourBeLove" />
                          <div className="text-overlay">Our Be love Summer</div>
                        </div>
                      </div>
                  )}
                  <h1 className='titile'>MOVIE</h1>
                  <div className="movie-grid">
                    <div className="movie-card">
                        <img src={lovemelovenot} alt="lovemelovenot" />
                    </div>
                    <div className="movie-card">
                        <img src={TheMatrix} alt="TheMatrix" />
                    </div>
                  </div>
              </section>
          </main>
      </div>
  );
};

export default App;
