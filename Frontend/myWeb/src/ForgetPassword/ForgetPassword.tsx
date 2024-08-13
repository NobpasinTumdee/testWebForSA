import React from 'react';
import './ForgetPassword.css';
import { useNavigate } from 'react-router-dom';

const ForgetPassword: React.FC = () => {
    const navigate = useNavigate();

    const COMFIRM = () => {
        // Logic สำหรับการรีเซ็ตรหัสผ่าน (เช่น การ validate ข้อมูล)
        
        // นำทางกลับไปที่หน้า login
        navigate('/');
    };
    return (
        <div className="forget-container">
            <div className="forget-box">
                <h1 >Reset Password</h1>
                <input type="text" placeholder="Username" className="input-field" />
                <input type="email" placeholder="Gmail" className="input-field" />
                <input type="password" placeholder="New Password" className="input-field" />
                <input type="password" placeholder="Confirm Password" className="input-field" />
                <button onClick={COMFIRM} className="confirm-button">CONFIRM</button>
                <a href="/" className="BACKTOLOGIN">BACK TO LOGIN</a>
            </div>
        </div>
    );
};

export default ForgetPassword;
