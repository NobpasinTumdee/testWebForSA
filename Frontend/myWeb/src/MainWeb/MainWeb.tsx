import React, {  useState } from 'react';
import "./MainWeb.css";

//โปสเตอร์
import Xmen from "../assets/Movie/xmen.jpg"
import yournameBig from "../assets/Anime/yournamePosterBig3.png";


import { useNavigate } from 'react-router-dom';
/*❤️💁🏻‍♀️🎞️✨*/


// ข้อมูลหนัง และ อนิเมะ
import { AnimesMain, moviesMain } from "./DataMovie";

// about me
import { DataUser } from '../AboutMe/DataUser';
import userPhoto from '../assets/icon/User.png';

//loadingScren
//import {LoadingScreen} from '../Component/LoadingScreen';

const MainWeb: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isPosterVisible, setIsPosterVisible] = useState(false);  // เพิ่ม state สำหรับ Poster


  //loading
  // const [isLoading, setIsLoading] = useState(true); // State สำหรับการแสดง LoadingScreen
  // useEffect(() => {
  //   // จำลองการโหลดข้อมูลหรือทำงานบางอย่างก่อนจะโหลดหน้าเว็บ
  //   const timer = setTimeout(() => {
  //     setIsLoading(false); // หลังจากโหลดเสร็จแล้ว ให้เปลี่ยนสถานะการโหลดเป็น false
  //   }, 500); // ระยะเวลา 2 วินาที (2000 มิลลิวินาที)

  //   return () => clearTimeout(timer); // ล้าง timer เมื่อ component ถูกยกเลิกการใช้งาน
  // }, []);



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
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsPosterVisible(isSidebarOpen);  // แสดง Poster เมื่อ Sidebar ถูกซ่อน l
  };

  const navigate = useNavigate();

  const subscription = () => {
    navigate('/subscription');
  };

  // ข้อมูล หนัง อนิเมะ
  const handleMovieClick = (movie: { id: number; title: string; image: string }) => {
    navigate('/WatchMovie', { state: movie });
  };

  // if (isLoading) {
  //   return <LoadingScreen />; // แสดง LoadingScreen ขณะที่ isLoading เป็น true
  // }

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
                <div onClick={toggleSidebar}>
                  <li className="sizeMenu">🎞️ Movie</li>
                </div>
                <a href='./Collection'>
                  <li className="sizeMenu">❤️ Collection</li>
                </a>
                <a href='#' onClick={() => openPopup()}>
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
              <div className="movie-card" key={movies.id} onClick={() => handleMovieClick(movies)}>

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
              <div className="movie-card" key={movies.id} onClick={() => handleMovieClick(movies)}>

                <img src={movies.image} alt={movies.title} />

              </div>))}
          </div>

        </section>
      </main>
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
  );
};

export default MainWeb;
