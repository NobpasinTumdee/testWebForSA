import React, { FC ,useState,useEffect } from 'react';
import { UsersInterface } from '../interfaces/IUser';
import { GetUserById } from '../services/https' ;
//import { useNavigate } from 'react-router-dom';
import './EditInformation.css';

import { Loading } from '../Component/Loading/Loading';

const EditInformation: FC = () => {
  //const navigate = useNavigate();

  // const handleReturnClick = () => {
  //   navigate('/MainWeb'); // เส้นทางกลับไปยังหน้า MainWeb
  // };
  const [oldUsername, setOldUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [isLoading, setLoading] = useState(true);
  const userIdstr = localStorage.getItem("id");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userIdstr) { // ตรวจสอบว่ามี userIdstr หรือไม่
          const response = await GetUserById(userIdstr);

          if (response && response.status === 200) {
            const userData: UsersInterface = response.data;
            setOldUsername(userData.username || '');
            setOldPassword(userData.password || ''); // ควรทำให้ปลอดภัยในการแสดงผลจริง
          } else {
            console.error('เกิดข้อผิดพลาดในการรับข้อมูลผู้ใช้');
          }
        } else {
          console.error('ไม่พบ userId ใน localStorage');
        }
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้:', error);
      } finally {
      }
    };

    fetchUserData();
  }, [userIdstr]); // ดึงข้อมูลใหม่เมื่อ userIdstr เปลี่ยนแปลง


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300)
  })

  

  const handleEditInformation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // เขียนโค้ดสำหรับอัปเดตข้อมูลผู้ใช้ที่นี่
  };

  
  return (
    <>
    {isLoading ? (<div style={{
        position: 'fixed', top: '50%', left: '55%', marginTop: '-50px', marginLeft: '-100px'
      }}><Loading /></div>) : (
    <div className="containerEdit">
      <h2 className='edit-h2'>EDIT INFORMATION</h2>
      <form className="edit-form" onSubmit={handleEditInformation}>
        <div className="form-group">
          <div className="input-group">
            <label>Old USERNAME</label>
            <input type="text" name="oldUsername" value={oldUsername} readOnly />
          </div>
          <div className="input-group">
            <label>New USERNAME</label>
            <input type="text" name="newUsername" required />
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <label>Old PASSWORD</label>
            <input type="password" name="oldPassword" value={oldPassword} readOnly />
          </div>
          <div className="input-group">
            <label>New PASSWORD</label>
            <input type="password" name="newPassword" required />
          </div>
        </div>
        <div className='form-group'>
          <div className="input-group">
            <label>Confirm PASSWORD</label>
            <input type="password" name="confirmPassword" required />
          </div>
        </div>
        <button type="submit" className="editinformation-button">
          Edit Information
        </button>
      </form>
      <a href="/MainWeb" className="return-button-Admin">Return to home page</a>
    </div>
    )}
    </>
  );
};

export default EditInformation;
