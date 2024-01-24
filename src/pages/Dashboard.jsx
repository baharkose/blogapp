import React, { useState } from "react";
import { useBlogContext } from "../context/BlogContext";
import BlogCard from "../components/blog/BlogCard";
import { Grid, Pagination, Box } from "@mui/material";

const Dashboard = () => {
  const { blogs, isLoading, error } = useBlogContext();

  // Sayfalama için state'ler
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6; // Bir sayfada kaç gönderi gösterileceğini belirleyin

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading blogs</div>;

  // Mevcut sayfadaki gönderileri hesapla
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogs?.data?.slice(indexOfFirstPost, indexOfLastPost);

  // Sayfa değişikliği işlevi
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  // Toplam sayfa sayısını hesapla
  const pageCount = Math.ceil((blogs?.data?.length || 0) / postsPerPage);

  return (
    <>
      <Grid container spacing={4}>
        {currentPosts?.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <BlogCard item={item} />
          </Grid>
        ))}
      </Grid>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginY={4} // Sayfalama için alt ve üstten boşluk
      >
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </>
  );
};

export default Dashboard;
