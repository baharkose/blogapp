import React, { createContext, useContext } from "react";
import useAxiosPublic from "../service/useAxiosPublic";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export const BlogContext = createContext();

export const useBlogContext = () => {
  return useContext(BlogContext);
};

export const BlogContextProvider = ({ children }) => {
  // const [blogs, setBlogs] = useState([]);

  const axiosPublic = useAxiosPublic();

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

  const values = {
    blogs,
    isLoading,
    error,
  };

  return <BlogContext.Provider value={values}>{children}</BlogContext.Provider>;
};

export default BlogContextProvider;
