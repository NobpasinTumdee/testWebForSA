import React, { FC, useState, useEffect } from 'react';
import { UsersInterface } from '../interfaces/IUser';
import { GetUserById , GetGenders } from '../services/https';
import './EditInformation.css';
import { Loading } from '../Component/Loading/Loading';

const EditInformation: FC = () => {
  const [oldUsername, setOldUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [gender, setGender] = useState('');
  const [genderList, setGenderList] = useState<string[]>([]); 
  const [age, setAge] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [isLoading, setLoading] = useState(true);
  const userIdstr = localStorage.getItem("id");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userIdstr) {
          const response = await GetUserById(userIdstr);

          if (response && response.status === 200) {
            const userData: UsersInterface = response.data;
            setOldUsername(userData.username || '');
            setOldPassword(userData.password || '');
            setFirstname(userData.firstname || '');
            setLastname(userData.lastname || '');
            setGender(userData.gender || '');
            setAge(userData.age ? userData.age.toString() : '');
            setPhonenumber(userData.phonenumber || '');
          } else {
            console.error('Error retrieving user data');
          }
        } else {
          console.error('UserId not found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
    GetGenders();
  }, [userIdstr]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  const handleFirstnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[a-zA-Z]*$/.test(value)) { // Allow only letters
      setFirstname(value);
    }
  };

  const handleLastnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[a-zA-Z]*$/.test(value)) { // Allow only letters
      setLastname(value);
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Check if the input starts with '0' and has up to 10 digits
    if (/^0\d{0,9}$/.test(value) || value === '') {
      setPhonenumber(value);
    }
  };

  const handleEditInformation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle user information update logic here
  };

  return (
    <>
      {isLoading ? (
        <div
          style={{
            position: 'fixed', top: '50%', left: '55%',
            marginTop: '-50px', marginLeft: '-100px'
          }}
        >
          <Loading />
        </div>
      ) : (
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
            <div className="form-group">
              <div className="input-group">
                <label>Firstname</label>
                <input type="text" name="firstname" value={firstname} onChange={handleFirstnameChange}  />
              </div>
              <div className="input-group">
                <label>Lastname</label>
                <input type="text" name="lastname" value={lastname} onChange={handleLastnameChange}  />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <label>Gender</label>
                <select
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="">Select Gender</option>
                  {genderList.map((genderOption, index) => (
                    <option key={index} value={genderOption}>
                      {genderOption}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group">
                <label>Age</label>
                <input type="number" name="age" value={age} 
               onChange={(e) => {
                const value = e.target.value;
                if (value === '' || /^[1-9]\d*$/.test(value)) {
                  // เช็คว่าเป็นตัวเลขตั้งแต่ 1 ขึ้นไป
                  setAge(value);
                }
              }}
              min="1" // กำหนดค่าอายุน้อยที่สุดคือ 1
              required
              className="no-spinner"/>
              </div>
              <div className="input-group">
                <label>Phone Number</label>
                <input type="text" name="phonenumber" value={phonenumber} onChange={handlePhoneNumberChange} className="phone-number"/>
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
