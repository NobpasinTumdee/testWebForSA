import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Navbar.css"
// about me
import { DataUser } from '../AboutMe/DataUser';
import userPhoto from '../assets/icon/User.png';

export const Navbar: React.FC = () => {
    const navigate = useNavigate();
    // popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const Edit = () => {
    navigate("/EditInformation")
    setIsPopupOpen(false);
  }
    return (
        <div className="sidebarComponent">
            <div className="logoComponent"></div>
            <nav>
                <ul>
                    <div  >
                    <a href='./MainWeb'>
                        <li className="sizeMenuComponent">🎞️</li>
                    </a>
                    </div>
                    <a href='./Collection'>
                        <li className="sizeMenuComponent">❤️</li>
                    </a>
                    <a href='#' onClick={() => openPopup()}>
                        <li className="sizeMenuComponent">💁🏻‍♀️</li>
                    </a>
                    <a href="/EditInformation" >
                        <li className="sizeMenuComponent">👔</li>
                    </a>
                    <a href="/History" >
                        <li className="sizeMenuComponent">👜</li>
                    </a>
                    <a href="/Admin" >
                        <li className="sizeMenuComponent">💻</li>
                    </a>
                    <a href="/" className="signup-link">🔙</a>
                </ul>
            </nav>
        {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            {DataUser.map((User) => (

              <div  key={User.id}>
                <img src={userPhoto} className='imgAboutME' />
                <div className='dataAboutME'>
                  <div>Name : {User.USERNAME}</div>
                  <div>Gmail : {User.Gmail}</div>
                  <div>Duration : {User.Duration}</div>
                  <div>Expire : {User.Expire}</div>
                </div>
              </div>))}
            <button className="payment-button" onClick={() => Edit()}> Edit your Information </button>
            <button className="close-button" onClick={() => closePopup()}> Close </button>
          </div>
        </div>
      )}

        </div>
    )
}

