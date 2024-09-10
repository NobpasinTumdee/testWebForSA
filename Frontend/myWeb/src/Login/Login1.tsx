import './Login1.css';
//import Gojo from '../assets/Anime/gojoPoster.png';
//import kamado from '../assets/Anime/tanjiroPoster.png';

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


function Login1() {
    const navigate = useNavigate();
    const subscription = () => {
        navigate('/PreviewSubscription');
    };

    const notify = () => toast.warn('For Members', {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
    return (
        <>
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
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
            </div>
        </>
    );
}

export default Login1;