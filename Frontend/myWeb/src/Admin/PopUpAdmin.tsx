import React, { useState } from 'react';
import './PopUp.css';
import { Form, Input, Button, message , Upload } from 'antd';
import { UploadOutlined } from "@ant-design/icons";
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
    const valuesWithImage = { ...values, Movie_poster: profileImageUrl };
    let res = await CreateMovie(valuesWithImage);

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


  const [profileImageUrl, setProfileImageUrl] = useState<string>("");
  // Handle image upload
  const handleUpload = (file: any) => {
    // Simulate uploading to server and getting a URL back
    // Replace this with actual file upload logic if needed
    const reader = new FileReader();
    reader.onload = () => {
      setProfileImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Return false to prevent default upload behavior
    return false;
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
          Movie_video: ''+'&autoplay=1'
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

        {/* <Form.Item
          label="Movie Poster URL:"
          name="Movie_poster"
          rules={[{ required: true, message: 'Please input the movie poster URL!' }]}
        >
          <Input />
        </Form.Item> */}
        <Form.Item
          label="Upload Poster"
          name="Movie_poster"
          rules={[{ required: true, message: "Please Upload Movie Poster !" }]}
        >
          <Upload
            beforeUpload={handleUpload}
            listType="picture"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Upload Poster</Button>
          </Upload>
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
