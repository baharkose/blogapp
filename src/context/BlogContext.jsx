import React, { createContext, useContext } from "react";
import useAxiosPublic from "../service/useAxiosPublic";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../service/useAxios";

export const BlogContext = createContext();

export const useBlogContext = () => {
  return useContext(BlogContext);
};

export const BlogContextProvider = ({ children }) => {
  // const [blogs, setBlogs] = useState([]);

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const axiosPublic = useAxiosPublic();
  const axiosToken = useAxios(currentUser?.token); 
  const axiosInstance = useAxios(currentUser?.token);


  // const getBlog = async () => {
  //   try {
  //     const { data } = await axiosPublic.get("/blogs/");
  //     console.log(data);
  //     setBlogs(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const {
    data: blogs,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/blogs/");
      return data;
    },
  });

  const updatePost = async (id) => {
    try {
      const { data } = await axiosToken.put(`/blogs/${id}`);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };


  const getPerson = async (blogs, setPersonData) => {
    try {
      const userId = blogs?.data?.userId;
      if (userId) {
        const { data } = await axiosInstance.get(`/users/${userId}`);
        setPersonData(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const values = {
    blogs,
    isLoading,
    error,
    updatePost,
    getPerson,
  };

  return <BlogContext.Provider value={values}>{children}</BlogContext.Provider>;
};

export default BlogContextProvider;
