import './PopUp.css';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { MovieInterface } from '../interfaces/IMoviePackage';
import { UpdateMovieByid, GetMovieById } from '../services/https/index';
import { message, Form, Input, Button ,Space } from "antd";

export const PopUpAdminUpdate: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const fetchMovieData = async (id: string) => {
    try {
      const res = await GetMovieById(id);
      if (res.status === 200) {
        form.setFieldsValue({
          Movie_name: res.data.Movie_name,
          Movie_information: res.data.Movie_information,
          Movie_video: res.data.Movie_video,
          Movie_length: res.data.Movie_length,
          Movie_poster: res.data.Movie_poster,
        });
      } else {
        messageApi.open({
          type: "error",
          content: "ไม่พบข้อมูลหนัง",
        });
        setTimeout(() => {
          navigate("/Admin");
        }, 2000);
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาดในการดึงข้อมูลหนัง",
      });
    }
  };
  const onFinish = async (values: MovieInterface) => {
    setLoading(true);
    if (!id) {
      messageApi.open({
        type: "error",
        content: "ไม่พบ ID ของหนัง",
      });
      setLoading(false);
      return;
    }
  
    try {
      const res = await UpdateMovieByid(id, values);
      setLoading(false);
  
      if (res.status === 200) {
        messageApi.open({
          type: "success",
          content: res.data.message,
        });
        setTimeout(() => {
          navigate("/Admin");
        }, 2000);
      } else {
        messageApi.open({
          type: "error",
          content: res.data.error,
        });
      }
    } catch (error) {
      setLoading(false);
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาดในการอัปเดตข้อมูลหนัง",
      });
    }
  };
  

  useEffect(() => {
    if (id) {
      fetchMovieData(id); 
    }
}, [id]);


  return (
    <>
      {contextHolder}
      <div className="PopUpAdmin">
        <div className="textAdmin">
          Edit Movie Information
        </div>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            Movie_name: '',
            Movie_information: '',
            Movie_length: '',
            Movie_poster: '',
            Movie_video: ''
          }}
        >
          <Form.Item
            label="Name Movie:"
            name="Movie_name"
            rules={[{ required: true, message: 'Please input the movie name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description:"
            name="Movie_information"
            rules={[{ required: true, message: 'Please input the movie description!' }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Movie Length:"
            name="Movie_length"
            rules={[{ required: true, message: 'Please input the movie length!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Movie Poster URL:"
            name="Movie_poster"
            rules={[{ required: true, message: 'Please input the movie poster URL!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Movie Video URL:"
            name="Movie_video"
            rules={[{ required: true, message: 'Please input the movie video URL!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
          <Space size={[8, 16]} wrap>
            <Button
              type="primary"
              htmlType="submit"
              className="submit-button"
              loading={loading}
            >
              Confirm
            </Button>
            <Button danger type="primary" onClick={() => navigate(`/Admin`)}>Return</Button>
        </Space>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default PopUpAdminUpdate;
