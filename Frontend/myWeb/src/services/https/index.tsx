import {UsersInterface} from "../../interfaces/IUser";
import {MovieInterface} from "../../interfaces/IMoviePackage";
import {SignInInterface} from "../../interfaces/SignIn";
//import {PackageInterface} from "../../interfaces/IMoviePackage"
import axios from 'axios';
const apiUrl = "http://localhost:8000";
const Authorization = localStorage.getItem("token");

const Bearer = localStorage.getItem("token_type");


const requestOptions = {

  headers: {

    "Content-Type": "application/json",

    Authorization: `${Bearer} ${Authorization}`,

  },

};

async function GetUsers() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/users`, requestOptions)
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        } else {
          return false;
        }
      });
  
    return res;
  }

  async function SignIn(data: SignInInterface) {

    return await axios
  
      .post(`${apiUrl}/signin`, data, requestOptions)
  
      .then((res) => res)
  
      .catch((e) => e.response);
  
  }


  
  async function DeleteUserByID(id: Number | undefined) {
    const requestOptions = {
      method: "DELETE"
    };
  
    let res = await fetch(`${apiUrl}/users/${id}`, requestOptions)
      .then((res) => {
        if (res.status == 200) {
          return true;
        } else {
          return false;
        }
      });
  
    return res;
  }
  
  //===========================================================================================================

  // get User by id
  async function GetUserById(id: string) {

    return await axios
  
      .get(`${apiUrl}/users/${id}`, requestOptions)
  
      .then((res) => res)
  
      .catch((e) => e.response);
  
  }
  
  //===========================================================================================================

  //signus
  async function CreateUser(data: UsersInterface) {

    return await axios
  
      .post(`${apiUrl}/signup`, data, requestOptions)
  
      .then((res) => res)
  
      .catch((e) => e.response);
  
  }
  //===========================================================================================================⬇️
  // เพิ่มหนัง
  async function CreateMovie(data: MovieInterface) {

    return await axios
  
      .post(`${apiUrl}/Movies`, data, requestOptions)
      .then((res) => {
        if (res) {
          window.location.reload(); // reload หลังจากลบเสร็จ
        }
        return res;
      })
      .catch((e) => e.response);
  
  }
  // update movie
  async function UpdateMovieByid(id: string, data: MovieInterface) {

    return await axios
  
      .put(`${apiUrl}/Movies/${id}`, data, requestOptions)
  
      .then((res) => res)
  
      .catch((e) => e.response);
  
  }
  // get movie by id
  async function GetMovieById(id: string) {

    return await axios
  
      .get(`${apiUrl}/Movies/${id}`, requestOptions)
  
      .then((res) => res)
  
      .catch((e) => e.response);
  
  }
  //ลบหนัง
  async function DeleteMovieById(id: string) {
    return await axios
      .delete(`${apiUrl}/Movies/${id}`, requestOptions)
      .then((res) => {
        if (res) {
          window.location.reload(); // reload หลังจากลบเสร็จ
        }
        return res;
      })
      .catch((e) => e.response);
  }
  
  //===========================================================================================================⬆️

  //History
  // get History by id
  async function GetHistoryById(id: string) {

    return await axios
  
      .get(`${apiUrl}/Historys/${id}`, requestOptions)
  
      .then((res) => res)
  
      .catch((e) => e.response);
  
  }




  async function UpdateUser(data: UsersInterface) {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  
    let res = await fetch(`${apiUrl}/users`, requestOptions)
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        } else {
          return false;
        }
      });
  
    return res;
  }
  
  export {
    GetUsers,
    DeleteUserByID,
    UpdateUser,
    
    SignIn,//sign in 
    CreateUser,//sign Up
    GetUserById,// get User by id

    CreateMovie,//เพิ่มหนัง
    UpdateMovieByid,//แก้ไขข้อมูลหนัง
    DeleteMovieById,//ลบหนัง
    GetMovieById,//แสดงหนังด้วยไอดี

    GetHistoryById,//GetHistoryById
  };
  