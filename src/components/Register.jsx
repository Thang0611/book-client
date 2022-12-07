import React from "react";
import loginImg from "../assets/login.jpg";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const URLBase = "http://localhost:3000/user";
export default function Register() {
  const navigate = useNavigate();
  const [input, setInput] = useState({});
    const [err,setErr]=useState(false)
  const handleChange = async (e) => {
    await setInput({ ...input, [e.target.name]: e.target.value });
    // console.log(input);
  };


  const handleRegister = async (input) => {
    console.log(input)
    await axios.post(`http://localhost:3000/user/register`, input)
      .then((res) => {
        console.log(res)
        console.log('then')
        console.log(res.data)
        if (res.status === 200) {
          alert(res.data.message);
          navigate("/login");
        }
        else {
          console.log(res.data.message||res.data.message[0])
          setErr(res.data.message||res.data.message[0])
        }

      }
      )
      .catch((err) => {
        setErr(err.response.data.message||err.response.data.message[0])
        console.log(err.response.data.message||err.response.data.message[0])
      });
  };

  return (
    <div className="relative w-full h-screen bg-zinc-900/90">
      <img
        className="absolute w-full h-full object-cover mix-blend-overlay"
        src={loginImg}
        alt="Img"
      />
      <div className=" flex justify-center items-center h-full ">
        <form className="bg-white w-full max-w-[400px] mx-auto px-8 py-5 relative">
          <h2 className="text-3xl font-bold flex justify-center items-center py-2">
            Register
          </h2>
          <div className="flex flex-col py-2 px-2">
            <label>Username</label>
            <input
              name="username"
              className="px-2 py-2 rounded-md bg-gray-200"
              type="text"
              required
              value={input.username || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col py-2 px-2  ">
            <label>Password</label>
            <input
              name="password"
              type="password"
              className=" rounded-md px-2 py-2 bg-gray-200"
              required
              value={input.password || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col py-2 px-2  ">
            <label>Confirm password</label>
            <input
              name="passwordcf"
              type="password"
              className=" rounded-md px-2 py-2 bg-gray-200"
              required
              value={input.passwordcf || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col py-2 px-2  ">
            <label>Full name</label>
            <input
              name="fullname"
              type="text"
              className=" rounded-md px-2 py-2 bg-gray-200"
              required
              value={input.fullname || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col py-2 px-2  ">
            <label>Email</label>
            <input
              name="email"
              type="text"
              className=" rounded-md px-2 py-2 bg-gray-200"
              required
              value={input.email || ""}
              onChange={handleChange}
            />
          </div>
    {err&&(<div>
        <p className="text-red-600 ">{err}</p>
    </div>)}
          <div className="">
            <button
              type="button"
              className="bg-indigo-600  w-full flex justify-center py-2 my-1 text-white"
              onClick={() => handleRegister(input)}
            >
              Register
            </button>
          </div>

          <div>
            <p>
              Allready have an account?{" "}
              <Link to={"/login"} className="text-blue-700 underline">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
