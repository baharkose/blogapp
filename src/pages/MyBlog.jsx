import React, { useEffect, useState } from "react";
import { useBlogContext } from "../context/BlogContext";
import { useAuthContext } from "../context/AuthContext";
import BlogCard from "../components/blog/BlogCard";
import NoContentMessage from "../components/blog/NoContentMessage";

const MyBlog = () => {
  const { blogs } = useBlogContext();
  const { currentUserInfo } = useAuthContext();
  const [myBlogs, setMyBlogs] = useState([]);

  console.log("Blogs data:", blogs?.data);
  console.log(currentUserInfo);
  console.log("Current user ID:", currentUserInfo?._id);

  console.log(currentUserInfo);

  console.log(blogs?.data);
  // const [myBlogs, setMyBlogs] = useState([]);

  // const myBlogs = blogs?.data?.filter(
  //   (item) => item?.userId === currentUser?.user?._id
  // );

  const mapBlog = blogs?.data?.filter(
    (item) => item?.userId === currentUserInfo?._id
  );
  console.log(mapBlog);

  useEffect(() => {
    if (blogs?.data && currentUserInfo?.user) {
      const filteredBlogs = blogs?.data?.filter(
        (item) => item?.userId === currentUserInfo?.data?._id
      );
      setMyBlogs(filteredBlogs);
    }
  }, [blogs, currentUserInfo]);

  console.log(myBlogs);

  return (
    <>
      {mapBlog.length === 0 ? (
        <NoContentMessage />
      ) : (
        mapBlog?.map((item) => <BlogCard item={item} key={item?._id} />)
      )}
    </>
  );
};

export default MyBlog;
