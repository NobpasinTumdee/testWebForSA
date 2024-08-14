import React from 'react';
import './WatchMovie.css';
import VioletEvergarden from "../assets/VioletEvergarden.jpg"; // นำเข้ารูปภาพ

const WatchMovie: React.FC = () => {
  return (
    <div className="watch-movie-container">
      <div className="movie-header">
        Violet Evergarden
      </div>
      <div className="movie-content">
        <div className="movie-player">
          <iframe
            src="https://www.youtube.com/embed/BUfSen2rYQs?si=hAdWNkFA_nHak6DH"
            allowFullScreen
          ></iframe>
        </div>
        <div className="movie-info">
          <img src={VioletEvergarden} alt="Movie Poster" className="movie-poster" />
          <div className="info">
            <h2>Movie information</h2>
            <p>The Great War finally came to an end after four long years of conflict; fractured in two, the continent of Telesis slowly began to flourish once again. Caught up in the bloodshed was Violet Evergarden, a young girl raised for the sole purpose of decimating enemy lines.</p>
          </div>
        </div>
      </div>
      <a  href="/MainWeb"  className="return-button">Return to home page</a>
    </div>
  );
};

export default WatchMovie;
