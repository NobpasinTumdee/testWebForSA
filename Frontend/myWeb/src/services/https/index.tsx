import {UsersInterface} from "../../interfaces/IUser";
import {MovieInterface,HistoryInterface,PaymentsInterface,CollectionMovieInterface} from "../../interfaces/IMoviePackage";
import {SignInInterface} from "../../interfaces/SignIn";
//import {PackageInterface} from "../../interfaces/IMoviePackage"
import { message } from "antd"; // Ant Design message for notifications

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


  // update user
  async function UpdateUserByid(id: string, data: MovieInterface) {

    return await axios
  
      .put(`${apiUrl}/users/${id}`, data, requestOptions)
  
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
          message.success("ลบ");
          window.location.reload(); // reload หลังจากลบเสร็จ
        }
        return res;
      })
      .catch((e) => e.response);
  }
  
  //===========================================================================================================⬆️

  //History
  // get History by id user
  async function GetHistoryById(id: string) {

    return await axios
  
      .get(`${apiUrl}/Historys/${id}`, requestOptions)
  
      .then((res) => res)
  
      .catch((e) => e.response);
  
  }
  // create history 
  async function CreateHistory(data: HistoryInterface) {

    return await axios
  
      .post(`${apiUrl}/Historys`, data, requestOptions)
      .then((res) => {
        if (res) {
          window.location.reload(); // reload หลังจากลบเสร็จ
        }
        return res;
      })
      .catch((e) => e.response);
  
  }
  //ลบประวัติ
  async function DeleteHistoryByID(id: string) {
    return await axios
      .delete(`${apiUrl}/Historys/${id}`, requestOptions)
      .then((res) => {
        // if (res) {
        //   window.location.reload(); // reload หลังจากลบเสร็จ
        // }
        return res;
      })
      .catch((e) => e.response);
  }
  //===========================================================================================================⬆️
  
  // payment
  async function CreatePayment(data: PaymentsInterface) {
    
    return await axios
    
    .post(`${apiUrl}/Payments`, data, requestOptions)
    .then((res) => {
      if (res) {
        //window.location.reload(); // reload หลังจากลบเสร็จ
      }
      return res;
    })
    .catch((e) => e.response);
    
  }
  // get Payment by id user
  async function GetPaymentById(id: string) {
    
    return await axios
    
    .get(`${apiUrl}/Payments/${id}`, requestOptions)
    
    .then((res) => res)
    
    .catch((e) => e.response);
    
  }
  //===========================================================================================================⬆️
  // get Collection by id user
  async function GetCollectionById(id: string) {
    
    return await axios
    
    .get(`${apiUrl}/Collections/${id}`, requestOptions)
    
    .then((res) => res)
    
    .catch((e) => e.response);
    
  }
  // สร้าง collection
  async function CreateCollection(data: PaymentsInterface) {
    
    return await axios
    
    .post(`${apiUrl}/Collections`, data, requestOptions)
    .then((res) => {
      if (res) {
        //window.location.reload(); // reload หลังจากลบเสร็จ
      }
      return res;
    })
    .catch((e) => e.response);
    
  }
  //ลบcollection
  async function DeleteCollectionByID(id: string) {
    return await axios
    .delete(`${apiUrl}/Collections/${id}`, requestOptions)
    .then((res) => {
      // if (res) {
        //   window.location.reload(); // reload หลังจากลบเสร็จ
        // }
        return res;
      })
      .catch((e) => e.response);
    }
    //===========================================================================================================⬆️
    //collectionMovie
    //collectionMovieGet by collcet id
    async function GetcollectionMovieById(id: string) {
      
      return await axios
      
      .get(`${apiUrl}/CollectionMovies/${id}`, requestOptions)
      
      .then((res) => res)
      
      .catch((e) => e.response);
      
    }
    
    //get collectionMovie
    async function GetcollectionMovie() {
      
      return await axios
      
      .get(`${apiUrl}/CollectionMovies`, requestOptions)
      
      .then((res) => res)
      
      .catch((e) => e.response);
      
    }
    //ลบmovie in collection
    async function DeleteCollectionMovieByID(id: string) {
      return await axios
      .delete(`${apiUrl}/CollectionMovies/${id}`, requestOptions)
      .then((res) => {
        // if (res) {
          //   window.location.reload(); // reload หลังจากลบเสร็จ
          // }
          return res;
        })
        .catch((e) => e.response);
      }
      // เพิ่มหนังin collection
      async function CreateCollectionMovie(data: CollectionMovieInterface) {
        
        return await axios
        
        .post(`${apiUrl}/CollectionMovies`, data, requestOptions)
        .then((res) => {
          if (res) {
            window.location.reload(); // reload หลังจากลบเสร็จ
          }
          return res;
        })
        .catch((e) => e.response);
        
      }
      
      //===========================================================================================================⬆️
      
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
    UpdateUserByid,
    
    SignIn,//sign in 
    CreateUser,//sign Up
    GetUserById,// get User by id

    CreateMovie,//เพิ่มหนัง
    UpdateMovieByid,//แก้ไขข้อมูลหนัง
    DeleteMovieById,//ลบหนัง
    GetMovieById,//แสดงหนังด้วยไอดี

    CreateHistory,//สร้างประวัติ
    GetHistoryById,//GetHistoryByIduser
    DeleteHistoryByID,//ลบประวัติ

    CreatePayment,
    GetPaymentById,

    CreateCollection,
    GetCollectionById,
    DeleteCollectionByID,

    
    CreateCollectionMovie,
    GetcollectionMovieById,
    GetcollectionMovie,
    DeleteCollectionMovieByID,
  };
  