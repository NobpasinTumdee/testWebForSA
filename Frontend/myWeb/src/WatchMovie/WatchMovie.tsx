import React from 'react';
import './WatchMovie.css';

import {  useLocation } from 'react-router-dom';



  
const WatchMovie: React.FC = () => {

  const location = useLocation();
  const movie = location.state as { id: number; title: string; image: string; link: string};

  return (
    <div className="watch-movie-container">
      <div className="movie-header">
        {movie.title}
        <button className="edit-button">
          ❤️
        </button>
      </div>
      <div className="movie-content">
        <div className="movie-player">
          <iframe
            src={movie.link}
            allowFullScreen
          />
        </div>
        <div className="movie-infoWatch">
          <img src={movie.image} alt={movie.title} className="movie-poster" />
          <div className="info">
            <h2>Movie information</h2>
            <p>The Great War finally came to an end after four long years of conflict; fractured in two, the continent of Telesis slowly began to flourish once again. Caught up in the bloodshed was Violet Evergarden, a young girl raised for the sole purpose of decimating enemy lines.</p>
          </div>
        </div>
      </div>
      <a  href="/MainWeb"  className="return-button-watch">Return to home page</a>
    </div>
  );
};

export default WatchMovie;