import React, { useState, useEffect } from 'react';
import './Admin.css';
import icon from "../assets/icon/EditIcon.png"

import { PopUpAdmin } from '../Component/PopUpAdmin';
import LoadingScreen from '../Component/Loading/LoadingScreen';


//API
import { MovieInterface } from "../interfaces/IMoviePackage";
import axios from 'axios';




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
    }, 1500)
  })
  const [Movies, setMovie] = useState<MovieInterface[]>([]); //API
  useEffect(() => {
    const Authorization = localStorage.getItem("token");
    const Bearer = localStorage.getItem("token_type");

    const requestOptions = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `${Bearer} ${Authorization}`,
        },
    };

    axios.get<MovieInterface[]>('http://localhost:8000/Movies', requestOptions)
        .then(response => {
            console.log(response.data);
            setMovie(response.data);
        })
        .catch(error => {
            console.error('มีข้อผิดพลาดในการดึงข้อมูล:', error);
        });
  }, []);


  return (
    <>
      {isLoading ? (<div style={{
        backgroundColor: '#674636'
      }}><LoadingScreen /></div>) : (
        <div className="admin-container">
          <h1 className="admin-title">ADMIN</h1>
          <div className="movies-list">
            {Movies.map((movie) => (
              <div className="movie-card-Adminpage" key={movie.id}>
                <img src={movie.Movie_poster} alt={movie.Movie_name} className="movie-image" />
                <div className="movie-info">
                  <h2>{movie.Movie_name}</h2>
                  <p style={{color: "green"}}>length: {movie.Movie_length} minute.</p>
                  <p>description: {movie.Movie_information}</p>
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
