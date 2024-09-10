import React from 'react';
import { Carousel } from 'antd';
//import yournamePosterBig4 from '../../assets/Anime/yournamePosterBig4.png'
import gojo from '../../assets/Anime/gojoPoster.png'
import kamado from '../../assets/Anime/tanjiroPoster.png'


const Carousels: React.FC = () => (
  <Carousel autoplay>
    
      <img style={{height: "270px",textAlign: "center",marginLeft: "20%"}} src={gojo} alt="" />
    
      <img style={{height: "270px",textAlign: "center",marginLeft: "20%"}} src={kamado} alt="" />
    
    
    
  </Carousel>
);

export default Carousels;