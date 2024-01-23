import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';

const BlogForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    category: '',
    status: '',
    content: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Form submit logic here
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1 }, mt: 3 }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Typography variant="h4" gutterBottom>
          New Blog
        </Typography>

        <TextField
          required
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <TextField
          required
          fullWidth
          label="Image URL"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
        />

        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            {/* Example categories */}
            <MenuItem value="tech">Tech</MenuItem>
            <MenuItem value="lifestyle">Lifestyle</MenuItem>
            <MenuItem value="business">Business</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <MenuItem value="">
              <em>Please choose...</em>
            </MenuItem>
            <MenuItem value="draft">Draft</MenuItem>
            <MenuItem value="published">Published</MenuItem>
          </Select>
        </FormControl>

        <TextField
          required
          fullWidth
          label="Content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          multiline
          rows={4}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default BlogForm;
