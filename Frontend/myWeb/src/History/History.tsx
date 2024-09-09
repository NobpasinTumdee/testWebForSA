import { useState, useEffect } from 'react';
import './History.css';
import { LoadingCamp } from '../Component/Loading/LoadingCamp';
// API
import { HistoryInterface } from "../interfaces/IMoviePackage";
import { GetHistoryById } from "../services/https/index";
import { message } from "antd"; // Ant Design message for notifications

const History: React.FC = () => {
  const [history, setHistory] = useState<HistoryInterface[]>([]);
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
      const res = await GetHistoryById(userIdstr);
      if (res.status === 200) {
        setHistory(res.data);
      } else {
        message.error("ไม่พบข้อมูลผู้ใช้");
      }
    } catch (error) {
      message.error("เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้");
    }
  };

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {isLoading ? (
        <div style={{ position: 'fixed', top: '30%', left: '47%', marginTop: '-50px', marginLeft: '-100px' }}>
          <LoadingCamp />
        </div>
      ) : (
        <div className="History-container">
          <h1 className="History-title">HISTORY</h1>
          <div className="movies-list">
            {history.length > 0 ? (
              history.map((historyItem) => {
                // ตรวจสอบข้อมูลจาก API
                console.log("History Item:", historyItem);

                return (
                  <div className="movie-card-Adminpage" key={historyItem.ID}>
                    <img src={historyItem.poster} alt={historyItem.movie_name} className="movie-image" />
                    <div className="movie-info">
                      <h2>Movie: {historyItem.movie_name || "No Movie Name"}</h2> {/* แสดง username */}
                      <p>Name: {historyItem.user_name || "No Username"}</p> {/* แสดงชื่อหนัง */}
                      <p>Date: {historyItem.date ? new Date(historyItem.date).toLocaleDateString() : "No Date Available"}</p> {/* แสดงวันที่ */}
                    </div>
                  </div>
                );
              })
            ) : (
              <div>No history data available</div>
            )}
          </div>
          <a href="/MainWeb" className="return-button-Admin">Return to home page</a>
        </div>
      )}
    </>
  );
};

export default History;
