import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditInformation.css'; // นำเข้าไฟล์ CSS

const EditInformation: FC = () => {
  const navigate = useNavigate();

  const handleReturnClick = () => {
    navigate('/MainWeb'); // ปรับเส้นทางตามการตั้งค่า Routing ของคุณ
  };

  const handleEditInformation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // เขียนโค้ดสำหรับอัปเดตข้อมูลผู้ใช้ที่นี่
  };

  return (
    <div className="container">
      <h2>แก้ไขข้อมูล</h2>
      <form onSubmit={handleEditInformation}>
        <div>
          <input type="text"  />
          <input type="text"  />
        </div>
        <div>
          <input type="password"  />
          <input type="password"  />
        </div>
        <div>
          <input type="password"  />
        </div>
        <button type="submit">
          Edit Information
        </button>
      </form>
      <button className="return-button" onClick={handleReturnClick}>
        กลับไปหน้าหลัก
      </button>
    </div>
  );
};

export default EditInformation;