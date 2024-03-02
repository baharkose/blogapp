import React, { useState } from "react";
import { useBlogContext } from "../context/BlogContext";
import BlogCard from "../components/blog/BlogCard";
import { Grid, Pagination, Box, Stack } from "@mui/material";
import BlogCardSkeloton from "../components/blog/BlogCardSkeloton";

const Dashboard = () => {
  const { blogs, isLoading, error } = useBlogContext();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const filteredData = blogs?.data?.filter((item) => item.isPublish === true);
  console.log(filteredData);

  // Veriyi ters çevir ve ilk 17 elemanı atla
  const reversedAndSkippedData = blogs?.data
    ? [...filteredData].reverse().slice(0, -10)
    : [];

  // Sayfalama için gerekli indeks hesaplamaları
  const indexOfFirstPost = (currentPage - 1) * postsPerPage;
  const indexOfLastPost = indexOfFirstPost + postsPerPage;
  const currentPosts = reversedAndSkippedData.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const pageCount = Math.ceil(reversedAndSkippedData.length / postsPerPage);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return (
      <Stack
        flex
        width={"80%"}
        alignItems={"center"}
        justifyContent={"center"}
        maxWidth="lg"
        margin="auto"
        marginTop={4}
      >
        <Grid
          container
          spacing={3}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {Array.from({ length: postsPerPage }).map((_, index) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
              <BlogCardSkeloton loading={isLoading} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    );
  }

  if (error) {
    return <div>Error loading blogs</div>;
  }

  return (
    <>
      <Stack
        flex
        width={"80%"}
        alignItems={"center"}
        justifyContent={"center"}
        maxWidth="lg"
        margin="auto"
        // marginTop={4}
      >
        <Grid
          container
          spacing={3}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {/* İlk postun tüm genişliği */}
          <Grid item xs={12} key={currentPosts[0].id}>
            <BlogCard item={currentPosts[0]} />
          </Grid>
          
          {/* Diğer postlar varsayılan grid düzeninde */}
          {currentPosts.slice(1).map((item, index) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
              <BlogCard item={item} />
            </Grid>
          ))}
        </Grid>
      </Stack>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginY={4}
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
