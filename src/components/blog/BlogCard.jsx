import React from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Button
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import CommentIcon from '@mui/icons-material/Comment';

const BlogCard = () => {
  return (
    <Card sx={{ maxWidth: 345, margin: 'auto' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/your-image-path.jpg" // Burayı gerçek resim yolunuz ile değiştirin
          alt="Blog Post"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            SAMPLE TECHNOLOGY POST -2
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Similique labore repellendus quibusdam consequuntur quae...
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Published Date: 1/27/2024, 9:23:43 AM
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon /> <Typography>5</Typography>
        </IconButton>
        <IconButton aria-label="comment">
          <CommentIcon /> <Typography>1</Typography>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon /> <Typography>18</Typography>
        </IconButton>
        <Button size="small" color="primary">
          READ MORE
        </Button>
      </CardActions>
    </Card>
  );
}

export default BlogCard;
