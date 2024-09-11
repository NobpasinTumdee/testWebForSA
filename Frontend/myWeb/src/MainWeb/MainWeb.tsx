import React, { useState, useEffect } from 'react';
import "./MainWeb.css";

//โปสเตอร์
import Xmen from "../assets/Movie/xmen.jpg"
import yournameBig from "../assets/Anime/yournamePosterBig4.png";


import { useNavigate } from 'react-router-dom';
/*❤️💁🏻‍♀️🎞️✨*/
import {UsertopRigh} from '../Component/UsertopRigh/UsertopRigh';

// ข้อมูลหนัง และ อนิเมะ
import {  moviesMain } from "./DataMovie";

import AboutMeCom from '../AboutMe/AboutMeCom'

import { LoadingStarWar } from '../Component/Loading/LoadingStarWar';

//API
import { MovieInterface } from "../interfaces/IMoviePackage";
import { UsersInterface } from "../interfaces/IUser";
import axios from 'axios';
import {CreateHistory} from "../services/https/index"
import { GetUserById } from "../services/https/index"; // นำเข้า GetUserById

//import Carousels from "../Component/Carousels/Carousels";
const MainWeb: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isPosterVisible, setIsPosterVisible] = useState(false);  // เพิ่ม state สำหรับ Poster
  const [status, setStatus] = useState<string | undefined>(''); // เก็บ status ของผู้ใช้
  const userIdstr = localStorage.getItem("id");
  
  const [isLoading, setLoading] = useState(true);


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000)
  })

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
  const handleMovieClick1 = (movie: { id: number; title: string; image: string }) => {
    navigate('/WatchMovie', { state: movie });
  };
  const handleMovieClick = (movie: MovieInterface) => {
    // เรียกใช้ฟังก์ชัน CreateHistory เมื่อผู้ใช้คลิกหนัง
    if (userIdstr && movie.ID) {
      const historyData = {
        UserID: parseInt(userIdstr), // เปลี่ยน string เป็น number
        MovieID: movie.ID,
        movie_name: movie.Movie_name,
        poster: movie.Movie_poster,
        new: Date().toString() // เพิ่มวันที่ในรูปแบบ ISO string
      };
      CreateHistory(historyData);
    }
    
    navigate('/WatchMovie', { 
      state: { 
        videoUrl: movie.Movie_video, 
        movieName: movie.Movie_name, 
        Movie_poster: movie.Movie_poster, 
        Movie_information: movie.Movie_information 
      } 
    });
  };

  // if (isLoading) {
  //   return <LoadingScreen />; // แสดง LoadingScreen ขณะที่ isLoading เป็น true
  // }

  return (
    <>
      {isLoading ? (<div style={{
        position: 'fixed', top: '50%', left: '55%', marginTop: '-50px', marginLeft: '-100px'
      }}><LoadingStarWar /></div>) : (
        <div className="app">{status !== 'Admin' && ( <UsertopRigh />)}
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
                    <a  onClick={() => openPopup()}>
                      <li className="sizeMenu">💁🏻‍♀️ About Me</li>
                    </a>
                    <a href="/EditInformation" >
                      <li className="sizeMenu">👔 Information</li>
                    </a>
                    <a href="/History" >
                      <li className="sizeMenu">👜 History</li>
                    </a>
                    {status === 'Admin' && ( //ใช่Adminอะป่าว
                      <a href="/Admin">
                        <li className="sizeMenu">💻 Admin</li>
                      </a>
                    )}
                    {status !== 'Admin' && ( //ใช่Adminอะป่าว
                    <button onClick={subscription} className="button-85" >✨Subscribe✨</button>)}
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
                {Movies.map((movie) => (
                  <div className="movie-card" key={movie.ID} onClick={() => handleMovieClick(movie)}>

                    <img src={movie.Movie_poster} alt={movie.Movie_name} />

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
                  <div className="movie-card" key={movies.id} onClick={() => handleMovieClick1(movies)}>

                    <img src={movies.image} alt={movies.title} />

                  </div>))}
              </div>

            </section>
          </main>
          {isPopupOpen && (
            <div className="popup-overlay">
              <div className="popup-content">
                {/* {DataUser.map((User) => (

                  <div key={User.id}>
                    <img src={userPhoto} className='imgAboutME' />
                    <div className='dataAboutME'>
                      <div>Name : {User.USERNAME}</div>
                      <div>Gmail : {User.Gmail}</div>
                      <div>Duration : {User.Duration}</div>
                      <div>Expire : {User.Expire}</div>
                    </div>
                  </div>))} */}
                <AboutMeCom />
                <button className="payment-button" onClick={() => Edit()}> Edit your Information </button>
                <button className="close-button" onClick={() => closePopup()}> Close </button>
              </div>
            </div>
          )}

        </div>
      )}
    </>
  );
};

export default MainWeb;
