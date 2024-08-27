import React, { useState } from 'react';
import "./MainWeb.css"; 

import Xmen from "../assets/Movie/xmen.jpg"
import yournameBig from "../assets/Anime/yournamePosterBig3.png";

import { useNavigate } from 'react-router-dom';
/*❤️💁🏻‍♀️🎞️✨*/

import { AnimesMain, moviesMain } from "./DataMovie";



const MainWeb: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isPosterVisible, setIsPosterVisible] = useState(false);  // เพิ่ม state สำหรับ Poster

  const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
      setIsPosterVisible(isSidebarOpen);  // แสดง Poster เมื่อ Sidebar ถูกซ่อน l
  };

  const navigate = useNavigate();

  const subscription = () => {
      navigate('/subscription');
  };
  
  const handleMovieClick = (movie: { id: number; title: string; image: string }) => {
    navigate('/WatchMovie', { state: movie });
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
                              <div  onClick={toggleSidebar}>
                                <li className="sizeMenu">🎞️ Movie</li>
                              </div>
                              <a href='./Collection'>
                                <li className="sizeMenu">❤️ Collection</li>
                              </a>
                              <a href='./AboutMe'>
                                <li className="sizeMenu">💁🏻‍♀️ About Me</li>
                              </a>
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
                      {AnimesMain.map((movies) => (
                      <div className="movie-card"  key={movies.id} onClick={() => handleMovieClick(movies)}>
                        
                          <img src={movies.image} alt={movies.title} />
                        
                      </div>))}
                  </div>
                  

                  {isPosterVisible && (  // แสดง PosterBIG เมื่อ isPosterVisible เป็น true
                      <div className='PosterBIG'>
                        <div className='image-container'>
                          <img src={Xmen} alt="Xmen" />
                          <div className="text-overlay">X MEN</div>
                        </div>
                      </div>
                  )}


                  <h1 className='titile'>MOVIE</h1>
                  <div className="movie-grid">
                      {/* Repeat this block for each movie */}
                      {moviesMain.map((movies) => (
                      <div className="movie-card"  key={movies.id} onClick={() => handleMovieClick(movies)}>
                        
                          <img src={movies.image} alt={movies.title} />
                        
                      </div>))}
                  </div>

              </section>
          </main>
      </div>
  );
};

export default MainWeb;
