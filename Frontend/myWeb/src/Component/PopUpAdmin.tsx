import React, { useState } from 'react';
import './PopUp.css';
import { Form, Input, Button, message } from 'antd';
import { MovieInterface } from '../interfaces/IMoviePackage';
import { CreateMovie } from '../services/https/index';
import { useNavigate } from 'react-router-dom';

export const PopUpAdmin: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: MovieInterface) => {
    setLoading(true);

    let res = await CreateMovie(values);

    setLoading(false);

    if (res.status === 201) {
      messageApi.open({
        type: 'success',
        content: res.data.message,
      });

      setTimeout(() => {
        navigate('/Admin');
      }, 500);
    } else {
      messageApi.open({
        type: 'error',
        content: res.data.error,
      });
    }
  };

  return (
    <div className="PopUpAdmin">
      {contextHolder}
      <div className="textAdmin">
        Add Movie
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
          <Button
            type="primary"
            htmlType="submit"
            className="submit-button"
            loading={loading}
          >
            Confirm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PopUpAdmin;
