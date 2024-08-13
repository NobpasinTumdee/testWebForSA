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

/*❤️💁🏻‍♀️🎞️✨*/

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
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
                              <li className="sizeMenu">❤️ Favorite</li>
                              <li className="sizeMenu">💁🏻‍♀️ About You</li>
                              <li className="subscribe">✨Subscribe</li>
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
                  <h1>MOVIE</h1>
                  <div className="movie-grid">
                      {/* Repeat this block for each movie */}
                      <div className="movie-card">
                        <img src={VioletEvergarden} alt="Violet Evergarden" />
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
                      {/* Add more movie cards as needed */}
                  </div>
                  <div className="movie-grid">
                      {/* Repeat this block for each movie */}
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
                  </div>
              </section>
          </main>
      </div>
  );
};

export default App;