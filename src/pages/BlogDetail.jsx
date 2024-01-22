import React, { useEffect, useState } from "react";
import { useBlogContext } from "../context/BlogContext";
import { useAuthContext } from "../context/AuthContext";
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
import useAxios from "../service/useAxios";

const BlogDetail = () => {
  const { blogs, isLoading, error, updatePost, getPerson } = useBlogContext();
  const { currentUser } = useAuthContext();
  const { id } = useParams();

  const axiosInstance = useAxios(currentUser?.token);
  let [personData, setPersonData] = useState([]);
  let [newItem, setNewItem] = useState([]);

  const blogDetail = blogs?.data;

  const item = blogDetail?.find((blog) => blog?._id === id);

  useEffect(() => {
    // postu kim paylaşmış görmek için
    getPerson(blogs, setPersonData);
    if (item && item.id) {
      updatePost(item.id);
    }
  }, [blogs, item, updatePost, getPerson]);

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

  console.log(item);

  if (!item) {
    return <Box> İçerik bulunamadı</Box>;
  }

  return (
    <div>
      <Card sx={{ width: 600, margin: "auto" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="250"
            image={item?.image}
            alt={item?.title}
          />
          <CardContent>
            <Avatar alt={personData?.username} src={personData?.image} />
            <Typography>{personData?.username}</Typography>
            <Typography variant="body2" color="text.secondary">
              Published Date: {formatDate(item?.createdAt)}
            </Typography>
          </CardContent>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item?.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item?.content}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon /> <Typography>{item?.likes.length}</Typography>
          </IconButton>
          <IconButton aria-label="comment">
            <CommentIcon /> <Typography>{item?.comments.length}</Typography>
          </IconButton>
          <IconButton aria-label="views">
            <VisibilityIcon /> <Typography>{item?.countOfVisitors}</Typography>
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
