import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import ForgetPassword from './ForgetPassword/ForgetPassword';
import MainWeb from './MainWeb/MainWeb';
import SignUp from './SignUp/SignUp';
<<<<<<< HEAD
<<<<<<< HEAD
import Subscription from './subscriptions/subscription';
=======
>>>>>>> parent of 0a585d8 (ทำหน้า watch movie)
=======
>>>>>>> parent of 0a585d8 (ทำหน้า watch movie)

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route path="/mainWeb" element={<MainWeb />} />
                <Route path="/signup" element={<SignUp />} /> 
                <Route path="/login" element={<Login />} />
<<<<<<< HEAD
<<<<<<< HEAD
                <Route path="/subscription" element={<Subscription />} />
=======
>>>>>>> parent of 0a585d8 (ทำหน้า watch movie)
=======
>>>>>>> parent of 0a585d8 (ทำหน้า watch movie)
            </Routes>
        </Router>
    );
};

export default App;

