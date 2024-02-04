import React, { useEffect, useState } from "react";
import { useBlogContext } from "../context/BlogContext";
import BlogCard from "../components/blog/BlogCard";
import { Grid, Pagination, Box, Stack } from "@mui/material";
import BlogCardSkeloton from "../components/blog/BlogCardSkeloton";
const Dashboard = () => {
  const { blogs, isLoading, error } = useBlogContext();
  // Sayfalama için state'ler
  const [currentPage, setCurrentPage] = useState(1);

  // Veri kopyasını al ve ters çevir
  const reversedData = [...(blogs?.data || [])].reverse();
  console.log(reversedData);

  const postsPerPage = 6; // Bir sayfada kaç gönderi gösterileceğini belirleyin
  // Mevcut sayfadaki gönderileri hesapla
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  let currentPosts = [];
  if (reversedData.length > 0) {
    currentPosts = reversedData.slice(indexOfFirstPost, indexOfLastPost); // Buradaki değişiklik dikkat edin
    console.log(currentPosts);
  }
  
  // Sayfa değişikliği işlevi

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  // Toplam sayfa sayısını hesapla
  const pageCount = Math.ceil((blogs?.data?.length || 0) / postsPerPage);
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
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
              <BlogCardSkeloton loading={isLoading} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    );
  }
  if (error) return <div>Error loading blogs</div>;
  return (
    <>
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
          {currentPosts?.map((item, index) => (
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
