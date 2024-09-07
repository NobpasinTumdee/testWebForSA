import React from 'react';
import './WatchMovie.css';

import {  useLocation } from 'react-router-dom';

//loveBTN
import { LoveBtn } from '../Component/LoveBtn/LoveBtn';


  
const WatchMovie: React.FC = () => {

   const location = useLocation();
   const { videoUrl, movieName,Movie_poster } = location.state as { videoUrl: string; movieName: string; Movie_poster: string;};
 
//   const movie = location.state as { id: number; title: string; image: string; link: string};

   return (
     <div className="watch-movie-container">
       <div className="movie-header">
        {movieName}
         <LoveBtn />
       </div>
       <div className="movie-content">
         <div className="movie-player">
           <iframe
             src={videoUrl}
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
             allowFullScreen
           />
         </div>
         <div className="movie-infoWatch">
           <img src={Movie_poster} alt={movieName} className="movie-poster" />
           <div className="info">
             <h2>Movie information</h2>
             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis totam et autem inventore aliquam nisi nemo in eos blanditiis odit repellendus corporis tenetur repellat, quasi, magni sunt beatae maiores. Error incidunt earum repudiandae dolore? Nostrum eveniet animi fuga alias iusto velit, aut officiis accusantium quam impedit tenetur excepturi facilis numquam.</p>
           </div>
         </div>
       </div>
       <a  href="/MainWeb"  className="return-button-watch">Return to home page</a>
     </div>
   );
};

export default WatchMovie;


// const WatchMovie: React.FC = () => {
//   const location = useLocation();
//   const { videoUrl, movieName } = location.state as { videoUrl: string; movieName: string };

//   return (
//     <div className="watch-movie-container">
//       <h1>{movieName}</h1> {/* แสดงชื่อหนัง */}
//       {videoUrl && (
//         <iframe
//           src={videoUrl}
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//           allowFullScreen
//           style={{ width: '100%', height: '500px' }} // ปรับขนาดตามต้องการ
//         />
//       )}
//       {!videoUrl && <p>No video available</p>}
//     </div>
//   );
// };

// export default WatchMovie;