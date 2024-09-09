import { useState, useEffect } from 'react';
import './History.css';
import { LoadingCamp } from '../Component/Loading/LoadingCamp';
// API
import { HistoryInterface } from "../interfaces/IMoviePackage";
import { GetHistoryById, DeleteHistoryByID } from "../services/https/index";
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
        message.error("ยังไม่มีประวัติการรับชม!!!");
      }
    } catch (error) {
      message.error("Your viewing history is not yet available.");
    }
  };

  // ฟังก์ชันสำหรับลบประวัติการรับชม
  const handleDelete = async (id: number | undefined) => {
    if (id) {
      try {
        const res = await DeleteHistoryByID(String(id));
        if (res.status === 200) {
          // อัปเดต state เพื่อให้ข้อมูลประวัติถูกลบออกจากหน้าจอทันที
          message.success("ลบประวัติสำเร็จ");
          setHistory((prevHistory) => prevHistory.filter(item => item.id !== id));
        } else {
          message.error("ไม่สามารถลบประวัติได้");
        }
      } catch (error) {
        message.error("เกิดข้อผิดพลาดในการลบประวัติ");
      }
    } else {
      message.error("ID ของประวัติไม่ถูกต้อง");
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
                return (
                  <div className="movie-card-Adminpage" key={historyItem.id}>
                    <img src={historyItem.poster} alt={historyItem.movie_name} className="movie-image" />
                    <div className="movie-info">
                      <h2>Movie: {historyItem.movie_name || "No Movie Name"}</h2>
                      <p>User Name: {historyItem.user_name || "No Username"}</p>
                      <p>Date: {historyItem.date ? new Date(historyItem.date).toLocaleDateString() : "No Date Available"}</p>
                    </div>
                    <button className="edit-button" onClick={() => handleDelete(historyItem.id)}>
                      🗑️
                    </button>
                  </div>
                );
              })
            ) : (
              <div style={{ textAlign: 'center', fontSize: '44px' }}>
                <h1 style={{ textAlign: 'center', fontSize: '34px' }}>Your viewing history is not yet available.</h1>
                <a href="/MainWeb">✨Watch now✨</a>
              </div>
            )}
          </div>
          <a href="/MainWeb" className="return-button-Admin">Return to home page</a>
        </div>
      )}
    </>
  );
};

export default History;
