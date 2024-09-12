
import { useState, useEffect } from 'react';
import {  useParams } from "react-router-dom";
import { GetcollectionMovieById,DeleteCollectionMovieByID } from "../services/https/index";
import { message } from "antd"; // Ant Design message for notifications
import { CollectionMovieInterface } from "../interfaces/IMoviePackage";



export const CollectionUpdate: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [CollectM, setCollectM] = useState<CollectionMovieInterface[]>([]); // ตั้งค่าเริ่มต้นให้เป็น array ว่าง
    //const [Packages, setPackage] = useState<CollectionsInterface[]>([]);

    useEffect(() => {
      if (id) {
        fetchUserData(id);
      } else {
        message.error("ไม่พบ ID ของ Collection ใน localStorage");
      }
    }, [id]);


    const fetchUserData = async (id: string) => {
      try {
        const res = await GetcollectionMovieById(id);
        if (res.status === 200 && res.data) {
          setCollectM(res.data); // กำหนดให้เป็น array ที่ได้จาก API
        } else {
          setCollectM([]); // ถ้าไม่มีข้อมูล ให้กำหนดเป็น array ว่าง
          message.error("ยังไม่มีข้อมูล!!!");
        }
      } catch (error) {
        setCollectM([]); // กำหนดให้เป็น array ว่างเมื่อมี error
        message.error("No Data.");
      }
    };

    const handleDelete = async (id: number | undefined) => {
      if (id) {
        try {
          const res = await DeleteCollectionMovieByID(String(id));
          if (res.status === 200) {
            // อัปเดต state เพื่อลบประวัติจากหน้าจอทันที
            setCollectM((prevMovie) => prevMovie.filter(item => item.id !== id));
            message.success("ลบประวัติสำเร็จ");
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
  

  return (
    <>
      {/* <div>Hello</div>
      {id} */}
      <div className="History-container">
          <h1 className="History-title">Collection</h1>
          <div className="movies-list">
            {CollectM.length > 0 ? (
              CollectM.map((CollectM) => (
                  <div className="movie-card-Adminpage" key={CollectM.id}>
                    <img src={CollectM.MoviePoster} alt={CollectM.movie_name} className="movie-image" />
                    <div className="movie-info">
                      <h2>Movie Name: {CollectM.movie_name || "No Movie Name"}</h2>
                    </div>
                    <button className="edit-button" onClick={() => handleDelete(CollectM.id)}>
                      🗑️
                    </button>
                  </div>
                ))
            ) : (
              <>
                <div style={{ textAlign: 'center', fontSize: '44px' }}>
                  <h1 style={{ textAlign: 'center', fontSize: '34px' }}>Your viewing history is not yet available.</h1>
                  <a href="/MainWeb">✨Add Movie in your Collection now✨</a>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <img style={{width: '20%'}} src='https://media.tenor.com/Comp_iIhz44AAAAi/yui-yui-hirasawa.gif' />
                </div>
              </>
            )}
          </div>
          <a href="/MainWeb" className="return-button-Admin">Return to home page</a>
        </div>
    </>
  );
};

export default CollectionUpdate;
