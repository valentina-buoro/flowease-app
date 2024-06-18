//import React, { useEffect, useState } from "react";
import React, { useState } from "react";
import Logo from "../../assets/svgs/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {  toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const URL = "https://flowease.onrender.com/api";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
   
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitFormData = async (e) => {
    e.preventDefault();
    if (
      formData.email === "" ||
      formData.password === ""
    ) {
      setErrorMessage("All fields are required.");
    }

    try {
      setLoading(true);
      const data = {
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password,
      };

      const res = await axios.post(`${URL}/users/login`, data);
      if (res.data.success === true) {
        localStorage.setItem("login_token", res.data.message);
        setLoading(false);
        toast.success('User Logged In successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/dashboard");
        console.log(res);
      } else {
        setLoading(false);
        setErrorMessage(res.data.message);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(formData);
    }
  };


  return (
    <div className=" w-full ">
      
      <div className=" bg-[#F8F9FE] w-full h-screen overflow-scroll flex justify-center items-center  py-10 md:py-20">
        <div className="sub-text bg-[#fff] px-6 md:px-14 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl ">
          <div className=" mx-auto flex w-full max-w-md flex-col space-y-9 ">
            <div className="flex flex-col items-center justify-center text-center">
              <img src={Logo} alt="logo" className="w-32" />
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <div className="font-medium text-2xl">
                <p>Let’s Sign You In</p>
              </div>
            </div>

            <div>
              <form>
                <div className="relative w-full my-10">
                  <div className="absolute inset-0 border border-[#1B1D21]  rounded-3xl pointer-events-none"></div>
                  <label className="absolute -top-2 left-2 bg-[#fff] px-1  text-sm">
                    Email
                  </label>
                  <input
                    className="w-full p-2 mt-4 bg-white border-0 outline-none focus:ring-0"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="relative w-full my-10">
                  <div className="absolute inset-0 border border-[#1B1D21]  rounded-3xl pointer-events-none"></div>
                  <label className="absolute -top-2 left-2 bg-[#fff] px-1  text-sm">
                    Password
                  </label>
                  <input
                    className="w-full p-2 mt-4 bg-white border-0 outline-none focus:ring-0"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex justify-between">
                  <div className="flex items-start">
                    <input type="checkbox" className="mr-2" required />
                    <span className="font-medium text-xs ">Remember me </span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-normal text-xs text-primaryBlue">
                      Forgot Password?
                    </span>
                  </div>
                </div>

                <div className="flex flex-col space-y-4 my-10">
                  
                  <button
                    onClick={submitFormData}
                    //disabled={isLoading}
                    type="submit"
                    className="flex items-center p-4  justify-center text-[#fff] font-semibold w-full  rounded-xl bg-primaryBlue"
                  >
                  {loading ? (
                      "Hold on a second..."
                    ) : (
                      "Login"
                    )}
                  </button>
                  <p className="text-[red] text-lg">{errorMessage}</p>
                </div>
              </form>
            </div>
          </div>
          <div className="font-normal text-xs">
            <span>Don't have an account?</span>
            <Link to="/signup" className="text-primaryBlue">
              Create Account
            </Link>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default Login;
