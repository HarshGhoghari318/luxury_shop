import React, { useState, createContext } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

// Create the context
export const userContext = createContext();

function UserContext({ children }) {
  const [user, setUser] = useState(null);
  // const [userChanged, setUserChanged] = useState(false); // Flag to track changes

  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users/user`, {
        params: {
          email: Cookies.get("email"),
        },
      });
      setUser(response.data.data);
   
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error("Failed to get user details");
    }
  };

  useEffect(() => {
    getUser(); // Fetch user on mount
  }, []); // Runs only once initially

  // useEffect(() => {
  //   if (userChanged) {
  //     getuser(); // Fetch user whenever userChanged flag is true
  //     setUserChanged(false); // Reset the flag
  //   }
  // }, [userChanged]); // Dependency is the userChanged flag

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        getUser,
      }}
    >
      {children}
    </userContext.Provider>
  );
}

export default UserContext;
