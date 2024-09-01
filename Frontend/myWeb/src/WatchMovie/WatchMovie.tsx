import React from 'react';
import './WatchMovie.css';

import {  useLocation } from 'react-router-dom';

//loveBTN
import { LoveBtn } from '../Component/LoveBtn/LoveBtn';


  
const WatchMovie: React.FC = () => {

  const location = useLocation();
  const movie = location.state as { id: number; title: string; image: string; link: string};

  return (
    <div className="watch-movie-container">
      <div className="movie-header">
        {movie.title}
        <LoveBtn />
      </div>
      <div className="movie-content">
        <div className="movie-player">
          <iframe
            src={movie.link}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <div className="movie-infoWatch">
          <img src={movie.image} alt={movie.title} className="movie-poster" />
          <div className="info">
            <h2>Movie information</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis totam et autem inventore aliquam nisi nemo in eos blanditiis odit repellendus corporis tenetur repellat, quasi, magni sunt beatae maiores. Error incidunt earum repudiandae dolore? Nostrum eveniet animi fuga alias iusto velit, aut officiis accusantium quam impedit tenetur excepturi facilis numquam.</p>
          </div>
        </div>
      </div>
      <a  href="/MainWeb"  className="return-button-watch">Return to home page</a>
    </div>
  );
};

export default WatchMovie;