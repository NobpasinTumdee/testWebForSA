import './Login1.css';
//import Gojo from '../assets/Anime/gojoPoster.png';
//import kamado from '../assets/Anime/tanjiroPoster.png';
import { useState, useEffect } from 'react';
// recomment movie
import VioletEvergarden from "../assets/VioletEvergarden.jpg"; // นำเข้ารูปภาพ
import yourname from "../assets/yourname.jpg"
import rezero from "../assets/rezero.jpg"
import evangelion from "../assets/evangelion.jpg"

import Carousels from "../Component/Carousels/Carousels";

// popup
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { useNavigate } from 'react-router-dom';

import { MovieInterface } from "../interfaces/IMoviePackage";
import axios from 'axios';
function Login1() {
    const navigate = useNavigate();
    const subscription = () => {
        navigate('/PreviewSubscription');
    };

    const notify = () => toast.warn('For Members', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });




    //================================ตัวอย่างข้อมูลหนัง=====================================
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
            <div className='showMovieEx'>
                <div className='BtnShowMovie'>⏫</div>
                <h1>Movie</h1>
                <div>
                    <div className="movie-grid-recommendPopup" id='Movie'>
                        {Movies ? (
                            <>
                                {Movies.map((movie) => (
                                    <div className="movie-card-recommendPopup" onClick={notify}>
                                        <img src={movie.Movie_poster} alt="Violet Evergarden" />
                                    </div>
                                ))}
                            </>
                        ) : (
                            <>
                                <h1 style={{color: '#fffff'}}>No Movie😭</h1>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className='pageLogin1'>
                <div className="topnav">
                    <a className="active" href="/login">Login</a>
                    <a href="#Movie" className='scroll-container'>Movie</a>
                    <h2>Netflim</h2>
                </div>

                <div>
                    <Carousels />
                    {/* <img className='PosterINFO' src={Gojo}></img> */}

                    <div className="text-overlay-infodate">since March 2018 </div>
                    <div className="text-overlay-forPoster">Jujutsu Kaisen</div>
                    <div className="text-overlay-info">In Jujutsu Kaisen, all living beings emanate energy called Cursed Energy (呪力, Juryoku), which arises from negative emotions that naturally flow throughout the body. Ordinary people cannot control this flow in their bodies. As a result, they continually lose Cursed Energy, resulting in the birth of Curses </div>
                    <button onClick={subscription} className="button-85-login1" >✨Subscribe✨</button>
                </div>
                <div className='RecommendMovieLogin1'>
                    Recommend
                    <div className="movie-grid-recommend" id='Movie'>
                        {/* Repeat this block for each movie */}
                        <div className="movie-card-recommend" onClick={notify}>
                            <img src={VioletEvergarden} alt="Violet Evergarden" />
                        </div>
                        <div className="movie-card-recommend" onClick={notify}>
                            <img src={yourname} alt="yourname" />
                        </div>
                        <div className="movie-card-recommend" onClick={notify}>
                            <img src={rezero} alt="aot1" />
                        </div>
                        <div className="movie-card-recommend" onClick={notify}>
                            <img src={evangelion} alt="aot2" />
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
}

export default Login1;