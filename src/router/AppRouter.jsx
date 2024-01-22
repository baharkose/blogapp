import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import About from "../pages/About";
import Auth from "../pages/Auth";
import BlogDetail from "../pages/BlogDetail";
import MyBlog from "../pages/MyBlog";
import NewBlog from "../pages/NewBlog";
import Profile from "../pages/Profile";
import PrivateRouter from "./PrivateRouter";
import Navbars from "../components/Navbars";
import Footers from "../components/Footers";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import useAxios from "../service/useAxios";
import { useAuthContext } from "../context/AuthContext";

const AppRouter = () => {
  const { currentUser } = useAuthContext();
  const { axiosPublic } = useAxios();
  return (
    <>
      <Navbars />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="about" element={<About />} />
        {/* <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} /> */}
        <Route path="auth" element={<Auth />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="" element={<PrivateRouter />}>
          <Route path="blogdetail/:id" element={<BlogDetail />} />
          <Route path="myblog" element={<MyBlog />} />
          <Route path="newblog" element={<NewBlog />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
      <Footers />
    </>
  );
};

export default AppRouter;
