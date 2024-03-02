import React from "react";
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

const BlogCard = ({ item }) => {
  console.log(item);
  const navigate = useNavigate();

  const id = item._id;
  const handleReadMore = () => {
    navigate(`/blogdetail/${id}`);
    // başına slash koymazsan dashboard/blogdetaile gitmeye çalışıyor
  };
  return (
    <Card
      sx={{ width: { xs: 300, md: 345 }, margin: "auto", height: 400 }}
      flex
      justifyContent="space-between"
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={item.image} // Burayı gerçek resim yolunuz ile değiştirin
          alt={item.title}
          sx={{ height: 240, objectFit: "cover" }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1, // Burada '3' satır sınırlaması olarak ayarlanmıştır.
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {item.title}
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
            {item.content}
          </Typography>
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
        <Button size="small" color="primary" onClick={handleReadMore}>
          READ MORE
        </Button>
      </CardActions>
    </Card>
  );
};

export default BlogCard;
