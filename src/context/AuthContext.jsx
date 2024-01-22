import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import useAxios from "../service/useAxios";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  //2 useAxiosa token parametresi verildi.
  const axiosInstance = useAxios(currentUser?.token);

  const axiosPublic = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  const signIn = async (userInfo) => {
    try {
      const { data } = await axiosPublic.post("/auth/login/", userInfo);
      setCurrentUser(data);
      navigate("/");
      console.log("login başarılı");
    } catch (error) {
      console.log(error);
    }
  };

  const signUp = async (userInfo) => {
    try {
      const { data } = await axiosPublic.post("/users/", userInfo);
      setCurrentUser(data);
      navigate("/");
      console.log("kayıt başarılı");
    } catch (error) {
      console.log(error);
    }
  };
  const logout = async () => {
    try {
      // klasik çıkış işlemi
      // axiosInstance ile API çağrısını yapın
      await axiosInstance.get("/auth/logout/");
      setCurrentUser(null);
      localStorage.removeItem("currentUser");
      navigate("/");
      console.log("logout başarılı");
    } catch (error) {
      console.error("Logout sırasında hata oluştu:", error);
    }
  };

  const values = {
    currentUser,
    signIn,
    signUp,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
