import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import "./Navbar.css"
// about me
import { DataUser } from '../../AboutMe/DataUser';
import userPhoto from './User.png';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const location = useLocation();

  // popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const Edit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/EditInformation");
    setIsPopupOpen(false);
  }


  return (
    <div className="sidebarComponent">
      <div className="logoComponent"></div>
      <nav>
        <ul>
          {/*หาก location.pathname ตรงกับ "/EditInformation", จะเพิ่มคลาส active ให้กับไอคอนนั้น*/}
          <Link to="/MainWeb">
            <li className={`sizeMenuComponent ${location.pathname === "/MainWeb" ? "active" : ""}`}>🎞️</li>
          </Link>
          <li className={`sizeMenuComponent ${isPopupOpen ? "active" : ""}`} onClick={openPopup}>💁🏻‍♀️</li>
          <Link to="/Collection">
            <li className={`sizeMenuComponent ${location.pathname === "/Collection" ? "active" : ""}`}>❤️</li>
          </Link>
          <Link to="/EditInformation">
            <li className={`sizeMenuComponent ${location.pathname === "/EditInformation" ? "active" : ""}`}>👔</li>
          </Link>
          <Link to="/History">
            <li className={`sizeMenuComponent ${location.pathname === "/History" ? "active" : ""}`}>👜</li>
          </Link>
          <Link to="/Admin">
            <li className={`sizeMenuComponent ${location.pathname === "/Admin" ? "active" : ""}`}>💻</li>
          </Link>
          <Link to="/">
            <li className="sizeMenuComponent">🔙</li>
          </Link>
        </ul>
      </nav>
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            {DataUser.map((User) => (
              <div key={User.id}>
                <img src={userPhoto} className='imgAboutME' />
                <div className='dataAboutME'>
                  <div>Name : {User.USERNAME}</div>
                  <div>Gmail : {User.Gmail}</div>
                  <div>Duration : {User.Duration}</div>
                  <div>Expire : {User.Expire}</div>
                </div>
              </div>
            ))}
            <button className="payment-button" onClick={Edit}>Edit your Information</button>
            <button className="close-button" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}
