import React from 'react';
import { Carousel } from 'antd';
import yournamePosterBig4 from '../../assets/Anime/yournamePosterBig4.png'


const Carousels: React.FC = () => (
  <Carousel autoplay>
    
      <img style={{height: "270px",textAlign: "center",marginLeft: "20%"}} src={yournamePosterBig4} alt="" />
    
        <img style={{height: "270px",textAlign: "center",marginLeft: "20%"}} src={yournamePosterBig4} alt="" />
    
    <img style={{height: "270px",textAlign: "center",marginLeft: "20%"}} src={yournamePosterBig4} alt="" />
    
    <img style={{height: "270px",textAlign: "center",marginLeft: "20%"}} src={yournamePosterBig4} alt="" />
    
  </Carousel>
);

export default Carousels;