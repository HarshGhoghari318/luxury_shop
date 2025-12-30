import React, { useState } from "react";
import { userContext } from "@/utils/UserContext";
import  { useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { use } from "react";
import { toast,ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
function EditProfile() {
  const {user,setUser}=useContext(userContext)
  const navigate= useNavigate()
  const [name, setname] = useState(user?.username)
  const [sex,setsex] = useState(user?.sex)
  const [address, setaddress] = useState(user?.address)
  const [mobileNo,setmobileNo] = useState(user?.mobileNo)


  const handleAddressChange = (value) => { 
    setaddress(value)
  };
  const handleMobileNoChange = (value) => { 
    setmobileNo(value)
  };
  const handleNameChange = (value) => { 
    setname(value)
  };
  const handleSexChange = (value) => { 
    setsex(value)
  };

 
 
  
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUser((prev) => ({
        ...prev,
        username: name || prev?.username,
        sex: sex || prev?.sex,
        address: address || prev?.address,
        mobileNo: mobileNo || prev?.mobileNo,
      }));
      
      
    
          try {
            const response = await axios.post(`${process.env.VERCEL_URL}/users/Eprofile`, {
                username: name,
                sex: sex,
                address: address,
                mobileNo: mobileNo
              }, {
                params: {
                  email: Cookies.get("email"),
                }
              }).then((response) =>  {
                if(response.status==200){
                    toast.success(response.data.message)
                    setTimeout(() =>{
                        navigate(-1)
                    },1000)
                }else{
                    toast.error("Error in update profile")
                }
            });
           
      
            
          } catch (error) {
            console.error(error);
            
          }
        
    
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto py-10">
        <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <label className="cursor-pointer">
              <img
                src="/dummy.png"
                alt="Profile"
                className="w-28 h-28 rounded-full border-4 border-orange-500 object-cover mb-4"
              />
            </label>
            <h1 className="text-xl font-bold text-orange-400">{user?.username}</h1>
            <p className="text-gray-300">{user?.email}</p>
          </div>

         
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm text-gray-400">Name</label>
              <input
                type="text"
                name="name"
                value={name ? name : user?.username}
                onChange={(e)=>handleNameChange(e.target.value)}
                className="w-full bg-gray-700 p-2 rounded text-white focus:ring-2 focus:ring-orange-500"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400">Sex</label>
              <select
                name="sex"
                value={sex ? sex: user?.sex}
                onChange={(e)=>handleSexChange(e.target.value)}
                className="w-full bg-gray-700 p-2 rounded text-white focus:ring-2 focus:ring-orange-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400">Contact No</label>
              <input
                type="text"
                name="contact"
                value={mobileNo ? mobileNo:user?.mobileNo}
                onChange={(e)=>handleMobileNoChange(e.target.value)}
                className="w-full bg-gray-700 p-2 rounded text-white focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400">Address</label>
              <textarea
                name="address"
                value={address ? address : user?.address}
                onChange={(e)=>handleAddressChange(e.target.value)}
                className="w-full bg-gray-700 p-2 rounded text-white focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    <ToastContainer/>
    </div>
  );
}


export default EditProfile;