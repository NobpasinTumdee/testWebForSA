import React from 'react';
import './ForgetPassword.css';
import { useNavigate } from 'react-router-dom';
import video from "../assets/video/jjk.mp4"

const ForgetPassword: React.FC = () => {
    const navigate = useNavigate();

    const COMFIRM = () => {
        // Logic สำหรับการรีเซ็ตรหัสผ่าน (เช่น การ validate ข้อมูล)

        // นำทางกลับไปที่หน้า login
        navigate('/');
    };
    return (
        <>
            <video autoPlay loop muted playsInline>
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="forget-container">
                <div className="forget-box">
                    <h1 className='textSize' >Reset Password</h1>
                    <input type="text" placeholder="Username" className="input-field" />
                    <input type="email" placeholder="Gmail" className="input-field" />
                    <input type="password" placeholder="New Password" className="input-field" />
                    <input type="password" placeholder="Confirm Password" className="input-field" />
                    <button onClick={COMFIRM} className="confirm-button">CONFIRM</button>
                    <a href="/login" className="signup-link">BACK TO LOGIN</a>
                </div>
            </div>
        </>
    );
};

export default ForgetPassword;
