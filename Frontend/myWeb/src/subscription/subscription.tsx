import { useState , useEffect } from 'react';
import './subscription.css';
import payment from "../assets/payment/payment.jpg";
import mastercard from "../assets/payment/mastercard.png";
import Gpay from "../assets/payment/Gpay.png";
import visa from "../assets/payment/visa.png";
import Prompay from "../assets/payment/Prompay.png";

//API
import { PackageInterface } from "../interfaces/IMoviePackage";
import axios from 'axios';

const Subscription = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');



  //Form API
  const [Packages, setPackage] = useState<PackageInterface[]>([]);
  useEffect(() => {
    axios.get<PackageInterface[]>('http://localhost:8000/MoviePackages')
      .then(response => {
        console.log(response.data); // ดูข้อมูลที่ได้รับจาก API ใน console
        setPackage(response.data); // TypeScript จะรู้ว่าข้อมูลที่ได้รับคือ Album[]
      })
      .catch(error => {
        console.error('มีข้อผิดพลาดในการดึงข้อมูล:', error);
      });
  }, []);

  // const plans = [
  //   { duration: 'WEEK', price: '59 ฿', description: 'You can watch all the movies on the web.', durationDescription: 'Duration of viewing 1 week' },
  //   { duration: 'MONTH', price: '199 ฿', description: 'You can watch all the movies on the web.', durationDescription: 'Duration of viewing 1 month' },
  //   { duration: 'YEAR', price: '1999 ฿', description: 'You can watch all the movies on the web.', durationDescription: 'Duration of viewing 1 year' },
  // ];

  const openPopup = (Package_name: string) => {
    setSelectedPlan(Package_name);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const proceedToPayment = () => {
    setIsPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsSuccessPopupOpen(true);
    setTimeout(() => {
      setIsSuccessPopupOpen(false);
    }, 2000);
  };

  const PayPopup = () => {
    setIsImagePopupOpen(true);
  };

  const closeImagePopup = () => {
    setIsImagePopupOpen(false);
  };

  return (
    <div className="subscription-container">
      <h1 className="subscription-title">SUBSCRIPTION</h1>
      <div className="plans-container">
        {Packages.map((Package, index) => (
          <div key={index} className="plan-card">
            <h2 className="plan-duration">{Package.Package_name}</h2>
            <h3 className="plan-price">{Package.Price} Bath</h3>
            <p className="plan-description">You have the opportunity to enjoy watching all the movies available on the website, providing you with unlimited access to a wide variety of films, ensuring endless entertainment at your fingertips.</p>
            <p className="plan-duration-description">{Package.Duration} Day</p>
            <button className="choose-plan-button" onClick={() => openPopup(Package.Package_name ?? '')}>
              Choose Plan
            </button>
          </div>
        ))}
      </div>

      <a href="/MainWeb" className="return-button-Admin">Return to home page</a>

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Payment for {selectedPlan} Plan</h2>
            <p>Total amount: {Packages.find(Packages => Packages.Package_name === selectedPlan)?.Price}</p>
            <div>
              <img src={mastercard} className="imgPayment" onClick={PayPopup} alt="Payment" />
              <img src={Prompay} className="imgPayment" onClick={PayPopup} alt="Payment" />
            </div>
            <div>
              <img src={Gpay} className="imgPayment" onClick={PayPopup} alt="Payment" />
              <img src={visa} className="imgPayment" onClick={PayPopup} alt="Payment" />
            </div>

            <button className="close-button" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}

      {isSuccessPopupOpen && (
        <div className="popup-overlay">
          <div className="success-popup-content">
            <div className="success-checkmark">✔</div>
            <p>Payment Successful!</p>
          </div>
        </div>
      )}

      {isImagePopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div>
              <img src={payment} alt="Payment Info" className="popup-image" />
            </div>
            <div>
              <button className="payment-button" onClick={proceedToPayment}>Proceed to Payment</button>
              <button className="close-button" onClick={closeImagePopup}>Close</button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Subscription;
