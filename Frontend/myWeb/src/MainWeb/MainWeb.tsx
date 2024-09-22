import React, { useState, useEffect,useRef } from 'react';
import "./MainWeb.css"; //mainBranch

//โปสเตอร์
//import Xmen from "../assets/Movie/xmen.jpg"
import yournameBig from "../assets/Anime/yournamePosterBig4.png";
import Adverties from "../assets/Anime/PosterAdverties.png";

import { useNavigate } from 'react-router-dom';
/*❤️💁🏻‍♀️🎞️✨*/
import {UsertopRigh} from '../Component/UsertopRigh/UsertopRigh';
import {CommentCom} from '../Comment/ComponentComment/CommentCom';
// ข้อมูลหนัง และ อนิเมะ
//import {  moviesMain } from "./DataMovie";

import AboutMeCom from '../AboutMe/AboutMeCom'

import { LoadingStarWar } from '../Component/Loading/LoadingStarWar';

//API
import { MovieInterface , PaymentsInterface } from "../interfaces/IMoviePackage";
import { UsersInterface } from "../interfaces/IUser";
import axios from 'axios';
import {CreateHistory} from "../services/https/index"
import { GetUserById , GetPaymentById ,DeletePaymenteByidUser} from "../services/https/index"; // นำเข้า GetUserById


// popup
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { message } from "antd"; // Ant Design message for notifications


//audio
import lofi from '../assets/audio/SwaytoMyBeat.mp3';
//import Carousels from "../Component/Carousels/Carousels";

//IncognitoMode
import {IncognitoMode} from './IncognitoMode';

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
          console.error('An error occurred while retrieving payment information:', error);
        });
    }
  }, [userIdstr]);


  //======================================= ตรวจสอบวันหมดอายุสมาชิก ===============================================
  const [history, setHistorypay] = useState<PaymentsInterface[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    if (userIdstr) {
      fetchUserData(userIdstr);
    } else {

    }
  }, [userIdstr]);

  const fetchUserData = async (userIdstr: string) => {
    try {
      const res = await GetPaymentById(userIdstr);
      setHistorypay(res.status === 200 && res.data ? res.data : []);
    } catch {
      setHistorypay([]);
    }
  };

  useEffect(() => {
    if (history.length > 0) {
      const { DateP, Expiration } = history[0];
      if (DateP && Expiration && DateP > Expiration && userIdstr) {
        setIsDeleting(true);
        message.error("Your membership has expired.");
        setTimeout(() => {
          if (isDeleting) {
            DeletePaymenteByidUser(userIdstr)
              .then(() => {
                setPaymentInfo(null); // assuming `setPaymentInfo` is defined elsewhere
              })
              .catch(error => console.error('Error deleting payment info:', error))
              .finally(() => setIsDeleting(false));
          }
        }, 3000);
      }
    }
  }, [history, userIdstr, isDeleting]);
  
  
  
  
  

  useEffect(() => {//โหลดข้อมูลของผู้ใช้และเอาแค่ status
    if (userIdstr) {
      GetUserById(userIdstr)
        .then((response) => {
          const user = response.data as UsersInterface;
          setStatus(user.status); // ตั้งค่าสถานะของผู้ใช้
        })
        .catch((error) => {
          console.error('An error occurred while retrieving user information:', error);
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
            console.error('An error occurred while retrieving data:', error);
        });
  }, []);



  //========================================================== popup ========================================================
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

  //======================================================= ข้อมูล หนัง อนิเมะ ===================================================
  // const handleMovieClick1 = (movie: { id: number; title: string; image: string }) => {
  //   navigate('/WatchMovie', { state: movie });
  // };
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
        IDMOVIE: movie.ID,
        videoUrl: movie.Movie_video, 
        movieName: movie.Movie_name, 
        Movie_poster: movie.Movie_poster, 
        Movie_information: movie.Movie_information 
      } 
    });
  };

  //=================================================== ฟังก์ชันค้นหาหนัง ======================================================
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


  //=================================================== Login out ============================================
  const Logout = () => {

    localStorage.clear();

    message.success("Logout successful");

    setTimeout(() => {

      location.href = "/";

    }, 1000);

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

  //==================================================== โฆษณา ===========================================
  const [isAdver, setAdver] = useState(false);

useEffect(() => {
  const timer = setTimeout(() => {
    handleAdver(); // เรียกใช้ฟังก์ชัน
  }, 3000); // รอ 2 วินาที (2000 มิลลิวินาที)

  return () => clearTimeout(timer); // ทำการล้าง timer เมื่อคอมโพเนนต์ถูก unmount
}, []); // ใช้ dependency array เพื่อให้ useEffect ทำงานครั้งเดียว

const handleAdver = () => {
  setAdver(!isAdver);
};


  //==============================================เปิดเพลงหน้าหลัก====================================
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3); // ตั้งค่าเริ่มต้นที่ 0.3 (30%)
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // ตั้งค่า volume ของ audio element ตอนเริ่มต้น component
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // ตั้งค่า volume ของ audio เริ่มที่ 0.3
    }
  }, []); // ทำงานแค่ครั้งเดียวตอน mount component

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <>
      {isLoading ? (<div style={{
        position: 'fixed', top: '50%', left: '55%', marginTop: '-50px', marginLeft: '-100px'
      }}><LoadingStarWar /></div>) : (
        <div className="app">{status !== 'Admin' && ( <UsertopRigh />)} <CommentCom /> <IncognitoMode />

        {isAdver && (
          <>
            <button onClick={handleAdver} style={{zIndex: '1005',top: '50%' ,left: '50%',transform:'translate(-50%, -50%)' ,position: 'fixed',width: '100%' ,backgroundColor: '#0007',height: '100%' ,border: 'none'}}>
              <img style={{zIndex: '1005',top: '50%' ,left: '50%',transform:'translate(-50%, -50%)' ,position: 'fixed',width: '700px'}} src={Adverties} alt="โฆษณา" />
            </button>
          </>
        )}

        <div className='audioMain1' style={{margin: '0% 0%' ,zIndex: '1001' ,backgroundColor: '#2F2E67' ,borderRadius: '20px' , height: '40px'}} >
              <audio ref={audioRef} src={lofi} /> 
              <button onClick={handlePlayPause} className='audioMain'>
                  {isPlaying ? '🥳' : '🔇'}
              </button>
          <span>
            <input
              style={{color: '#000'}}
              id="volume-control"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="volume-slider"
            />
          </span>
        </div>

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
                    <a onClick={Logout} style={{cursor: 'pointer' }} className="signup-link">🔙</a>
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
                  <h1 className='titile'>Movie</h1>
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
                  <h1 className='titile'>Movie</h1>
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

              {/* หนังดัมมี่ */}
              {/* {isPosterVisible && (  // แสดง PosterBIG เมื่อ isPosterVisible เป็น true
                <div className='PosterBIG'>
                  <div className='image-container'>
                    <img src={Xmen} alt="Xmen" />
                    <div className="text-overlay">X MEN</div>
                  </div>
                </div>
              )} */}

            {/* {paymentInfo && (<>
              <h1 className='titile'>MOVIE</h1>
              <div className="movie-grid">
                {moviesMain.map((movies) => (
                  <div className="movie-card" key={movies.id} onClick={() => handleMovieClick1(movies)}>

                    <img src={movies.image} alt={movies.title} />

                  </div>))}
              </div></>
            )} */}

            </section>
          </main>
          {isPopupOpen && (
            <div className="popup-overlay">
              <div className="popup-content">
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
