import React, { useEffect } from 'react';
import './WatchMovie.css';

import { useLocation } from 'react-router-dom';

//loveBTN
import { LoveBtn } from '../Component/LoveBtn/LoveBtn';
import { message } from "antd";

const key = 'updatable';
const WatchMovie: React.FC = () => {

  const location = useLocation();
  const { videoUrl, movieName, Movie_poster, Movie_information } = location.state as { videoUrl: string; movieName: string; Movie_poster: string; Movie_information: string; };
  useEffect(() => {
    message.loading({ content: 'กำลังส่งมอบความสุขให้คุณ😍', key });
    setTimeout(() => {
      message.success({ content: 'เย่! ขอให้สนุกนะ😘', key, duration: 2 });
    }, 2000);
    //message.success("Update your History!!!");
  })


  //   const movie = location.state as { id: number; title: string; image: string; link: string};

  return (
    <div className="watch-movie-container">
      <div className="movie-header">
        {movieName}
        <LoveBtn />
      </div>
      <div className="movie-content">
        <div className="movie-player">
          <iframe
            src={videoUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <div className="movie-infoWatch">
          <img src={Movie_poster} alt={movieName} className="movie-poster" />
          <div className="info">
            <h2>Movie information</h2>
            <p>{Movie_information}</p>
          </div>
        </div>
      </div>
      <a href="/MainWeb" className="return-button-watch">Return to home page</a>
    </div>
  );
};

export default WatchMovie;


// const WatchMovie: React.FC = () => {
//   const location = useLocation();
//   const { videoUrl, movieName } = location.state as { videoUrl: string; movieName: string };

//   return (
//     <div className="watch-movie-container">
//       <h1>{movieName}</h1> {/* แสดงชื่อหนัง */}
//       {videoUrl && (
//         <iframe
//           src={videoUrl}
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//           allowFullScreen
//           style={{ width: '100%', height: '500px' }} // ปรับขนาดตามต้องการ
//         />
//       )}
//       {!videoUrl && <p>No video available</p>}
//     </div>
//   );
// };

// export default WatchMovie;