import React, { useEffect , useState} from 'react';
import './WatchMovie.css';

import { useLocation } from 'react-router-dom';
import {GetReviewtByMovieId} from '../services/https/index';
import { ReviewInterface } from "../interfaces/IMoviePackage";
//loveBTN
import { LoveBtn } from '../Component/LoveBtn/LoveBtn';
import { message } from "antd";

const key = 'updatable';
const WatchMovie: React.FC = () => {
  const [comment,setComment] = useState<ReviewInterface[]>([]);
  const location = useLocation();
  const { IDMOVIE, videoUrl, movieName, Movie_poster, Movie_information } = location.state as {IDMOVIE: number; videoUrl: string; movieName: string; Movie_poster: string; Movie_information: string; };
  useEffect(() => {
    message.loading({ content: 'กำลังส่งมอบความสุขให้คุณ😍', key });
    setTimeout(() => {
      message.success({ content: 'เย่! ขอให้สนุกนะ😘', key, duration: 2 });
    }, 2000);
    //message.success("Update your History!!!");
  })

  useEffect(() => {
    if (IDMOVIE) {
      fetchUserData(String(IDMOVIE));
    } else {
      message.error("ไม่พบ ID ของ movie localStorage");
    }
  }, [IDMOVIE]);
  const fetchUserData = async (IDMOVIE: string) => {
    try {
      const res = await GetReviewtByMovieId(IDMOVIE);
      if (res.status === 200 && res.data) {
        setComment(res.data); // กำหนดให้เป็น array ที่ได้จาก API
      } else {
        setComment([]); // ถ้าไม่มีข้อมูล ให้กำหนดเป็น array ว่าง
        message.error("This Movie is not have some Comment😝");
      }
    } catch (error) {
      setComment([]); // กำหนดให้เป็น array ว่างเมื่อมี error
      message.error("Your viewing history is not yet available🥹");
    }
  };


  //   const movie = location.state as { id: number; title: string; image: string; link: string};

  return (
    <>
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
    
    {/* การแสดงคอมเมนต์ */}
    <div className="comments-section">
      <h2 className="comments-title">Comments</h2>
      <div className="comment-list">
        {comment.length > 0 ? (
          comment.map((review) => (
            <div key={review.ID} className="comment-container">
              {/* <p><strong>User ID:</strong> {review.UserID}</p> */}
              <p><strong>From {review.status}:</strong> {review.username}</p>
              <p><strong>Comment:</strong> {review.Comment}</p>
              <p className="comment-date"><strong>Date:</strong> {review.DateReview ? new Date(review.DateReview).toLocaleDateString() : "N/A"}</p>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>


    </>
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