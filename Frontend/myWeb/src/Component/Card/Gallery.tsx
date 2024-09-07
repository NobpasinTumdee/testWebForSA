import React, { useEffect, useState } from 'react';
import './Gallery.css';

import A1 from "./img/1.jpg";
import A2 from "./img/2.jpg";
import A3 from "./img/3.jpg";
import A4 from "./img/4.jpg";
import A5 from "./img/5.jpg";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// API
import { PackageInterface } from "../../interfaces/IMoviePackage";
import axios from 'axios';

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

    // Fetch API
    const [Packages, setPackage] = useState<PackageInterface[]>([]);

    useEffect(() => {
        const Authorization = localStorage.getItem("token");
        const Bearer = localStorage.getItem("token_type");

        const requestOptions = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `${Bearer} ${Authorization}`,
            },
        };

        axios.get<PackageInterface[]>('http://localhost:8000/MoviePackages', requestOptions)
            .then(response => {
                console.log(response.data); // ดูข้อมูลที่ได้รับจาก API ใน console
                setPackage(response.data); // บันทึกข้อมูลลงใน state
            })
            .catch(error => {
                console.error('มีข้อผิดพลาดในการดึงข้อมูล:', error);
            });
    }, []);

    return (
        <div className='bodyG'>
            <div className="container">
                {/* รูปที่ 1 */}
                <div className="card" onClick={notify}>
                    <img src={A1} alt="Gallery Image 1" />
                    <div className="overlay">{Packages[0]?.Package_name ?? 'No Data'} {Packages[0]?.Price ?? 'No Data'}</div>
                </div>

                {/* รูปที่ 2 */}
                <div className="card">
                    <img src={A2} alt="Gallery Image 2" />
                    <div className="overlay"></div>
                </div>

                {/* รูปที่ 3 */}
                <div className="card" onClick={notify}>
                    <img src={A3} alt="Gallery Image 3" />
                    <div className="overlay">{Packages[1]?.Package_name ?? 'No Data'} {Packages[1]?.Price ?? 'No Data'}</div>
                </div>

                {/* รูปที่ 4 */}
                <div className="card">
                    <img src={A4} alt="Gallery Image 4" />
                    <div className="overlay"></div>
                </div>

                {/* รูปที่ 5 */}
                <div className="card" onClick={notify}>
                    <img src={A5} alt="Gallery Image 5" />
                    <div className="overlay">{Packages[2]?.Package_name ?? 'No Data'} {Packages[2]?.Price ?? 'No Data'}</div>
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
