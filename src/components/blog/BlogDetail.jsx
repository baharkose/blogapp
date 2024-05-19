import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography, IconButton, Button, Paper } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShareIcon from '@mui/icons-material/Share';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://your-api-url.com/blogs/${id}`);
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error('Failed to fetch blog:', error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        {blog.title}
      </Typography>
      <Box sx={{ width: '100%', overflow: 'hidden', borderRadius: '10px', boxShadow: 3 }}>
        <img src={blog.image} alt={blog.title} style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }} />
      </Box>
      <Typography variant="subtitle1" sx={{ color: 'text.secondary', mt: 2 }}>
        Published: {new Date(blog.createdAt).toLocaleDateString('tr-TR', {
          year: 'numeric', month: 'long', day: 'numeric'
        })}
      </Typography>
      <Typography variant="body1" sx={{ mt: 2, textAlign: 'justify' }}>
        {blog.content}
      </Typography>
      <Paper elevation={0} sx={{ display: 'flex', gap: 2, mt: 3, p: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        <IconButton aria-label="add to favorites" sx={{ '&:hover': { bgcolor: 'transparent' } }}>
          <FavoriteIcon color="error" />
          <Typography>{blog.likes.length}</Typography>
        </IconButton>
        <IconButton aria-label="comment" sx={{ '&:hover': { bgcolor: 'transparent' } }}>
          <CommentIcon color="primary" />
          <Typography>{blog.comments.length}</Typography>
        </IconButton>
        <IconButton aria-label="views" sx={{ '&:hover': { bgcolor: 'transparent' } }}>
          <VisibilityIcon color="action" />
          <Typography>{blog.countOfVisitors}</Typography>
        </IconButton>
        <IconButton aria-label="share" sx={{ '&:hover': { bgcolor: 'transparent' } }}>
          <ShareIcon color="secondary" />
          <Typography>{blog.isPublish ? 'Published' : 'Unpublished'}</Typography>
        </IconButton>
      </Paper>
    </Container>
  );
};

export default BlogDetail;
