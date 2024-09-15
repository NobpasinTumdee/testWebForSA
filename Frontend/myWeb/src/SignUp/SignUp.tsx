import React from 'react';
import './SignUp.css';
import { Form, Input , message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UsersInterface } from '../interfaces/IUser';
import { CreateUser } from '../services/https/index';
import video from "../assets/video/jjk.mp4"
const SignUp: React.FC = () => {
  const navigate = useNavigate();
  //const [loading, setLoading] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: UsersInterface) => {
    //setLoading(true);

    let res = await CreateUser(values);

    //setLoading(false);

    if (res.status === 201) {
      messageApi.open({
        type: 'success',
        content: res.data.message,
      });

      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } else {
      messageApi.open({
        type: 'error',
        content: res.data.error,
      });
    }
  };

  return (
    <>
    <video autoPlay loop muted playsInline>
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
    <div className="signup-container">
      {contextHolder}
      <div className="signup-box">
        <h1 className="signUpHeader">SIGN UP</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            //label={<label className="labelSignUp">Username</label>}
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Username" className="form-groupS" />
          </Form.Item>

          <Form.Item
            //label={<label className="labelSignUp">Email</label>}
            name="email"
            rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
          >
            <Input placeholder="Email" className="form-groupS" />
          </Form.Item>

          <Form.Item
            //label={<label className="labelSignUp">Password</label>}
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" className="form-groupS" />
          </Form.Item>

          <Form.Item
            //label={<label className="labelSignUp">Confirm Password</label>}
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="confirm your Password" className="form-groupS" />
          </Form.Item>


          {/* <Form.Item
            //label={<label className="labelSignUp">Password</label>}
            name="firstname"
            rules={[{ required: false, message: 'Please input your firstname!' }]}
          >
            <Input placeholder="Your Firstname" className="form-groupS" />
          </Form.Item>

          <Form.Item
            //label={<label className="labelSignUp">Password</label>}
            name="lastname"
            rules={[{ required: false, message: 'Please input your lastname!' }]}
          >
            <Input placeholder="Your lastname" className="form-groupS" />
          </Form.Item>

          <Form.Item
            //label={<label className="labelSignUp">Password</label>}
            name="age"
            rules={[{ required: false, message: 'Please input your age!' }]}
          >
            <Input placeholder="Your age" className="form-groupS" />
          </Form.Item>

          <Form.Item
            //label={<label className="labelSignUp">Password</label>}
            name="phonenumber"
            rules={[{ required: false, message: 'Please input your phonenumber!' }]}
          >
            <Input placeholder="Your phonenumber" className="form-groupS" />
          </Form.Item> */}

          <div className="signup-buttonDIV">
            <button  className="signup-button">
              SIGN UP
            </button>
          </div>
        </Form>
        <a href="/login" className="login-link">BACK TO LOGIN</a>
      </div>
    </div>
    </>
  );
};

export default SignUp;

