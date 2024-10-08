import React, { useState,useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import "./Navbar.css"

import AboutMeCom from '../../AboutMe/AboutMeCom'
//API
import { PaymentsInterface } from "../../interfaces/IMoviePackage";
import {  GetPaymentById} from "../../services/https/index"; // นำเข้า GetUserById

// popup
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { UsersInterface } from "../../interfaces/IUser";
import { GetUserById } from "../../services/https/index"; // นำเข้า GetUserById
import { message } from "antd"; // Ant Design message for notifications


export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<string | undefined>(''); // เก็บ status ของผู้ใช้
  const location = useLocation();
  const userIdstr = localStorage.getItem("id");

  const [paymentInfo, setPaymentInfo] = useState<PaymentsInterface | null>(null); // เพิ่ม state สำหรับการชำระเงิน
  useEffect(() => {
    if (userIdstr) {
      GetPaymentById(userIdstr)
        .then((response) => {
          const payment = response.data as PaymentsInterface;
          setPaymentInfo(payment); // ตั้งค่าข้อมูลการชำระเงิน
        })
        .catch((error) => {
          console.error('มีข้อผิดพลาดในการดึงข้อมูลการชำระเงิน:', error);
        });
    }
  }, [userIdstr]);
  const notify = () => toast('💸 Please subscribe!', {
    position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
  });

  useEffect(() => {//โหลดข้อมูลของผู้ใช้และเอาแค่ status
    if (userIdstr) {
      GetUserById(userIdstr)
        .then((response) => {
          const user = response.data as UsersInterface;
          setStatus(user.status); // ตั้งค่าสถานะของผู้ใช้
        })
        .catch((error) => {
          console.error('มีข้อผิดพลาดในการดึงข้อมูลผู้ใช้:', error);
        });
    }
  }, [userIdstr]);
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

  //=================================Login out=================================
  const Logout = () => {

    localStorage.clear();

    message.success("Logout successful");

    setTimeout(() => {
      navigate("/");
    }, 2000);

  };


  return (
    <>
    <div className={`sidebarComponent ${location.pathname === "/History" ? "active" : ""}`}>
      <div className="logoComponent"></div>
      <nav>
        <ul>
          {/*หาก location.pathname ตรงกับ "/EditInformation", จะเพิ่มคลาส active ให้กับไอคอนนั้น sidebarComponent*/}
          <Link to="/MainWeb">
            <li className={`sizeMenuComponent ${location.pathname === "/MainWeb" ? "active" : ""}`}>🎞️<span className='Navtext'>Movie</span></li>
          </Link>
          <li className={`sizeMenuComponent ${isPopupOpen ? "active" : ""}`} onClick={openPopup}>💁🏻‍♀️<span className='Navtext'>About Me</span></li>

          {paymentInfo ? (
            <>
            <Link to="/Collection">
              <li className={`sizeMenuComponent ${location.pathname === "/Collection" ? "active" : ""}`}>❤️<span className='Navtext'>Collection</span></li>
            </Link>
            </>
          ) : ( 
            <li onClick={notify} className="sizeMenuComponent">❤️<span className='Navtext'>Movie</span></li>
          )}
          <Link to="/EditInformation">
            <li className={`sizeMenuComponent ${location.pathname === "/EditInformation" ? "active" : ""}`}>👔<span className='Navtext'>Edit Information</span></li>
          </Link>
          <Link to="/History">
            <li className={`sizeMenuComponent ${location.pathname === "/History" ? "active" : ""}`}>👜<span className='Navtext'>History</span></li>
          </Link>
          {status === 'Admin' && (
          <Link to="/Admin">
            <li className={`sizeMenuComponent ${location.pathname === "/Admin" ? "active" : ""}`}>💻<span className='Navtext'>Admin</span></li>
          </Link>)}
          
            <li onClick={Logout} className="sizeMenuComponent">🔙<span className='Navtext'>Log out!!!</span></li>
          
        </ul>
      </nav>
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <AboutMeCom />
            <button className="payment-button" onClick={Edit}>Edit your Information</button>
            <button className="close-button" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
    <ToastContainer/>
    </>
  )
}
