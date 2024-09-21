import { useState, useEffect } from 'react';
import './Collection.css';

//import icon from "../assets/icon/RedHeart.png"


import { LoadingHart } from '../Component/Loading/LoadingHart';

import CollectionComponent from './CollectionComponent';
import { message } from "antd"; // Ant Design message for notifications

//API
import { CollectionsInterface } from '../interfaces/IMoviePackage';
import { GetCollectionById,DeleteCollectionByID } from '../services/https/index';
import { useNavigate } from "react-router-dom";

const Collection: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [Collections, setCollection] = useState<CollectionsInterface[]>([]); // ตั้งค่าเริ่มต้นให้เป็น array ว่าง

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const userIdstr = localStorage.getItem("id");

  useEffect(() => {
    if (userIdstr) {
      fetchUserData(userIdstr);
    } else {
      message.error("The user ID was not found in localStorage.");
    }
  }, [userIdstr]);

  const fetchUserData = async (userIdstr: string) => {
    try {
      const res = await GetCollectionById(userIdstr);
      if (res.status === 200 && res.data) {
        setCollection(res.data); // กำหนดให้เป็น array ที่ได้จาก API
      } else {
        setCollection([]); // ถ้าไม่มีข้อมูล ให้กำหนดเป็น array ว่าง
        message.error("No Collection !!!");
      }
    } catch (error) {
      setCollection([]); // กำหนดให้เป็น array ว่างเมื่อมี error
      message.error("Your viewing collection is not yet available.");
    }
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000)
  })

  const handleDelete = async (id: number | undefined) => {
    if (id) {
      try {
        const res = await DeleteCollectionByID(String(id));
        if (res.status === 200) {
          // อัปเดต state เพื่อลบประวัติจากหน้าจอทันที
          setCollection((prevHistory) => prevHistory.filter(item => item.id !== id));
          message.success("Delete Success");
        } else {
          message.error("Unable to delete collection");
        }
      } catch (error) {
        message.error("An error occurred deleting collection.");
      }
    } else {
      message.error("ID is invalid.");
    }
  };

  return (
    <>
      {isLoading ? (<div style={{
        position: 'fixed', top: '50%', left: '55%', marginTop: '-50px', marginLeft: '-100px'
      }}><LoadingHart /></div>) : (
        <div className="Collection-container">
          <h1 className="Collection-title">COLLECTION</h1>
          <button className="AddCollection" onClick={() => openPopup()}>
            Add Collection !!!
          </button>
          <div className="movies-listCollection">
            {Collections.map((Collection) => (
              <div key={Collection.id}>
                <button style={{background: 'transparent',border: 'transparent'}} onClick={() => navigate(`/CollectionUpdate/${Collection.id}`)}>
                <div className="cardCollection">
                  <div className="card-innerCollection">
                    <div className="card-frontCollection">
                      <p> {Collection.Collection_name}</p>
                    </div>
                    <div className="card-backCollection">
                      <p>By {Collection.Username} ✨</p>
                    </div>
                  </div>
                  
                </div>
              </button>
                  <button className="edit-button" onClick={() => handleDelete(Collection.id)}>
                    🗑️
                  </button>
              </div>
            ))}

          </div>
          <a href="/MainWeb" className="return-button-Collection">Return to home page</a>
          {isPopupOpen && (
            <div className='popup-container'>
              <CollectionComponent />

              <button onClick={closePopup} className="close-popup-button">
              Click on it to close it.
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Collection;
