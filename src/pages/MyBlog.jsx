import React, { useEffect, useState } from "react";
import { useBlogContext } from "../context/BlogContext";
import { useAuthContext } from "../context/AuthContext";
import BlogCard from "../components/blog/BlogCard";
import NoContentMessage from "../components/blog/NoContentMessage";
import { Grid } from "@mui/material";

const MyBlog = () => {
  const { listMyPosts } = useBlogContext();
  const { currentUserInfo } = useAuthContext();
  const [myBlogs, setMyBlogs] = useState([]);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const posts = await listMyPosts(currentUserInfo?._id);
        setMyBlogs(posts);
      } catch (error) {
        console.error("Error fetching my posts:", error);
      }
    };

    if (currentUserInfo?._id) {
      fetchMyPosts();
    }
  }, [currentUserInfo, listMyPosts]);

  return (
    <>
      {myBlogs?.length === 0 ? (
        <NoContentMessage />
      ) : (
        <Grid
          container
          // spacing={2}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {myBlogs?.map((item, index) => (
            <Grid item xs={12} sm={6} lg={4} key={index}>
              <BlogCard item={item} key={item?._id} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default MyBlog;
