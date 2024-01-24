import React, { useEffect, useState } from "react";
import { useBlogContext } from "../context/BlogContext";
import { useParams } from "react-router-dom";
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
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useAuthContext } from "../context/AuthContext";
import UpdateModal from "../components/blog/UpdateModal";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  TextField,
  Divider,
} from "@mui/material";

import CommentForm from "../components/blog/CommentForm";

const BlogDetail = () => {
  const {
    blogs,
    isLoading,
    error,
    updatePost,
    fetchBlogPostById,
    likesCount,
    deleteBlog,
  } = useBlogContext();

  // Modal işlemleri

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const CommentsDialog = ({
    open,
    comments,
    handleClose,
    handleCommentSubmit,
  }) => {
    const [newComment, setNewComment] = useState("");
  };

  // Update fonksiyonu
  const handleUpdate = (updatedData) => {
    console.log(updatedData); // Burada güncelleme API çağrısı yapılabilir.
  };

  // Moda açma fonksiyonu
  const handleOpenModal = (blog) => {
    setSelectedBlog(blog);
    setModalOpen(true);
  };

  // Moda kapatma fonksiyonu
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const { currentUser, currentUserInfo } = useAuthContext();

  const { id } = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const [viewCountUpdated, setViewCountUpdated] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [commentsOpen, setCommentsOpen] = useState(false);

  console.log(blogPost);
  console.log(currentUserInfo);

  let foundItem = [];
  useEffect(() => {
    // Blog postunu bulma
    foundItem = blogs?.data?.find((blog) => blog?._id === id);
    if (foundItem) {
      setBlogPost(foundItem);
    }
  }, [blogs, id]);

  const [isUserPost, setIsUserPost] = useState(false);
  useEffect(() => {
    setIsUserPost(blogPost?.userId === currentUserInfo._id);
  }, [blogPost, currentUserInfo, foundItem]);

  useEffect(() => {
    const incrementViewCount = async () => {
      // update işlemi getten önce çalışmaması için (id null geldiği) için statetin içerisine veriler aktarılıp koşul oluşturuldu.
      if (blogPost) {
        // destrucring yapmadan
        await updatePost(blogPost._id, {
          countOfVisitors: blogPost.countOfVisitors + 1,
        });
        // aktif olarak görüntüleme sayısını görmek için seçilin idye göre çağırma get işlemi yapıldı.
        const updatedBlogPost = await fetchBlogPostById(blogPost._id);
        setBlogPost(updatedBlogPost);
      }
    };

    incrementViewCount();
  }, [blogPost?._id]);
  // her sayfa refresh edildiğinde id geleceği için görüntüleme sayısı arttırıldı.

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading blogs</div>;

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

  const handleLikesCount = async () => {
    await likesCount(id);
    const updatedBlogPost = await fetchBlogPostById(blogPost?._id);
    setBlogPost(updatedBlogPost);
  };

  if (!blogPost) {
    return <Box> İçerik bulunamadı</Box>;
  }

  const handleDelete = () => {
    deleteBlog(blogPost?._id);
  };

  // comments alanı

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
            />{" "}
            <Typography>
              {blogPost?.userId?.firstName} {blogPost?.userId?.lastName}{" "}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Published Date: {formatDate(blogPost?.createdAt)}
            </Typography>
          </CardContent>
          <CardContent>
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
            <Typography>{blogPost?.likes?.length}</Typography>
          </IconButton>
          <IconButton aria-label="comment" onClick={handleCommentsClick}>
            <CommentIcon />
            <Typography>{blogPost?.comments?.length}</Typography>
          </IconButton>
          <IconButton aria-label="views">
            <VisibilityIcon />{" "}
            <Typography>{blogPost?.countOfVisitors}</Typography>
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>

        {/* <CommentForm/> */}
        {commentsOpen && (
          <Box margin={2}>
            <Typography variant="h6">Comments</Typography>

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
            <List>
              {blogPost?.comments?.map((comment, index) => (
                <React.Fragment key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={`${comment?.userId?.firstName} ${comment?.userId?.lastName}`}
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                          >
                            {comment?.comment}
                          </Typography>
                          {" - "}
                          <Typography
                            component="span"
                            variant="body2"
                            color="textSecondary"
                          >
                            {new Date(comment.updatedAt).toLocaleDateString(
                              "tr-TR",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  {index < blogPost.comments.length - 1 && (
                    <Divider variant="inset" component="li" />
                  )}
                </React.Fragment>
              ))}
            </List>
          </Box>
        )}
      </Card>

      {isUserPost && (
        <Box textAlign="center" marginTop={2}>
          <Button onClick={() => handleOpenModal(foundItem)}>Edit Blog</Button>
          <UpdateModal
            open={modalOpen}
            handleClose={handleCloseModal}
            blogData={blogPost}
            handleUpdate={handleUpdate}
          />

          <Button variant="contained" color="secondary" onClick={handleDelete}>
            Delete
          </Button>
        </Box>
      )}
    </>
  );
};

export default BlogDetail;
