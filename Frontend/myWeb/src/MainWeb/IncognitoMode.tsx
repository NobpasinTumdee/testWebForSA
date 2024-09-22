import React, { useEffect , useState} from 'react';
import './MainWeb.css';
import { MovieInterface } from "../interfaces/IMoviePackage";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const IncognitoMode: React.FC = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
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
    const navigate = useNavigate();
    const handleMovieClick = (movie: MovieInterface) => {
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

    const openPopup = () => {
        setIsPopupOpen(!isPopupOpen)
    }
    const ClosePopup = () => {
        setIsPopupOpen(false)
    }
    
    return (
        <>
            <a className='incognitoModeBtn' onClick={() => openPopup()}>
                <p className='pincogito'>Incognito Mode</p>
                <img src="https://sandstormit.com/wp-content/uploads/2021/06/incognito-2231825_960_720-1.png" alt="png" />
            </a>
            {isPopupOpen && (
            <div className='IncognitoContenner'>
                <h1 style={{ color: '#ffff', textAlign: 'center' }}>Incognito</h1>
                <div className='closeBtnincognito' onClick={() => ClosePopup()}></div>
                <div className='subincognit'>
                    <div className="movie-grid-recommendPopup" id='Movie'>
                        {Movies ? (
                            <>
                                {Movies.map((movie) => (
                                    <div key={movie.ID} className="movie-card-recommendPopup" onClick={() => handleMovieClick(movie)}> 
                                        <img src={movie.Movie_poster} alt="Violet Evergarden" />
                                    </div>
                                ))}
                            </>
                        ) : (
                            <>
                                <h1 style={{ color: '#fffff' }}>No Movie😭</h1>
                            </>
                        )}
                    </div>
                </div>
            </div>
            )}
        </>
    );
};
