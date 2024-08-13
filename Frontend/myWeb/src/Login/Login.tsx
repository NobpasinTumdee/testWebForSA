import React from 'react';
import './Login.css';

const Login: React.FC = () => {
    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className='colortext' >NetFlim</h1>
                <input type="text" placeholder="username" className="input-field" />
                <input type="password" placeholder="password" className="input-field" />
                <a href="/forget-password" className="forgot-password">FORGOT PASSWORD</a>
                <button className="login-button">LOG IN</button>
                <a href="#" className="signup-link">SIGN UP NOW</a>
            </div>
        </div>
    );
};

export default Login;
