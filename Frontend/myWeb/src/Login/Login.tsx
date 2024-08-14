import React from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const navigate = useNavigate();

    const TOMAIN = () => {
        // Logic สำหรับการรีเซ็ตรหัสผ่าน (เช่น การ validate ข้อมูล)
        
        // นำทางกลับไปที่หน้า login
        navigate('/MainWeb');
    };
    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className='colortext' >NetFlim</h1>
                <input type="text" placeholder="username" className="input-field" />
                <input type="password" placeholder="password" className="input-field" />
                <a href="/forget-password" className="forgot-password">FORGOT PASSWORD</a>
                <button onClick={TOMAIN} className="login-button">LOG IN</button>
                <a href="/signup" className="signup-link">SIGN UP NOW</a>
            </div>
        </div>
    );
};

export default Login;
