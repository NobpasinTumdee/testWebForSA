import { useState, useEffect } from 'react';
import '../History/History.css';
import { LoadingStarWar } from '../Component/Loading/LoadingStarWar';
// API
import { PaymentsInterface } from "../interfaces/IMoviePackage";
import { GetPaymentById } from "../services/https/index";
import { message } from "antd"; // Ant Design message for notifications

const HistoryPayment: React.FC = () => {
  const [history, setHistorypay] = useState<PaymentsInterface[]>([]); // ตั้งค่าเริ่มต้นให้เป็น array ว่าง
  const [isLoading, setLoading] = useState(true);
  const userIdstr = localStorage.getItem("id");

  useEffect(() => {
    if (userIdstr) {
      fetchUserData(userIdstr);
    } else {
      message.error("ไม่พบ ID ของผู้ใช้ใน localStorage");
    }
  }, [userIdstr]);

  const fetchUserData = async (userIdstr: string) => {
    try {
      const res = await GetPaymentById(userIdstr);
      if (res.status === 200 && res.data) {
        setHistorypay(res.data); // กำหนดให้เป็น array ที่ได้จาก API
      } else {
        setHistorypay([]); // ถ้าไม่มีข้อมูล ให้กำหนดเป็น array ว่าง
        message.error("ยังไม่มีประวัติการรับชม!!!");
      }
    } catch (error) {
      setHistorypay([]); // กำหนดให้เป็น array ว่างเมื่อมี error
      message.error("Your viewing history is not yet available.");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  

  return (
    <>
      {isLoading ? (
        <div style={{ position: 'fixed', top: '50%', left: '55%', marginTop: '-50px', marginLeft: '-100px' }}>
          <LoadingStarWar />
        </div>
      ) : (
        <div className="History-container-payment">
          <h1 className="History-title">Payment</h1>
          <div className="movies-list">
            {history.length > 0 ? (
              history.sort((a, b) => new Date(b.DateP || "").getTime() - new Date(a.DateP || "").getTime()) .map((historyItem) => (
                  <div className="movie-card-Adminpage" key={historyItem.id}>
                    <div className="movie-info">
                      <h2>Username: {historyItem.username || "No Username"}</h2>
                      <h2>PaymentMethod: {historyItem.Payment_method || "No Payment_method"}</h2>
                      <p>PaymentStatus: {historyItem.Payment_status || "No Payment_status"}</p>
                      <p>Package_name: {historyItem.Package_name || "No Package_name"}</p>
                      <p>Date: {historyItem.DateP ? new Date(historyItem.DateP).toLocaleDateString() : "No Date"}</p>
                    </div>
                    
                  </div>
                ))
            ) : (
              <>
                <div style={{ textAlign: 'center', fontSize: '44px' }}>
                  <h1 style={{ textAlign: 'center', fontSize: '34px' }}>You are not a member yet. Please register first.</h1>
                  <a href="/MainWeb">✨Subscription now✨</a>
                </div>
                <div style={{ textAlign: 'center' }}>
                  {/* <img style={{width: '20%'}} src='https://media.tenor.com/Rp0U7bdOhSUAAAAj/anime.gif' />
                <img style={{width: '20%'}} src='https://i.giphy.com/boOoHL2PAFXahZyObR.webp' />
                <img style={{width: '20%'}} src='https://i.pinimg.com/originals/b2/80/b6/b280b67696c1a7d17a6d26e46ff9f254.gif' /> */}
                  <img style={{width: '20%'}} src='https://media.tenor.com/Comp_iIhz44AAAAi/yui-yui-hirasawa.gif' />
                </div>
              </>
            )}
          </div>
          <a href="/subscription" className="return-button-Admin">Return to home page</a>
        </div>
      )}
    </>
  );
};

export default HistoryPayment;
