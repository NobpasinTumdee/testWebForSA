import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import ForgetPassword from './ForgetPassword/ForgetPassword';
import MainWeb from './MainWeb/MainWeb';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route path="/mainWeb" element={<MainWeb />} />
            </Routes>
        </Router>
    );
};

export default App;

