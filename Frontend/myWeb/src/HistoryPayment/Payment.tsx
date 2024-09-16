import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Mastercard from '../Component/Card/Mastercard';
import { DeletePaymenteByidUser } from "../services/https/index";
import { message } from "antd";
import './Btn.css';

const Payment: React.FC = () => {
  const location = useLocation();
  const [subscriptionDuration, setSubscriptionDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Extract duration and package name from query parameters
    const params = new URLSearchParams(location.search);
    const duration = parseInt(params.get('duration') || '0', 10);
    setSubscriptionDuration(duration);
  }, [location]);

  const getFormattedDateTime = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = (date.getFullYear() + 543).toString();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };
  const getFormattedexp = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = (date.getFullYear() + 543).toString();
    return `${day}-${month}-${year} `;
  };

  const calculateExpirationDate = (durationInDays: number): string => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + durationInDays);
    return getFormattedexp(expirationDate);
  };

  const deleteSub = async () => {
    const userIdstr = localStorage.getItem("id");
    if (userIdstr) {
      try {
        const res = await DeletePaymenteByidUser(String(userIdstr));
        if (res.status === 200) {
          message.success("ยกเลิกสมาชิกสำเร็จ😚");
        } else {
          message.error("ไม่สามารถยกเลิกสมาชิกได้🥹");
        }
      } catch (error) {
        message.error("เกิดข้อผิดพลาดในการยกเลิก😭");
      }
    } else {
      message.error("ID ผู้ใช้ไม่ถูกต้อง🫥");
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center", color: '#ffff' }} className="History-title">Payment</h1>
      <div style={{ color: '#ffff', margin: "0px 43%", width: '250px' }}>
        Right Now: {getFormattedDateTime(currentTime)}
      </div>
      <div style={{ color: '#ffff', margin: "0px 43%", width: '250px' }}>
        Subscription Expire: {calculateExpirationDate(subscriptionDuration)}
      </div>
      <Mastercard />
      <button style={{ margin: '0px 43%' }} onClick={deleteSub} className="Btn">
        <div className="sign">
          <svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg>
        </div>
        <div className="textPay">ยกเลิกสมาชิก</div>
      </button>
      <a href="/subscription" className="return-button-Admin">Return to subscription page</a>
    </>
  );
};

export default Payment;
