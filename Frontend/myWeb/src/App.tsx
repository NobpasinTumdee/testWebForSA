import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import ForgetPassword from './ForgetPassword/ForgetPassword';
import MainWeb from './MainWeb/MainWeb';
import SignUp from './SignUp/SignUp';
import EditInformation from './EditInformation/EditInformation';
import WatchMovie from './WatchMovie/WatchMovie';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route path="/mainWeb" element={<MainWeb />} />
                <Route path="/signup" element={<SignUp />} /> 
                <Route path="/login" element={<Login />} />
                <Route path="/EditInformation" element={<EditInformation />} />
                <Route path="/WatchMovie" element={<WatchMovie />} />
                
            </Routes>
        </Router>
    );
};

export default App;

