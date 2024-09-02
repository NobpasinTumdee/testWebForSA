import React from 'react';
import { BrowserRouter as Router, Route, Routes ,useLocation } from 'react-router-dom';
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
import PreviewSubscription from './subscription/PreviewSubscription'
import { Navbar } from './Component/Navbar/Navbar';
import Social from "./Component/Social/Social"
import Intro from './Component/Intro/Intro';

// import {PopUpAdmin} from './Component/PopUpAdmin';
// <PopUpAdmin /> 
 
//import LoadingScreen from './Component/LoadingScreen';
//<LoadingScreen />


// ติดตั้ง npm install react-loader-spinner --save  และ  npm install --save react-toastify


const App: React.FC = () => {
    const location = useLocation();

    const IntroLogo = ['/'].includes(location.pathname);
    const hideNavbar = [ '/','/login', '/forget-password', '/signup','/MainWeb','/PreviewSubscription'].includes(location.pathname);
    const hideSocial = [ '/MainWeb','/WatchMovie','/subscription'].includes(location.pathname);


    return (
        <div>
            {IntroLogo && <Intro />}
            {!hideNavbar && <Navbar />}
            {!hideSocial && <Social /> }
            <Routes>
                
                <Route path="/" element={<Login1 />} />
                <Route path="/login" element={<Login />} />
                <Route path="/Forget-password" element={<ForgetPassword />} />
                <Route path="/signup" element={<SignUp />} /> 
                <Route path="/MainWeb" element={<MainWeb />} />
                <Route path="/EditInformation" element={<EditInformation />} />
                <Route path="/WatchMovie" element={<WatchMovie />} />
                <Route path="/Subscription" element={<Subscription />} />
                <Route path="/Admin" element={<Admin />} />
                <Route path="/History" element={<History />} />
                <Route path="/Collection" element={<Collection />} />
                <Route path="/AboutMe" element={<AboutMe />} />
                <Route path="/PreviewSubscription" element={<PreviewSubscription />} />
            </Routes>
        </div>
    );
};

const AppWrapper: React.FC = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;
