import axios from "axios";
import React, { useContext } from "react";
import "react-toastify/dist/ReactToastify.css"; // Import toastify styles
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {userContext} from '../utils/UserContext.jsx'
import Cookies from 'js-cookie';
function Login() {
 

  const {user,setUser}=useContext(userContext)
  
  const navigate = useNavigate();

  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.VERCEL_URL}/users/login`,
        formdata
      );
      
      if (response.data.data === null) {
        toast.error("Invalid credentials. Please try again.");
      } else if (response.data.message === "user") {
        setUser(response.data.data)
        
        Cookies.set('email', response.data.data.email)
        navigate("/user/home", {
          state: { toastMessage: `welcome ${response.data.data.username}` },
        });
      }
      else if (response.data.message === "owner") {
        
        setUser(response.data.data)
        navigate("/owner/allProduct", {
          state: { toastMessage: `welcome ${response.data.data.ownername}` },
        });
        
        
        Cookies.set('email', response.data.data.email)
      }
    } catch (error) {
      toast.error("Error during sign up. Please try again.");
      console.error("Error:", error);
    }
  };
  return (
    <div className="flex justify-center border-2 border-orange-300 items-center h-screen text-orange-300 bg-black ">
      <div className="w-96 bg-zinc-900 border-2 border-orange-300 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Log In</h2>
        <form onSubmit={handleSubmit} method="post">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              name="email"
              onChange={handleChange}
              pattern="^[a-zA-Z0-9._%+\-]+@gmail\.com$"
              type="email"
              value={formdata.email}
              className="w-full p-2 rounded bg-zinc-800 text-white focus:outline-orange-300"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              name="password"
              onChange={handleChange}
              value={formdata.password}
              type="password"
              className="w-full p-2 rounded bg-zinc-800 text-white focus:outline-orange-300"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white hover:bg-zinc-600 text-orange-300 font-bold py-2 px-4 rounded"
          >
            Log In
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-white hover:underline">
            Sign Up
          </a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
