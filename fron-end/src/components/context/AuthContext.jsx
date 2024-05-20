// AuthContext.js
// import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { redirect, useRouter } from "next/navigation";
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "../utils/axios";
import getHeaderConfigAxios from "../utils/getHeaderConfigAxios";

// Create the AuthContext
const AuthContext = createContext();

// Create a custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

const userProfile = async () => {
  const headers = `Authorization: Bearer ${getCookie("access_token")}`;
  return (await axios.get("/users", { headers })).data.data;
};

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const route = useRouter();
  const [user, setUser] = useState(null); // Initially no user is logged in

  useEffect(async () => {
    if (getCookie("access_token")) {
      setUser(await userProfile());
    }
    return true
  }, []);
  // Function to log in the user
  const setDataUser = (userData) => {
    setUser(userData);
  };

  // Function to log out the user
  const logout = () => {
    setUser(null);
    deleteCookie("access_token");
    deleteCookie("refresh_token");
    deleteCookie("user");
    route.push("/");
  };

  // Value object containing the context data
  const value = {
    user,
    logout,
    setDataUser,
  };

  // Provide the context value to its children
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
