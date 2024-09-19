import React, { useState, useRef } from 'react';
import './AboutMe.css';
//import {APItestMoviePackage} from "../testApi/Apitest"
//import {UsertopRigh} from "../Component/UsertopRigh/UsertopRigh";
//import Carousels from "../Component/Carousels/Carousels";
import Mastercard from "../Component/Card/Mastercard";
import PaymentCard from "../Component/Card/PaymentCard";
import {CommentCom} from "../Comment/ComponentComment/CommentCom";
import lofi from '../assets/audio/LofiChristmas.mp3';
const AboutMe: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false); // state สำหรับจัดการ play/pause
  const audioRef = useRef<HTMLAudioElement | null>(null); // ref สำหรับ audio element

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause(); // ถ้ากำลังเล่น หยุดเล่น
      } else {
        audioRef.current.play(); // ถ้าไม่เล่น ให้เริ่มเล่น
      }
      setIsPlaying(!isPlaying); // เปลี่ยนสถานะ play/pause
    }
  };

    
    return (
        <>
        {/* <APItestMoviePackage /> 
        <UsertopRigh />
        <Carousels />*/}
        <CommentCom />
        <Mastercard />
        <PaymentCard />
        <div style={{margin: '0% 40%'}}>
            <audio ref={audioRef} src={lofi} /> 
            <button onClick={handlePlayPause}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
        </div>
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