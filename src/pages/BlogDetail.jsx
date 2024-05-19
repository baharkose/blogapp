import React, { useEffect, useState } from "react";
import { useBlogContext } from "../context/BlogContext";
import { useAuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import {
  Typography,
  IconButton,
  Box,
  Avatar,
  Button,
  Paper
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CommentForm from "../components/blog/CommentForm";
import UpdateModal from "../components/blog/UpdateModal";

const BlogDetail = () => {
  const {
    isLoading,
    error,
    likesCount,
    deleteBlog,
    fetchBlogPostById
  } = useBlogContext();
  const { currentUserInfo } = useAuthContext();
  const { id } = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      const data = await fetchBlogPostById(id);
      setBlogPost(data);
    };
    fetchBlog();
  }, [id, fetchBlogPostById]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading blog details</div>;
  if (!blogPost) return <Box>Content not found</Box>;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  const handleLikesCount = async () => {
    setIsLiked(!isLiked);
    await likesCount(id);
    const updated = await fetchBlogPostById(id);
    setBlogPost(updated);
  };

  const handleDelete = async () => {
    await deleteBlog(blogPost?._id);
  };

  const handleCommentsClick = () => {
    setCommentsOpen(!commentsOpen);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        {blogPost.title}
      </Typography>
      <Box sx={{ my: 2 }}>
        <img
          src={blogPost.image}
          alt={blogPost.title}
          style={{ width: '100%', maxHeight: '500px', borderRadius: '10px' }}
        />
      </Box>
      <Typography variant="subtitle1" color="text.secondary" sx={{ textAlign: 'center' }}>
        {blogPost.userId?.firstName} {blogPost.userId?.lastName} - {formatDate(blogPost.createdAt)}
      </Typography>
      <Typography variant="body1" sx={{ my: 2, textAlign: 'justify' }}>
        {blogPost.content}
      </Typography>
      <Paper elevation={0} sx={{ display: 'flex', justifyContent: 'space-around', p: 2, bgcolor: 'transparent' }}>
        <IconButton onClick={handleLikesCount} sx={{ color: isLiked ? "#d17b49" : "#ababab" }}>
          <FavoriteIcon />
          <Typography>{blogPost.likes?.length}</Typography>
        </IconButton>
        <IconButton onClick={handleCommentsClick} sx={{ color: "#d17b49" }}>
          <CommentIcon />
          <Typography>{blogPost.comments?.length}</Typography>
        </IconButton>
        <IconButton sx={{ color: "#d17b49" }}>
          <VisibilityIcon />
          <Typography>{blogPost.countOfVisitors}</Typography>
        </IconButton>
        <IconButton sx={{ color: "#d17b49" }}>
          <ShareIcon />
        </IconButton>
      </Paper>
      {commentsOpen && <CommentForm blogPost={blogPost} />}
      {currentUserInfo?._id === blogPost.userId?._id && (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
          <Button onClick={handleOpenModal}>Edit</Button>
          <Button onClick={handleDelete} color="error">Delete</Button>
          <UpdateModal
            open={modalOpen}
            handleClose={handleCloseModal}
            blogData={blogPost}
            handleUpdate={(updatedData) => console.log(updatedData)}
          />
        </Box>
      )}
    </Box>
  );
};

export default BlogDetail;
