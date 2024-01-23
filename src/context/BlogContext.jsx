import React, { createContext, useContext, useState } from "react";
import useAxiosPublic from "../service/useAxiosPublic";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "../service/useAxios";

export const BlogContext = createContext();

export const useBlogContext = () => {
  return useContext(BlogContext);
};

export const BlogContextProvider = ({ children }) => {
  const [blogsx, setBlogs] = useState([]);
  const queryClient = useQueryClient();

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const axiosPublic = useAxiosPublic();
  const axiosToken = useAxios(currentUser?.token);
  const axiosInstance = useAxios(currentUser?.token);

  const getBlog = async () => {
    try {
      const { data } = await axiosPublic.get("/blogs/");
      console.log(data);
      setBlogs(data);
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: blogs,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await axiosPublic.get("/blogs/");
      return response.data;
    },
  });

  // const updatePost = async (id, info) => {
  //   try {
  //     const { data } = await axiosToken.put(`/blogs/${id}`, info);
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // tanStcakQuery'e göre veri güncelleme işlemi

  const updatePost = async (id, info) => {
    try {
      await axiosToken.put(`/blogs/${id}`, info);
      queryClient.invalidateQueries(["blogs"]);
    } catch (error) {
      console.error("Error updating post:", error);
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

  const likesCount = async (blogs) => {
    try {
      const userId = blogs?.data?.userId;
      const { data } = await axiosToken.post(`/blogs/${userId}/postLike`);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBlogPostById = async (id) => {
    const response = await axiosPublic.get(`/blogs/${id}`);
    return response.data.data;
  };

  const values = {
    blogs,
    isLoading,
    error,
    updatePost,
    getPerson,
    fetchBlogPostById,
    getBlog,
    likesCount,
  };

  return <BlogContext.Provider value={values}>{children}</BlogContext.Provider>;
};

export default BlogContextProvider;
