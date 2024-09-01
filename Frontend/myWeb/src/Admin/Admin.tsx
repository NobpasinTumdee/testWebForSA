import React, { useState, useEffect } from 'react';
import './Admin.css';
import VioletEvergarden from "../assets/VioletEvergarden.jpg";
import rezero from "../assets/rezero.jpg"
import Cm5 from "../assets/Cm5persec.jpg"
import icon from "../assets/icon/EditIcon.png"
import fullmetal from "../assets/Fullmetal.jpg"

import { PopUpAdmin } from '../Component/PopUpAdmin';

import { Loading } from '../Component/Loading/Loading';

const movies = [
  {
    id: 1,
    title: 'Violet Evergarden',
    description: 'A touching story about a young girl who used to be a weapon...',
    date: '15/July/2024',
    image: VioletEvergarden,
  },
  {
    id: 2,
    title: 'Haikyuu!!',
    description: 'An inspiring sports anime about volleyball...',
    date: '15/July/2024',
    image: rezero,
  },
  {
    id: 3,
    title: 'Bocchi the Rock!',
    description: 'A story of a shy girl who starts a rock band...',
    date: '15/July/2024',
    image: Cm5,
  },
  {
    id: 4,
    title: 'Fullmetal',
    description: 'A story of a shy girl who starts a rock band...',
    date: '15/July/2024',
    image: fullmetal,
  },
  //...other movies
];

const AdminManageMovies: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };


  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300)
  })


  return (
    <>
      {isLoading ? (<div style={{
        position: 'fixed', top: '50%', left: '55%', marginTop: '-50px', marginLeft: '-100px'
      }}><Loading /></div>) : (
        <div className="admin-container">
          <h1 className="admin-title">ADMIN</h1>
          <div className="movies-list">
            {movies.map((movie) => (
              <div className="movie-card-Adminpage" key={movie.id}>
                <img src={movie.image} alt={movie.title} className="movie-image" />
                <div className="movie-info">
                  <h2>{movie.title}</h2>
                  <p>{movie.description}</p>
                  <p>Date: {movie.date}</p>
                </div>
                <button className="edit-button" onClick={openPopup}>
                  <img src={icon} className='edit-icon-Admin' alt="Edit Icon" />
                </button>
              </div>
            ))}
          </div>
          <a href="/MainWeb" className="return-button-Admin">Return to home page</a>

          {isPopupOpen && (
            <div className='popup-container'>
              <PopUpAdmin />
              <button onClick={closePopup} className="close-popup-button">
                Close
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AdminManageMovies;
