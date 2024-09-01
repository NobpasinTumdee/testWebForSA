import React, { FC ,useState,useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
import './EditInformation.css';

import { Loading } from '../Component/Loading/Loading';

const EditInformation: FC = () => {
  //const navigate = useNavigate();

  // const handleReturnClick = () => {
  //   navigate('/MainWeb'); // เส้นทางกลับไปยังหน้า MainWeb
  // };

  const handleEditInformation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // เขียนโค้ดสำหรับอัปเดตข้อมูลผู้ใช้ที่นี่
  };

  const [isLoading, setLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300)
  })

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
            <input type="text" name="oldUsername" required />
          </div>
          <div className="input-group">
            <label>New USERNAME</label>
            <input type="text" name="newUsername" required />
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <label>Old PASSWORD</label>
            <input type="password" name="oldPassword" required />
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
