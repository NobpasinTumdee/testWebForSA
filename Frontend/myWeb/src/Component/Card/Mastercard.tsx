import styles from './Mastercard.module.css'; // Import CSS module
import { useState, useEffect } from 'react';
// API
import { PaymentsInterface } from "../../interfaces/IMoviePackage";
import { GetPaymentById } from "../../services/https/index";
import { message } from "antd"; // Ant Design message for notifications


const Mastercard: React.FC = () => {
  const [history, setHistorypay] = useState<PaymentsInterface[]>([]); // ตั้งค่าเริ่มต้นให้เป็น array ว่าง
  const userIdstr = localStorage.getItem("id");
  const date = String(history[0]?.DateP)
  useEffect(() => {
    if (userIdstr) {
      fetchUserData(userIdstr);
    } else {
      message.error("The user ID was not found in localStorage😭");
    }
  }, [userIdstr]);

  const fetchUserData = async (userIdstr: string) => {
    try {
      const res = await GetPaymentById(userIdstr);
      if (res.status === 200 && res.data) {
        setHistorypay(res.data); // กำหนดให้เป็น array ที่ได้จาก API
      } else {
        setHistorypay([]); // ถ้าไม่มีข้อมูล ให้กำหนดเป็น array ว่าง
        message.error("There is no order history yet💸");
      }
    } catch (error) {
      setHistorypay([]); // กำหนดให้เป็น array ว่างเมื่อมี error
      message.error("Error detected🤯");
    }
  };



  return (
    <div className={styles.containerM}>
      <div className={styles.frontCard}>
        <h3 className={styles.mainTitle}>
          {history[0]?.Payment_method ?? 'No Data'} | <span className='SpanM'>{history[0]?.Payment_status ?? 'No Data'}</span>
        
        </h3>
        
        <i className={`fa fa-globe ${styles.globe}`}></i>
        <div className={styles.chip}><h3>{history[0]?.username ?? 'No Data'}</h3></div>
        <div className={styles.cardInfo}>
          <p className={styles.no}>5423 4426 6230 0041</p>
          <p className={styles.name}>{history[0]?.Package_name ?? 'No Data'}</p>
          <p className={styles.expDate}>
            <span>Date</span> : {date}
          </p>
        </div>
        <div className={styles.mastercard}></div>
      </div>
    </div>
  );
};

export default Mastercard;
