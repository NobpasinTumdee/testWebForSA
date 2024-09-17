import React, { useState ,useEffect } from 'react';
import './CommentCom.css';
import { Form, Input, Button, Select, Space,message} from 'antd';
import { MovieInterface , ReviewInterface} from "../../interfaces/IMoviePackage";
import {  GetMovie , CreateReview} from "../../services/https/index";

export const CommentCom: React.FC = () => {
    const userIdstr = localStorage.getItem("id");
    const [form] = Form.useForm();
    const [movies, setMovies] = useState<MovieInterface[]>([]); // List of all movies
    const [isPopupopen, setPopup] = useState(false); // List of all movies
    const [selectedMovie, setSelectedMovie] = useState<number | null>(null);
    
    const onFinish = async (values: ReviewInterface) => {
        if (selectedMovie === null || !userIdstr) {
          message.error('กรุณาเลือกภาพยนตร์ก่อน');
          return; // หยุดการทำงานหากไม่มีการเลือกภาพยนตร์
        }
      
        const selectMovieForComment = { 
          ...values, 
          MovieID: selectedMovie, 
          UserID: Number(userIdstr)
        };
      
        const res = await CreateReview(selectMovieForComment);
        if (res.status === 201) {
          message.success('สำเร็จ');
        } else {
          message.error('มีข้อผิดพลาด');
        }
      };
      

    // Fetch movies when component mounts
  useEffect(() => {
    if (userIdstr) {
      fetchMovies(); // Fetch movies for the select dropdown
    } else {
      message.error("Collection ID not found in localStorage🥹");
    }
  }, [userIdstr]);

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

  const openpopup = () => {
    if (isPopupopen){
      setPopup(false)
    }else{
      setPopup(true)
    }
  }


    return (
        <>

            <div className='BtnComment' onClick={openpopup} style={{cursor: 'pointer'}}><span className='textComment'>Comment</span></div>
              {isPopupopen && 
                <div className='CommentContener' style={{ marginTop: '60px', marginRight: '20px' }}>Comment Movie
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        initialValues={{
                            Comment: '',
                        }}
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

                        <Form.Item
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
                                style={{background: "#ff7f50 "}}
                            >
                                Confirm
                            </Button>
                        </Form.Item>
                    </Form>
                </div>}
            
        </>
    );
};