import React from 'react';
import './AboutMe.css';
import {APItestMoviePackage} from "../testApi/Apitest"


const AboutMe: React.FC = () => {

    
    return (
        <>
        <APItestMoviePackage />
        </>
        
    );
};

export default AboutMe;
/*
<div className="textAbout">
            <h1 className='AboutMeTitie'>ABOUT ME</h1>
            <div className='divAboutMe'>
                <a>USERNAME : Nichakorn </a>
            </div>
            <div className='divAboutMe'>
                <a>Gmail : nn@gmail.com</a>
            </div>
            <div className='divAboutMe'>
                <a>Duration : 1 Month</a>
            </div>
            <div className='divAboutMe'>
                <a>Expire : 16 September 2024</a>
            </div>
                <a  href="/MainWeb"  className="return-button-Admin">Return to home page</a>

        </div>*/