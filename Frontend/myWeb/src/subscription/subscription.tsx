import React from 'react';
import './subscription.css'; 
import verifyImage from '../assets/verify.png';
const Subscription: React.FC = () => {
  return (
    <div className="container">
      <div className="background-overlay" />
      <div className="plan-card week-plan">
        <div className="card-content">
          <div className="choose-plan">Choose Plan</div>
        </div>
      </div>
      <div className="plan-card month-plan">
        <div className="card-content">
          <div className="choose-plan">Choose Plan</div>
        </div>
      </div>
      <div className="plan-card year-plan">
        <div className="card-content">
          <div className="choose-plan">Choose Plan</div>
        </div>
      </div>
      <div className="label week">WEEK</div>
      <div className="subscription-title">subscription</div>
      <div className="label month">MONTH</div>
      <div className="label year">YEAR</div>
      <div className="price week-price">59</div>
      <div className="price month-price"> 199
      </div>
      <div className="price year-price">1999</div>

      <a href="/MainWeb" >
      <div className="return-home">
        
        <div  className="return-home-text">Return to home page</div>
        
        <div className="return-home-button" />
      </div>
      </a>

      <img className="icon1" src={verifyImage} alt="icon1" />
      <div className="description6">Duration of viewing <br /> 1 week</div>
      <img className="icon2" src={verifyImage} alt="icon2" />
      <div className="description1">You can watch all <br />the movies on the web.</div>
      <img className="icon3" src={verifyImage} alt="icon3" />
      <div className="description5">Duration of viewing <br /> 1 month</div>
      <img className="icon4" src={verifyImage} alt="icon4" />
      <div className="description2">You can watch all <br />the movies on the web.</div>
      <img className="icon5" src={verifyImage} alt="icon5" />
      <div className="description4">Duration of viewing <br /> 1 year</div>
      <img className="icon6" src={verifyImage} alt="icon6" />
      <div className="description3">You can watch all <br />the movies on the web.</div>
    </div>
  );
};

export default Subscription;