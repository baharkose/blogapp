import React, { createContext, useContext } from "react";
import useAxiosPublic from "../service/useAxiosPublic";
import { useState } from "react";

export const BlogContext = createContext();

export const useBlogContext = () => {
  return useContext(BlogContext);
};

export const BlogContextProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);

  const axiosPublic = useAxiosPublic();

  const getBlog = async () => {
    try {
      const { data } = await axiosPublic.get("/blogs/");
      console.log(data);
      setBlogs(data);
    } catch (error) {
      console.log(error);
    }
  };

  const values = {
    blogs,
    getBlog,
  };

  return (
    <BlogContext.Provider value={values}>{children}</BlogContext.Provider>
  );
};

export default BlogContextProvider;
