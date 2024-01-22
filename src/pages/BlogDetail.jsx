import React from "react";
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
  Button,
  Box,
  Avatar,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../service/useAxiosPublic";
import { useEffect, useState } from "react";
import useAxios from "../service/useAxios";
import { useAuthContext } from "../context/AuthContext";

const BlogDetail = () => {
  const { blogs } = useBlogContext();
  const { currentUser } = useAuthContext();
  const { id } = useParams();
  console.log(blogs.data);

  const userId = blogs?.data?.userId;

  const axiosInstance = useAxios(currentUser?.token);
  let [personData, setPersonData] = useState([]);
  const getPerson = async () => {
    try {
      const { data } = await axiosInstance.get(`/users/${userId}`);
      setPersonData(data.data);
      console.log(personData);
    } catch (error) {
      console.log(error);
    }
  };

  function formatDate(dateString) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth 0'dan başlar
    const year = date.getFullYear();
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    const second = date.getSeconds().toString().padStart(2, "0");

    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
  }
  useEffect(() => {
    getPerson();
  }, []);

  function formatDate(dateString) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth 0'dan başlar
    const year = date.getFullYear();
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    const second = date.getSeconds().toString().padStart(2, "0");

    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
  }
  const blogdetail = blogs?.data;
  // tank query eklenecek

  const item = blogdetail?.find((item) => item._id === id);

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
            sx={{ height: "160px", objectFit: "cover" }}
          />
          <CardContent>
            <Avatar alt="" src={personData?.image} />
            <Typography>{personData?.username}</Typography>
            <Typography variant="body2" color="text.secondary">
              Published Date: {formatDate(personData?.createdAt)}
            </Typography>
          </CardContent>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item?.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item?.content}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Published Date:{" "}
              {new Date(item?.createdAt).toLocaleDateString("tr-TR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}{" "}
              {new Date(item?.createdAt).toLocaleTimeString("tr-TR", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              })}
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
            <VisibilityIcon /> &nbsp;{" "}
            <Typography>{item?.countOfVisitors}</Typography>
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon /> <Typography>{item?.isPublish}</Typography>
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default BlogDetail;
