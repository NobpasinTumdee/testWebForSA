
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { GetcollectionMovieById, DeleteCollectionMovieByID } from "../services/https/index";
import { message, Select, Space } from "antd"; // Ant Design message for notifications
import { CollectionMovieInterface } from "../interfaces/IMoviePackage";
import './Collection.css'

export const CollectionUpdate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [CollectM, setCollectM] = useState<CollectionMovieInterface[]>([]); // ตั้งค่าเริ่มต้นให้เป็น array ว่าง
  //const [Packages, setPackage] = useState<CollectionsInterface[]>([]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPopup = () => {
    setIsPopupOpen(true);
  };
  const closePopup = () => {
    setIsPopupOpen(false);
  };



  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };



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
        {CollectM.length > 0 && <h1 className="History-title">{CollectM[0].collection_name}</h1>}
        <button onClick={openPopup} className='AddMovie' style={{ color: '#ffff', marginBottom: '40px', background: '#201536', padding: '10px' }}>Add Movie in your Collection</button>
        <div className="movie-gridCollection" >
          {CollectM.length > 0 ? (
            CollectM.map((CollectM) => (
              <div key={CollectM.id} >
                <div className="movie-cardCollection" >
                  <img src={CollectM.MoviePoster} alt={CollectM.movie_name} className="movie-image" />
                  <div className="movie-info">
                    <h2 style={{ fontSize: '20px', textAlign: 'center' }}>{CollectM.movie_name || "No Movie Name"}</h2>
                  </div>
                  <button className="edit-button" onClick={() => handleDelete(CollectM.id)}>
                    🗑️
                  </button>
                </div>
              </div>

            ))
          ) : (
            <>
              <div style={{ textAlign: 'center', fontSize: '44px', marginLeft: '15%' }}>
                <h1 style={{ textAlign: 'center', fontSize: '34px' }}>Your viewing history is not yet available.</h1>
                <a href="/MainWeb">✨Add Movie in your Collection now✨</a>

                <div style={{ textAlign: 'center' }}>
                  <img style={{ width: '20%' }} src='https://media.tenor.com/Comp_iIhz44AAAAi/yui-yui-hirasawa.gif' />
                </div>
              </div>
            </>
          )}
        </div>
        <a href="/Collection" className="return-button-Admin">Return to Your Collection</a>
      </div>

      {isPopupOpen && (
        <div className="popup-overlay-collection">
          <div className="popup-content-collection">
            <button onClick={closePopup} className="popup-close-button-collection">
              X
            </button>
            <h3>Add Movie to Collection</h3>
            <Space wrap>
              <Select
                defaultValue="lucy"
                style={{ width: 300 }}
                onChange={handleChange}
                options={[
                  { value: 'jack', label: 'Jack' },
                  { value: 'lucy', label: 'Lucy' },
                  { value: 'Yiminghe', label: 'yiminghe' },
                ]}
              />
            </Space>

          </div>
        </div>
      )}
    </>
  );
};

export default CollectionUpdate;
