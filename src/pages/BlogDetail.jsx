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
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useAuthContext } from "../context/AuthContext";

const BlogDetail = () => {
  const {
    blogs,
    isLoading,
    error,
    updatePost,
    fetchBlogPostById,
    getPerson,
    getBlog,
    likesCount,
  } = useBlogContext();
  const { currentUser } = useAuthContext();
  console.log(currentUser.user._id);

  const { id } = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const [viewCountUpdated, setViewCountUpdated] = useState(false);

  useEffect(() => {
    // Blog postunu bulma
    const foundItem = blogs?.data?.find((blog) => blog?._id === id);
    if (foundItem) {
      setBlogPost(foundItem);
    }
  }, [blogs, id]);

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

  if (!blogPost) {
    return <Box> İçerik bulunamadı</Box>;
  }

  const handleLikesCount = () => {
    likesCount();
  };

  return (
    <div>
      <Card sx={{ width: 600, margin: "auto" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="250"
            image={blogPost.image}
            alt={blogPost.title}
          />
          <CardContent>
            <Avatar alt="User" src="/static/images/avatar.jpg" />{" "}
            {/* Profil resmi yer tutucu */}
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
            <FavoriteIcon /> <Typography>{blogPost?.likes?.length}</Typography>
          </IconButton>
          <IconButton aria-label="comment">
            <CommentIcon />{" "}
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
      </Card>
    </div>
  );
};

export default BlogDetail;
