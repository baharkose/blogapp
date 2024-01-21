import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../service/useAxios";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const { axiosPublic } = useAxios();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({
    username: "",
    password: "",
  });

  const signIn = async (userInfo) => {
    try {
      const { data } = await axiosPublic.post("/auth/login/", userInfo);

      navigate("dashboard");
      console.log("login başarılı");
    } catch (error) {
      console.log(error);
    }
  };

  const signUp = async (userInfo) => {
    try {
      const { data } = await axiosPublic.post("/users/");
      navigate("dashboard");
      console.log("kayıt başarılı");
    } catch (error) {
      console.log(error);
    }
  };

  const values = {
    signIn,
    signUp,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
