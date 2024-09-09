import React from 'react';
import { Form, Input, message } from 'antd';
import './Login.css';
//import { useNavigate } from 'react-router-dom';
import { SignInInterface } from "../interfaces/SignIn";
import { SignIn } from "../services/https/index";

const Login: React.FC = () => {
    //const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values: SignInInterface) => {
        let res = await SignIn(values);
    
        if (res.status === 200) {
            messageApi.success("Sign-in successful");
    
            localStorage.setItem("isLogin", "true");
            localStorage.setItem("page", "MainWeb");
            localStorage.setItem("token_type", res.data.token_type);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("id", res.data.id);
    
            setTimeout(() => {
                location.href = "/MainWeb";
            }, 2000);
        } else {
            messageApi.error(res.data.error);
        }
    };

    return (
        <>
            {contextHolder}
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
                            <button  className="login-button">
                                LOG IN
                            </button>
                        </Form.Item>
                    </Form>
                    {/* <a href="/MainWeb" className="signup-link">เข้าหน้า main ชั่วคราว</a> */}
                    <a href="/signup" className="signup-link">SIGN UP NOW</a>
                </div>
            </div>
        </>
    );
};

export default Login;
