import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify styles
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    username: "",
    email: "",
    password: "",
    sex: "",
    address: "",
    mobile: "",
  });

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.VERCEL_URL}/users/signup`,
        formdata
      );
      if (response.data.data === null) {
        toast.error(response.data.message);
        setFormdata({
          username: "",
          email: "",
          password: "",
          sex: "",
          address: "",
          mobile: "",
        });
      } else {
        toast.success("Sign up successful!");
        
        setFormdata({
          username: "",
          email: "",
          password: "",
          sex: "",
          address: "",
          mobile: "",
        });
      }
    } catch (error) {
      toast.error("Error during sign up. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black text-orange-300">
      <div className="w-full max-w-3xl bg-zinc-900 border-2 border-orange-300 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} method="post">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="username"
                  value={formdata.username}
                  className="w-full p-2 rounded bg-zinc-800 text-white focus:outline-none"
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  onChange={handleChange}
                  pattern=".+@gmail\.com"
                  type="email"
                  name="email"
                  value={formdata.email}
                  className="w-full p-2 rounded bg-zinc-800 text-white focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  onChange={handleChange}
                  name="password"
                  type="password"
                  value={formdata.password}
                  className="w-full p-2 rounded bg-zinc-800 text-white focus:outline-none"
                  placeholder="Create a password"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Sex</label>
                <select
                  onChange={handleChange}
                  name="sex"
                  value={formdata.sex}
                  className="w-full p-2 rounded bg-zinc-800 text-white focus:outline-none"
                >
                  <option value="" disabled>
                    Select your sex
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Address</label>
                <textarea
                  onChange={handleChange}
                  name="address"
                  value={formdata.address}
                  className="w-full p-2 rounded bg-zinc-800 text-white focus:outline-none"
                  placeholder="Enter your address"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Mobile Number</label>
                <input
                  onChange={handleChange}
                  maxlength="10"
                  type="tel"
                  name="mobile"
                  value={formdata.mobile}
                  className="w-full p-2 rounded bg-zinc-800 text-white focus:outline-none"
                  placeholder="Enter your mobile number"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-white hover:bg-zinc-800 text-orange-300 font-bold py-2 px-4 rounded mt-6"
          >
            Sign Up
          </button>
        </form>

        {/* Redirect to Login */}
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-white hover:underline">
            Log In
          </a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
