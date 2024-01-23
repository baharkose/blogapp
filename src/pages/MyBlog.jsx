import React, { useEffect, useState } from "react";
import { useBlogContext } from "../context/BlogContext";
import { useAuthContext } from "../context/AuthContext";
import BlogCard from "../components/blog/BlogCard";
import zIndex from "@mui/material/styles/zIndex";

const MyBlog = () => {
  const { getBlog, blogs } = useBlogContext();
  const { currentUser } = useAuthContext();

  console.log(blogs?.data);
  // const [myBlogs, setMyBlogs] = useState([]);

  useEffect(() => {
    getBlog();
  }, []);
  const myBlogs = blogs?.data?.filter(
    (item) => item?.userId === currentUser?.user?._id
  );

  console.log(myBlogs);

  return (
    <>
      {myBlogs.map((item) => (
        <BlogCard item={item} key={item?._id} />
      ))}
    </>
  );
};

export default MyBlog;
