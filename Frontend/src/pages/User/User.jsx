import React, { useState, useEffect, useContext } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {userContext} from '../../utils/UserContext.jsx'


function User() {
  const navigate=useNavigate()
  const location = useLocation();
  const {user,getUser} = useContext(userContext)
 console.log(user)
  
  
  useEffect(() => {
    getUser()

  },[user])

  
  
  useEffect(() => { 
    if (location.state?.toastMessage) {
      toast.success(location.state.toastMessage);
      navigate(location.pathname, { replace: true });
    }
  }, [location.state]);

  return (
    <div className="w-full h-screen bg-zinc-950">
      {/* Header */}
      <header className="bg-zinc-900 border-t-2 border-b-2 border-orange-300 text-orange-300 p-4 w-full h-[10%] shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <a className="text-2xl font-bold hover:text-orange-500">
            LXS
          </a>

          {/* Navigation Links */}
          <nav className="flex space-x-8">
            <NavLink
              to="home"
              className={({ isActive }) =>
                `transition-colors ${
                  isActive
                    ? "text-orange-500 border-orange-300 font-bold border-b-2"
                    : "hover:text-orange-500"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="men"
              className={({ isActive }) =>
                `transition-colors ${
                  isActive
                    ? "text-orange-500 font-bold border-orange-300 border-b-2 "
                    : "hover:text-orange-500"
                }`
              }
            >
              Men
            </NavLink>
            <NavLink
              to="women"
              className={({ isActive }) =>
                `transition-colors ${
                  isActive
                    ? "text-orange-500 font-bold border-orange-300 border-b-2"
                    : "hover:text-orange-500"
                }`
              }
            >
              Women
            </NavLink>
            <NavLink
              to="kids"
              className={({ isActive }) =>
                `transition-colors ${
                  isActive
                    ? "text-orange-500 font-bold border-orange-300 border-b-2 "
                    : "hover:text-orange-500"
                }`
              }
            >
              Kids
            </NavLink>
          </nav>

          {/* Profile and Cart Icons */}
          <div className="flex items-center space-x-6">
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `transition-colors flex items-center ${
                  isActive
                    ? "text-orange-500 font-bold "
                    : "hover:text-orange-500"
                }`
              }
            >
              <span className="mr-1 ">🛒</span> Cart{" "}
              {user?.cart?.length > 0 && (
                <span className="h-[20px] absolute left-[93.1%] top-[3%] w-[20px] flex items-center justify-center rounded-3xl text-white bg-red-600 text-center">
                  {user.cart.length}
                </span>
              )}
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `transition-colors flex items-center ${
                  isActive
                    ? "text-orange-500 font-bold "
                    : "hover:text-orange-500"
                }`
              }
            >
              <span className="mr-1">👤</span> Profile
            </NavLink>
          </div>
        </div>
      </header>
      <div className="h-[90%] w-full">
        <Outlet context={{ user }} />
      </div>

      <ToastContainer />
    </div>
  );
}

export default User;
