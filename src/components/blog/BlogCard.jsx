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
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";

const BlogCard = ({ item }) => {
  console.log(item);
  return (
    <Card sx={{ width: 345, margin: "auto" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={item.image} // Burayı gerçek resim yolunuz ile değiştirin
          alt={item.title}
          sx={{ height: '160px', objectFit: 'cover' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
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
          <Typography variant="body2" color="text.secondary">
            Published Date: {item.createdAt}
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
        <IconButton aria-label="share">
          <ShareIcon /> <Typography>{item?.isPublish}</Typography>
        </IconButton>
        <Button size="small" color="primary">
          READ MORE
        </Button>
      </CardActions>
    </Card>
  );
};

export default BlogCard;
