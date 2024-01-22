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
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

const BlogDetail = () => {
  const { blogs } = useBlogContext();
  const { id } = useParams();
  console.log(blogs.data);

  const blogdetail = blogs.data;

  const item = blogdetail.find((item) => item._id === id);

  console.log(item);

  if (!item) {
    return <Box> İçerik bulunamadı</Box>;
  }

  return (
    <div>
      <Card sx={{ width: 345, margin: "auto" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={item?.image}
            alt={item?.title}
            sx={{ height: "160px", objectFit: "cover" }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item?.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3, // Burada '3' satır sınırlaması olarak ayarlanmıştır.
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {item?.content}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Published Date: {item?.createdAt}
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
