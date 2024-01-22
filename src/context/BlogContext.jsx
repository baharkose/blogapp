import React, { createContext, useContext } from "react";

export const BlogContext = createContext();

export const useBlogContext = () => {
  const getBlog = async () => {
    try {
      const {data}
      
    } catch (error) {
      
    }
  };

  return useContext(BlogContext);
};

const BlogContextProvider = ({ children }) => {
  return <BlogContext.Provider>{children}</BlogContext.Provider>;
};

export default BlogContextProvider;
