import { useState, useEffect } from 'react';
import './subscription.css';
import payment from "../assets/payment/payment.jpg";
import mastercard from "../assets/payment/mastercard.png";
import Gpay from "../assets/payment/Gpay.png";
import visa from "../assets/payment/visa.png";
import Prompay from "../assets/payment/Prompay.png";
//API
import { PackageInterface, PaymentsInterface } from "../interfaces/IMoviePackage";
import { UpdatePaymenteByidUser } from "../services/https/index";
import axios from 'axios';

const Subscription = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PackageInterface | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>(''); // เพิ่มสถานะการเลือกการชำระเงิน
  const userIdstr = localStorage.getItem("id");

  //Form API
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
        setPackage(response.data); // บันทึกข้อมูลลงใน state
      })
      .catch(error => {
        console.error('มีข้อผิดพลาดในการดึงข้อมูล:', error);
      });
  }, []);

  const handlePaymentsClick = () => {
    if (userIdstr && selectedPlan) {
      const paymentData: PaymentsInterface = {
        UserID: parseInt(userIdstr),
        PackageID: selectedPlan.ID,
        Package_name: selectedPlan.Package_name,
        Payment_method: selectedPaymentMethod, // เพิ่มวิธีการชำระเงินที่ผู้ใช้เลือก
        Payment_status: "paid",
        DateP: new Date(),
      };
      UpdatePaymenteByidUser(userIdstr,paymentData);
    }
  };

  const openPopup = (Package: PackageInterface) => {
    setSelectedPlan(Package); // เก็บข้อมูล package ที่เลือก
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const proceedToPayment = () => {
    setIsPopupOpen(false);
    setIsImagePopupOpen(false);
    handlePaymentsClick(); // ส่งข้อมูลการชำระเงิน
    setIsSuccessPopupOpen(true);
    setTimeout(() => {
      setIsSuccessPopupOpen(false);
    }, 2000);
  };

  const PayPopup = (method: string) => {
    setSelectedPaymentMethod(method); // บันทึกวิธีการชำระเงินที่เลือก
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
            <button className="choose-plan-button" onClick={() => openPopup(Package)}>
              Choose Plan
            </button>
          </div>
        ))}
      </div>

      <a href="/MainWeb" className="return-button-Admin">Return to home page</a>

      {isPopupOpen && selectedPlan && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Payment for {selectedPlan.Package_name} Plan</h2>
            <p>Total amount: {selectedPlan.Price}</p>
            <div>
              <img src={mastercard} className="imgPayment" onClick={() => PayPopup('MasterCard')} alt="Payment" />
              <img src={Prompay} className="imgPayment" onClick={() => PayPopup('PromptPay')} alt="Payment" />
            </div>
            <div>
              <img src={Gpay} className="imgPayment" onClick={() => PayPopup('Google Pay')} alt="Payment" />
              <img src={visa} className="imgPayment" onClick={() => PayPopup('Visa')} alt="Payment" />
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
