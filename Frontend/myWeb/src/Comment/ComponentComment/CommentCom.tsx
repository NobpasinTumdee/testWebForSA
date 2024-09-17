import React, { useState, useEffect } from 'react';
import './CommentCom.css';
import { Form, Input, Button, Select, Space, message } from 'antd';
import { MovieInterface, ReviewInterface } from "../../interfaces/IMoviePackage";
import { GetMovie, CreateReview } from "../../services/https/index";
import styles from './RatingStars.module.css';

export const CommentCom: React.FC = () => {
  const userIdstr = localStorage.getItem("id");
  const [form] = Form.useForm();
  const [movies, setMovies] = useState<MovieInterface[]>([]); // List of all movies
  const [isPopupopen, setPopup] = useState(false); // List of all movies
  const [selectedMovie, setSelectedMovie] = useState<number | null>(null);
  const [rating, setRating] = useState<number>(0); // เก็บค่าของ rating ที่เลือก

  const onFinish = async (values: ReviewInterface) => {
    if (selectedMovie === null || !userIdstr) {
      message.error('กรุณาเลือกภาพยนตร์ก่อน');
      return; // หยุดการทำงานหากไม่มีการเลือกภาพยนตร์
    }

    const selectMovieForComment = {
      ...values,
      MovieID: selectedMovie,
      UserID: Number(userIdstr),
      Rating: rating, // เพิ่ม rating เข้าไปในข้อมูลที่ส่ง
    };

    const res = await CreateReview(selectMovieForComment);
    if (res.status === 201) {
      message.success('สำเร็จ');
    } else {
      message.error('มีข้อผิดพลาด');
    }
  };

  useEffect(() => {
    if (userIdstr) {
      fetchMovies(); // Fetch movies for the select dropdown
    } else {
      message.error("Collection ID not found in localStorage🥹");
    }
  }, [userIdstr]);

  const handleChange = (value: number) => {
    setSelectedMovie(value); // Update selected movie ID
  };

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

  const openpopup = () => {
    setPopup(!isPopupopen);
  };

  const handleRatingChange = (ratingValue: number) => {
    setRating(ratingValue); // เก็บค่าของ rating ที่ถูกเลือก
  };

  return (
    <>
      <div className='BtnComment' onClick={openpopup} style={{ cursor: 'pointer' }}>
        <span className='textComment'>Comment</span>
      </div>

      {isPopupopen &&
        <div className='CommentContener' style={{ marginTop: '60px', marginRight: '20px' }}>
          Comment Movie
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ Comment: '' }}
          >
            <Space wrap>
              <Select
                style={{ width: 300, height: 50 }}
                onChange={handleChange}
                placeholder="Select a movie"
                options={movies.map((movie) => ({
                  label: movie.Movie_name,
                  value: movie.ID,
                }))}
              />
            </Space>

            <div className={styles.radio} style={{margin:'20px' ,position: 'absolute', left: '10px'}}>
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
    </>
  );
};
