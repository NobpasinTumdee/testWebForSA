import React from 'react';
import { Carousel } from 'antd';
//import yournamePosterBig4 from '../../assets/Anime/yournamePosterBig4.png'
import gojo from '../../assets/Anime/gojoPoster.png'
import JJK2 from '../../assets/Anime/JJK2.jpg'
import Sukuna from '../../assets/Anime/Sukuna.jpg'
import JJK1 from '../../assets/Anime/JJK1.jpg'



const Carousels: React.FC = () => (
  <Carousel autoplay>
    
      <img style={{height: "270px",textAlign: "center",marginLeft: "20%"}} src={gojo} alt="" />
    
      <img style={{height: "270px",textAlign: "center",marginLeft: "20%"}} src={JJK1} alt="" />
    
      <img style={{height: "270px",textAlign: "center",marginLeft: "20%"}} src={JJK2} alt="" />
      
      <img style={{height: "270px",textAlign: "center",marginLeft: "20%"}} src={Sukuna} alt="" />
    
    
  </Carousel>
);

export default Carousels;