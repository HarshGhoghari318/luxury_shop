import React, { useEffect, useState } from "react";
import axios from "axios";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  const allUser = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/owner/allusers`);
      
      setUsers(response.data); 
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    allUser();
  }, []); 

  return (
    <div className="h-full w-full p-4 ">
      <div className="h-full w-full bg-gray-800 p-4 flex flex-col rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-orange-300 mb-6">
          Users List
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 bg-white rounded-lg">
            <thead>
              <tr className="bg-orange-300 text-white">
                <th className="py-3 px-4 border">No</th>
                <th className="py-3 px-4 border">Name</th>
                <th className="py-3 px-4 border">Email</th>
                <th className="py-3 px-4 border">MobileNo</th>
                <th className="py-3 px-4 border">sex</th>
                <th className="py-3 px-4 border">Order✅</th>
                <th className="py-3 px-4 border">Image</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr
                    key={user._id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-gray-200`}
                  >
                    <td className="py-3 px-4 border text-center">{index + 1}</td>
                    <td className="py-3 px-4 border">{user.username}</td>
                    <td className="py-3 px-4 border">{user.email}</td>
                    <td className="py-3 px-4 border">{user.mobileNo}</td>
                    <td className="py-3 px-4 border">{user.sex}</td>
                    <td className="py-3 px-4 border">{user.order.length}</td>
                    <td className="py-3 px-4 border text-center">
                      <img
                        src="/dummy.png"
                        alt={user.name}
                        className="w-12 h-12 rounded-full mx-auto"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-4 text-gray-500 font-semibold"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
