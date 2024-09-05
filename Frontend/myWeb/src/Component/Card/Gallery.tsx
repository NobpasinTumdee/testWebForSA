import React from 'react';
import './Gallery.css';

import A1 from "./img/1.jpg";
import A2 from "./img/2.jpg";
import A3 from "./img/3.jpg";
import A4 from "./img/4.jpg";
import A5 from "./img/5.jpg";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Gallery: React.FC = () => {

    const notify = () => toast.warn('Pls login', {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    return (
        <div className='bodyG' >
            <div className="container">
                <div className="card"onClick={notify}>
                    <img src={A1} alt="Gallery Image 1" />
                    <div className="overlay">59/WEEK</div>
                </div>
                <div className="card">
                    <img src={A2} alt="Gallery Image 2" />
                    <div className="overlay"></div>
                </div>
                <div className="card"onClick={notify}>
                    <img src={A3} alt="Gallery Image 3" />
                    <div className="overlay">199/MONTH</div>
                </div>
                <div className="card">
                    <img src={A4} alt="Gallery Image 4" />
                    <div className="overlay"></div>
                </div>
                <div className="card"onClick={notify}>
                    <img src={A5} alt="Gallery Image 5" />
                    <div className="overlay">1999/YEAR</div>
                </div>
            </div>
            <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
            
        </div>
    );
};
