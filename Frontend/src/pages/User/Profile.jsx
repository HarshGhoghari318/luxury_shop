import { userContext } from "@/utils/UserContext";
import React, { useContext } from "react";
import Cookies from 'js-cookie';
import { Buffer } from "buffer";
import { Link, Navigate, useNavigate } from "react-router-dom";
const ProfilePage = () => {
  const navigater=useNavigate()
  const {user,setUser}=useContext(userContext)
  console.log(user)

   const navigateBack=()=>{
    navigater(-1);
   }
   const handlelogOut = ()=>{
      Cookies.remove('email');
      setUser(null);
      navigater('/login')
      toast.success("Logged out successfully");
  
    }
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="flex border-t-2 border-b-2 bor border-orange-300 justify-between items-center p-6 bg-zinc-950">
        <a onClick={navigateBack} className="text-2xl font-bold text-orange-500"><i className="cursor-pointer ri-arrow-left-line mr-2"></i>LXS</a>
        <nav className="flex gap-6">
          <a href="/user/home" className="text-gray-300 hover:text-orange-500">Home</a>
          <a href="/user/men" className="text-gray-300 hover:text-orange-500">Men</a>
          <a href="/user/women" className="text-gray-300 hover:text-orange-500">Women</a>
          <a href="/user/kids" className="text-gray-300 hover:text-orange-500">Kids</a>
          <a href="/cart" className="text-gray-300 hover:text-orange-500">Cart</a>
          <a href="/profile" className="text-orange-500">Profile</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="p-8">
        {/* Profile Information */}
        <section className="text-center mb-12">
  <img
    src="/dummy.png"
    alt="Profile"
    className="w-40 h-40 mx-auto rounded-full object-cover mb-4"
  />
  <h2 className="text-2xl font-bold text-orange-500">{user?.username}</h2>
  <p className="text-gray-400 mb-2">{user?.email}</p>
  <p className="text-gray-400 mb-2">
    <span className="font-bold text-orange-500">Sex:</span> {user?.sex || "N/A"}
  </p>
  <p className="text-gray-400 mb-2">
    <span className="font-bold text-orange-500">Contact No:</span>{" "}
    {user?.mobileNo || "N/A"}
  </p>
  <p className="text-gray-400 mb-4">
    <span className="font-bold text-orange-500">Address:</span>{" "}
    {user?.address || "N/A"}
  </p>
  <Link to={"/Eprofile"} className="bg-orange-500 hover:bg-orange-600 text-black px-6 py-2 rounded-lg">
    Edit Profile
  </Link>
</section>

        {/* Order History */}
        <h3 className="text-xl font-semibold mb-6">Order History</h3>
        {
          user?.order.length === 0? (
            <p className="text-center text-gray-400">No orders found.</p>
          ) : (<section className="mb-12 h-[40vh] rounded-md w-auto bg-white overflow-y-scroll p-4">
            {
              user?.order.map((order, i) =>(
           
              <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-4 mb-1">
              <img
                src={`data:image/jpeg;base64,${Buffer.from(
                  order.image.data
                ).toString("base64")}`}
                alt="Product"
                className="w-20 h-20 rounded-lg"
              />
              <div>
                <p className="text-lg font-medium">{order.name}</p>
                <p className="text-gray-400 ">Status:<span className="ml-1 text-green-600">Success</span><span className="ml-2">Delivered✅</span> </p>
                <p className="text-gray-400">Price: ${order.price}</p>
              </div>
            </div>
  
              ))
            }
           
            
            
          </section>)

        }
        {/* <section className="mb-12 h-[40vh] rounded-md w-auto bg-white overflow-y-scroll p-4">
          {
            user?.order.map((order, i) =>(
         
            <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-4 mb-4">
            <img
              src={`data:image/jpeg;base64,${Buffer.from(
                order.image.data
              ).toString("base64")}`}
              alt="Product"
              className="w-20 h-20 rounded-lg"
            />
            <div>
              <p className="text-lg font-medium">{order.name}</p>
              <p className="text-gray-400 ">Status:<span className="ml-1 text-green-600">Success</span><span className="ml-2">Delivered✅</span> </p>
              <button className="mt-2 text-orange-500 hover:underline">
                View Details
              </button>
            </div>
          </div>

            ))
          }
         
          
          
        </section> */}

        {/* Wishlist */}
       
      </main>

      {/* Footer */}
      <footer className="flex justify-center gap-4 p-6 bg-gray-800">
        <button className="bg-orange-500 hover:bg-orange-600 text-black px-4 py-2 rounded-lg">
          Settings
        </button>
        <button onClick={handlelogOut} className="bg-orange-500 hover:bg-orange-600 text-black px-4 py-2 rounded-lg">
          Logout
        </button>
      </footer>
    </div>
  );
};

export default ProfilePage;
