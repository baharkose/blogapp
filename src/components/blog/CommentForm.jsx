import React, { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  Avatar,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useBlogContext } from "../../context/BlogContext";
import { useAuthContext } from "../../context/AuthContext";
import UpdateModal from "./UpdateModal";
import { useParams } from "react-router-dom";

const BlogDetail = () => {
  const { id } = useParams();
  const { blogs, isLoading, error, updatePost, fetchBlogPostById, likesCount, deleteBlog } = useBlogContext();
  const { currentUserInfo } = useAuthContext();

  const [blogPost, setBlogPost] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [commentsOpen, setCommentsOpen] = useState(false);

  useEffect(() => {
    const foundItem = blogs?.data?.find((blog) => blog?._id === id);
    if (foundItem) {
      setBlogPost(foundItem);
    }
  }, [blogs, id]);

  const handleUpdate = (updatedData) => {
    console.log(updatedData); // Handle the update logic here
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleLikesCount = async () => {
    await likesCount(id);
    const updatedBlogPost = await fetchBlogPostById(blogPost?._id);
    setBlogPost(updatedBlogPost);
  };

  const handleDelete = () => {
    deleteBlog(blogPost?._id); // Handle the delete logic here
  };

  const handleCommentsClick = () => {
    setCommentsOpen(true);
  };

  const handleCloseComments = () => {
    setCommentsOpen(false);
  };

  const handleCommentSubmit = () => {
    console.log(newComment); // Handle the comment submission here
    setNewComment("");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading blog</div>;

  return (
    <>
      <Card sx={{ width: 600, margin: "auto" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="250"
            image={blogPost?.image}
            alt={blogPost?.title}
          />
          <CardContent>
            <Avatar
              alt={blogPost?.userId?.firstName}
              src="/static/images/avatar.jpg"
            />
            <Typography gutterBottom variant="h5" component="div">
              {blogPost?.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {blogPost?.content}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={handleLikesCount}>
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="comment" onClick={handleCommentsClick}>
            <CommentIcon />
          </IconButton>
          <IconButton aria-label="views">
            <VisibilityIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>

      {commentsOpen && (
        <Box margin={2}>
          <Typography variant="h6">Comments</Typography>
          <List>
            {blogPost?.comments?.map((comment, index) => (
              <React.Fragment key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={comment.author}
                    secondary={comment.text}
                  />
                </ListItem>
                {index < blogPost.comments.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </React.Fragment>
            ))}
          </List>
          <TextField
            label="New Comment"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCommentSubmit}
          >
            Submit Comment
          </Button>
        </Box>
      )}

      {blogPost?.userId === currentUserInfo?._id && (
        <Box textAlign="center" marginTop={2}>
          <Button variant="contained" color="primary" onClick={handleOpenModal}>
            Edit Blog
          </Button>
          <UpdateModal
            open={modalOpen}
            handleClose={handleCloseModal}
            blogData={blogPost}
            handleUpdate={handleUpdate}
          />
          <Button variant="contained" color="secondary" onClick={handleDelete}>
            Delete Blog
          </Button>
        </Box>
      )}
    </>
  );
};

export default BlogDetail;
