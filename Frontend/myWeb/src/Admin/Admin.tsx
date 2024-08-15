import React from 'react';
import './Admin.css';
import VioletEvergarden from "../assets/VioletEvergarden.jpg";
import rezero from "../assets/rezero.jpg"
import Cm5 from "../assets/Cm5persec.jpg"
import icon from "../assets/icon/EditIcon.png"
import fullmetal from "../assets/Fullmetal.jpg"

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
    title: 'fullmetal',
    description: 'A story of a shy girl who starts a rock band...',
    date: '15/July/2024',
    image: fullmetal,
  },
  {
    id: 5,
    title: 'fullmetal',
    description: 'A story of a shy girl who starts a rock band...',
    date: '15/July/2024',
    image: fullmetal,
  },
  {
    id: 6,
    title: 'fullmetal',
    description: 'A story of a shy girl who starts a rock band...',
    date: '15/July/2024',
    image: fullmetal,
  },
  {
    id: 7,
    title: 'fullmetal',
    description: 'A story of a shy girl who starts a rock band...',
    date: '15/July/2024',
    image: fullmetal,
  },
];

const AdminManageMovies: React.FC = () => {
  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin</h1>
      <div className="movies-list">
        {movies.map((movie) => (
          <div className="movie-card-Adminpage" key={movie.id}>
            <img src={movie.image} alt={movie.title} className="movie-image" />
            <div className="movie-info">
              <h2>{movie.title}</h2>
              <p>{movie.description}</p>
              <p>Date: {movie.date}</p>
            </div>
            <button className="edit-button">
              <img src={icon} className='edit-icon-Admin'></img>
            </button>
          </div>
        ))}
        
      </div>
      <a  href="/MainWeb"  className="return-button-Admin">Return to home page</a>
    </div>
  );
};

export default AdminManageMovies;
