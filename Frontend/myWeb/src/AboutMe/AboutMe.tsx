import React from 'react';
import './AboutMe.css';
//import {APItestMoviePackage} from "../testApi/Apitest"
import {UsertopRigh} from "../Component/UsertopRigh/UsertopRigh";
import Carousels from "../Component/Carousels/Carousels";
import Mastercard from "../Component/Card/Mastercard";


const AboutMe: React.FC = () => {

    
    return (
        <>
        {/* <APItestMoviePackage /> 
        <UsertopRigh />
        <Carousels />*/}
        <Mastercard />
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