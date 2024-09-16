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
import { MovieInterface , PaymentsInterface } from "../interfaces/IMoviePackage";
import { UsersInterface } from "../interfaces/IUser";
import axios from 'axios';
import {CreateHistory} from "../services/https/index"
import { GetUserById , GetPaymentById} from "../services/https/index"; // นำเข้า GetUserById


// popup
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//import Carousels from "../Component/Carousels/Carousels";
const MainWeb: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isPosterVisible, setIsPosterVisible] = useState(false);  // เพิ่ม state สำหรับ Poster
  const [status, setStatus] = useState<string | undefined>(''); // เก็บ status ของผู้ใช้
  const userIdstr = localStorage.getItem("id");
  const [paymentInfo, setPaymentInfo] = useState<PaymentsInterface | null>(null); // เพิ่ม state สำหรับการชำระเงิน
  const [isLoading, setLoading] = useState(true);
  


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000)
  })

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

  // ฟังก์ชันค้นหาหนัง
  const [isSearchresults, setSearchresults] = useState(false);
  const searchMovies = () => {
    const Authorization = localStorage.getItem("token");
    const Bearer = localStorage.getItem("token_type");

    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${Bearer} ${Authorization}`,
      },
    };

    axios.get<MovieInterface[]>(`http://localhost:8000/ListsearchMovies?filter=${searchQuery}`, requestOptions)
  .then(response => {
    console.log(response.data);
    setMovies(response.data);
    setSearchresults(true);
  })
  .catch(error => {
    console.error("Error fetching movies:", error);
  });

  };

  // เก็บค่าคำค้นหา
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [Moviess, setMovies] = useState<MovieInterface[]>([]); // API
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); // เก็บค่าจากช่องค้นหา
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้า
    searchMovies(); // เรียกฟังก์ชันค้นหาหนัง
  };

  // if (isLoading) {
  //   return <LoadingScreen />; // แสดง LoadingScreen ขณะที่ isLoading เป็น true
  // }
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
                    {paymentInfo ? (
                      <>
                        <a href='./Collection'>
                          <li className="sizeMenu">❤️ Collection</li>
                        </a>
                      </>
                    ) : ( 
                      <>
                        <a onClick={notify}>
                          <li className="sizeMenu">❤️ Collection</li>
                        </a>
                      </>
                    )}
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
            <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search for movie"
                  className="search-bar"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                />
                <button type="submit" className="search-button">🔍</button>
              </form>
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
              {isSearchresults && (
  <>
    {paymentInfo ? (
      <>
        <h3 className='titile'>Search results</h3>
        <div className="movie-grid">
          {Moviess.map((movie) => (
            <div className="movie-card" key={movie.ID} onClick={() => handleMovieClick(movie)}>
              <img src={movie.Movie_poster} alt={movie.Movie_name} />
            </div>
          ))}
        </div>
      </>
    ) : (
      <>
        <h1 className='titile'>Search results</h1>
        <h1 style={{color: "#ffff"}}>Please subscribe before watching the movie✨</h1>
        <div className="movie-grid">
          {Moviess.map((movie) => (
            <div className="movie-card" key={movie.ID} onClick={notify}>
              <img src={movie.Movie_poster} alt={movie.Movie_name} />
            </div>
          ))}
        </div>
      </>
    )}
  </>
)}


              {paymentInfo ? (
                <>
                  <h1 className='titile'>ANIME</h1>
                  <div className="movie-grid">
                    {Movies.map((movie) => (
                      <div className="movie-card" key={movie.ID} onClick={() => handleMovieClick(movie)}>
                        <img src={movie.Movie_poster} alt={movie.Movie_name} />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                {/* <h1 className='titile'>Please subscribe before watching the the movie✨</h1>
                <img style={{width: '20%' , margin: '40px 40% '}} src='https://media.tenor.com/Comp_iIhz44AAAAi/yui-yui-hirasawa.gif' /> */}
                  <h1 className='titile'>ANIME</h1>
                  <h1 style={{color: "#ffff"}}>Please subscribe before watching the the movie✨</h1>
                  <div className="movie-grid">
                    {Movies.map((movie) => (
                      <div className="movie-card" key={movie.ID} onClick={notify}>
                        <img src={movie.Movie_poster} alt={movie.Movie_name} />
                      </div>
                    ))}
                  </div>
                </>
              )}


              {isPosterVisible && (  // แสดง PosterBIG เมื่อ isPosterVisible เป็น true
                <div className='PosterBIG'>
                  <div className='image-container'>
                    <img src={Xmen} alt="Xmen" />
                    <div className="text-overlay">X MEN</div>
                  </div>
                </div>
              )}

            {paymentInfo && (<>
              <h1 className='titile'>MOVIE</h1>
              <div className="movie-grid">
                {/* Repeat this block for each movie */}
                {moviesMain.map((movies) => (
                  <div className="movie-card" key={movies.id} onClick={() => handleMovieClick1(movies)}>

                    <img src={movies.image} alt={movies.title} />

                  </div>))}
              </div></>
            )}

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
          <ToastContainer/>
    </>
  );
};

export default MainWeb;
