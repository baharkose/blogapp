import React, { createContext, useContext, useState } from "react";
import useAxiosPublic from "../service/useAxiosPublic";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "../service/useAxios";
import { useNavigate } from "react-router-dom";

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

  console.log(currentUser)

  const axiosPublic = useAxiosPublic();
  const axiosToken = useAxios(currentUser?.token);
  const axiosInstance = useAxios(currentUser?.token);
  const navigate = useNavigate();

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

  const getLikesCount = async (id) => {
    try {
      const { data } = await axiosToken.get(`/blogs/${id}/getLike`);
      console.log(data);
      console.log("çalıştı");
    } catch (error) {
      console.log(error);
    }
  };

  const likesCount = async (id) => {
    try {
      const { data } = await axiosToken.post(`/blogs/${id}/postLike`);
      console.log(data);
      getLikesCount(id);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBlogPostById = async (id) => {
    const response = await axiosPublic.get(`/blogs/${id}`);
    return response.data.data;
  };

  // const getCategories = async () => {
  //   try {
  //     const { data } = await axiosToken.get(`/categories/`);
  //   } catch (error) {}
  // };

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosPublic.get("/categories/");
      return response.data.data;
    },
  });

  const postBlog = async (info) => {
    try {
      await axiosToken.post(`/blogs/`, info);
      console.log("post işlemi başarılı");
      console.log(info)
      navigate("/");
    } catch (error) {
      console.log(error);
      console.log("post işlemi başarısız oldu");
    }
  };

  const updateBlog = async (id, info) => {
    try {
      await axiosToken.put(`/blogs/${id}`, info);
      getBlog();
      navigate("/myblog");
      console.log("update edildi");
    } catch (error) {
      console.log("update işlemi başarısız");
    }
  };

  const deleteBlog = async (id) => {
    try {
      await axiosToken.delete(`/blogs/${id}`);
      console.log("silme işlemi başarılı");
      navigate("/myblog");
    } catch (error) {
      console.log("silme işlemi başarısız oldu");
    }
  };

  const submitComment = async (info) => {
    try {
      await axiosToken.post(`/comments/`, info);
      console.log("comment işlemi başarılı");
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
    fetchBlogPostById,
    getBlog,
    likesCount,
    getLikesCount,
    categories,
    postBlog,
    updateBlog,
    deleteBlog,
    submitComment,
  };

  return <BlogContext.Provider value={values}>{children}</BlogContext.Provider>;
};

export default BlogContextProvider;
