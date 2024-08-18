import './Login1.css';
import Gojo from '../assets/Anime/gojoPoster.png';
import { useNavigate } from 'react-router-dom';


function Login1() {
    const navigate = useNavigate();
    const subscription = () => {
        navigate('/subscription');
    };
    return (
        <>
            <div className='pageLogin1'>
                <div className="topnav">
                    <a className="active" href="/">Login</a>
                    <a href="#news">Movie</a>
                    <h2>Netflim</h2>
                </div>

                <div>
                    
                        <img className='PosterINFO' src={Gojo}></img>

                        <div className="text-overlay-infodate">since March 2018 </div>
                        <div className="text-overlay-forPoster">Jujutsu Kaisen</div>
                        <div className="text-overlay-info">In Jujutsu Kaisen, all living beings emanate energy called Cursed Energy (呪力, Juryoku), which arises from negative emotions that naturally flow throughout the body. Ordinary people cannot control this flow in their bodies. As a result, they continually lose Cursed Energy, resulting in the birth of Curses </div>
                        <button onClick={subscription} className="button-85-login1" >✨Subscribe✨</button>
                </div>
            </div>
        </>
    );
}

export default Login1;