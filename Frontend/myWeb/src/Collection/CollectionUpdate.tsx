
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { GetcollectionMovieById, DeleteCollectionMovieByID,CreateCollectionMovie,GetMovie, CreateHistory } from "../services/https/index";
import { message, Select, Space, Button } from "antd"; // Ant Design message for notifications
import { CollectionMovieInterface,MovieInterface } from "../interfaces/IMoviePackage";

import './Collection.css'

export const CollectionUpdate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [CollectM, setCollectM] = useState<CollectionMovieInterface[]>([]); // ตั้งค่าเริ่มต้นให้เป็น array ว่าง
  const [movies, setMovies] = useState<MovieInterface[]>([]); // List of all movies
  const [selectedMovie, setSelectedMovie] = useState<number | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const navigate = useNavigate();
  const userIdstr = localStorage.getItem("id");

  const openPopup = () => {
    setIsPopupOpen(true);
  };
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  

  // Handle select change
  const handleChange = (value: number) => {
    setSelectedMovie(value); // Update selected movie ID
  };

  // Fetch all movies for dropdown
  const fetchMovies = async () => {
    try {
      const res = await GetMovie();
      if (res.status === 200 && res.data) {
        setMovies(res.data); // Store movies in state
      } else {
        message.error("I can't retrieve any movie information.😭");
      }
    } catch (error) {
      message.error("I found the Error🤯");
    }
  };


  // Fetch movies when component mounts
  useEffect(() => {
    if (id) {
      fetchCollectionMovies(id);
      fetchMovies(); // Fetch movies for the select dropdown
    } else {
      message.error("Collection ID not found in localStorage🥹");
    }
  }, [id]);

  // Add movie to collection
  const handleAddMovie = async () => {
    if (selectedMovie && id) {
      const movieAlreadyInCollection = CollectM.some((movie) => movie.MovieID === selectedMovie);

      if (movieAlreadyInCollection) {
        message.error("This movie is already in your collection. I can't add it again😭");
        return;
      }

      const newCollectionMovie: CollectionMovieInterface = {
        CollectionID: parseInt(id), // Collection ID from route params
        MovieID: selectedMovie, // Selected movie ID
      };

      try {
        const res = await CreateCollectionMovie(newCollectionMovie);
        if (res.status === 200) {
          message.success("Add movie success");
          closePopup(); // Close the popup after success
          fetchCollectionMovies(id); // Refresh collection movies
        } else {
          message.error("I can't Add Movie Sorry😭");
        }
      } catch (error) {
        message.error("I found the Error🤯");
      }
    } else {
      message.error("Please add the movie first😘");
    }
  };


  // Fetch collection movies
  const fetchCollectionMovies = async (id: string) => {
    try {
      const res = await GetcollectionMovieById(id);
      if (res.status === 200 && res.data) {
        setCollectM(res.data);
      } else {
        setCollectM([]);
        message.error("No Data Collection💁🏻‍♀️");
      }
    } catch (error) {
      setCollectM([]);
      message.error("No Data.");
    }
  };

  const handleDelete = async (id: number | undefined) => {
    if (id) {
      try {
        const res = await DeleteCollectionMovieByID(String(id));
        if (res.status === 200) {
          // อัปเดต state เพื่อลบประวัติจากหน้าจอทันที
          setCollectM((prevMovie) => prevMovie.filter(item => item.id !== id));
          message.success("Deleted💪🏻");
        } else {
          message.error("Can't deleted😭");
        }
      } catch (error) {
        message.error("Error!!!");
      }
    } else {
      message.error("I can't see your id collection🤯");
    }
  };

  const handleMovieClick = (CollectM: CollectionMovieInterface) => {
    // เรียกใช้ฟังก์ชัน CreateHistory เมื่อผู้ใช้คลิกหนัง
    if (userIdstr && CollectM.id) {
      const historyData = {
        UserID: parseInt(userIdstr), // เปลี่ยน string เป็น number
        MovieID: CollectM.MovieID,
        movie_name: CollectM.Movie_name,
        poster: CollectM.Movie_poster,
        new: Date().toString() // เพิ่มวันที่ในรูปแบบ ISO string
      };
      CreateHistory(historyData);
    }
    
    navigate('/WatchMovie', { 
      state: { 
        IDMOVIE: CollectM.MovieID,
        videoUrl: CollectM.Movie_video, 
        movieName: CollectM.Movie_name, 
        Movie_poster: CollectM.Movie_poster, 
        Movie_information: CollectM.Movie_information 
      } 
    });
  };



  return (
    <>
      {/* <div>Hello</div>
      {id} */}
      <div className="History-container">
        {CollectM.length > 0 && <h1 className="History-title">{CollectM[0].collection_name}</h1>}
        <button onClick={openPopup} className='AddMovie' style={{ color: '#ffff', marginBottom: '40px', background: '#bd9d3d', padding: '10px' }}>Add Movie in your Collection</button>
        <div className="movie-gridCollection" >
          {CollectM.length > 0 ? (
            CollectM.map((CollectM) => (
              <div key={CollectM.id} >
                <div className="movie-cardCollection" >
                  <img src={CollectM.Movie_poster} alt={CollectM.Movie_name} className="movie-image" onClick={() => handleMovieClick(CollectM)} />
                  <div className="movie-info">
                    <h2 style={{ fontSize: '20px', textAlign: 'center' }}>{CollectM.Movie_name || "No Movie Name"}</h2>
                  </div>
                  <button className="edit-button" onClick={() => handleDelete(CollectM.id)}>
                    🗑️
                  </button>
                </div>
              </div>

            ))
          ) : (
            <>
              <div style={{ textAlign: 'center', fontSize: '44px', marginLeft: '15%' }}>
                <h1 style={{ textAlign: 'center', fontSize: '34px' }}>Your viewing history is not yet available.</h1>
                <a href="/MainWeb">✨Add Movie in your Collection now✨</a>

                <div style={{ textAlign: 'center' }}>
                  <img style={{ width: '20%' }} src='https://media.tenor.com/Comp_iIhz44AAAAi/yui-yui-hirasawa.gif' />
                </div>
              </div>
            </>
          )}
        </div>
        <a href="/Collection" className="return-button-Admin">Return to Your Collection</a>
      </div>

      {isPopupOpen && (
        <div className="popup-overlay-collection">
        <div className="popup-content-collection">
          <button onClick={closePopup} className="popup-close-button-collection">X</button>
          <h3>Add Movie to Collection</h3>
          <Space wrap>
            <Select
              style={{ width: 300 ,height: 50}}
              onChange={handleChange}
              placeholder="Select a movie"
              options={movies.map((movie) => ({
                label: movie.Movie_name,
                value: movie.ID,
              }))}
            />
            <Button type="primary" onClick={handleAddMovie}>Add</Button>
          </Space>
        </div>
      </div>
      )}
    </>
  );
};

export default CollectionUpdate;
