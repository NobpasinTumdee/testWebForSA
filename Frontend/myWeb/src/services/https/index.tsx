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


async function GetGenders() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/genders`, requestOptions)
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        } else {
          return false;
        }
      });
  
    return res;
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
  
  async function GetUserById(id: Number | undefined) {
    const requestOptions = {
      method: "GET"
    };
  
    let res = await fetch(`${apiUrl}/user/${id}`, requestOptions)
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        } else {
          return false;
        }
      });
  
    return res;
  }
  
  
  // async function CreateUser(data: UsersInterface) {
  //   const requestOptions = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(data),
  //   };
  
  //   let res = await fetch(`${apiUrl}/users`, requestOptions)
  //     .then((res) => {
  //       if (res.status == 201) {
  //         return res.json();
  //       } else {
  //         return false;
  //       }
  //     });
  
  //   return res;
  // }
  //
  //signus
  async function CreateUser(data: UsersInterface) {

    return await axios
  
      .post(`${apiUrl}/signup`, data, requestOptions)
  
      .then((res) => res)
  
      .catch((e) => e.response);
  
  }
  // เพิ่มหนัง
  async function CreateMovie(data: MovieInterface) {

    return await axios
  
      .post(`${apiUrl}/Movies`, data, requestOptions)
  
      .then((res) => res)
  
      .catch((e) => e.response);
  
  }

  async function UpdateMovieById(id: string, data: MovieInterface) {

    return await axios
  
      .put(`${apiUrl}/user/${id}`, data, requestOptions)
  
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
    SignIn,
    CreateUser,
    GetGenders,
    DeleteUserByID,
    GetUserById,
    UpdateUser,
    CreateMovie,
    UpdateMovieById
  };
  