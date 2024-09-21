import './PopUp.css';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { MovieInterface } from '../interfaces/IMoviePackage';
import { UpdateMovieByid, GetMovieById } from '../services/https/index';
import { message, Form, Input, Button, Space, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export const PopUpAdminUpdate: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [profileImageUrl, setProfileImageUrl] = useState<string>(""); // Holds the uploaded image URL

  const fetchMovieData = async (id: string) => {
    try {
      const res = await GetMovieById(id);
      if (res.status === 200) {
        setProfileImageUrl(res.data.Movie_poster); // Set the Movie_poster URL
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
          content: "Movie information is not found!",
        });
        setTimeout(() => {
          navigate("/Admin");
        }, 2000);
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Fetching Movie information is error!",
      });
    }
  };

  const onFinish = async (values: MovieInterface) => {
    setLoading(true);
    if (!id) {
      messageApi.open({
        type: "error",
        content: "Movie ID is not found!",
      });
      setLoading(false);
      return;
    }
    const valuesWithImage = { ...values, Movie_poster: profileImageUrl }; // Include image URL
    try {
      const res = await UpdateMovieByid(id, valuesWithImage);
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
        content: "Update Movie information is error!",
      });
    }
  };

  // Handle image upload
  const handleUpload = (file: any) => {
    const reader = new FileReader();
    reader.onload = () => {
      setProfileImageUrl(reader.result as string); // Update image URL when uploaded
    };
    reader.readAsDataURL(file);
    return false; // Prevent default upload behavior
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
        <div className="textAdmin">Edit Movie Information</div>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            Movie_name: '',
            Movie_information: '',
            Movie_length: '',
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
            label="Upload Poster"
            name="Movie_poster"
            rules={[{ required: true, message: "Please Upload Movie Poster !" }]}
          >
            <Upload
              beforeUpload={handleUpload}
              listType="picture"
              maxCount={1}
              defaultFileList={
                profileImageUrl
                  ? [
                      {
                        uid: '-1',
                        name: 'Movie Poster',
                        status: 'done',
                        url: profileImageUrl, // Display the image preview
                      },
                    ]
                  : []
              }
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
            <Space size={[8, 16]} wrap>
              <Button
                type="primary"
                htmlType="submit"
                className="submit-button"
                loading={loading}
              >
                Confirm
              </Button>
              <Button danger type="primary" onClick={() => navigate(`/Admin`)}>
                Return
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default PopUpAdminUpdate;
