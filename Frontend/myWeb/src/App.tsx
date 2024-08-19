import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login1 from './Login/Login1';
import Login from './Login/Login';
import ForgetPassword from './ForgetPassword/ForgetPassword';
import MainWeb from './MainWeb/MainWeb';
import SignUp from './SignUp/SignUp';
import EditInformation from './EditInformation/EditInformation';
import WatchMovie from './WatchMovie/WatchMovie';
import Subscription from './subscription/subscription';
import Admin from './Admin/Admin';
import History from './History/History';
import Collection from './Collection/Collection' ;
import AboutMe from './AboutMe/AboutMe';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login1 />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route path="/mainWeb" element={<MainWeb />} />
                <Route path="/signup" element={<SignUp />} /> 
                <Route path="/login" element={<Login />} />
                <Route path="/EditInformation" element={<EditInformation />} />
                <Route path="/WatchMovie" element={<WatchMovie />} />
                <Route path="/Subscription" element={<Subscription />} />
                <Route path="/Admin" element={<Admin />} />
                <Route path="/History" element={<History />} />
                <Route path="/Collection" element={<Collection />} />
                <Route path="/AboutMe" element={<AboutMe />} />

                
            </Routes>
        </Router>
    );
};

export default App;

