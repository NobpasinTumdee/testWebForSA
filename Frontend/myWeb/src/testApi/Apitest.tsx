import { UsersInterface } from "../interfaces/IUser";
import { PackageInterface ,MovieInterface } from "../interfaces/IMoviePackage";
import { useEffect, useState } from 'react';
import axios from 'axios';

export const APItest = () => {
    const [Users, setAlbums] = useState<UsersInterface[]>([]); // กำหนดประเภทของ state เป็น Array ของ Album


    useEffect(() => {
        axios.get<UsersInterface[]>('http://localhost:8000/users')
          .then(response => {
            console.log(response.data); // ดูข้อมูลที่ได้รับจาก API ใน console
            setAlbums(response.data); // TypeScript จะรู้ว่าข้อมูลที่ได้รับคือ Album[]
          })
          .catch(error => {
            console.error('มีข้อผิดพลาดในการดึงข้อมูล:', error);
          });
      }, []);

      return (
        <div style={{color: "#fffff"}}>
          <h2>รายชื่อผู้ใช้</h2>
          <ul>
            {Users.length > 0 ? (
              Users.map(User => (
                <li key={User.id}>
                  <strong>{User.email}</strong> UserName:  {User.username} Password: {User.password} Status:  {User.status}
                </li>
              ))
            ) : (
              <p>ไม่พบข้อมูลผู้ใช้</p>
            )}
          </ul>
        </div>
      );
      
};


export const APItestMoviePackage = () => {
  const [Packages, setAlbums] = useState<PackageInterface[]>([]); // กำหนดประเภทของ state เป็น Array ของ Album


  useEffect(() => {
      axios.get<PackageInterface[]>('http://localhost:8000/MoviePackages')
        .then(response => {
          console.log(response.data); // ดูข้อมูลที่ได้รับจาก API ใน console
          setAlbums(response.data); // TypeScript จะรู้ว่าข้อมูลที่ได้รับคือ Album[]
        })
        .catch(error => {
          console.error('มีข้อผิดพลาดในการดึงข้อมูล:', error);
        });
    }, []);

    return (
      <div style={{color: "#fffff"}}>
        <h2>รายชื่อผู้ใช้</h2>
        <ul>
          {Packages.length > 0 ? (
            Packages.map(Package => (
              <li key={Package.id}>
                Name: <strong>{Package.Package_name}</strong> Price:  {Package.Price} Duration: {Package.Duration} 
              </li>
            ))
          ) : (
            <p>ไม่พบข้อมูลผู้ใช้</p>
          )}
        </ul>
      </div>
    );
    
};


import { useNavigate } from 'react-router-dom';
export const APItestimg: React.FC = () => {
  const [Movies, setMovie] = useState<MovieInterface[]>([]);
  //const [selectedMovieVideo, setSelectedMovieVideo] = useState<string | null>(null);
  const navigate = useNavigate();

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

  const handleMovieClick = (movie: MovieInterface) => {
    //setSelectedMovieVideo(movie.Movie_video || null);
    navigate('/WatchMovie', { state: { videoUrl: movie.Movie_video, movieName: movie.Movie_name } });
  };

  return (
    <div>
      <ul>
        {Movies.length > 0 ? (
          Movies.map(movie => (
            <li key={movie.id} onClick={() => handleMovieClick(movie)}>
              <img src={movie.Movie_poster} alt={movie.Movie_name} />
              <div>{movie.Movie_name}</div>
              <div>{movie.Movie_information}</div>
              <div>{movie.Movie_length}</div>
            </li>
          ))
        ) : (
          <p>ไม่พบข้อมูลผู้ใช้</p>
        )}
      </ul>
    </div>
  );
};