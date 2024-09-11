import React from 'react';
import { Form, Input, message } from 'antd';
import './Login.css';
import { SignInInterface } from "../interfaces/SignIn";
import { SignIn } from "../services/https/index";
import { GetUserById } from "../services/https/index"; // Assuming this is the API to get user data
import { UsersInterface } from "../interfaces/IUser";
import video from "../assets/video/jjk.mp4"

const Login: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values: SignInInterface) => {
        let res = await SignIn(values);
    
        if (res.status === 200) {
            messageApi.success("Sign-in successful");
    
            localStorage.setItem("isLogin", "true");
            localStorage.setItem("token_type", res.data.token_type);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("id", res.data.id);
            
            // Fetch user data by Uid
            const userId = res.data.id;
            let userResponse = await GetUserById(userId); // Assuming this function exists in your service layer

            if (userResponse.status === 200) {
                const user: UsersInterface = userResponse.data;

                // Check the status and redirect accordingly
                setTimeout(() => {
                    if (user.status === "User") {
                        location.href = "/MainWeb";
                    } else if (user.status === "Admin") {
                        location.href = "/Admin";
                    }
                }, 1000);
            } else {
                messageApi.error("Failed to retrieve user data");
            }
        } else {
            messageApi.error(res.data.error);
        }
    };

    return (
        <>
            {contextHolder}
            <video autoPlay loop muted playsInline>
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="login-container">
                <div className="login-box">
                    <h1 className='colortext'>NetFlim</h1>
                    <Form
                        name="login"
                        onFinish={onFinish}
                        className="login-form"
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="username" className="input-field" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password placeholder="password" className="input-field" />
                        </Form.Item>
                        <a href="/forget-password" className="forgot-password">FORGOT PASSWORD</a>
                        <Form.Item>
                            <button className="login-button">
                                LOG IN
                            </button>
                        </Form.Item>
                    </Form>
                    <a href="/signup" className="signup-link">SIGN UP NOW</a>
                </div>
            </div>
        </>
    );
};

export default Login;
