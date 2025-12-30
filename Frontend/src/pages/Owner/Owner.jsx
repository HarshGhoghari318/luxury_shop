import React from "react";
import Cookies from "js-cookie";
import {  NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import { userContext } from "@/utils/UserContext";
import { useContext } from "react";
import { FaSignOutAlt } from "react-icons/fa";

function Owner() {

  const navigater=useNavigate()
  const location = useLocation();
  const { user, setUser } = useContext(userContext);
  

  const handlelogOut = ()=>{
    Cookies.remove('email');
   
    setUser(null);
    navigater('/login')
    toast.success("Logged out successfully");

  }
  useEffect(() => {
    if (location.state && location.state.toastMessage) {
      
      toast.success(location.state.toastMessage);
    }
  }, [location.state]);
  return (
    <>
      <div className="h-screen w-full  bg-black">
        <div className="h-[10%] text-orange-300 flex items-center justify-end w-full p-4 border-t-2 border-b-2 border-orange-300">
          <h1 className="text-4xl font-semibold mr-[35%] text-center">
            Admin Panel
          </h1>
          <span onClick={handlelogOut} className="cursor-pointer text-2xl flex items-center font-semibold gap-2">
            LogOut
            <FaSignOutAlt  />
          </span>{" "}
        </div>
        <div className="h-[90%]  flex w-full">
          <div className="h-full w-[20vw] ">
            <ul className="h-full flex flex-col text-xl w-full p-4">
              <NavLink
                to="users"
                className={({ isActive }) =>
                  isActive
                    ? "p-2 mt-2 rounded-full text-center border-2 border-orange-300 bg-black text-orange-300"
                    : "p-2 bg-white mt-2 rounded-full text-center hover:bg-black hover:border-2 border-orange-300 hover:text-orange-300"
                }
              >
                Users
              </NavLink>
              <NavLink
                to="allProduct"
                className={({ isActive }) =>
                  isActive
                    ? "p-2 mt-2 rounded-full text-center border-2 border-orange-300 bg-black text-orange-300"
                    : "p-2 bg-white mt-2 rounded-full text-center hover:bg-black hover:border-2 border-orange-300 hover:text-orange-300"
                }
              >
                All Product
              </NavLink>
              <NavLink
                to="addProduct"
                className={({ isActive }) =>
                  isActive
                    ? "p-2 mt-2 rounded-full text-center border-2 border-orange-300 bg-black text-orange-300"
                    : "p-2 bg-white mt-2 rounded-full text-center hover:bg-black hover:border-2 border-orange-300 hover:text-orange-300"
                }
              >
                Add Product
              </NavLink>
              {/* <NavLink
                to="editProduct"
                className={({ isActive }) =>
                  isActive
                    ? "p-2 mt-2 rounded-full text-center border-2 border-orange-300 bg-black text-orange-300"
                    : "p-2 bg-white mt-2 rounded-full text-center hover:bg-black hover:border-2 border-orange-300 hover:text-orange-300"
                }
              >
                Edit Product
              </NavLink> */}
            </ul>
          </div>
          <div className="h-full w-[80vw] bg-black">
            <Outlet/>
          </div>
        </div>
        
      </div>
      <ToastContainer />
    </>
  );
}

export default Owner;
