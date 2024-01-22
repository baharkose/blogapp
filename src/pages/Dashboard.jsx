import React, { useEffect } from "react";
import { useBlogContext } from "../context/BlogContext";
import BlogCard from "../components/blog/BlogCard";
import { Grid } from "@mui/material";

const Dashboard = () => {
  const { getBlog, blogs } = useBlogContext();

  console.log(blogs);
  useEffect(() => {
    getBlog();
  }, []);

  const data = blogs.data;
  console.log(data);

  return (
    <Grid container spacing={4}>
      {data?.map((item, index) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          key={index}
          sx={{
            height: 400, // Sabit yükseklik
            overflow: 'hidden', // İçerik taşarsa gizle
          }}
        >
          <BlogCard item={item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Dashboard;
