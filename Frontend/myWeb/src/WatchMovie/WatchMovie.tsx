import React, { useEffect , useState} from 'react';
import './WatchMovie.css';

import { useLocation } from 'react-router-dom';
import {GetReviewtByMovieId,CreateReview} from '../services/https/index';
import { ReviewInterface } from "../interfaces/IMoviePackage";
import { Form, Input, Button} from 'antd';
import styles from '../Comment/ComponentComment/RatingStars.module.css';

//loveBTN
import { LoveBtn } from '../Component/LoveBtn/LoveBtn';
import { message } from "antd";

const key = 'updatable';
const WatchMovie: React.FC = () => {
  const [comment,setComment] = useState<ReviewInterface[]>([]);
  const location = useLocation();
  const { IDMOVIE, videoUrl, movieName, Movie_poster, Movie_information } = location.state as {IDMOVIE: number; videoUrl: string; movieName: string; Movie_poster: string; Movie_information: string; };
  useEffect(() => {
    message.loading({ content: 'Delivering happiness to you.😍', key });
    setTimeout(() => {
      message.success({ content: 'Yay! Have fun!😘', key, duration: 3 });
    }, 2000);
    //message.success("Update your History!!!");
  })

  useEffect(() => {
    if (IDMOVIE) {
      fetchUserData(String(IDMOVIE));
    } else {
      message.error("The movie ID was not found in localStorage.");
    }
  }, [IDMOVIE]);
  const fetchUserData = async (IDMOVIE: string) => {
    try {
      const res = await GetReviewtByMovieId(IDMOVIE);
      if (res.status === 200 && res.data) {
        setComment(res.data); // กำหนดให้เป็น array ที่ได้จาก API
      } else {
        setComment([]); // ถ้าไม่มีข้อมูล ให้กำหนดเป็น array ว่าง
        //message.error("This Movie is not have some Comment😝");
      }
    } catch (error) {
      setComment([]); // กำหนดให้เป็น array ว่างเมื่อมี error
      message.error("Your viewing history is not yet available🥹");
    }
  };


  //================================add Comment========================================
  const userIdstr = localStorage.getItem("id");
  const [form] = Form.useForm();
  const [isPopupopen, setPopup] = useState(false); // List of all movies


  const [rating, setRating] = useState<number>(0); // เก็บค่าของ rating ที่เลือก

  const onFinish = async (values: ReviewInterface) => {
    if (IDMOVIE === null || !userIdstr) {
      message.error('Please select a movie first.');
      return; // หยุดการทำงานหากไม่มีการเลือกภาพยนตร์
    }

    const selectMovieForComment = {
      ...values,
      MovieID: IDMOVIE,
      UserID: Number(userIdstr),
      Rating: rating, // เพิ่ม rating เข้าไปในข้อมูลที่ส่ง
    };

    const res = await CreateReview(selectMovieForComment);
    if (res.status === 201) {
      message.success('success');
    } else {
      message.error('error');
    }
  };



  const openpopup = () => {
    setPopup(!isPopupopen);
  };

  const handleRatingChange = (ratingValue: number) => {
    setRating(ratingValue); // เก็บค่าของ rating ที่ถูกเลือก
  };

  
  //================================add Comment========================================
  //   const movie = location.state as { id: number; title: string; image: string; link: string};

  return (
    <>
    <div className='overallWatchMovie'>
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
              <p><strong>Rating:</strong> {review.Rating}</p>
              <p className="comment-date"><strong>Date:</strong> {review.DateReview ? new Date(review.DateReview).toLocaleDateString() : "N/A"}</p>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>


    <div className='BtnComment' onClick={openpopup} style={{ cursor: 'pointer' }}>
        <span className='textComment'>Comment</span>
      </div>

      {isPopupopen && movieName &&
        <div className='CommentContenerWatch' style={{ marginTop: '60px', marginRight: '20px' }}>
          Comment for {movieName}
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ Comment: '' }}
          >

            <div className={styles.radio} style={{margin:'0px' ,position: 'absolute', left: '30px',top: '75px'}}>
              {[5, 4, 3, 2, 1].map((ratingValue) => (
                <React.Fragment key={ratingValue}>
                  <input
                    value={ratingValue}
                    name="rating"
                    type="radio"
                    id={`rating-${ratingValue}`}
                    className={styles.input}
                    onChange={() => handleRatingChange(ratingValue)} // เก็บค่า rating เมื่อถูกเลือก
                  />
                  <label title={`${ratingValue} stars`} htmlFor={`rating-${ratingValue}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                      <path
                        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                      ></path>
                    </svg>
                  </label>
                </React.Fragment>
              ))}
            </div>

            <Form.Item style={{ marginTop: '60px'}}
              label="Your Comment.."
              name="Comment"
              rules={[{ required: false, message: 'your Comment' }]}
            >
              <Input.TextArea style={{ minHeight: "100px" }} />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="submit-button"
                style={{ background: "#ff7f50 " }}
              >
                Confirm
              </Button>
            </Form.Item>
          </Form>
        </div>}
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