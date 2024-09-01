import  {useState ,useEffect} from 'react';
import './Collection.css';
import VioletEvergarden from "../assets/VioletEvergarden.jpg";
import rezero from "../assets/rezero.jpg"
import Cm5 from "../assets/Cm5persec.jpg"
import icon from "../assets/icon/RedHeart.png"
import fullmetal from "../assets/Fullmetal.jpg"

import { LoadingHart } from '../Component/Loading/LoadingHart';


const movies = [
  {
    id: 1,
    title: 'Violet Evergarden',
    description: 'A touching story about a young girl who used to be a weapon...',
    date: '15/July/2024',
    image: VioletEvergarden,
  },
  {
    id: 2,
    title: 'Haikyuu!!',
    description: 'An inspiring sports anime about volleyball...',
    date: '15/July/2024',
    image: rezero,
  },
  {
    id: 3,
    title: 'Bocchi the Rock!',
    description: 'A story of a shy girl who starts a rock band...',
    date: '15/July/2024',
    image: Cm5,
  },
  {
    id: 4,
    title: 'fullmetal',
    description: 'A story of a shy girl who starts a rock band...',
    date: '15/July/2024',
    image: fullmetal,
  },
  {
    id: 5,
    title: 'fullmetal',
    description: 'A story of a shy girl who starts a rock band...',
    date: '15/July/2024',
    image: fullmetal,
  },
  {
    id: 6,
    title: 'fullmetal',
    description: 'A story of a shy girl who starts a rock band...',
    date: '15/July/2024',
    image: fullmetal,
  },
  {
    id: 7,
    title: 'fullmetal',
    description: 'A story of a shy girl who starts a rock band...',
    date: '15/July/2024',
    image: fullmetal,
  },
];

const Collection: React.FC = () => {
  const [isLoading, setLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000)
  })

  return (
    <>
    {isLoading ? (<div style={{
        position: 'fixed', top: '50%', left: '55%', marginTop: '-50px', marginLeft: '-100px'
      }}><LoadingHart /></div>) : (
    <div className="Collection-container">
      <h1 className="Collection-title">COLLECTION</h1>
      <div className="movies-list">
        {movies.map((movie) => (
          <div className="movie-card-Adminpage" key={movie.id}>
            <img src={movie.image} alt={movie.title} className="movie-image" />
            <div className="movie-info">
              <h2 >{movie.title}</h2>
              <p >{movie.description}</p>
              <p >Date: {movie.date}</p>
            </div>
            <button className="edit-button">
              <img src={icon} className='edit-icon-Collection'></img>
            </button>
          </div>
        ))}
        
      </div>
      <a  href="/MainWeb"  className="return-button-Collection">Return to home page</a>
    </div>
      )}
    </>
  );
};

export default Collection;
