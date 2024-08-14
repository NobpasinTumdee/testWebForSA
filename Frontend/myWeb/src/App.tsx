import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import ForgetPassword from './ForgetPassword/ForgetPassword';
import MainWeb from './MainWeb/MainWeb';
import SignUp from './SignUp/SignUp';
import Subscription from './subscriptions/subscription';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route path="/mainWeb" element={<MainWeb />} />
                <Route path="/signup" element={<SignUp />} /> 
                <Route path="/login" element={<Login />} />
                <Route path="/subscription" element={<Subscription />} />
            </Routes>
        </Router>
    );
};

export default App;

