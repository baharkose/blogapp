import { Card, Container } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  const fetchBlog = async ()=>{
    const response = await fetch
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        paddingBottom: 0, // Ekran boyutlarına göre alt boşluk ayarı
        marginBottom: 0,
      }}
    >
      <Card
        flex
        justifyContent="space-between"
        sx={{
          bgcolor: "#fbf6f3",
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="300"
            image={item.image}
            alt={item.title}
            sx={{ height: 300, objectFit: "cover" }}
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
    </Container>
  );
};

export default BlogDetail;
